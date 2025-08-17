import { externalAPI, DataReady, EXPECTED_DATA } from "./controller.js";
import { ExecutionDelay, MethodInterceptor, customEvents } from "./utils.js";

export const Controller = {};

DataReady.ready(({ controller, playbackController: playback }) => {
    Object.assign(Controller, controller);
    Object.setPrototypeOf(Controller, Object.getPrototypeOf(controller));
    ExtractedData.playbackController = playback.playbackController;
}, false, ...EXPECTED_DATA);

const NUMBER_OF_VIBE_TRACKS = 7;

const nextPrevProm = new Set();
externalAPI.on(externalAPI.EVENT_TRACK, () => {
    if (nextPrevProm.size === 0) return;
    nextPrevProm.forEach(resolve => resolve(true));
    nextPrevProm.clear();
});

const updateVibePlaylist = new ExecutionDelay(() => {
    Controller.contextController.currentContext.onMoveForward(Controller);
}, { delay: 7000, isThrottle: true, leading: true }).start;

const ExtractedData = {
    get user() {
        if (!this.likeStore) return null;
        return this.likeStore.$treenode.root._initialSnapshot.user.account.data;
    },
    get likeStore() {
        return Controller.contextController.factory.entityFactory.likeStore;
    },
    get queueController() {
        if (!Controller.queueController) return null;
        return Controller.queueController;
    },
    async loadEntities(entities) {
        if (!this.queueController) throw new Error("The queueController is null!");
        return this.queueController.entityLoader.entityProvider.loadEntities(entities);
    },
    createEntities(entities) {
        if (!this.queueController) return null
        return this.queueController.contextController.createEntities(entities);
    },
    callIfUnblocked(callback, ...args) {
        return ExtractedData.playbackController.callIfUnblocked(() => {
            return callback.apply(this, args);
        });
    }
}

const State = {
    playerState: {
        get duration() {
            return Controller.state.playerState.progress.value.duration;
        },
        get position() {
            return Controller.state.playerState.progress.value.position;
        },
        get loaded() {
            return Controller.state.playerState.progress.value.loaded;
        },
        get volume() {
            return Controller.state.playerState.volume.value;
        },
        get speed() {
            return Controller.state.playerState.speed.value;
        },
        get state() {
            return Controller.state.playerState.status.value;
        }
    },
    /** @returns {Object} */
    get playlist() {
        const playlistData = this.currentContext;
        if (!playlistData) return null;

        playlistData.contextData.meta.type = playlistData.contextData.type;
        return playlistData.contextData.meta;
    },
    get isVibe() {
        if (!State.playlist) return null;
        return State.playlist.type === "vibe";
    },
    get vibeTitle() {
        if (!this.isVibe) return null;
        if (!this.currentContext.contextData.meta?.session) return null;
        return this.currentContext.contextData.meta.session.wave.name;
    },
    get queueState() {
        if (!Controller.state) return null;
        return Controller.state.queueState;
    },
    get currentContext() {
        if (!Controller.state) return null;
        return Controller.state.currentContext.value;
    },
    get queueIndex() {
        if (!this.queueState || this.queueState.order.value.length === 0) return -1;
        return this.queueState.order.value[this.queueState.index.value];
    },
    /** @returns {number} */
    get index() {
        if (this.queueIndex === -1) return -1;
        if (this.playlist?.type !== "vibe") return this.queueIndex;
        if (NUMBER_OF_VIBE_TRACKS > Tracks.primary.length) return this.queueIndex;
        return this.queueIndex - (Tracks.primary.length - NUMBER_OF_VIBE_TRACKS);
    },
    /** @returns {boolean} */
    getRepeat() {
        if (!State.queueState) return null;
        if (State.isVibe) return null;
        return State.queueState.repeat.value;
    },
    /** @returns {boolean} */
    getShuffle() {
        if (!State.queueState) return null;
        if (State.isVibe) return null;
        return State.queueState.shuffle.value;
    },
    /** @returns {boolean} */
    isPlaying() {
        return State.playerState.state === "playing";
    },
    /** @returns {number} seconds*/
    getPosition() {
        return State.playerState.position;
    },
    /** @returns {number} 0-1*/
    getSpeed() {
        return State.playerState.speed;
    },
    /** @returns {number} 0-1*/
    getVolume() {
        return State.playerState.volume;
    },
    getLoaded() {
        return State.playerState.loaded;
    },
    getDuration() {
        return State.playerState.duration;
    },
    /** @returns {boolean} */
    get isLiked() {
        if (!Tracks.current) return null;
        return this.getTrackLiked(Tracks.currentId);
    },
    /** @returns {boolean} */
    get isDisliked() {
        if (!Tracks.current) return null;
        return this.getTrackDisliked(Tracks.currentId);
    },
    /** @returns {boolean} */
    getTrackLiked(id) {
        return ExtractedData.likeStore.isTrackLiked(id);
    },
    /** @returns {boolean} */
    getTrackDisliked(id) {
        return ExtractedData.likeStore.isTrackDisliked(id);
    },
    /** @returns {object} */
    getTrackByIndex(index) {
        return Tracks.converted[index];
    },
}

