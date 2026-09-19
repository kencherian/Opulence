/**
 * Web Audio API procedural sound generator for immersive themes
 * Zero network requests, instant playback, customizable volumes
 */

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentType: string | null = null;
  private activeIntervals: number[] = [];
  private activeNodes: AudioNode[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(type: 'forest-wind' | 'ceramic-bells' | 'loom-resonance' | 'chronometer-ticks') {
    this.stop();
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.isPlaying = true;
    this.currentType = type;

    // Smooth fade in
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.22, this.ctx.currentTime + 1.2);

    switch (type) {
      case 'forest-wind':
        this.playWind();
        break;
      case 'ceramic-bells':
        this.playCeramicBells();
        break;
      case 'loom-resonance':
        this.playLoom();
        break;
      case 'chronometer-ticks':
        this.playChronometer();
        break;
    }
  }

  public stop() {
    if (this.activeIntervals.length > 0) {
      this.activeIntervals.forEach(id => window.clearInterval(id));
      this.activeIntervals = [];
    }

    if (this.ctx && this.masterGain && this.isPlaying) {
      try {
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
      } catch {
        // audio ramp error safeguard
      }
    }

    window.setTimeout(() => {
      this.activeNodes.forEach(n => {
        try {
          if ('stop' in n && typeof (n as AudioScheduledSourceNode).stop === 'function') {
            (n as AudioScheduledSourceNode).stop();
          }
          n.disconnect();
        } catch {
          // ignore
        }
      });
      this.activeNodes = [];
    }, 700);

    this.isPlaying = false;
    this.currentType = null;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentType(): string | null {
    return this.currentType;
  }

  private playWind() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    // LFO to simulate gentle gust swell
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noise.connect(filter);
    filter.connect(this.masterGain);

    noise.start();
    lfo.start();

    this.activeNodes.push(noise, filter, lfo, lfoGain);
  }

  private playCeramicBells() {
    if (!this.ctx || !this.masterGain) return;

    // Trigger subtle, soft harmonic bell strikes every 3.5s
    const triggerBell = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const pitches = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5, E5, G5, C6, E6
      const freq = pitches[Math.floor(Math.random() * pitches.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 4.0);
    };

    triggerBell();
    const interval = window.setInterval(triggerBell, 3600);
    this.activeIntervals.push(interval);
  }

  private playLoom() {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 warm drone

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start();
    this.activeNodes.push(osc, filter, gain);
  }

  private playChronometer() {
    if (!this.ctx || !this.masterGain) return;

    let toggle = false;
    const triggerTick = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(toggle ? 1400 : 1200, this.ctx.currentTime);
      toggle = !toggle;

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.07, this.ctx.currentTime + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    };

    triggerTick();
    const interval = window.setInterval(triggerTick, 1000);
    this.activeIntervals.push(interval);
  }
}

export const soundscape = new SoundscapeEngine();
