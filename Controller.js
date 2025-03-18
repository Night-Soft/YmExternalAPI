console.log("Controller.js");
// todo DataReady load aerly
const DataReady = {
    waitingList: new Map(),
    data: new Map(),

    _result(callback, args, isImmediate) {
        const data = {};
        for (key of args) data[key] = this.data.get(key);
        if (isImmediate) {
            callback(data);
            return;
        }
        queueMicrotask(() => { callback(data) });
    },
    /** 
     * if the data already exists, the callback is called immediately
     * @param {Function} callback - Callback when all data is ready.
     * @param {...string} name - The data name.
    */
    ready(callback, once, ...args) {
        const isReady = args.every(value => this.data.has(value));
        if (isReady === false) {
            this.waitingList.set(args, { once, callback });
            return;
        }
        if (!once) {
            this.waitingList.set(args, { once, callback });
        }

        this._result(callback, args, true);
    },
    set(name, data) {
        console.log("DataReady set: ", name);
        this.data.set(name, data);

        const keys = this.waitingList.keys();
        for (const arg of keys) {
            const isReady = arg.every(value => this.data.has(value));
            if (!isReady) continue;

            this._result(this.waitingList.get(arg).callback, arg);
            if (!this.waitingList.get(arg).once) continue;
            this.waitingList.delete(arg);
        }
        return this;
    }
}

// let DataCollection = {
//     on() {
//         setTimeout(() => {
//             generateApi();
//             Reflect.deleteProperty(DataCollection.on);

            // externalAPI.on("play", () => {
            //     console.log("play");
            // })
            // externalAPI.on("stop", () => {
            //     console.log("stop");
            // })
            // externalAPI.on("pause", () => {
            //     console.log("pause");
            // })
            // externalAPI.on("resume", () => {
            //     console.log("resume");
            // })
            // externalAPI.on("seeked", () => {
            //     console.log("seeked");
            // })
            // externalAPI.on("volumechange", () => {
            //     console.log("volumechange");
            // })
            // externalAPI.on("ratechange", () => {
            //     console.log("ratechange");
            // })
            // externalAPI.on("loading", () => {
            //     console.log("loading");
            // })
            // externalAPI.on("loaded", () => {
            //     console.log("loaded");
            // })
            // externalAPI.on("ended", () => {
            //     console.log("ended");
            // })
            // externalAPI.on("crashed", () => {
            //     console.log("crashed");
            // })
            // externalAPI.on("error", () => {
            //     console.log("error");
            // })
            // externalAPI.on("stalled", () => {
            //     console.log("stalled");
            // })
            // externalAPI.on("canplay", () => {
            //     console.log("canplay");
            // })
            // externalAPI.on("playing", () => {
            //     console.log("playing");
            // })
            // externalAPI.on("hlserror", () => {
            //     console.log("hlserror");
            // })
            // externalAPI.on("destroy", () => {
            //     console.log("destroy");
            // })
            // externalAPI.on("state", () => {
            //     console.log("state");
            // })
            // externalAPI.on("swap", () => {
            //     console.log("swap");
            // })
            // externalAPI.on("init", () => {
            //     console.log("init");
            // })
            // externalAPI.on("crashed", () => {
            //     console.log("crashed");
            // })
            // externalAPI.on("idle", () => {
            //     console.log("idle");
            // })
            // externalAPI.on("playing", () => {
            //     console.log("playing");
            // })
            // externalAPI.on("paused", () => {
            //     console.log("paused");
            // })
//         }, 10);
//     }
// }


const getFnInChunck = (nameFn) => {
    const index = self.webpackChunk_N_E.findIndex((value) => {
        for (fn in value[1]) {
            if (fn == nameFn) return true;
        }
    });
    return { index, value: self.webpackChunk_N_E[index] }
}

const replaceWebpackChunk = () => {
        console.log("setProxy");
        let push;
        const pushOverload = function(e, ...args) {
            if (Array.isArray(e)) {
                for (key in Chunks) {
                    if (e[1][key]) {
                        e[1][key] = Chunks[key];
                        console.log("replace", Chunks[key].name)
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