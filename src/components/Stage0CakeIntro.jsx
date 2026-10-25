import React, { useState, useEffect } from 'react';
import { celebrationSynth } from '../audio/celebrationSynth';
import GalaxyHeartIntro from './GalaxyHeartIntro';

// ==========================================
// 🎂 STAGE 0 — CAKE INTRO PAGE
// Loading → Cake Layer 1 → Layer 2 → Layer 3
// → Cream layers → Candles → Candles light 🔥
// → Candle click karo → Login page
// ==========================================

const TOTAL_STEPS = 7; // 0 loading ... 6 lit, 7 ready (hint)

export default function Stage0CakeIntro({ onCandleClick }) {
  const [introDone, setIntroDone] = useState(false);
  const [step, setStep] = useState(0);
  const [litCount, setLitCount] = useState(0);

  // Auto-advance: cake banata jata hai (sirf galaxy-heart intro KE BAAD)
  useEffect(() => {
    if (!introDone) return;
    if (step >= TOTAL_STEPS) return;
    const delays = [1400, 700, 700, 700, 800, 800, 600]; // loading lamba, baaki layers fast
    const t = setTimeout(() => {
      setStep((s) => {
        const next = s + 1;
        if (next === 1 || next === 2 || next === 3) celebrationSynth.playConfettiDispense(); // sponge layers
        else if (next === 4) celebrationSynth.playCutePop(); // cream
        else if (next === 5) celebrationSynth.playBeep(740, 0.1); // candles appear
        else if (next === 6) celebrationSynth.playSparkle(); // candles lit!
        return next;
      });
    }, delays[Math.min(step, delays.length - 1)]);
    return () => clearTimeout(t);
  }, [step, introDone]);

  // Candles ek ek karke jalti hain (step 6 par)
  useEffect(() => {
    if (!introDone) return;
    if (step < 6) return;
    if (litCount >= 5) {
      const done = setTimeout(() => setStep(7), 400);
      return () => clearTimeout(done);
    }
    const t = setTimeout(() => {
      setLitCount((c) => c + 1);
      celebrationSynth.playBeep(880 + litCount * 90, 0.07);
    }, 320);
    return () => clearTimeout(t);
  }, [step, litCount]);

  const handleCandleTap = () => {
    celebrationSynth.playSparkle();
    if (onCandleClick) onCandleClick();
  };

  const show = (minStep) =>
    `transition-all duration-700 ease-out ${
      step >= minStep ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
    }`;

  const candles = [0, 1, 2, 3, 4];

  return (
    <>
      {/* 🌌 Galaxy-heart intro — cake se PEHLAY, ek hi baar */}
      {!introDone && <GalaxyHeartIntro onComplete={() => setIntroDone(true)} />}

      <div className={`min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 relative overflow-hidden ${introDone ? '' : 'hidden'}`}>
      {/* Title */}
      <div className="text-center mb-8 space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-purple-300">
          Alisha Fiaz ka Birthday Cake 🎂
        </h1>
        <p className="text-xs font-mono text-pink-300/80">
          {step === 0 && '⏳ Cake bake ho raha hai... thora intezar...'}
          {step >= 1 && step <= 3 && '🍰 Cake ki layers aa rahi hain...'}
          {step === 4 && '🍦 Cream ki layers set ho rahi hain...'}
          {step === 5 && '🕯️ Candles rakhwe ja rahi hain...'}
          {step === 6 && '🔥 Candles jalayi jaa rahi hain...'}
          {step >= 7 && '✨ Ab candle par CLICK karo!'}
        </p>
      </div>

      {/* Loading bar (step 0) */}
      <div className={`h-1.5 w-56 rounded-full bg-slate-800 overflow-hidden mb-8 transition-opacity duration-500 ${step === 0 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 rounded-full animate-loading-bar" style={{ width: '100%', transformOrigin: 'left' }} />
      </div>

      {/* 🎂 The Cake */}
      <div className="relative flex flex-col items-center select-none">

        {/* Candles */}
        <div className={`flex items-end justify-center gap-4 sm:gap-6 mb-1 ${show(5)}`}>
          {candles.map((i) => {
            const isLit = litCount > i;
            return (
              <div key={i} className="relative flex flex-col items-center">
                {/* Flame */}
                <div
                  className={`absolute -top-6 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                    isLit ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  } ${step >= 7 ? 'cursor-pointer' : ''}`}
                  onClick={step >= 7 ? handleCandleTap : undefined}
                >
                  <div className="cake-flame" />
                  <div className="cake-flame-glow" />
                </div>
                {/* Stick */}
                <div className="w-2 h-10 sm:h-12 rounded-sm candle-stripe shadow-md" />
                {/* Wick */}
                <div className="w-0.5 h-1.5 bg-slate-900 -mt-px rounded" />
              </div>
            );
          })}
        </div>

        {/* Top cream with drips */}
        <div className={`relative z-10 -mb-3 ${show(4)}`}>
          <div className="w-56 sm:w-72 h-7 rounded-full bg-gradient-to-b from-white to-pink-100 shadow-lg" />
          <div className="flex justify-between px-2 -mt-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-5 h-6 sm:h-7 rounded-b-full bg-gradient-to-b from-white to-pink-100 shadow" style={{ transform: `translateY(${i % 2 === 0 ? 4 : 0}px)` }} />
            ))}
          </div>
        </div>

        {/* Layer 3 — rose (top sponge) */}
        <div className={`w-52 sm:w-64 h-12 rounded-xl bg-gradient-to-b from-rose-400 to-rose-500 border-t-4 border-rose-300/70 shadow-lg ${show(3)}`} />

        {/* Middle cream */}
        <div className={`w-56 sm:w-72 h-4 -my-1 z-10 rounded-full bg-gradient-to-b from-pink-100 to-white shadow ${show(4)}`} />

        {/* Layer 2 — purple (middle sponge) */}
        <div className={`w-60 sm:w-72 h-12 sm:h-14 rounded-xl bg-gradient-to-b from-purple-400 to-purple-500 border-t-4 border-purple-300/70 shadow-lg ${show(2)}`} />

        {/* Bottom cream */}
        <div className={`w-64 sm:w-80 h-4 -my-1 z-10 rounded-full bg-gradient-to-b from-pink-100 to-white shadow ${show(4)}`} />

        {/* Layer 1 — pink (bottom sponge) */}
        <div className={`w-64 sm:w-80 h-14 sm:h-16 rounded-xl bg-gradient-to-b from-pink-400 to-pink-500 border-t-4 border-pink-300/70 shadow-xl ${show(1)}`} />

        {/* Plate */}
        <div className="w-80 sm:w-96 h-3 mt-1 rounded-full bg-gradient-to-b from-slate-300/80 to-slate-500/60 shadow-2xl" />
        <div className="w-56 h-2 rounded-full bg-slate-950/50 blur-sm mt-0.5" />

        {/* Sparkles on top when lit */}
        {step >= 7 && (
          <div className="absolute -top-12 inset-x-0 flex justify-center gap-6 text-xl pointer-events-none">
            <span className="animate-cute-float">✨</span>
            <span className="animate-cute-float" style={{ animationDelay: '0.5s' }}>🎂</span>
            <span className="animate-cute-float" style={{ animationDelay: '1s' }}>✨</span>
          </div>
        )}
      </div>

      {/* Candle hint / click zone */}
      <div className={`mt-10 transition-all duration-700 ${step >= 7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <button
          onClick={handleCandleTap}
          className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-mono font-bold text-sm tracking-wide transition-all shadow-xl hover:shadow-pink-500/40 inline-flex items-center gap-2 animate-pulse-slow"
        >
          🕯️ CANDLE BLO DO — DARWAZA KHULO ✨
        </button>
      </div>

      </div>
    </>
  );
}