const Tracks = {
    /** @returns {Object} current track */
    get current() {
        const track = this.converted[State.index];
        return track ? track : null;
    },
    get currentId() {
        if (!this.primary) return null;
        return this.primary[State.queueIndex].entity.entityData.meta.id;
    },
    get primary() {
        if (!Controller.state) return null;
        return Controller.state.queueState.entityList.value;
    },
    getMetaByIndex(index) {
        if (!this.primary) return null;
        return this.primary[index].entity.entityData.meta;
    },
    convertTrack(track) {
        return {
            title: track.title,
            version: track.version,
            cover: track.coverUri,
            duration: track.durationMs / 1000,
            liked: State.getTrackLiked(track.id),
            disliked: State.getTrackDisliked(track.id),
            link: track.link,
            album: track.albums?.[0],
            artists: track.artists.map(artist => {
                artist.title = artist.name;
                return artist;
            })
        }
    },
    _updateVibeList() {
        const start = this.primary.length - NUMBER_OF_VIBE_TRACKS;

        if (start < 0) {
            this._converted = this.primary.map(item => {
                return this.convertTrack(item.entity.entityData.meta);
            });
            return;
        }

        if (this.primary.length >= this.converted.length) {
            for (let i = 0, j = start; i < this.converted.length; i++, j++) {
                const title = this.primary[j].entity.entityData.meta.title;
                if (title !== this.converted[i].title) break;
                return;
            }
        }

        this._converted = [];
        for (let i = start; i < this.primary.length; i++) {
            const track = this.convertTrack(this.primary[i].entity.entityData.meta);
            this._converted.push(track);
        }
    },
    _updateRegularList() {
        let start = 0;
        // todo
        if (this.primary.length === this.converted.length) {
            for (let i = 0; i < this.converted.length; i++) {
                if (this.primary[i] === null && this.converted[i] === null) continue;

                const title = this.primary[i]?.entity.entityData.meta.title;
                if (title === this.converted[i]?.title) continue;
                if (title && this.converted[i] === null) {
                    start = i;
                    break;
                }

                this._converted = [];
                break;
            }
        } else {
            this._converted = [];
        }

        for (let index = start; index < this.primary.length; index++) {
            if (this.converted[index]) continue;
            const entityData = this.primary[index].entity.entityData;
            if (entityData.type === "unloaded") {
                this.converted[index] = null;
                continue;
            };

            this.converted[index] = this.convertTrack(entityData.meta);
        }
    },
    updateConverted() {
        if (!this.primary) return null;

        if (State.isVibe) {
            this._updateVibeList();
            return this._converted;
        }

        this._updateRegularList();
        return this._converted;
    },
    _converted: [],
    get converted() { return this._converted; },
    set converted(value) { this._converted = value; },
    clearConverted() { this._converted = []; },
    /**
    * Loads track data into the current playlist starting from a specified index.
    *
    * @param {number} fromIndex - The index in the playlist from which to start loading tracks.
    * @param {number} [after] - Optional. The number of tracks to load after the `fromIndex`.
    * @param {number} [before] - Optional. The number of tracks to load before the `fromIndex`.
    * @param {boolean} [ordered=false] - Optional. If `true`, tracks are intended to be loaded in playback order
    * rather than list order. **Note:** This option is currently not implemented
    *
    * @returns {Promise<true>} A promise that resolves when the data has been loaded.
    */
    async populate(fromIndex, after, before, ordered) {
        return new Promise((resolve, reject) => {
            if (typeof fromIndex !== 'number') {
                throw new TypeError(`'fromIndex' must be a number, but received type '${typeof fromIndex}'`);
            }
            if (typeof after !== 'undefined' && typeof after !== 'number') {
                throw new TypeError(`'after' must be a number, but received type '${typeof after}'`);
            }
            if (typeof before !== 'undefined' && typeof before !== 'number') {
                throw new TypeError(`'before' must be a number, but received type '${typeof before}'`);
            }

            if (after === undefined) {
                after = 25;
                before ??= 15;
            }
            before ??= 0;

            const lastIndex = Tracks.primary.length - 1;
            if (fromIndex < 0) fromIndex = 0;
            if (fromIndex > lastIndex) fromIndex = lastIndex;
            if (fromIndex + after > lastIndex) after = lastIndex + 1 - fromIndex;
            if (before > fromIndex) before = fromIndex + 1;

            const unloadedAfterTracks = Tracks.getUnloadedTracks(fromIndex, after, "down");
            const unloadedBeforeTracks = Tracks.getUnloadedTracks(fromIndex, before, "up");
            const unloaded = new Map([...unloadedAfterTracks].concat([...unloadedBeforeTracks]));

            if (unloaded.size === 0) {
                resolve(true);
                return;
            }

            const indexes = Array.from(unloaded.keys());
            const unloadedTracks = Array.from(unloaded.values());

            ExtractedData.loadEntities(unloadedTracks).then(tracks => {
                const entities = ExtractedData.createEntities(tracks);
                indexes.forEach((indexOriginal, index) => {
                    Tracks.primary[indexOriginal].entity = entities[index];
                });
                Tracks.updateConverted();
                resolve(true);
            }).catch(reject);
        });
    },
    getUnloadedTracks(fromIndex = State.index, quantity = 30, direction = "down") {
        const unloadedTracks = new Map();

        switch (direction) {
            case "up":
                for (let i = fromIndex; i >= 0; i--) {
                    if (this.primary[i].entity.entityData.type !== "unloaded") continue;
                    if (unloadedTracks.size >= quantity) break;
                    unloadedTracks.set(i, this.primary[i]);
                }
                break;

            case "down":
                for (let i = fromIndex; i < this.primary.length; i++) {
                    if (this.primary[i].entity.entityData.type !== "unloaded") continue;
                    if (unloadedTracks.size >= quantity) break;
                    unloadedTracks.set(i, this.primary[i]);
                }
                break;
        }

        return unloadedTracks;
    }
}

