import React, { useEffect, useRef, useState } from 'react';
import { medicalSynth } from '../audio/medicalSynth';

// ==========================================
// 🧸🚁 BEAR INTRO — cake se theek PEHLAY
// 2 bht pyare kawaii gubbaray: APNY PAON se chalty
// howay left/right se aate hain → aapas mein hug
// karte hain → hug karte karte helicopter ki fans
// ghoomne lagti hain → oopar urr jate hain → phir
// cake animation start hoti hai.
// ==========================================

// Soft plush pastel palette (extra cute 🥰)
const FUR = '#F6BE93';
const FUR_LIGHT = '#FCDCBF';
const FUR_SHADE = '#EDA97A';
const CREAM = '#FFF6EC';
const INNER = '#FBB6C8';
const BLUSH = '#F98BA6';
const EYE = '#3B2A22';
const NOSE = '#E5889F';
const BLADE_PINK = '#F9A8C5';
const BLADE_MINT = '#A9EACF';
const BLADE_TIP = '#FFF0F6';
const HUB = '#F472B6';
const RIBBON = '#C4B5FD';

// little heart path centred near (0,0)
const HEART = 'M0 5.2 C-3 1.6 -6 -0.6 -6 -3.8 C-6 -6.6 -3 -7.6 0 -4.8 C3 -7.6 6 -6.6 6 -3.8 C6 -0.6 3 1.6 0 5.2 Z';

