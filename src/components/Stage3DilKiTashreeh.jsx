import React, { useState, useRef, useEffect } from 'react';
import { celebrationSynth } from '../audio/celebrationSynth';

export const Stage3DilKiTashreeh = ({ onTriggerCelebration, bestieName = 'Alisha Fiaz' }) => {
  const containerRef = useRef(null);
  const [pos, setPos] = useState({ x: 260, y: 200 });
  const [isScanning, setIsScanning] = useState(false);
  const [scannerMode, setScannerMode] = useState('butterflies');
  const [isZoomed, setIsZoomed] = useState(false);
  const [beamSize, setBeamSize] = useState(150);
  const [hasScannedHeart, setHasScannedHeart] = useState(false);

  const updateScanCoordinates = (clientX, clientY) => {
    const box = containerRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setPos({ x, y });

    const heartX = rect.width * 0.48;
    const heartY = rect.height * 0.44;
    const dist = Math.hypot(x - heartX, y - heartY);
    const maxDist = Math.hypot(rect.width / 2, rect.height / 2);
    const proximity = Math.max(0, 1 - dist / maxDist);

    celebrationSynth.updateGlowHum(proximity);

    if (dist < 80 && !hasScannedHeart) {
      setHasScannedHeart(true);
      celebrationSynth.playSparkle();
    }
  };

  const handleMouseMove = (e) => {
    updateScanCoordinates(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      updateScanCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseEnter = () => {
    setIsScanning(true);
    celebrationSynth.startGlowHum();
  };

  const handleMouseLeave = () => {
    setIsScanning(false);
    celebrationSynth.stopGlowHum();
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'z' || e.key === 'Z') {
        setIsZoomed((prev) => !prev);
        celebrationSynth.playBeep(700, 0.05);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/40 text-pink-300 font-mono text-xs">
          <span>🦋</span>
          <span>SITARON KI FILE // ALISHA FIAZ — DIL KA NAQSHA</span>
          <span>🌌</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Dil Ki Tashreeh 🌌🦋
        </h2>
        <p className="text-xs text-pink-200/80 font-mono">
          Ungli ya cursor sitaron ke naqshay par phirao — jo chhupa hai wo khud ba khud saamne aa jayega ✨
        </p>
      </div>

      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 p-3.5 rounded-2xl bg-slate-900/90 border border-pink-900/50 font-mono text-xs shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-pink-300/80 text-[11px] mr-1">ROSHNI:</span>
          {[
            { id: 'butterflies', label: '🦋 BUTTERFLY GLOW' },
            { id: 'cupid', label: '🌹 ROSE LIGHT' },
            { id: 'fairy', label: '✨ STARDUST' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setScannerMode(m.id);
                celebrationSynth.playCutePop();
              }}
              className={`px-3 py-1 rounded-xl transition-all ${
                scannerMode === m.id
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-pink-200 hover:bg-slate-800'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsZoomed(!isZoomed);
              celebrationSynth.playBeep(isZoomed ? 520 : 780, 0.08);
            }}
            className={`px-3 py-1 rounded-xl border transition-all ${
              isZoomed
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/50'
                : 'text-slate-400 border-slate-700 hover:text-pink-200'
            }`}
          >
            🔭 SITARA ZOOM (Z): {isZoomed ? 'ON (2.5x)' : 'OFF'}
          </button>
          
          <button
            onClick={() => setBeamSize((prev) => (prev >= 190 ? 120 : prev + 35))}
            className="px-3 py-1 rounded-xl border border-slate-700 text-slate-400 hover:text-pink-200"
            title="Roshni ka size badlo"
          >
            ROSHNI: {beamSize}px
          </button>
        </div>
      </div>

      {/* Main Interactive Scanner Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
        className="relative w-full aspect-[4/3] md:aspect-[16/10] max-h-[560px] rounded-3xl overflow-hidden border-2 border-pink-500/40 bg-slate-950 shadow-2xl cursor-none select-none group glow-pink"
      >

        {/* LAYER 1: BASE LAYER */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#130d22] to-[#0a0614] text-pink-300/60 p-4">
          
          <svg className="w-full h-full p-4" viewBox="0 0 600 450" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Bichha hua aasman — chhote sitare */}
            {[
              [60, 90], [110, 200], [85, 330], [170, 60], [200, 390], [300, 55],
              [420, 75], [500, 160], [545, 300], [470, 390], [350, 410], [250, 130],
              [380, 150], [150, 260], [450, 250], [520, 90], [95, 420], [300, 430],
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={i % 4 === 0 ? 2.6 : 1.5}
                fill={i % 3 === 0 ? '#F9A8D4' : '#E9D5FF'}
                opacity={0.55}
                className="animate-pulse"
                style={{ animationDelay: `${(i % 6) * 0.4}s`, animationDuration: '3.2s' }}
              />
            ))}

            {/* Dil ka constellation — patli judne wali lines */}
            <path
              d="M290 230 C270 200 220 200 220 250 C220 290 270 330 290 345 C310 330 360 290 360 250 C360 200 310 200 290 230 Z"
              stroke="#6D3A82"
              strokeWidth="1.5"
              strokeDasharray="4 7"
              opacity="0.9"
            />
            {/* Constellation ke sitare (dil ki outline par) */}
            {[
              [290, 230], [258, 210], [222, 226], [220, 262], [240, 300],
              [268, 325], [290, 345], [312, 325], [340, 300], [358, 262],
              [356, 226], [322, 210],
            ].map(([cx, cy], i) => (
              <g key={`h${i}`}>
                <circle cx={cx} cy={cy} r="5" fill="#F472B6" opacity="0.18" />
                <circle cx={cx} cy={cy} r="2.4" fill="#FBCFE8" />
              </g>
            ))}

            {/* Do chhoti tuki — naqshay ki poochh */}
            <path d="M220 226 L150 175 L110 200" stroke="#4C2C5C" strokeWidth="1.2" strokeDasharray="3 6" />
            <path d="M358 262 L440 300 L470 390" stroke="#4C2C5C" strokeWidth="1.2" strokeDasharray="3 6" />

            {/* Pulsing glowing cute heart */}
            <g className="animate-pulse">
              <path
                d="M290 230 C270 200 220 200 220 250 C220 290 270 330 290 345 C310 330 360 290 360 250 C360 200 310 200 290 230 Z"
                fill="rgba(244, 63, 94, 0.25)"
                stroke="#F43F5E"
                strokeWidth="3"
                filter="drop-shadow(0 0 14px rgba(244, 63, 94, 0.8))"
              />
              <text x="290" y="275" textAnchor="middle" fill="#FFFFFF" fontSize="20">💖</text>
            </g>

            {/* Little Butterflies around Alisha's heart */}
            <text x="210" y="190" fontSize="22" className="animate-cute-float">🦋</text>
            <text x="360" y="210" fontSize="18" className="animate-cute-float" style={{ animationDelay: '1s' }}>🦋</text>
            <text x="240" y="340" fontSize="16" className="animate-cute-float" style={{ animationDelay: '2s' }}>🦋</text>
            <text x="340" y="330" fontSize="20" className="animate-cute-float" style={{ animationDelay: '1.5s' }}>🦋</text>

            {/* Overlays */}
            <text x="30" y="40" fill="#F472B6" fontFamily="monospace" fontSize="11" fontWeight="bold">
              BIRTHDAY GIRL: ALISHA FIAZ // FILE #AF-2026
            </text>
            <text x="30" y="60" fill="#C084FC" fontFamily="monospace" fontSize="10">
              STATUS: OFFICIAL BIRTHDAY GIRL 🎂🦋
            </text>
            <text x="530" y="40" fill="#F43F5E" fontFamily="monospace" fontSize="16" fontWeight="bold">🌌 ✦</text>

            <text x="290" y="375" textAnchor="middle" fill="#FDA4AF" fontFamily="monospace" fontSize="11">
              [DIL KA NAQSHA: 10,000 BUTTERFLIES + 100% GOLD]
            </text>
          </svg>

          {!isScanning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-[2px] transition-opacity">
              <div className="p-5 rounded-3xl bg-slate-900/90 border border-pink-500/50 text-center font-mono space-y-2 shadow-2xl animate-bounce">
                <span className="text-3xl">🦋 🌌</span>
                <p className="text-xs text-pink-300 font-bold">
                  CURSOR / UNGLI DIL KE NAQSHAY PAR PHIRAO!
                </p>
                <p className="text-[10px] text-pink-200/80">
                  Roshni jahan jayegi, wahan chhupa hua asar nazar aayega ✨
                </p>
              </div>
            </div>
          )}
        </div>

        {/* LAYER 2: THE MAGIC REVEAL */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-filter duration-300 ${
            scannerMode === 'cupid'
              ? 'filter saturate-150 hue-rotate-15'
              : scannerMode === 'fairy'
              ? 'filter contrast-125 brightness-110'
              : ''
          }`}
          style={{
            clipPath: `circle(${beamSize}px at ${pos.x}px ${pos.y}px)`,
            transform: isZoomed ? 'scale(1.25)' : 'scale(1)',
            transformOrigin: `${pos.x}px ${pos.y}px`,
            transition: 'clip-path 0.04s ease-out, transform 0.15s ease-out',
          }}
        >
          <div className="w-full h-full bg-gradient-to-tr from-[#2d113d] via-[#431448] to-[#1e0a29] p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
            
            <div className="absolute w-96 h-96 rounded-full bg-pink-500/20 blur-3xl -top-10 -left-10" />
            <div className="absolute w-96 h-96 rounded-full bg-purple-500/20 blur-3xl -bottom-10 -right-10" />

            <div className="relative z-10 space-y-3.5 max-w-md">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/30 border border-pink-300 text-pink-200 font-mono text-xs font-bold shadow-lg">
                <span>🦋 NAQSHA SAAMNE: DIL 100% GOLD KA HAI 💖</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-purple-300">
                HAPPY BIRTHDAY ALISHA FIAZ! 🦋✨
              </h3>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-pink-500/50 text-left font-mono text-xs text-pink-100 shadow-xl space-y-2">
                <div className="text-pink-300 font-bold flex items-center gap-1.5">
                  <span>🌌</span> <span>TASHREEH MEIN KYA NAZAR AAYA:</span>
                </div>
                <div>• Naam: Alisha Fiaz — hamari Birthday Girl 🎂</div>
                <div>• Dil ka maal: 100% khushi, hamsafrat aur garmdosti 💕</div>
                <div>• Asar: uski muskurahat se bura waqt foran khatam 🦋</div>
                <div>• Khaas baat: aage bohot bara kuch likha hai ✨</div>
                <div>• Yaari: pakki, permanent, kisi se nahi tootni 👯‍♀️</div>
              </div>

              <p className="text-xs text-pink-200 font-serif italic">
                "Alisha, you bring so much comfort and sunshine into this world. So immensely proud of you! ❤️"
              </p>
            </div>

          </div>
        </div>

        {/* LAYER 3: CUTE RETICLE */}
        {isScanning && (
          <div
            className="absolute pointer-events-none z-30 -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: `${beamSize * 2}px`,
              height: `${beamSize * 2}px`,
            }}
          >
            <div className="w-full h-full rounded-full border-2 border-pink-400 shadow-[0_0_25px_rgba(244,63,94,0.6)]" />
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-pink-400/50 -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-pink-400/50 -translate-x-1/2" />

            <div className="absolute -top-3 -right-2 text-base animate-bounce">
              🦋
            </div>

            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/90 border border-pink-500/60 text-[9px] font-mono text-pink-300">
              ✦ SITARA #: {Math.round(pos.x)}, {Math.round(pos.y)}
            </div>
          </div>
        )}

      </div>

      {hasScannedHeart && (
        <div className="mt-4 p-4 rounded-2xl bg-pink-950/60 border border-pink-500/60 flex items-center justify-between text-xs font-mono text-pink-200 animate-fadeIn shadow-lg glow-pink">
          <span className="flex items-center gap-2">
            <span className="text-xl">🦋🌌</span>
            <span><strong>NAQSHA MUKAMMAL:</strong> Alisha ka dil sitaron bhara nikla — 100% pakki yaari! 🎂</span>
          </span>
          <span className="text-pink-300 font-bold shrink-0">100% PAKKI ✨</span>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => {
            celebrationSynth.playBirthdayFanfare();
            if (onTriggerCelebration) onTriggerCelebration();
          }}
          className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-mono font-bold text-sm tracking-wide transition-all shadow-xl hover:shadow-pink-500/30 inline-flex items-center gap-2 group"
        >
          <span>JASHN MANAO — MOHAR LAGAO</span>
          <span className="group-hover:translate-x-1 transition-transform">🎂💥</span>
        </button>
      </div>

    </div>
  );
};
