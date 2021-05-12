var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _muted;
class AudioPlayer {
    constructor() {
        _muted.set(this, false);
    }
    mute() {
        __classPrivateFieldSet(this, _muted, true);
    }
    unmute() {
        __classPrivateFieldSet(this, _muted, false);
    }
    play(emitter) {
        if (!__classPrivateFieldGet(this, _muted)) {
            new Audio(`static/${emitter}.m4a`).play();
        }
    }
}
_muted = new WeakMap();
export default AudioPlayer;
