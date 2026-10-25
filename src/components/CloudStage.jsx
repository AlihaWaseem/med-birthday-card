import React, { useEffect, useRef, useState } from 'react';
import { celebrationSynth } from '../audio/celebrationSynth';

// ==========================================
// CLOUD STAGE — ab YAQEEN wala fluffy badal:
// round bumps upar, side puffs, neeche wale puffs —
// sab mil kar aik silhouette. Doll pohanche to
// cloud colorful hota hai aur us par sab likha aata hai.
// ==========================================
export const CLOUD_THEMES = {
  pink: { puff: 'bg-pink-200', body: 'bg-pink-200', chip: 'bg-pink-500/90 border-pink-100 text-white' },
  purple: { puff: 'bg-purple-200', body: 'bg-purple-200', chip: 'bg-purple-500/90 border-purple-100 text-white' },
  rose: { puff: 'bg-rose-200', body: 'bg-rose-200', chip: 'bg-rose-500/90 border-rose-100 text-white' },
  sky: { puff: 'bg-sky-200', body: 'bg-sky-200', chip: 'bg-sky-500/90 border-sky-100 text-white' },
  amber: { puff: 'bg-amber-100', body: 'bg-amber-100', chip: 'bg-amber-400/95 border-amber-100 text-slate-900' },
  violet: { puff: 'bg-violet-200', body: 'bg-violet-200', chip: 'bg-violet-500/90 border-violet-100 text-white' },
  rainbow: { puff: 'bg-pink-100', body: 'bg-pink-100', chip: 'bg-gradient-to-r from-pink-500 to-purple-500 border-white/70 text-white' },
  gold: { puff: 'bg-amber-200', body: 'bg-amber-200', chip: 'bg-gradient-to-r from-amber-400 to-yellow-300 border-white text-amber-950' },
  dull: { puff: 'bg-slate-600', body: 'bg-slate-600', chip: 'bg-slate-800 border-slate-600 text-slate-400' },
};

export default function CloudStage({ index, name, meaning, theme = 'pink', golden = false, children, onEnter, onLit }) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (onEnter) onEnter(index);
          } else if (entry.intersectionRatio < 0.2) {
            setInView(false);
          }
        });
      },
      { threshold: [0, 0.35, 0.55] }
    );

    const litObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLit(true);
            if (onLit) onLit(index);
            litObserver.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    litObserver.observe(el);
    return () => {
      observer.disconnect();
      litObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Sound jab cloud colorful ho
  useEffect(() => {
    if (lit) celebrationSynth.playSparkle();
  }, [lit]);

  const t = golden ? CLOUD_THEMES.gold : lit ? CLOUD_THEMES[theme] : CLOUD_THEMES.dull;

  return (
    <section
      ref={sectionRef}
      id={`cloud-${index + 1}`}
      className="relative min-h-[105vh] flex items-center justify-center px-4 py-24"
    >
      <div
        className={`relative w-full max-w-2xl transition-all duration-[1200ms] ease-out ${
          lit ? 'cloud-lit scale-100 rotate-0' : 'opacity-70 scale-[0.88] -rotate-1'
        } ${golden ? 'cloud-engrave' : ''}`}
      >
        {/* ---------- CLOUD SILHOUETTE (behind body) ---------- */}
        {/* Upar wale bade bumps */}
        <div className="absolute -top-16 sm:-top-24 inset-x-0 z-0 flex items-end justify-center gap-4 sm:gap-8 pointer-events-none">
          <div className={`w-20 h-20 sm:w-32 sm:h-32 rounded-full ${t.puff} transition-colors duration-1000`} />
          <div className={`w-32 h-32 sm:w-48 sm:h-48 -mb-2 sm:-mb-4 rounded-full ${t.puff} transition-colors duration-1000`} />
          <div className={`w-24 h-24 sm:w-36 sm:h-36 rounded-full ${t.puff} transition-colors duration-1000`} />
        </div>
        {/* Chhota side bump upper-left */}
        <div className={`absolute -top-7 left-4 z-0 w-16 h-16 sm:w-24 sm:h-24 rounded-full ${t.puff} transition-colors duration-1000 pointer-events-none`} />
        {/* Side puffs (cloud ki phooli hui borders) */}
        <div className={`absolute top-[30%] -left-10 sm:-left-14 z-0 w-20 h-20 sm:w-28 sm:h-28 rounded-full ${t.puff} transition-colors duration-1000 pointer-events-none`} />
        <div className={`absolute top-[55%] -right-11 sm:-right-16 z-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full ${t.puff} transition-colors duration-1000 pointer-events-none`} />
        {/* Neeche wale puffs (flat-ish cloud base) */}
        <div className={`absolute -bottom-8 left-[14%] z-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full ${t.puff} transition-colors duration-1000 pointer-events-none`} />
        <div className={`absolute -bottom-10 right-[20%] z-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full ${t.puff} transition-colors duration-1000 pointer-events-none`} />

        {/* ---------- CLOUD BODY (front) ---------- */}
        <div className={`relative z-10 rounded-[3.5rem] sm:rounded-[4.5rem] px-3 py-4 sm:px-5 sm:py-5 transition-colors duration-1000 ${t.body}`}>
          {/* Stage chip: naam + matlab (dono labels) */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-2">
            <span
              className={`px-4 py-1.5 rounded-full border text-[11px] sm:text-sm font-bold tracking-wide shadow transition-all duration-700 ${
                lit ? t.chip : 'bg-slate-800 border-slate-600 text-slate-400'
              }`}
            >
              ☁️ Cloud {index + 1} / 7 — Stage: <span className="uppercase">{name}</span>
            </span>
            <span
              className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono border transition-all duration-700 ${
                lit
                  ? 'bg-white/85 border-white text-slate-800 shadow-sm'
                  : 'bg-slate-800 border-slate-600 text-slate-400'
              }`}
            >
              Matlab: <strong>{meaning}</strong> ✨
            </span>
          </div>

          {/* Content written on the cloud — doll ke aane par khulta hai */}
          <div
            className={`cute-glass rounded-[2.5rem] p-5 sm:p-7 transition-all duration-1000 delay-300 ${
              inView && lit ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            {children}
          </div>

          {/* Locked hint on dull cloud */}
          {!lit && (
            <div className="absolute inset-x-0 -bottom-16 text-center text-xs font-mono text-slate-400/90">
              🔒 Doll abhi is cloud tak pohanchi nahi... scroll karte raho ☁️⬇️
            </div>
          )}
        </div>

        {/* Twinkles jab colorful ho jaye */}
        {lit && (
          <>
            <span className="absolute -top-8 -left-3 text-2xl animate-cute-float z-20">✨</span>
            <span className="absolute -top-14 right-[24%] text-xl animate-cute-float z-20" style={{ animationDelay: '0.7s' }}>🦋</span>
            <span className="absolute top-1/2 -right-7 text-2xl animate-cute-float z-20" style={{ animationDelay: '1.4s' }}>💖</span>
            <span className="absolute -bottom-7 left-[24%] text-xl animate-cute-float z-20" style={{ animationDelay: '2s' }}>⭐</span>
          </>
        )}
      </div>
    </section>
  );
}
