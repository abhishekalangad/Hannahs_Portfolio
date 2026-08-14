/**
 * Web Audio Ambient Soundscape Generator
 * Produces subtle, luxurious harmonic chords with dynamic LFO filter sweep
 */

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private nodes: { osc: OscillatorNode; lfo: OscillatorNode; gain: GainNode; masterGain: GainNode }[] = [];

  public toggle(): boolean {
    if (!this.isRunning) {
      this.start();
      return true;
    } else {
      this.stop();
      return false;
    }
  }

  public start() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // F# Minor 9th chord frequencies
      const freqs = [185.00, 220.00, 277.18, 329.63, 440.00];
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.035, this.ctx.currentTime + 3);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, this.ctx.currentTime);

      masterGain.connect(filter);
      filter.connect(this.ctx.destination);

      this.nodes = freqs.map((freq, idx) => {
        if (!this.ctx) throw new Error('AudioContext missing');
        const osc = this.ctx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const oscGain = this.ctx.createGain();
        oscGain.gain.setValueAtTime(0.25 / freqs.length, this.ctx.currentTime);

        const lfo = this.ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.08 + idx * 0.04, this.ctx.currentTime);
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.setValueAtTime(1.8, this.ctx.currentTime);

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        return { osc, lfo, gain: oscGain, masterGain };
      });

      this.isRunning = true;
    } catch (e) {
      console.warn('AudioContext start error:', e);
    }
  }

  public stop() {
    if (this.nodes.length > 0 && this.ctx) {
      this.nodes.forEach((node) => {
        try {
          node.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + 1.2);
          setTimeout(() => {
            node.osc.stop();
            node.lfo.stop();
          }, 1200);
        } catch {
          // ignore
        }
      });
      this.nodes = [];
    }
    this.isRunning = false;
  }

  public getStatus(): boolean {
    return this.isRunning;
  }
}

export const soundscape = new SoundscapeEngine();
