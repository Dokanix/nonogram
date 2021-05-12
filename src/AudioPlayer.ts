import Emitter from './types/emitters';

class AudioPlayer {
  #muted = false;

  mute() {
    this.#muted = true;
  }

  unmute() {
    this.#muted = false;
  }

  play(emitter: Emitter) {
    if (!this.#muted) {
      new Audio(`static/${emitter}.m4a`).play();
    }
  }
}

export default AudioPlayer;
