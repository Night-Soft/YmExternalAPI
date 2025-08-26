(function () {
    const EXPECTED_DATA = ["controller", 'playbackController'];
    const REDEFINED_FN = ["createAudioAdvertPlayback", "setExponentVolume"];

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
        },
        has(...expectedData) {
            return expectedData.every(value => this.data.has(value));
        }
    }

    window.EXPECTED_DATA = EXPECTED_DATA;
    window.DataReady = DataReady;

    DataReady.ready(() => {
        webpackChunk_N_E.push = pushBound;
        self.webpackChunk_N_E = webpackChunk_N_E;
    }, true, ...REDEFINED_FN);

    function overrideExportsFn(exports) {
        if (exports === undefined) return;
        for (const key of Object.keys(exports)) {
            if (exports[key]?.prototype?.createAudioAdvertPlayback) {
                const createAudioAdvertPlayback = exports[key].prototype.createAudioAdvertPlayback;
                exports[key].prototype.createAudioAdvertPlayback = function (playback) {
                    DataReady.set(EXPECTED_DATA[1], playback); // playbackController
                    exports[key].prototype.createAudioAdvertPlayback = createAudioAdvertPlayback;
                    createAudioAdvertPlayback.call(this, playback);
                }

                DataReady.set(REDEFINED_FN[0], true);
                if (DataReady.data.get(REDEFINED_FN[1])) break;
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

                DataReady.set(REDEFINED_FN[1], true);
                if (DataReady.data.get(REDEFINED_FN[0])) break;
            }
        }
    }

    function replaceFn(args) {
        if (Array.isArray(args[0])) {
            for (const entries of Object.entries(args[0][1])) {
                args[0][1][entries[0]] = function (e, t, i) {
                    entries[1](e, t, i); // originFn
                    overrideExportsFn(t);
                }
            }
        }
    }

    let pushBound;
    function pushOverload(...args) {
        replaceFn(args);
        pushBound.apply(this, args);
    }

    const webpackChunk_N_E = [];
    const pushOrig = webpackChunk_N_E.push;

    webpackChunk_N_E.push = function (...args) { // push overload before bind
        replaceFn(args);
        pushOrig.apply(this, args);
    }

    self.webpackChunk_N_E = new Proxy(webpackChunk_N_E, {
        set(target, property, value) {
            if (property === "push") {
                pushBound = value;
                target.push = pushOverload
                return true;
            }

            target[property] = value;
            return true;
        }
    });

})();