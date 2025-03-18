const Chunks = {};
Chunks[79510] = function stateControl(e, t, a) {
        "use strict";
        a.d(t, {
            SonataProvider: function() {
                return i2
            }
        });
        var i, r, s, n, o, l, d, u, c, m, h, g, p, y, v, E, f, S, b, P, A, _, N, C, T, I, k, D, R, L, V, x, O, w, G, M, j, U, q, F, B, Y, W, K, H, z, Q, J, Z, X, $, ee, et = a(65301), ea = a(96233), ei = a(91207), er = a(58655), es = a(38168);
        let en = {
            updateInterval: 30,
            EMPTY_SOUND: "data:audio/mp3;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAADAAAC2QBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVWqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr///////////////////////////////////////////8AAAA8TEFNRTMuOThyBK8AAAAAAAAAADQgJAimTQABzAAAAtmIVtmVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAO4AAAf4AAAAgAAA/wAAABAoQDLmAAACBYgGYMAAAE+oH///////0WKFRVzjKnAmjp+XX9qP//////p0USaKtMwpjZNhNFyEM61QAAOAP////////nfSpMQU1FMy45OC4yqqr/+xBEDI/wAAB/gAAACAxgGaMAAAEAAAH+AAAAIAAAP8AAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGQoD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
            EVENT_NATIVE_PLAY: "play",
            EVENT_NATIVE_PAUSE: "pause",
            EVENT_NATIVE_TIMEUPDATE: "timeupdate",
            EVENT_NATIVE_ENDED: "ended",
            EVENT_NATIVE_DURATION: "durationchange",
            EVENT_NATIVE_LOADING: "progress",
            EVENT_NATIVE_META: "loadedmetadata",
            EVENT_NATIVE_CANPLAY: "canplay",
            EVENT_NATIVE_PLAYING: "playing",
            EVENT_NATIVE_ERROR: "error",
            EVENT_NATIVE_STALLED: "stalled",
            EVENT_VOLUMECHANGE: "volumechange",
            EVENT_RATECHANGE: "ratechange",
            EVENT_SEEKED: "seeked",
            promiseLoadedEvents: ["progress"],
            promisePlayingEvents: ["timeupdate"]
        }
          , eo = {
            EVENT_PLAY: "play",
            EVENT_STOP: "stop",
            EVENT_PAUSE: "pause",
            EVENT_RESUME: "resume",
            EVENT_PROGRESS: "progress",
            EVENT_SEEKED: "seeked",
            EVENT_VOLUMECHANGE: "volumechange",
            EVENT_RATECHANGE: "ratechange",
            EVENT_LOADING: "loading",
            EVENT_LOADED: "loaded",
            EVENT_ENDED: "ended",
            EVENT_CRASHED: "crashed",
            EVENT_ERROR: "error",
            EVENT_STALLED: "stalled",
            EVENT_CANPLAY: "canplay",
            EVENT_PLAYING: "playing",
            HLS_EVENT_ERROR: "hlserror",
            EVENT_DESTROY: "destroy",
            EVENT_STATE: "state",
            EVENT_SWAP: "swap",
            STATE_INIT: "init",
            STATE_CRASHED: "crashed",
            STATE_IDLE: "idle",
            STATE_PLAYING: "playing",
            STATE_PAUSED: "paused"
        }
          , el = 1
          , ed = () => {
            let e = document.createElement("audio");
            return e.autoplay = !1,
            e.loop = !1,
            e.preload = "auto",
            e.crossOrigin = "anonymous",
            e
        }
        ;
        class eu {
            updateProgress() {
                let e = Number(new Date);
                if (e - this.lastUpdate < en.updateInterval)
                    return;
                this.audio && this.audio.currentTime && (this.lastGoodTime = this.audio.currentTime),
                this.lastUpdate = e;
                let t = this.duration ? this.duration : 0
                  , a = this.loaded ? this.loaded : 0
                  , i = this.currentTime ? this.currentTime : 0;
                this.emitter.emit(eo.EVENT_PROGRESS, {
                    duration: t,
                    loaded: a,
                    position: i,
                    played: i
                })
            }
            onNativeLoading() {
                if (this.updateProgress(),
                this.audio && this.audio.buffered.length) {
                    let e = this.audio.buffered.end(0) - this.audio.buffered.start(0);
                    this.notLoading && e && (this.notLoading = !1,
                    this.emitter.emit(eo.EVENT_LOADING)),
                    e >= this.audio.duration - .1 && this.emitter.emit(eo.EVENT_LOADED)
                }
            }
            onNativeEnded() {
                this.ended = !0,
                this.playing = !1,
                this.shouldPause = !0,
                this.emitter.emit(eo.EVENT_ENDED)
            }
            onNativeError() {
                this.src && this.src !== en.EMPTY_SOUND && (this.audio && this.audio.error && this.emitter.emit(eo.EVENT_ERROR, this.audio.error),
                this.playing = !1)
            }
            onNativePause() {
                this.emitter.emit(eo.EVENT_PAUSE),
                this.shouldPause = !1
            }
            onNativePlay() {
                this.emitter.emit(eo.EVENT_PLAY),
                this.shouldPlay = !1
            }
            onNativeSeeked() {
                this.emitter.emit(eo.EVENT_SEEKED)
            }
            onNativeStalled() {
                this.emitter.emit(eo.EVENT_STALLED)
            }
            onNativeCanplay() {
                this.emitter.emit(eo.EVENT_CANPLAY)
            }
            onNativePlaying() {
                this.playing && this.emitter.emit(eo.EVENT_PLAYING)
            }
            onNativeVolumeChange() {
                this.emitter.emit(eo.EVENT_VOLUMECHANGE, this.volumeLevel)
            }
            onNativeRatechange() {
                this.emitter.emit(eo.EVENT_RATECHANGE, this.playbackRate)
            }
            initUserEvents() {
                document.body.addEventListener("mousedown", this.startupAudio, !0),
                document.body.addEventListener("keydown", this.startupAudio, !0),
                document.body.addEventListener("touchstart", this.startupAudio, !0)
            }
            deinitUserEvents() {
                document.body.removeEventListener("mousedown", this.startupAudio, !0),
                document.body.removeEventListener("keydown", this.startupAudio, !0),
                document.body.removeEventListener("touchstart", this.startupAudio, !0)
            }
            initNativeEvents() {
                this.audio && (this.audio.addEventListener(en.EVENT_NATIVE_PAUSE, this.onNativePause),
                this.audio.addEventListener(en.EVENT_NATIVE_PLAY, this.onNativePlay),
                this.audio.addEventListener(en.EVENT_NATIVE_ENDED, this.onNativeEnded),
                this.audio.addEventListener(en.EVENT_NATIVE_TIMEUPDATE, this.updateProgress),
                this.audio.addEventListener(en.EVENT_NATIVE_DURATION, this.updateProgress),
                this.audio.addEventListener(en.EVENT_NATIVE_LOADING, this.onNativeLoading),
                this.audio.addEventListener(en.EVENT_NATIVE_ERROR, this.onNativeError),
                this.audio.addEventListener(en.EVENT_SEEKED, this.onNativeSeeked),
                this.audio.addEventListener(en.EVENT_NATIVE_STALLED, this.onNativeStalled),
                this.audio.addEventListener(en.EVENT_NATIVE_CANPLAY, this.onNativeCanplay),
                this.audio.addEventListener(en.EVENT_NATIVE_PLAYING, this.onNativePlaying),
                this.audio.addEventListener(en.EVENT_VOLUMECHANGE, this.onNativeVolumeChange),
                this.audio.addEventListener(en.EVENT_RATECHANGE, this.onNativeRatechange))
            }
            deinitNativeEvents() {
                this.audio && (this.audio.removeEventListener(en.EVENT_NATIVE_PAUSE, this.onNativePause),
                this.audio.removeEventListener(en.EVENT_NATIVE_PLAY, this.onNativePlay),
                this.audio.removeEventListener(en.EVENT_NATIVE_ENDED, this.onNativeEnded),
                this.audio.removeEventListener(en.EVENT_NATIVE_TIMEUPDATE, this.updateProgress),
                this.audio.removeEventListener(en.EVENT_NATIVE_DURATION, this.updateProgress),
                this.audio.removeEventListener(en.EVENT_NATIVE_LOADING, this.onNativeLoading),
                this.audio.removeEventListener(en.EVENT_NATIVE_ERROR, this.onNativeError),
                this.audio.removeEventListener(en.EVENT_SEEKED, this.onNativeSeeked),
                this.audio.removeEventListener(en.EVENT_NATIVE_STALLED, this.onNativeStalled),
                this.audio.removeEventListener(en.EVENT_NATIVE_CANPLAY, this.onNativeCanplay),
                this.audio.removeEventListener(en.EVENT_NATIVE_PLAYING, this.onNativePlaying),
                this.audio.removeEventListener(en.EVENT_VOLUMECHANGE, this.onNativeVolumeChange),
                this.audio.removeEventListener(en.EVENT_RATECHANGE, this.onNativeRatechange))
            }
            init() {
                return this.initEvents()
            }
            initEvents() {
                return new Promise(e => {
                    this.initUserEvents(),
                    this.initNativeEvents(),
                    e()
                }
                )
            }
            startupAudio() {
                this.audioContext && this.audioContext.resume(),
                this.deinitUserEvents();
                let e = () => {
                    this.shouldPlay = !1,
                    this.isAutoplayable = !0
                }
                  , t = e => {
                    this.shouldPlay = !1,
                    console.info("_startupAudio:failReason:".concat(e || ""))
                }
                  , a = () => {
                    if (this.audio && (this.audio.removeEventListener(en.EVENT_NATIVE_PLAY, a),
                    this.audio.removeEventListener(en.EVENT_NATIVE_CANPLAY, a),
                    this.audio.removeEventListener(en.EVENT_NATIVE_META, a),
                    this.audio.removeEventListener(en.EVENT_NATIVE_ERROR, a)),
                    this.promiseMode)
                        return;
                    let t = () => {
                        this.audio && this.audio.removeEventListener(en.EVENT_NATIVE_PAUSE, t),
                        e()
                    }
                    ;
                    this.clearNativePauseListener = () => {
                        this.audio && this.audio.addEventListener(en.EVENT_NATIVE_PAUSE, t)
                    }
                    ,
                    this.audio && (this.audio.addEventListener(en.EVENT_NATIVE_PAUSE, t),
                    this.audio.pause(),
                    this.shouldPause = !0)
                }
                ;
                this.clearInitListener = () => {
                    this.audio && (this.audio.removeEventListener(en.EVENT_NATIVE_PLAY, a),
                    this.audio.removeEventListener(en.EVENT_NATIVE_CANPLAY, a),
                    this.audio.removeEventListener(en.EVENT_NATIVE_META, a),
                    this.audio.removeEventListener(en.EVENT_NATIVE_ERROR, a))
                }
                ,
                this.audio && (this.audio.addEventListener(en.EVENT_NATIVE_PLAY, a),
                this.audio.addEventListener(en.EVENT_NATIVE_CANPLAY, a),
                this.audio.addEventListener(en.EVENT_NATIVE_META, a),
                this.audio.addEventListener(en.EVENT_NATIVE_ERROR, a),
                this.audio.load(),
                this.shouldPlay = !0,
                this.promiseMode = !0,
                this.audio.play().then( () => {
                    e(),
                    this.shouldPause = !0,
                    this.shouldPlay = !1,
                    this.audio && this.audio.pause()
                }
                ).catch( () => {
                    this.shouldPause = !0,
                    this.shouldPlay = !1,
                    t("audio.play")
                }
                ))
            }
            initAndCheckAutoplay() {
                return new Promise(e => {
                    let t = () => {
                        this.shouldPlay = !1,
                        this.isAutoplayable = !0,
                        e()
                    }
                      , a = t => {
                        this.shouldPlay = !1,
                        this.isAutoplayable = !1,
                        console.info(this, "initAndCheckAutoplay:failReason:".concat(t || "")),
                        e()
                    }
                      , i = e => {
                        if (this.audio && (this.audio.removeEventListener(en.EVENT_NATIVE_PLAY, i),
                        this.audio.removeEventListener(en.EVENT_NATIVE_CANPLAY, i),
                        this.audio.removeEventListener(en.EVENT_NATIVE_META, i),
                        this.audio.removeEventListener(en.EVENT_NATIVE_ERROR, i)),
                        this.promiseMode)
                            return;
                        if (e.type === en.EVENT_NATIVE_ERROR || e.type === en.EVENT_NATIVE_META) {
                            a(e.type);
                            return
                        }
                        let r = e => {
                            if (e.type === en.EVENT_NATIVE_ERROR) {
                                a(e.type);
                                return
                            }
                            this.audio && this.audio.removeEventListener(en.EVENT_NATIVE_PAUSE, r),
                            t()
                        }
                        ;
                        this.audio && (this.audio.addEventListener(en.EVENT_NATIVE_PAUSE, r),
                        this.audio.pause()),
                        this.shouldPause = !0
                    }
                    ;
                    this.audio && (this.audio.addEventListener(en.EVENT_NATIVE_PLAY, i),
                    this.audio.addEventListener(en.EVENT_NATIVE_CANPLAY, i),
                    this.audio.addEventListener(en.EVENT_NATIVE_META, i),
                    this.audio.addEventListener(en.EVENT_NATIVE_ERROR, i),
                    this.audio.src = en.EMPTY_SOUND,
                    this.audio.load(),
                    this.shouldPlay = !0,
                    this.promiseMode = !0,
                    this.audio.play().then( () => {
                        t(),
                        this.shouldPause = !0,
                        this.shouldPlay = !1,
                        this.audio && this.audio.pause()
                    }
                    ).catch( () => {
                        this.shouldPause = !0,
                        this.shouldPlay = !1,
                        a("audio.play")
                    }
                    ))
                }
                )
            }
            breakStartup(e) {
                this.deinitUserEvents(),
                this.clearInitListener && this.clearInitListener(),
                this.clearNativePauseListener && this.clearNativePauseListener(),
                console.warn("_startupAudio:interrupted", e)
            }
            waitFor(e, t, a) {
                let i;
                let r = this.promises[e];
                if (r)
                    i = r.promise();
                else {
                    let r = () => {}
                      , s = [new Promise( (e, t) => {
                        r = t
                    }
                    )]
                      , n = {}
                      , o = e => new Promise(a => {
                        let i = () => {
                            t() && a()
                        }
                        ;
                        this.audio && (this.audio.addEventListener(e, i),
                        n[e] = i)
                    }
                    )
                      , l = () => {
                        for (let e of Object.keys(n))
                            if (this.audio) {
                                let t = n[e];
                                t && this.audio.removeEventListener(e, t)
                            }
                    }
                    ;
                    for (let e of a)
                        s.push(o(e));
                    let d = Promise.race(s);
                    d.then(l).catch(l),
                    this.promises[e] = {
                        promise: () => d,
                        reject: r
                    },
                    i = d
                }
                return i
            }
            cancelWait(e, t) {
                let a;
                (a = this.promises[e]) && (delete this.promises[e],
                a.reject(t))
            }
            abortPromises(e) {
                for (let t in this.promises)
                    Object.prototype.hasOwnProperty.call(this.promises, t) && this.cancelWait(t, e)
            }
            promiseLoadedCheck() {
                if (this.loaderTimer ? clearTimeout(this.loaderTimer) : this.loaderTimer = setTimeout( () => {
                    this.cancelWait("loaded", "timeout")
                }
                , 5e3),
                this.audio) {
                    let e = Math.min(this.position + 45, this.audio.duration)
                      , t = this.audio.buffered.end(0) - this.audio.buffered.start(0);
                    return 0 !== this.audio.buffered.length && t >= e
                }
                return !1
            }
            promiseLoaded() {
                let e = this.waitFor("loaded", () => this.promiseLoadedCheck(), en.promiseLoadedEvents)
                  , t = () => {
                    this.loaderTimer && clearTimeout(this.loaderTimer)
                }
                ;
                return e.then(t).catch(t),
                e
            }
            promisePlayingCheck() {
                if (this.audio) {
                    let e = Math.min(this.position + .2, this.audio.duration);
                    return this.promiseCheckTO && clearTimeout(this.promiseCheckTO),
                    0 !== this.audio.currentTime || this.audio.paused || (this.promiseCheckTO = setTimeout( () => {
                        this.audio && 0 === this.audio.currentTime && !this.audio.paused && (this.audio.currentTime = 1)
                    }
                    , 1e3)),
                    this.audio.currentTime >= e
                }
                return !1
            }
            promisePlaying() {
                return this.waitFor("playing", () => this.promisePlayingCheck(), en.promisePlayingEvents)
            }
            promiseStartPlaying() {
                let e, t = !1;
                if (this.promises.startPlaying)
                    e = this.promises.startPlaying.promise();
                else {
                    let a, i = () => {}
                    , r = new Promise( (e, r) => {
                        this.promisePlaying().then( () => {
                            t = !0,
                            clearTimeout(a),
                            e()
                        }
                        ).catch(e => {
                            t = !0,
                            clearTimeout(a),
                            this.cancelWait("startPlaying", e)
                        }
                        ),
                        this.promiseLoaded().then( () => {
                            t || (a = setTimeout( () => {
                                r("timeout"),
                                this.cancelWait("playing", "timeout"),
                                console.warn("startPlaying:failed")
                            }
                            , 5e3))
                        }
                        ).catch(e => {
                            t = !0,
                            clearTimeout(a),
                            this.cancelWait("startPlaying", e)
                        }
                        ),
                        i = r
                    }
                    );
                    this.promises.startPlaying = {
                        promise: () => r,
                        reject: i
                    },
                    e = this.promises.startPlaying.promise()
                }
                return e
            }
            load(e) {
                this.abortPromises("load"),
                this.breakStartup("load"),
                this.ended = !1,
                this.playing = !1,
                this.notLoading = !0,
                this.position = 0,
                this.lastGoodTime = 0,
                this.src = e,
                this.audio && (this.audio.src = e,
                this.audio.load())
            }
            stop() {
                this.abortPromises("stop"),
                this.breakStartup("stop"),
                this.load("")
            }
            startPlay(e) {
                return this.playing ? (this.breakStartup("startPlay"),
                this.shouldPlay = !0,
                this.audio) ? this.audio.play().then( () => {
                    void 0 !== e && (this.position = e,
                    this.audio.currentTime = e)
                }
                ) : (this.promiseStartPlaying().then( () => {
                    this.retry = 0
                }
                ),
                Promise.resolve()) : Promise.resolve()
            }
            play(e) {
                return this.retry = 0,
                this.loadMetadata(e)
            }
            loadMetadata(e) {
                return this.playing ? Promise.resolve() : (this.breakStartup("play"),
                this.ended = !1,
                this.playing = !0,
                this.startPlay(e))
            }
            pause() {
                this.shouldPause = !0,
                this.playing = !1,
                this.audio && (this.audio.pause(),
                this.position = this.audio.currentTime)
            }
            setPosition(e) {
                if (!isFinite(e)) {
                    console.warn("setPositionFailed", e);
                    return
                }
                this.position = e,
                this.audio && (this.audio.currentTime = this.position)
            }
            destroy() {
                this.audio && (this.shouldPause = !0,
                this.audio.pause(),
                this.deinitNativeEvents()),
                this.abortPromises("destroy"),
                this.deinitUserEvents(),
                this.promises = {}
            }
            get currentTime() {
                return this.audio ? this.audio.currentTime : null
            }
            get duration() {
                return this.audio ? this.audio.duration : null
            }
            get loaded() {
                let e;
                if (this.audio && this.audio.buffered.length) {
                    let t = this.audio.buffered.length - 1;
                    e = this.audio.buffered.end(t)
                } else
                    e = null;
                return e
            }
            get volumeLevel() {
                return this.audio ? this.audio.volume : 0
            }
            set volumeLevel(e) {
                this.audio && (this.audio.volume = e)
            }
            set defaultPlaybackRate(e) {
                this.audio && (this.audio.defaultPlaybackRate = e)
            }
            get playbackRate() {
                return this.audio ? this.audio.playbackRate : 1
            }
            set playbackRate(e) {
                this.audio && (this.audio.playbackRate = e)
            }
            get audioSrc() {
                return this.src
            }
            get audioNotLoading() {
                return this.notLoading
            }
            get autoplayable() {
                return this.isAutoplayable
            }
            constructor(e) {
                (0,
                er._)(this, "audio", ed()),
                (0,
                er._)(this, "emitter", void 0),
                (0,
                er._)(this, "src", ""),
                (0,
                er._)(this, "position", 0),
                (0,
                er._)(this, "lastGoodTime", 0),
                (0,
                er._)(this, "lastUpdate", 0),
                (0,
                er._)(this, "notLoading", !0),
                (0,
                er._)(this, "shouldPause", !1),
                (0,
                er._)(this, "shouldPlay", !1),
                (0,
                er._)(this, "playing", !1),
                (0,
                er._)(this, "ended", !1),
                (0,
                er._)(this, "promiseMode", !1),
                (0,
                er._)(this, "promises", {}),
                (0,
                er._)(this, "audioContext", null),
                (0,
                er._)(this, "loaderTimer", null),
                (0,
                er._)(this, "promiseCheckTO", null),
                (0,
                er._)(this, "retry", 0),
                (0,
                er._)(this, "clearInitListener", null),
                (0,
                er._)(this, "clearNativePauseListener", null),
                (0,
                er._)(this, "isAutoplayable", !1),
                (0,
                er._)(this, "name", el++),
                (0,
                er._)(this, "whenReady", void 0),
                this.emitter = e,
                this.startupAudio = this.startupAudio.bind(this),
                this.updateProgress = this.updateProgress.bind(this),
                this.onNativeLoading = this.onNativeLoading.bind(this),
                this.onNativeEnded = this.onNativeEnded.bind(this),
                this.onNativeError = this.onNativeError.bind(this),
                this.onNativePause = this.onNativePause.bind(this),
                this.onNativePlay = this.onNativePlay.bind(this),
                this.onNativeSeeked = this.onNativeSeeked.bind(this),
                this.onNativeStalled = this.onNativeStalled.bind(this),
                this.onNativeCanplay = this.onNativeCanplay.bind(this),
                this.onNativePlaying = this.onNativePlaying.bind(this),
                this.onNativeVolumeChange = this.onNativeVolumeChange.bind(this),
                this.onNativeRatechange = this.onNativeRatechange.bind(this),
                this.whenReady = this.init()
            }
        }
        class ec {
            isOnlyDeviceVolume() {
                let e = !0;
                try {
                    let t = document.createElement("audio");
                    t.volume = .63,
                    e = Math.abs(t.volume - .63) > .01
                } catch (t) {
                    e = !0
                }
                return e
            }
            parseParams(e) {
                let t = e.split("?")[1];
                return t && t.length ? t.split("&").reduce(function(e, t) {
                    let a = t.split("=")
                      , i = a[0]
                      , r = a[1];
                    return i && r && (e[i] = r),
                    e
                }, {}) : {}
            }
            updateUrl(e, t) {
                let a = this.parseParams(e)
                  , i = "";
                for (let e in Object.assign(a, t),
                a)
                    Object.prototype.hasOwnProperty.call(a, e) && (i += "".concat(e, "=").concat(a[e]));
                return e + (i ? "?".concat(i) : "")
            }
            getCookie(e) {
                return document.cookie.split(";").reduce( (e, t) => {
                    let[a,i] = t.trim().split("=");
                    return a && i ? {
                        ...e,
                        [a]: i
                    } : e
                }
                , {})[e] || ""
            }
        }
        class em extends eu {
            init() {
                return this.initEvents().then( () => {
                    this.initHls()
                }
                )
            }
            load(e) {
                if (this.abortPromises("load"),
                this.breakStartup("load"),
                this.ended = !1,
                this.playing = !1,
                this.notLoading = !0,
                this.position = 0,
                this.lastGoodTime = 0,
                this.src = e,
                this.audio) {
                    if (/\.m3u8$/.test(e)) {
                        var t;
                        this.isHlsTrack = !0,
                        this.destroyHls(),
                        this.initHls(),
                        null === (t = this.hls) || void 0 === t || t.loadSource(this.getHlsPlayingEntityUrl(e))
                    } else
                        this.isHlsTrack = !1,
                        this.audio.src = e;
                    this.audio.load()
                }
            }
            stop() {
                this.abortPromises("stop"),
                this.breakStartup("stop"),
                this.isHlsTrack && this.destroyHls(),
                this.load("")
            }
            startPlay(e) {
                return this.playing ? (this.breakStartup("startPlay"),
                this.shouldPlay = !0,
                this.audio) ? this.audio.play().then( () => {
                    void 0 !== e && (this.position = e,
                    this.audio.currentTime = e)
                }
                ) : (this.hls && this.hls.startLoad(),
                this.promiseStartPlaying().then( () => {
                    this.retry = 0
                }
                ),
                Promise.resolve()) : Promise.resolve()
            }
            initHls() {
                this.hls || (this.hls = new es.ZP({
                    liveDurationInfinity: !0,
                    maxBufferSize: 3e6
                }),
                this.audio && this.hls.attachMedia(this.audio),
                this.initHlsEvents())
            }
            initHlsEvents() {
                this.hls && (this.hls.on(es.ZP.Events.ERROR, (e, t) => {
                    if (t.fatal && this.hls)
                        switch (t.type) {
                        case es.ZP.ErrorTypes.NETWORK_ERROR:
                            this.retry++,
                            this.retry > 2 ? (this.destroyHls(),
                            this.playing = !1,
                            this.emitter.emit(eo.EVENT_ERROR, t)) : this.hls.startLoad();
                            break;
                        case es.ZP.ErrorTypes.MEDIA_ERROR:
                            this.hls.recoverMediaError();
                            break;
                        default:
                            this.destroyHls(),
                            this.playing = !1,
                            this.emitter.emit(eo.EVENT_ERROR, t)
                        }
                }
                ),
                this.hls.on(es.ZP.Events.DESTROYING, () => {
                    this.hls = null
                }
                ))
            }
            getHlsPlayingEntityUrl(e) {
                let t = "";
                for (; t.length < 44; )
                    t += (Math.random() + 1).toString(36).substring(3);
                t = t.slice(0, 44);
                let a = this.playerInitializationTime.toString().slice(0, 10)
                  , i = "".concat(t, "xWEBx0001x").concat(a);
                return this.browser.updateUrl(e, {
                    vsid: i
                })
            }
            destroyHls() {
                this.retry = 0,
                this.hls && (this.hls.stopLoad(),
                this.hls.destroy(),
                this.hls = null)
            }
            pause() {
                this.shouldPause = !0,
                this.playing = !1,
                this.isHlsTrack && this.hls && this.hls.stopLoad(),
                this.audio && (this.audio.pause(),
                this.position = this.audio.currentTime)
            }
            constructor(e) {
                super(e),
                (0,
                er._)(this, "isHlsTrack", !1),
                (0,
                er._)(this, "playerInitializationTime", void 0),
                (0,
                er._)(this, "hls", null),
                (0,
                er._)(this, "browser", new ec),
                this.playerInitializationTime = Date.now()
            }
        }
        class eh extends Error {
            constructor(e) {
                super(e),
                this.name = "AudioError"
            }
        }
        let eg = {
            BAD_STATE: "action is not permited from current state"
        }
          , ep = 1;
        class ey {
            get source() {
                return this.loader.audio
            }
            play(e, t) {
                return this.loader.load(e),
                this.loader.play(t)
            }
            setSrc(e, t) {
                this.loader.load(e),
                void 0 !== t && this.loader.setPosition(t)
            }
            pause() {
                this.loader.pause()
            }
            resume() {
                return this.loader.play()
            }
            stop() {
                this.loader.stop(),
                this.emitter.emit(eo.EVENT_STOP)
            }
            destroy() {
                this.loader.destroy(),
                this.emitter.emit(eo.EVENT_DESTROY)
            }
            getPosition() {
                return this.loader.currentTime
            }
            setPosition(e) {
                this.loader.setPosition(e - .001)
            }
            getDuration() {
                return this.loader.duration
            }
            getLoaded() {
                return this.loader.loaded ? this.loader.loaded : 0
            }
            get volumeLevel() {
                return this.loader.volumeLevel
            }
            set volumeLevel(e) {
                this.loader.volumeLevel = Math.min(1, e)
            }
            get speedLevel() {
                return this.loader.playbackRate
            }
            set speedLevel(e) {
                this.loader.defaultPlaybackRate = e,
                this.loader.playbackRate = e
            }
            getSrc() {
                return "" !== this.loader.audioSrc ? this.loader.audioSrc : null
            }
            isAutoplayable() {
                return this.loader.autoplayable
            }
            constructor(e, t) {
                (0,
                er._)(this, "emitter", void 0),
                (0,
                er._)(this, "loader", void 0),
                (0,
                er._)(this, "name", ep++),
                (0,
                er._)(this, "type", "html5"),
                (0,
                er._)(this, "whenReady", void 0),
                this.emitter = e,
                this.loader = t,
                this.whenReady = this.loader.whenReady
            }
        }
        let ev = 1;
        class eE {
            get source() {
                var e;
                return null === (e = this.implementation) || void 0 === e ? void 0 : e.source
            }
            on(e, t) {
                this.emitter.on(e, t)
            }
            off(e, t) {
                this.emitter.off(e, t)
            }
            onAudioPlayerInit() {
                this.handleImplementationEvents(),
                this.setState(eo.STATE_IDLE)
            }
            handleImplementationEvents() {
                this.emitter.on(eo.EVENT_PLAY, () => {
                    this.implementationEventHandler(eo.EVENT_PLAY)
                }
                ),
                this.emitter.on(eo.EVENT_ENDED, () => {
                    this.implementationEventHandler(eo.EVENT_ENDED)
                }
                ),
                this.emitter.on(eo.EVENT_SWAP, () => {
                    this.implementationEventHandler(eo.EVENT_SWAP)
                }
                ),
                this.emitter.on(eo.EVENT_STOP, () => {
                    this.implementationEventHandler(eo.EVENT_STOP)
                }
                ),
                this.emitter.on(eo.EVENT_ERROR, () => {
                    this.implementationEventHandler(eo.EVENT_ERROR)
                }
                ),
                this.emitter.on(eo.HLS_EVENT_ERROR, () => {
                    this.implementationEventHandler(eo.HLS_EVENT_ERROR)
                }
                ),
                this.emitter.on(eo.EVENT_PAUSE, () => {
                    this.implementationEventHandler(eo.EVENT_PAUSE)
                }
                ),
                this.emitter.on(eo.EVENT_CRASHED, () => {
                    this.implementationEventHandler(eo.EVENT_CRASHED)
                }
                )
            }
            implementationEventHandler(e) {
                switch (e) {
                case eo.EVENT_PLAY:
                    this.setState(eo.STATE_PLAYING);
                    break;
                case eo.EVENT_ENDED:
                case eo.EVENT_SWAP:
                case eo.EVENT_STOP:
                case eo.EVENT_ERROR:
                case eo.HLS_EVENT_ERROR:
                    this.setState(eo.STATE_IDLE);
                    break;
                case eo.EVENT_PAUSE:
                    this.setState(eo.STATE_PAUSED);
                    break;
                case eo.EVENT_CRASHED:
                    this.setState(eo.STATE_CRASHED)
                }
            }
            onBeforeUnload() {
                navigator && 1 === navigator.maxTouchPoints || this.destroy()
            }
            setState(e) {
                if (e === eo.STATE_PAUSED && this.state !== eo.STATE_PLAYING)
                    return;
                let t = this.state !== e;
                this.state = e,
                t && this.emitter.emit(eo.EVENT_STATE, e)
            }
            waitEvents(e, t, a) {
                let i = () => {}
                  , r = () => {}
                  , s = new Promise( (e, t) => {
                    i = e,
                    r = t
                }
                );
                this.promises[e] = {
                    promise: () => s,
                    reject: r
                };
                let n = () => {
                    for (let e of t)
                        this.off(e, i);
                    for (let e of a)
                        this.off(e, r);
                    delete this.promises[e]
                }
                ;
                for (let e of t)
                    this.on(e, i);
                let o = e => t => {
                    let a = t instanceof Error ? t : new eh(e);
                    r(a)
                }
                ;
                for (let e of a)
                    this.on(e, o(e));
                return s.then(n).catch(n),
                s
            }
            getState() {
                return this.state
            }
            getSrc() {
                return this.implementation ? this.implementation.getSrc() : null
            }
            play(e, t) {
                return this.played = 0,
                this.lastSkip = 0,
                this.generatePlayId(),
                this.promises.whenPlay && this.promises.whenPlay.reject(eo.EVENT_PLAY),
                this.promises.whenPause && this.promises.whenPause.reject(eo.EVENT_PLAY),
                this.promises.whenStop && this.promises.whenStop.reject(eo.EVENT_PLAY),
                this.implementation.play(e, t)
            }
            setSrc(e, t) {
                this.implementation && this.implementation.setSrc(e, t)
            }
            restart() {
                return this.getDuration() ? (this.generatePlayId(),
                this.setPosition(0),
                this.played = 0,
                this.lastSkip = 0,
                this.resume()) : Promise.reject(new eh(eg.BAD_STATE))
            }
            stop() {
                let e;
                return this.implementation && (this.implementation.stop(),
                Promise.resolve()),
                this.played = 0,
                this.lastSkip = 0,
                this.promises.whenPlay && this.promises.whenPlay.reject(eo.EVENT_STOP),
                this.promises.whenPause && this.promises.whenPause.reject(eo.EVENT_STOP),
                e = this.promises.whenStop ? this.promises.whenStop.promise() : this.waitEvents("_whenStop", [eo.EVENT_STOP], [eo.EVENT_PLAY, eo.EVENT_ERROR, eo.HLS_EVENT_ERROR, eo.EVENT_CRASHED]),
                this.implementation && this.implementation.stop(),
                e
            }
            pause() {
                let e;
                return this.state !== eo.STATE_PLAYING ? Promise.reject(new eh(eg.BAD_STATE)) : (this.promises.whenPlay && this.promises.whenPlay.reject(eo.EVENT_PAUSE),
                e = this.promises.whenPause ? this.promises.whenPause.promise() : this.waitEvents("_whenPause", [eo.EVENT_PAUSE], [eo.EVENT_STOP, eo.EVENT_PLAY, eo.EVENT_ERROR, eo.HLS_EVENT_ERROR, eo.EVENT_CRASHED]),
                this.implementation && this.implementation.pause(),
                e)
            }
            resume() {
                let e;
                return this.state !== eo.STATE_PLAYING || this.promises.whenPause ? this.state === eo.STATE_IDLE || this.state === eo.STATE_PAUSED || this.state === eo.STATE_PLAYING ? (this.promises.whenPause && this.promises.whenPause.reject(eo.EVENT_RESUME),
                e = this.promises.whenPlay ? this.promises.whenPlay.promise() : this.waitEvents("_whenPlay", [eo.EVENT_PLAY], [eo.EVENT_STOP, eo.EVENT_ERROR, eo.HLS_EVENT_ERROR, eo.EVENT_CRASHED]),
                this.implementation && this.implementation.resume(),
                e.then( () => {
                    this.emitter.emit(eo.EVENT_RESUME)
                }
                )) : Promise.reject(new eh(eg.BAD_STATE)) : Promise.resolve()
            }
            destroy() {
                this.played = 0,
                this.lastSkip = 0,
                this.promises.whenPlay && this.promises.whenPlay.reject(eo.EVENT_DESTROY),
                this.promises.whenPause && this.promises.whenPause.reject(eo.EVENT_DESTROY),
                this.implementation && this.implementation.destroy()
            }
            getPosition() {
                let e = null;
                return this.implementation && (e = this.implementation.getPosition()),
                e || 0
            }
            setPosition(e) {
                return this.implementation && this.implementation.setPosition(e),
                this.played += this.getPosition() - this.lastSkip,
                this.lastSkip = e,
                e
            }
            getDuration() {
                let e = null;
                return this.implementation && (e = this.implementation.getDuration()),
                null === e ? 0 : e
            }
            getLoaded() {
                return this.implementation ? this.implementation.getLoaded() : 0
            }
            getPlayed() {
                let e = this.getPosition();
                return this.played += e - this.lastSkip,
                this.lastSkip = e,
                this.played
            }
            getVolume() {
                return this.implementation ? this.implementation.volumeLevel : 0
            }
            setVolume(e) {
                let t = 0;
                return this.implementation && (this.implementation.volumeLevel = e,
                t = e),
                t
            }
            getSpeed() {
                return this.implementation ? this.implementation.speedLevel : 0
            }
            setSpeed(e) {
                let t = 0;
                return this.implementation && (this.implementation.speedLevel = e,
                t = e),
                t
            }
            isAutoplayable() {
                let e = null;
                return this.implementation && (e = this.implementation.isAutoplayable()),
                null !== e && e
            }
            generatePlayId() {
                this.playId = Math.random().toString().slice(2)
            }
            getPlayId() {
                return this.playId
            }
            constructor(e, t) {
                (0,
                er._)(this, "emitter", void 0),
                (0,
                er._)(this, "played", 0),
                (0,
                er._)(this, "lastSkip", 0),
                (0,
                er._)(this, "playId", null),
                (0,
                er._)(this, "implementation", void 0),
                (0,
                er._)(this, "promises", {}),
                (0,
                er._)(this, "name", ev++),
                (0,
                er._)(this, "state", eo.STATE_INIT),
                this.emitter = e,
                window.addEventListener("beforeunload", () => this.onBeforeUnload(), !0),
                this.implementation = new ey(this.emitter,t),
                this.onAudioPlayerInit()
            }
        }
        var ef = a(6981);
        class eS {
            get source() {
                return this.core.source
            }
            play(e) {
                let {src: t, position: a} = e;
                return this.core.play(t, a)
            }
            setSrc(e) {
                let {src: t, position: a} = e;
                this.core.setSrc(t, a)
            }
            setProgress(e) {
                return Promise.resolve(this.core.setPosition(e))
            }
            pause() {
                return this.core.pause()
            }
            resume() {
                return this.core.resume()
            }
            setVolume(e) {
                return Promise.resolve(this.core.setVolume(e))
            }
            setSpeed(e) {
                return Promise.resolve(this.core.setSpeed(e))
            }
            stop() {
                return this.core.stop()
            }
            onEnd(e) {
                this.core.on(eo.EVENT_ENDED, e)
            }
            onPaused(e) {
                this.core.on(eo.EVENT_PAUSE, e)
            }
            onResume(e) {
                this.core.on(eo.EVENT_RESUME, e)
            }
            onUpdatingProgress(e) {
                this.core.on(eo.EVENT_PROGRESS, e)
            }
            onSeeked(e) {
                this.core.on(eo.EVENT_SEEKED, e)
            }
            onStalled(e) {
                this.core.on(eo.EVENT_STALLED, e)
            }
            onCanplay(e) {
                this.core.on(eo.EVENT_CANPLAY, e)
            }
            onPlaying(e) {
                this.core.on(eo.EVENT_PLAYING, e)
            }
            onError(e) {
                this.core.on(eo.EVENT_ERROR, e)
            }
            onVolumeChange(e) {
                this.core.on(eo.EVENT_VOLUMECHANGE, e)
            }
            onSpeedChange(e) {
                this.core.on(eo.EVENT_RATECHANGE, e)
            }
            onWaiting() {}
            offEnd(e) {
                this.core.off(eo.EVENT_ENDED, e)
            }
            offPaused(e) {
                this.core.off(eo.EVENT_PAUSE, e)
            }
            offResume(e) {
                this.core.off(eo.EVENT_RESUME, e)
            }
            offUpdatingProgress(e) {
                this.core.off(eo.EVENT_PROGRESS, e)
            }
            offSeeked(e) {
                this.core.off(eo.EVENT_SEEKED, e)
            }
            offStalled(e) {
                this.core.off(eo.EVENT_STALLED, e)
            }
            offCanplay(e) {
                this.core.off(eo.EVENT_CANPLAY, e)
            }
            offPlaying(e) {
                this.core.off(eo.EVENT_PLAYING, e)
            }
            offError(e) {
                this.core.off(eo.EVENT_ERROR, e)
            }
            offVolumeChange(e) {
                this.core.off(eo.EVENT_VOLUMECHANGE, e)
            }
            offSpeedChange(e) {
                this.core.off(eo.EVENT_RATECHANGE, e)
            }
            offWaiting() {}
            constructor() {
                (0,
                er._)(this, "coreContentType", "audio"),
                (0,
                er._)(this, "emitter", new ef.v)
            }
        }
        class eb extends eS {
            constructor(...e) {
                super(...e),
                (0,
                er._)(this, "loader", new em(this.emitter)),
                (0,
                er._)(this, "core", new eE(this.emitter,this.loader))
            }
        }
        class eP extends eS {
            constructor(...e) {
                super(...e),
                (0,
                er._)(this, "loader", new eu(this.emitter)),
                (0,
                er._)(this, "core", new eE(this.emitter,this.loader))
            }
        }
        var eA = a(26925)
          , e_ = a(13254)
          , eN = a(35068)
          , eC = a(10420)
          , eT = a(50850);
        (i = I || (I = {})).PLAYING = "playing",
        i.NOT_PLAYING = "not-playing";
        let eI = e => !!("object" == typeof e && e && "streamProgress"in e && "object" == typeof e.streamProgress && e.streamProgress && "endPositionSec"in e.streamProgress && "number" == typeof e.streamProgress.endPositionSec);
        class ek {
            set playId(e) {
                this.entityPlayId = e
            }
            get playId() {
                return this.entityPlayId
            }
            set addTracksToPlayerTime(e) {
                this.entityAddTracksToPlayerTime = e
            }
            get addTracksToPlayerTime() {
                return this.entityAddTracksToPlayerTime
            }
            get totalPlayedSeconds() {
                return function(e) {
                    let t, a, i = 0, r = [];
                    if (0 !== e.length) {
                        for (let i of function(e) {
                            let t = [];
                            for (; 0 !== e.length; ) {
                                let a = e.shift();
                                if (a && a.stage === I.PLAYING) {
                                    let e = t[t.length - 1];
                                    e && e.stage !== I.NOT_PLAYING || t.push(a)
                                } else if (a && a.stage === I.NOT_PLAYING) {
                                    let e = t[t.length - 1];
                                    e && e.stage === I.PLAYING && t.push(a)
                                }
                            }
                            let a = t[t.length - 1];
                            return a && a.stage === I.PLAYING && t.push({
                                stage: I.NOT_PLAYING,
                                perfNow: performance.now(),
                                ts: Date.now()
                            }),
                            t
                        }(e))
                            i.stage === I.PLAYING ? t = i.perfNow : a = i.perfNow,
                            t && a && (r.push(a - t),
                            t = void 0,
                            a = void 0);
                        for (let e of r)
                            i += e;
                        return Math.round((i / 1e3 + Number.EPSILON) * 1e3) / 1e3
                    }
                    return i
                }([...this.entityTimeStagesOfPlayback])
            }
            get timeStagesOfPlayback() {
                return this.entityTimeStagesOfPlayback
            }
            saveTimeStageOfPlayback(e) {
                let t = {
                    stage: e.stage,
                    perfNow: performance.now(),
                    ts: Date.now()
                };
                e.reason && (t.reason = e.reason),
                this.entityTimeStagesOfPlayback.push(t)
            }
            clearTimeStagesOfPlayback() {
                this.entityTimeStagesOfPlayback = []
            }
            get data() {
                return this.entityData
            }
            get isAvailable() {
                return !!("available"in this.entityData.meta && this.entityData.meta.available)
            }
            get isDisliked() {
                return void 0 !== this.likeStore && this.likeStore.isTrackDisliked(this.entityData.meta.id)
            }
            get everFinished() {
                return eI(this.entityData.meta) ? this.entityData.meta.streamProgress.everFinished : null
            }
            set everFinished(e) {
                eI(this.entityData.meta) && null !== e && (this.entityData.meta.streamProgress.everFinished = e)
            }
            hasPlayId() {
                return "" !== this.playId
            }
            constructor(e) {
                (0,
                er._)(this, "entityData", void 0),
                (0,
                er._)(this, "likeStore", void 0),
                (0,
                er._)(this, "entityPlayId", ""),
                (0,
                er._)(this, "entityAddTracksToPlayerTime", ""),
                (0,
                er._)(this, "entityTimeStagesOfPlayback", []),
                (0,
                er._)(this, "mediaElementErrorReloadCounter", 0),
                (0,
                er._)(this, "mediaSourceData", null),
                (0,
                er._)(this, "expectedQuality", null),
                (0,
                er._)(this, "startPosition", null),
                (0,
                er._)(this, "lastSeekPosition", null),
                (0,
                er._)(this, "contentType", eT.z.AUDIO),
                (0,
                er._)(this, "hidden", !1),
                this.entityData = e.data,
                this.likeStore = e.likeStore
            }
        }
        class eD extends ek {
        }
        class eR extends ek {
        }
        class eL extends ek {
            get isAvailable() {
                return !1
            }
            get isDisliked() {
                return !1
            }
        }
        var eV = a(46393);
        class ex extends eV.y {
            constructor(e, {code: t="E_ENTITY_FACTORY", ...a}={}) {
                super(e, {
                    code: t,
                    ...a
                }),
                (0,
                er._)(this, "name", "EntityFactoryException"),
                Object.setPrototypeOf(this, ex.prototype)
            }
        }
        class eO extends ek {
            get isAvailable() {
                return !0
            }
            get isDisliked() {
                return !1
            }
            constructor(...e) {
                super(...e),
                (0,
                er._)(this, "contentType", eT.z.HLS)
            }
        }
        class ew extends ek {
            get isAvailable() {
                return !0
            }
            get isDisliked() {
                return !1
            }
        }
        class eG {
            create(e) {
                let t = null
                  , {data: a} = e;
                void 0 === a.fromCurrentContext && (a.fromCurrentContext = !0);
                try {
                    switch (a.type) {
                    case eC.A.Music:
                        t = new eD({
                            data: a,
                            likeStore: this.likeStore
                        });
                        break;
                    case eC.A.VibeTrack:
                        t = new eR({
                            data: a,
                            likeStore: this.likeStore
                        });
                        break;
                    case eC.A.Generative:
                        t = new eO({
                            data: a,
                            likeStore: this.likeStore
                        });
                        break;
                    case eC.A.SmartPreview:
                        t = new ew({
                            data: a,
                            likeStore: this.likeStore
                        });
                        break;
                    case eC.A.Unknown:
                        a.meta.type,
                        eN.V.MUSIC,
                        t = new eD({
                            data: {
                                ...a,
                                type: eC.A.Music
                            },
                            likeStore: this.likeStore
                        });
                        break;
                    case e_.RX.Unloaded:
                        t = new eL({
                            data: a,
                            likeStore: this.likeStore
                        })
                    }
                } catch (e) {
                    throw new ex("Error while creating entity",{
                        cause: e,
                        data: {
                            type: a.type,
                            meta: a.meta
                        }
                    })
                }
                if (null !== t)
                    return t;
                throw new ex("Cannot create entities with nonexistent type",{
                    code: "E_NONEXISTENT_ENTITY_TYPE",
                    data: {
                        type: a.type,
                        meta: a.meta
                    }
                })
            }
            constructor(e) {
                (0,
                er._)(this, "likeStore", void 0),
                this.likeStore = e.likeStore
            }
        }
        var eM = a(19489)
          , ej = a(19725);
        function eU(e, t) {
            let a = [];
            for (let i of e)
                for (let e of i)
                    a.push({
                        type: e_.RX.Unloaded,
                        meta: e,
                        additional: t
                    });
            return a
        }
        var eq = a(54941);
        class eF extends e_.$n {
            get isCurrentContext() {
                return this.isCurrent
            }
            set isCurrentContext(e) {
                this.isCurrent = e
            }
            get availableActions() {
                return this.actions
            }
            constructor(...e) {
                super(...e),
                (0,
                er._)(this, "isCurrent", !1),
                (0,
                er._)(this, "actions", {
                    moveBackward: new eq.wi(!1),
                    moveForward: new eq.wi(!0),
                    repeat: new eq.wi(null),
                    shuffle: new eq.wi(null),
                    speed: new eq.wi(null)
                }),
                (0,
                er._)(this, "from", ""),
                (0,
                er._)(this, "utmLink", void 0)
            }
        }
        class eB extends eV.y {
            constructor(e, {code: t="E_CONTEXT", ...a}={}) {
                super(e, {
                    code: t,
                    ...a
                }),
                (0,
                er._)(this, "name", "ContextException"),
                Object.setPrototypeOf(this, eB.prototype)
            }
        }
        function eY(e, t) {
            return e.map(e => ({
                type: eC.A.SmartPreview,
                meta: e,
                additional: t
            }))
        }
        class eW extends eF {
            loadTrailer() {
                return this.albumsResource.getTrailer({
                    albumId: Number(this.contextData.meta.id)
                }).then(e => (this.contextData.meta.trailerTracks = e.trailer.tracks,
                e)).catch(e => {
                    throw new eB("Error in AlbumContext",{
                        code: "E_ALBUM_LOAD_TRAILER",
                        cause: e,
                        data: {
                            contextId: this.contextData.meta.id
                        }
                    })
                }
                )
            }
            apply(e) {}
            loadContextMeta() {
                return this.albumsResource.getAlbumWithRichTracks({
                    albumId: Number(this.contextData.meta.id),
                    resumeStream: !0
                }).then(e => (this.contextData.meta = e,
                e)).catch(e => {
                    throw new eB("Error in AlbumContext",{
                        code: "E_ALBUM_LOAD_CONTEXT_META",
                        cause: e,
                        data: {
                            contextId: this.contextData.meta.id
                        }
                    })
                }
                )
            }
            getContextEntitiesData() {
                let e = {
                    from: this.from,
                    utmLink: this.utmLink
                };
                return this.contextData.trailer ? this.loadTrailer().then(t => eY(t.trailer.tracks, e)) : this.contextData.meta.volumes ? Promise.resolve(eU(this.contextData.meta.volumes, e)) : this.loadContextMeta().then(t => Promise.resolve(eU(t.volumes, e)))
            }
            get type() {
                return this.contextData.type
            }
            get data() {
                return this.contextData
            }
            get resumeFromIndex() {
                var e;
                if ((null === (e = this.contextData.meta.resumeFrom) || void 0 === e ? void 0 : e.trackId) && Array.isArray(this.contextData.meta.volumes)) {
                    let e = [].concat(...this.contextData.meta.volumes).findIndex(e => {
                        var t;
                        return e.id === (null === (t = this.contextData.meta.resumeFrom) || void 0 === t ? void 0 : t.trackId)
                    }
                    );
                    if (e >= 0)
                        return e
                }
                return null
            }
            constructor(e) {
                super(),
                (0,
                er._)(this, "contextData", void 0),
                (0,
                er._)(this, "albumsResource", void 0),
                (0,
                er._)(this, "variables", void 0);
                let {data: t, albumResourceConfig: a, httpClient: i, variables: r} = e;
                this.albumsResource = new ej.S(i,a),
                this.contextData = t,
                this.from = t.from,
                this.utmLink = t.utmLink,
                this.variables = r
            }
        }
        var eK = a(21143)
          , eH = a(57602)
          , ez = a(89646);
        let eQ = (e, t) => "".concat(e, ":").concat(t)
          , eJ = e => 3 === e;
        class eZ extends eF {
            loadTrailer() {
                let {uid: e, kind: t} = (0,
                ez.b)(this.contextData.meta.id);
                return this.usersResource.getPlaylistTrailer({
                    userId: e,
                    playlistKind: t
                }).then(e => (this.contextData.meta.trailerTracks = e.trailer.tracks,
                e)).catch(e => {
                    throw new eB("Error in PlaylistContext",{
                        code: "E_PLAYLIST_LOAD_TRAILER",
                        cause: e,
                        data: {
                            contextId: this.contextData.meta.id
                        }
                    })
                }
                )
            }
            apply(e) {}
            loadContextMeta() {
                let e = this.contextData.meta.uuid
                  , {uid: t, kind: a} = (0,
                ez.b)(this.contextData.meta.id)
                  , i = eJ(a);
                return (i && void 0 !== e ? this.playlistResource.getPlaylist({
                    playlistUuid: e,
                    resumeStream: !1,
                    richTracks: !1
                }) : this.usersResource.getPlaylistWithTracksIds({
                    userId: t,
                    playlistKind: a,
                    resumeStream: !1,
                    trackMetaType: i ? "music" : void 0
                })).then(e => {
                    let t = {
                        ...e,
                        id: eQ(e.uid, e.kind)
                    };
                    return this.contextData.meta = t,
                    t
                }
                ).catch(e => {
                    throw new eB("Error in PlaylistContext",{
                        code: "E_PLAYLIST_LOAD_CONTEXT_META",
                        cause: e,
                        data: {
                            contextId: this.contextData.meta.id
                        }
                    })
                }
                )
            }
            getContextEntitiesData() {
                let e = {
                    from: this.from,
                    utmLink: this.utmLink
                };
                if (this.contextData.trailer)
                    return this.loadTrailer().then(t => eY(t.trailer.tracks, e));
                if (this.contextData.meta.tracks) {
                    let t = [];
                    for (let a of this.contextData.meta.tracks)
                        t.push({
                            type: e_.RX.Unloaded,
                            meta: a,
                            additional: e
                        });
                    return Promise.resolve(t)
                }
                return this.loadContextMeta().then(t => {
                    let a = [];
                    for (let i of t.tracks)
                        a.push({
                            type: e_.RX.Unloaded,
                            meta: i,
                            additional: e
                        });
                    return a
                }
                )
            }
            get type() {
                return this.contextData.type
            }
            get data() {
                return this.contextData
            }
            constructor(e) {
                super(),
                (0,
                er._)(this, "contextData", void 0),
                (0,
                er._)(this, "usersResource", void 0),
                (0,
                er._)(this, "playlistResource", void 0),
                (0,
                er._)(this, "variables", void 0);
                let {data: t, usersResourceConfig: a, playlistResourceConfig: i, httpClient: r, variables: s} = e;
                this.usersResource = new eK.V(r,a),
                this.playlistResource = new eH.B(r,i),
                this.contextData = t,
                this.from = t.from,
                this.utmLink = t.utmLink,
                this.variables = s
            }
        }
        var eX = a(58826);
        class e$ extends eF {
            loadTrailer() {
                return this.artistsResource.getTrailer({
                    artistId: String(this.contextData.meta.id)
                }).then(e => (this.contextData.meta.trailerTracks = e.trailer.tracks,
                e)).catch(e => {
                    throw new eB("Error in ArtistContext",{
                        code: "E_ARTIST_LOAD_TRAILER",
                        cause: e,
                        data: {
                            contextId: this.contextData.meta.id
                        }
                    })
                }
                )
            }
            apply(e) {}
            loadContextMeta() {
                return this.artistsResource.getBriefInfo({
                    artistId: String(this.contextData.meta.id),
                    discographyBlockEnabled: !1,
                    fetchPlaylistLikesCounts: !1
                }).then(e => {
                    this.contextData.meta.artist = e.artist
                }
                ).catch(e => {
                    throw new eB("Error in ArtistContext",{
                        code: "E_ARTIST_LOAD_CONTEXT_META",
                        cause: e,
                        data: {
                            contextId: this.contextData.meta.id
                        }
                    })
                }
                ),
                this.artistsResource.getArtistTrackIds({
                    artistId: String(this.contextData.meta.id)
                }).then(e => (this.contextData.meta.trackIds = e,
                this.contextData.meta)).catch(e => {
                    throw new eB("Error in ArtistContext",{
                        code: "E_ARTIST_LOAD_CONTEXT_META",
                        cause: e,
                        data: {
                            contextId: this.contextData.meta.id
                        }
                    })
                }
                )
            }
            getContextEntitiesData() {
                let e = {
                    from: this.from,
                    utmLink: this.utmLink
                };
                if (this.contextData.trailer)
                    return this.loadTrailer().then(t => eY(t.trailer.tracks, e));
                if (this.contextData.meta.trackIds) {
                    let t = [];
                    for (let a of this.contextData.meta.trackIds)
                        t.push({
                            type: e_.RX.Unloaded,
                            meta: {
                                id: a
                            },
                            additional: e
                        });
                    return Promise.resolve(t)
                }
                return this.loadContextMeta().then(t => {
                    let a = [];
                    if (t.trackIds)
                        for (let i of t.trackIds)
                            a.push({
                                type: e_.RX.Unloaded,
                                meta: {
                                    id: i
                                },
                                additional: e
                            });
                    return a
                }
                )
            }
            get type() {
                return this.contextData.type
            }
            get data() {
                return this.contextData
            }
            constructor(e) {
                super(),
                (0,
                er._)(this, "contextData", void 0),
                (0,
                er._)(this, "artistsResource", void 0),
                (0,
                er._)(this, "variables", void 0);
                let {data: t, artistsResourceConfig: a, httpClient: i, variables: r} = e;
                this.artistsResource = new eX.c(i,a),
                this.contextData = t,
                this.from = t.from,
                this.utmLink = t.utmLink,
                this.variables = r
            }
        }
        var e0 = a(90377)
          , e5 = a(35231);
        function e1(e, t) {
            let a = [];
            for (let i of e)
                a.push({
                    type: eC.A.VibeTrack,
                    additional: t,
                    meta: {
                        ...i.track,
                        liked: i.liked,
                        trackParameters: i.trackParameters
                    },
                    fromCurrentContext: !0
                });
            return a
        }
        function e2(e) {
            var t;
            let a;
            if (!(a = e.data.type === e_.RX.Unloaded ? e.data.meta.id : "realId"in e.data.meta ? e.data.meta.realId : e.data.meta.id))
                throw new eB("Error in VibeContext",{
                    code: "E_WRONG_VIBE_CONTEXT"
                });
            let i = "albums"in e.data.meta ? e.data.meta.albums : [];
            return i && (null === (t = i[0]) || void 0 === t ? void 0 : t.id) ? "".concat(a, ":").concat(i[0].id) : String(a)
        }
        function e3(e, t) {
            return e.slice(0, t + 2).map(e => {
                let {entity: t} = e;
                return e2(t)
            }
            )
        }
        function e6() {
            return new Date().toISOString()
        }
        let e4 = e => "object" == typeof e && e && "durationMs"in e && "number" == typeof e.durationMs;
        class e9 extends eV.y {
            constructor(e, {code: t="E_VIBE_CONTEXT_FEEDBACK", ...a}={}) {
                super(e, {
                    code: t,
                    ...a
                }),
                (0,
                er._)(this, "name", "VibeContextFeedbackException"),
                Object.setPrototypeOf(this, e9.prototype)
            }
        }
        var e8 = a(81376);
        class e7 extends eF {
            apply(e) {
                let {hooks: t, playback: a} = e;
                t.beforeContextSet.tap("VibeContext", () => {
                    this.isCurrentContext && this.sendFeedback(a.state.playerState, a.state.queueState, e0.C.SKIP)
                }
                ),
                t.afterSetupQueue.tap("VibeContext", () => {
                    var e;
                    if (this.isCurrentContext && this.contextData.cloneSessionId && this.contextData.meta.session && (null === (e = this.variables) || void 0 === e ? void 0 : e.enableGetNextTracksAfterCloneVibeContext)) {
                        let e = e1(this.contextData.meta.session.sequence, {
                            from: this.from,
                            utmLink: this.utmLink
                        });
                        a.injectLast(e)
                    }
                }
                ),
                t.afterMediaStartPlaying.tapPromise("VibeContext", () => this.isCurrentContext ? new Promise(e => {
                    this.isVibeStarted ? this.sendFeedback(a.state.playerState, a.state.queueState, e0.C.TRACK_STARTED) : (this.sendFeedback(a.state.playerState, a.state.queueState, e0.C.RADIO_STARTED).then( () => {
                        this.sendFeedback(a.state.playerState, a.state.queueState, e0.C.TRACK_STARTED)
                    }
                    ),
                    this.isVibeStarted = !0),
                    e()
                }
                ) : Promise.resolve()),
                t.beforeFindPlayableEntityIndex.tapPromise("VibeContext", e => this.isCurrentContext ? new Promise( (t, i) => {
                    switch (e) {
                    case e_.Zp.AUTO_MOVE_FORWARD:
                        this.onAutoMoveForward(a).then(t).catch(i);
                        break;
                    case e_.Zp.MOVE_FORWARD:
                        this.onMoveForward(a).then(t).catch(i);
                        break;
                    case e_.Zp.MOVE_BACKWARD:
                        this.sendFeedback(a.state.playerState, a.state.queueState, e0.C.SKIP),
                        t();
                        break;
                    case e_.Zp.SET_INDEX:
                    case e_.Zp.RESTART_CONTEXT:
                        t()
                    }
                }
                ) : Promise.resolve()),
                t.beforeEntityChange.tapPromise("VibeContext", e => this.isCurrentContext && e.method === e_.Zp.SET_INDEX ? this.onSetIndex(a, e.index) : Promise.resolve())
            }
            loadContextMeta() {
                let {meta: {id: e}, seeds: t} = this.contextData;
                return (this.contextData.cloneSessionId ? this.rotorResource.sessionClone({
                    ...this.contextData,
                    seeds: t,
                    includeWaveModel: !0,
                    radioSessionId: this.contextData.cloneSessionId,
                    trackToStartFrom: void 0
                }) : this.rotorResource.sessionNew({
                    ...this.contextData,
                    seeds: t,
                    includeWaveModel: !0
                })).then(t => (this.contextData.meta.session = t,
                this.contextData.trackToStartFrom = void 0,
                {
                    id: e,
                    session: t
                })).catch(e => {
                    throw new eB("Error in VibeContext",{
                        code: "E_VIBE_LOAD_CONTEXT_META",
                        cause: e,
                        data: {
                            contextId: this.contextData.meta.id,
                            sessionId: this.contextData.meta.session ? this.contextData.meta.session.radioSessionId : ""
                        }
                    })
                }
                )
            }
            setSettings(e, t, a) {
                let {meta: {id: i}} = this.contextData
                  , r = e3(a.entityList.value, a.index.value);
                return this.sendFeedback(t, a, e0.C.SKIP).then( () => this.rotorResource.sessionNew({
                    ...this.contextData,
                    seeds: e,
                    queue: r,
                    includeWaveModel: !0
                }).then(e => (this.contextData.meta.session = e,
                this.contextData.meta.id = (0,
                e8.$)(e.wave.seeds),
                {
                    id: i,
                    session: this.contextData.meta.session
                })).catch(e => {
                    throw new eB("Error in VibeContext",{
                        code: "E_VIBE_LOAD_CONTEXT_META",
                        cause: e,
                        data: {
                            contextId: this.contextData.meta.id,
                            sessionId: this.contextData.meta.session ? this.contextData.meta.session.radioSessionId : ""
                        }
                    })
                }
                ))
            }
            getContextEntitiesData() {
                let {meta: {session: e}} = this.contextData
                  , t = {
                    from: this.from,
                    utmLink: this.utmLink
                };
                if (e) {
                    let {sequence: a} = e;
                    return Promise.resolve(e1(a, t))
                }
                return this.loadContextMeta().then(e => {
                    let {session: {sequence: a}} = e;
                    return e1(a, t)
                }
                ).catch(e => {
                    throw new eB("Error in VibeContext",{
                        code: "E_VIBE_GET_CONTEXT_ENTITIES_DATA",
                        cause: e,
                        data: {
                            contextId: this.contextData.meta.id,
                            sessionId: this.contextData.meta.session ? this.contextData.meta.session.radioSessionId : ""
                        }
                    })
                }
                )
            }
            get type() {
                return this.contextData.type
            }
            get data() {
                return this.contextData
            }
            formatContextError(e, t, a, i) {
                return i ? new eB(e,{
                    code: t,
                    cause: a,
                    data: {
                        contextId: i.meta.id,
                        sessionId: i.meta.session ? i.meta.session.radioSessionId : ""
                    }
                }) : new eB(e,{
                    code: t,
                    cause: a
                })
            }
            storeFeedbacksForSending(e) {
                if (e) {
                    let t = Array.isArray(e) ? e : [e];
                    this.feedbackForSending.push(...t)
                }
            }
            getFeedbacksForSending() {
                var e;
                if (!(null === (e = this.variables) || void 0 === e ? void 0 : e.sendFeedbackToSessionTracks))
                    return null;
                let t = this.feedbackForSending;
                return this.feedbackForSending = [],
                t
            }
            sendFeedbackOnMoveForward(e, t) {
                var a;
                let i;
                return (null === (a = this.variables) || void 0 === a ? void 0 : a.sendFeedbackToSessionTracks) ? (i = Promise.resolve(),
                this.storeFeedbacksForSending(this.generateFeedbackForTracks(e.state.queueState, t))) : i = this.sendFeedback(e.state.playerState, e.state.queueState, t),
                i
            }
            onAutoMoveForward(e) {
                return this.sendFeedbackOnMoveForward(e, e0.C.TRACK_FINISHED).then( () => {
                    let {index: t, entityList: a} = e.state.queueState
                      , i = t.value === a.value.length - 2
                      , r = t.value === a.value.length - 1;
                    if (!i && !r)
                        return Promise.resolve();
                    let s = this.getNextSessionTracks(e).then(t => {
                        e.injectLast(t),
                        this.availableActions.moveForward.value = !0
                    }
                    ).catch(e => this.logger.error(this.formatContextError("Error in VibeContext", "E_GET_SESSION_TRACKS", e, this.contextData)));
                    return i ? Promise.resolve() : s
                }
                )
            }
            onMoveForward(e) {
                return this.sendFeedbackOnMoveForward(e, e0.C.SKIP).then( () => {
                    let {index: t, entityList: a} = e.state.queueState
                      , i = [];
                    for (let e = t.value + 2; e < a.value.length; e++)
                        i.push(e);
                    e.remove(i, !0);
                    let r = this.getNextSessionTracks(e).then(t => e.injectLast(t)).catch(e => this.logger.error(this.formatContextError("Error in VibeContext", "E_GET_SESSION_TRACKS", e, this.contextData)));
                    return t.value === a.value.length - 1 ? r : Promise.resolve()
                }
                )
            }
            onSetIndex(e, t) {
                let a = e.getEntityByIndex({
                    index: t
                });
                if (!a)
                    return Promise.resolve();
                let {entity: i} = a;
                return i.hasPlayId() ? Promise.resolve() : this.sendFeedbackOnMoveForward(e, e0.C.SKIP).then( () => {
                    let {index: t, entityList: a} = e.state.queueState
                      , i = [];
                    for (let e = t.value + 2; e < a.value.length; e++)
                        i.push(e);
                    return e.remove(i, !0),
                    this.getNextSessionTracks(e).then(t => e.injectLast(t)).catch(e => this.logger.error(this.formatContextError("Error in VibeContext", "E_GET_SESSION_TRACKS", e, this.contextData))),
                    Promise.resolve()
                }
                )
            }
            getNextSessionTracks(e) {
                if (!this.contextData.meta.session)
                    return Promise.reject(this.formatContextError("Error in VibeContext", "E_NO_SESSION", void 0));
                let {meta: {session: t}, aliceExperiments: a, djData: i, useIchwill: r} = this.contextData
                  , s = {
                    from: this.from,
                    utmLink: this.utmLink
                }
                  , n = e3(e.state.queueState.entityList.value, e.state.queueState.index.value)
                  , o = this.getFeedbacksForSending();
                return this.rotorResource.sessionTracks({
                    radioSessionId: t.radioSessionId,
                    queue: n,
                    aliceExperiments: a,
                    djData: i,
                    useIchwill: r,
                    feedbacks: o || void 0
                }).then(e => {
                    this.contextData.meta.sessionTracks = e;
                    let {sequence: t} = e;
                    return e1(t, s)
                }
                ).catch(e => (this.storeFeedbacksForSending(o),
                Promise.reject(e)))
            }
            generateFeedbackForTracks(e, t) {
                let a = this.generateFeedback(e, t)
                  , i = null;
                if (a) {
                    var r;
                    i = {
                        batchId: a.batchId,
                        from: a.event.from,
                        event: a.event
                    };
                    let s = null === (r = e.currentEntity.value) || void 0 === r ? void 0 : r.entity.data.meta;
                    if (t === e0.C.TRACK_FINISHED && e4(s)) {
                        let e = s.durationMs / 1e3
                          , t = e % 1 == 0 ? e : Number(e.toFixed(3));
                        i.event.trackLengthSeconds = t
                    }
                }
                return i
            }
            generateFeedback(e, t, a) {
                let i = null;
                if (!this.contextData.meta.session)
                    return i;
                let {meta: {session: r, sessionTracks: s}} = this.contextData
                  , n = function(e, t, a, i) {
                    let r = null != i ? i : e.currentEntity.value
                      , s = {
                        timestamp: e6(),
                        type: t,
                        from: a
                    };
                    if (r) {
                        let {entity: e} = r;
                        s.trackId = e2(e),
                        s.totalPlayedSeconds = e.totalPlayedSeconds
                    }
                    return s
                }(e, t, this.from, a)
                  , {radioSessionId: o} = r
                  , l = s ? s.batchId : r.batchId;
                switch (t) {
                case e0.C.RADIO_STARTED:
                    i = {
                        batchId: l,
                        radioSessionId: o,
                        event: {
                            type: t,
                            timestamp: n.timestamp,
                            from: n.from
                        }
                    };
                    break;
                case e0.C.TRACK_STARTED:
                case e0.C.TRACK_FINISHED:
                case e0.C.SKIP:
                case e0.C.LIKE:
                case e0.C.UNLIKE:
                case e0.C.DISLIKE:
                case e0.C.UNDISLIKE:
                    i = {
                        batchId: l,
                        radioSessionId: o,
                        event: n
                    }
                }
                return i
            }
            sendFeedback(e, t, a, i) {
                let r = this.generateFeedback(t, a, i);
                return this.contextData.meta.session && r ? this.rotorResource.sessionFeedback(r).then( () => Promise.resolve()).catch(e => {
                    this.logger.error(new e9("Feedback error",{
                        cause: e
                    }))
                }
                ) : (this.logger.error(new e9("Feedback error")),
                Promise.resolve())
            }
            constructor(e) {
                super(),
                (0,
                er._)(this, "contextData", void 0),
                (0,
                er._)(this, "rotorResource", void 0),
                (0,
                er._)(this, "logger", void 0),
                (0,
                er._)(this, "feedbackForSending", []),
                (0,
                er._)(this, "isVibeStarted", !1),
                (0,
                er._)(this, "variables", void 0);
                let {data: t, rotorResourceConfig: a, httpClient: i, logger: r, variables: s} = e;
                this.rotorResource = new e5.U(i,a),
                this.logger = r,
                this.contextData = t,
                this.from = t.from,
                this.utmLink = t.utmLink,
                this.availableActions.repeat.value = !1,
                this.availableActions.shuffle.value = !1,
                this.variables = s
            }
        }
        var te = a(74354);
        class tt extends eF {
            getContextId() {
                var e, t;
                let a = null === (t = this.contextData.meta.albums) || void 0 === t ? void 0 : null === (e = t[0]) || void 0 === e ? void 0 : e.id;
                return a ? "".concat(this.contextData.meta.id, ":").concat(a) : String(this.contextData.meta.id)
            }
            loadTrailer() {
                return this.tracksResource.getTrailer({
                    trackId: this.getContextId()
                }).then(e => (this.contextData.meta = e.track,
                e)).catch(e => {
                    throw new eB("Error in PlaylistContext",{
                        code: "E_PLAYLIST_LOAD_TRAILER",
                        cause: e,
                        data: {
                            contextId: this.contextData.meta.id
                        }
                    })
                }
                )
            }
            apply(e) {}
            loadContextMeta() {
                let e = this.getContextId();
                return this.tracksResource.getTracksMeta({
                    trackIds: [e],
                    withProgress: !0
                }).then(t => {
                    let a = t[0];
                    if (a)
                        return this.contextData.meta = a,
                        a;
                    throw new eB("Error in VariousContext. Track not found",{
                        code: "E_VARIOUS_LOAD_CONTEXT_META",
                        data: {
                            contextId: e
                        }
                    })
                }
                ).catch(t => {
                    throw new eB("Error in VariousContext",{
                        code: "E_VARIOUS_LOAD_CONTEXT_META",
                        cause: t,
                        data: {
                            contextId: e
                        }
                    })
                }
                )
            }
            getContextEntitiesData() {
                let e = {
                    from: this.from,
                    utmLink: this.utmLink
                };
                return this.contextData.trailer ? this.loadTrailer().then(t => [{
                    meta: t.track,
                    type: eC.A.SmartPreview,
                    additional: e
                }]) : this.contextData.meta ? Promise.resolve([{
                    meta: this.contextData.meta,
                    type: eC.A.Unknown,
                    additional: e
                }]) : this.loadContextMeta().then(t => [{
                    meta: t,
                    type: eC.A.Unknown,
                    additional: e
                }])
            }
            get type() {
                return this.contextData.type
            }
            get data() {
                return this.contextData
            }
            constructor(e) {
                super(),
                (0,
                er._)(this, "contextData", void 0),
                (0,
                er._)(this, "tracksResource", void 0),
                (0,
                er._)(this, "variables", void 0);
                let {data: t, tracksResourceConfig: a, httpClient: i, variables: r} = e;
                this.tracksResource = new te.H(i,a),
                this.contextData = t,
                this.from = t.from,
                this.utmLink = t.utmLink,
                this.variables = r
            }
        }
        class ta extends eV.y {
            constructor(e, {code: t="E_CONTEXT_FACTORY", ...a}={}) {
                super(e, {
                    code: t,
                    ...a
                }),
                (0,
                er._)(this, "name", "ContextFactoryException"),
                Object.setPrototypeOf(this, ta.prototype)
            }
        }
        (r = k || (k = {})).StreamPause = "streamPause",
        r.StreamPlay = "streamPlay";
        let ti = e => [{
            type: eC.A.Generative,
            meta: e
        }]
          , tr = "E_GENERATIVE_RESTART_LIMIT";
        class ts extends eF {
            apply(e) {
                let {hooks: t, playback: a} = e;
                a.state.playerState.status.onChange(e => {
                    this.isCurrentContext && e && (e === e_.FY.PLAYING ? (this.isPaused && this.sendFeedback(k.StreamPlay, a),
                    this.isPaused = !1) : e === e_.FY.PAUSED && (this.sendFeedback(k.StreamPause, a),
                    this.isPaused = !0))
                }
                ),
                t.afterError.tap("GenerativeContext", e => {
                    e && e instanceof eB && e.code === tr || !this.isCurrentContext || this.restart(a)
                }
                )
            }
            loadContextMeta() {
                return this.rotorResource.getGenerativeInfo({
                    stationId: String(this.contextData.meta.id)
                }).then(e => {
                    let t = {
                        id: String(this.contextData.meta.id),
                        stream: e.stream,
                        ...e.data
                    };
                    return this.contextData.meta = t,
                    t
                }
                ).catch(e => {
                    throw new eB("Error GenerativeContext",{
                        code: "E_GENERATIVE_LOAD_CONTEXT_META",
                        cause: e,
                        data: {
                            contextId: this.contextData.meta.id
                        }
                    })
                }
                )
            }
            getContextEntitiesData() {
                var e;
                return (null === (e = this.contextData.meta.stream) || void 0 === e ? void 0 : e.id) ? Promise.resolve(ti(this.contextData.meta)) : this.loadContextMeta().then(e => Promise.resolve(ti(e)))
            }
            get type() {
                return this.contextData.type
            }
            get data() {
                return this.contextData
            }
            sendFeedback(e, t) {
                var a;
                this.rotorResource.stationFeedback({
                    type: e,
                    stationId: String(this.contextData.meta.id),
                    streamId: String(null === (a = this.contextData.meta.stream) || void 0 === a ? void 0 : a.id),
                    timestamp: e6()
                }).then(e => {
                    e.reload_stream && this.restart(t)
                }
                )
            }
            restart(e) {
                return this.restartsCount >= 5 && e.hooks.afterError.promise(new eB("Error GenerativeContext",{
                    code: tr,
                    data: {
                        contextId: this.contextData.meta.id
                    }
                })),
                this.restartsCount++,
                this.loadContextMeta().then( () => e.restartContext({
                    playAfterRestart: !this.isPaused,
                    entitiesData: ti(this.contextData.meta)
                }))
            }
            constructor(e) {
                super(),
                (0,
                er._)(this, "contextData", void 0),
                (0,
                er._)(this, "rotorResource", void 0),
                (0,
                er._)(this, "isPaused", !1),
                (0,
                er._)(this, "restartsCount", 0),
                (0,
                er._)(this, "variables", void 0);
                let {data: t, rotorResourceConfig: a, httpClient: i, variables: r} = e;
                this.rotorResource = new e5.U(i,a),
                this.contextData = t,
                this.from = t.from,
                this.utmLink = t.utmLink,
                this.availableActions.repeat.value = !1,
                this.availableActions.shuffle.value = !1,
                this.availableActions.moveBackward.value = !1,
                this.availableActions.moveForward.value = !1,
                this.variables = r
            }
        }
        class tn {
            create(e) {
                let t = null
                  , {data: a} = e;
                try {
                    var i, r, s, n, o, l, d, u, c, m, h, g;
                    switch (a.type) {
                    case eM.A.Album:
                        t = new eW({
                            data: a,
                            albumResourceConfig: {
                                params: this.config.params,
                                prefixUrl: this.config.prefixUrl,
                                retryPolicyConfig: this.config.retryPolicyConfig,
                                timeouts: null === (i = this.config.resourceTimeoutsConfig) || void 0 === i ? void 0 : i.albumsResource
                            },
                            httpClient: this.httpClient,
                            variables: null === (r = this.config.contextVariables) || void 0 === r ? void 0 : r[eM.A.Album]
                        });
                        break;
                    case eM.A.Playlist:
                        t = new eZ({
                            data: a,
                            usersResourceConfig: {
                                params: this.config.params,
                                prefixUrl: this.config.prefixUrl,
                                retryPolicyConfig: this.config.retryPolicyConfig,
                                timeouts: null === (s = this.config.resourceTimeoutsConfig) || void 0 === s ? void 0 : s.usersResource
                            },
                            playlistResourceConfig: {
                                params: this.config.params,
                                prefixUrl: this.config.prefixUrl,
                                retryPolicyConfig: this.config.retryPolicyConfig,
                                timeouts: null === (n = this.config.resourceTimeoutsConfig) || void 0 === n ? void 0 : n.playlistResource
                            },
                            httpClient: this.httpClient,
                            variables: null === (o = this.config.contextVariables) || void 0 === o ? void 0 : o[eM.A.Playlist]
                        });
                        break;
                    case eM.A.Artist:
                        t = new e$({
                            data: a,
                            artistsResourceConfig: {
                                params: this.config.params,
                                prefixUrl: this.config.prefixUrl,
                                retryPolicyConfig: this.config.retryPolicyConfig,
                                timeouts: null === (l = this.config.resourceTimeoutsConfig) || void 0 === l ? void 0 : l.artistsResource
                            },
                            httpClient: this.httpClient,
                            variables: null === (d = this.config.contextVariables) || void 0 === d ? void 0 : d[eM.A.Artist]
                        });
                        break;
                    case eM.A.Vibe:
                        t = new e7({
                            data: a,
                            rotorResourceConfig: {
                                params: this.config.params,
                                prefixUrl: this.config.prefixUrl,
                                retryPolicyConfig: this.config.retryPolicyConfig,
                                timeouts: null === (u = this.config.resourceTimeoutsConfig) || void 0 === u ? void 0 : u.rotorResource
                            },
                            httpClient: this.httpClient,
                            logger: this.logger,
                            variables: null === (c = this.config.contextVariables) || void 0 === c ? void 0 : c[eM.A.Vibe]
                        });
                        break;
                    case eM.A.Various:
                        t = new tt({
                            data: a,
                            tracksResourceConfig: {
                                params: this.config.params,
                                prefixUrl: this.config.prefixUrl,
                                retryPolicyConfig: this.config.retryPolicyConfig,
                                timeouts: null === (m = this.config.resourceTimeoutsConfig) || void 0 === m ? void 0 : m.tracksResource
                            },
                            httpClient: this.httpClient,
                            variables: null === (h = this.config.contextVariables) || void 0 === h ? void 0 : h[eM.A.Various]
                        });
                        break;
                    case eM.A.Generative:
                        t = new ts({
                            data: a,
                            httpClient: this.httpClient,
                            rotorResourceConfig: {
                                params: this.config.params,
                                prefixUrl: this.config.prefixUrl
                            },
                            variables: null === (g = this.config.contextVariables) || void 0 === g ? void 0 : g[eM.A.Generative]
                        })
                    }
                } catch (e) {
                    throw new ta("Error while creating context",{
                        cause: e,
                        data: {
                            type: a.type,
                            meta: a.meta
                        }
                    })
                }
                if (null !== t)
                    return t;
                throw new ta("Cannot create context with nonexistent type",{
                    code: "E_NONEXISTENT_CONTEXT_TYPE",
                    data: {
                        type: a.type,
                        meta: a.meta
                    }
                })
            }
            constructor(e) {
                (0,
                er._)(this, "httpClient", void 0),
                (0,
                er._)(this, "config", void 0),
                (0,
                er._)(this, "logger", void 0);
                let {config: t, httpClient: a, logger: i} = e;
                this.config = t,
                this.httpClient = a,
                this.logger = i
            }
        }
        var to = a(98);
        class tl {
            canBePlayed(e) {
                let t = "playDisliked"in this.context.data && void 0 !== this.context.data.playDisliked && this.context.data.playDisliked
                  , {entityChangeMethod: a, index: i} = e
                  , r = t || a === e_.Zp.SET_INDEX || a === e_.Zp.PLAY_CONTEXT && void 0 !== i
                  , s = a === e_.Zp.SET_INDEX
                  , n = !r && this.entity.isDisliked
                  , o = !s && this.entity.hidden;
                return !!this.entity.isAvailable && (n ? !!(0,
                to.x)(this.context) : !o)
            }
            constructor(e, t) {
                (0,
                er._)(this, "context", void 0),
                (0,
                er._)(this, "entity", void 0),
                this.context = e,
                this.entity = t
            }
        }
        class td {
            createContext(e) {
                return this.contextFactory.create(e)
            }
            createEntity(e) {
                return this.entityFactory.create(e)
            }
            createContextEntityPair(e, t) {
                return new tl(e,t)
            }
            constructor(e) {
                (0,
                er._)(this, "entityFactory", void 0),
                (0,
                er._)(this, "contextFactory", void 0),
                this.entityFactory = new eG(e.entityFactoryParams),
                this.contextFactory = new tn(e.contextFactoryParams)
            }
        }
        function tu(e) {
            return (null == e ? void 0 : e.data.type) === eC.A.SmartPreview
        }
        (s = D || (D = {})).SUSPENDED = "suspended",
        s.RUNNING = "running",
        s.CLOSED = "closed";
        class tc {
            getAverageFrequencies(e) {
                var t, a, i;
                null === (t = this.analyserNode) || void 0 === t || t.getByteFrequencyData(this.spectrum);
                let r = this.audioContext.sampleRate / this.bufferLength
                  , s = 0
                  , n = e.map(e => {
                    let {low: t, high: a} = e
                      , i = Math.floor(a / r);
                    return s = Math.max(s, i),
                    {
                        startIndex: Math.floor(t / r),
                        endIndex: i
                    }
                }
                )
                  , o = Array(s + 2).fill(0);
                for (let e = 0; e < s + 1; e++) {
                    let t = (null !== (a = this.spectrum[e]) && void 0 !== a ? a : 0) / 256;
                    o[e + 1] = (null !== (i = o[e]) && void 0 !== i ? i : 0) + t
                }
                return n.map(e => {
                    let {startIndex: t, endIndex: a} = e
                      , i = o[t]
                      , r = o[a + 1];
                    return void 0 === i || void 0 === r ? 0 : (r - i) / (a - t + 1)
                }
                )
            }
            constructor(e, t) {
                (0,
                er._)(this, "audioContext", void 0),
                (0,
                er._)(this, "analyserNode", void 0),
                (0,
                er._)(this, "bufferLength", 0),
                (0,
                er._)(this, "spectrum", new Uint8Array),
                this.audioContext = e,
                this.analyserNode = e.createAnalyser(),
                this.analyserNode.fftSize = 32,
                this.analyserNode.smoothingTimeConstant = .9,
                t.connect(this.analyserNode),
                this.analyserNode.connect(this.audioContext.destination),
                this.bufferLength = this.analyserNode.frequencyBinCount,
                this.spectrum = new Uint8Array(this.bufferLength)
            }
        }
        (n = R || (R = {})).IDLE = "IDLE",
        n.ENABLED = "ENABLED",
        n.DISABLED = "DISABLED",
        (o = L || (L = {})).HIGHSHELF = "highshelf",
        o.PEAKING = "peaking",
        o.LOWSHELF = "lowshelf";
        class tm {
            get lastBand() {
                return this.bands[this.bands.length - 1]
            }
            createBand(e, t, a) {
                let i = this.audioContext.createBiquadFilter();
                return i.type = e,
                i.frequency.value = t,
                i.Q.value = 1,
                a && i.gain.setValueAtTime(a, this.audioContext.currentTime + .3),
                i
            }
            createBandsByFrequencies(e) {
                return e.map( (t, a) => {
                    let {key: i, value: r} = t;
                    return this.createBand(this.getBiquadFilterType(a, e.length), i, r)
                }
                )
            }
            connectBandsBetween(e) {
                let t = this.preamp;
                return e.forEach(e => {
                    t.connect(e),
                    t = e
                }
                ),
                e
            }
            getBiquadFilterType(e, t) {
                return 0 === e ? L.LOWSHELF : e === t - 1 ? L.HIGHSHELF : L.PEAKING
            }
            updateBands(e, t) {
                e.forEach( (e, a) => {
                    let i = t[a];
                    i && e.gain.setValueAtTime(i.value, this.audioContext.currentTime + .3)
                }
                )
            }
            setPreamp(e) {
                this.preamp.gain.linearRampToValueAtTime(e, this.audioContext.currentTime + .3)
            }
            enable() {
                this.state !== R.ENABLED && (this.sourceNode.disconnect(),
                this.state = R.ENABLED,
                this.sourceNode.connect(this.preamp),
                this.lastBand && this.lastBand.connect(this.audioContext.destination))
            }
            disable() {
                this.state !== R.DISABLED && (this.sourceNode.disconnect(),
                this.lastBand && this.lastBand.disconnect(),
                this.state = R.DISABLED,
                this.sourceNode.connect(this.audioContext.destination))
            }
            applyPreset(e) {
                this.setPreamp(e.preamp),
                0 === this.bands.length ? this.bands = this.connectBandsBetween(this.createBandsByFrequencies(e.frequencies)) : this.updateBands(this.bands, e.frequencies)
            }
            constructor(e, t, a) {
                (0,
                er._)(this, "audioContext", void 0),
                (0,
                er._)(this, "sourceNode", void 0),
                (0,
                er._)(this, "preamp", void 0),
                (0,
                er._)(this, "state", R.DISABLED),
                (0,
                er._)(this, "bands", []),
                this.audioContext = e,
                this.sourceNode = t,
                this.preamp = this.audioContext.createGain(),
                (null == a ? void 0 : a.preset) && this.applyPreset(a.preset)
            }
        }
        (l = V || (V = {})).IDLE = "IDLE",
        l.ENABLED = "ENABLED",
        l.DISABLED = "DISABLED";
        let th = 1e3 / 60;
        class tg {
            updateGain() {
                if (this.state !== V.ENABLED)
                    return;
                let e = this.audioElement.currentTime
                  , t = e >= this.inStart && e <= this.inStop
                  , a = e >= this.outStart && e <= this.outStop;
                if (t) {
                    let t = this.getFadeInVolume(e);
                    this.gainNode.gain.setValueAtTime(t, this.audioContext.currentTime)
                }
                if (a) {
                    let t = this.getFadeOutVolume(e);
                    this.gainNode.gain.setValueAtTime(t, this.audioContext.currentTime)
                }
                e > this.inStop && e < this.outStart && this.gainNode.gain.setValueAtTime(1, this.audioContext.currentTime),
                e > this.outStop && this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
            }
            getFadeInVolume(e) {
                return Math.min(e / (this.inStop - this.inStart), 1)
            }
            getFadeOutVolume(e) {
                let t = this.outStop - this.outStart;
                return Math.max(1 - (e - this.outStart) / t, 0)
            }
            enable() {
                this.state = V.ENABLED,
                this.intervalId || (this.intervalId = setInterval(this.updateGain.bind(this), th))
            }
            disable() {
                this.state = V.DISABLED,
                this.intervalId && (clearInterval(this.intervalId),
                this.intervalId = null)
            }
            apply(e) {
                if (!e) {
                    this.disable(),
                    this.gainNode.gain.value = 1;
                    return
                }
                this.gainNode.gain.value = 0;
                let {inStart: t, inStop: a, outStart: i, outStop: r} = e;
                this.inStart = t,
                this.inStop = a,
                this.outStart = i,
                this.outStop = r,
                this.enable()
            }
            constructor({audioElement: e, audioContext: t, sourceNode: a}) {
                (0,
                er._)(this, "audioElement", void 0),
                (0,
                er._)(this, "audioContext", void 0),
                (0,
                er._)(this, "sourceNode", void 0),
                (0,
                er._)(this, "gainNode", void 0),
                (0,
                er._)(this, "state", V.IDLE),
                (0,
                er._)(this, "inStart", 0),
                (0,
                er._)(this, "inStop", 0),
                (0,
                er._)(this, "outStart", 0),
                (0,
                er._)(this, "outStop", 0),
                (0,
                er._)(this, "intervalId", null),
                this.audioElement = e,
                this.audioContext = t,
                this.sourceNode = a,
                this.gainNode = t.createGain(),
                this.sourceNode.connect(this.gainNode),
                this.gainNode.connect(this.audioContext.destination)
            }
        }
        class tp {
            apply(e) {
                this.durationMs = e
            }
            constructor({playback: e}) {
                (0,
                er._)(this, "playback", null),
                (0,
                er._)(this, "durationMs", void 0),
                this.playback = e,
                this.playback.state.playerState.progress.onChange(e => {
                    var t, a;
                    let i = (null !== (t = this.durationMs) && void 0 !== t ? t : 0) / 1e3
                      , r = e && Math.abs(e.duration - i) > 1;
                    e && e.position > i && r && (null === (a = this.playback) || void 0 === a || a.moveForward())
                }
                )
            }
        }
        class ty {
            get isAudioContextRequired() {
                return !!this.options.useEqualizer || !!this.options.useAnalyser || !!this.options.useFade
            }
            checkAndResumeAudioContext() {
                var e;
                let t = () => {
                    var e;
                    null === (e = this.audioContext) || void 0 === e || e.resume().then( () => {
                        document.body.removeEventListener("touchend", t, !0),
                        document.body.removeEventListener("click", t, !0),
                        document.body.removeEventListener("keydown", t, !0)
                    }
                    )
                }
                ;
                (null === (e = this.audioContext) || void 0 === e ? void 0 : e.state) === D.SUSPENDED && (document.body.addEventListener("touchend", t, !0),
                document.body.addEventListener("click", t, !0),
                document.body.addEventListener("keydown", t, !0))
            }
            initializeContext(e, t) {
                if (this.audioElement = e,
                this.isAudioContextRequired) {
                    if (this.audioContext = new AudioContext,
                    this.sourceNode = this.audioContext.createMediaElementSource(this.audioElement),
                    this.checkAndResumeAudioContext(),
                    this.options.useAnalyser && (this.analyser = new tc(this.audioContext,this.sourceNode)),
                    this.options.useEqualizer) {
                        let e = "object" == typeof this.options.useEqualizer ? this.options.useEqualizer : void 0;
                        this.equalizer = new tm(this.audioContext,this.sourceNode,e)
                    }
                    this.options.useFade && (this.fade = new tg({
                        audioElement: this.audioElement,
                        audioContext: this.audioContext,
                        sourceNode: this.sourceNode
                    }))
                }
                this.options.useSmartPreview && (this.smartPreview = new tp({
                    playback: t
                }))
            }
            apply(e) {
                let {hooks: t, playback: a} = e;
                a.state.mediaPlayersStore.onChange(e => {
                    if (void 0 === e)
                        return;
                    let t = e[eT.z.AUDIO];
                    void 0 !== t && (0,
                    e_.SE)(t) && void 0 === this.audioContext && this.initializeContext(t.source, a)
                }
                ),
                a.state.playerState.event.onChange( () => {
                    if (this.fade)
                        switch (a.state.playerState.event.value) {
                        case e_.xg.PLAYING:
                            this.fade.enable();
                            break;
                        case e_.xg.PAUSED:
                        case e_.xg.STOP:
                            this.fade.disable()
                        }
                }
                ),
                t.beforeMediaStartPlaying.tapPromise("WebAudioPlugin", () => {
                    var e, t, i;
                    let r, s;
                    let {currentEntity: n} = a.state.queueState
                      , o = null === (e = n.value) || void 0 === e ? void 0 : e.entity;
                    return tu(o) && (r = null === (t = o.data.meta.smartPreviewParams) || void 0 === t ? void 0 : t.fade,
                    s = null === (i = o.data.meta.smartPreviewParams) || void 0 === i ? void 0 : i.durationMs),
                    (null == o ? void 0 : o.data.type) === eC.A.Music && (r = o.data.meta.fade,
                    s = o.data.meta.durationMs),
                    this.fade && this.fade.apply(r),
                    this.smartPreview && this.smartPreview.apply(s),
                    Promise.resolve()
                }
                )
            }
            constructor(e) {
                (0,
                er._)(this, "options", void 0),
                (0,
                er._)(this, "audioElement", void 0),
                (0,
                er._)(this, "audioContext", void 0),
                (0,
                er._)(this, "sourceNode", void 0),
                (0,
                er._)(this, "analyser", void 0),
                (0,
                er._)(this, "equalizer", void 0),
                (0,
                er._)(this, "fade", void 0),
                (0,
                er._)(this, "smartPreview", void 0),
                this.options = e
            }
        }
        var tv = a(10231)
          , tE = {
            WEB: "WEB",
            ANDROID: "ANDROID",
            IOS: "IOS",
            WEB_TV: "WEB_TV"
        }
          , tf = {
            NONE: "NONE",
            ONE: "ONE",
            ALL: "ALL"
        }
          , tS = {
            DO_NOT_INTERCEPT_BY_DEFAULT: "DO_NOT_INTERCEPT_BY_DEFAULT"
        }
          , tb = {
            TRACK: "TRACK",
            INFINITE: "INFINITE"
        }
          , tP = "BASED_ON_ENTITY_BY_DEFAULT"
          , tA = {
            ARTIST: "ARTIST",
            PLAYLIST: "PLAYLIST",
            ALBUM: "ALBUM",
            RADIO: "RADIO",
            VARIOUS: "VARIOUS",
            GENERATIVE: "GENERATIVE"
        }
          , t_ = function(e, t) {
            return {
                device_id: e,
                version: Math.floor(0x7fffffffffffffff * Math.random()) + 0,
                timestamp_ms: void 0 !== t ? t : Date.now()
            }
        };
        function tN(e) {
            var t = t_(e, 0);
            return {
                player_state: {
                    player_queue: {
                        current_playable_index: -1,
                        entity_id: "",
                        entity_type: tA.VARIOUS,
                        playable_list: [],
                        options: {
                            repeat_mode: tf.NONE
                        },
                        shuffle_optional: null,
                        entity_context: tP,
                        version: t,
                        from_optional: "",
                        initial_entity_optional: null,
                        adding_options_optional: null,
                        queue: null
                    },
                    status: {
                        duration_ms: 0,
                        paused: !0,
                        playback_speed: 1,
                        progress_ms: 0,
                        version: t
                    },
                    player_queue_inject_optional: null
                },
                devices: [],
                active_device_id_optional: ""
            }
        }
        function tC(e) {
            return JSON.parse(JSON.stringify(e))
        }
        function tT(e, t, a) {
            return void 0 === e && (e = !1),
            !!e || !t || !a || Number(t.timestamp_ms) < Number(a.timestamp_ms)
        }
        function tI(e) {
            var t = e.active_device_id_optional;
            return e.devices.find(function(e) {
                return e.info.device_id === t
            })
        }
        var tk = function() {
            function e(e) {
                Object.defineProperty(this, "state", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }),
                Object.defineProperty(this, "prevState", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }),
                Object.defineProperty(this, "diff", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: {}
                }),
                Object.defineProperty(this, "options", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }),
                Object.defineProperty(this, "diffCalculators", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }),
                Object.defineProperty(this, "lastRemoteDeviceChangingState", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }),
                Object.defineProperty(this, "lastRemoteDeviceChangingStateTS", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }),
                this.options = e,
                this.state = tN(e.device.device_id),
                this.prevState = tN(e.device.device_id),
                this.diffCalculators = {
                    active_device_id_optional: this.calculateActiveDeviceDiff.bind(this),
                    devices: this.calculateDevicesDiff.bind(this),
                    player_state: {
                        player_queue: {
                            entity_id: this.calculateEntityIdDiff.bind(this),
                            entity_type: this.calculateEntityTypeDiff.bind(this),
                            entity_context: function() {},
                            current_playable_index: this.calculateCurrentPlayableIndexDiff.bind(this),
                            playable_list: this.calculatePlayableListDiff.bind(this),
                            options: {
                                repeat_mode: this.calculateRepeatDiff.bind(this)
                            },
                            version: function() {},
                            shuffle_optional: this.calculcateShuffleDiff.bind(this),
                            from_optional: function() {},
                            initial_entity_optional: function() {},
                            adding_options_optional: function() {},
                            queue: function() {}
                        },
                        status: {
                            progress_ms: this.calculateProgressMsDiff.bind(this),
                            duration_ms: function() {},
                            paused: this.calculatePausedDiff.bind(this),
                            playback_speed: this.calculateSpeedDiff.bind(this),
                            version: function() {}
                        },
                        player_queue_inject_optional: function() {}
                    }
                }
            }
            return Object.defineProperty(e.prototype, "setState", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    for (var t in e)
                        Object.prototype.hasOwnProperty.call(e, t) && (this.state[t] = e[t])
                }
            }),
            Object.defineProperty(e.prototype, "getState", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function() {
                    return tC(this.state)
                }
            }),
            Object.defineProperty(e.prototype, "clearPrevState", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function() {
                    var e = this.options.device.device_id;
                    this.prevState = tN(e)
                }
            }),
            Object.defineProperty(e.prototype, "getPrevState", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function() {
                    return tC(this.prevState)
                }
            }),
            Object.defineProperty(e.prototype, "calculateDiff", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t = [this.diffCalculators];
                    this.diff = {};
                    var a = this.options
                      , i = a.diffWhileActiveOnly
                      , r = a.device.device_id;
                    try {
                        var s = e.newState.active_device_id_optional
                          , n = e.skipDeviceActivityCheck
                          , o = e.isSetNewState
                          , l = this.state.active_device_id_optional;
                        if (!(void 0 !== n && n) && i && r !== l && r !== s)
                            this.calculateActiveDeviceDiff(e);
                        else {
                            for (; t.length > 0; )
                                for (var d = t.pop(), u = 0, c = Object.keys(d); u < c.length; u++) {
                                    var m = d[c[u]];
                                    "function" == typeof m ? m(e) : t.push(m)
                                }
                            var h = Object.keys(this.diff);
                            if ((void 0 === o || o) && h.length) {
                                var g = tC(this.state);
                                h.forEach(function(t) {
                                    g[t] = e.newState[t]
                                }),
                                this.prevState = tC(this.state),
                                this.state = g
                            }
                        }
                        return tC(this.diff)
                    } catch (e) {
                        return {}
                    }
                }
            }),
            Object.defineProperty(e.prototype, "calculateActiveDeviceDiff", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t = e.newState.active_device_id_optional;
                    t !== this.state.active_device_id_optional && (this.diff.active_device_id_optional = t)
                }
            }),
            Object.defineProperty(e.prototype, "calculateDevicesDiff", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t = e.newState
                      , a = e.skipVersionCompare
                      , i = function(e, t, a) {
                        if (!t || !a || t.info.device_id !== a.info.device_id)
                            return {
                                isVolumeChanged: !1,
                                isNewVersion: !1
                            };
                        var i = t.volume_info
                          , r = a.volume_info
                          , s = tT(e, i.version, r.version);
                        return {
                            isVolumeChanged: i.volume !== r.volume && Math.abs(r.volume - i.volume) > .02,
                            isNewVersion: s
                        }
                    }(void 0 !== a && a, tI(this.state), tI(t))
                      , r = i.isVolumeChanged
                      , s = i.isNewVersion
                      , n = function(e, t) {
                        var a = {
                            isAnyoneConnectionChanged: !1
                        };
                        if (e.length < t.length)
                            for (var i = function(t) {
                                e.find(function(e) {
                                    return e.info.device_id === t.info.device_id
                                }) || (a = {
                                    isAnyoneConnectionChanged: !0,
                                    changedConnectionStatusDevice: t
                                })
                            }, r = 0; r < t.length; r++) {
                                var s = t[r];
                                i(s)
                            }
                        else if (e.length === t.length)
                            for (var n = function(t) {
                                var i = e.find(function(e) {
                                    return e.info.device_id === t.info.device_id
                                });
                                i && i.is_offline !== t.is_offline && (a = {
                                    isAnyoneConnectionChanged: !0,
                                    changedConnectionStatusDevice: t
                                })
                            }, o = 0; o < t.length; o++) {
                                var s = t[o];
                                n(s)
                            }
                        return a
                    }(this.state.devices, t.devices).isAnyoneConnectionChanged;
                    (r && s || n) && (this.diff.devices = t.devices)
                }
            }),
            Object.defineProperty(e.prototype, "calculateEntityIdDiff", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t = e.newState.player_state.player_queue
                      , a = e.skipVersionCompare
                      , i = t.entity_id
                      , r = t.version
                      , s = this.state.player_state.player_queue
                      , n = s.entity_id;
                    tT(void 0 !== a && a, s.version, r) && n !== i && (this.initPlayerState(!0, !1),
                    this.diff.player_state && this.diff.player_state.player_queue && (this.diff.player_state.player_queue.entity_id = i))
                }
            }),
            Object.defineProperty(e.prototype, "calculateEntityTypeDiff", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t = e.newState.player_state.player_queue
                      , a = t.entity_type
                      , i = t.version
                      , r = e.skipVersionCompare
                      , s = this.state.player_state.player_queue
                      , n = s.entity_type;
                    tT(void 0 !== r && r, s.version, i) && n !== a && (this.initPlayerState(!0, !1),
                    this.diff.player_state && this.diff.player_state.player_queue && (this.diff.player_state.player_queue.entity_type = a))
                }
            }),
            Object.defineProperty(e.prototype, "calculateCurrentPlayableIndexDiff", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t = e.newState.player_state.player_queue
                      , a = e.skipVersionCompare
                      , i = t.entity_id
                      , r = t.current_playable_index
                      , s = t.version
                      , n = this.state.player_state.player_queue
                      , o = n.entity_id
                      , l = n.current_playable_index;
                    tT(void 0 !== a && a, n.version, s) && o === i && l !== r && (this.initPlayerState(!0, !1),
                    this.diff.player_state && this.diff.player_state.player_queue && (this.diff.player_state.player_queue.current_playable_index = r))
                }
            }),
            Object.defineProperty(e.prototype, "calculatePlayableListDiff", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t = e.newState.player_state.player_queue
                      , a = e.skipVersionCompare
                      , i = t.playable_list
                      , r = t.version
                      , s = this.state.player_state.player_queue
                      , n = s.playable_list
                      , o = tT(void 0 !== a && a, s.version, r)
                      , l = function(e, t) {
                        var a, i;
                        if (e.length > 0 && t.length > 0 && e.length === t.length) {
                            for (var r = e.length, s = 0; s < r; s++)
                                if (t[s] && (null === (a = e[s]) || void 0 === a ? void 0 : a.playable_id) !== (null === (i = t[s]) || void 0 === i ? void 0 : i.playable_id))
                                    return !1;
                            return !0
                        }
                        return !1
                    }(n, i);
                    o && !l && (this.initPlayerState(!0, !1),
                    this.diff.player_state && this.diff.player_state.player_queue && (this.diff.player_state.player_queue.playable_list = i))
                }
            }),
            Object.defineProperty(e.prototype, "calculcateShuffleDiff", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t = e.newState.player_state.player_queue
                      , a = t.shuffle_optional
                      , i = t.version
                      , r = e.skipVersionCompare
                      , s = this.state.player_state.player_queue
                      , n = s.shuffle_optional
                      , o = tT(void 0 !== r && r, s.version, i)
                      , l = function(e, t) {
                        if (!e && !t)
                            return !0;
                        if (e && t && e.playable_indices.length === t.playable_indices.length) {
                            for (var a = !0, i = 0; i <= e.playable_indices.length; i++)
                                if (e.playable_indices[i] !== t.playable_indices[i]) {
                                    a = !1;
                                    break
                                }
                            return a
                        }
                        return !1
                    }(n, a);
                    o && !l && (this.initPlayerState(!0, !1),
                    this.diff.player_state && this.diff.player_state.player_queue && (a ? this.diff.player_state.player_queue.shuffle_optional = a : this.diff.player_state.player_queue.shuffle_optional = {
                        playable_indices: []
                    }))
                }
            }),
            Object.defineProperty(e.prototype, "calculateRepeatDiff", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t = e.newState.player_state.player_queue
                      , a = t.options
                      , i = t.version
                      , r = e.skipVersionCompare
                      , s = a.repeat_mode
                      , n = this.state.player_state.player_queue
                      , o = n.options
                      , l = n.version
                      , d = o.repeat_mode;
                    tT(void 0 !== r && r, l, i) && d !== s && (this.initPlayerState(!0, !1),
                    this.diff.player_state && this.diff.player_state.player_queue && (this.diff.player_state.player_queue.options = a))
                }
            }),
            Object.defineProperty(e.prototype, "calculateProgressMsDiff", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t, a, i = e.newState.player_state.status, r = e.skipVersionCompare, s = i.progress_ms, n = i.version, o = this.state.player_state.status, l = o.progress_ms, d = tT(void 0 !== r && r, o.version, n), u = (t = Number(s)) !== (a = Number(l)) && (a < 1500 || Math.abs(t - a) > 1e3);
                    d && u && (this.initPlayerState(!1, !0),
                    this.diff.player_state && this.diff.player_state.status && (this.diff.player_state.status.progress_ms = s))
                }
            }),
            Object.defineProperty(e.prototype, "calculateSpeedDiff", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t = e.newState.player_state.status
                      , a = t.playback_speed
                      , i = t.version
                      , r = e.skipVersionCompare
                      , s = this.state.player_state.status
                      , n = s.playback_speed;
                    tT(void 0 !== r && r, s.version, i) && n !== a && (this.initPlayerState(!1, !0),
                    this.diff.player_state && this.diff.player_state.status && (this.diff.player_state.status.playback_speed = a))
                }
            }),
            Object.defineProperty(e.prototype, "calculatePausedDiff", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t = e.newState.player_state.status
                      , a = e.skipVersionCompare
                      , i = t.paused
                      , r = t.version
                      , s = this.state.player_state.status
                      , n = s.paused;
                    tT(void 0 !== a && a, s.version, r) && n !== i && (this.initPlayerState(!1, !0),
                    this.diff.player_state && this.diff.player_state.status && (this.diff.player_state.status.paused = i))
                }
            }),
            Object.defineProperty(e.prototype, "initPlayerState", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e, t) {
                    this.diff.player_state || (this.diff.player_state = {}),
                    e && !this.diff.player_state.player_queue && (this.diff.player_state.player_queue = {}),
                    t && !this.diff.player_state.status && (this.diff.player_state.status = {})
                }
            }),
            Object.defineProperty(e.prototype, "updateLastRemoteDeviceChangingState", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t, a = e.player_state, i = a.player_queue.version, r = a.status.version, s = e.devices, n = e.active_device_id_optional, o = this.options.device.device_id, l = [i, r], d = s.find(function(e) {
                        return e.info.device_id === n
                    });
                    void 0 !== d && l.push(d.volume_info.version);
                    var u = l.filter(function(e) {
                        return 0 !== Number(null == e ? void 0 : e.timestamp_ms)
                    }).filter(function(e) {
                        return s.find(function(t) {
                            return t.info.device_id === (null == e ? void 0 : e.device_id)
                        }) && (null == e ? void 0 : e.device_id) !== o
                    });
                    if (u.length > 0) {
                        var c = u.sort(function(e, t) {
                            return Number(null == t ? void 0 : t.timestamp_ms) - Number(null == e ? void 0 : e.timestamp_ms)
                        })[0]
                          , m = s.find(function(e) {
                            return e.info.device_id === (null == c ? void 0 : c.device_id)
                        });
                        this.lastRemoteDeviceChangingState && m && this.lastRemoteDeviceChangingState.info.device_id === m.info.device_id && !this.lastRemoteDeviceChangingState.is_offline && m.is_offline && (this.lastRemoteDeviceChangingState = tC(m)),
                        (void 0 === this.lastRemoteDeviceChangingState && m || this.lastRemoteDeviceChangingState && m && this.lastRemoteDeviceChangingState.info.device_id !== m.info.device_id || this.lastRemoteDeviceChangingState && m && this.lastRemoteDeviceChangingState.info.device_id === m.info.device_id && this.lastRemoteDeviceChangingState.is_offline && !m.is_offline && !this.diff.devices) && c && (this.lastRemoteDeviceChangingState = tC(m),
                        this.lastRemoteDeviceChangingStateTS = Number(c.timestamp_ms),
                        t = {
                            device: tC(m),
                            timestampMs: Number(c.timestamp_ms)
                        })
                    }
                    return t
                }
            }),
            Object.defineProperty(e.prototype, "getLastRemoteDeviceChangingState", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function() {
                    return {
                        device: this.lastRemoteDeviceChangingState,
                        timestampMs: this.lastRemoteDeviceChangingStateTS
                    }
                }
            }),
            Object.defineProperty(e.prototype, "getOnlineRemoteDevices", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function() {
                    var e = this.state
                      , t = e.devices
                      , a = e.active_device_id_optional;
                    return t.filter(function(e) {
                        var t = [tE.ANDROID, tE.IOS, tE.WEB].includes(e.info.type);
                        return !e.is_offline && e.info.device_id !== a && t
                    })
                }
            }),
            e
        }();
        (d = x || (x = {})).PRODUCTION = "ynison.music.yandex.ru",
        d.QA = "qa.ynison.music.yandex.ru",
        (u = O || (O = {})).CONNECTING = "CONNECTING",
        u.CONNECTED = "CONNECTED",
        u.DISCONNECTED = "DISCONNECTED",
        u.WAITING_FOR_RECONNECT = "WAITING_FOR_RECONNECT",
        u.READY_TO_RECONNECT = "READY_TO_RECONNECT",
        (c = w || (w = {})).RECIEVE_MESSAGE = "RECIEVE_MESSAGE",
        c.REDIRECTOR_ERROR = "REDIRECTOR_ERROR",
        c.HUB_ERROR = "HUB_ERROR";
        var tD = a(62474);
        (m = G || (G = {})).ynisonBackoffMillis = "ynison-backoff-millis",
        m.ynisonErrorCode = "ynison-error-code",
        m.ynisonGoAwayForSeconds = "ynison-go-away-for-seconds";
        var tR = a(79701)
          , tL = (h = function(e, t) {
            return (h = Object.setPrototypeOf || ({
                __proto__: []
            })instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var a in t)
                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function a() {
                this.constructor = e
            }
            h(e, t),
            e.prototype = null === t ? Object.create(t) : (a.prototype = t.prototype,
            new a)
        }
        )
          , tV = function() {
            return (tV = Object.assign || function(e) {
                for (var t, a = 1, i = arguments.length; a < i; a++)
                    for (var r in t = arguments[a])
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e
            }
            ).apply(this, arguments)
        }
          , tx = function(e, t) {
            var a = {};
            for (var i in e)
                Object.prototype.hasOwnProperty.call(e, i) && 0 > t.indexOf(i) && (a[i] = e[i]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, i = Object.getOwnPropertySymbols(e); r < i.length; r++)
                    0 > t.indexOf(i[r]) && Object.prototype.propertyIsEnumerable.call(e, i[r]) && (a[i[r]] = e[i[r]]);
            return a
        }
          , tO = function(e) {
            function t(a, i) {
                void 0 === i && (i = {});
                var r = this
                  , s = i.code
                  , n = tx(i, ["code"]);
                return Object.defineProperty(r = e.call(this, a, tV({
                    code: void 0 === s ? "E_HUB_EXCEPTION" : s
                }, n)) || this, "name", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: "HubException"
                }),
                Object.setPrototypeOf(r, t.prototype),
                r
            }
            return tL(t, e),
            t
        }(tR.y)
          , tw = a(5884)
          , tG = function(e) {
            Object.defineProperty(this, "redirectorResponse", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }),
            Object.defineProperty(this, "connectionState", {
                enumerable: !0,
                configurable: !0,
                writable: !0,
                value: void 0
            }),
            this.redirectorResponse = new tw.wi(e.redirectorResponse),
            this.connectionState = new tw.wi(e.connectionState)
        }
          , tM = (g = function(e, t) {
            return (g = Object.setPrototypeOf || ({
                __proto__: []
            })instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var a in t)
                    Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a])
            }
            )(e, t)
        }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function a() {
                this.constructor = e
            }
            g(e, t),
            e.prototype = null === t ? Object.create(t) : (a.prototype = t.prototype,
            new a)
        }
        )
          , tj = function() {
            return (tj = Object.assign || function(e) {
                for (var t, a = 1, i = arguments.length; a < i; a++)
                    for (var r in t = arguments[a])
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e
            }
            ).apply(this, arguments)
        }
          , tU = function(e, t) {
            var a = {};
            for (var i in e)
                Object.prototype.hasOwnProperty.call(e, i) && 0 > t.indexOf(i) && (a[i] = e[i]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols)
                for (var r = 0, i = Object.getOwnPropertySymbols(e); r < i.length; r++)
                    0 > t.indexOf(i[r]) && Object.prototype.propertyIsEnumerable.call(e, i[r]) && (a[i[r]] = e[i[r]]);
            return a
        }
          , tq = function(e) {
            function t(a, i) {
                void 0 === i && (i = {});
                var r = this
                  , s = i.code
                  , n = tU(i, ["code"]);
                return Object.defineProperty(r = e.call(this, a, tj({
                    code: void 0 === s ? "E_REDIRECTOR_EXCEPTION" : s
                }, n)) || this, "name", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: "RedirectorException"
                }),
                Object.setPrototypeOf(r, t.prototype),
                r
            }
            return tM(t, e),
            t
        }(tR.y);
        function tF(e) {
            var t;
            switch (e) {
            case tE.WEB:
                t = 1;
                break;
            case tE.WEB_TV:
                t = 5;
                break;
            default:
                t = 1
            }
            return t
        }
        function tB(e) {
            return e instanceof Error ? {
                name: e.name,
                message: e.message,
                stack: e.stack,
                cause: e.cause
            } : {
                data: e
            }
        }
        (p = M || (M = {})).ynisonDeviceId = "Ynison-Device-Id",
        p.ynisonRedirectTicket = "Ynison-Redirect-Ticket",
        p.ynisonSessionId = "Ynison-Session-Id",
        p.ynisonDeviceInfo = "Ynison-Device-Info";
        var tY = function(e, t) {
            var a, i, r, s, n = {
                label: 0,
                sent: function() {
                    if (1 & r[0])
                        throw r[1];
                    return r[1]
                },
                trys: [],
                ops: []
            };
            return s = {
                next: o(0),
                throw: o(1),
                return: o(2)
            },
            "function" == typeof Symbol && (s[Symbol.iterator] = function() {
                return this
            }
            ),
            s;
            function o(o) {
                return function(l) {
                    return function(o) {
                        if (a)
                            throw TypeError("Generator is already executing.");
                        for (; s && (s = 0,
                        o[0] && (n = 0)),
                        n; )
                            try {
                                if (a = 1,
                                i && (r = 2 & o[0] ? i.return : o[0] ? i.throw || ((r = i.return) && r.call(i),
                                0) : i.next) && !(r = r.call(i, o[1])).done)
                                    return r;
                                switch (i = 0,
                                r && (o = [2 & o[0], r.value]),
                                o[0]) {
                                case 0:
                                case 1:
                                    r = o;
                                    break;
                                case 4:
                                    return n.label++,
                                    {
                                        value: o[1],
                                        done: !1
                                    };
                                case 5:
                                    n.label++,
                                    i = o[1],
                                    o = [0];
                                    continue;
                                case 7:
                                    o = n.ops.pop(),
                                    n.trys.pop();
                                    continue;
                                default:
                                    if (!(r = (r = n.trys).length > 0 && r[r.length - 1]) && (6 === o[0] || 2 === o[0])) {
                                        n = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) {
                                        n.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && n.label < r[1]) {
                                        n.label = r[1],
                                        r = o;
                                        break
                                    }
                                    if (r && n.label < r[2]) {
                                        n.label = r[2],
                                        n.ops.push(o);
                                        break
                                    }
                                    r[2] && n.ops.pop(),
                                    n.trys.pop();
                                    continue
                                }
                                o = t.call(e, n)
                            } catch (e) {
                                o = [6, e],
                                i = 0
                            } finally {
                                a = r = 0
                            }
                        if (5 & o[0])
                            throw o[1];
                        return {
                            value: o[0] ? o[1] : void 0,
                            done: !0
                        }
                    }([o, l])
                }
            }
        }
          , tW = function() {
            function e(e) {
                Object.defineProperty(this, "device", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }),
                Object.defineProperty(this, "connectionConfig", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }),
                this.device = e.device,
                this.connectionConfig = e.connectionConfig
            }
            return Object.defineProperty(e.prototype, "getHub", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t, a, i, r;
                    return t = this,
                    a = void 0,
                    i = void 0,
                    r = function() {
                        var t = this;
                        return tY(this, function(a) {
                            return [2, new Promise(function(a, i) {
                                var r, s, n, o, l, d, u = e.oauth, c = (n = (r = t.device).device_id,
                                o = r.app_name,
                                l = r.app_version,
                                d = tF(r.type),
                                (s = {})[M.ynisonDeviceId] = n,
                                s[M.ynisonDeviceInfo] = JSON.stringify({
                                    app_name: o,
                                    app_version: l,
                                    type: d
                                }),
                                s);
                                void 0 !== u && (c.authorization = "OAuth ".concat(u));
                                var m = new WebSocket(Object.values(t.connectionConfig).join(""),["Bearer", "v2", encodeURIComponent(JSON.stringify(c))])
                                  , h = function(e) {
                                    try {
                                        var t = JSON.parse(e.data);
                                        "error"in t ? (m.close(),
                                        i(new tq("Error message from redirector",{
                                            data: {
                                                redirectorResponse: t.error
                                            }
                                        }))) : (m.close(),
                                        a(t))
                                    } catch (e) {
                                        new tq("Error while processing message from redirector",{
                                            data: {
                                                redirectorResponse: {}
                                            },
                                            cause: tB(e)
                                        })
                                    }
                                }
                                  , g = function() {
                                    i(new tq("Error in connection to redirector",{
                                        data: {
                                            redirectorResponse: {}
                                        }
                                    }))
                                }
                                  , p = function() {
                                    m.removeEventListener("message", h),
                                    m.removeEventListener("error", g),
                                    m.removeEventListener("close", p)
                                };
                                m.addEventListener("message", h),
                                m.addEventListener("error", g),
                                m.addEventListener("close", p)
                            }
                            )]
                        })
                    }
                    ,
                    new (i || (i = Promise))(function(e, s) {
                        function n(e) {
                            try {
                                l(r.next(e))
                            } catch (e) {
                                s(e)
                            }
                        }
                        function o(e) {
                            try {
                                l(r.throw(e))
                            } catch (e) {
                                s(e)
                            }
                        }
                        function l(t) {
                            var a;
                            t.done ? e(t.value) : ((a = t.value)instanceof i ? a : new i(function(e) {
                                e(a)
                            }
                            )).then(n, o)
                        }
                        l((r = r.apply(t, a || [])).next())
                    }
                    )
                }
            }),
            e
        }()
          , tK = function() {
            return (tK = Object.assign || function(e) {
                for (var t, a = 1, i = arguments.length; a < i; a++)
                    for (var r in t = arguments[a])
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e
            }
            ).apply(this, arguments)
        }
          , tH = function(e, t) {
            var a = (0,
            tv.Z)()
              , i = tK(tK({}, e), {
                rid: a
            });
            if (t) {
                var r = t.player_action_timestamp_ms
                  , s = void 0 === r ? Date.now() : r
                  , n = t.activity_interception_type
                  , o = void 0 === n ? tS.DO_NOT_INTERCEPT_BY_DEFAULT : n;
                i.player_action_timestamp_ms = s,
                i.activity_interception_type = o
            } else
                i.player_action_timestamp_ms = Date.now(),
                i.activity_interception_type = tS.DO_NOT_INTERCEPT_BY_DEFAULT;
            return {
                request: i,
                rid: a
            }
        }
          , tz = function() {
            return (tz = Object.assign || function(e) {
                for (var t, a = 1, i = arguments.length; a < i; a++)
                    for (var r in t = arguments[a])
                        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e
            }
            ).apply(this, arguments)
        }
          , tQ = function() {
            function e(e) {
                var t = this;
                Object.defineProperty(this, "connectorConfig", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }),
                Object.defineProperty(this, "socket", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }),
                Object.defineProperty(this, "emitter", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: new tD.TinyEmitter
                }),
                Object.defineProperty(this, "redirectorSocket", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: void 0
                }),
                Object.defineProperty(this, "reconnectTimeout", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: null
                }),
                Object.defineProperty(this, "reconnectAttempts", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: 0
                }),
                Object.defineProperty(this, "state", {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: new tG({
                        redirectorResponse: null,
                        connectionState: O.DISCONNECTED
                    })
                }),
                this.connectorConfig = e.config,
                this.redirectorSocket = new tW({
                    device: this.connectorConfig.device,
                    connectionConfig: this.connectorConfig.redirectorConnectionConfig
                }),
                this.state.connectionState.onChange(function(e) {
                    e === O.DISCONNECTED && t.socket && (t.socket.close(),
                    t.socket = null)
                })
            }
            return Object.defineProperty(e.prototype, "config", {
                get: function() {
                    return tC(this.connectorConfig)
                },
                enumerable: !1,
                configurable: !0
            }),
            Object.defineProperty(e.prototype, "updateFullState", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e, t) {
                    var a = tz({}, e);
                    a.player_state.player_queue.version = t_(this.connectorConfig.device.device_id, 0),
                    a.player_state.status.version = t_(this.connectorConfig.device.device_id, 0);
                    var i = tH({
                        update_full_state: a
                    }, tz({
                        player_action_timestamp_ms: 0
                    }, t))
                      , r = i.request
                      , s = i.rid;
                    return this.sendRequest(r),
                    s
                }
            }),
            Object.defineProperty(e.prototype, "updatePlayingStatus", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e, t) {
                    var a = tz({}, e);
                    a.playing_status.version = t_(this.connectorConfig.device.device_id);
                    var i = tH({
                        update_playing_status: a
                    }, t)
                      , r = i.request
                      , s = i.rid;
                    return this.sendRequest(r),
                    s
                }
            }),
            Object.defineProperty(e.prototype, "updateActiveDevice", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e, t) {
                    var a = tH({
                        update_active_device: e
                    }, t)
                      , i = a.request
                      , r = a.rid;
                    return this.sendRequest(i),
                    r
                }
            }),
            Object.defineProperty(e.prototype, "updateSessionParams", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e, t) {
                    var a = tH({
                        update_session_params: e
                    }, t)
                      , i = a.request
                      , r = a.rid;
                    return this.sendRequest(i),
                    r
                }
            }),
            Object.defineProperty(e.prototype, "updatePlayerState", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e, t) {
                    var a = tz({}, e);
                    a.player_state.player_queue.version = t_(this.connectorConfig.device.device_id),
                    a.player_state.status.version = t_(this.connectorConfig.device.device_id);
                    var i = tH({
                        update_player_state: a
                    }, t)
                      , r = i.request
                      , s = i.rid;
                    return this.sendRequest(r),
                    s
                }
            }),
            Object.defineProperty(e.prototype, "updateVolumeInfo", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e, t) {
                    var a = tz({}, e);
                    a.volume_info.version = t_(this.connectorConfig.device.device_id);
                    var i = tH({
                        update_volume_info: a
                    }, t)
                      , r = i.request
                      , s = i.rid;
                    return this.sendRequest(r),
                    s
                }
            }),
            Object.defineProperty(e.prototype, "connect", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t = this
                      , a = e.oauth;
                    void 0 !== a && (this.connectorConfig.oauth = a),
                    [O.DISCONNECTED, O.READY_TO_RECONNECT].includes(this.state.connectionState.value) && (this.state.connectionState.value = O.CONNECTING,
                    this.redirectorSocket.getHub({
                        oauth: this.connectorConfig.oauth
                    }).then(function(e) {
                        t.state.redirectorResponse.value = e,
                        t.connectToHub()
                    }).catch(function(e) {
                        if (t.state.connectionState.value = O.DISCONNECTED,
                        !(16 === e.data.redirectorResponse.grpc_code && 401 === e.data.redirectorResponse.http_code) && t.reconnectAttempts < t.connectorConfig.reconnectAttemptsLimit) {
                            var a = e.data.redirectorResponse.extra_headers && e.data.redirectorResponse.extra_headers[G.ynisonGoAwayForSeconds] ? 1e3 * Number(e.data.redirectorResponse.extra_headers[G.ynisonGoAwayForSeconds]) : t.connectorConfig.defaultReconnectTimeoutMS;
                            t.reconnect({
                                timeout: a
                            })
                        } else
                            t.reconnectAttempts = 0,
                            t.emitter.emit(w.REDIRECTOR_ERROR, e)
                    }))
                }
            }),
            Object.defineProperty(e.prototype, "disconnect", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function() {
                    this.reconnectTimeout && (clearTimeout(this.reconnectTimeout),
                    this.reconnectTimeout = null),
                    this.reconnectAttempts = 0,
                    this.state.connectionState.value = O.DISCONNECTED
                }
            }),
            Object.defineProperty(e.prototype, "on", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e, t) {
                    this.emitter.on(e, t)
                }
            }),
            Object.defineProperty(e.prototype, "off", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e, t) {
                    this.emitter.off(e, t)
                }
            }),
            Object.defineProperty(e.prototype, "connectToHub", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function() {
                    var e = this
                      , t = this.connectorConfig
                      , a = t.oauth
                      , i = t.device
                      , r = this.connectorConfig.hubConnectionConfig
                      , s = r.protocol
                      , n = r.path;
                    if (this.state.redirectorResponse.value) {
                        var o, l, d, u, c, m, h, g, p, y = this.state.redirectorResponse.value.host, v = (o = this.state.redirectorResponse.value,
                        d = i.type,
                        u = i.app_name,
                        c = i.app_version,
                        m = i.device_id,
                        h = o.session_id,
                        g = o.redirect_ticket,
                        p = tF(d),
                        (l = {})[M.ynisonDeviceId] = m,
                        l[M.ynisonRedirectTicket] = g,
                        l[M.ynisonSessionId] = h,
                        l[M.ynisonDeviceInfo] = JSON.stringify({
                            app_name: u,
                            app_version: c,
                            type: p
                        }),
                        l);
                        void 0 !== a && (v.authorization = "OAuth ".concat(a));
                        var E = "".concat(s).concat(y).concat(n)
                          , f = ["Bearer", "v2", encodeURIComponent(JSON.stringify(v))];
                        this.socket = new WebSocket(E,f),
                        this.socket.addEventListener("message", function(t) {
                            e.onRecieveMessage(t)
                        }),
                        this.socket.addEventListener("error", function() {
                            e.state.connectionState.value = O.DISCONNECTED,
                            e.reconnectAttempts < e.connectorConfig.reconnectAttemptsLimit ? e.reconnect() : (e.reconnectAttempts = 0,
                            e.emitter.emit(w.HUB_ERROR, new tO("Error in connection to hub",{
                                data: {
                                    redirectorResponse: e.state.redirectorResponse.value ? e.state.redirectorResponse.value : {},
                                    hubResponse: {}
                                }
                            })))
                        }),
                        this.socket.addEventListener("open", function() {
                            e.state.connectionState.value = O.CONNECTED
                        }),
                        this.socket.addEventListener("close", function() {
                            e.state.connectionState.value = O.DISCONNECTED
                        })
                    }
                }
            }),
            Object.defineProperty(e.prototype, "reconnect", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    var t = this;
                    void 0 === e && (e = {});
                    var a = e.timeout
                      , i = void 0 === a ? this.connectorConfig.defaultReconnectTimeoutMS : a;
                    this.state.connectionState.value === O.DISCONNECTED && (this.reconnectAttempts += 1,
                    this.reconnectTimeout = setTimeout(function() {
                        t.state.connectionState.value = O.READY_TO_RECONNECT,
                        t.connect({})
                    }, i),
                    this.state.connectionState.value = O.WAITING_FOR_RECONNECT)
                }
            }),
            Object.defineProperty(e.prototype, "onRecieveMessage", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    try {
                        var t = JSON.parse(e.data);
                        if ("error"in t) {
                            if (this.state.connectionState.value = O.DISCONNECTED,
                            this.reconnectAttempts < this.connectorConfig.reconnectAttemptsLimit) {
                                var a = t.error.details[G.ynisonGoAwayForSeconds] ? 1e3 * Number(t.error.details[G.ynisonGoAwayForSeconds]) : this.connectorConfig.defaultReconnectTimeoutMS;
                                this.reconnect({
                                    timeout: a
                                })
                            } else
                                this.reconnectAttempts = 0,
                                this.emitter.emit(w.HUB_ERROR, new tO("Error message from hub",{
                                    data: {
                                        redirectorResponse: this.state.redirectorResponse.value ? this.state.redirectorResponse.value : {},
                                        hubResponse: t.error
                                    }
                                }))
                        } else
                            this.reconnectAttempts = 0,
                            this.emitter.emit(w.RECIEVE_MESSAGE, {
                                rawData: t
                            })
                    } catch (e) {
                        this.emitter.emit(w.HUB_ERROR, new tO("Error while processing message from hub",{
                            data: {
                                redirectorResponse: this.state.redirectorResponse.value ? this.state.redirectorResponse.value : {},
                                hubResponse: {}
                            },
                            cause: tB(e)
                        }))
                    }
                }
            }),
            Object.defineProperty(e.prototype, "sendRequest", {
                enumerable: !1,
                configurable: !0,
                writable: !0,
                value: function(e) {
                    null !== this.socket && this.socket.readyState === WebSocket.OPEN && this.state.connectionState.value === O.CONNECTED && this.socket.send(JSON.stringify(e))
                }
            }),
            e
        }();
        class tJ extends eV.y {
            constructor(e, {code: t="E_YNISON", ...a}={}) {
                super(e, {
                    code: t,
                    ...a
                }),
                (0,
                er._)(this, "name", "YnisonException"),
                Object.setPrototypeOf(this, tJ.prototype)
            }
        }
        let tZ = (e, t) => {
            let a = t && "object" == typeof t && "cause"in t && t.cause
              , i = t && "object" == typeof t && "data"in t && t.data || {};
            return new tJ("[YnisonException] ".concat(e),{
                cause: a,
                data: {
                    ...i,
                    originalError: t || ""
                }
            })
        }
        ;
        var tX = a(55897)
          , t$ = a(97635);
        class t0 {
            push(e) {
                this.callbacks.push(e)
            }
            exec() {
                let e = [];
                for (let t of this.callbacks)
                    if (0 === e.length)
                        e.push(t());
                    else {
                        let a = e[e.length - 1].then(t);
                        e.push(a)
                    }
                return Promise.allSettled(e).then( () => Promise.resolve())
            }
            constructor() {
                (0,
                er._)(this, "callbacks", [])
            }
        }
        let t5 = e => {
            switch (e) {
            case tf.ONE:
                return e_.zq.ONE;
            case tf.ALL:
                return e_.zq.CONTEXT;
            default:
                return e_.zq.NONE
            }
        }
          , t1 = e => {
            var t, a, i, r;
            let s = (null === (a = e.player_state) || void 0 === a ? void 0 : null === (t = a.player_queue) || void 0 === t ? void 0 : t.current_playable_index) || 0
              , n = ((null === (r = e.player_state) || void 0 === r ? void 0 : null === (i = r.player_queue) || void 0 === i ? void 0 : i.playable_list) || [])[s];
            return n ? {
                entityId: n.playable_id
            } : {
                index: 0
            }
        }
          , t2 = e => ({
            type: e_.RX.Unloaded,
            meta: {
                id: e.playable_id,
                albumId: e.album_id_optional
            }
        })
          , t3 = e => e.filter(e => {
            let {playable_type: t, playable_id: a} = e;
            return t === tb.TRACK && a
        }
        ).map(t2)
          , t6 = e => !isNaN(Number(e)) && Number(e) > 0
          , t4 = e => {
            var t, a;
            let i = null === (t = e.player_state) || void 0 === t ? void 0 : t.player_queue
              , r = (null == i ? void 0 : i.playable_list) || [];
            return i.from_optional || (null === (a = r[0]) || void 0 === a ? void 0 : a.from) || "embedded-radio"
        }
          , t9 = e => {
            var t, a, i, r;
            let s = null === (t = e.player_state) || void 0 === t ? void 0 : t.player_queue
              , n = (null == s ? void 0 : s.playable_list) || []
              , o = null === (r = n[null === (i = e.player_state) || void 0 === i ? void 0 : null === (a = i.player_queue) || void 0 === a ? void 0 : a.current_playable_index]) || void 0 === r ? void 0 : r.playable_id;
            return o && n.length ? {
                type: eM.A.Various,
                from: t4(e),
                meta: {
                    id: o
                }
            } : null
        }
          , t8 = e => {
            var t;
            let a = null === (t = e.player_state) || void 0 === t ? void 0 : t.player_queue
              , i = null == a ? void 0 : a.entity_id;
            return t6(i) ? {
                type: eM.A.Album,
                from: t4(e),
                meta: {
                    id: i
                }
            } : t9(e)
        }
          , t7 = e => {
            var t;
            let a = null === (t = e.player_state) || void 0 === t ? void 0 : t.player_queue
              , i = null == a ? void 0 : a.entity_id;
            return t6(i) ? {
                type: eM.A.Artist,
                from: t4(e),
                meta: {
                    id: i
                }
            } : t9(e)
        }
          , ae = e => {
            var t, a;
            let i = null === (t = e.player_state) || void 0 === t ? void 0 : t.player_queue
              , [r,s] = (null == i ? void 0 : null === (a = i.entity_id) || void 0 === a ? void 0 : a.split(" ")) || [];
            return r ? {
                type: eM.A.Generative,
                from: t4(e),
                meta: {
                    id: r,
                    stream: s ? {
                        id: r,
                        url: s
                    } : void 0
                }
            } : null
        }
          , at = e => {
            var t;
            let a = null === (t = e.player_state) || void 0 === t ? void 0 : t.player_queue
              , i = null == a ? void 0 : a.entity_id
              , r = t4(e)
              , [s,n] = String(i).split(":");
            if (t6(s) && t6(n)) {
                let e = {
                    uid: Number(s)
                };
                return {
                    type: eM.A.Playlist,
                    from: r,
                    meta: {
                        id: i,
                        kind: Number(n),
                        owner: e
                    }
                }
            }
            return t9(e)
        }
          , aa = e => {
            var t, a, i, r, s;
            let n = null !== (s = null === (a = e.player_state) || void 0 === a ? void 0 : null === (t = a.player_queue) || void 0 === t ? void 0 : t.current_playable_index) && void 0 !== s ? s : 0;
            return {
                playableList: ((null === (r = e.player_state) || void 0 === r ? void 0 : null === (i = r.player_queue) || void 0 === i ? void 0 : i.playable_list) || []).slice(0, n + 1),
                currentPlayableIndex: n
            }
        }
          , ai = e => {
            var t, a, i, r, s;
            let n = null === (t = e.player_state) || void 0 === t ? void 0 : t.player_queue
              , {playableList: o} = aa(e)
              , l = null == n ? void 0 : n.entity_id
              , d = null === (s = n.queue) || void 0 === s ? void 0 : null === (r = s.wave_queue) || void 0 === r ? void 0 : null === (i = r.entity_options) || void 0 === i ? void 0 : null === (a = i.wave_entity_optional) || void 0 === a ? void 0 : a.session_id
              , u = o.map(e => e.album_id_optional ? "".concat(e.playable_id, ":").concat(e.album_id_optional) : e.playable_id);
            return "string" == typeof l || d ? {
                type: eM.A.Vibe,
                from: t4(e),
                seeds: String(l).split(","),
                includeTracksInResponse: !0,
                cloneSessionId: d,
                meta: {
                    id: l
                },
                queue: u,
                trackToStartFrom: u[0]
            } : t9(e)
        }
          , ar = e => {
            var t;
            let a = null === (t = e.player_state) || void 0 === t ? void 0 : t.player_queue
              , i = null == a ? void 0 : a.entity_type;
            if (!i)
                return null;
            switch (i) {
            case tA.ALBUM:
                return t8(e);
            case tA.ARTIST:
                return t7(e);
            case tA.PLAYLIST:
                return at(e);
            case tA.RADIO:
                return ai(e);
            case tA.GENERATIVE:
                return ae(e);
            case tA.VARIOUS:
                return t9(e);
            default:
                return null
            }
        }
        ;
        class as {
            applyYnisonDiff(e) {
                var t, a, i, r, s;
                let n = new t0;
                if (e.player_state && e.player_state.player_queue && (e.player_state.player_queue.current_playable_index || e.player_state.player_queue.playable_list || e.player_state.player_queue.entity_id)) {
                    let e = this.ynisonStateController.getState();
                    n.push( () => this.changeContext(e))
                }
                if (null === (a = e.player_state) || void 0 === a ? void 0 : null === (t = a.player_queue) || void 0 === t ? void 0 : t.shuffle_optional) {
                    let t = e.player_state.player_queue.shuffle_optional;
                    n.push( () => this.changeShuffle(t))
                }
                if (null === (r = e.player_state) || void 0 === r ? void 0 : null === (i = r.player_queue) || void 0 === i ? void 0 : i.options) {
                    let t = e.player_state.player_queue.options;
                    n.push( () => this.changeOptions(t))
                }
                if (null === (s = e.player_state) || void 0 === s ? void 0 : s.status) {
                    let t = e.player_state.status;
                    n.push( () => this.changeStatus(t))
                }
                return n.exec()
            }
            changeOptions(e) {
                let t = t5(e.repeat_mode);
                return this.playback.setRepeatMode(t),
                Promise.resolve()
            }
            changeShuffle(e) {
                let t = !!(Array.isArray(e.playable_indices) && e.playable_indices.length);
                return this.playback.setShuffle(t),
                Promise.resolve()
            }
            changeStatus(e) {
                let t = new t0
                  , a = Number(e.playback_speed)
                  , i = Number(e.progress_ms) / 1e3;
                return Number.isNaN(a) || t.push( () => this.playback.setSpeed(a).then( () => Promise.resolve())),
                Number.isNaN(i) || t.push( () => {
                    if (this.playback.state.playerState.status.value === e_.FY.PLAYING)
                        return this.playback.setProgress(i).then( () => Promise.resolve());
                    let {currentEntity: {value: e}} = this.playback.state.queueState;
                    return e && (e.entity.startPosition = i),
                    Promise.resolve()
                }
                ),
                t.exec()
            }
            changeContext(e) {
                let t = this.getContextParams(e);
                return t ? this.playback.setContext(t).then( () => {
                    this.playback.stop()
                }
                ).catch(e => {
                    this.playback.hooks.afterError.promise(tZ("PlaybackSetContextError", e))
                }
                ) : Promise.resolve()
            }
            getContextParams(e) {
                try {
                    var t, a;
                    let i = ar(e);
                    if (!i)
                        return null;
                    let r = this.factory.createContext({
                        data: i
                    })
                      , s = null === (a = e.player_state) || void 0 === a ? void 0 : null === (t = a.player_queue) || void 0 === t ? void 0 : t.playable_list
                      , n = t1(e);
                    (0,
                    to.x)(r) && this.settings.enableLimitTracksFromYnison && ({playableList: s} = aa(e));
                    let o = t3(s);
                    if ((0,
                    tX.d)(r))
                        return {
                            context: r,
                            entitiesData: o,
                            loadContextMeta: !1,
                            queueParams: n
                        };
                    if ((0,
                    t$.Q)(r))
                        return {
                            context: r,
                            loadContextMeta: !0
                        };
                    if (200 === s.length)
                        return {
                            context: r,
                            loadContextMeta: !0,
                            queueParams: n
                        };
                    return {
                        context: r,
                        entitiesData: o.length ? o : void 0,
                        loadContextMeta: !0,
                        queueParams: n
                    }
                } catch (e) {
                    return this.playback.hooks.afterError.promise(tZ("GetContextParamsError", e)),
                    null
                }
            }
            constructor(e, t, a, i) {
                (0,
                er._)(this, "factory", void 0),
                (0,
                er._)(this, "playback", void 0),
                (0,
                er._)(this, "ynisonStateController", void 0),
                (0,
                er._)(this, "settings", void 0),
                this.factory = e,
                this.playback = t,
                this.ynisonStateController = a,
                this.settings = i
            }
        }
        let an = e => {
            var t, a, i, r, s, n, o, l, d, u;
            switch (null === (t = e.state.queueState.currentEntity.value) || void 0 === t ? void 0 : t.entity.data.type) {
            case eC.A.Music:
            case eC.A.VibeTrack:
                return (null === (a = e.state.currentContext.value) || void 0 === a ? void 0 : a.data.meta.id) ? String(null === (i = e.state.currentContext.value) || void 0 === i ? void 0 : i.data.meta.id) : "";
            case eC.A.Generative:
                return (null === (r = e.state.currentContext.value) || void 0 === r ? void 0 : r.data.meta.id) ? "".concat(String(null === (s = e.state.currentContext.value) || void 0 === s ? void 0 : s.data.meta.id), " ").concat(null !== (l = null === (o = e.state.queueState.currentEntity.value) || void 0 === o ? void 0 : null === (n = o.entity.data.meta.stream) || void 0 === n ? void 0 : n.url) && void 0 !== l ? l : "") : "";
            default:
                return (null === (d = e.state.currentContext.value) || void 0 === d ? void 0 : d.data.meta.id) ? String(null === (u = e.state.currentContext.value) || void 0 === u ? void 0 : u.data.meta.id) : ""
            }
        }
          , ao = e => {
            switch (e) {
            case eM.A.Album:
                return tA.ALBUM;
            case eM.A.Playlist:
                return tA.PLAYLIST;
            case eM.A.Artist:
                return tA.ARTIST;
            case eM.A.Vibe:
                return tA.RADIO;
            case eM.A.Various:
                return tA.VARIOUS;
            case eM.A.Generative:
                return tA.GENERATIVE;
            default:
                return tA.VARIOUS
            }
        }
          , al = e => {
            switch (e) {
            case e_.zq.NONE:
                return tf.NONE;
            case e_.zq.ONE:
                return tf.ONE;
            case e_.zq.CONTEXT:
                return tf.ALL;
            default:
                return tf.NONE
            }
        }
          , ad = e => {
            var t, a;
            return (0,
            t$.Q)(null === (t = e.state.queueState.currentEntity.value) || void 0 === t ? void 0 : t.context) ? {
                entity_id: an(e),
                entity_type: ao(null === (a = e.state.currentContext.value) || void 0 === a ? void 0 : a.data.type)
            } : null
        }
          , au = e => {
            var t, a;
            return (0,
            to.x)(null === (t = e.state.queueState.currentEntity.value) || void 0 === t ? void 0 : t.context) && (null === (a = e.state.queueState.currentEntity.value) || void 0 === a ? void 0 : a.context.data.meta.session) ? {
                radio_options: {
                    session_id: e.state.queueState.currentEntity.value.context.data.meta.session.radioSessionId
                }
            } : null
        }
          , ac = e => {
            var t, a, i;
            return e4(null === (t = e.state.queueState.currentEntity.value) || void 0 === t ? void 0 : t.entity.data.meta) && null !== (i = null === (a = e.state.queueState.currentEntity.value) || void 0 === a ? void 0 : a.entity.data.meta.durationMs) && void 0 !== i ? i : 0
        }
          , am = e => 1e3 * Math.floor(e)
          , ah = e => {
            var t;
            let a = am(e.state.playerState.progress.value.position)
              , i = ac(e);
            return (null === (t = e.state.queueState.currentEntity.value) || void 0 === t ? void 0 : t.context.data.type) === eM.A.Generative ? 0 : a < i ? a : 0
        }
          , ag = function(e) {
            var t, a, i, r, s, n, o, l, d, u, c, m, h;
            let {entity: g} = e
              , p = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
            switch (g.data.type) {
            case eC.A.Music:
                return {
                    album_id_optional: "number" == typeof (null === (a = g.data.meta.albums) || void 0 === a ? void 0 : null === (t = a[0]) || void 0 === t ? void 0 : t.id) ? String(null === (i = g.data.meta.albums) || void 0 === i ? void 0 : i[0].id) : null,
                    from: p,
                    playable_id: null !== (r = g.data.meta.realId) && void 0 !== r ? r : "",
                    playable_type: tb.TRACK,
                    title: null !== (s = g.data.meta.title) && void 0 !== s ? s : "",
                    cover_url_optional: null !== (n = g.data.meta.coverUri) && void 0 !== n ? n : null
                };
            case eC.A.Generative:
                return {
                    album_id_optional: null,
                    from: p,
                    playable_id: "",
                    playable_type: tb.INFINITE,
                    title: null !== (o = g.data.meta.title) && void 0 !== o ? o : "",
                    cover_url_optional: null
                };
            case eC.A.VibeTrack:
                return {
                    album_id_optional: "number" == typeof (null === (d = g.data.meta.albums) || void 0 === d ? void 0 : null === (l = d[0]) || void 0 === l ? void 0 : l.id) ? String(null === (u = g.data.meta.albums) || void 0 === u ? void 0 : u[0].id) : null,
                    from: p,
                    playable_id: null !== (c = g.data.meta.realId) && void 0 !== c ? c : "",
                    playable_type: tb.TRACK,
                    title: null !== (m = g.data.meta.title) && void 0 !== m ? m : "",
                    cover_url_optional: null !== (h = g.data.meta.coverUri) && void 0 !== h ? h : null
                };
            default:
                return {
                    album_id_optional: null,
                    from: p,
                    playable_id: String(g.data.meta.id),
                    playable_type: tb.TRACK,
                    title: "",
                    cover_url_optional: null
                }
            }
        };
        function ap(e, t, a) {
            var i, r, s;
            let {devices: n, active_device_id_optional: o, player_state: {player_queue_inject_optional: l}} = t.getState()
              , d = function(e) {
                let {order: {value: t}, index: {value: a}} = e.state.queueState
                  , i = t[a];
                return null != i ? i : -1
            }(e)
              , {playableIndices: u, currentPlayableIndex: c, playableList: m} = function(e, t, a) {
                let i = a.state.queueState.order.value;
                if (e.length <= 200)
                    return {
                        playableList: e,
                        currentPlayableIndex: t,
                        playableIndices: i
                    };
                if (a.state.queueState.shuffle.value) {
                    let a = i.indexOf(t)
                      , r = i.slice(a, 200)
                      , s = [...r].sort( (e, t) => e - t).map(t => e[t])
                      , n = new Map
                      , o = r.map(t => {
                        var a;
                        let i = e[t].playable_id
                          , r = null !== (a = n.get(i)) && void 0 !== a ? a : -1
                          , o = s.findIndex( (e, t) => t > r && e.playable_id === i);
                        return n.set(i, o),
                        o
                    }
                    )
                      , l = s.findIndex(a => a.playable_id === e[t].playable_id);
                    return {
                        playableList: s,
                        currentPlayableIndex: l,
                        playableIndices: o
                    }
                }
                let r = e[t].playable_id
                  , s = Math.max(0, t - 100);
                s + 200 > e.length && (s = e.length - 200);
                let n = e.slice(s, s + 200)
                  , o = n.findIndex(e => e.playable_id === r);
                return {
                    playableList: n,
                    currentPlayableIndex: o,
                    playableIndices: i
                }
            }(e.state.queueState.entityList.value.map(t => {
                var a;
                return ag(t, null === (a = e.state.currentContext.value) || void 0 === a ? void 0 : a.from)
            }
            ), d, e);
            return {
                active_device_id_optional: o,
                devices: n,
                player_state: {
                    player_queue_inject_optional: l,
                    status: {
                        duration_ms: ac(e),
                        progress_ms: ah(e),
                        paused: !0,
                        playback_speed: e.state.playerState.speed.value,
                        version: t_(a.device_id, 0)
                    },
                    player_queue: {
                        entity_id: an(e),
                        entity_type: ao(null === (i = e.state.currentContext.value) || void 0 === i ? void 0 : i.data.type),
                        current_playable_index: c,
                        playable_list: m,
                        shuffle_optional: e.state.queueState.shuffle.value ? {
                            playable_indices: u
                        } : null,
                        options: {
                            repeat_mode: al(e.state.queueState.repeat.value)
                        },
                        entity_context: tP,
                        from_optional: null !== (s = null === (r = e.state.currentContext.value) || void 0 === r ? void 0 : r.from) && void 0 !== s ? s : null,
                        initial_entity_optional: ad(e),
                        adding_options_optional: au(e),
                        queue: null,
                        version: t_(a.device_id, 0)
                    }
                }
            }
        }
        let ay = (e, t) => ({
            player_state: t,
            device: {
                volume: 1,
                capabilities: {
                    can_be_player: !0,
                    can_be_remote_controller: !1,
                    volume_granularity: 16
                },
                info: e,
                volume_info: {
                    volume: 0,
                    version: null
                },
                is_shadow: !0
            },
            is_currently_active: !1,
            sync_state_from_eov_optional: null
        });
        class av {
            subscribeOnPlayerEvents() {
                if (!this.ynisonConnector)
                    return;
                let e = this.playback.state.playerState.status.onChange(e => {
                    switch (e) {
                    case e_.FY.PLAYING:
                    case e_.FY.PAUSED:
                        this.updatePlayingStatus()
                    }
                }
                )
                  , t = this.playback.state.playerState.event.onChange(e => {
                    switch (e) {
                    case e_.xg.SET_PROGRESS:
                    case e_.xg.SET_SPEED:
                        this.updatePlayingStatus()
                    }
                }
                )
                  , a = this.playback.state.queueState.currentEntity.onChange( () => this.updatePlayerState())
                  , i = this.playback.state.queueState.entityList.onChange( () => this.updatePlayerState())
                  , r = this.playback.state.queueState.index.onChange( () => this.updatePlayerState())
                  , s = this.playback.state.queueState.order.onChange( () => this.updatePlayerState())
                  , n = this.playback.state.queueState.repeat.onChange( () => this.updatePlayerState())
                  , o = this.playback.state.queueState.shuffle.onChange( () => this.updatePlayerState());
                this.unsubscribeFromPlayerEvents = () => {
                    e(),
                    t(),
                    a(),
                    i(),
                    r(),
                    s(),
                    n(),
                    o()
                }
            }
            updatePlayerState() {
                var e, t;
                if (!this.isUpdateFullStateSended())
                    return;
                let {active_device_id_optional: a} = this.ynisonStateController.getState()
                  , i = ap(this.playback, this.ynisonStateController, this.deviceConfig);
                (e = this.ynisonStateController.calculateDiff({
                    newState: i,
                    skipVersionCompare: !0,
                    skipDeviceActivityCheck: !0
                })).player_state && e.player_state.player_queue && (t = this.deviceConfig.device_id,
                !a || a === t) && this.ynisonConnector.updatePlayerState({
                    player_state: i.player_state
                })
            }
            updatePlayingStatus() {
                var e, t;
                if (!this.isUpdateFullStateSended())
                    return;
                let {active_device_id_optional: a} = this.ynisonStateController.getState()
                  , i = ap(this.playback, this.ynisonStateController, this.deviceConfig);
                (e = this.ynisonStateController.calculateDiff({
                    newState: i,
                    skipVersionCompare: !0,
                    skipDeviceActivityCheck: !0
                })).player_state && e.player_state.status && (t = this.deviceConfig.device_id,
                !a || a === t) && this.ynisonConnector.updatePlayingStatus({
                    playing_status: i.player_state.status
                })
            }
            updateFullState() {
                let e = ap(this.playback, this.ynisonStateController, this.deviceConfig);
                this.ynisonStateController.setState(e),
                this.updateFullStateMessageRid = this.ynisonConnector.updateFullState(ay(this.deviceConfig, e.player_state))
            }
            onDisconnected() {
                var e;
                this.updateFullStateMessageRid = null,
                this.updateFullStateResponseRid = null,
                null === (e = this.unsubscribeFromPlayerEvents) || void 0 === e || e.call(this)
            }
            onConnected() {
                this.subscribeOnPlayerEvents()
            }
            isUpdateFullStateSended() {
                return !!this.updateFullStateMessageRid && !!this.updateFullStateResponseRid && this.updateFullStateMessageRid === this.updateFullStateResponseRid
            }
            constructor({playback: e, ynisonStateController: t, ynisonConnector: a, deviceConfig: i}) {
                (0,
                er._)(this, "unsubscribeFromPlayerEvents", void 0),
                (0,
                er._)(this, "updateFullStateMessageRid", null),
                (0,
                er._)(this, "updateFullStateResponseRid", null),
                (0,
                er._)(this, "playback", void 0),
                (0,
                er._)(this, "ynisonStateController", void 0),
                (0,
                er._)(this, "deviceConfig", void 0),
                (0,
                er._)(this, "ynisonConnector", void 0),
                this.playback = e,
                this.ynisonStateController = t,
                this.ynisonConnector = a,
                this.deviceConfig = i,
                this.ynisonConnector.state.connectionState.onChange(e => {
                    switch (e) {
                    case O.CONNECTED:
                        this.onConnected();
                        break;
                    case O.DISCONNECTED:
                        this.onDisconnected()
                    }
                }
                )
            }
        }
        class aE {
            apply(e) {
                if (!this.variables.enableYnisonConnection)
                    return;
                let {playback: t, hooks: a} = e;
                this.hooks = a,
                this.playbackController = new as(this.factory,t,this.ynisonStateController,{
                    enableLimitTracksFromYnison: this.variables.enableLimitTracksFromYnison
                }),
                this.playbackToYnisonController = new av({
                    playback: t,
                    ynisonStateController: this.ynisonStateController,
                    ynisonConnector: this.ynisonConnector,
                    deviceConfig: this.deviceConfig
                }),
                this.ynisonConnector.state.connectionState.onChange(e => {
                    switch (e) {
                    case O.CONNECTED:
                        this.onConnected(t);
                        break;
                    case O.DISCONNECTED:
                        this.onDisconnected()
                    }
                }
                ),
                a.beforeEntityChange.tapPromise("YnisonPlugin", () => {
                    let {currentEntity: {value: e}} = t.state.queueState;
                    return e && (e.entity.startPosition = null),
                    Promise.resolve()
                }
                ),
                document.addEventListener("visibilitychange", () => {
                    document.hidden || this.ynisonConnector.state.connectionState.value !== O.DISCONNECTED || this.ynisonConnect(),
                    document.hidden && t.state.playerState.status.value !== e_.FY.PLAYING && this.ynisonDisconnect()
                }
                ),
                this.ynisonConnect()
            }
            ynisonConnect() {
                this.variables.enableYnisonConnection && this.ynisonConnector.connect({
                    oauth: this.oauth
                })
            }
            ynisonDisconnect() {
                this.ynisonConnector.disconnect()
            }
            onMessageRecieved(e, t) {
                var a;
                e.rawData.rid === (null === (a = this.playbackToYnisonController) || void 0 === a ? void 0 : a.updateFullStateMessageRid) ? this.handleUpdateFullStateResponse(e, t) : this.ynisonStateController.calculateDiff({
                    newState: e.rawData
                })
            }
            onConnected(e) {
                var t;
                this.subscribeOnConnectorEvents(e),
                null === (t = this.playbackToYnisonController) || void 0 === t || t.updateFullState()
            }
            onDisconnected() {
                var e;
                null === (e = this.unsubscribeFromConnectorEvents) || void 0 === e || e.call(this)
            }
            subscribeOnConnectorEvents(e) {
                let t = t => {
                    this.onMessageRecieved(t, e)
                }
                  , a = e => {
                    var t;
                    null === (t = this.hooks) || void 0 === t || t.afterError.promise(tZ("RedirectorException", e))
                }
                  , i = e => {
                    var t;
                    null === (t = this.hooks) || void 0 === t || t.afterError.promise(tZ("HubException", e))
                }
                ;
                this.ynisonConnector.on(w.RECIEVE_MESSAGE, t),
                this.ynisonConnector.on(w.REDIRECTOR_ERROR, a),
                this.ynisonConnector.on(w.HUB_ERROR, i),
                this.unsubscribeFromConnectorEvents = () => {
                    this.ynisonConnector.off(w.RECIEVE_MESSAGE, t),
                    this.ynisonConnector.off(w.REDIRECTOR_ERROR, a),
                    this.ynisonConnector.off(w.HUB_ERROR, i)
                }
            }
            handleUpdateFullStateResponse(e, t) {
                let a = this.ynisonStateController.calculateDiff({
                    newState: e.rawData
                });
                if (this.playbackToYnisonController && (this.playbackToYnisonController.updateFullStateResponseRid = e.rawData.rid),
                [e_.FY.ENDED, e_.FY.IDLE, e_.FY.PAUSED, e_.FY.STOPPED, e_.FY.MEDIA_ELEMENT_ERROR].includes(t.state.playerState.status.value) && this.variables.shouldApplyState) {
                    var i;
                    null === (i = this.playbackController) || void 0 === i || i.applyYnisonDiff(a)
                }
            }
            constructor({factory: e, deviceConfig: t, connectionConfig: a, variables: i, oauth: r}) {
                (0,
                er._)(this, "hooks", void 0),
                (0,
                er._)(this, "ynisonConnector", void 0),
                (0,
                er._)(this, "ynisonStateController", void 0),
                (0,
                er._)(this, "factory", void 0),
                (0,
                er._)(this, "deviceConfig", void 0),
                (0,
                er._)(this, "variables", void 0),
                (0,
                er._)(this, "playbackController", void 0),
                (0,
                er._)(this, "playbackToYnisonController", void 0),
                (0,
                er._)(this, "unsubscribeFromConnectorEvents", void 0),
                (0,
                er._)(this, "oauth", void 0),
                this.factory = e,
                this.variables = i,
                this.deviceConfig = {
                    app_name: t.appName,
                    app_version: t.appVersion,
                    title: t.title,
                    device_id: (0,
                    tv.Z)(),
                    type: tE.WEB
                },
                this.oauth = r,
                this.ynisonStateController = new tk({
                    device: this.deviceConfig,
                    diffWhileActiveOnly: !1
                }),
                this.ynisonConnector = new tQ({
                    config: {
                        device: this.deviceConfig,
                        oauth: this.oauth,
                        redirectorConnectionConfig: {
                            protocol: "wss://",
                            host: a.ynisonHost,
                            path: a.redirectorPath
                        },
                        hubConnectionConfig: {
                            protocol: "wss://",
                            path: a.hubConnectioPath
                        },
                        defaultReconnectTimeoutMS: a.reconnectTimeout,
                        reconnectAttemptsLimit: a.reconnectAttempts
                    }
                })
            }
        }
        class af {
            send(e) {
                new Promise(t => {
                    let a = {
                        [e.name]: {
                            ...e.data
                        }
                    };
                    this.yaMetrika.count(a, "player-metrics"),
                    t()
                }
                )
            }
            constructor(e) {
                (0,
                er._)(this, "yaMetrika", void 0),
                this.yaMetrika = e
            }
        }
        let aS = null;
        function ab(e) {
            let t;
            let a = e.state.queueState.order.value
              , i = e.state.queueState.index.value
              , r = e.state.currentContext.value
              , s = e.state.queueState.entityList.value;
            for (let e = i - 1; e >= 0; e--) {
                let i = a[e];
                if ("number" != typeof i)
                    break;
                let r = s[i];
                if (void 0 !== r && !r.entity.hidden) {
                    t = r.entity;
                    break
                }
            }
            let n = !!t;
            r && (r.availableActions.moveBackward.value = n),
            null !== aS && (aS(),
            aS = null),
            0 !== i || (0,
            t$.Q)(r) || (aS = e.state.playerState.progress.onChange(e => {
                r && (r.availableActions.moveBackward.value = !!e && e.position > e_.lz)
            }
            ))
        }
        let aP = [eN.V.AUDIOBOOK, eN.V.FAIRY_TALE, eN.V.PODCAST, eN.V.COMMENT];
        var aA = a(52416);
        let a_ = e => {
            let t = "albums"in e && e.albums && e.albums.length > 0 && e.albums[0] && e.albums[0].type === aA.V.PODCAST;
            return !!("type"in e && e.type && aP.includes(e.type) || t)
        }
        ;
        class aN {
            apply(e) {
                let {hooks: t, playback: a} = e
                  , i = () => {
                    !function(e) {
                        let {value: t} = e.state.currentContext
                          , {value: a} = e.state.queueState.currentEntity;
                        if (void 0 !== t && void 0 !== a) {
                            let {meta: i} = a.entity.data;
                            (0,
                            to.x)(t) || (0,
                            t$.Q)(t) || "type"in i && i.type && aP.includes(i.type) ? (t.availableActions.repeat.value = !1,
                            t.availableActions.shuffle.value = !1,
                            e.state.queueState.repeat.value !== e_.zq.NONE && e.setRepeatMode(e_.zq.NONE),
                            e.state.queueState.shuffle.value && e.toggleShuffle()) : (t.availableActions.repeat.value = !0,
                            t.availableActions.shuffle.value = !0)
                        }
                    }(a),
                    function(e) {
                        let {value: t} = e.state.currentContext
                          , {value: a} = e.state.queueState.currentEntity;
                        if (void 0 !== t && void 0 !== a) {
                            let {meta: e} = a.entity.data
                              , i = a_(e);
                            t.availableActions.speed.value = !!i
                        }
                    }(a)
                }
                ;
                t.afterContextSet.tap("AvailableActionsPlugin", i),
                t.beforeMediaStartPlaying.tap("AvailableActionsPlugin", i),
                a.state.queueState.entityList.onChange( () => {
                    i(),
                    ab(a)
                }
                ),
                a.state.queueState.index.onChange( () => {
                    ab(a)
                }
                )
            }
        }
        class aC {
            apply(e) {
                let {hooks: t, playback: a} = e;
                t.afterContextSet.tap("ApplyContextPlugin", () => {
                    let e = a.state.currentContext.value;
                    e && e instanceof e_.$n && e.apply({
                        hooks: t,
                        playback: a
                    })
                }
                )
            }
        }
        class aT {
            apply(e) {
                let {playback: t, hooks: a} = e;
                t.state.playerState.event.onChange( () => {
                    let {currentEntity: e} = t.state.queueState;
                    if (e.value)
                        switch (t.state.playerState.event.value) {
                        case e_.xg.PAUSED:
                            e.value.entity.saveTimeStageOfPlayback({
                                stage: I.NOT_PLAYING,
                                reason: "event-".concat(e_.xg.PAUSED)
                            });
                            break;
                        case e_.xg.STALLED:
                            this.variables.handleStalled && e.value.entity.saveTimeStageOfPlayback({
                                stage: I.NOT_PLAYING,
                                reason: "event-".concat(e_.xg.STALLED)
                            });
                            break;
                        case e_.xg.WAITING:
                            this.variables.handleWaiting && e.value.entity.saveTimeStageOfPlayback({
                                stage: I.NOT_PLAYING,
                                reason: "event-".concat(e_.xg.WAITING)
                            });
                            break;
                        case e_.xg.PLAYING:
                            e.value.entity.saveTimeStageOfPlayback({
                                stage: I.PLAYING,
                                reason: "event-".concat(e_.xg.PLAYING)
                            });
                            break;
                        case e_.xg.MEDIA_ELEMENT_ERROR:
                            e.value.entity.saveTimeStageOfPlayback({
                                stage: I.NOT_PLAYING,
                                reason: "event-".concat(e_.xg.MEDIA_ELEMENT_ERROR)
                            })
                        }
                }
                ),
                a.beforeEntityPlayingProcessStart.tapPromise("TotalPlayedTimePlugin", () => {
                    let {currentEntity: e} = t.state.queueState;
                    return e.value && e.value.entity.clearTimeStagesOfPlayback(),
                    Promise.resolve()
                }
                ),
                a.afterMediaStartPlaying.tapPromise("TotalPlayedTimePlugin", () => {
                    let {currentEntity: e} = t.state.queueState;
                    return e.value && e.value.entity.saveTimeStageOfPlayback({
                        stage: I.PLAYING,
                        reason: "hook-afterMediaStartPlaying"
                    }),
                    Promise.resolve()
                }
                ),
                a.afterMediaEndPlaying.tapPromise("TotalPlayedTimePlugin", () => {
                    let {currentEntity: e} = t.state.queueState;
                    return e.value && e.value.entity.saveTimeStageOfPlayback({
                        stage: I.NOT_PLAYING,
                        reason: "hook-afterMediaEndPlaying"
                    }),
                    Promise.resolve()
                }
                ),
                a.beforeEntityChange.tapPromise("TotalPlayedTimePlugin", () => {
                    let {currentEntity: e} = t.state.queueState;
                    return e.value && e.value.entity.saveTimeStageOfPlayback({
                        stage: I.NOT_PLAYING,
                        reason: "hook-beforeEntityChange"
                    }),
                    Promise.resolve()
                }
                ),
                a.beforeContextSet.tapPromise("TotalPlayedTimePlugin", () => {
                    let {currentEntity: e} = t.state.queueState;
                    return e.value && e.value.entity.saveTimeStageOfPlayback({
                        stage: I.NOT_PLAYING,
                        reason: "hook-beforeContextSet"
                    }),
                    Promise.resolve()
                }
                )
            }
            constructor({variables: e}) {
                var t, a;
                (0,
                er._)(this, "variables", void 0),
                this.variables = {
                    handleStalled: null !== (t = null == e ? void 0 : e.handleStalled) && void 0 !== t && t,
                    handleWaiting: null !== (a = null == e ? void 0 : e.handleWaiting) && void 0 !== a && a
                }
            }
        }
        var aI = a(66591)
          , ak = a(49430);
        (y = j || (j = {})).PREPARE = "prepare",
        y.PLAY = "play";
        var aD = a(90632)
          , aR = a(21744);
        class aL extends aD.c {
            async sendPlays(e, t) {
                var a;
                return (await this.httpClient.post("plays", {
                    prefixUrl: this.config.prefixUrl,
                    headers: this.createRequestHeadersFromParams(e),
                    searchParams: (0,
                    aR.f)({
                        clientNow: e.clientNow
                    }),
                    json: {
                        plays: e.plays
                    },
                    retry: this.getRetryPolicyConfig(),
                    timeout: null === (a = this.config.timeouts) || void 0 === a ? void 0 : a.sendPlays,
                    signal: null == t ? void 0 : t.signal
                })).json()
            }
            constructor(e, t) {
                super(e, t),
                (0,
                er._)(this, "httpClient", void 0),
                (0,
                er._)(this, "config", void 0),
                this.httpClient = e,
                this.config = t
            }
        }
        class aV extends eV.y {
            constructor(e, {code: t="E_MEDIA_PROVIDER", ...a}={}) {
                super(e, {
                    code: t,
                    ...a
                }),
                (0,
                er._)(this, "name", "MediaProviderException"),
                Object.setPrototypeOf(this, aV.prototype)
            }
        }
        class ax extends aV {
            constructor(e, {code: t="E_GET_FILE_INFO_MEDIA_PROVIDER", ...a}={}) {
                super(e, {
                    code: t,
                    ...a
                }),
                (0,
                er._)(this, "name", "GetFileInfoMediaProviderException"),
                Object.setPrototypeOf(this, ax.prototype)
            }
        }
        (v = U || (U = {})).START = "start",
        v.END = "end",
        v.PLAYING = "playing";
        let aO = e => {
            if (e.mediaSourceData && "urls"in e.mediaSourceData.data) {
                let t = e.mediaSourceData.data.urls[0];
                if (t && t.startsWith("blob:"))
                    return !0
            }
            return !1
        }
        ;
        var aw = a(69847);
        function aG() {
            return new Date().toISOString()
        }
        function aM(e) {
            var t, a, i, r, s, n;
            let o;
            let {contextEntityPair: l, totalPlayedSeconds: d, endPositionSeconds: u, type: c, maxPlayerStage: m, seek: h, pause: g, startTimestamp: p, radioSessionId: y} = e
              , {entity: v, context: E} = l
              , f = String(v.data.meta.id)
              , S = function(e) {
                let t;
                if ("albums"in e.data.meta) {
                    let {data: {meta: {albums: a}}} = e;
                    if (a) {
                        let e = a[0];
                        e && (t = String(e.id))
                    }
                }
                return t
            }(v)
              , b = (null === (t = v.data.additional) || void 0 === t ? void 0 : t.from) || E.from
              , P = (null === (a = v.data.additional) || void 0 === a ? void 0 : a.utmLink) || E.utmLink || {}
              , A = 0;
            tu(v) ? "smartPreviewParams"in v.data.meta && (null === (i = v.data.meta.smartPreviewParams) || void 0 === i ? void 0 : i.durationMs) && (A = (null === (r = v.data.meta.smartPreviewParams) || void 0 === r ? void 0 : r.durationMs) / 1e3) : "durationMs"in v.data.meta && v.data.meta.durationMs && (A = v.data.meta.durationMs / 1e3);
            let _ = d
              , N = u;
            .5 > Math.abs(A - d) && (_ = A),
            .5 > Math.abs(A - u) && (N = A),
            o = (0,
            t$.Q)(E) ? {
                generativeStreamId: String(null === (s = E.data.meta.stream) || void 0 === s ? void 0 : s.id)
            } : {
                trackId: f
            };
            let C = {
                playId: v.playId,
                timestamp: aG(),
                totalPlayedSeconds: _,
                endPositionSeconds: N,
                trackLengthSeconds: A,
                albumId: S,
                from: b,
                context: E.data.type,
                contextItem: String(E.data.meta.id),
                addTracksToPlayerTime: v.addTracksToPlayerTime,
                audioAuto: "none",
                audioOutputName: "Динамик",
                audioOutputType: "Speaker",
                maxPlayerStage: m,
                seek: h,
                pause: g,
                startTimestamp: p,
                fromCache: aO(v),
                ...P,
                ...o
            };
            if ((0,
            to.x)(E) && E.data.meta.session && (C.radioSessionId = null != y ? y : E.data.meta.session.radioSessionId,
            C.context = "radio",
            C.contextItem = E.data.meta.session.wave.stationId),
            (null == E ? void 0 : E.data.type) === eM.A.Playlist && (C.playlistId = "".concat(E.data.meta.uid, ":").concat(E.data.meta.kind),
            C.contextItem = "".concat(E.data.meta.uid, ":").concat(E.data.meta.kind)),
            (0,
            tX.d)(E)) {
                let e = [aw.Z.Search, aw.Z.Other]
                  , t = null !== (n = E.data.overrideContextType) && void 0 !== n ? n : aw.Z.Other;
                C.context = t,
                e.includes(t) && (C.contextItem = null)
            }
            return tu(v) && (C.smartPreview = !0),
            {
                type: c,
                data: C
            }
        }
        var aj = a(49175)
          , aU = a(35631)
          , aq = a(93748)
          , aF = a(32927)
          , aB = a(6840);
        let aY = e => !!(e && "object" == typeof e && "playId"in e && "totalPlayedSeconds"in e)
          , aW = e => {
            let t = [e.find(e => 0 === e.totalPlayedSeconds), (0,
            aq.Z)(e, "totalPlayedSeconds")];
            return (0,
            aF.Z)(t.filter(aY), "totalPlayedSeconds")
        }
          , aK = e => {
            let t = (0,
            aU.Z)((0,
            aj.Z)(e, "playId"), aW);
            return (0,
            aB.Z)(t)
        }
        ;
        class aH extends eV.y {
            constructor(e, {code: t="E_PLAYS", ...a}={}) {
                super(e, {
                    code: t,
                    ...a
                }),
                (0,
                er._)(this, "name", "PlaysException"),
                Object.setPrototypeOf(this, aH.prototype)
            }
        }
        var az = a(262)
          , aQ = a(41172);
        let aJ = "playsHeartBeats";
        class aZ extends eV.y {
            constructor(e, {code: t="E_PLAYS_IDB_STORE", ...a}={}) {
                super(e, {
                    code: t,
                    ...a
                }),
                (0,
                er._)(this, "name", "PlaysStoreException"),
                Object.setPrototypeOf(this, aZ.prototype)
            }
        }
        let aX = () => "".concat("music_plays", "_").concat("1.0.0")
          , a$ = () => {
            var e, t;
            return (null === (t = window.navigator) || void 0 === t ? void 0 : null === (e = t.storage) || void 0 === e ? void 0 : e.estimate) ? window.navigator.storage.estimate().catch( () => ({})) : Promise.resolve({})
        }
          , a0 = e => /connection.*lost/i.test("".concat(e))
          , a5 = e => "".concat(e).includes("QuotaExceededError");
        class a1 {
            deleteDatabase() {
                return window.indexedDB.databases().then(e => e.find(e => this.idbName === e.name) ? new aQ.r(this.idbName).deleteDB({
                    onBlocked: az.Z
                }) : Promise.resolve()).catch(e => {
                    this.logError("Error while deleting database", e)
                }
                )
            }
            isAvailable() {
                return this.idbIsAvailable
            }
            openDatabase() {
                this.idb = this.openIdb({
                    onBlocked: () => this.onBlockedHandler(),
                    onTerminated: () => this.onTerminatedHandler()
                })
            }
            setErrorLogger(e) {
                this.errorLogger = e
            }
            storePlaysData(e) {
                return this.executeTransaction(t => t.put(aJ, e).then( () => t.count(aJ))).then(e => "number" == typeof e && e > this.storedPlaysLimit ? this.deleteOverLimitPlays(this.storedPlaysLimit) : Promise.resolve()).catch(e => {
                    throw this.generateError("Saving Play Error", e)
                }
                )
            }
            getStoredPlaysData(e) {
                return this.executeTransaction(t => t.getAll(aJ, null, e), {
                    defaultValue: []
                }).catch(e => {
                    throw this.generateError("Error getting Plays", e)
                }
                )
            }
            deleteAllByPlayId(e, t) {
                return Promise.all(e.map(e => {
                    let {playId: a} = e;
                    return this.iterateByCursor("playId", a, "readwrite", e => !t || t(e.value) ? e.delete() : Promise.resolve())
                }
                )).then(az.Z).catch(e => {
                    throw this.generateError("Error deleting Plays", e)
                }
                )
            }
            deleteOverLimitPlays(e) {
                return this.iterateByCursor(null, null, "readwrite", (t, a) => a <= e ? Promise.resolve() : t.delete()).catch(e => {
                    throw this.generateError("Error deleting overlimit Plays", e)
                }
                )
            }
            iterateByCursor() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null
                  , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null
                  , a = arguments.length > 2 ? arguments[2] : void 0
                  , i = arguments.length > 3 ? arguments[3] : void 0
                  , r = 0
                  , s = e => e ? i(e, ++r).then( () => e.continue()).then(s) : Promise.resolve();
                return this.getCursor(e, t, a).then(s)
            }
            onBlockedHandler() {
                this.closeConnection(this.idb).then( () => {
                    this.idb = this.openIdb({
                        onBlocked: () => {
                            this.closeConnection(this.idb)
                        }
                        ,
                        onTerminated: () => this.onTerminatedHandler()
                    })
                }
                )
            }
            onTerminatedHandler() {
                this.idbIsAvailable = !1,
                this.idb = this.openIdb({
                    onBlocked: () => this.onBlockedHandler(),
                    onTerminated: () => {
                        this.idbIsAvailable = !1
                    }
                })
            }
            openIdb(e) {
                return new aQ.r(this.idbName).openDB(1, {
                    onBlocked: (t, a, i) => {
                        var r;
                        this.logError("Connection has been blocked"),
                        null == e || null === (r = e.onBlocked) || void 0 === r || r.call(e, t, a, i)
                    }
                    ,
                    onTerminated: () => {
                        var t;
                        this.logError("Storage has been terminated"),
                        null == e || null === (t = e.onTerminated) || void 0 === t || t.call(e)
                    }
                    ,
                    onUpgrade: e => {
                        let t = e.createObjectStore(aJ, {
                            keyPath: "id",
                            autoIncrement: !0
                        });
                        t.createIndex("playId", "playId", {
                            unique: !1
                        }),
                        t.createIndex("trackId", "trackId", {
                            unique: !1
                        })
                    }
                }).then(e => (this.idbIsAvailable = !0,
                e)).catch(e => {
                    this.idbIsAvailable = !1,
                    this.logError("Open storage error", e)
                }
                )
            }
            closeConnection(e) {
                return (this.idbIsAvailable = !1,
                this.idb = void 0,
                e) ? e.then(e => {
                    e && e.close()
                }
                ).catch(e => {
                    this.logError("Error while try to close connection", e)
                }
                ) : Promise.resolve()
            }
            getCursor() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null
                  , t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null
                  , a = arguments.length > 2 ? arguments[2] : void 0;
                return this.executeTransaction(i => {
                    let r = i.transaction([aJ], a).objectStore(aJ);
                    return e ? r.index(e).openCursor(t, "prev") : r.openCursor(t, "prev")
                }
                , {
                    defaultValue: null
                })
            }
            executeTransaction(e) {
                let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return this.idbIsAvailable && this.idb ? this.idb.then(a => a ? e(a) : Promise.resolve(null == t ? void 0 : t.defaultValue)) : Promise.resolve(null == t ? void 0 : t.defaultValue)
            }
            logError(e, t) {
                var a;
                let i = this.generateError(e, t);
                null === (a = this.errorLogger) || void 0 === a || a.call(this, i)
            }
            generateError(e, t) {
                var a;
                let i = "[IndexedDB][".concat(this.idbName, ".").concat(aJ, "]: ").concat(e)
                  , r = String(t);
                return (a5(t) || a0(t)) && this.closeConnection(),
                new aZ(i,{
                    data: {
                        originalError: r,
                        storageEstimate: null !== (a = this.storageEstimate) && void 0 !== a ? a : {}
                    }
                })
            }
            constructor(e) {
                (0,
                er._)(this, "storedPlaysLimit", void 0),
                (0,
                er._)(this, "idb", void 0),
                (0,
                er._)(this, "errorLogger", void 0),
                (0,
                er._)(this, "idbIsAvailable", !1),
                (0,
                er._)(this, "idbName", void 0),
                (0,
                er._)(this, "storageEstimate", void 0),
                this.storedPlaysLimit = e,
                a$().then(e => {
                    this.storageEstimate = e
                }
                ),
                this.idbName = aX()
            }
        }
        class a2 {
            apply(e) {
                var t, a, i, r, s, n, o;
                let {hooks: l, playback: d} = e;
                this.hooks = l,
                (null === (t = this.variables) || void 0 === t ? void 0 : t.enableLocalStoredPlaysData) && this.playsStore.setErrorLogger(e => {
                    l.afterError.promise(e)
                }
                ),
                (null === (a = this.variables) || void 0 === a ? void 0 : a.shouldDeletePlaysObjectStore) && (null === (n = this.playsStore) || void 0 === n || n.deleteDatabase()),
                (null === (i = this.variables) || void 0 === i ? void 0 : i.enableLocalStoredPlaysData) && !(null === (r = this.variables) || void 0 === r ? void 0 : r.shouldDeletePlaysObjectStore) && (null === (o = this.playsStore) || void 0 === o || o.openDatabase()),
                d.state.playerState.event.onChange( () => {
                    let {currentEntity: e} = d.state.queueState;
                    if (e.value)
                        switch (d.state.playerState.event.value) {
                        case e_.xg.PLAYING:
                            {
                                var t, a;
                                let i;
                                return (0,
                                to.x)(null === (t = e.value) || void 0 === t ? void 0 : t.context) && (null === (a = e.value) || void 0 === a ? void 0 : a.context.data.meta.session) && (i = e.value.context.data.meta.session.radioSessionId),
                                this.changeDynamicPlaysDataByPlayId({
                                    playId: e.value.entity.playId,
                                    dynamicData: {
                                        maxPlayerStage: j.PLAY,
                                        radioSessionId: i
                                    }
                                })
                            }
                        case e_.xg.PAUSED:
                            if (Math.abs(d.state.playerState.progress.value.position - d.state.playerState.progress.value.duration) > .2)
                                return this.changeDynamicPlaysDataByPlayId({
                                    playId: e.value.entity.playId,
                                    dynamicData: {
                                        pause: !0
                                    }
                                });
                            return;
                        case e_.xg.SET_PROGRESS:
                            return this.changeDynamicPlaysDataByPlayId({
                                playId: e.value.entity.playId,
                                dynamicData: {
                                    seek: !0
                                }
                            })
                        }
                }
                );
                let u = (0,
                aI.Z)( () => {
                    let e = d.state.queueState.currentEntity.value;
                    if (!e || (0,
                    t$.Q)(e.context))
                        return;
                    let t = this.getDynamicPlaysDataByPlayId(e.entity.playId)
                      , {data: a} = aM({
                        type: U.PLAYING,
                        contextEntityPair: e,
                        totalPlayedSeconds: e.entity.totalPlayedSeconds,
                        endPositionSeconds: d.state.playerState.progress.value.position,
                        ...t
                    });
                    a.playId && a.totalPlayedSeconds > 0 && this.storeAndReplace(a)
                }
                , this.storePlaysProgressIntervalMs, {
                    trailing: !1
                });
                (null === (s = this.variables) || void 0 === s ? void 0 : s.enableLocalStoredPlaysData) && d.state.playerState.progress.onChange(u),
                l.beforeEntityPlayingProcessStart.tapPromise("PlaysPlugin", () => (this.sendStartEntityPlay(d, l),
                Promise.resolve())),
                l.beforeMediaStartPlaying.tapPromise("PlaysPlugin", () => {
                    let {currentEntity: e} = d.state.queueState;
                    if (e.value) {
                        var t;
                        let a = e.value.entity.playId;
                        (null === (t = this.dynamicPlaysDataByEntitiesPlayId.get(a)) || void 0 === t ? void 0 : t.startTimestamp) || this.changeDynamicPlaysDataByPlayId({
                            playId: a,
                            dynamicData: {
                                startTimestamp: Date.now()
                            }
                        })
                    }
                    return Promise.resolve()
                }
                ),
                l.afterMediaEndPlaying.tapPromise("PlaysPlugin", () => {
                    let {index: {value: e}, entityList: {value: t}, repeat: {value: a}} = d.state.queueState;
                    return (e === t.length - 1 || a === e_.zq.ONE) && this.sendEndEntityPlay(d, l),
                    Promise.resolve()
                }
                ),
                l.afterError.tapPromise("PlaysPlugin", e => ((e instanceof ax || e instanceof e_.YR) && this.sendEndEntityPlay(d, l),
                Promise.resolve())),
                l.beforeContextSet.tapPromise("PlaysPlugin", () => this.sendCurrentEntityEndPlay(d, l)),
                l.afterSetupQueue.tap("PlaysPlugin", () => {
                    var e, t, a;
                    let {currentContext: i, queueState: r} = d.state;
                    if ((null === (e = r.currentEntity.value) || void 0 === e ? void 0 : e.entity.playId) && (0,
                    to.x)(i.value) && (null === (t = i.value) || void 0 === t ? void 0 : t.data.meta.session))
                        return this.changeDynamicPlaysDataByPlayId({
                            playId: null === (a = r.currentEntity.value) || void 0 === a ? void 0 : a.entity.playId,
                            dynamicData: {
                                radioSessionId: i.value.data.meta.session.radioSessionId
                            }
                        })
                }
                ),
                l.beforeEntityChange.tapPromise("PlaysPlugin", () => this.sendCurrentEntityEndPlay(d, l))
            }
            isStorageEnabled() {
                var e;
                return !!(null === (e = this.variables) || void 0 === e ? void 0 : e.enableLocalStoredPlaysData) && this.playsStore.isAvailable()
            }
            setPlaysDataForSending(e) {
                e.forEach(e => {
                    let {playId: t} = e;
                    this.sendingInProgressForPlayId.set(t)
                }
                )
            }
            clearSendedPlaysData(e) {
                e.forEach(e => {
                    let {playId: t} = e;
                    this.sendingInProgressForPlayId.has(t) && this.sendingInProgressForPlayId.delete(t)
                }
                )
            }
            filterPlaysForSending(e) {
                return aK(e.filter(e => {
                    let {playId: t} = e;
                    return !this.sendingInProgressForPlayId.has(t)
                }
                ))
            }
            playsResourceSend(e) {
                return this.setPlaysDataForSending(e),
                this.playsResource.sendPlays({
                    clientNow: aG(),
                    plays: e
                }).finally( () => {
                    this.clearSendedPlaysData(e)
                }
                )
            }
            validatePlaysData(e) {
                if (!e.playId)
                    throw new aH("playId field is required, but was not found in plays data");
                if (!e.from)
                    throw new aH("from field is required, but was not found in plays data")
            }
            deletePlaysData(e, t, a) {
                return this.isStorageEnabled() ? this.playsStore.deleteAllByPlayId(e, t).then( () => {
                    if (a)
                        return a()
                }
                ).catch(e => {
                    var t;
                    null === (t = this.hooks) || void 0 === t || t.afterError.promise(e)
                }
                ) : Promise.resolve()
            }
            storeAndReplace(e) {
                return this.isStorageEnabled() ? this.deletePlaysData([e], e => e.totalPlayedSeconds > 0, () => {
                    var t;
                    return null === (t = this.playsStore) || void 0 === t ? void 0 : t.storePlaysData(e)
                }
                ) : Promise.resolve()
            }
            sendStoredPlaysData() {
                let e = this.variables.limitOfStoredPlaysData || 25;
                return this.isStorageEnabled() ? this.playsStore.getStoredPlaysData(e).then(e => {
                    let t = this.filterPlaysForSending(e);
                    t.length && this.playsResourceSend(t).then( () => {
                        this.deletePlaysData(t)
                    }
                    ).catch(e => {
                        var a;
                        e instanceof ak.du && e.statusCode === ak.CN.BAD_REQUEST && this.deletePlaysData(t),
                        null === (a = this.hooks) || void 0 === a || a.afterError.promise(new aH("Error while sending plays",{
                            cause: e
                        }))
                    }
                    )
                }
                ).catch(e => {
                    var t;
                    null === (t = this.hooks) || void 0 === t || t.afterError.promise(e)
                }
                ) : Promise.resolve()
            }
            sendPlayData(e) {
                this.validatePlaysData(e);
                let t = [e];
                return this.playsResourceSend(t).then( () => {
                    this.isStorageEnabled() && this.deletePlaysData(t, e => e.totalPlayedSeconds > 0)
                }
                ).catch(a => {
                    throw a instanceof ak.du && a.statusCode === ak.CN.BAD_REQUEST ? this.deletePlaysData(t) : this.storeAndReplace(e),
                    a
                }
                ).finally( () => {
                    this.isStorageEnabled() && this.sendStoredPlaysData()
                }
                )
            }
            sendCurrentEntityEndPlay(e, t) {
                if (e.state.queueState.currentEntity.value && e.state.currentContext.value) {
                    if ((0,
                    to.x)(e.state.currentContext.value))
                        return this.sendEndEntityPlay(e, t);
                    this.sendEndEntityPlay(e, t)
                }
                return Promise.resolve()
            }
            sendStartEntityPlay(e, t) {
                let a = e.state.queueState.currentEntity.value;
                try {
                    if (a) {
                        a.entity.addTracksToPlayerTime = "".concat(Math.random().toString().slice(2), "-").concat(Math.ceil(Number(new Date) / 1e3));
                        let {seek: i, pause: r, radioSessionId: s} = this.getDynamicPlaysDataByPlayId(a.entity.playId)
                          , n = aM({
                            type: U.START,
                            contextEntityPair: a,
                            totalPlayedSeconds: 0,
                            endPositionSeconds: 0,
                            seek: i,
                            pause: r,
                            radioSessionId: s
                        });
                        if (n.data.totalPlayedSeconds > 2e3 && t.afterError.promise(new aH("Plays error. Too big play time",{
                            code: "E_PLAYS_BIG_PLAY_TIME",
                            data: {
                                timeStagesOfPlayback: a.entity.timeStagesOfPlayback,
                                contextId: a.context.data.meta.id,
                                entityId: a.entity.data.meta.id,
                                totalPlayedSeconds: n.data.totalPlayedSeconds,
                                trackLengthSeconds: n.data.trackLengthSeconds,
                                playId: n.data.playId,
                                isOnStart: !0,
                                entityListLength: e.state.queueState.entityList.value.length,
                                index: e.state.queueState.index.value,
                                repeat: e.state.queueState.repeat.value
                            }
                        })),
                        !this.variables.disableSendPlaysOnTrackStart)
                            return this.sendPlayData(n.data).catch(e => {
                                let i = ""
                                  , r = "";
                                a && (i = a.context.data.meta.id,
                                r = a.entity.data.meta.id),
                                t.afterError.promise(new aH("Error while sending plays",{
                                    cause: e,
                                    data: {
                                        contextId: i,
                                        entityId: r
                                    }
                                }))
                            }
                            )
                    }
                } catch (r) {
                    let e = ""
                      , i = "";
                    a && (e = a.context.data.meta.id,
                    i = a.entity.data.meta.id),
                    t.afterError.promise(new aH("Error while sending plays",{
                        cause: r,
                        data: {
                            contextId: e,
                            entityId: i
                        }
                    }))
                }
                return Promise.resolve()
            }
            sendEndEntityPlay(e, t) {
                let a = e.state.queueState.currentEntity.value;
                try {
                    if (a && !(0,
                    t$.Q)(a.context)) {
                        let i;
                        let {entity: r} = a
                          , s = a.entity.totalPlayedSeconds
                          , n = this.getDynamicPlaysDataByPlayId(r.playId);
                        return i = 0 === s ? aM({
                            type: U.END,
                            contextEntityPair: a,
                            totalPlayedSeconds: .1,
                            endPositionSeconds: .1,
                            ...n
                        }) : aM({
                            type: U.END,
                            contextEntityPair: a,
                            totalPlayedSeconds: s,
                            endPositionSeconds: e.state.playerState.progress.value.position,
                            ...n
                        }),
                        this.dynamicPlaysDataByEntitiesPlayId.delete(i.data.playId),
                        i.data.totalPlayedSeconds > 2e3 && t.afterError.promise(new aH("Plays error. Too big play time",{
                            code: "E_PLAYS_BIG_PLAY_TIME",
                            data: {
                                timeStagesOfPlayback: a.entity.timeStagesOfPlayback,
                                contextId: a.context.data.meta.id,
                                entityId: a.entity.data.meta.id,
                                totalPlayedSeconds: i.data.totalPlayedSeconds,
                                trackLengthSeconds: i.data.trackLengthSeconds,
                                playId: i.data.playId,
                                isOnStart: !1,
                                entityListLength: e.state.queueState.entityList.value.length,
                                index: e.state.queueState.index.value,
                                repeat: e.state.queueState.repeat.value
                            }
                        })),
                        this.sendPlayData(i.data).catch(e => {
                            let i = ""
                              , r = "";
                            a && (i = a.context.data.meta.id,
                            r = a.entity.data.meta.id),
                            t.afterError.promise(new aH("Error while sending plays",{
                                cause: e,
                                data: {
                                    contextId: i,
                                    entityId: r
                                }
                            }))
                        }
                        )
                    }
                } catch (r) {
                    let e = ""
                      , i = "";
                    a && (e = a.context.data.meta.id,
                    i = a.entity.data.meta.id),
                    t.afterError.promise(new aH("Error while sending plays",{
                        cause: r,
                        data: {
                            contextId: e,
                            entityId: i
                        }
                    }))
                }
                return Promise.resolve()
            }
            changeDynamicPlaysDataByPlayId(e) {
                let {playId: t, dynamicData: a} = e
                  , i = this.dynamicPlaysDataByEntitiesPlayId.get(t);
                this.dynamicPlaysDataByEntitiesPlayId.set(t, {
                    ...null != i ? i : {},
                    ...null != a ? a : {}
                })
            }
            getDynamicPlaysDataByPlayId(e) {
                var t, a, i;
                let r = this.dynamicPlaysDataByEntitiesPlayId.get(e);
                return {
                    seek: null !== (t = null == r ? void 0 : r.seek) && void 0 !== t && t,
                    pause: null !== (a = null == r ? void 0 : r.pause) && void 0 !== a && a,
                    maxPlayerStage: null !== (i = null == r ? void 0 : r.maxPlayerStage) && void 0 !== i ? i : j.PREPARE,
                    startTimestamp: null == r ? void 0 : r.startTimestamp,
                    radioSessionId: null == r ? void 0 : r.radioSessionId
                }
            }
            constructor(e) {
                (0,
                er._)(this, "dynamicPlaysDataByEntitiesPlayId", new Map),
                (0,
                er._)(this, "sendingInProgressForPlayId", new Map),
                (0,
                er._)(this, "playsResource", void 0),
                (0,
                er._)(this, "playsStore", void 0),
                (0,
                er._)(this, "variables", void 0),
                (0,
                er._)(this, "storePlaysProgressIntervalMs", void 0),
                (0,
                er._)(this, "hooks", void 0);
                let {httpClient: t, playsResourceConfig: a, variables: i} = e;
                this.playsResource = new aL(t,a),
                this.variables = i || {},
                this.storePlaysProgressIntervalMs = e.storePlaysProgressIntervalMs || 1e4;
                let r = this.variables.limitOfStoredPlaysData || 100;
                this.playsStore = new a1(r)
            }
        }
        function a3(e) {
            return (null == e ? void 0 : e.data.type) === eC.A.Generative
        }
        (E = q || (q = {})).PLAY = "play",
        E.PAUSE = "pause",
        E.NEXT = "nexttrack",
        E.PREV = "previoustrack",
        E.SEEK = "seekto",
        E.STOP = "stop";
        let a6 = [40, 50, 80, 100, 200, 300, 400]
          , a4 = [q.PLAY, q.PAUSE, q.STOP, q.SEEK]
          , a9 = e => e.startsWith("blob:");
        class a8 {
            isSupported() {
                return "mediaSession"in window.navigator && "MediaMetadata"in window
            }
            handleMediaActionEvents(e, t) {
                let {action: a} = e;
                switch (a) {
                case q.PLAY:
                    t.resume();
                    break;
                case q.PAUSE:
                case q.STOP:
                    t.pause();
                    break;
                case q.NEXT:
                    t.moveForward();
                    break;
                case q.PREV:
                    t.moveBackward();
                    break;
                case q.SEEK:
                    {
                        var i;
                        if (a3(null === (i = t.state.queueState.currentEntity.value) || void 0 === i ? void 0 : i.entity))
                            return;
                        let {seekTime: a} = e;
                        a && t.setProgress(a)
                    }
                }
            }
            prepareMetadata(e) {
                let t, a;
                let i = {
                    title: e.title
                };
                if ("artists"in e) {
                    let t = (e.artists || []).map(e => e.name).join(", ");
                    i.artist = t
                }
                if ("albums"in e) {
                    var r, s;
                    let t = null === (s = e.albums) || void 0 === s ? void 0 : null === (r = s[0]) || void 0 === r ? void 0 : r.title;
                    i.album = t
                }
                return "coverUri"in e && (t = e.coverUri),
                "imageUrl"in e && (t = e.imageUrl),
                t && (a = a6.map(e => {
                    let a = "".concat(e, "x").concat(e);
                    "Safari" === this.browserName && (a = "".concat(2 * e, "x").concat(2 * e));
                    let i = "";
                    return "string" == typeof t && (i = a9(t) ? t : "https://".concat(t.replace("%%", a))),
                    {
                        sizes: a,
                        src: i,
                        type: "image/jpg"
                    }
                }
                )),
                i.artwork = a,
                i
            }
            updateMetadata(e) {
                if (!e)
                    return;
                let t = this.prepareMetadata(e);
                window.navigator.mediaSession.metadata = new MediaMetadata(t)
            }
            handlePlayerEvents(e) {
                let t, a;
                e.state.playerState.event.onChange( () => {
                    if (e.state.playerState.event.value === e_.xg.UPDATING_PROGRESS) {
                        var t, a;
                        this.updateMetadata(null === (t = e.state.queueState.currentEntity.value) || void 0 === t ? void 0 : t.entity.data.meta),
                        a3(null === (a = e.state.queueState.currentEntity.value) || void 0 === a ? void 0 : a.entity) ? navigator.mediaSession.setPositionState({
                            duration: 0,
                            position: 0
                        }) : navigator.mediaSession.setPositionState(),
                        a4.forEach(t => {
                            try {
                                window.navigator.mediaSession.setActionHandler(t, t => this.handleMediaActionEvents(t, e))
                            } catch (e) {
                                console.log('The media session action "'.concat(t, '" is not supported yet.'))
                            }
                        }
                        )
                    }
                }
                ),
                e.state.currentContext.onChange( () => {
                    var i, r;
                    null == t || t(),
                    null == a || a(),
                    t = null === (i = e.state.currentContext.value) || void 0 === i ? void 0 : i.availableActions.moveBackward.onChange( () => {
                        var t, a;
                        let i = null !== (a = null === (t = e.state.currentContext.value) || void 0 === t ? void 0 : t.availableActions.moveBackward.value) && void 0 !== a && a;
                        window.navigator.mediaSession.setActionHandler(q.PREV, i ? t => this.handleMediaActionEvents(t, e) : null)
                    }
                    ),
                    a = null === (r = e.state.currentContext.value) || void 0 === r ? void 0 : r.availableActions.moveForward.onChange( () => {
                        var t, a;
                        let i = null !== (a = null === (t = e.state.currentContext.value) || void 0 === t ? void 0 : t.availableActions.moveForward.value) && void 0 !== a && a;
                        window.navigator.mediaSession.setActionHandler(q.NEXT, i ? t => this.handleMediaActionEvents(t, e) : null)
                    }
                    )
                }
                )
            }
            apply(e) {
                let {playback: t} = e;
                this.isSupported() && this.handlePlayerEvents(t)
            }
            constructor({browserName: e, browserVersion: t}) {
                (0,
                er._)(this, "browserName", void 0),
                (0,
                er._)(this, "browserVersion", void 0),
                this.browserName = e,
                this.browserVersion = t
            }
        }
        class a7 {
            apply(e) {
                let {hooks: t, playback: a} = e;
                t.afterError.tapPromise("LoggerPlugin", e => {
                    let t;
                    let i = a.state.queueState.currentEntity.value ? a.state.queueState.currentEntity.value.entity.mediaSourceData : null;
                    return (t = e instanceof eV.y ? e : new eV.y("Error in Sonata player",{
                        code: "E_SONATA",
                        cause: e
                    })).name = "[Sonata] ".concat(t.name),
                    this.logger.error(t, {
                        ...t.data,
                        ...i || {},
                        code: t.code,
                        cause: t.cause,
                        stack: t.stack,
                        message: t.message
                    }),
                    Promise.resolve()
                }
                )
            }
            constructor(e) {
                (0,
                er._)(this, "logger", void 0);
                let {logger: t} = e;
                this.logger = t
            }
        }
        (F || (F = {})).QUALITY_CHANGE = "QUALITY_CHANGE";
        class ie {
            apply(e) {
                let {playback: t, hooks: a} = e;
                this.quality.onChange( () => {
                    t.state.playerState.status.value !== e_.FY.IDLE && t.reloadEntity(F.QUALITY_CHANGE).catch(e => {
                        a.afterError.promise(e)
                    }
                    )
                }
                )
            }
            constructor(e) {
                (0,
                er._)(this, "quality", void 0),
                this.quality = e
            }
        }
        var it = a(90699);
        let ia = e => "object" == typeof e && e && "rememberPosition"in e && "boolean" == typeof e.rememberPosition;
        class ii {
            apply(e) {
                let {hooks: t, playback: a} = e;
                t.beforeEntityChange.tapPromise("ContinuePlayingPlugin", () => {
                    let {position: e, duration: t} = this.getTimingsFromPlayback(a);
                    return new Promise(i => {
                        e !== t && this.checkBeforeProgressSync(a),
                        i()
                    }
                    )
                }
                ),
                a.state.playerState.status.onChange(e => {
                    (e === e_.FY.PAUSED || e === e_.FY.STOPPED) && (this.clearTimeout(),
                    this.checkBeforeProgressSync(a)),
                    e === e_.FY.PLAYING && this.shouldSendProgressSync(a) && this.setTimeout(a)
                }
                ),
                a.state.playerState.event.onChange( () => {
                    if (a.state.playerState.event.value === e_.xg.SET_PROGRESS) {
                        let e = a.state.queueState.currentEntity.value
                          , t = a.state.playerState.progress.value.position;
                        if (!e)
                            return;
                        let {entity: i} = e;
                        ia(i.data.meta) && i.data.meta.rememberPosition && (i.lastSeekPosition = t)
                    }
                }
                ),
                a.state.queueState.currentEntity.onChange( () => {
                    let e = a.state.queueState.currentEntity.value;
                    if (!e)
                        return;
                    let {entity: t} = e;
                    if (ia(t.data.meta) && t.data.meta.rememberPosition && eI(t.data.meta)) {
                        let {endPositionSec: e} = t.data.meta.streamProgress;
                        t.everFinished ? t.startPosition = e : t.startPosition = Number.isFinite(t.lastSeekPosition) ? t.lastSeekPosition : e
                    }
                }
                )
            }
            checkBeforeProgressSync(e) {
                var t;
                if (this.clearTimeout(),
                !this.shouldSendProgressSync(e))
                    return;
                let {position: a, duration: i} = this.getTimingsFromPlayback(e)
                  , r = null === (t = e.state.queueState.currentEntity.value) || void 0 === t ? void 0 : t.entity.data.meta.id;
                Number.isFinite(i) && Number.isFinite(a) && i && a && r && (this.sendProgressSync({
                    duration: i,
                    position: a,
                    trackId: r
                }),
                e.state.playerState.status.value === e_.FY.PLAYING && this.setTimeout(e))
            }
            sendProgressSync(e) {
                let t = new Date().toISOString()
                  , {duration: a, position: i, trackId: r} = e;
                this.streamsResource.progressSync({
                    lastSyncTimestamp: t,
                    trackStreams: [{
                        trackId: r,
                        positionSec: i,
                        trackLengthSec: a,
                        finished: i === a,
                        timestamp: t
                    }]
                })
            }
            shouldSendProgressSync(e) {
                var t;
                if (!this.variables.isEnabled)
                    return !1;
                let a = null === (t = e.state.queueState.currentEntity.value) || void 0 === t ? void 0 : t.entity.data.meta;
                return !!(a && "rememberPosition"in a && a.rememberPosition)
            }
            setTimeout(e) {
                this.clearTimeout(),
                this.timeoutId = window.setTimeout( () => {
                    this.checkBeforeProgressSync(e)
                }
                , 3e4)
            }
            clearTimeout() {
                window.clearTimeout(this.timeoutId)
            }
            getTimingsFromPlayback(e) {
                return {
                    duration: Math.floor(e.state.playerState.progress.value.duration),
                    position: Math.floor(e.state.playerState.progress.value.position)
                }
            }
            constructor(e) {
                (0,
                er._)(this, "streamsResource", void 0),
                (0,
                er._)(this, "variables", void 0),
                (0,
                er._)(this, "timeoutId", 0);
                let {httpClient: t, streamsResourceConfig: a, variables: i} = e;
                this.streamsResource = new it.h(t,a),
                this.variables = i
            }
        }
        (f = B || (B = {})).WANT_PLAY_TRACK = "WANT_PLAY_TRACK",
        f.TRACK_IS_PLAYING = "TRACK_IS_PLAYING",
        f.TRACK_IS_PLAYING_MISSED = "TRACK_IS_PLAYING_MISSED",
        f.TRACK_ERROR_PREPARE = "TRACK_ERROR_PREPARE",
        f.TRACK_ERROR_INITIAL_BUFFERING = "TRACK_ERROR_INITIAL_BUFFERING",
        f.TRACK_ERROR_PLAYING = "TRACK_ERROR_PLAYING",
        f.REQUEST_TIME = "REQUEST_TIME",
        (Y || (Y = {})).GET_FILE_INFO = "get_file_info",
        (S = W || (W = {})).E_GET_MEDIA_SRC = "E_GET_MEDIA_SRC",
        S.E_CREATE_SIGN = "E_CREATE_SIGN",
        S.E_UNSUITABLE_ENTITY_TYPE = "E_UNSUITABLE_ENTITY_TYPE",
        (b = K || (K = {})).NETWORK = "NETWORK",
        b.OTHER = "OTHER",
        (P = H || (H = {})).BAD_RESPONSE_4XX = "BAD_RESPONSE_4XX",
        P.BAD_RESPONSE_5XX = "BAD_RESPONSE_5XX",
        P.OTHER = "OTHER";
        var ir = a(31)
          , is = a(42982);
        function io(e) {
            switch (e) {
            case ir.n.LOSSLESS:
            case is.n.HIGH_QUALITY:
                return z.LOSSLESS;
            case ir.n.NQ:
            case is.n.BALANCED:
                return z.NQ;
            case ir.n.LQ:
            case is.n.EFFICIENT:
                return z.LQ;
            case ir.n.PREVIEW:
            case is.n.PREVIEW:
                return z.PREVIEW;
            case ir.n.SMART_PREVIEW:
                return z.SMART_PREVIEW;
            default:
                return
            }
        }
        (A = z || (z = {})).LOSSLESS = "Lossless",
        A.NQ = "NQ",
        A.LQ = "LQ",
        A.PREVIEW = "Preview",
        A.SMART_PREVIEW = "SmartPreview";
        var il = a(14094);
        (_ = Q || (Q = {})).SKIPPED = "SKIPPED",
        _.NEXT = "NEXT",
        _.FROM_QUEUE = "FROM_QUEUE",
        _.OTHER = "OTHER";
        class id {
            getEntityQualityInfo(e) {
                let t, a, i;
                return !e.mediaSourceData || "error"in e.mediaSourceData.data || (t = e.mediaSourceData.data.codec,
                a = e.mediaSourceData.data.bitrate),
                e.expectedQuality && (i = io(e.expectedQuality)),
                {
                    codec: t,
                    bitrate: a,
                    expectedQuality: i
                }
            }
            logEvent(e) {
                let {event: t, eventName: a} = e;
                this.enableDebugMode && (t ? (console.group("".concat(null != a ? a : "Untitled Log Metrics Event Info")),
                console.table(t.data),
                console.group("Raw event"),
                console.dir(t),
                console.groupEnd(),
                console.groupEnd()) : console.error("Event in logEvent method not provided"))
            }
            requestTime(e) {
                var t, a;
                let i = String(e.data.meta.id)
                  , r = null === (t = e.mediaSourceData) || void 0 === t ? void 0 : t.getFileInfoResponseTime
                  , s = null === (a = e.mediaSourceData) || void 0 === a ? void 0 : a.url
                  , n = null;
                return "number" == typeof r && s && (n = {
                    name: B.REQUEST_TIME,
                    data: {
                        trackId: i,
                        urlType: Y.GET_FILE_INFO,
                        url: s,
                        time: r
                    }
                }),
                this.logEvent({
                    event: n,
                    eventName: null == n ? void 0 : n.name
                }),
                n && this.transport.send(n),
                n
            }
            wantPlayTrack(e) {
                let t = String(e.data.meta.id)
                  , a = Math.trunc(performance.now())
                  , i = {
                    name: B.WANT_PLAY_TRACK,
                    data: {
                        trackId: t,
                        uuid: e.playId,
                        expectedQuality: io(this.mediaConfigController.quality.value)
                    }
                };
                return this.wantPlayTracksEvents.size > 0 && this.sendTrackIsPlayingMissed(),
                this.wantPlayTracksEvents.set(e.playId, {
                    time: a,
                    event: i,
                    trackId: t
                }),
                this.logEvent({
                    event: i,
                    eventName: null == i ? void 0 : i.name
                }),
                this.transport.send(i),
                i
            }
            trackError(e, t) {
                let {codec: a, bitrate: i, expectedQuality: r} = this.getEntityQualityInfo(t)
                  , s = null;
                return e instanceof aV ? s = {
                    name: B.TRACK_ERROR_PREPARE,
                    data: {
                        trackId: String(t.data.meta.id),
                        uuid: t.playId,
                        type: e.code === W.E_GET_MEDIA_SRC ? K.NETWORK : K.OTHER,
                        subType: function(e) {
                            let t = H.OTHER;
                            if (e.cause instanceof ak.du)
                                switch (String(e.cause.statusCode)[0]) {
                                case "4":
                                    t = H.BAD_RESPONSE_4XX;
                                    break;
                                case "5":
                                    t = H.BAD_RESPONSE_5XX
                                }
                            return t
                        }(e),
                        name: e.name,
                        code: e.code,
                        bitrate: i,
                        codec: a,
                        expectedQuality: r
                    }
                } : e instanceof e_.YR && e.code === e_.Bq.PLAY ? s = {
                    name: B.TRACK_ERROR_INITIAL_BUFFERING,
                    data: {
                        trackId: String(t.data.meta.id),
                        uuid: t.playId,
                        name: e.name,
                        code: e.code,
                        bitrate: i,
                        codec: a,
                        expectedQuality: r,
                        ...e.cause instanceof DOMException ? {
                            causeCode: e.cause.code,
                            causeMessage: e.cause.message,
                            causeName: e.cause.name
                        } : {
                            causeCode: -1,
                            causeMessage: "Unknown error message",
                            causeName: "Unknown error name"
                        }
                    }
                } : e instanceof e_.YR && e.code === e_.Bq.MEDIA_ELEMENT_ERROR && (s = {
                    name: B.TRACK_ERROR_PLAYING,
                    data: {
                        trackId: String(t.data.meta.id),
                        uuid: t.playId,
                        name: e.name,
                        code: e.code,
                        bitrate: i,
                        codec: a,
                        expectedQuality: r,
                        ...e.cause instanceof MediaError ? {
                            causeCode: e.cause.code,
                            causeMessage: e.cause.message
                        } : {
                            causeCode: -1,
                            causeMessage: "Unknown cause"
                        }
                    }
                }),
                e instanceof e_.YR && this.wantPlayTracksEvents.has(t.playId) && (!s || !("causeCode"in s.data) || "causeCode"in s.data && (null == s ? void 0 : s.data.causeCode) !== 20) && this.wantPlayTracksEvents.delete(t.playId),
                s && this.transport.send(s),
                this.logEvent({
                    event: s,
                    eventName: null == s ? void 0 : s.name
                }),
                s
            }
            trackIsPlaying(e) {
                var t, a;
                let i = String(e.data.meta.id)
                  , r = this.wantPlayTracksEvents.has(e.playId) && (null === (t = this.wantPlayTracksEvents.get(e.playId)) || void 0 === t ? void 0 : t.time)
                  , s = function(e) {
                    switch (e) {
                    case il.Zp.SET_INDEX:
                    case il.Zp.MOVE_BACKWARD:
                        return Q.FROM_QUEUE;
                    case il.Zp.AUTO_MOVE_FORWARD:
                        return Q.NEXT;
                    case il.Zp.MOVE_FORWARD:
                        return Q.SKIPPED;
                    default:
                        return Q.OTHER
                    }
                }(null === (a = this.addtionalInfoByPlayId.get(this.lastAdditionalInfoKey)) || void 0 === a ? void 0 : a.entityChangeMethod)
                  , {codec: n, bitrate: o, expectedQuality: l} = this.getEntityQualityInfo(e)
                  , d = null;
                return "number" == typeof r && (d = {
                    name: B.TRACK_IS_PLAYING,
                    data: {
                        trackId: i,
                        time: Math.trunc(performance.now() - r),
                        uuid: e.playId,
                        codec: n,
                        bitrate: o,
                        expectedQuality: l,
                        extraTrackType: s
                    }
                },
                this.addtionalInfoByPlayId.delete(this.lastAdditionalInfoKey),
                this.wantPlayTracksEvents.delete(e.playId),
                this.lastAdditionalInfoKey = null),
                d && this.transport.send(d),
                this.logEvent({
                    event: d,
                    eventName: null == d ? void 0 : d.name
                }),
                d
            }
            sendTrackIsPlayingMissed() {
                let[e,{trackId: t}] = Array.from(this.wantPlayTracksEvents.entries())[0]
                  , a = {
                    name: B.TRACK_IS_PLAYING_MISSED,
                    data: {
                        trackId: t,
                        uuid: e
                    }
                };
                return this.wantPlayTracksEvents.delete(e),
                this.transport.send(a),
                this.logEvent({
                    event: a,
                    eventName: a.name
                }),
                a
            }
            trackHasBeenChanged(e, t) {
                let {method: a} = t;
                this.addtionalInfoByPlayId.size && this.addtionalInfoByPlayId.clear(),
                this.lastAdditionalInfoKey = e.playId,
                this.addtionalInfoByPlayId.set(e.playId, {
                    entityChangeMethod: a
                })
            }
            constructor(e) {
                var t;
                (0,
                er._)(this, "mediaConfigController", void 0),
                (0,
                er._)(this, "wantPlayTracksEvents", new Map),
                (0,
                er._)(this, "addtionalInfoByPlayId", new Map),
                (0,
                er._)(this, "lastAdditionalInfoKey", null),
                (0,
                er._)(this, "enableDebugMode", void 0),
                (0,
                er._)(this, "transport", void 0),
                this.enableDebugMode = null === (t = e.variables) || void 0 === t ? void 0 : t.enableDebugMode,
                this.mediaConfigController = e.mediaConfigController,
                this.transport = e.transport
            }
        }
        class iu {
            apply(e) {
                let {hooks: t, playback: a} = e;
                t.beforeEntityChange.tapPromise("MetricsPlugin", e => {
                    let t = a.state.queueState.currentEntity.value;
                    return t && this.metricsEventsStore.trackHasBeenChanged(t.entity, e),
                    Promise.resolve()
                }
                ),
                t.beforeEntityPlayingProcessStart.tapPromise("MetricsPlugin", () => {
                    let e = a.state.queueState.currentEntity.value;
                    return e && this.metricsEventsStore.wantPlayTrack(e.entity),
                    Promise.resolve()
                }
                ),
                t.afterError.tapPromise("MetricsPlugin", e => {
                    let t = a.state.queueState.currentEntity.value;
                    return t && this.metricsEventsStore.trackError(e, t.entity),
                    Promise.resolve()
                }
                ),
                t.afterMediaStartPlaying.tapPromise("MetricsPlugin", () => {
                    let e = a.state.queueState.currentEntity.value;
                    return e && this.metricsEventsStore.trackIsPlaying(e.entity),
                    Promise.resolve()
                }
                ),
                t.beforeMediaStartPlaying.tapPromise("MetricsPlugin", () => {
                    let e = a.state.queueState.currentEntity.value;
                    return e && this.metricsEventsStore.requestTime(e.entity),
                    Promise.resolve()
                }
                )
            }
            constructor(e) {
                (0,
                er._)(this, "metricsEventsStore", void 0),
                this.metricsEventsStore = new id(e)
            }
        }
        function ic(e, t, a) {
            return !(e instanceof eL) && !!e.isAvailable && (null === e.mediaSourceData || !("error"in e.mediaSourceData.data || aO(e)) && (performance.now() - e.mediaSourceData.loadingTime > t || function(e) {
                switch (e) {
                case ir.n.LOSSLESS:
                case ir.n.HQ:
                    return is.n.HIGH_QUALITY;
                case ir.n.NQ:
                    return is.n.BALANCED;
                case ir.n.LQ:
                }
                return is.n.EFFICIENT
            }(e.mediaSourceData.data.quality) !== a.quality.value))
        }
        class im {
            apply(e) {
                let {hooks: t, playback: a} = e;
                this.variables.isMediaSourcePreloadEnabled && t.beforeEntityPlayingProcessStart.tapPromise("MediaSourcePreloadPlugin", () => {
                    if (!this.variables.isMediaSourcePreloadEnabled || (0,
                    to.x)(a.state.currentContext.value))
                        return Promise.resolve();
                    let {queueState: {index: e, order: i, entityList: r}, currentContext: s} = a.state;
                    if ((0,
                    t$.Q)(s.value))
                        return Promise.resolve();
                    let n = a.getEntityByIndex({
                        index: e.value
                    });
                    return void 0 === n ? Promise.resolve() : ic(n.entity, this.config.mediaSourceTtlMs, this.mediaConfigController) ? new Promise(e => {
                        this.getMediaSourceBatch(a).catch(e => {
                            t.afterError.promise(e)
                        }
                        ).finally(e)
                    }
                    ) : (function(e) {
                        let {windowSize: t, contextEntityPairs: a, index: i, order: r, mediaSourceTtlMs: s, mediaConfigController: n} = e;
                        return r.slice(i - t > 0 ? i - t : 0, i + t + 1).map(e => a[e]).some(e => ic(e.entity, s, n))
                    }({
                        contextEntityPairs: r.value,
                        index: e.value,
                        order: i.value,
                        mediaSourceTtlMs: this.config.mediaSourceTtlMs,
                        mediaConfigController: this.mediaConfigController,
                        windowSize: this.config.checkForLoadWindowSize
                    }) && this.getMediaSourceBatch(a).catch(e => {
                        t.afterError.promise(e)
                    }
                    ),
                    Promise.resolve())
                }
                )
            }
            getMediaSourceBatch(e) {
                let {queueState: {index: t, order: a, entityList: i, repeat: r}} = e.state
                  , s = (0,
                e_.U9)({
                    index: t.value,
                    contextEntityPairs: i.value,
                    windowSize: this.config.loadWindowSize,
                    needToLoadPredicate: e => ic(e.entity, this.config.mediaSourceTtlMs, this.mediaConfigController),
                    order: a.value,
                    repeat: r.value
                }).map(e => e.contextEntityPair.entity);
                return this.mediaProvider.getMediaSourceBatch({
                    entities: s
                })
            }
            constructor({mediaProvider: e, config: t, mediaConfigController: a, variables: i}) {
                (0,
                er._)(this, "variables", void 0),
                (0,
                er._)(this, "mediaProvider", void 0),
                (0,
                er._)(this, "config", void 0),
                (0,
                er._)(this, "mediaConfigController", void 0),
                this.variables = null != i ? i : {
                    isMediaSourcePreloadEnabled: !1
                },
                this.mediaProvider = e,
                this.mediaConfigController = a,
                this.config = t
            }
        }
        class ih {
            apply() {
                this.trailerPlayback.hooks.afterContextEnd.tapPromise("TrailerPlugin", () => (this.trailerPlayback.restartContext({
                    playAfterRestart: !1
                }),
                Promise.resolve())),
                this.trailerPlayback.hooks.afterMediaPause.tapPromise("TrailerPlugin", () => (this.onTrailerPaused(),
                Promise.resolve())),
                this.trailerPlayback.hooks.afterMediaStartPlaying.tapPromise("TrailerPlugin", () => (this.onTrailerPlaying(),
                Promise.resolve())),
                this.trailerPlayback.hooks.afterMediaResume.tapPromise("TrailerPlugin", () => (this.onTrailerPlaying(),
                Promise.resolve()))
            }
            constructor({onTrailerPaused: e, onTrailerPlaying: t, playbackController: a, trailerPlaybackParams: i}) {
                if ((0,
                er._)(this, "onTrailerPaused", void 0),
                (0,
                er._)(this, "onTrailerPlaying", void 0),
                (0,
                er._)(this, "trailerPlayback", void 0),
                this.onTrailerPaused = e,
                this.onTrailerPlaying = t,
                a.createPlayback(i.id, {
                    factory: i.factory,
                    entityProvider: i.entityProvider,
                    playbackConfig: i.playbackConfig,
                    mediaPlayerParams: i.mediaPlayerParams,
                    variables: i.variables
                }),
                this.trailerPlayback = a.getPlayback(i.id),
                i.plugins)
                    for (let e of i.plugins)
                        e.apply({
                            playback: this.trailerPlayback,
                            hooks: this.trailerPlayback.hooks
                        })
            }
        }
        (J || (J = {})).START = "start";
        class ig {
            apply(e) {
                let {playback: t} = e;
                this.channel && (this.channel.onmessage = e => {
                    let {type: a, id: i} = e.data;
                    t.state.playerState.status.value === e_.FY.PLAYING && a === J.START && i !== this.activeStreamId && t.pause()
                }
                ,
                t.state.playerState.status.onChange(e => {
                    if (e === e_.FY.PLAYING) {
                        var t;
                        null === (t = this.channel) || void 0 === t || t.postMessage({
                            type: J.START,
                            id: this.activeStreamId
                        })
                    }
                }
                ))
            }
            constructor({variables: e}) {
                (0,
                er._)(this, "channel", void 0),
                (0,
                er._)(this, "activeStreamId", void 0),
                this.activeStreamId = (0,
                tv.Z)(),
                e.enableSingleTabPlayback && (this.channel = new BroadcastChannel("ya_music_playback"))
            }
        }
        (N = Z || (Z = {})).AD = "ad",
        N.SHOT = "shot",
        (C = X || (X = {})).NONE = "none",
        C.AD = "ad",
        C.JINGLE = "jingle",
        (T = $ || ($ = {})).NONE = "none",
        T.AD = "ad",
        T.JINGLE = "jingle";
        class ip extends aD.c {
            async getAfterTrack(e, t) {
                var a;
                return (await this.httpClient.get("after-track", {
                    prefixUrl: this.config.prefixUrl,
                    headers: this.createRequestHeadersFromParams(e),
                    retry: this.getRetryPolicyConfig(),
                    searchParams: (0,
                    aR.f)({
                        from: e.from,
                        types: e.types,
                        nextTrackId: e.nextTrackId,
                        prevTrackId: e.prevTrackId
                    }),
                    timeout: null === (a = this.config.timeouts) || void 0 === a ? void 0 : a.getAfterTrack,
                    signal: null == t ? void 0 : t.signal
                })).json()
            }
            constructor(e, t) {
                super(e, t),
                (0,
                er._)(this, "httpClient", void 0),
                (0,
                er._)(this, "config", void 0),
                this.httpClient = e,
                this.config = t
            }
        }
        var iy = a(21785);
        class iv {
            apply(e) {
                let {playback: t, hooks: a} = e;
                a.beforeEntityChange.tapPromise("AdvertPlugin", () => new Promise(e => {
                    if (!this.variables.enabled) {
                        e();
                        return
                    }
                    let {state: {currentContext: a, queueState: {index: {value: i}, order: {value: r}, entityList: {value: s}, currentEntity: {value: n}}}} = t;
                    if (void 0 !== a.value) {
                        let o = r[i + 1]
                          , l = o ? s[o] : void 0
                          , d = l ? String(l.entity.data.meta.id) : void 0
                          , u = r[i - 1]
                          , c = u ? s[u] : void 0
                          , m = c ? String(c.entity.data.meta.id) : void 0
                          , h = ((null == n ? void 0 : n.entity.totalPlayedSeconds) || 0) / (((null == n ? void 0 : n.entity.data.meta) && "durationMs"in n.entity.data.meta && n.entity.data.meta.durationMs || 1) / 1e3);
                        this.currentTrackId = String(null == n ? void 0 : n.entity.data.meta.id),
                        this.from = a.value.from,
                        this.afterTrackResource.getAfterTrack({
                            contextItem: String(a.value.data.meta.id),
                            from: a.value.from,
                            types: Z.AD,
                            nextTrackId: d,
                            prevTrackId: m
                        }).then(a => {
                            var i, r;
                            let s = h >= .5 && (null === (i = a.ad) || void 0 === i ? void 0 : i.afterPlay) === X.AD || h < .5 && (null === (r = a.ad) || void 0 === r ? void 0 : r.afterSkip) === $.AD;
                            "ad"in a && this.advertModule && s ? (t.pause(),
                            this.advertModule.playAdvert(a).finally(e)) : e()
                        }
                        )
                    } else
                        e()
                }
                ))
            }
            advertFeedbackCallback() {
                this.adsResource.saveAds({
                    from: this.from,
                    trackId: this.currentTrackId,
                    type: "ad"
                })
            }
            constructor(e) {
                var t;
                (0,
                er._)(this, "advertModule", void 0),
                (0,
                er._)(this, "variables", void 0),
                (0,
                er._)(this, "afterTrackResource", void 0),
                (0,
                er._)(this, "adsResource", void 0),
                (0,
                er._)(this, "currentTrackId", ""),
                (0,
                er._)(this, "from", "");
                let {httpClient: a, afterTrackResourceConfig: i, advertModule: r, adsResourceConfig: s, variables: n} = e;
                this.afterTrackResource = new ip(a,i),
                this.adsResource = new iy.j(a,s),
                this.variables = n,
                this.advertModule = r,
                null === (t = this.advertModule) || void 0 === t || t.setAdvertFeedbackCallback(this.advertFeedbackCallback.bind(this))
            }
        }
        let iE = [eM.A.Album, eM.A.Artist, eM.A.Playlist, eM.A.Various]
          , iS = (e, t, a) => {
            var i;
            let r = null === (i = t.state.currentContext.value) || void 0 === i ? void 0 : i.data;
            if (!r)
                return "";
            let s = e
              , n = t.state.queueState.entityList.value.length || 0;
            return s === eM.A.Various && 1 === n && (s = "track"),
            e === eM.A.Various && "overrideContextType"in r && r.overrideContextType && (s = r.overrideContextType),
            "".concat(a, "-radio-").concat(s, "-autoflow")
        }
          , ib = (e, t) => {
            var a, i, r, s;
            let n = null === (a = t.state.currentContext.value) || void 0 === a ? void 0 : a.data;
            if (n) {
                if (e === eM.A.Album)
                    return ["album:".concat(n.meta.id)];
                if (e === eM.A.Artist)
                    return ["artist:".concat(n.meta.id)];
                if (e === eM.A.Playlist && "owner"in n.meta && (null === (i = n.meta.owner) || void 0 === i ? void 0 : i.uid) && "kind"in n.meta && n.meta.kind)
                    return ["playlist:".concat(null === (r = n.meta.owner) || void 0 === r ? void 0 : r.uid, "_").concat(n.meta.kind)];
                if (e === eM.A.Various) {
                    if ("overrideAutoflowSeeds"in n && n.overrideAutoflowSeeds)
                        return n.overrideAutoflowSeeds;
                    let e = null === (s = t.state.queueState.currentEntity.value) || void 0 === s ? void 0 : s.entity.data.meta.id;
                    return ["track:".concat(e)]
                }
            }
        }
        ;
        class iP {
            apply(e) {
                let {playback: t, hooks: a} = e;
                a.afterContextEnd.tapPromise("AutoflowPlugin", () => {
                    var e, a, i;
                    if (!this.variables.enabled)
                        return Promise.resolve();
                    let r = null === (e = t.state.currentContext.value) || void 0 === e ? void 0 : e.data.type;
                    return (null === (a = t.state.currentContext.value) || void 0 === a ? void 0 : a.data) && "enableVariousAutoFlow"in t.state.currentContext.value.data && (null === (i = t.state.currentContext.value) || void 0 === i ? void 0 : i.data.enableVariousAutoFlow) && (r = eM.A.Various),
                    r && iE.includes(r) && this.playAutoflow(t),
                    Promise.resolve()
                }
                )
            }
            playAutoflow(e) {
                var t, a, i;
                let r = null === (t = e.state.currentContext.value) || void 0 === t ? void 0 : t.data.type;
                (null === (a = e.state.currentContext.value) || void 0 === a ? void 0 : a.data) && "enableVariousAutoFlow"in e.state.currentContext.value.data && (null === (i = e.state.currentContext.value) || void 0 === i ? void 0 : i.data.enableVariousAutoFlow) && (r = eM.A.Various);
                let s = ib(r, e)
                  , n = e.state.currentContext.value
                  , o = Object.create(null != n ? n : null);
                if (!(r && s))
                    return;
                let l = this.factory.createContext({
                    data: {
                        type: eM.A.Vibe,
                        meta: {
                            id: (0,
                            e8.$)(s)
                        },
                        seeds: s,
                        from: iS(r, e, this.platform),
                        includeTracksInResponse: !0,
                        parentContext: o
                    }
                });
                e.playContext({
                    context: l,
                    loadContextMeta: !0
                })
            }
            constructor({platform: e, factory: t, variables: a}) {
                (0,
                er._)(this, "platform", void 0),
                (0,
                er._)(this, "factory", void 0),
                (0,
                er._)(this, "variables", void 0),
                this.platform = e,
                this.factory = t,
                this.variables = a
            }
        }
        class iA {
            setQuality(e) {
                switch (e) {
                case is.n.HIGH_QUALITY:
                    this.qualityConfig.lossless.value = !0,
                    this.qualityConfig.hq.value = !0,
                    this.qualityConfig.nq.value = !0,
                    this.qualityConfig.lq.value = !0,
                    this.qualityConfig.preview.value = !1,
                    this.quality.value = is.n.HIGH_QUALITY;
                    break;
                case is.n.BALANCED:
                    this.qualityConfig.lossless.value = !1,
                    this.qualityConfig.hq.value = !0,
                    this.qualityConfig.nq.value = !0,
                    this.qualityConfig.lq.value = !0,
                    this.qualityConfig.preview.value = !1,
                    this.quality.value = is.n.BALANCED;
                    break;
                case is.n.EFFICIENT:
                    this.qualityConfig.lossless.value = !1,
                    this.qualityConfig.hq.value = !1,
                    this.qualityConfig.nq.value = !0,
                    this.qualityConfig.lq.value = !0,
                    this.qualityConfig.preview.value = !1,
                    this.quality.value = is.n.EFFICIENT;
                    break;
                case is.n.PREVIEW:
                    this.qualityConfig.lossless.value = !1,
                    this.qualityConfig.hq.value = !1,
                    this.qualityConfig.nq.value = !1,
                    this.qualityConfig.lq.value = !1,
                    this.qualityConfig.preview.value = !0,
                    this.quality.value = is.n.PREVIEW
                }
            }
            constructor(e) {
                (0,
                er._)(this, "qualityConfig", {
                    lossless: new eq.wi(!1),
                    hq: new eq.wi(!0),
                    nq: new eq.wi(!0),
                    lq: new eq.wi(!0),
                    preview: new eq.wi(!0),
                    smart_preview: new eq.wi(!1)
                }),
                (0,
                er._)(this, "quality", new eq.wi(is.n.BALANCED)),
                this.setQuality(e)
            }
        }
        class i_ extends aV {
            constructor(e, {code: t="E_GENERATIVE_MEDIA_PROVIDER", ...a}={}) {
                super(e, {
                    code: t,
                    ...a
                }),
                (0,
                er._)(this, "name", "GenerativeMediaProviderException"),
                Object.setPrototypeOf(this, i_.prototype)
            }
        }
        class iN {
            getMediaSource(e) {
                return a3(e.entity) ? this.getGenerativeSrc(e.entity.data).then(e => ({
                    src: e
                })) : Promise.reject(new i_("Provided entity is not generative entity",{
                    code: W.E_UNSUITABLE_ENTITY_TYPE
                }))
            }
            getGenerativeSrc(e) {
                var t;
                return (null === (t = e.meta.stream) || void 0 === t ? void 0 : t.url) ? Promise.resolve(e.meta.stream.url) : Promise.reject(new i_("Failed to create generative src link",{
                    code: W.E_GET_MEDIA_SRC
                }))
            }
        }
        var iC = a(5257)
          , iT = a(81979);
        function iI(e) {
            let {productQuality: t, entities: a, entity: i} = e
              , r = !1;
            if (a && (r = a.some(e => tu(e))),
            i && (r = tu(i)),
            r)
                return ir.n.SMART_PREVIEW;
            switch (t) {
            case is.n.HIGH_QUALITY:
                return ir.n.LOSSLESS;
            case is.n.BALANCED:
                return ir.n.NQ;
            case is.n.EFFICIENT:
                return ir.n.LQ;
            case is.n.PREVIEW:
                return ir.n.PREVIEW;
            default:
                return ir.n.NQ
            }
        }
        var ik = a(20470);
        function iD(e) {
            return e instanceof Error ? {
                name: e.name,
                message: e.message,
                stack: e.stack,
                cause: e.cause
            } : {
                data: e
            }
        }
        class iR {
            getPreloadedFileInfo(e) {
                let {entity: t, disableCache: a=!1} = e;
                if (!(a || ic(t, this.mediaSourceTtlMs, this.mediaConfigController)) && t.mediaSourceData)
                    return t.mediaSourceData.data
            }
            getFileInfoFromResource(e) {
                let {trackId: t, quality: a, codecs: i, transports: r} = e
                  , s = (0,
                iC.I)()
                  , n = i.join("")
                  , o = r.join("")
                  , l = "".concat(s).concat(t).concat(a).concat(n).concat(o);
                return new Promise( (e, o) => {
                    (0,
                    iC.U)({
                        data: l,
                        secretKey: this.secretKey
                    }).then(l => {
                        this.resource.getFileInfo({
                            tsInSeconds: s,
                            trackId: t,
                            quality: a,
                            codecs: i,
                            transports: r,
                            sign: l
                        }).then(t => {
                            e({
                                downloadInfo: t.downloadInfo,
                                responseTime: t.responseTime,
                                url: t.url
                            })
                        }
                        ).catch(e => {
                            o(new ax("Error in get-file-info request",{
                                code: W.E_GET_MEDIA_SRC,
                                cause: e,
                                data: {
                                    trackId: t,
                                    quality: a,
                                    codecs: n,
                                    causeAsObject: iD(e)
                                }
                            }))
                        }
                        )
                    }
                    ).catch(e => {
                        o(new ax("Error in creating sign for get-file-info request",{
                            code: W.E_CREATE_SIGN,
                            cause: e,
                            data: {
                                trackId: t,
                                quality: a,
                                codecs: n,
                                causeAsObject: iD(e)
                            }
                        }))
                    }
                    )
                }
                )
            }
            getFileInfo(e) {
                let {entity: t, disableCache: a=!1, codecs: i, quality: r, transports: s} = e;
                if (this.variables.isMediaSourcePreloadEnabled)
                    try {
                        let e = this.getPreloadedFileInfo({
                            entity: t,
                            disableCache: a
                        });
                        if (e)
                            return Promise.resolve({
                                downloadInfo: e
                            })
                    } catch (e) {
                        return Promise.reject(e)
                    }
                return this.getFileInfoFromResource({
                    trackId: t.data.meta.id,
                    quality: r,
                    codecs: i,
                    transports: s
                })
            }
            getMediaSource(e) {
                let {entity: t, disableCache: a=!1} = e
                  , i = iI({
                    productQuality: this.mediaConfigController.quality.value,
                    entity: t
                })
                  , r = tu(t) ? iT.J.RAW : this.transport;
                return t.expectedQuality = i,
                this.getFileInfo({
                    entity: t,
                    disableCache: a,
                    quality: i,
                    transports: [r],
                    codecs: this.codecs
                }).then(e => {
                    let {downloadInfo: r, responseTime: s, url: n} = e;
                    return !this.variables.doRetryOnEncraw || "error"in r || ik.oW.includes(r.codec) || r.transport !== iT.J.ENCRAW ? (t.mediaSourceData = {
                        data: r,
                        loadingTime: performance.now(),
                        getFileInfoResponseTime: s,
                        url: n
                    },
                    this.createMediaSource({
                        downloadInfo: r,
                        trackId: t.data.meta.id,
                        quality: i,
                        codecs: this.codecs
                    })) : (t.mediaSourceData = null,
                    this.getFileInfo({
                        entity: t,
                        disableCache: a,
                        quality: i,
                        transports: [iT.J.RAW],
                        codecs: this.codecs
                    }).then(e => {
                        let {downloadInfo: a, responseTime: r, url: s} = e;
                        return t.mediaSourceData = {
                            data: a,
                            loadingTime: performance.now(),
                            getFileInfoResponseTime: r,
                            url: s
                        },
                        t.expectedQuality = i,
                        this.createMediaSource({
                            downloadInfo: a,
                            trackId: t.data.meta.id,
                            quality: i,
                            codecs: this.codecs
                        })
                    }
                    ).catch(e => {
                        throw t.mediaSourceData = {
                            data: r,
                            loadingTime: performance.now(),
                            getFileInfoResponseTime: s
                        },
                        new ax("Error in get-file-info retry enclaw request",{
                            code: W.E_GET_MEDIA_SRC,
                            cause: e,
                            data: {
                                trackId: t.data.meta.id,
                                quality: i,
                                codecs: this.codecs.join(""),
                                causeAsObject: iD(e)
                            }
                        })
                    }
                    ))
                }
                )
            }
            getMediaSourceBatch(e) {
                let {entities: t} = e
                  , a = (0,
                iC.I)()
                  , i = iI({
                    productQuality: this.mediaConfigController.quality.value,
                    entities: t
                })
                  , r = this.codecs.join("")
                  , s = t.reduce( (e, t) => "".concat(e).concat(t.data.meta.id, ","), "").slice(0, -1)
                  , n = t.some(e => tu(e)) ? iT.J.RAW : this.transport
                  , o = "".concat(a).concat(s).concat(i).concat(r).concat(n);
                return new Promise( (e, l) => {
                    (0,
                    iC.U)({
                        data: o,
                        secretKey: this.secretKey
                    }).then(o => {
                        this.resource.getFileInfoBatch({
                            tsInSeconds: a,
                            trackIds: s,
                            quality: i,
                            codecs: this.codecs,
                            transports: [n],
                            sign: o
                        }).then(a => {
                            for (let e of a.downloadInfos) {
                                let a = t.find(t => t.data.meta.id === e.trackId);
                                a && (a.mediaSourceData = {
                                    loadingTime: performance.now(),
                                    data: e
                                },
                                a.expectedQuality = i)
                            }
                            e(a.downloadInfos)
                        }
                        ).catch(e => {
                            l(new ax("Error in get-file-info/batch request",{
                                code: W.E_GET_MEDIA_SRC,
                                cause: e,
                                data: {
                                    trackId: s,
                                    quality: i,
                                    codecs: r,
                                    causeAsObject: iD(e)
                                }
                            }))
                        }
                        )
                    }
                    ).catch(e => {
                        l(new ax("Error in creating sign for get-file-info request",{
                            code: W.E_CREATE_SIGN,
                            cause: e,
                            data: {
                                trackId: s,
                                quality: i,
                                codecs: r,
                                causeAsObject: iD(e)
                            }
                        }))
                    }
                    )
                }
                )
            }
            createMediaSource(e) {
                let {downloadInfo: t, trackId: a, codecs: i, quality: r} = e
                  , s = i.join("");
                if ("error"in t)
                    throw new ax("Error message in get-file-info response",{
                        code: W.E_GET_MEDIA_SRC,
                        data: {
                            trackId: a,
                            quality: r,
                            codecs: s,
                            mediaSource: t
                        }
                    });
                if (!t.urls[0])
                    throw new ax("No urls in get-file-info response",{
                        code: W.E_GET_MEDIA_SRC,
                        data: {
                            trackId: a,
                            quality: r,
                            codecs: s,
                            mediaSource: t
                        }
                    });
                let n = ""
                  , o = ik.Jq[t.codec];
                return {
                    src: o ? "".concat(t.urls[0]).concat(o) : t.urls[0],
                    key: t.transport === iT.J.ENCRAW ? t.key : void 0
                }
            }
            constructor(e) {
                var t, a;
                (0,
                er._)(this, "secretKey", void 0),
                (0,
                er._)(this, "resource", void 0),
                (0,
                er._)(this, "mediaConfigController", void 0),
                (0,
                er._)(this, "transport", void 0),
                (0,
                er._)(this, "codecs", void 0),
                (0,
                er._)(this, "variables", void 0),
                (0,
                er._)(this, "mediaSourceTtlMs", void 0);
                let {resource: i, secretKey: r, mediaConfigController: s, transport: n, variables: o, mediaSourceTtlMs: l, codecs: d} = e;
                this.resource = i,
                this.secretKey = r,
                this.mediaConfigController = s,
                this.transport = n,
                this.codecs = d,
                this.variables = {
                    isMediaSourcePreloadEnabled: null !== (t = null == o ? void 0 : o.isMediaSourcePreloadEnabled) && void 0 !== t && t,
                    doRetryOnEncraw: null !== (a = null == o ? void 0 : o.doRetryOnEncraw) && void 0 !== a && a
                },
                this.mediaSourceTtlMs = null != l ? l : 0
            }
        }
        class iL {
            async getMediaSource(e) {
                return a3(e.entity) ? this.generativeProvider.getMediaSource(e) : this.getFileInfoProvider.getMediaSource(e)
            }
            getMediaSourceBatch(e) {
                let {entities: t} = e;
                return t.some(e => a3(e)) ? Promise.reject(new aV("Can not use getMediaSourceBatch for generative entities",{
                    code: W.E_UNSUITABLE_ENTITY_TYPE
                })) : this.getFileInfoProvider.getMediaSourceBatch({
                    entities: t
                })
            }
            constructor(e) {
                (0,
                er._)(this, "generativeProvider", new iN),
                (0,
                er._)(this, "getFileInfoProvider", void 0),
                this.getFileInfoProvider = new iR(e.getFileInfoProviderParams)
            }
        }
        class iV extends eV.y {
            constructor(e, {code: t="E_YAMUSIC_ENTITY_PROVIDER", ...a}={}) {
                super(e, {
                    code: t,
                    ...a
                }),
                (0,
                er._)(this, "name", "YaMusicEntityProviderException"),
                Object.setPrototypeOf(this, iV.prototype)
            }
        }
        class ix {
            async loadEntities(e) {
                let {trackIds: t} = function(e) {
                    let t = [];
                    return e.forEach(e => {
                        let {context: a, entity: i} = e
                          , r = i.data.meta.id
                          , s = "string" == typeof r && r.includes(":");
                        if (!i.data.fromCurrentContext || s) {
                            t.push(i.data.meta.id);
                            return
                        }
                        (null == a ? void 0 : a.data.type) === eM.A.Album && (r = "".concat(i.data.meta.id, ":").concat(a.data.meta.id)),
                        "albumId"in i.data.meta && i.data.meta.albumId && (r = "".concat(i.data.meta.id, ":").concat(i.data.meta.albumId)),
                        t.push(r)
                    }
                    , {}),
                    {
                        trackIds: t
                    }
                }(e);
                return this.resource.getTracksMeta({
                    trackIds: t,
                    withProgress: !0
                }).then(t => {
                    let a = [];
                    for (let i of t) {
                        let t = e.find(e => String(e.entity.data.meta.id).includes(String(i.id)));
                        t && a.push({
                            ...t.entity.data,
                            type: eC.A.Unknown,
                            meta: i
                        })
                    }
                    return a
                }
                ).catch(e => {
                    throw new iV("Failed to get entities meta",{
                        cause: iD(e)
                    })
                }
                )
            }
            constructor(e) {
                (0,
                er._)(this, "resource", void 0);
                let {httpClient: t, config: a} = e;
                this.resource = new te.H(t,{
                    params: a.params,
                    prefixUrl: a.prefixUrl,
                    retryPolicyConfig: a.retryPolicyConfig,
                    timeouts: a.timeouts
                })
            }
        }
        var iO = a(35941);
        (ee || (ee = {})).MAIN = "MAIN";
        class iw {
            afterPlayHandler(e) {
                return this.activePlayback.value = e,
                Promise.resolve()
            }
            beforePlayHandler(e) {
                return this.activePlayback.value && this.activePlayback.value !== e ? this.activePlayback.value.pause() : Promise.resolve()
            }
            getPlayback(e) {
                if (e) {
                    let t = this.playbacks.get(e);
                    if (t)
                        return t
                }
                let t = this.playbacks.get(ee.MAIN);
                if (void 0 !== t)
                    return t;
                throw new eV.y("MAIN playback was not created",{
                    code: "NO_MAIN_PLAYBACK"
                })
            }
            checkPlaybackBlockingStatus() {
                var e, t;
                let a = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ee.MAIN
                  , i = null === (e = this.activePlayback.value) || void 0 === e ? void 0 : e.getId()
                  , r = i === a;
                return ((null === (t = this.activePlayback.value) || void 0 === t ? void 0 : t.isBlocking) || r) && !r ? {
                    status: il.pr.BLOCKED,
                    blockingPlaybackId: i
                } : {
                    status: il.pr.UNBLOCKED
                }
            }
            callIfUnblocked(e, t) {
                let {status: a, blockingPlaybackId: i} = this.checkPlaybackBlockingStatus(t);
                return a === il.pr.UNBLOCKED ? e() : (this.getPlayback(t).hooks.afterPlaybackCheckBlockingStatus.promise({
                    status: a,
                    blockingPlaybackId: i
                }),
                Promise.resolve())
            }
            createPlayback(e, t) {
                if (!this.playbacks.has(e)) {
                    let a = new e_.Vb({
                        id: e,
                        isBlocking: t.isBlocking || !1,
                        factory: t.factory,
                        entityProvider: t.entityProvider,
                        mediaPlayerParams: t.mediaPlayerParams,
                        hooks: (0,
                        il.Hu)(),
                        playbackConfig: t.playbackConfig,
                        variables: t.variables
                    });
                    this.playbacks.set(e, a),
                    a.hooks.afterMediaStartPlaying.tapPromise("MusicPlaybackController", () => this.afterPlayHandler(a)),
                    a.hooks.beforeMediaStartPlaying.tapPromise("MusicPlaybackController", () => this.beforePlayHandler(a)),
                    a.hooks.afterMediaResume.tapPromise("MusicPlaybackController", () => this.afterPlayHandler(a)),
                    a.hooks.beforeMediaResume.tapPromise("MusicPlaybackController", () => this.beforePlayHandler(a))
                }
            }
            constructor() {
                (0,
                er._)(this, "activePlayback", new eq.wi(null)),
                (0,
                er._)(this, "playbacks", new Map)
            }
        }
        class iG {
            get state() {
                return this.playbackController.getPlayback().state
            }
            getState(e) {
                return this.playbackController.getPlayback(e).state
            }
            playContext(e, t) {
                let a = this.playbackController.getPlayback(t);
                try {
                    let {contextData: i} = e
                      , r = this.factory.createContext({
                        data: i
                    });
                    return this.playbackController.callIfUnblocked( () => a.playContext({
                        context: r,
                        entitiesData: e.entitiesData,
                        loadContextMeta: e.loadContextMeta,
                        queueParams: e.queueParams
                    }).catch(e => {
                        a.hooks.afterError.promise(e)
                    }
                    ), t)
                } catch (e) {
                    return a.hooks.afterError.promise(e),
                    Promise.resolve()
                }
            }
            setContext(e, t) {
                let a = this.playbackController.getPlayback(t);
                try {
                    let {contextData: i} = e
                      , r = this.factory.createContext({
                        data: i
                    });
                    return this.playbackController.callIfUnblocked( () => a.setContext({
                        context: r,
                        entitiesData: e.entitiesData,
                        loadContextMeta: e.loadContextMeta,
                        queueParams: e.queueParams
                    }).catch(e => {
                        a.hooks.afterError.promise(e)
                    }
                    ), t)
                } catch (e) {
                    return a.hooks.afterError.promise(e),
                    Promise.resolve()
                }
            }
            restartContext(e, t) {
                let a = this.playbackController.getPlayback(t);
                return this.playbackController.callIfUnblocked( () => a.restartContext({
                    playAfterRestart: e.playAfterRestart,
                    entitiesData: e.entitiesData,
                    queueParams: e.queueParams
                }).catch(e => {
                    a.hooks.afterError.promise(e)
                }
                ), t)
            }
            play(e) {
                let t = this.playbackController.getPlayback(e);
                return this.playbackController.callIfUnblocked( () => t.play().catch(e => {
                    t.hooks.afterError.promise(e)
                }
                ), e)
            }
            stop(e) {
                let t = this.playbackController.getPlayback(e);
                return this.playbackController.callIfUnblocked( () => t.stop().catch(e => {
                    t.hooks.afterError.promise(e)
                }
                ), e)
            }
            pause(e) {
                let t = this.playbackController.getPlayback(e);
                return this.playbackController.callIfUnblocked( () => t.pause().catch(e => {
                    t.hooks.afterError.promise(e)
                }
                ), e)
            }
            resume(e) {
                let t = this.playbackController.getPlayback(e);
                return this.playbackController.callIfUnblocked( () => t.resume().catch(e => {
                    t.hooks.afterError.promise(e)
                }
                ), e)
            }
            setProgress(e, t) {
                let a = this.playbackController.getPlayback(t);
                return this.playbackController.callIfUnblocked( () => a.setProgress(e).catch(e => (a.hooks.afterError.promise(e),
                0)), t)
            }
            setVolume(e, t) {
                let a = this.playbackController.getPlayback(t);
                return this.playbackController.callIfUnblocked( () => a.setVolume(e).catch(e => (a.hooks.afterError.promise(e),
                0)), t)
            }
            setSpeed(e, t) {
                let a = this.playbackController.getPlayback(t);
                return this.playbackController.callIfUnblocked( () => a.setSpeed(e).catch(e => (a.hooks.afterError.promise(e),
                1)), t)
            }
            slideForward(e, t) {
                let a = this.playbackController.getPlayback(t);
                return this.playbackController.callIfUnblocked( () => a.slideForward(e).catch(e => (a.hooks.afterError.promise(e),
                0)), t)
            }
            slideBackward(e, t) {
                let a = this.playbackController.getPlayback(t);
                return this.playbackController.callIfUnblocked( () => a.slideBackward(e).catch(e => (a.hooks.afterError.promise(e),
                0)), t)
            }
            increaseVolume(e, t) {
                let a = this.playbackController.getPlayback(t);
                return this.playbackController.callIfUnblocked( () => a.increaseVolume(e).catch(e => (a.hooks.afterError.promise(e),
                0)), t)
            }
            decreaseVolume(e, t) {
                let a = this.playbackController.getPlayback(t);
                return this.playbackController.callIfUnblocked( () => a.decreaseVolume(e).catch(e => (a.hooks.afterError.promise(e),
                0)), t)
            }
            moveForward(e) {
                let t = this.playbackController.getPlayback(e);
                return this.playbackController.callIfUnblocked( () => t.moveForward().catch(e => {
                    t.hooks.afterError.promise(e)
                }
                ), e)
            }
            moveBackward(e) {
                let t = this.playbackController.getPlayback(e);
                return this.playbackController.callIfUnblocked( () => t.moveBackward().catch(e => {
                    t.hooks.afterError.promise(e)
                }
                ), e)
            }
            setEntityByIndex(e, t) {
                let a = this.playbackController.getPlayback(t);
                return this.playbackController.callIfUnblocked( () => a.setEntityByIndex(e).catch(e => {
                    a.hooks.afterError.promise(e)
                }
                ), t)
            }
            togglePause(e) {
                let t = this.playbackController.getPlayback(e);
                return this.playbackController.callIfUnblocked( () => t.togglePause().catch(e => {
                    t.hooks.afterError.promise(e)
                }
                ), e)
            }
            toggleShuffle(e) {
                let t = this.playbackController.getPlayback(e);
                try {
                    this.playbackController.callIfUnblocked( () => t.toggleShuffle(), e)
                } catch (e) {
                    t.hooks.afterError.promise(e)
                }
            }
            setShuffle(e, t) {
                let a = this.playbackController.getPlayback(t);
                try {
                    this.playbackController.callIfUnblocked( () => a.setShuffle(e), t)
                } catch (e) {
                    a.hooks.afterError.promise(e)
                }
            }
            bindPlayer(e) {
                this.playbackController.getPlayback(e).bindPlayer()
            }
            unbindPlayer(e) {
                this.playbackController.getPlayback(e).unbindPlayer()
            }
            setRepeatMode(e, t) {
                let a = this.playbackController.getPlayback(t);
                try {
                    this.playbackController.callIfUnblocked( () => a.setRepeatMode(e), t)
                } catch (e) {
                    a.hooks.afterError.promise(e)
                }
            }
            remove(e) {
                let {positions: t, playbackId: a, silent: i} = e
                  , r = this.playbackController.getPlayback(a);
                this.playbackController.callIfUnblocked( () => r.remove(t, i), a)
            }
            hide(e) {
                let {positions: t, playbackId: a, silent: i} = e
                  , r = this.playbackController.getPlayback(a);
                this.playbackController.callIfUnblocked( () => r.hide(t, i), a)
            }
            inject(e) {
                let {entitiesData: t, position: a, playbackId: i, silent: r} = e
                  , s = this.playbackController.getPlayback(i);
                this.playbackController.callIfUnblocked( () => s.inject(t, a, r), i)
            }
            injectNext(e) {
                let {entitiesData: t, playbackId: a, silent: i} = e
                  , r = this.playbackController.getPlayback(a);
                this.playbackController.callIfUnblocked( () => r.injectNext(t, i), a)
            }
            injectLast(e) {
                let {entitiesData: t, playbackId: a, silent: i} = e
                  , r = this.playbackController.getPlayback(a);
                this.playbackController.callIfUnblocked( () => r.injectLast(t, i), a)
            }
            registerMediaPlayer(e) {
                let {mediaPlayerParams: t, playbackId: a} = e;
                this.playbackController.getPlayback(a).registerMediaPlayer(t)
            }
            constructor(e) {
                if ((0,
                er._)(this, "factory", void 0),
                (0,
                er._)(this, "playbackController", void 0),
                this.factory = e.factory,
                this.playbackController = e.playbackController,
                this.playbackController.createPlayback(ee.MAIN, {
                    factory: e.factory,
                    mediaPlayerParams: e.mediaPlayerParams,
                    entityProvider: e.entityProvider,
                    playbackConfig: e.playbackConfig,
                    variables: e.variables
                }),
                e.plugins) {
                    let t = this.playbackController.getPlayback(ee.MAIN);
                    for (let a of e.plugins)
                        a.apply({
                            playback: t,
                            hooks: t.hooks
                        })
                }
            }
        }
        var iM = a(59033)
          , ij = a(38593)
          , iU = a(55196)
          , iq = a(24622)
          , iF = a(32049)
          , iB = a(20238)
          , iY = a(10468);
        let iW = e => {
            let {audioLoader: t, children: a} = e;
            return (0,
            ei.use)(t),
            a
        }
        ;
        var iK = a(79491)
          , iH = a(60521);
        let iz = (0,
        ea.Pi)( () => {
            let e = (0,
            iH.ji)()
              , t = (0,
            iB.jpI)()
              , {sonataState: a} = (0,
            iB.oR4)();
            (0,
            ei.useEffect)( () => {
                e.loadPresets()
            }
            , [e]),
            (0,
            ei.useEffect)( () => {
                (null == t ? void 0 : t.equalizer) && (e.isEnabled ? (e.currentPreset && t.equalizer.applyPreset((0,
                iK.ZN)(e.currentPreset)),
                t.equalizer.enable()) : t.equalizer.disable())
            }
            , [e.currentPreset, e.isEnabled, null == t ? void 0 : t.equalizer, a.isCoresRegistered])
        }
        )
          , iQ = e => {
            let {children: t} = e
              , a = (0,
            iB.wdp)()
              , [i] = (0,
            ei.useState)( () => iH.wi.create({
                isEnabled: !1,
                modal: {}
            }, a));
            return (0,
            et.jsx)(iH.gp.Provider, {
                value: i,
                children: t
            })
        }
          , iJ = null
          , iZ = null
          , iX = null
          , i$ = null
          , i0 = null
          , i5 = [iB.BUb.YmPlayerQuality, iB.BUb.YmPlayerShuffle, iB.BUb.YmPlayerPrevVolume, iB.BUb.YmPlayerVolume, iB.BUb.YmPlayerRepeatMode]
          , i1 = e => {
            let {children: t, hostTld: i, browserInfo: r, quality: s, withAdvertPlugin: n=!0, withAutoflowPlugin: o=!0, withYnison: l=!0} = e
              , d = (0,
            iB.uK4)()
              , {sonataState: u, experiments: c, library: m, trailer: h, user: g} = (0,
            iB.oR4)()
              , {isPassToProduct: p, isFreemium: y} = (0,
            iB.NMB)()
              , v = (0,
            iB.wLl)()
              , E = d.get(iB.V0J)
              , f = d.get(iB.xit)
              , {language: S} = (0,
            iB.ZSk)()
              , b = (0,
            iB.ozq)()
              , P = (0,
            ij.s)()
              , A = c.checkExperiment(iB.peG.WebNextAllowContainerCodecs, "on")
              , _ = !g.isAuthorized || p || y || !l
              , N = (0,
            ei.useMemo)( () => {
                let e = r.name || "Browser"
                  , t = (0,
                iB.bop)() || r.version || "";
                return {
                    title: "Browser ".concat(r.name),
                    appName: e,
                    appVersion: t
                }
            }
            , [r.name, r.version])
              , C = (0,
            ei.useMemo)( () => (iJ || (iJ = new iA(s)),
            iJ), [s])
              , T = "Safari" !== r.name && "iOS" !== r.OSFamily
              , I = (0,
            ei.useMemo)( () => iX || (iX = new ty({
                useAnalyser: T,
                useEqualizer: T,
                useFade: !1
            })), [T])
              , k = (0,
            ei.useMemo)( () => {
                if (i0)
                    return i0;
                let e = d.get(iB.ES6)
                  , t = d.get(iB.U5t)
                  , {transport: a, codecs: i} = (0,
                iB.Rbj)(r, A);
                return i0 = new iL({
                    getFileInfoProviderParams: {
                        resource: e,
                        secretKey: t.player.secretKey,
                        mediaConfigController: C,
                        transport: a,
                        codecs: i,
                        variables: {
                            get isMediaSourcePreloadEnabled() {
                                return c.checkExperiment(iB.peG.WebNextGetFileInfoPreload, "on")
                            },
                            get doRetryOnEncraw() {
                                return A
                            }
                        },
                        mediaSourceTtlMs: t.player.configVariablesMainPlayback.mediaSourceTtlMs
                    }
                })
            }
            , [d, c, A, C, r])
              , D = (0,
            ei.useMemo)( () => {
                if (!k)
                    return null;
                if (iZ)
                    return iZ;
                let e = d.get(iB.U5t)
                  , t = d.get(iB.pIE)({
                    credentials: "include"
                })
                  , a = !!e.dev.panel && !!E.get(iB.BUb.EnableMetricsPluginDebugMode)
                  , {resources: s, player: {prefixUrl: l, configVariablesMainPlayback: p, configVariablesTrailerPlayback: D}, ynisonConnectionConfig: R} = e
                  , {timeouts: L, retryPolicyConfig: V} = s.musicExternalApi
                  , x = new td({
                    contextFactoryParams: {
                        httpClient: t,
                        logger: v,
                        config: {
                            params: {
                                common: {
                                    client: (0,
                                    iF.$)(),
                                    device: (0,
                                    iB.qcA)(),
                                    language: S,
                                    oauth: f.token
                                }
                            },
                            retryPolicyConfig: V,
                            resourceTimeoutsConfig: L,
                            prefixUrl: (0,
                            eA.zJ)(l, i, iB.MgS),
                            contextVariables: {
                                vibe: {
                                    get sendFeedbackToSessionTracks() {
                                        return c.checkExperiment(iB.peG.WebNextWaveNewFeedbacks, "on")
                                    },
                                    get enableGetNextTracksAfterCloneVibeContext() {
                                        return c.checkExperiment(iB.peG.WebNextLimitTracksFromYnison, "on")
                                    }
                                }
                            }
                        }
                    },
                    entityFactoryParams: {
                        likeStore: m
                    }
                });
                i$ = new aE({
                    factory: x,
                    deviceConfig: N,
                    connectionConfig: R,
                    variables: {
                        get enableYnisonConnection() {
                            return c.checkExperiment(iB.peG.WebNextEnableYnison, "on") && !_
                        },
                        get enableLimitTracksFromYnison() {
                            return c.checkExperiment(iB.peG.WebNextLimitTracksFromYnison, "on")
                        },
                        get shouldApplyState() {
                            return u.shouldApplyYnisonState
                        }
                    },
                    oauth: f.token
                });
                let O = new ix({
                    httpClient: t,
                    config: {
                        params: {
                            common: {
                                client: (0,
                                iF.$)(),
                                device: (0,
                                iB.qcA)(),
                                language: S,
                                oauth: f.token
                            }
                        },
                        retryPolicyConfig: V,
                        timeouts: L.tracksResource,
                        prefixUrl: (0,
                        eA.zJ)(l, i, iB.MgS)
                    }
                })
                  , w = new iw
                  , G = new af(P)
                  , M = [new aN, new aC, new aT({
                    variables: {
                        handleStalled: !A,
                        handleWaiting: A
                    }
                }), new a2({
                    httpClient: t,
                    playsResourceConfig: {
                        params: {
                            common: {
                                client: (0,
                                iF.$)(),
                                device: (0,
                                iB.qcA)(),
                                language: S,
                                oauth: f.token
                            }
                        },
                        prefixUrl: (0,
                        eA.zJ)(l, i, iB.MgS)
                    },
                    variables: {
                        get disableSendPlaysOnTrackStart() {
                            return c.checkExperiment(iB.peG.WebNextDisableSendPlaysOnTrackStart, "on")
                        },
                        get enableLocalStoredPlaysData() {
                            return c.checkExperiment(iB.peG.WebNextPlayAudioHeartBeat, "on")
                        },
                        get shouldDeletePlaysObjectStore() {
                            return c.checkExperiment(iB.peG.WebNextDeleteIndexedDbPlaysStore, "on")
                        }
                    }
                }), new a8({
                    browserName: r.name,
                    browserVersion: r.version
                }), new a7({
                    logger: v
                }), new ie(C.quality), new ii({
                    httpClient: t,
                    streamsResourceConfig: {
                        params: {
                            common: {
                                client: (0,
                                iF.$)(),
                                device: (0,
                                iB.qcA)(),
                                language: S,
                                oauth: f.token
                            }
                        },
                        prefixUrl: (0,
                        eA.zJ)(l, i, iB.MgS)
                    },
                    variables: {
                        get isEnabled() {
                            return g.isAuthorized
                        }
                    }
                }), new iu({
                    mediaConfigController: C,
                    transport: G,
                    variables: {
                        get enableDebugMode() {
                            return a
                        }
                    }
                }), new im({
                    mediaProvider: k,
                    mediaConfigController: C,
                    config: {
                        checkForLoadWindowSize: p.checkForLoadWindowSize,
                        loadWindowSize: p.loadWindowSize,
                        mediaSourceTtlMs: p.mediaSourceTtlMs
                    },
                    variables: {
                        get isMediaSourcePreloadEnabled() {
                            return c.checkExperiment(iB.peG.WebNextGetFileInfoPreload, "on")
                        }
                    }
                }), new ih({
                    onTrailerPaused: () => {
                        h.setIsManuallyPaused(!0)
                    }
                    ,
                    onTrailerPlaying: () => {
                        h.setIsManuallyPaused(!1)
                    }
                    ,
                    playbackController: w,
                    trailerPlaybackParams: {
                        id: iB.jiA.TRAILER,
                        plugins: [new ty({
                            useFade: T,
                            useSmartPreview: !0
                        }), new aN, new a7({
                            logger: v
                        }), new aT({
                            variables: {
                                handleStalled: !A,
                                handleWaiting: A
                            }
                        }), new iu({
                            mediaConfigController: C,
                            transport: G,
                            variables: {
                                get enableDebugMode() {
                                    return a
                                }
                            }
                        }), new a2({
                            httpClient: t,
                            playsResourceConfig: {
                                params: {
                                    common: {
                                        client: (0,
                                        iF.$)(),
                                        device: (0,
                                        iB.qcA)(),
                                        language: S,
                                        oauth: f.token
                                    }
                                },
                                prefixUrl: (0,
                                eA.zJ)(l, i, iB.MgS)
                            },
                            variables: {
                                get disableSendPlaysOnTrackStart() {
                                    return c.checkExperiment(iB.peG.WebNextDisableSendPlaysOnTrackStart, "on")
                                },
                                get enableLocalStoredPlaysData() {
                                    return c.checkExperiment(iB.peG.WebNextPlayAudioHeartBeat, "on")
                                },
                                get shouldDeletePlaysObjectStore() {
                                    return c.checkExperiment(iB.peG.WebNextDeleteIndexedDbPlaysStore, "on")
                                }
                            },
                            storePlaysProgressIntervalMs: 5e3
                        }), new ig({
                            variables: {
                                get enableSingleTabPlayback() {
                                    return c.checkExperiment(iB.peG.WebNextSingleTabPlayback, "on")
                                }
                            }
                        })],
                        factory: x,
                        mediaPlayerParams: A ? void 0 : {
                            core: new eb,
                            mediaProvider: k,
                            entityContentType: eT.z.AUDIO
                        },
                        entityProvider: O,
                        playbackConfig: {
                            mediaElementErrorReloadCount: D.mediaElementErrorReloadCount,
                            windowSize: D.windowSize,
                            setupQueueWindowSize: D.setupQueueWindowSize
                        },
                        variables: {
                            get useMultipleCores() {
                                return A
                            }
                        }
                    }
                }), i$, new iv({
                    advertModule: b,
                    httpClient: t,
                    afterTrackResourceConfig: {
                        params: {
                            common: {
                                client: (0,
                                iF.$)(),
                                device: (0,
                                iB.qcA)(),
                                language: S,
                                oauth: f.token
                            }
                        },
                        prefixUrl: (0,
                        eA.zJ)(l, i, iB.MgS)
                    },
                    adsResourceConfig: {
                        params: {
                            common: {
                                client: (0,
                                iF.$)(),
                                device: (0,
                                iB.qcA)(),
                                language: S,
                                oauth: f.token
                            }
                        },
                        prefixUrl: (0,
                        eA.zJ)(l, i, iB.MgS)
                    },
                    variables: {
                        get enabled() {
                            return !g.hasPlus && n
                        }
                    }
                }), new ig({
                    variables: {
                        get enableSingleTabPlayback() {
                            return c.checkExperiment(iB.peG.WebNextSingleTabPlayback, "on")
                        }
                    }
                })];
                null == b || b.createAudioAdvertPlayback({
                    playbackController: w,
                    mediaPlayerParams: A ? void 0 : {
                        core: new eb,
                        mediaProvider: new iB.FOM,
                        entityContentType: eT.z.AUDIO
                    },
                    variables: {
                        get useMultipleCores() {
                            return A
                        }
                    }
                }),
                I && M.push(I),
                M.push(new iP({
                    factory: x,
                    platform: "web",
                    variables: {
                        get enabled() {
                            return g.isAuthorized && !y && o
                        }
                    }
                }));
                let j = T ? new eb : new eP;
                iZ = new iG({
                    factory: x,
                    playbackController: w,
                    plugins: M,
                    entityProvider: O,
                    mediaPlayerParams: A ? void 0 : {
                        entityContentType: eT.z.AUDIO,
                        core: j,
                        mediaProvider: k
                    },
                    playbackConfig: {
                        mediaElementErrorReloadCount: p.mediaElementErrorReloadCount,
                        windowSize: p.windowSize,
                        setupQueueWindowSize: p.setupQueueWindowSize
                    },
                    variables: {
                        get useMultipleCores() {
                            return A
                        }
                    }
                });
                DataReady.set("stateControl", {
                data: iZ,
                core: j.core
            });
                return iZ;
            }
            , [b, f.token, r.name, r.version, d, _, c, i, y, T, T, S, m, v, C, k, P, u.shouldApplyYnisonState, E, h, g.hasPlus, g.isAuthorized, I, A, n, o, N]);
            (0,
            iq.A4)(D);
            let R = (0,
            iU._Z)(D)
              , L = (0,
            ei.useCallback)( () => {
                let e = E.get(iB.BUb.YmPlayerVolume);
                "number" == typeof e ? (null == D || D.setVolume(e),
                null == D || D.setVolume(e, iB.jiA.TRAILER),
                u.setVolume(e)) : (null == D || D.setVolume(1),
                null == D || D.setVolume(1, iB.jiA.TRAILER),
                u.setVolume(1))
            }
            , [E, D, u]);
            (0,
            ei.useEffect)( () => {
                D && d.get(iB.U5t).dev.exposeSonataStateInWindow && (window.sonataState = D.state)
            }
            , [D, d]),
            (0,
            ei.useEffect)( () => {
                if (!A || !D || !k || u.isCoresRegistered)
                    return;
                let e = d.get(iB.U5t);
                a.e(9489).then(a.bind(a, 49489)).then(t => {
                    let {YaspCoreAdapter: a, YaspLoader: i, HlsCoreAdapter: r} = t
                      , s = new i({
                        logger: v
                    })
                      , n = new a
                      , o = new r({
                        hlsErrorRetryLimit: e.player.hlsErrorRetryLimit
                    })
                      , l = new a
                      , d = null;
                    D.registerMediaPlayer({
                        mediaPlayerParams: {
                            core: n,
                            mediaProvider: k,
                            entityContentType: eT.z.AUDIO
                        }
                    }),
                    D.registerMediaPlayer({
                        mediaPlayerParams: {
                            core: T ? o : n,
                            mediaProvider: k,
                            entityContentType: eT.z.HLS
                        }
                    }),
                    D.registerMediaPlayer({
                        mediaPlayerParams: {
                            core: l,
                            mediaProvider: k,
                            entityContentType: eT.z.AUDIO
                        },
                        playbackId: iB.jiA.TRAILER
                    }),
                    b && (d = new a,
                    D.registerMediaPlayer({
                        mediaPlayerParams: {
                            core: d,
                            entityContentType: eT.z.AUDIO,
                            mediaProvider: new iB.FOM
                        },
                        playbackId: iB.jiA.ADVERT
                    })),
                    L(),
                    s.loadYasp(e.player.yaspVersion).then( () => {
                        s.attachYasp(n.source),
                        s.attachYasp(l.source)
                    }
                    ),
                    u.setCoresAsRegistered(!0)
                }
                )
            }
            , [c, b, k, D, v, A, d, L, T, u.isCoresRegistered, u]),
            (0,
            ei.useEffect)( () => {
                let e, t, a, i, r;
                let s = null == D ? void 0 : D.state.queueState.currentEntity.onChange(e => {
                    var t;
                    let a = null == e ? void 0 : e.context.data.type
                      , i = null == e ? void 0 : e.context.data.meta.id;
                    if (u.setEntityMeta(null !== (t = null == e ? void 0 : e.entity) && void 0 !== t ? t : null),
                    null == e ? void 0 : e.context.data) {
                        if ("filter"in e.context.data) {
                            let t = null == e ? void 0 : e.context.data.filter;
                            u.setPlaylistFilter(t)
                        }
                        (null == e ? void 0 : e.context.data.type) === eM.A.Vibe && u.setPlaylistFilter(void 0)
                    }
                    a && u.setContextType(a),
                    i && u.setContextId(i);
                    let r = D.state.queueState.index.value;
                    D.state.queueState.order.value.length > 0 && "number" == typeof r && u.setCurrentlyPlayingTrackIndex(r),
                    R()
                }
                )
                  , n = null == D ? void 0 : D.state.queueState.order.onChange(e => {
                    let t = D.state.queueState.index.value;
                    if (e) {
                        let a = e[t];
                        D.state.queueState.order.value.length > 0 && "number" == typeof a && u.setCurrentlyPlayingTrackIndex(a)
                    }
                }
                )
                  , o = null == D ? void 0 : D.state.playerState.status.onChange(e => {
                    e && (u.setStatus(e),
                    (0,
                    iq.Pt)({
                        isPlaying: e === e_.FY.PLAYING
                    }))
                }
                )
                  , l = null == D ? void 0 : D.state.currentContext.onChange( () => {
                    var s, n, o, l, d, c;
                    null == e || e(),
                    null == t || t(),
                    null == a || a(),
                    null == i || i(),
                    null == r || r();
                    let m = null !== (c = E.get(iB.BUb.YmPlayerRepeatMode)) && void 0 !== c ? c : iO.zq.NONE;
                    D.setRepeatMode(m);
                    let h = !!E.get(iB.BUb.YmPlayerShuffle);
                    D.setShuffle(h),
                    e = null == D ? void 0 : null === (s = D.state.currentContext.value) || void 0 === s ? void 0 : s.availableActions.moveBackward.onChange( () => {
                        var e;
                        let t = !!(null == D ? void 0 : null === (e = D.state.currentContext.value) || void 0 === e ? void 0 : e.availableActions.moveBackward.value);
                        u.setCanMoveBackward(t),
                        (0,
                        iq.Pt)({
                            canMoveBackward: t
                        })
                    }
                    ),
                    t = null == D ? void 0 : null === (n = D.state.currentContext.value) || void 0 === n ? void 0 : n.availableActions.moveForward.onChange( () => {
                        var e;
                        let t = !!(null == D ? void 0 : null === (e = D.state.currentContext.value) || void 0 === e ? void 0 : e.availableActions.moveForward.value);
                        u.setCanMoveForward(t),
                        (0,
                        iq.Pt)({
                            canMoveForward: t
                        })
                    }
                    ),
                    a = null == D ? void 0 : null === (o = D.state.currentContext.value) || void 0 === o ? void 0 : o.availableActions.repeat.onChange( () => {
                        var e;
                        let t = null == D ? void 0 : null === (e = D.state.currentContext.value) || void 0 === e ? void 0 : e.availableActions.repeat.value;
                        "boolean" == typeof t && u.setCanChangeRepeatMode(t)
                    }
                    ),
                    i = null == D ? void 0 : null === (l = D.state.currentContext.value) || void 0 === l ? void 0 : l.availableActions.shuffle.onChange( () => {
                        var e;
                        let t = null == D ? void 0 : null === (e = D.state.currentContext.value) || void 0 === e ? void 0 : e.availableActions.shuffle.value;
                        "boolean" == typeof t && u.setCanShuffle(t)
                    }
                    ),
                    r = null == D ? void 0 : null === (d = D.state.currentContext.value) || void 0 === d ? void 0 : d.availableActions.speed.onChange( () => {
                        var e;
                        let t = null == D ? void 0 : null === (e = D.state.currentContext.value) || void 0 === e ? void 0 : e.availableActions.speed.value;
                        "boolean" == typeof t && (u.setCanSpeed(t),
                        !t && D && D.setSpeed(1))
                    }
                    )
                }
                )
                  , d = null == D ? void 0 : D.state.playerState.volume.onChange( () => {
                    let e = D.state.playerState.volume.value;
                    "number" == typeof e && u.setVolume(e)
                }
                )
                  , c = null == D ? void 0 : D.state.queueState.repeat.onChange( () => {
                    let e = D.state.queueState.repeat.value;
                    u.setRepeatMode(e),
                    E.set(iB.BUb.YmPlayerRepeatMode, e, {
                        expires: 365
                    })
                }
                )
                  , m = null == D ? void 0 : D.state.queueState.shuffle.onChange( () => {
                    let e = D.state.queueState.shuffle.value;
                    u.setShuffle(e),
                    E.set(iB.BUb.YmPlayerShuffle, e, {
                        expires: 365
                    })
                }
                );
                return L(),
                () => {
                    null == s || s(),
                    null == n || n(),
                    null == o || o(),
                    null == l || l(),
                    null == d || d(),
                    null == c || c(),
                    null == m || m()
                }
            }
            , [D, u, E, R, c, L, A]);
            let V = (0,
            ei.useCallback)( () => {
                if (!g.isAuthorized || p)
                    return is.n.PREVIEW;
                if (y)
                    return is.n.EFFICIENT;
                let e = E.get(iB.BUb.YmPlayerQuality);
                if (e) {
                    if (Object.values(iB.qql).includes(e)) {
                        let t = (0,
                        iB.RE8)(e);
                        return E.set(iB.BUb.YmPlayerQuality, t, {
                            expires: 365
                        }),
                        t
                    }
                    return e
                }
                return E.set(iB.BUb.YmPlayerQuality, is.n.BALANCED, {
                    expires: 365
                }),
                is.n.BALANCED
            }
            , [E, p, y, g.isAuthorized]);
            return (0,
            ei.useEffect)( () => {
                C.setQuality(V()),
                u.setQuality(V())
            }
            , [C, u, V]),
            (0,
            ei.useEffect)( () => {
                (0,
                iM.iJ)(E, i5)
            }
            , [E]),
            (0,
            et.jsx)(iB.Xe$.Provider, {
                value: C,
                children: (0,
                et.jsx)(iB.R8o.Provider, {
                    value: D,
                    children: (0,
                    et.jsx)(iB.yZB.Provider, {
                        value: I,
                        children: (0,
                        et.jsx)(iB.YB2.Provider, {
                            value: i$,
                            children: (0,
                            et.jsxs)(iQ, {
                                children: [(0,
                                et.jsx)(iz, {}), t]
                            })
                        })
                    })
                })
            })
        }
          , i2 = (0,
        ea.Pi)(e => {
            let {children: t, hostTld: a, browserInfo: i, quality: r} = e
              , s = (0,
            iB.Klg)();
            return (0,
            et.jsx)(ei.Suspense, {
                fallback: (0,
                et.jsx)(iY.b2, {}),
                children: (0,
                et.jsx)(iW, {
                    audioLoader: s,
                    children: (0,
                    et.jsx)(i1, {
                        hostTld: a,
                        browserInfo: i,
                        quality: r,
                        children: t
                    })
                })
            })
        }
        )
    }