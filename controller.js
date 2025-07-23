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
export const EXPECTED_DATA = window.EXPECTED_DATA;
export const DataReady = window.DataReady;

delete window.EXPECTED_DATA;
delete window.DataReady;