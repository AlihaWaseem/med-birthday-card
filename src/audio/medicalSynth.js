// Cute & Lovely Web Audio Synthesizer
// Generates sweet music box tones, fairy sparkles, warm heartbeats, and gentle cute beeps!

let audioCtx = null;
let isMuted = false;
let scannerOscillator = null;
let scannerGainNode = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const medicalSynth = {
  isMuted() {
    return isMuted;
  },

  setMuted(muted) {
    isMuted = muted;
    if (muted && scannerGainNode && audioCtx) {
      try {
        scannerGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      } catch (e) {}
    }
  },

  toggleMute() {
    this.setMuted(!isMuted);
    return isMuted;
  },

  // Sweet gentle heart monitor chime
  playBeep(freq = 660, duration = 0.12, type = 'sine', volume = 0.12) {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  },

  // Cute bubbly pop sound (typing / clicking)
  playCutePop() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  },

  // Warm gentle cardiac 'lub-dub' heart flutter
  playHeartbeat(volume = 0.35) {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Lub
      const o1 = ctx.createOscillator();
      const g1 = ctx.createGain();
      o1.type = 'sine';
      o1.frequency.setValueAtTime(70, now);
      o1.frequency.exponentialRampToValueAtTime(42, now + 0.15);
      g1.gain.setValueAtTime(volume, now);
      g1.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      o1.connect(g1);
      g1.connect(ctx.destination);
      o1.start(now);
      o1.stop(now + 0.16);

      // Dub
      const o2 = ctx.createOscillator();
      const g2 = ctx.createGain();
      o2.type = 'sine';
      o2.frequency.setValueAtTime(84, now + 0.16);
      o2.frequency.exponentialRampToValueAtTime(46, now + 0.32);
      g2.gain.setValueAtTime(volume * 0.7, now + 0.16);
      g2.gain.exponentialRampToValueAtTime(0.001, now + 0.34);
      o2.connect(g2);
      g2.connect(ctx.destination);
      o2.start(now + 0.16);
      o2.stop(now + 0.34);
    } catch (e) {}
  },

  // Magical Sparkle Chime ✨
  playSparkle() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const t = ctx.currentTime + idx * 0.05;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.25);
      });
    } catch (e) {}
  },

  // Cuteness Overload Emergency Alarm
  playCodeBlueSiren(repeats = 3) {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      let t = ctx.currentTime;
      for (let i = 0; i < repeats; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, t);
        osc.frequency.linearRampToValueAtTime(900, t + 0.2);
        osc.frequency.linearRampToValueAtTime(600, t + 0.4);

        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.4);
        t += 0.45;
      }
    } catch (e) {}
  },

  // Cute warm scanning hum
  startXRayHum() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx || scannerOscillator) return;

    try {
      scannerOscillator = ctx.createOscillator();
      scannerGainNode = ctx.createGain();

      scannerOscillator.type = 'sine';
      scannerOscillator.frequency.setValueAtTime(220, ctx.currentTime);

      scannerGainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      scannerGainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.1);

      scannerOscillator.connect(scannerGainNode);
      scannerGainNode.connect(ctx.destination);
      scannerOscillator.start();
    } catch (e) {}
  },

  updateXRayHum(proximity) {
    if (!scannerOscillator || !scannerGainNode || isMuted || !audioCtx) return;
    try {
      const targetFreq = 220 + proximity * 180; // 220Hz to 400Hz (warm gentle melody tone)
      const targetVol = 0.03 + proximity * 0.08;
      scannerOscillator.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.05);
      scannerGainNode.gain.setTargetAtTime(targetVol, audioCtx.currentTime, 0.05);
    } catch (e) {}
  },

  stopXRayHum() {
    if (!scannerGainNode || !audioCtx) return;
    try {
      scannerGainNode.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
      setTimeout(() => {
        if (scannerOscillator) {
          try {
            scannerOscillator.stop();
            scannerOscillator.disconnect();
          } catch (e) {}
          scannerOscillator = null;
        }
      }, 120);
    } catch (e) {
      scannerOscillator = null;
    }
  },

  // Cute Pill Rattling / Love Capsule dispenser
  playPillDispense() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [0, 0.07, 0.14].forEach((delay, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700 + idx * 160, now + delay);
        gain.gain.setValueAtTime(0.1, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.06);
      });
    } catch (e) {}
  },

  // Soft romantic stamp sound
  playStampSound() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.14);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    } catch (e) {}
  },

  // Sweet Music-Box Celebratory Happy Birthday Melody ✨
  playBirthdayFanfare() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const melody = [
        { note: 392.00, dur: 0.28 }, // G4
        { note: 392.00, dur: 0.28 }, // G4
        { note: 440.00, dur: 0.55 }, // A4
        { note: 392.00, dur: 0.55 }, // G4
        { note: 523.25, dur: 0.55 }, // C5
        { note: 493.88, dur: 0.95 }, // B4

        { note: 392.00, dur: 0.28 }, // G4
        { note: 392.00, dur: 0.28 }, // G4
        { note: 440.00, dur: 0.55 }, // A4
        { note: 392.00, dur: 0.55 }, // G4
        { note: 587.33, dur: 0.55 }, // D5
        { note: 523.25, dur: 0.95 }, // C5
      ];

      let t = ctx.currentTime + 0.05;
      melody.forEach((item) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Music box / Celesta bell tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(item.note, t);

        gain.gain.setValueAtTime(0.22, t);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + item.dur - 0.02);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + item.dur);

        t += item.dur;
      });
    } catch (e) {}
  },

  // 🎵 Full Happy Birthday Song (music-box, background loop)
  // 4 phrases of "Happy Birthday to You" — repeats times
  playBirthdaySong(repeats = 2) {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const song = [
        // Hap-py birth-day to you
        { note: 392.00, dur: 0.30 }, { note: 392.00, dur: 0.30 }, { note: 440.00, dur: 0.60 },
        { note: 392.00, dur: 0.60 }, { note: 523.25, dur: 0.60 }, { note: 493.88, dur: 1.00 },
        // Hap-py birth-day to you
        { note: 392.00, dur: 0.30 }, { note: 392.00, dur: 0.30 }, { note: 440.00, dur: 0.60 },
        { note: 392.00, dur: 0.60 }, { note: 587.33, dur: 0.60 }, { note: 523.25, dur: 1.00 },
        // Hap-py birth-day dear Little Butterfly
        { note: 392.00, dur: 0.30 }, { note: 392.00, dur: 0.30 }, { note: 659.25, dur: 0.60 },
        { note: 523.25, dur: 0.60 }, { note: 587.33, dur: 0.60 }, { note: 493.88, dur: 1.00 },
        // Hap-py birth-day to you
        { note: 698.46, dur: 0.30 }, { note: 698.46, dur: 0.30 }, { note: 659.25, dur: 0.60 },
        { note: 523.25, dur: 0.60 }, { note: 587.33, dur: 0.60 }, { note: 523.25, dur: 1.30 },
      ];

      let t = ctx.currentTime + 0.05;
      for (let r = 0; r < repeats; r++) {
        song.forEach((item) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(item.note, t);

          gain.gain.setValueAtTime(0.18, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + item.dur - 0.02);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + item.dur);

          t += item.dur;
        });
        t += 0.7; // soft gap between loops
      }
    } catch (e) {}
  }
};