function TeddyBear({ mirrored = false, spinning = false, walking = false }) {
  return (
    <svg
      width="152"
      height="178"
      viewBox="0 0 120 140"
      fill="none"
      style={{ transform: mirrored ? 'scaleX(-1)' : 'none' }}
      className="drop-shadow-xl"
    >
      <defs>
        <radialGradient id="furG" cx="45%" cy="35%" r="75%">
          <stop offset="0%" stopColor={FUR_LIGHT} />
          <stop offset="100%" stopColor={FUR} />
        </radialGradient>
        <radialGradient id="blushG" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={BLUSH} stopOpacity="0.85" />
          <stop offset="100%" stopColor={BLUSH} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ===== Helicopter rotor — candy pastel petal propeller ===== */}
      <line x1="60" y1="24" x2="60" y2="14" stroke="#F3A6BC" strokeWidth="4" strokeLinecap="round" />
      {spinning && <circle cx="60" cy="12" r="26" fill={BLADE_PINK} opacity="0.16" />}
      <g
        transform="translate(60 12)"
        className={spinning ? 'prop-fast' : 'prop-idle'}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        {[0, 90, 45, -45].map((deg, i) => (
          <g key={i} transform={`rotate(${deg})`}>
            <ellipse cx="14" cy="0" rx="13" ry="6.2" fill={i % 2 === 0 ? BLADE_PINK : BLADE_MINT} />
            <circle cx="25" cy="0" r="3.4" fill={BLADE_TIP} />
          </g>
        ))}
      </g>
      <g transform="translate(60 12)">
        <path d={HEART} fill={HUB} stroke="#fff" strokeWidth="1.3" />
        <circle cx="-2" cy="-2.5" r="1" fill="#fff" opacity="0.9" />
      </g>

      {/* ===== Little round ears w/ pink inside ===== */}
      <circle cx="28" cy="34" r="12" fill="url(#furG)" />
      <circle cx="92" cy="34" r="12" fill="url(#furG)" />
      <circle cx="28" cy="34" r="6.5" fill={INNER} />
      <circle cx="92" cy="34" r="6.5" fill={INNER} />

      {/* lilac bow on one ear */}
      <g transform="translate(21 25)">
        <path d="M0 0 L-7 -4 L-7 4 Z" fill={RIBBON} />
        <path d="M0 0 L7 -4 L7 4 Z" fill={RIBBON} />
        <circle cx="0" cy="0" r="2.4" fill="#A78BFA" />
      </g>

      {/* ===== BIG round chibi head ===== */}
      <circle cx="60" cy="58" r="37" fill="url(#furG)" />
      {/* head shine */}
      <ellipse cx="47" cy="40" rx="12" ry="7" fill="#fff" opacity="0.22" />

      {/* ===== Giant glossy kawaii eyes ===== */}
      <ellipse cx="46" cy="60" rx="8.6" ry="11.6" fill={EYE} />
      <ellipse cx="74" cy="60" rx="8.6" ry="11.6" fill={EYE} />
      <circle cx="42.8" cy="55.5" r="3.8" fill="#fff" />
      <circle cx="70.8" cy="55.5" r="3.8" fill="#fff" />
      <circle cx="49" cy="65" r="1.8" fill="#fff" opacity="0.9" />
      <circle cx="77" cy="65" r="1.8" fill="#fff" opacity="0.9" />

      {/* ===== Soft big blush cheeks ===== */}
      <ellipse cx="29" cy="72" rx="9.5" ry="6" fill="url(#blushG)" />
      <ellipse cx="91" cy="72" rx="9.5" ry="6" fill="url(#blushG)" />

      {/* ===== Tiny pink nose + w-mouth ===== */}
      <g transform="translate(60 64) scale(0.5)">
        <path d={HEART} fill={NOSE} />
      </g>
      <path d="M54 69 q3 4.5 6 0.5 q3 4 6 -0.5" stroke={EYE} strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* ===== Chubby little body ===== */}
      <ellipse cx="60" cy="104" rx="20" ry="18" fill="url(#furG)" />
      <ellipse cx="60" cy="106" rx="11" ry="11" fill={CREAM} />
      <g transform="translate(60 106) scale(0.6)">
        <path d={HEART} fill={HUB} opacity="0.8" />
      </g>

      {/* ===== Legs that STEP (pivot at hips) ===== */}
      <g
        className={walking ? 'leg leg-a' : ''}
        style={{ transformBox: 'view-box', transformOrigin: '52px 114px' }}
      >
        <ellipse cx="51" cy="123" rx="8" ry="6.4" fill={FUR_SHADE} />
        <ellipse cx="51" cy="123.5" rx="4.4" ry="3.4" fill={INNER} />
        {[[47.5, 120], [51, 119], [54.5, 120]].map(([x, y], i) => (
          <circle key={`l${i}`} cx={x} cy={y} r="1.1" fill={INNER} />
        ))}
      </g>
      <g
        className={walking ? 'leg leg-b' : ''}
        style={{ transformBox: 'view-box', transformOrigin: '68px 114px' }}
      >
        <ellipse cx="69" cy="123" rx="8" ry="6.4" fill={FUR_SHADE} />
        <ellipse cx="69" cy="123.5" rx="4.4" ry="3.4" fill={INNER} />
        {[[65.5, 120], [69, 119], [72.5, 120]].map(([x, y], i) => (
          <circle key={`r${i}`} cx={x} cy={y} r="1.1" fill={INNER} />
        ))}
      </g>

      {/* ===== Short arms (open for hug) — swing while walking ===== */}
      <g
        className={walking ? 'arm arm-a' : ''}
        style={{ transformBox: 'view-box', transformOrigin: '44px 98px' }}
        transform="rotate(-42 44 98)"
      >
        <ellipse cx="42" cy="100" rx="6.4" ry="12" fill={FUR_SHADE} />
        <circle cx="42" cy="89" r="5.2" fill={INNER} />
      </g>
      <g
        className={walking ? 'arm arm-b' : ''}
        style={{ transformBox: 'view-box', transformOrigin: '76px 98px' }}
        transform="rotate(42 76 98)"
      >
        <ellipse cx="78" cy="100" rx="6.4" ry="12" fill={FUR_SHADE} />
        <circle cx="78" cy="89" r="5.2" fill={INNER} />
      </g>
    </svg>
  );
}

