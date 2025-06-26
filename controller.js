export const externalAPI = {
    EVENT_ADVERT: "advert", // not available
    EVENT_CONTROLS: "controls", // half custom implementation 
    EVENT_READY: "init", // custom implementation 
    EVENT_SOURCE_INFO: "info", // custom implementation

    EVENT_STATE: "state",
    EVENT_TRACK: "track",
    EVENT_TRACKS_LIST: "tracks",
    EVENT_PROGRESS: "progress",
    EVENT_SPEED: "ratechange",
    EVENT_VOLUME: "volumechange",

    events: new Map(),
    on(type, listener) {
        if (this.events.get(type) === undefined) {
            this.events.set(type, new Set());
            this.events.get(type).add(listener);
        }
        this.events.get(type).add(listener);
    }
}
export const EXPECTED_DATA = ["controller", 'playbackController'];

export const DataReady = {
    waitingList: new Map(),
    data: new Map(),

    _execute(callback, args, isImmediate) {
        const data = {};
        for (const key of args) data[key] = this.data.get(key);
        if (isImmediate) {
            callback(data);
            return;
        }
        queueMicrotask(() => { callback(data) });
    },
    /** 
     * @param {Function} callback - Callback when all data is ready.
     * @param {boolean} once - Callback will be call once.
     * @param {...string} expectedData - The data name you waiting.
     * if the data already exists, the callback is called immediately
     * 
    */
    ready(callback, once, ...expectedData) {
        const isReady = expectedData.every(value => this.data.has(value));
        if (isReady === false) {
            this.waitingList.set(expectedData, { once, callback });
            return;
        }
        if (!once) {
            this.waitingList.set(expectedData, { once, callback });
        }
        this._execute(callback, expectedData, true);
    },
    set(name, data) {
        this.data.set(name, data);

        const keys = this.waitingList.keys();
        for (const arg of keys) {
            const isReady = arg.every(value => this.data.has(value));
            if (!isReady) continue;

            this._execute(this.waitingList.get(arg).callback, arg);
            if (!this.waitingList.get(arg).once) continue;
            this.waitingList.delete(arg);
        }
        return this;
    }
}

const replaceWebpackChunk = () => {
    let push;
    let isDataReady = false;

    DataReady.ready(() => {
        isDataReady = true
        self.webpackChunk_N_E.push = push; 
    }, true, ...EXPECTED_DATA);

    const pushOverload = function (e, ...args) {
        if (Array.isArray(e)) {
            for (const entries of Object.entries(e[1])) {
                e[1][entries[0]] = function (e, t, i) {
                    entries[1](e, t, i); // originFn
                    for (const prop of Object.keys(t)) {

                        if (isDataReady) return; 

                        if (t[prop]?.prototype?.createAudioAdvertPlayback) {
                            const createAudioAdvertPlayback = t[prop].prototype.createAudioAdvertPlayback;
                            t[prop].prototype.createAudioAdvertPlayback = function (playback) {
                                DataReady.set(EXPECTED_DATA[1], playback); // playbackController
                                createAudioAdvertPlayback.call(this, playback);
                            }
                        }

                        if (!t[prop]?.prototype?.setExponentVolume) continue;

                        const setExponentVolume = t[prop].prototype.setExponentVolume;
                        t[prop].prototype.setExponentVolume = function (v) {
                            DataReady.set(EXPECTED_DATA[0], this); // controller
                            t[prop].prototype.setExponentVolume = setExponentVolume;
                            return setExponentVolume.call(this, v);
                        }
                    }
                }
            }
        }
        push(e, ...args);
    }

    self.webpackChunk_N_E = new Proxy([], {
        set(target, property, value) {
            if (property === "push") {
                push = value;
                self.webpackChunk_N_E = target;
                self.webpackChunk_N_E.push = pushOverload;
                return true;
            }

            target[property] = value;
            return true;
        }
    });
}

replaceWebpackChunk();