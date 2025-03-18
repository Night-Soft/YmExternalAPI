if (!window.externalAPI) {
    window.externalAPI = {
        EVENT_ADVERT: "advert", // not available
        EVENT_CONTROLS: "controls", // custom implementation 
        EVENT_TRACK: "track", // custom implementation 
        EVENT_TRACKS_LIST: "tracks", // custom implementation 
        EVENT_READY: "init", // custom implementation 
        EVENT_SOURCE_INFO: "info", // custom implementation

        EVENT_PROGRESS: "progress",
        EVENT_SPEED: "ratechange", // ok, call 2 times
        EVENT_STATE: "state",
        EVENT_VOLUME: "volumechange", // previous "volume"

        events: new Map(),
        on(type, listener) {
            if (this.events.get(type) === undefined) {
                this.events.set(type, new Set());
                this.events.get(type).add(listener);
            }
            this.events.get(type).add(listener);
        }
    }
}
const expectedData = ["stateControl"];
DataReady.ready((result) => {
    console.log("DataReady.ready: stateControl, togglesLike", result);
    setTimeout(() => {
        generateApi();
    }, 5000);
}, true, ...expectedData);

let ExData;
const generateApi = () => {
    console.log("createApi");

    const Controller = {};
    DataReady.ready(({ stateControl }) => {
        console.log("Create Controller");
        Controller.core = stateControl.core;
        Object.assign(Controller, stateControl.data);
        Object.setPrototypeOf(Controller, Object.getPrototypeOf(stateControl.data));
        console.log(stateControl);
        console.log(Controller);

    }, false, ...expectedData);

    const ExtractedData = {
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
                return Controller.state.playerState.volume.value
            },
            get speed() {
                return Controller.state.playerState.speed.value
            }
        },
        get activePlayback() {
            return Controller.playbackController.activePlayback.value;
        },
        get playbackController() {
            return Controller.playbackController;
        },
        get likeStore() {
            return Controller.factory.entityFactory.likeStore;
        },
        get queueController() {
            if (!this.activePlayback) return null;
            return this.activePlayback.queueController;
        },
        get mediaPlayersStore() {return Controller.state.mediaPlayersStore.value; },
        get audioElement() { return this.mediaPlayersStore.audio.source; },
        createProxyAudio() { 
            let audioOriginal = this.mediaPlayersStore.audio;
            const audio = new Proxy(this.mediaPlayersStore.audio, {
                set(t, p, v) {
                    if (p === "source") {
                        console.log("source");
                        ExtractedData.mediaPlayersStore.audio = audioOriginal;
                        queueMicrotask(initEvents());
                    }
                    return Reflect.set(t, p, v);
                }
            });
            this.mediaPlayersStore.audio = audio;
        },
        async loadEntities(entities) {
            if (!this.queueController) throw new Error("The activePlayback is null!");
            return this.queueController.entityLoader.entityProvider.loadEntities(entities);
        },
        createEntities(entities) {
            if (!this.queueController) return null;
            return this.queueController.contextController.createEntities(entities);
        },
        addEvent(type, listener) {
            this.audioElement.addEventListener(type, listener);
        },
        removeEvent(type, listener) {
            this.audioElement.removeEventListener(type, listener);
        }
    }

    const State = {
        /** @returns {Object} */
        get playlist() {
            const playlistData = this.currentContext;
            if (!playlistData) return null;

            playlistData.contextData.meta.type = playlistData.contextData.type;
            return playlistData.contextData.meta;
        },
        get queueState() {
            if (!Controller.state) return null;
            return Controller.state.queueState;
        },
        get currentContext() {
            if (!Controller.state) return null;
            return Controller.state.currentContext.value;
        },
        /** @returns {number} */
        get index() {
            if (!this.queueState || this.queueState.order.value.length === 0) return -1;
            return this.queueState.order.value[this.queueState.index.value];
        },
        /** @returns {boolean} */
        getRepeat() {
            if (!State.queueState) return null;
            return State.queueState.repeat.value;
        },
        /** @returns {boolean} */
        getShuffle() {
            if (!State.queueState) return null;
            return State.queueState.shuffle.value;
        },
        /** @returns {boolean} */
        isPlaying() {
            return !ExtractedData.audioElement.paused;
        },
        /** @returns {number} seconds*/
        getPosition() {
            return ExtractedData.playerState.position;
        },
        /** @returns {number} 0-1*/
        getSpeed() {
            return ExtractedData.playerState.speed;
        },
        /** @returns {number} 0-1*/
        getVolume() {
            return ExtractedData.playerState.volume;
        },
        getLoaded() {
            return ExtractedData.playerState.loaded;
        },
        getDuration() {
            return ExtractedData.playerState.duration;
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
            return this.primary[State.index].entity.entityData.meta.id;
        },
        get primary() {
            if (!Controller.state) return null;
            return Controller.state.queueState.entityList.value;
        },
        updateConverted() {
            if (!this.primary) return null;

            this.primary.forEach((item, index) => {
                if (this.converted[index]) return;

                if (item.entity.entityData.type === "unloaded") {
                    this.converted[index] = null;
                    return;
                };

                const track = item.entity.entityData.meta;
                this.converted[index] = {
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
            });

            return this.converted;
        },
        _converted: [],
        get converted() {
            return this._converted;
        },
        set converted(value) {
            this._converted = value;
        },

        _ids: null,
        get ids() {
            if (!this.primary) return null;
            if (!this._ids) this.updateTrackIds();
            return this._ids;
        },
        /** @returns {void | null} */
        updateTrackIds() {
            if (!this.primary) return null;
            this._ids = this.primary.map(track => track.entity.entityData.id);
        },
        getUnloadedTracks(quantity = 30, direction = "down") {
            const unloadedTracks = [];
            const indexes = [];

            // todo add counter 
            if (direction === "up") {
                for (let i = State.index; i >= 0; i--) {
                    if (this.primary[i].entity.entityData.type !== "unloaded") continue;
                    if (unloadedTracks.length >= quantity) break;
                    unloadedTracks.push(this.primary[i]);
                    indexes.push(i);
                }
            } else if (direction === "down") {
                for (let i = State.index; i < this.primary.length; i++) {
                    if (this.primary[i].entity.entityData.type !== "unloaded") continue;
                    if (unloadedTracks.length >= quantity) break;
                    unloadedTracks.push(this.primary[i]);
                    indexes.push(i);
                }
            }
            return { unloadedTracks, indexes };
        },
        async uploadTracksMeta(direction) {
            if (direction === undefined) return;
            const { unloadedTracks, indexes } = Tracks.getUnloadedTracks(30, direction);
            if (indexes.length === 0) return;
            
            ExtractedData.loadEntities(unloadedTracks).then(tracks => {
                const entities = ExtractedData.createEntities(tracks);
                indexes.forEach((indexOriginal, index) => { 
                    Tracks.primary[indexOriginal].entity = entities[index]; 
                });
                Tracks.updateConverted();
                customEvents.execute(externalAPI.EVENT_TRACKS_LIST);
                console.log("updateConverted", Tracks.converted);
            }).catch((reason) => { console.log(reason) });
        }
    }

    let internalChange = false;
    const Toggles = {
        /** @returns {Promise} */
        next() {
            return Controller.moveForward();
        },
        /** @returns {Promise} */
        prev() {
            return Controller.moveBackward();
        },
        /** @returns {void} */
        setPosition(value) {
            Controller.setProgress(value);
        },
        /** @returns {void} */
        setSpeed(value) {
            Controller.setSpeed(value);
        },
        /** @returns {void} */
        setVolume(value) {
            Controller.setVolume(value);
            internalChange = true;
        },
        /** @returns {void} */
        toggleTrackLike() { // todo likestore not works
            if (!Toggles.likeDislikeData.userId) {
                console.log("userId not available");
                return;
            }
            // todo check likeStore, prev was toggleLike
            ExtractedData.likeStore.toggleTrackLike(Toggles.likeDislikeData);
            Tracks.current.liked = State.getTrackLiked(Tracks.currentId);
        },
        /** @returns {void} */
        toggleTrackDisike() {
            if (!Toggles.likeDislikeData.userId) {
                console.log("userId not available");
                return;
            }ExtractedData
            ExtractedData.likeStore.toggleTrackDisike(Toggles.likeDislikeData);
            Tracks.current.disliked = State.getTrackDisliked(Tracks.currentId);

        },
        _prevVolume: 1,
        /** @returns {void} */
        toggleMute(state) { // todo
            if (state !== undefined) {
                Controller.setVolume(state ? 0 : Toggles._prevVolume);
                return;
            }

            if (externalAPI.getVolume() > 0) {
                Toggles._prevVolume = externalAPI.getVolume();
                Controller.setVolume(0);
            } else {
                Controller.setVolume(Toggles._prevVolume);
            }
        },
        /** @returns {void} */
        togglePause(state) {
            if (state) { // todo 
                if (State.isPlaying) {
                    Controller.togglePause(); // set to pause
                    return;
                }
            } else if (state !== undefined) {
                if (State.isPlaying == false) {
                    Controller.togglePause(); // set to play
                    return;
                }
            }
            Controller.togglePause();
        },
        /** @returns {void} */
        toggleShuffle() {
            Controller.toggleShuffle();
        },
        /** @returns {void} */
        toggleRepeat(state) { // todo improve
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
            Controller.setRepeatMode(repeatModes[state]);
        },
        /** @returns {void} */
        play(index) {
            return Controller.playContext(Toggles.createPlayContext(index));
        },
        /** @returns {object} */
        createPlayContext(index) {
            const contextData = State.currentContext.contextData;
            if (!contextData) throw new Error(`The contexData is ${contextData}`);

            return {
                contextData,
                queueParams: {
                    index
                },
                entitiesData: undefined,
                loadContextMeta: true
            }
        },
        likeDislikeData: {
            get albumId() {
                return Tracks.current.album.id;
            },
            get entityId() {
                return Tracks.currentId;
            },
            _userId: null,
            get userId() {
                if (this._userId) return this._userId;
                for (key in localStorage) {
                    if (!key.endsWith("_adPlayer")) continue;
                    const userId = parseInt(JSON.parse(localStorage[key])?.[0]?.uid);
                    if (isNaN(userId)) break;
                    this._userId = userId;
                    break;
                }
                return this._userId;
            }
        },
    }

    const Player = {}
    ExtractedData.state = State;
    ExtractedData.tracks = Tracks;
    ExtractedData.toggles = Toggles;
    Player.state = State;
    Player.tracks = Tracks;
    Player.toggles = Toggles;

    const customEvents = {
        _events: new Map(),
        on(type, listener) {
            if (this._events.get(type) === undefined) {
                this._events.set(type, new Set());
                this._events.get(type).add(listener);
            }
            this._events.get(type).add(listener);
        },
        off(type, listener) {
            if (this._events.size === 1) {
                this._events.clear();
                return;
            }
            this._events.get(type)?.delete(listener);
        },
        execute(type) {
            if (this._events.get(type)) console.log("execute", type); //todo remove
            this._events.get(type)?.forEach(listener => listener());
        },
        has(type) {
            return this._events.has(type);
        }
    }

    ExData = ExtractedData;
    ExData.customEvents = customEvents;
    ExData.player = Player;
    ExData.controller = Controller;

    // create toggles wrapper for EVENT_CONTROLS
    const shuffleBinded = Controller.toggleShuffle.bind(Controller);
    const toggleShuffleWrapper = () => {
        shuffleBinded();
        customEvents.execute(externalAPI.EVENT_CONTROLS);
    }
    const controllerPrototype = Object.getPrototypeOf(Controller);
    controllerPrototype.toggleShuffle = toggleShuffleWrapper;

    const repeatBinded = Controller.setRepeatMode.bind(Controller);
    const toggleRepeatWrapper = (state) => {
        repeatBinded(state);
        customEvents.execute(externalAPI.EVENT_CONTROLS);
    }
    controllerPrototype.setRepeatMode = toggleRepeatWrapper;

    //
    const customEventsList = [
        externalAPI.EVENT_SOURCE_INFO,
        externalAPI.EVENT_TRACK,
        externalAPI.EVENT_TRACKS_LIST,
        externalAPI.EVENT_CONTROLS,
    ];
    // setup externalAPI
    externalAPI.on = (type, listener) => {
        // EVENT: SOURCE_INFO, TRACK, TRACKS_LIST, CONTROLS
        for (const evType of customEventsList) {
            if (type === evType) {
                const isExists = customEventsList.some(type => customEvents.has(type));
                if (!isExists) {
                    console.log("Add, playing for custom events")
                    ExtractedData.addEvent('play', customEvent);
                }
                console.log("add custom: ", type);
                customEvents.on(type, listener);
                return;
            }
        }

        if (type === externalAPI.EVENT_STATE) {
            const isExists = customEvents.has(type)
            if (!isExists) {
                console.log("Add, EVENT_STATE for custom events")
                ExtractedData.addEvent('play', eventState);
                ExtractedData.addEvent('pause', eventState);
            }
            console.log("add custom: ", type);
            customEvents.on(type, listener);
            return;
        }

        if (type === externalAPI.EVENT_READY) {
            customEvents.on(type, listener);
            return;
        }

        ExtractedData.addEvent(type, listener);
    }

    externalAPI.off = (type, listener) => {
        // EVENT: SOURCE_INFO, TRACK, TRACKS_LIST, CONTROLS
        for (const evType of customEventsList) {
            if (type === evType) {
                customEvents.off(type, listener);
                const isExists = customEventsList.some(type => customEvents.has(type));
                if (isExists) return;
                ExtractedData.removeEvent('playing', customEvent);
                return;
            }
        }

        if (type === externalAPI.EVENT_STATE) {
            console.log("Remove custom: ", type);
            customEvents.off(type, listener);

            const isExists = customEvents.has(type);
            if (isExists) return;

            console.log("Remove, EVENT_STATE from custom events!")
            ExtractedData.removeEvent('play', eventState);
            ExtractedData.removeEvent('pause', eventState);
        }

        if (type === externalAPI.EVENT_READY) {
            customEvents.off(type, listener);
            return;
        }

        ExtractedData.removeEvent(type, listener);
    }

    externalAPI.getControls = () => {
        const repeatModes = {
            "none": false,
            "context": true,
            "one": 1
        }
        return {
            dislike: undefined, // todo
            like: undefined,
            index: undefined,
            next: externalAPI.getNextTrack() ? true : false,
            prev: externalAPI.getPrevTrack() ? true : false,
            repeat: repeatModes[State.getRepeat()],
            shuffle: State.getShuffle(),
        }
    }
    externalAPI.getCurrentTrack = () => {
        return Tracks.current;
    }
    externalAPI.getNextTrack = () => {
        if (!Tracks.primary) return null;
        let index = externalAPI.getTrackIndex() + 1;
        let tracksListSize = Tracks.primary.length;
        if (index - 1 > tracksListSize) {
            return null;
        }
        return State.getTrackByIndex(index);

    }
    externalAPI.getPrevTrack = () => {
        if (!Tracks.primary) return null;
        let index = externalAPI.getTrackIndex() - 1;
        if (index < 0) return null;
        return State.getTrackByIndex(index);
    }

    externalAPI.getProgress = () => {
        return {
            position: State.getPosition(),
            loaded: State.getLoaded(),
            duration: State.getDuration()
        }
    }
    externalAPI.getRepeat = State.getRepeat;
    externalAPI.getShuffle = State.getShuffle;
    externalAPI.getSourceInfo = () => {
        let playlist = State.playlist;
        if (!playlist) {
            playlist = {
                cover: "",
                link: "",
                owner: "",
                title: "",
                type: "common",
                playlistId: ""
            }
        }
        const {
            id: playlistId,
            playlistUuid: link,
            cover,
            owner,
            title,
            type
        } = playlist;
        return {
            cover: cover ? cover.uri : "",
            owner: owner ? owner.name : "",
            link,
            title,
            type,
            playlistId
        }
    }
    externalAPI.getSpeed = State.getSpeed;
    externalAPI.getTrackIndex = () => {
        return State.index;
    }
    externalAPI.getTracksList = () => {
        return Tracks.converted;
    }
    externalAPI.uploadTracksMeta = Tracks.uploadTracksMeta;

    externalAPI.getVolume = State.getVolume
    externalAPI.help = () => { }
    externalAPI.isPlaying = State.isPlaying;

    externalAPI.navigate = (url) => { }
    externalAPI.next = Toggles.next;
    externalAPI.play = Toggles.play;
    externalAPI.populate = (fromIndex, after, before, ordered) => { } // todo
    externalAPI.prev = Toggles.prev;
    externalAPI.setPosition = Toggles.setPosition;
    externalAPI.setSpeed = Toggles.setSpeed;
    externalAPI.setVolume = Toggles.setVolume;

    externalAPI.toggleDislike = Toggles.toggleTrackDisike;
    externalAPI.toggleLike = Toggles.toggleTrackLike;
    externalAPI.toggleMute = Toggles.toggleMute;
    externalAPI.togglePause = Toggles.togglePause;
    externalAPI.toggleRepeat = Toggles.toggleRepeat;
    externalAPI.toggleShuffle = Toggles.toggleShuffle;

    // custom event for info, track, tracks
    const controls = {
        get next() {
            return externalAPI.getNextTrack() ? true : false
        },
        get prev() {
            return externalAPI.getPrevTrack() ? true : false
        }
    }
    const controlsPrev = {
        ...controls
    }

    //  a function that is responsible for executing user events
    let prevTrackId;
    let prevPlaylistId;

    function customEvent() {

        console.log("custom event");
        const currentTrackId = Tracks.currentId;
        const currentPlalistId = State.playlist?.id;
        if (prevTrackId === currentTrackId && prevPlaylistId === currentPlalistId) return;

        const events = [];
        if (prevPlaylistId !== currentPlalistId) {
            Tracks.updateTrackIds();
            Tracks.converted = [];
            console.log("updateTrackIds")
            events.push(externalAPI.EVENT_SOURCE_INFO);
        }
        if (prevTrackId !== currentTrackId) {
            console.log("updateConverted"); 
            Tracks.updateConverted();
        }

        prevPlaylistId = currentPlalistId;
        prevTrackId = currentTrackId;

        events.push(externalAPI.EVENT_TRACK);
        events.push(externalAPI.EVENT_TRACKS_LIST);

        // check for EVENT_CONTROLS
        const { next, prev } = controls;
        if (controlsPrev.next === next && controlsPrev.prev === prev) {
            events.forEach(event => {
                customEvents.execute(event)
            });
            return;
        }

        controlsPrev.next = next;
        controlsPrev.prev = prev;

        events.forEach(event => { customEvents.execute(event) });
        customEvents.execute(externalAPI.EVENT_CONTROLS);
    }

    function eventState() {
        console.log("eventState");
        customEvents.execute(externalAPI.EVENT_STATE);
    }

    // init all events
    const initEvents = () => {
        if (!ExtractedData.audioElement) {
            ExtractedData.createProxyAudio();
            console.log("create proxy audio");
            return;
        }
        console.log("init Events!");
        externalAPI.events.forEach((fnSet, type) => {
            fnSet.forEach((listener) => externalAPI.on(type, listener));
        });
        Reflect.deleteProperty(externalAPI, "events");
    
        customEvents.execute(externalAPI.EVENT_READY);
    }

    const setVolumeTrotte = new ExecutionDelay(() => {
        if (!internalChange) return;
        internalChange = false;
        const volumeEl = document.querySelector(".ChangeVolume_root__HDxtA > input");
        if (!volumeEl) return;

        let cssText = volumeEl.style.cssText;
        let prop = cssText.split(";");
        let seekBeforeWidth = prop[1].split(":")
        seekBeforeWidth[1] = externalAPI.getVolume() * 100 + "%";
        prop[1] = seekBeforeWidth.join(": ").trim();
        cssText = prop.join(";");
        console.log(cssText);
        volumeEl.style.cssText = cssText;
    }, { delay: 1000, isThrottling: false });

    externalAPI.on(externalAPI.EVENT_VOLUME, setVolumeTrotte.start);

    initEvents();
}