export default function BearIntro({ onComplete }) {
  // ready → walk → hug → spin → fly
  const [phase, setPhase] = useState('ready');
  const timers = useRef([]);
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    onComplete && onComplete();
  };

  useEffect(() => {
    const at = (ms, fn) => timers.current.push(setTimeout(fn, ms));

    at(250, () => {
      setPhase('walk');
      medicalSynth.playCutePop();
    });
    at(2050, () => {
      setPhase('hug');
      medicalSynth.playBeep(520, 0.12);
    });
    at(2900, () => {
      setPhase('spin');
      medicalSynth.playSparkle();
    });
    at(4000, () => {
      setPhase('fly');
      medicalSynth.playBeep(720, 0.35);
    });
    at(5400, finish);

    return () => timers.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Position logic for each bear
  const bearWrap = (side) => {
    const dir = side === 'left' ? -1 : 1;
    let x = dir * 58;
    let y = '0px';
    let rot = 0;
    let dur = '0.6s';
    let ease = 'ease';

    if (phase === 'ready') {
      x = dir * 62; // off-screen
      dur = '0s';
    } else if (phase === 'walk') {
      x = dir * 132;
      dur = '1.8s';
      ease = 'linear';
    } else if (phase === 'hug' || phase === 'spin') {
      x = dir * 56;
      rot = side === 'left' ? 7 : -7;
      dur = '0.55s';
    } else if (phase === 'fly') {
      x = dir * 56;
      y = '-115vh';
      rot = side === 'left' ? 7 : -7;
      dur = '1.3s';
      ease = 'cubic-bezier(0.5, 0, 0.9, 0.5)';
    }

    const translate =
      phase === 'ready'
        ? `translate(calc(-50% + ${x}vw), -50%)`
        : `translate(calc(-50% + ${x}px), calc(-50% + ${y}))`;

    return {
      transform: `${translate} rotate(${rot}deg)`,
      transition: `transform ${dur} ${ease}`,
    };
  };

  const walking = phase === 'walk';
  const spinning = phase === 'spin' || phase === 'fly';
  const hugging = phase === 'hug' || spinning;

  return (
    <div className="fixed inset-0 z-[70] overflow-hidden flex items-center justify-center bg-bear-sky">
      {/* Twinkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          ['12%', '22%'], ['82%', '18%'], ['70%', '70%'], ['20%', '66%'], ['50%', '12%'],
        ].map(([l, t], i) => (
          <span
            key={i}
            className="absolute text-xl animate-cute-float"
            style={{ left: l, top: t, animationDelay: `${i * 0.4}s` }}
          >
            {['✨', '⭐', '💖', '🌙', '✨'][i]}
          </span>
        ))}
      </div>

      {/* Title */}
      <div className="absolute top-[15%] inset-x-0 text-center pointer-events-none px-4">
        <h2 className="text-lg sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-amber-100 to-purple-200">
          🧸 Do pyare gubbaray apne paon chalte hue aa rahe hain… 🧸
        </h2>
        <p className="mt-1 text-[11px] sm:text-xs font-mono text-pink-200/70">
          {phase === 'fly'
            ? 'Bears helicopter ban kar urr gaye! 🚁💨'
            : hugging
            ? 'Gale mil rahe hain… 🤍'
            : 'Step by step idhar aa rahe hain 👣'}
        </p>
      </div>

      {/* The bears */}
      <div className="relative w-full h-full">
        <div className="absolute top-[50%] left-1/2" style={bearWrap('left')}>
          <div className={walking ? 'bear-bob' : ''}>
            <TeddyBear mirrored={false} spinning={spinning} walking={walking} />
          </div>
        </div>
        <div className="absolute top-[50%] left-1/2" style={bearWrap('right')}>
          <div className={walking ? 'bear-bob' : ''}>
            <TeddyBear mirrored spinning={spinning} walking={walking} />
          </div>
        </div>

        {/* Hug hearts */}
        {hugging && (
          <div className="absolute top-[36%] left-1/2 -translate-x-1/2 pointer-events-none">
            <span className="absolute text-2xl hug-heart" style={{ left: '-8px' }}>💖</span>
            <span className="absolute text-lg hug-heart" style={{ left: '14px', animationDelay: '0.3s' }}>🤍</span>
            <span className="absolute text-xl hug-heart" style={{ left: '-26px', animationDelay: '0.6s' }}>✨</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes propSpin { to { transform: rotate(360deg); } }
        .prop-idle { animation: none; }
        .prop-fast { animation: propSpin 0.12s linear infinite; }

        /* whole bear gently bobs with each step */
        @keyframes bearBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .bear-bob { animation: bearBob 0.45s ease-in-out infinite; }

        /* legs swing front-back pivoting at the hip = real stepping */
        @keyframes legSwing {
          0%   { transform: rotate(18deg); }
          50%  { transform: rotate(-14deg); }
          100% { transform: rotate(18deg); }
        }
        .leg { transform-box: view-box; }
        .leg-a { animation: legSwing 0.45s ease-in-out infinite; }
        .leg-b { animation: legSwing 0.45s ease-in-out infinite; animation-delay: -0.225s; }

        /* arms counter-swing */
        @keyframes armSwing {
          0%   { transform: rotate(-12deg); }
          50%  { transform: rotate(10deg); }
          100% { transform: rotate(-12deg); }
        }
        .arm-a { animation: armSwing 0.45s ease-in-out infinite; }
        .arm-b { animation: armSwing 0.45s ease-in-out infinite; animation-delay: -0.225s; }

        @keyframes hugHeart {
          0% { opacity: 0; transform: translateY(6px) scale(0.6); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-40px) scale(1.1); }
        }
        .hug-heart { animation: hugHeart 1.4s ease-out infinite; }
      `}</style>
    </div>
  );
}
