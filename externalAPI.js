import { DataReady, EXPECTED_DATA, externalAPI } from "./controller.js";
import { initEvents, checkLikeDislike, externalApiOn, externalApiOff, } from "./api-utils.js";
import { State, Toggles, Tracks } from "./extracted-data.js";

if (!window.externalAPI) { window.externalAPI = externalAPI; }

DataReady.ready(generateApi, true, EXPECTED_DATA);

function generateApi () {

    // Check if the number of likes or dislikes on the playlist has changed.
    document.body.onclick = checkLikeDislike;

    externalAPI.on = externalApiOn;
    externalAPI.off = externalApiOff;
// todo replace all fn
    externalAPI.getControls = () => {
        const repeatModes = {
            "none": false,
            "context": true,
            "one": 1
        }
        return {
            dislike: State.index >= 0 ? true : false,
            like: State.index >= 0 ? true : false,
            index: State.index >= 0 ? true : false,
            next: externalAPI.getNextTrack() ? true : false,
            prev: externalAPI.getPrevTrack() ? true : false,
            repeat: repeatModes[State.getRepeat()],
            shuffle: State.getShuffle(),
        }
    }
    externalAPI.getCurrentTrack = () => { return Tracks.current; }
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
                id: ""
            }
        }
        let {
            id: playlistId,
            playlistUuid: link,
            cover,
            owner,
            title,
            type
        } = playlist;
        
        if (type === "vibe") {
            type = "radio";
            playlistId = undefined;
        }

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
    externalAPI.getTrackIndex = () => { return State.index; }
    externalAPI.getTracksList = () => { return Tracks.converted; }
    externalAPI.uploadTracksMeta = Tracks.uploadTracksMeta;

    externalAPI.getVolume = State.getVolume
    externalAPI.isPlaying = State.isPlaying;

    externalAPI.next = Toggles.next;
    externalAPI.play = Toggles.play;
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

    externalAPI.help = () => { }
    externalAPI.navigate = (url) => { }
    externalAPI.populate = (fromIndex, after, before, ordered) => { } // todo

    initEvents();
}