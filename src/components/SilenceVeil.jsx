import React, { useEffect, useRef, useState } from 'react';
import { celebrationSynth } from '../audio/celebrationSynth';

// ==========================================
// THE 12-SECOND SILENCE ☁️🖤
// Cloud 6 ke baad, Cloud 7 se theek pehle, poora
// screen band ho jata hai — koi sparkle nahi, koi
// music nahi, koi butterfly nahi. Sirf andhera.
// Phir ek typing indicator, phir ek chhoti si line.
//
// Ye card ka sabse mehnga 12 second hai: khhamoshi
// hi kehti hai ke ab baat gusse wali nahi, sachchi wali hai.
// ==========================================

const WHISPER = '…ek minute. kuch kehna hai.';
const FINAL_LINE = 'Happy birthday.';

// Timeline (ms) — silence is choreographed, not accidental
const T = {
  dark: 1400,      // veil fully black
  whisper: 3000,   // chhota sa whisper fade-in
  whisperOut: 5200, // whisper gayab
  typing: 6000,    // "…typing" dots aate hain
  beat: 8400,      // ek halka sa heartbeat (wohi sabse zaroori awaaz)
  type: 10600,     // line likhni shuru
  lift: 15200,     // veil uthega
};

export default function SilenceVeil({ onLift }) {
  const [phase, setPhase] = useState('fading'); // fading | dark | whisper | typing | line
  const [typed, setTyped] = useState('');
  const [showSkip, setShowSkip] = useState(false);
  const [lifting, setLifting] = useState(false);

  const timers = useRef([]);
  const typeInterval = useRef(null);
  const finished = useRef(false);

  // Scroll lock — veil ke dauraan page hila nahi sakti
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    timers.current.forEach(clearTimeout);
    if (typeInterval.current) clearInterval(typeInterval.current);
    setLifting(true);
    setTimeout(() => onLift && onLift(), 1300);
  };

  useEffect(() => {
    const at = (ms, fn) => timers.current.push(setTimeout(fn, ms));

    at(T.dark, () => setPhase('dark'));
    at(T.whisper, () => setPhase('whisper'));
    at(T.whisperOut, () => setPhase('dark'));
    at(T.typing, () => setPhase('typing'));
    at(T.beat, () => {
      // Silence ke dauraan synth muted hai — ye ek dhakka
      // hi awaaz hai jo nikalne di jaati hai, phir foran khamoshi.
      const wasMuted = celebrationSynth.isMuted();
      celebrationSynth.setMuted(false);
      celebrationSynth.playHeartbeat(0.14);
      setTimeout(() => celebrationSynth.setMuted(wasMuted), 700);
    });
    at(T.type, () => {
      setPhase('line');
      // 🎙️🥰 Pyari soft voice mein "Happy birthday" — black screen ke waqt
      celebrationSynth.speakHappyBirthday('Happy birthday');
      let i = 0;
      typeInterval.current = setInterval(() => {
        i += 1;
        setTyped(FINAL_LINE.slice(0, i));
        if (i >= FINAL_LINE.length) clearInterval(typeInterval.current);
      }, 90);
    });
    at(T.type + FINAL_LINE.length * 90 + 1800, finish);
    at(4200, () => setShowSkip(true)); // thak jaye to uske haath mein control

    return () => {
      timers.current.forEach(clearTimeout);
      if (typeInterval.current) clearInterval(typeInterval.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const veilBg = 'bg-[#05030a]';

  return (
    <div
      className={`fixed inset-0 z-[80] ${veilBg} flex items-center justify-center px-6 transition-opacity duration-[1300ms] ease-out ${
        lifting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Saans leta hua andhera — zinda lagta hai, dead nahi */}
      <div className="absolute inset-0 veil-breathe pointer-events-none" />

      {/* Whisper */}
      <p
        className={`absolute font-serif text-sm sm:text-base tracking-wide text-slate-400/70 transition-all duration-[1100ms] ${
          phase === 'whisper' && !lifting
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2'
        }`}
      >
        {WHISPER}
      </p>

      {/* Typing indicator — 3 dots */}
      <div
        className={`absolute transition-all duration-[900ms] ${
          phase === 'typing' && !lifting ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-end gap-2 px-5 py-3 rounded-full bg-white/[0.04] border border-white/10">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-pink-200/70 typing-dot"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </div>
      </div>

      {/* The line */}
      <p
        className={`relative font-serif text-2xl sm:text-4xl text-white/90 tracking-wide transition-opacity duration-[900ms] ${
          phase === 'line' && !lifting ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {typed}
        {phase === 'line' && typed.length < FINAL_LINE.length && (
          <span className="inline-block w-[2px] h-[1em] ml-1 align-middle bg-white/70 caret-blink" />
        )}
      </p>

      {/* Escape hatch */}
      {showSkip && !lifting && (
        <button
          onClick={finish}
          className="absolute bottom-8 right-6 font-mono text-[10px] tracking-widest text-slate-600 hover:text-slate-300 transition-colors"
        >
          SKIP →
        </button>
      )}
    </div>
  );
}
