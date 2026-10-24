import React, { useEffect, useRef, useState } from 'react';
import CloudStage from './CloudStage';
import CloudDoll from './CloudDoll';
import FireworksCanvas from './FireworksCanvas';
import SilenceVeil from './SilenceVeil';
import StarNameReveal from './StarNameReveal';
import { ButterfliesOverlay } from './ButterfliesOverlay';
import { medicalSynth } from '../audio/medicalSynth';

// ==========================================
// CLOUD JOURNEY — sirf USER ki lines, kuch bhi
// extra nahi. 7 clouds = 7 lines. 🦋
// Cloud 6 ke baad 12-SECOND SILENCE (veil) —
// phir Cloud 7 par song. Silence ke dauraan sab
// sound muted, taake andhera sachcha lage.
// ==========================================

const WISH_KEY = 'alisha_cloud5_wish';

export default function CloudJourney({ onProceedToScanner, bestieName = 'Alisha Fiaz' }) {
  const [activeStage, setActiveStage] = useState(0);
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [songStarted, setSongStarted] = useState(false);
  const [silenceOn, setSilenceOn] = useState(false);
  const [silenceDone, setSilenceDone] = useState(false);
  // 💌 Cloud 5: uski apni line (do awaazein — alag style)
  const [wish, setWish] = useState('');
  const [draft, setDraft] = useState('');
  const [editing, setEditing] = useState(false);
  const sentinelRef = useRef(null);
  const silenceRan = useRef(false);
  const muteBeforeSilence = useRef(false);
  const autoFireworksRan = useRef(false);

  // localStorage se uski pehle likhi line wapas laao
  useEffect(() => {
    try {
      const saved = localStorage.getItem(WISH_KEY);
      if (saved) setWish(saved);
    } catch (e) {}
  }, []);

  const submitWish = () => {
    const val = draft.trim();
    if (!val) return;
    setWish(val);
    setEditing(false);
    try { localStorage.setItem(WISH_KEY, val); } catch (e) {}
    medicalSynth.playSparkle();
  };

  const startEditWish = () => {
    setDraft(wish);
    setEditing(true);
    medicalSynth.playCutePop();
  };

  // 🖤 Silence shuru — sound foran band (sync), taake koi sparkle
  // andhera ke saath leak na ho. Sirf ek baar poore journey mein.
  const startSilence = () => {
    if (silenceRan.current) return;
    silenceRan.current = true;
    muteBeforeSilence.current = medicalSynth.isMuted();
    medicalSynth.setMuted(true);
    setSilenceOn(true);
  };

  // ☁️ Cloud 6 padh chuke hone ke baad, Cloud 7 se theek pehle
  // screen ka andhera neeche aata hai.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && activeStage >= 5 && !silenceRan.current) {
            startSilence();
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStage]);

  // 🎵 Veil uthta hi: sound wapas, Cloud 7 par scroll, song shuru
  //   aur 7th cloud aate hi FIREWORKS KHUD-Ba-KHUD 🎉
  const handleSilenceLift = () => {
    medicalSynth.setMuted(muteBeforeSilence.current);
    setSilenceDone(true);
    setSilenceOn(false);
    setTimeout(() => {
      const c7 = document.getElementById('cloud-7');
      if (c7) c7.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 250);
    // 🎆 Cloud 7 nazar aate hi automatic fireworks (koi button nahi)
    if (!autoFireworksRan.current) {
      autoFireworksRan.current = true;
      setTimeout(() => setCelebrationActive(true), 1000);
    }
    if (!songStarted) {
      setSongStarted(true);
      // Pehle naam aasman par likha jaye (~3s), phir music box
      setTimeout(() => medicalSynth.playBirthdaySong(2), 3400);
    }
  };

  // 🎵 Happy Birthday cloud (index 6) par pohachte he song background mein
  const handleCloudLit = (index) => {
    if (index !== 6) return;
    // Bohut tezi se scroll karne wali case: silence phir bhi aayega
    if (!silenceRan.current) {
      startSilence();
      return;
    }
    if (!songStarted && silenceDone) {
      setSongStarted(true);
      setTimeout(() => medicalSynth.playBirthdaySong(2), 600);
    }
  };

  // 🎆 Button: sirf fireworks replay (song chal rahi hai — fanfare stack NAHI)
  const handleGrandFinale = () => {
    setCelebrationActive(true);
    medicalSynth.playSparkle();
  };

  // Sirf aik line dikhane ka simple style
  const Say = ({ children }) => (
    <p className="text-lg sm:text-2xl font-bold leading-relaxed text-pink-50 font-serif">
      {children}
    </p>
  );

  return (
    <div className="relative min-h-screen text-slate-100 font-display overflow-x-hidden selection:bg-pink-500 selection:text-white bg-cloud-sky">
      <ButterfliesOverlay />
      {silenceOn && <SilenceVeil onLift={handleSilenceLift} />}
      <FireworksCanvas active={celebrationActive} onComplete={() => setCelebrationActive(false)} />
      <CloudDoll stage={activeStage} total={7} />

      {/* Header (TelemetryHeader ke neeche) */}
      <header className="fixed top-[72px] inset-x-0 z-30 flex justify-center pointer-events-none">
        <div className="cute-glass rounded-full px-4 sm:px-5 py-2 flex items-center gap-2 sm:gap-3 text-xs font-mono text-pink-200 pointer-events-auto shadow-lg">
          <span className="text-base">🦋</span>
          <span className="px-2 py-0.5 rounded-full bg-pink-500/40 border border-pink-300/50 text-[10px] font-bold text-white whitespace-nowrap">
            DOLL CLOUD {activeStage + 1}/7 PAR HAI 🧚
          </span>
        </div>
      </header>

      <main className="relative z-10">
        {/* CLOUD 1 — WELCOME (Tashreef) */}
        <CloudStage index={0} name="Welcome" meaning="Tashreef" theme="pink" onEnter={setActiveStage} onLit={handleCloudLit}>
          <Say>
            "Tumhy tu yaad hi na... kaahan se kaahan tak aa gaye hain hum, little butterfly 🦋"
          </Say>
        </CloudStage>

        {/* CLOUD 2 — UMEED (Intezaar) */}
        <CloudStage index={1} name="Umeed" meaning="Intezaar" theme="purple" onEnter={setActiveStage} onLit={handleCloudLit}>
          <Say>
            "To phir sab memorize karo... dubbara ✨"
          </Say>
        </CloudStage>

        {/* CLOUD 3 — SHANAKHT (Pehchaan) */}
        <CloudStage index={2} name="Shanakht" meaning="Pehchaan" theme="sky" onEnter={setActiveStage} onLit={handleCloudLit}>
          <Say>
            "Dekh rahi ho na... hum kya the aur kya ban gayi hain 😌"
          </Say>
        </CloudStage>

        {/* CLOUD 4 — MOHAR (Bismillat) */}
        <CloudStage index={3} name="Mohar" meaning="Bismillat" theme="rose" onEnter={setActiveStage} onLit={handleCloudLit}>
          <Say>
            "Kya lagta tha ke yahan tak aa payi hain hum? 🚀"
          </Say>
        </CloudStage>

        {/* CLOUD 5 — IZHAR (Armaan) — yahan WO likhti hai 🖊️ */}
        <CloudStage index={4} name="Izhar" meaning="Armaan" theme="amber" golden={!!wish && !editing} onEnter={setActiveStage} onLit={handleCloudLit}>
          <Say>
            "Meri little butterfly, aaj sirf tumhari baat maani jaayegi... bolo, kya chahiye mujh se 🎁"
          </Say>

          {/* Uski apni line — alag style (white monospace) = uski awaaz */}
          {wish && !editing && (
            <div className="mt-4 text-left">
              <div className="text-[11px] font-mono text-amber-200/90 tracking-wide mb-1">✍️ TUMHARI LINE:</div>
              <p className="font-mono text-white text-base sm:text-lg bg-slate-950/50 border border-amber-300/60 rounded-2xl px-4 py-3 shadow-inner">
                “{wish}”
              </p>
              <button
                onClick={startEditWish}
                className="mt-2 text-[11px] font-mono text-amber-200/80 underline decoration-dotted hover:text-white transition-colors"
              >
                ✏️ kuch badalna hai?
              </button>
            </div>
          )}

          {(!wish || editing) && (
            <form
              onSubmit={(e) => { e.preventDefault(); submitWish(); }}
              className="mt-4 flex flex-col sm:flex-row gap-2 text-left"
            >
              <input
                type="text"
                value={draft}
                onChange={(e) => { setDraft(e.target.value.slice(0, 120)); medicalSynth.playCutePop(); }}
                placeholder="Apni ek line likho…"
                maxLength={120}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950/60 border border-pink-400/50 text-white font-mono text-sm placeholder:text-pink-200/50 focus:outline-none focus:border-amber-300 transition-colors"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-950 font-mono font-bold text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-105 transition-all whitespace-nowrap"
              >
                💌 GOLD KAR DO
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900/80 border border-pink-400/40 text-pink-200 font-mono text-xs hover:text-white transition-colors"
                >
                  cancel
                </button>
              )}
            </form>
          )}
        </CloudStage>

        {/* CLOUD 6 — MANJURI (Kamyabi) */}
        <CloudStage index={5} name="Manjuri" meaning="Kamyabi" theme="violet" onEnter={setActiveStage} onLit={handleCloudLit}>
          <Say>
            "Haan, ab ye bhi nahi hoga ke poori zindagi ke wade kar lo tummm... haahaa 😂"
          </Say>
        </CloudStage>

        {/* 🖤 12-SECOND SILENCE — Cloud 7 se theek pehle ka trigger point */}
        <div ref={sentinelRef} aria-hidden className="h-[70vh]" />

        {/* CLOUD 7 — ANJAM (Happy Birthday — song auto-plays here) */}
        <CloudStage index={6} name="Anjam" meaning="Aakhir (The End)" theme="rainbow" onEnter={setActiveStage} onLit={handleCloudLit}>
          <Say>
            "Aaj tera birthday hai... aur aisa ho sakta hai ke kisi ke paas developer dost ho
            aur usse koi aisa surprise na mile?! 😎"
          </Say>
          {/* 💫 Finale par uski line goonjti hai (uski awaaz = white monospace) */}
          {wish && (
            <p className="mt-3 font-mono text-white/90 text-sm sm:text-base bg-slate-950/40 border border-pink-300/40 rounded-2xl px-4 py-2.5 text-left">
              💫 Aur tumhari wo line — “{wish}” — poori jindagi yaad rahegi.
            </p>
          )}
          {/* ✨ WOW moment: khamoshi ke baad uska naam aasman par */}
          {silenceDone && <StarNameReveal name={bestieName} />}
          <div className="mt-4 p-4 rounded-2xl bg-slate-950/70 border-2 border-pink-400/60 text-center space-y-3">
            <h4 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-purple-300">
              HAPPY BIRTHDAY LITTLE BUTTERFLY 😘
            </h4>
            <button
              onClick={handleGrandFinale}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-mono font-black text-sm tracking-wide transition-all shadow-xl inline-flex items-center gap-2"
            >
              🎉 FIREWORKS CHALAO 🦋💥
            </button>
            {onProceedToScanner && (
              <button
                onClick={() => {
                  medicalSynth.playSparkle();
                  onProceedToScanner();
                }}
                className="block w-full mt-3 px-5 py-2.5 rounded-2xl bg-slate-900/90 border border-pink-500/50 text-pink-200 hover:border-pink-400 hover:text-white font-mono text-xs font-bold tracking-wide transition-all"
              >
                🌌 NEXT: DIL KI TASHREEH (STAGE 3) →
              </button>
            )}
          </div>
        </CloudStage>
      </main>
    </div>
  );
}
