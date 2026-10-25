import React, { useEffect, useRef } from 'react';
import { celebrationSynth } from '../audio/celebrationSynth';

// ==========================================
// STAR NAME REVEAL ✨
// 12-second ki khamoshi ke baad, Cloud 7 par uska
// naam aasman par likha hota hai — har letter ke
// saath ek sur. Ye card ka "WOW" moment hai.
// ==========================================

// Pentatonic chadhhti hui dhun — ek letter, ek sur
const SCALE = [
  523.25, 587.33, 659.25, 698.46, 783.99,
  880.0, 987.77, 1046.5, 1174.66, 1318.51, 1567.98,
];

const HEADROOM = 0.35; // veil uthe kitni der baad pehla letter aaye (seconds)

export default function StarNameReveal({
  name = 'Alisha Fiaz',
  caption = 'sab se pyari Birthday Girl',
  playSound = true,
}) {
  const timers = useRef([]);
  const letters = name.split('');
  const mid = (letters.length - 1) / 2;

  // Center se bahar ki taraf stagger — naam likha ja raha hai
  const letterDelay = (i) => HEADROOM + Math.abs(i - mid) * 0.09;
  const lastLetterAt = Math.max(...letters.map((_, i) => letterDelay(i)));

  useEffect(() => {
    if (!playSound) return;
    let noteIndex = 0;
    letters.forEach((ch, i) => {
      if (ch === ' ') return;
      const freq = SCALE[noteIndex % SCALE.length];
      noteIndex += 1;
      timers.current.push(
        setTimeout(() => celebrationSynth.playBeep(freq, 0.5, 'sine', 0.07), letterDelay(i) * 1000)
      );
    });
    // Naam poora hote he ek chhoti si chime
    timers.current.push(
      setTimeout(() => celebrationSynth.playSparkle(), (lastLetterAt + 0.45) * 1000)
    );
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative mt-5 rounded-[2rem] overflow-hidden border border-pink-400/30 px-3 py-6 sm:px-6 sm:py-9 text-center">
      {/* Raat ka aasman — sitare */}
      <div className="absolute inset-0 bg-cloud-sky pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/[0.07] to-transparent pointer-events-none" />

      {/* Tolti hui sitare */}
      <div className="shooting-star top-[24%] left-0 pointer-events-none" style={{ animationDelay: '0.5s' }} />
      <div className="shooting-star top-[68%] left-0 pointer-events-none" style={{ animationDelay: '2.2s', width: '90px' }} />

      {/* NAAM */}
      <h3 className="name-glow relative z-10 font-serif font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-purple-200 text-[2rem] sm:text-5xl tracking-wide">
        {letters.map((ch, i) =>
          ch === ' ' ? (
            <span key={i} className="inline-block w-3" />
          ) : (
            <span key={i} className="star-letter" style={{ animationDelay: `${letterDelay(i)}s` }}>
              {ch}
            </span>
          )
        )}
      </h3>

      <p
        className="star-letter relative z-10 mt-3 font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-pink-200/85"
        style={{ animationDelay: `${lastLetterAt + 0.3}s` }}
      >
        🦋 {caption} 🦋
      </p>
    </div>
  );
}
