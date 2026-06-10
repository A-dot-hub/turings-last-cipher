export class AudioManager {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.1; // Default low volume
      this.masterGain.connect(this.ctx.destination);
      this.initialized = true;
    }
  }

  playTone(frequency, type, duration, vol = 1) {
    if (!this.initialized || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(vol, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playKeypress() {
    this.playTone(Math.random() * 200 + 400, 'square', 0.05, 0.2);
  }

  playSuccess() {
    this.playTone(800, 'sine', 0.1, 0.5);
    setTimeout(() => this.playTone(1200, 'sine', 0.3, 0.5), 100);
  }

  playError() {
    this.playTone(150, 'sawtooth', 0.3, 0.4);
  }

  startHum() {
    if (!this.initialized || !this.ctx) return;
    // Simple ambient hum
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(60, this.ctx.currentTime);
    
    const gain = this.ctx.createGain();
    gain.gain.value = 0.02;

    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start();
  }
}

export const audioManager = new AudioManager();
