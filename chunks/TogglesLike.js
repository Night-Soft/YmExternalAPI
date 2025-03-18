Chunks[16519] = function ToggleLike(e, t, i) {
    "use strict";
    i.d(t, {
        KL: function() {
            return m
        },
        S2: function() {
            return g
        },
        Ib: function() {
            return p
        },
        K3: function() {
            return v
        },
        dU: function() {
            return E
        },
        K8: function() {
            return f
        },
        i_: function() {
            return A
        },
        ie: function() {
            return k
        },
        n4: function() {
            return L
        },
        T2: function() {
            return M
        },
        fE: function() {
            return j
        },
        fu: function() {
            return U
        },
        CU: function() {
            return q
        },
        Al: function() {
            return F
        },
        Vn: function() {
            return B
        },
        ao: function() {
            return z
        },
        $4: function() {
            return J
        },
        tC: function() {
            return X
        }
    });
    var a, s, r, n, o, l, d, u, c = i(2685);
    let m = c.V5.model("BaseModalModel", {
        isOpened: c.V5.optional(c.V5.boolean, !1)
    }).actions(e => ({
        onOpenChange(t) {
            e.isOpened = t
        },
        open() {
            e.isOpened = !0
        },
        close() {
            e.isOpened = !1
        }
    }))
      , h = c.V5.model("BrowserInfo", {
        hasHuaweiAppGallery: c.V5.boolean,
        inAppBrowser: c.V5.boolean,
        isBrowser: c.V5.boolean,
        isMobile: c.V5.boolean,
        isTablet: c.V5.boolean,
        isTouch: c.V5.boolean,
        name: c.V5.maybe(c.V5.string),
        version: c.V5.maybe(c.V5.string),
        OSFamily: c.V5.maybe(c.V5.string)
    }).views(e => ({
        get isSafari() {
            var t;
            return null === (t = e.name) || void 0 === t ? void 0 : t.toLowerCase().includes("safari")
        }
    }))
      , g = c.V5.model("CaseForms", {
        nominative: c.V5.optional(c.V5.string, ""),
        genitive: c.V5.optional(c.V5.string, ""),
        dative: c.V5.optional(c.V5.string, ""),
        accusative: c.V5.optional(c.V5.string, ""),
        instrumental: c.V5.optional(c.V5.string, ""),
        prepositional: c.V5.optional(c.V5.string, "")
    })
      , p = c.V5.model("Cover", {
        uri: c.V5.maybe(c.V5.string),
        color: c.V5.maybe(c.V5.string),
        videoUrl: c.V5.maybe(c.V5.string)
    })
      , y = c.V5.model("DisclaimerDetails", {
        text: c.V5.maybe(c.V5.string),
        url: c.V5.maybe(c.V5.string)
    })
      , v = c.V5.model("DisclaimerData", {
        title: c.V5.maybe(c.V5.string),
        description: c.V5.maybe(c.V5.string),
        details: c.V5.maybe(y)
    })
      , E = c.V5.compose(c.V5.model({
        id: c.V5.string,
        type: c.V5.string
    }), v)
      , f = c.V5.model("DomainTrailerEntity", {
        isAvailable: c.V5.boolean
    });
    var S = i(76382)
      , b = i(98654)
      , P = i(17820);
    let _ = c.V5.model("Experiment", {
        group: c.V5.maybe(c.V5.string),
        value: c.V5.maybe(c.V5.frozen())
    })
      , A = c.V5.model("Experiments", {
        loadingState: c.V5.enumeration(Object.values(b.G)),
        experiments: c.V5.optional(c.V5.map(_), {}),
        overwrittenExperiments: c.V5.optional(c.V5.map(_), {})
    }).views(e => ({
        getOverwrittenExperiments() {
            let {containerStorage: t, config: i} = (0,
            c.dU)(e)
              , a = t.get(P.B.OverwrittenExperiments);
            return !i.dev.allowOverwriteExperiments && (null == a ? void 0 : a[S.p.WebNextAllowUnauthorized]) ? {
                [S.p.WebNextAllowUnauthorized]: a[S.p.WebNextAllowUnauthorized]
            } : i.dev.allowOverwriteExperiments ? a : null
        },
        getExperiment(t) {
            var i;
            let a = e.experiments.get(t)
              , s = this.getOverwrittenExperiments();
            return s && null !== (i = s[t]) && void 0 !== i ? i : a
        },
        checkExperiment(t, i) {
            var a;
            let s = e.experiments.get(t)
              , r = this.getOverwrittenExperiments();
            if (!r)
                return (null == s ? void 0 : s.group) === i;
            let n = null === (a = r[t]) || void 0 === a ? void 0 : a.group;
            return n ? n === i : (null == s ? void 0 : s.group) === i
        },
        isRejected: () => e.loadingState === b.G.REJECT
    })).actions(e => ({
        getData: (0,
        c.ls)(function*() {
            let {accountResource: t, modelActionsLogger: i} = (0,
            c.dU)(e);
            if (e.loadingState !== b.G.PENDING)
                try {
                    e.loadingState = b.G.PENDING;
                    let i = yield t.experimentsDetails();
                    e.experiments.clear(),
                    Object.entries(i).forEach(t => {
                        let[i,a] = t;
                        e.experiments.set(i, a)
                    }
                    ),
                    e.loadingState = b.G.RESOLVE
                } catch (t) {
                    i.error(t),
                    e.loadingState = b.G.REJECT
                } finally {
                    var a;
                    Object.entries(null !== (a = e.getOverwrittenExperiments()) && void 0 !== a ? a : {}).forEach(t => {
                        let[i,a] = t;
                        e.overwrittenExperiments.set(i, a)
                    }
                    )
                }
        }),
        updateOverwrittenExperiments(t, i) {
            let {config: a} = (0,
            c.dU)(e);
            a.dev.allowOverwriteExperiments && e.overwrittenExperiments.set(t, i)
        },
        deleteOverwrittenExperiments(t) {
            let {config: i} = (0,
            c.dU)(e);
            i.dev.allowOverwriteExperiments && e.overwrittenExperiments.delete(t)
        }
    }));
    (a = o || (o = {})).EXPLICIT = "explicit",
    a.CLEAN = "clean";
    var N = i(35068)
      , C = i(19522)
      , T = i(13477)
      , I = i(82876);
    let k = c.V5.model("ExplicitModel", {
        contentWarning: c.V5.maybe(c.V5.enumeration(Object.values(o))),
        trackType: c.V5.maybe(c.V5.enumeration(Object.values(N.V))),
        disclaimers: c.V5.maybe(c.V5.array(c.V5.string))
    }).views(e => ({
        get isExplicit() {
            return e.contentWarning === o.EXPLICIT
        },
        get explicitDisclaimer() {
            var t, i, a, s, r;
            if (!(0,
            c.fh)(e) || !e.disclaimers)
                return null;
            let {experiments: n} = (0,
            c.yj)(e)
              , o = null == n ? void 0 : n.checkExperiment(I.peG.WebNextAllowExclamationIcon, "on")
              , l = null === (t = (0,
            I.V4d)(e.disclaimers, C.e.EXPLICIT_ICON)) || void 0 === t ? void 0 : t[0]
              , d = null === (i = (0,
            I.V4d)(e.disclaimers, C.e.AGE_18_ICON)) || void 0 === i ? void 0 : i[0]
              , u = null === (a = (0,
            I.V4d)(e.disclaimers, C.e.EXCLAMATION_ICON)) || void 0 === a ? void 0 : a[0];
            if (o && (null == u ? void 0 : u.type) === C.e.EXCLAMATION_ICON)
                return T.ExplicitMarkVariant.EXCLAMATION;
            if (o && l || !o && (null === (s = e.disclaimers) || void 0 === s ? void 0 : s.includes(C.e.EXPLICIT)))
                return T.ExplicitMarkVariant.E;
            if (o && d || !o && (null === (r = e.disclaimers) || void 0 === r ? void 0 : r.includes(C.e.AGE_18)))
                return T.ExplicitMarkVariant.NUMERIC;
            return null
        }
    })).actions(e => ({
        getDescriptionTexts: (0,
        c.ls)(function*() {
            if (!e.disclaimers)
                return null;
            let {disclaimers: t, experiments: i} = (0,
            c.yj)(e);
            if (!((null == i ? void 0 : i.checkExperiment(I.peG.WebNextNewExplicitApiDescriptionText, "on")) || (null == i ? void 0 : i.checkExperiment(I.peG.WebNextAllowExclamationIcon, "on"))))
                return null;
            let a = (0,
            I.V4d)(e.disclaimers, C.e.DESCRIPTION_TEXT) || []
              , s = [];
            for (let e of a) {
                let i = yield t.getDisclaimerById(e.id);
                i && i.title && s.push(i.title)
            }
            return s
        })
    }));
    (s = l || (l = {}))[s.LIKED = 1] = "LIKED",
    s[s.DISLIKED = -1] = "DISLIKED";
    var D = i(83768);
    (r = d || (d = {})).LIKED = "1",
    r.DISLIKED = "0";
    let R = c.V5.optional(c.V5.map(c.V5.enumeration(Object.values(d))), {})
      , L = c.V5.model("LibraryAllIds", {
        loadingState: c.V5.enumeration(Object.values(b.G)),
        tracks: R,
        albums: R,
        artists: R,
        playlists: R
    }).views(e => ({
        isTrackLiked: t => "1" === e.tracks.get(String(t)),
        isTrackDisliked: t => "0" === e.tracks.get(String(t)),
        isArtistLiked: t => "1" === e.artists.get(String(t)),
        isArtistDisliked: t => "0" === e.artists.get(String(t)),
        isAlbumLiked: t => "1" === e.albums.get(String(t)),
        isPlaylistLiked: t => "1" === e.playlists.get(String(t))
    })).actions(e => {
        let t = {
            setRecords(e, t) {
                if (t) {
                    for (let i in t)
                        if (Object.prototype.hasOwnProperty.call(t, i)) {
                            let a = t[i] === l.LIKED ? "1" : "0";
                            e.set(String(i), a)
                        }
                }
            },
            getData: (0,
            c.ls)(function*() {
                let {libraryResource: i, modelActionsLogger: a} = (0,
                c.dU)(e);
                if (e.loadingState !== b.G.PENDING)
                    try {
                        e.loadingState = b.G.PENDING;
                        let a = yield i.getAllIds({});
                        e.albums.clear(),
                        e.artists.clear(),
                        e.playlists.clear(),
                        e.tracks.clear(),
                        t.setRecords(e.tracks, a.defaultLibrary),
                        t.setRecords(e.albums, a.albums),
                        t.setRecords(e.artists, a.artists),
                        t.setRecords(e.playlists, a.playlists),
                        e.loadingState = b.G.RESOLVE
                    } catch (t) {
                        a.error(t),
                        e.loadingState = b.G.REJECT
                    }
            }),
            toggleTrackLike: (0,
            c.ls)(function*(t) {
                let {usersResource: i, modelActionsLogger: a} = (0,
                c.dU)(e)
                  , s = String(t.entityId)
                  , r = e.tracks.get(s);
                try {
                    let a;
                    let r = {
                        entityId: t.albumId ? "".concat(t.entityId, ":").concat(t.albumId) : t.entityId,
                        userId: t.userId
                    };
                    return "1" === e.tracks.get(s) ? (e.tracks.delete(s),
                    a = yield i.unlikeTrack(r)) : (e.tracks.set(s, "1"),
                    a = yield i.likeTrack(r)),
                    a
                } catch (t) {
                    return r ? e.tracks.set(s, r) : e.tracks.delete(s),
                    a.error(t),
                    D.B.ERROR
                }
            }),
            toggleTrackDislike: (0,
            c.ls)(function*(t) {
                let {usersResource: i, modelActionsLogger: a} = (0,
                c.dU)(e)
                  , s = String(t.entityId)
                  , r = e.tracks.get(s);
                try {
                    let a;
                    let r = {
                        entityId: t.albumId ? "".concat(t.entityId, ":").concat(t.albumId) : t.entityId,
                        userId: t.userId
                    };
                    return "0" === e.tracks.get(s) ? (e.tracks.delete(s),
                    a = yield i.undislikeTrack(r)) : (e.tracks.set(s, "0"),
                    a = yield i.dislikeTrack(r)),
                    a
                } catch (t) {
                    return r ? e.tracks.set(s, r) : e.tracks.delete(s),
                    a.error(t),
                    D.B.ERROR
                }
            }),
            toggleArtistLike: (0,
            c.ls)(function*(t) {
                let {usersResource: i, modelActionsLogger: a} = (0,
                c.dU)(e)
                  , s = String(t.entityId)
                  , r = e.artists.get(s);
                try {
                    let a;
                    return "1" === e.artists.get(s) ? (e.artists.delete(s),
                    a = yield i.unlikeArtist(t)) : (e.artists.set(s, "1"),
                    a = yield i.likeArtist(t)),
                    a
                } catch (t) {
                    return r ? e.artists.set(s, r) : e.artists.delete(s),
                    a.error(t),
                    D.B.ERROR
                }
            }),
            toggleArtistDislike: (0,
            c.ls)(function*(t) {
                let {usersResource: i, modelActionsLogger: a} = (0,
                c.dU)(e)
                  , s = String(t.entityId)
                  , r = e.artists.get(s);
                try {
                    let a;
                    return "0" === e.artists.get(s) ? (e.artists.delete(s),
                    a = yield i.undislikeArtist(t)) : (e.artists.set(s, "0"),
                    a = yield i.dislikeArtist(t)),
                    a
                } catch (t) {
                    return r ? e.artists.set(s, r) : e.artists.delete(s),
                    a.error(t),
                    D.B.ERROR
                }
            }),
            toggleAlbumLike: (0,
            c.ls)(function*(t) {
                let {usersResource: i, modelActionsLogger: a} = (0,
                c.dU)(e)
                  , s = String(t.entityId)
                  , r = e.albums.get(s);
                try {
                    let a;
                    return "1" === e.albums.get(s) ? (e.albums.delete(s),
                    a = yield i.unlikeAlbum(t)) : (e.albums.set(s, "1"),
                    a = yield i.likeAlbum(t)),
                    a
                } catch (t) {
                    return r ? e.albums.set(s, r) : e.albums.delete(s),
                    a.error(t),
                    D.B.ERROR
                }
            }),
            togglePlaylistLike: (0,
            c.ls)(function*(t) {
                let {usersResource: i, modelActionsLogger: a} = (0,
                c.dU)(e)
                  , s = String(t.entityId)
                  , r = e.playlists.get(s);
                try {
                    let a;
                    return "1" === e.playlists.get(s) ? (e.playlists.delete(s),
                    a = yield i.unlikePlaylist(t)) : (e.playlists.set(s, "1"),
                    a = yield i.likePlaylist(t)),
                    a
                } catch (t) {
                    return r ? e.playlists.set(s, r) : e.playlists.delete(s),
                    a.error(t),
                    D.B.ERROR
                }
            })
        };
        return t
    }
    )
      , V = e => e ? {
        revision: e
    } : {
        allValuesRequired: !0
    };
    var x = i(9222);
    (n = u || (u = {})).LIKED = "1",
    n.DISLIKED = "0";
    let O = [x.z.LIKED_ALBUMS, x.z.LIKED_ARTISTS, x.z.LIKED_PLAYLISTS, x.z.LIKED_TRACKS]
      , w = c.V5.optional(c.V5.map(c.V5.enumeration(Object.values(u))), {})
      , G = c.V5.model("LibraryRecord", {
        revision: c.V5.maybeNull(c.V5.number),
        items: w
    })
      , M = c.V5.model("LibrarySync", {
        loadingState: c.V5.enumeration(Object.values(b.G)),
        tracks: G,
        albums: G,
        artists: G,
        playlists: G
    }).views(e => ({
        isTrackLiked: t => "1" === e.tracks.items.get(String(t)),
        isTrackDisliked: t => "0" === e.tracks.items.get(String(t)),
        isArtistLiked: t => "1" === e.artists.items.get(String(t)),
        isArtistDisliked: t => "0" === e.artists.items.get(String(t)),
        isAlbumLiked: t => "1" === e.albums.items.get(String(t)),
        isPlaylistLiked: t => "1" === e.playlists.items.get(String(t))
    })).actions(e => {
        let t = {
            getData: (0,
            c.ls)(function*() {
                let i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : O
                  , {modelActionsLogger: a, collectionResource: s} = (0,
                c.dU)(e);
                if (e.loadingState !== b.G.PENDING)
                    try {
                        e.loadingState = b.G.PENDING;
                        let a = {};
                        i.includes(x.z.LIKED_ALBUMS) && (a.likedAlbums = V(e.albums.revision)),
                        i.includes(x.z.LIKED_ARTISTS) && (a.likedArtists = V(e.artists.revision)),
                        i.includes(x.z.LIKED_TRACKS) && (a.likedTracks = V(e.tracks.revision)),
                        i.includes(x.z.LIKED_PLAYLISTS) && (a.likedPlaylists = {});
                        let r = yield s.sync(a);
                        t.setAlbums(r.values.likedAlbums),
                        t.setArtists(r.values.likedArtists),
                        t.setPlaylists(r.values.likedPlaylists),
                        t.setTracks(r.values.likedTracks),
                        e.loadingState = b.G.RESOLVE
                    } catch (t) {
                        a.error(t),
                        e.loadingState = b.G.REJECT
                    }
            }),
            setArtists: i => {
                (null == i ? void 0 : i.values) && e.artists.revision !== i.info.revision && (t.clearArtists(),
                e.artists.revision = i.info.revision,
                i.values.liked.map(t => {
                    e.artists.items.set(t.artistId.toString(), "1")
                }
                ),
                i.values.disliked.map(t => {
                    e.artists.items.set(t.artistId.toString(), "0")
                }
                ))
            }
            ,
            setAlbums: i => {
                (null == i ? void 0 : i.values) && e.albums.revision !== i.info.revision && (t.clearAlbums(),
                e.albums.revision = i.info.revision,
                i.values.liked.map(t => {
                    e.albums.items.set(t.albumId.toString(), "1")
                }
                ))
            }
            ,
            setPlaylists: i => {
                (null == i ? void 0 : i.values) && (t.clearPlaylists(),
                i.values.liked.map(t => {
                    e.playlists.items.set("".concat(t.compositeData.uid, ":").concat(t.compositeData.kind), "1")
                }
                ))
            }
            ,
            setTracks: i => {
                (null == i ? void 0 : i.values) && e.tracks.revision !== i.info.revision && (t.clearTracks(),
                e.tracks.revision = i.info.revision,
                i.values.liked.map(t => {
                    e.tracks.items.set(t.trackId, "1")
                }
                ),
                i.values.disliked.map(t => {
                    e.tracks.items.set(t.trackId, "0")
                }
                ))
            }
            ,
            clearArtists: () => {
                e.artists.revision = null,
                e.artists.items.clear()
            }
            ,
            clearAlbums: () => {
                e.albums.revision = null,
                e.albums.items.clear()
            }
            ,
            clearPlaylists: () => {
                e.playlists.revision = null,
                e.playlists.items.clear()
            }
            ,
            clearTracks: () => {
                e.tracks.revision = null,
                e.tracks.items.clear()
            }
            ,
            toggleTrackLike: (0,
            c.ls)((()=>{
                function* fn(i) {
                    let {usersResource: a, modelActionsLogger: s} = (0,
                    c.dU)(e)
                      , r = String(i.entityId)
                      , n = e.tracks.items.get(r);
                    try {
                        let s;
                        let n = {
                            entityId: i.albumId ? "".concat(i.entityId, ":").concat(i.albumId) : i.entityId,
                            userId: i.userId
                        };
                        return "1" === e.tracks.items.get(r) ? (e.tracks.items.delete(r),
                        s = yield a.unlikeTrack(n)) : (e.tracks.items.set(r, "1"),
                        s = yield a.likeTrack(n)),
                        t.getData([x.z.LIKED_TRACKS]),
                        s
                    } catch (t) {
                        return n ? e.tracks.items.set(r, n) : e.tracks.items.delete(r),
                        s.error(t),
                        D.B.ERROR
                    }
                }
                DataReady.set("toggleTrackLike", fn);
                return fn;
            })()),
            toggleTrackDislike: (0,
            c.ls)((()=>{
                function* fn (i) {
                    let {usersResource: a, modelActionsLogger: s} = (0,
                    c.dU)(e)
                      , r = String(i.entityId)
                      , n = e.tracks.items.get(r);
                    try {
                        let s;
                        let n = {
                            entityId: i.albumId ? "".concat(i.entityId, ":").concat(i.albumId) : i.entityId,
                            userId: i.userId
                        };
                        return "0" === e.tracks.items.get(r) ? (e.tracks.items.delete(r),
                        s = yield a.undislikeTrack(n)) : (e.tracks.items.set(r, "0"),
                        s = yield a.dislikeTrack(n)),
                        t.getData([x.z.LIKED_TRACKS]),
                        s
                    } catch (t) {
                        return n ? e.tracks.items.set(r, n) : e.tracks.items.delete(r),
                        s.error(t),
                        D.B.ERROR
                    }
                }
                DataReady.set("toggleTrackDislike", fn);
                return fn;
            })()),
            toggleArtistLike: (0,
            c.ls)(function*(i) {
                let {usersResource: a, modelActionsLogger: s} = (0,
                c.dU)(e)
                  , r = String(i.entityId)
                  , n = e.artists.items.get(r);
                try {
                    let s;
                    return "1" === e.artists.items.get(r) ? (e.artists.items.delete(r),
                    s = yield a.unlikeArtist(i)) : (e.artists.items.set(r, "1"),
                    s = yield a.likeArtist(i)),
                    t.getData([x.z.LIKED_ARTISTS]),
                    s
                } catch (t) {
                    return n ? e.artists.items.set(r, n) : e.artists.items.delete(r),
                    s.error(t),
                    D.B.ERROR
                }
            }),
            toggleArtistDislike: (0,
            c.ls)(function*(i) {
                let {usersResource: a, modelActionsLogger: s} = (0,
                c.dU)(e)
                  , r = String(i.entityId)
                  , n = e.artists.items.get(r);
                try {
                    let s;
                    return "0" === e.artists.items.get(r) ? (e.artists.items.delete(r),
                    s = yield a.undislikeArtist(i)) : (e.artists.items.set(r, "0"),
                    s = yield a.dislikeArtist(i)),
                    t.getData([x.z.LIKED_ARTISTS]),
                    s
                } catch (t) {
                    return n ? e.artists.items.set(r, n) : e.artists.items.delete(r),
                    s.error(t),
                    D.B.ERROR
                }
            }),
            toggleAlbumLike: (0, c.ls) (function*(i) {
                let {usersResource: a, modelActionsLogger: s} = (0,
                c.dU)(e)
                  , r = String(i.entityId)
                  , n = e.albums.items.get(r);
                try {
                    let s;
                    return "1" === e.albums.items.get(r) ? (e.albums.items.delete(r),
                    s = yield a.unlikeAlbum(i)) : (e.albums.items.set(r, "1"),
                    s = yield a.likeAlbum(i)),
                    t.getData([x.z.LIKED_ALBUMS]),
                    s
                } catch (t) {
                    return n ? e.albums.items.set(r, n) : e.albums.items.delete(r),
                    s.error(t),
                    D.B.ERROR
                }
            }),
            togglePlaylistLike: (0, c.ls) (function*(i) {
                let {usersResource: a, modelActionsLogger: s} = (0,
                c.dU)(e)
                  , r = String(i.entityId)
                  , n = e.playlists.items.get(r);
                try {
                    let s;
                    return "1" === e.playlists.items.get(r) ? (e.playlists.items.delete(r),
                    s = yield a.unlikePlaylist(i)) : (e.playlists.items.set(r, "1"),
                    s = yield a.likePlaylist(i)),
                    t.getData([x.z.LIKED_PLAYLISTS]),
                    s
                } catch (t) {
                    return n ? e.playlists.items.set(r, n) : e.playlists.items.delete(r),
                    s.error(t),
                    D.B.ERROR
                }
            }),
            // like: (0, c.ls) (function*(i) {
            //     console.log("generator")
            // }),
            // like2: (0, c.ls) (()=>{
            //     function *fn(i) {
            //         console.log("in generator")
            //     }
            //     return fn; 
            // })
        };
        return t
    }
    )
      , j = c.V5.model("LikesCount", {
        likesCount: c.V5.maybe(c.V5.number),
        pendingLikesCount: c.V5.optional(c.V5.number, 0)
    }).views(e => ({
        get actualLikesCount() {
            if ("number" == typeof e.likesCount) {
                var t;
                return e.likesCount + (null !== (t = e.pendingLikesCount) && void 0 !== t ? t : 0)
            }
            return 0
        }
    })).actions(e => ({
        likePending() {
            e.pendingLikesCount += 1
        },
        unlikePending() {
            e.pendingLikesCount -= 1
        }
    }))
      , U = c.V5.model("LoadingState", {
        loadingState: c.V5.enumeration(Object.values(b.G))
    }).views(e => ({
        get isNeededToLoad() {
            return e.loadingState === b.G.IDLE
        },
        get isLoading() {
            return e.loadingState === b.G.PENDING
        },
        get isResolved() {
            return e.loadingState === b.G.RESOLVE
        },
        get isRejected() {
            return e.loadingState === b.G.REJECT
        }
    }))
      , q = c.V5.model("Location", {
        pathname: c.V5.optional(c.V5.string, ""),
        searchParams: c.V5.optional(c.V5.string, ""),
        host: c.V5.optional(c.V5.string, ""),
        tld: c.V5.optional(c.V5.string, ""),
        origin: c.V5.optional(c.V5.string, ""),
        href: c.V5.optional(c.V5.string, "")
    }).actions(e => ({
        setPathname(t) {
            e.pathname = t
        },
        setSearchParams(t) {
            e.searchParams = t
        },
        setHost(t) {
            e.host = t
        },
        setTld(t) {
            e.tld = t
        },
        setOrigin(t) {
            e.origin = t
        },
        setHref(t) {
            e.href = t
        }
    }))
      , F = c.V5.model("ModelDestroyManager").actions( () => ({
        destroyItems(e) {
            e.forEach(e => {
                e && (0,
                c.og)(e)
            }
            ),
            queueMicrotask( () => {
                e.forEach(e => {
                    e && (0,
                    c.ob)(e)
                }
                )
            }
            )
        }
    }))
      , B = c.V5.model("Pager", {
        page: c.V5.number,
        perPage: c.V5.number,
        total: c.V5.number
    });
    var Y = i(50703)
      , W = i(94538)
      , K = i(24642);
    let z = c.V5.model("Settings", {
        layout: c.V5.maybeNull(c.V5.enumeration(Object.keys(Y.t))),
        isLandscape: c.V5.boolean,
        isMobileLandscapeHeight: c.V5.boolean,
        platform: c.V5.maybe(c.V5.enumeration(Object.values(K.t))),
        browserInfo: c.V5.maybe(h),
        liteVersionMode: c.V5.maybe(c.V5.enumeration(Object.values(W.m)))
    }).views(e => {
        let t = {
            get isMobile() {
                return e.layout === Y.t.Mobile
            },
            get isDesktopApplication() {
                return !!e.platform
            },
            get isWindowsApplication() {
                return e.platform === K.t.WINDOWS
            },
            get isMacOSApplication() {
                return e.platform === K.t.MACOS
            },
            get isLinuxApplication() {
                return e.platform === K.t.LINUX
            },
            get isLiteVersionModeEnabled() {
                return e.liteVersionMode === W.m.ENABLED
            },
            get isLiteVersionModeDisabled() {
                return e.liteVersionMode === W.m.DISABLED
            },
            get isLiteVersionModeAvailableForToggle() {
                return t.isLiteVersionModeDisabled || t.isLiteVersionModeEnabled
            }
        };
        return t
    }
    ).actions(e => {
        let t = {
            setLayout(t) {
                e.layout = t
            },
            setPlatform(t) {
                e.platform = t
            },
            setIsLandscape(t) {
                e.isLandscape = t
            },
            setIsMobileLandscapeHeight(t) {
                e.isMobileLandscapeHeight = t
            },
            setBrowserInfo(t) {
                e.browserInfo = (0,
                c.pj)(t)
            },
            initializeLiteVersionMode() {
                if (!(0,
                c.fh)(e))
                    return;
                let {experiments: i} = (0,
                c.yj)(e)
                  , {containerStorage: a} = (0,
                c.dU)(e)
                  , s = a.get(P.B.LiteVersionMode);
                if (s) {
                    if ("2" !== s.version || !i.checkExperiment(S.p.WebNextLiteVersion, "on")) {
                        a.remove(P.B.LiteVersionMode);
                        return
                    }
                    t.setLiteVersionMode(s.mode, !1)
                }
            },
            setLiteVersionMode(t, i) {
                let {containerStorage: a} = (0,
                c.dU)(e);
                e.liteVersionMode = t,
                i && a.set(P.B.LiteVersionMode, {
                    version: "2",
                    mode: t
                })
            }
        };
        return t
    }
    );
    var H = i(24471);
    let J = c.V5.model("Sort", {
        sortBy: c.V5.string,
        sortOrder: c.V5.enumeration(Object.values(H.A))
    })
      , X = c.V5.model("TrackIdModel", {
        id: c.V5.union(c.V5.string, c.V5.number),
        albumId: c.V5.maybe(c.V5.number),
        timestamp: c.V5.maybe(c.V5.string)
    })
}