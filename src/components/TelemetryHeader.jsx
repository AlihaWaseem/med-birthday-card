import React, { useState } from 'react';
import { medicalSynth } from '../audio/medicalSynth';

export default function TelemetryHeader({
  stage = 1,
  isAuthenticated = false,
  onStageSelect,
  bestieName = 'Alisha Fiaz'
}) {
  const [muted, setMuted] = useState(medicalSynth.isUserMuted());

  const toggleMute = () => {
    const nowMuted = medicalSynth.toggleUserMuted();
    setMuted(nowMuted);
    if (!nowMuted) medicalSynth.playSparkle();
  };

  const stageLabels = {
    1: '🔐 DARWAZA',
    2: '☁️ SAFAR',
    3: '🌌 TASHREEH',
    4: '📜 SANAD'
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/70 border-b border-pink-500/30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-purple-500 border border-white/40 flex items-center justify-center text-lg shadow-lg glow-pink">
            🎂
          </div>
          <div className="font-mono text-xs leading-tight">
            <div className="text-white font-bold tracking-wide">
              {bestieName.toUpperCase()}'S BIRTHDAY WORLD 🦋
            </div>
            <div className="text-pink-300/80">
              OFFICIAL BIRTHDAY GIRL CELEBRATION • EST. 27 OCT
            </div>
          </div>
        </div>

        {/* Middle: Stage pills */}
        <nav className="flex items-center gap-1.5 font-mono text-[10px]">
          {[1, 2, 3, 4].map((s) => {
            const locked = s > 1 && !isAuthenticated;
            const active = s === stage;
            return (
              <button
                key={s}
                disabled={locked}
                onClick={() => onStageSelect && onStageSelect(s)}
                title={locked ? 'Pehle birthday PIN unlock karo 🔒' : `Stage ${s} kholo 🎂`}
                className={`px-2.5 sm:px-3 py-1.5 rounded-full border transition-all tracking-wide whitespace-nowrap ${
                  active
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent font-bold shadow-lg glow-pink'
                    : locked
                    ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                    : 'border-pink-500/40 text-pink-300 hover:bg-pink-500/15 hover:text-white'
                }`}
              >
                {locked ? '🔒' : ''} {stageLabels[s]}
              </button>
            );
          })}
        </nav>

        {/* Right: Birthday pulse + Mute */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <button
            onClick={toggleMute}
            title={muted ? 'Sound on karo 🔊' : 'Sound off karo 🔇'}
            className={`px-2.5 py-1 rounded-full border transition-all active:scale-95 ${
              muted
                ? 'border-slate-700 bg-slate-800/80 text-slate-400 hover:text-pink-200'
                : 'border-pink-500/50 bg-pink-500/15 text-pink-200 hover:text-white'
            }`}
          >
            {muted ? '🔇 MUTED' : '🔊 SOUND'}
          </button>
          <span className={`px-2 py-1 rounded-full border ${
            isAuthenticated
              ? 'border-pink-500/50 bg-pink-500/15 text-pink-300'
              : 'border-slate-700 text-slate-500'
          }`}>
            {isAuthenticated ? 'BIRTHDAY GIRL MODE: ON 🎂' : 'LOCKED 🔒'}
          </span>
          <span className="px-2 py-1 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 flex items-center gap-1">
            <span className={isAuthenticated ? 'animate-ping-slow' : ''}>🦋</span>
            10,000 BUTTERFLIES
          </span>
        </div>

      </div>
    </header>
  );
}
