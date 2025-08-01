(function () {
    const EXPECTED_DATA = ["controller", 'playbackController'];
    const redefinedFn = ["createAudioAdvertPlayback", "setExponentVolume"];

    const DataReady = {
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

    window.EXPECTED_DATA = EXPECTED_DATA;
    window.DataReady = DataReady;

    DataReady.ready(() => { self.webpackChunk_N_E.push = push; }, true, ...redefinedFn);

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

    self.webpackChunk_N_E = new Proxy([], {
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
})();