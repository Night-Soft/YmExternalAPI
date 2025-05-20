import { externalAPI, Controller } from "./controller.js";
import { ExecutionDelay, customEvents} from "./utils.js";

const NUMBER_OF_VIBE_TRACKS = 7;

const nextPrevProm = new Set();
externalAPI.on(externalAPI.EVENT_TRACK, () => {
    nextPrevProm.forEach(resolve => resolve());
    nextPrevProm.clear();
});

const updateVibePlaylist = new ExecutionDelay(() => {
    Controller.contextController.currentContext.onMoveForward(Controller);
}, { delay: 5000, isThrottle: true }).start;


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
        if (!this.queueController) return null;
        return this.queueController.contextController.createEntities(entities);
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
        return this.queueIndex - (Tracks.primary.length - NUMBER_OF_VIBE_TRACKS ); 
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
    updateConverted() {
        if (!this.primary) return null;

        if (State.isVibe) {
            const start = Tracks.primary.length - NUMBER_OF_VIBE_TRACKS;

            if (start < 0) {
                return this._converted = this.primary.map(item => {
                    return this.convertTrack(item.entity.entityData.meta);
                });
            }

            if (this.primary.length >= this.converted.length) {
                for (let i = 0, j = start; i < this.converted.length; i++, j++) {
                    const title = this.primary[j].entity.entityData.meta.title;
                    if (title !== this.converted[i].title) break;
                    return this._converted;
                }
            }

            this._converted = [];
            for (let i = start; i < this.primary.length; i++) {
                const track = this.convertTrack(this.primary[i].entity.entityData.meta);
                this._converted.push(track);
            }
            return this._converted;
        }

        this.primary.forEach((item, index) => {
            if (this.converted[index]) return;

            if (item.entity.entityData.type === "unloaded") {
                this.converted[index] = null;
                return;
            };

            this.converted[index] = this.convertTrack(item.entity.entityData.meta);
        });

        return this.converted;
    },
    _converted: [],
    get converted() { return this._converted; },
    set converted(value) { this._converted = value; },
    clearConverted() { this._converted = []; },
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
        }).catch((reason) => { console.log(reason) });
    }
}

const Toggles = {
    /** @returns {Promise} */
    async next() {
        if (State.isVibe) return Toggles.play(State.index + 1);
        if (!externalAPI.getControls().next) return Promise.resolve();
        return new Promise((resolve)=> {
            nextPrevProm.add(resolve);
            Controller.moveForward();
        });
    },
    /** @returns {Promise} */
    async prev() {
        if (State.isVibe && State.index > 0) {
            return Toggles.play(State.index - 1);
        }
        if (!externalAPI.getControls().prev) return Promise.resolve();
        return new Promise((resolve) => {
            nextPrevProm.add(resolve);
            Controller.moveBackward();    
        });
    },
    /** @returns {void} */
    setPosition(value) { Controller.setProgress(value); },
    /** @returns {void} */
    setSpeed(value) { Controller.setSpeed(value); },
    /** @returns {void} */
    setVolume(value) { Controller.setVolume(value); },
    /** @returns {void} */
    toggleTrackLike() { 
        if (!Toggles.likeDislikeData.userId) {
            console.warn("userId not available");
            return;
        }

        ExtractedData.likeStore.toggleTrackLike(Toggles.likeDislikeData);
        Tracks.current.liked = State.getTrackLiked(Tracks.currentId);
    },
    /** @returns {void} */
    toggleTrackDisike() {
        if (!Toggles.likeDislikeData.userId) {
            console.warn("userId not available");
            return;
        }
        
        ExtractedData.likeStore.toggleTrackDisike(Toggles.likeDislikeData);
        Tracks.current.disliked = State.getTrackDisliked(Tracks.currentId);

    },
    _prevVolume: 1,
    /** @returns {void} */
    toggleMute(state) { 
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
        if (state) {
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
        Controller.setRepeatMode(repeatModes[state]);
    },
    /** @returns {Promise} */
    async play(index) {
        return new Promise((resolve) => {
            nextPrevProm.add(resolve);

            if (State.isVibe) {
                if (NUMBER_OF_VIBE_TRACKS < Tracks.primary.length) {
                    index = Tracks.primary.length - NUMBER_OF_VIBE_TRACKS + index;
                }
                if (index === Tracks.primary.length - 1) {
                    Controller.queueController.playerQueue.state.index.value = index;
                    updateVibePlaylist();
                    return;
                }
                // track switches without updating the tracklist
                Controller.queueController.playerQueue.state.index.value = index;
                return;
            }

            Controller.playContext(Toggles.createPlayContext(index));
        });
        
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
    },
    likeDislikeData: {
        get albumId() { return Tracks.current.album.id; },
        get entityId() { return Tracks.currentId; },
        get userId() {
            if (!ExtractedData.user) return null;
            return ExtractedData.user.uid;
        }
    },
}

Object.defineProperty(externalAPI, "dev", {
    value: { Controller, ExtractedData, State, Tracks, Toggles }
});

export { State, Tracks, Toggles }