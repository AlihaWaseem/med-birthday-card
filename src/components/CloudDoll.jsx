import React, { useEffect, useRef, useState } from 'react';

// ==========================================
// CLOUD DOLL — choti si pyari doll jo scroll
// karne par aik cloud se doosre cloud jump karti hai
// ==========================================
export default function CloudDoll({ stage, total = 7 }) {
  const [jumpKey, setJumpKey] = useState(0);
  const prevStage = useRef(stage);

  useEffect(() => {
    if (prevStage.current !== stage) {
      setJumpKey((k) => k + 1);
      prevStage.current = stage;
    }
  }, [stage]);

  // Doll travels down the left sky rail: stage 0 -> ~12%, last stage -> ~76%
  const topPct = 12 + (stage / Math.max(1, total - 1)) * 64;

  return (
    <div
      className="fixed z-40 pointer-events-none left-[0.5%] md:left-[2.5%]"
      style={{
        top: `${topPct}%`,
        transition: 'top 0.9s cubic-bezier(0.22, 1.4, 0.36, 1)',
      }}
      aria-hidden="true"
    >
      {/* Dotted trail behind the doll */}
      <div className="absolute left-[30px] top-[84px] w-0.5 h-24 bg-gradient-to-b from-pink-300/70 to-transparent rounded-full" />

      {/* Mobile par choti doll, desktop par full size */}
      <div key={jumpKey} className={`origin-top-left scale-[0.55] sm:scale-[0.72] md:scale-100 ${jumpKey > 0 ? 'doll-jump' : 'doll-idle'}`}>
        <svg width="64" height="84" viewBox="0 0 64 84" fill="none">
          {/* Glow under doll */}
          <ellipse cx="32" cy="80" rx="16" ry="3.5" fill="rgba(244,114,182,0.35)" />

          {/* Hair back */}
          <circle cx="32" cy="24" r="15" fill="#3b2437" />
          {/* Side buns */}
          <circle cx="15" cy="22" r="6" fill="#4a2c44" />
          <circle cx="49" cy="22" r="6" fill="#4a2c44" />
          <circle cx="15" cy="22" r="2.4" fill="#f9a8d4" />
          <circle cx="49" cy="22" r="2.4" fill="#f9a8d4" />

          {/* Face */}
          <circle cx="32" cy="26" r="12.5" fill="#ffe4ec" />

          {/* Crown */}
          <path d="M25 11 L28.5 15 L32 9.5 L35.5 15 L39 11 L37.5 16.5 L26.5 16.5 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="0.8" />

          {/* Eyes + lashes */}
          <circle cx="27.5" cy="26" r="1.9" fill="#2d1128" />
          <circle cx="36.5" cy="26" r="1.9" fill="#2d1128" />
          <path d="M25.2 23.4 Q27.5 22 29.8 23.4" stroke="#2d1128" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M34.2 23.4 Q36.5 22 38.8 23.4" stroke="#2d1128" strokeWidth="1" fill="none" strokeLinecap="round" />

          {/* Blush */}
          <circle cx="24.5" cy="30" r="2.2" fill="#fda4af" opacity="0.8" />
          <circle cx="39.5" cy="30" r="2.2" fill="#fda4af" opacity="0.8" />

          {/* Smile */}
          <path d="M29 31.5 Q32 34.5 35 31.5" stroke="#e11d48" strokeWidth="1.4" fill="none" strokeLinecap="round" />

          {/* Dress */}
          <path d="M32 40 L18 64 Q32 70 46 64 L32 40 Z" fill="url(#dollDress)" stroke="#f472b6" strokeWidth="1" />
          {/* Arms */}
          <circle cx="20" cy="48" r="3" fill="#ffe4ec" />
          <circle cx="44" cy="48" r="3" fill="#ffe4ec" />
          {/* Legs + shoes */}
          <rect x="27" y="66" width="3" height="8" rx="1.5" fill="#ffe4ec" />
          <rect x="34" y="66" width="3" height="8" rx="1.5" fill="#ffe4ec" />
          <circle cx="28.5" cy="75" r="2.6" fill="#e11d48" />
          <circle cx="35.5" cy="75" r="2.6" fill="#e11d48" />

          {/* Bow on dress */}
          <path d="M32 45 L28 42.5 L28 47.5 Z" fill="#fbcfe8" />
          <path d="M32 45 L36 42.5 L36 47.5 Z" fill="#fbcfe8" />
          <circle cx="32" cy="45" r="1.6" fill="#f472b6" />

          <defs>
            <linearGradient id="dollDress" x1="18" y1="40" x2="46" y2="70" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f472b6" />
              <stop offset="1" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </svg>
        {/* Sparkle floating beside doll */}
        <span className="absolute -top-2 -right-3 text-sm animate-bounce">✨</span>
      </div>
    </div>
  );
}
