import { Controller } from "./controller.js";
import { ExecutionDelay, customEvents } from "./utils.js";
import { State, Tracks } from "./extracted-data.js";

const TrackControls = class {
    constructor() {
        const controls = {
            get next() { return externalAPI.getNextTrack() ? true : false },
            get prev() { return externalAPI.getPrevTrack() ? true : false }
        }
        const controlsPrev = { ...controls }

        Object.defineProperty(this, "isChange", {
            get() {
                const { next, prev } = controls;
                if (controlsPrev.next === next && controlsPrev.prev === prev) return false;

                controlsPrev.next = next;
                controlsPrev.prev = prev;

                return true;
            }
        });
    }
}

export const initEvents = () => {
    externalAPI.events.forEach((fnSet, type) => {
        fnSet.forEach((listener) => externalAPI.on(type, listener));
    });
    Reflect.deleteProperty(externalAPI, "events");
    isApiReady = true;
    customEvents.execute(externalAPI.EVENT_READY);
}

export const checkLikeDislike = new ExecutionDelay(() => {
    if (!Tracks.current) return;
    
    const changeList = [];
    Tracks.converted.forEach((track, index) => {
        if (!track) return;

        let queueIndex = index;
        if (State.isVibe) {
            queueIndex = Tracks.primary.length - Tracks.converted.length + index;
        }

        const currentLike = State.getTrackLiked(Tracks.getMetaByIndex(queueIndex).id);
        const currentDislike = State.getTrackDisliked(Tracks.getMetaByIndex(queueIndex).id);

        if (track.liked !== currentLike) {
            track.liked = currentLike;
            changeList.push(index);
        }
        if (track.disliked !== currentDislike) {
            track.disliked = currentDislike;
            changeList.push(index);
        }
    });

    if (changeList.length === 0) return;

    const isChangeLike = changeList.includes(State.index); // todo check index
    isChangeLike && customEvents.execute(externalAPI.EVENT_CONTROLS);

    const needTracksListEvent =
        (changeList.length > 1 && isChangeLike) ||
        (changeList.length > 0 && !isChangeLike);

    needTracksListEvent && customEvents.execute(externalAPI.EVENT_TRACKS_LIST);

}, { delay: 700 }).start;

const stateEvents = {
    get progress() { return Controller.state.playerState.progress },
    get ratechange() { return Controller.state.playerState.speed },
    get state() { return Controller.state.playerState.status },
    get volumechange() { return Controller.state.playerState.volume },
    get track() { return Controller.state.queueState.currentEntity },
    get tracks() { return Controller.state.queueState.entityList },

    get repeat() { return Controller.state.queueState.repeat },
    get shuffle() { return Controller.state.queueState.shuffle },
}

const apiEventTypes = new Set([
    "advert",
    "controls",
    "init",
    "info",
    "state",
    "track",
    "tracks",
    "progress",
    "ratechange",
    "volumechange"
]);

const onChangeList = new Set();
let isApiReady = true;

export const externalApiOn = (type, listener) => {
    if (!apiEventTypes.has(type)) {
        console.warn(`Wrong event type or event not available! Type: '${type}'`);
        return;
    }

    customEvents.on(type, listener);
    if (onChangeList.has(type)) return;

    // All events below with '.onChange' will be created once.
    switch (type) {
        case externalAPI.EVENT_READY:
            if (!isApiReady) return;
            customEvents.execute(type).then(() => customEvents.off(type, listener));
            break;

        case externalAPI.EVENT_CONTROLS:
            const onControls = () => { customEvents.execute(type); };

            stateEvents["repeat"].onChange(onControls);
            stateEvents["shuffle"].onChange(onControls);

            onChangeList.add(type);
            break;

        case externalAPI.EVENT_TRACK:
            const trackControls = new TrackControls();
            stateEvents[type].onChange(() => {
                Tracks.updateConverted();
                customEvents.execute(type);

                if (trackControls.isChange) customEvents.execute(externalAPI.EVENT_CONTROLS);
            });

            onChangeList.add(type);
            break;

        case externalAPI.EVENT_TRACKS_LIST:
            let prevPlaylistId;
            stateEvents[type].onChange(() => {
                const currentPlalistId = State.playlist?.id;
                const isVibe = State.isVibe;

                if (!isVibe && prevPlaylistId === currentPlalistId) return;

                prevPlaylistId = currentPlalistId;

                Tracks.clearConverted();
                Tracks.updateConverted();

                customEvents.execute(externalAPI.EVENT_SOURCE_INFO);
                customEvents.execute(type);
            });

            onChangeList.add(type);
            break;

        case externalAPI.EVENT_STATE:
            stateEvents[type].onChange((ev) => {
                if (ev !== "playing" && ev !== "paused") return;
                customEvents.execute(type);
            });

            onChangeList.add(type);
            break;

        case externalAPI.EVENT_PROGRESS:
            let currentState;
            const states = new Set(["playing", "paused", "buffering"]);

            stateEvents[externalAPI.EVENT_STATE].onChange(state => currentState = state);
            stateEvents[type].onChange(() => {
                if (!states.has(currentState)) return;
                customEvents.execute(type);
            });

            onChangeList.add(type);
            break;

        default:
            try {
                stateEvents[type].onChange(() => { customEvents.execute(type) });
                onChangeList.add(type);
            } catch (error) {
                console.warn(`Wrong event type or event not available! Type: '${type}'`);
                console.error(error);
            }
            break;
    }
}

export const externalApiOff = (type, listener) => { customEvents.off(type, listener); }