const Toggles = {
    /** @returns {Promise} */
    async next() {
        if (State.isVibe) return Toggles.play(State.index + 1);
        if (!externalAPI.getControls().next) return Promise.resolve();
        return new Promise((resolve) => {
            nextPrevProm.add(resolve);
            unblockedController.moveForward();
        });
    },
    /** @returns {Promise} */
    async prev() {
        if (State.isVibe) {
            if (State.index === 0) {
                Toggles.setPosition(0);
                Toggles.togglePause(false);
                return Promise.resolve();
            }
            return Toggles.play(State.index - 1); 
        }
        if (!externalAPI.getControls().prev) return Promise.resolve();
        return new Promise((resolve) => {
            nextPrevProm.add(resolve);
            unblockedController.moveBackward();
        });
    },
    /** @returns {void} */
    setPosition(value) { unblockedController.setProgress(value); },
    /** @returns {void} */
    setSpeed(value) { unblockedController.setSpeed(value); },
    /** @returns {void} */
    setVolume(value) { unblockedController.setVolume(value); },
    _likeDislikeData: {
        get albumId() { return Tracks.current.album.id; },
        get entityId() { return Tracks.currentId; },
        get userId() {
            if (!ExtractedData.user) return null;
            return ExtractedData.user.uid;
        }
    },
    /** @returns {void} */
    toggleTrackLike() { 
        if (!Toggles._likeDislikeData.userId) throw new Error("userId not available");

        ExtractedData.likeStore.toggleTrackLike(Toggles._likeDislikeData);
        Tracks.current.liked = State.getTrackLiked(Tracks.currentId);
    },
    /** @returns {void} */
    toggleTrackDisike: (function () {
        const nextTrack = new ExecutionDelay(() => { Toggles.next(); }, { delay: 300 }).start;

        return function () {
            if (!Toggles._likeDislikeData.userId) throw new Error("userId not available");

            ExtractedData.likeStore.toggleTrackDislike(Toggles._likeDislikeData);
            Tracks.current.disliked = State.getTrackDisliked(Tracks.currentId);
            Tracks.current.disliked && nextTrack();
        }
    })(),
    _prevVolume: 1,
    /** @returns {void} */
    toggleMute(state) {
        if (state !== undefined) {
            Toggles.setVolume(state ? 0 : Toggles._prevVolume);
            return;
        }

        if (externalAPI.getVolume() > 0) {
            Toggles._prevVolume = externalAPI.getVolume();
            Toggles.setVolume(0);
        } else {
            Toggles.setVolume(Toggles._prevVolume);
        }
    },
    /** @returns {void} */
    togglePause(state) {
        if (state !== undefined) {
            if (Boolean(state) === !State.isPlaying()) return;
            if (state) {
                unblockedController.pause();
            } else {
                unblockedController.resume();
            }
            return;
        }
        unblockedController.togglePause();
    },
    /** @returns {void} */
    toggleShuffle() {
        unblockedController.toggleShuffle();
    },
    /** @returns {void} */
    toggleRepeat(state) {
        const repeatModes = {
            undefined: "none",
            false: "none",
            true: "context",
            1: "one"
        }
        if (state === undefined || repeatModes[state] === undefined) {
            const currentMode = State.getRepeat();
            if (currentMode === undefined) state = true;
            if (currentMode === "none") state = true;
            if (currentMode === "context") state = 1;
            if (currentMode === "one") state = false;
        }
        unblockedController.setRepeatMode(repeatModes[state]);
    },
    /** @returns {Promise} */
    async play(index) {
        return new Promise((resolve, reject) => {
            switch (index) {
                case undefined:
                    Toggles.setPosition(0);
                    Toggles.togglePause(false) // resume
                    resolve(true);
                    return;

                case State.index:
                    Toggles.togglePause();
                    resolve(true);
                    return;
            }

            if (index > Tracks.primary.length - 1) index = Tracks.primary.length - 1;
            if (index < 0) index = 0;

            nextPrevProm.add(resolve);

            let result;
            if (State.isVibe) {
                if (NUMBER_OF_VIBE_TRACKS < Tracks.primary.length) {
                    index = Tracks.primary.length - NUMBER_OF_VIBE_TRACKS + index;
                }
                if (index === Tracks.primary.length - 1) {
                    result = unblockedToggles._setQueueIndexValue(index);
                    ExtractedData.callIfUnblocked(updateVibePlaylist);
                    Toggles._rejectPlay(reject, result);
                    return;
                }
                // track switches without updating the tracklist
                result = unblockedToggles._setQueueIndexValue(index);
                Toggles._rejectPlay(reject, result);
                return;
            }

            result = unblockedController.playContext(Toggles.createPlayContext(index));
            Toggles._rejectPlay(reject, result);
        });

    },
    _rejectPlay(reject, result) { result?.catch(reject); },
    _setQueueIndex(index) {
        Controller.queueController.setIndex(index);
    },
    _setQueueIndexValue(index) {
        Controller.queueController.playerQueue.state.index.value = index;
    },
    /** @returns {object} */
    createPlayContext(index) {
        const context = State.currentContext;
        if (!context) throw new Error(`The context is ${context}`);

        return {
            context,
            queueParams: { index },
            entitiesData: undefined,
            loadContextMeta: State.isVibe ? undefined : true
        }
    }
}

// use only for method calls
const {
    Controller: unblockedController,
    Toggles: unblockedToggles
} = new MethodInterceptor({ Controller, Toggles }, ExtractedData.callIfUnblocked);

Object.setPrototypeOf(externalAPI, Object.defineProperties({}, {
    dev: {
        value: {
            Controller, ExtractedData, State, Tracks, Toggles,
            Events: customEvents
        }
    }
}));

export { State, Tracks, Toggles }