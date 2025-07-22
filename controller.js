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
        if (this.events.get(type) === undefined) this.events.set(type, new Set());
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

const redefinedFn = ["createAudioAdvertPlayback", "setExponentVolume"];

function overrideExportsFn(exports) {
    if (exports === undefined) return;
    for (const key of Object.keys(exports)) {
        if (exports[key]?.prototype?.createAudioAdvertPlayback) {
            const createAudioAdvertPlayback = exports[key].prototype.createAudioAdvertPlayback;
            exports[key].prototype.createAudioAdvertPlayback = function (playback) {
                DataReady.set(EXPECTED_DATA[1], playback); // playbackController
                createAudioAdvertPlayback.call(this, playback);
            }

            DataReady.set(redefinedFn[0], true);
            if (DataReady.data.get(redefinedFn[1])) break;
        }

        if (exports[key]?.prototype?.setExponentVolume) {
            const setExponentVolume = exports[key].prototype.setExponentVolume;
            exports[key].prototype.setExponentVolume = function (v) {
                if (this.id === "MAIN") {
                    DataReady.set(EXPECTED_DATA[0], this); // controller
                    exports[key].prototype.setExponentVolume = setExponentVolume;
                }
                return setExponentVolume.call(this, v);
            }

            DataReady.set(redefinedFn[1], true);
            if (DataReady.data.get(redefinedFn[0])) break;
        }
    }
}

let push;
function pushOverload(e, ...args) {
    if (Array.isArray(e)) {
        for (const entries of Object.entries(e[1])) {
            e[1][entries[0]] = function (e, t, i) {
                entries[1](e, t, i); // originFn
                overrideExportsFn(t);
            }
        }
    }
    push(e, ...args);
}

function getRequire() {
    let getExports, moduleFn = {};

    const checkModuleFn = (fn) => {
        return (
            typeof fn === "function" &&
            fn.name !== "" &&
            Number.isFinite(Number(fn.name))
        );
    }

    const chunkGetRequire = [[Math.random()], {}, (fn) => getExports = fn];
    self.webpackChunk_N_E.push(chunkGetRequire);

    for (const key in getExports) {
        const value = getExports[key];

        if (typeof value === 'object') {

            const isModuleFn = Object.values(value).every(checkModuleFn);

            if (!isModuleFn) continue;
            moduleFn = value
            break;
        }
    }

    return { getExports, moduleFn }
}
const createProxy = (proxy = []) =>{
    self.webpackChunk_N_E = new Proxy(proxy, {
        set(target, property, value) {
            if (property === "push") {
                push = value;
                self.webpackChunk_N_E = target;
                self.webpackChunk_N_E.push = pushOverload
                return true;
            }

            target[property] = value;
            return true;
        }
    });
}
    DataReady.ready(() => { self.webpackChunk_N_E.push = push; }, true, ...redefinedFn);

const replaceWebpackChunk = () => {
    if (self.webpackChunk_N_E) {
        if (self.webpackChunk_N_E.push.name === "push") {
            createProxy(self.webpackChunk_N_E);
        }

        const { getExports, moduleFn } = getRequire();

        //const emptyExportIds = []
        Object.keys(moduleFn).forEach((id) => {
            try {
                overrideExportsFn(getExports(id));
            } catch (error) { } //emptyExportIds.push(id); 
        });

        if (self.webpackChunk_N_E.push.name === "bound d") {
            push = self.webpackChunk_N_E.push;
            self.webpackChunk_N_E.push = pushOverload;
        }

        return;
    }
    createProxy();
}

replaceWebpackChunk();