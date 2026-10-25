import React from 'react';

// ==========================================
// CELEBRATION END CARD 🎂🔄 — Stage 3 ke
// aakhri fireworks ke baad aati hai. Ek
// pyari si closing card with "Phir se
// shuru" replay button.
// ==========================================

export default function CelebrationEndCard({ onReplay, onStay, bestieName = 'Alisha Fiaz' }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="cute-glass rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-4 border border-pink-500/50 shadow-2xl glow-pink">
        <div className="text-4xl">🎂🦋💖</div>
        <h3 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-purple-300">
          Jashn Mukammal!
        </h3>
        <p className="text-sm font-mono text-pink-100/90 leading-relaxed">
          {bestieName}, ye poora aasman tumhare liye saja tha 🌌 Pasand aaya to dubara bhi dekh lo —
          har baar naya lagega ✨
        </p>

        {/* Buttons — flex wrapper se center (convention) */}
        <div className="flex flex-col items-center justify-center gap-2.5 pt-1">
          <button
            onClick={onReplay}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-mono font-bold text-sm tracking-wide transition-all shadow-xl inline-flex items-center gap-2"
          >
            🔄 PHIR SE SHURU KARO
          </button>
          <button
            onClick={onStay}
            className="px-5 py-2 rounded-2xl bg-slate-900/80 border border-pink-500/50 text-pink-200 hover:border-pink-400 hover:text-white font-mono text-xs font-bold tracking-wide transition-all"
          >
            🌌 Dil Ki Tashreeh Par Ruk Jao
          </button>
        </div>
      </div>
    </div>
  );
}
