import React, { useState, useEffect, useRef } from 'react';
import { celebrationSynth } from '../audio/celebrationSynth';

export const Stage1AuthGate = ({ 
  onSuccess, 
  correctPasscode = '2408',
  onPasscodeChange,
  bestieName = 'Alisha Fiaz'
}) => {
  const [passcode, setPasscode] = useState('');
  const [badgeId, setBadgeId] = useState('AF-BIRTHDAY-2710');
  const [statusMessage, setStatusMessage] = useState('DOSTI KI FILE BAND HAI: APNA BIRTHDAY PIN DALO (DDMM) 🦋');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showCuteOverride, setShowCuteOverride] = useState(false);
  const [cuteLogs, setCuteLogs] = useState([]);
  const [overrideReady, setOverrideReady] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const lastClickRef = useRef(0);

  // Keyboard shortcut listener: Pressing '~' or 'Escape' triggers cute bypass
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        triggerCuteOverride('CHHUPA HUWA KEY (~)');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Multi-click easter egg on cute birthday crest
  const handleLogoClick = () => {
    const now = Date.now();
    if (now - lastClickRef.current > 1200) {
      setClickCount(1);
    } else {
      const nextCount = clickCount + 1;
      setClickCount(nextCount);
      celebrationSynth.playBeep(520 + nextCount * 140, 0.08);

      if (nextCount >= 3) {
        triggerCuteOverride('TIN DAFE BUTTERFLY TAP');
      }
    }
    lastClickRef.current = now;
  };

  const triggerCuteOverride = (reason) => {
    celebrationSynth.playSparkle();
    setShowCuteOverride(true);
    const logs = [
      `🚨 ALERT: itni pyaari ke system ne kaam chhor diya! (${reason})`,
      `🦋 10,000 butterflies Alisha ke naam register ho rahi hain...`,
      `🌌 Pehchaan: Alisha Fiaz — khatarnak hadd tak pyari aur zabardast.`,
      `👑 Faisla: saal ki Official Birthday Girl — mohar lag gayi.`,
      `📜 Alisha ki khaas file khol di gayi — andar aao, Queen!`
    ];

    logs.forEach((log, idx) => {
      setTimeout(() => {
        setCuteLogs((prev) => [...prev, log]);
        celebrationSynth.playCutePop();
      }, idx * 280);
    });

    // Ab auto-advance NAHI — user ke click ka intezar hoga taake sab parh sakein ✨
    setTimeout(() => {
      setOverrideReady(true);
    }, logs.length * 280 + 300);
  };

  const handleOverrideClick = () => {
    if (!overrideReady) return;
    setOverrideReady(false);
    celebrationSynth.playSparkle();
    onSuccess();
  };

  const handleInputChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPasscode(val);
    celebrationSynth.playCutePop();
    if (onPasscodeChange) onPasscodeChange(val);

    if (e.target.value.toLowerCase().includes('blue') || e.target.value.toLowerCase().includes('love') || e.target.value.toLowerCase().includes('alisha')) {
      triggerCuteOverride('JADOII LAFZ BOL DIYE');
      return;
    }

    if (val.length === 4) {
      validateCode(val);
    }
  };

  const validateCode = (codeToTest) => {
    setIsSubmitting(true);
    celebrationSynth.playBeep(880, 0.1);

    setTimeout(() => {
      if (codeToTest === correctPasscode || codeToTest === '1234' || codeToTest === '0000') {
        setStatusMessage('FILE KHUL GAYI: WELCOME ALISHA FIAZ! 🦋✨');
        setIsError(false);
        celebrationSynth.playSparkle();
        setTimeout(() => onSuccess(), 400);
      } else {
        setIsError(true);
        setStatusMessage('OOPS! WRONG PIN 💔 HINT: HER BIRTHDAY (DDMM)');
        celebrationSynth.playBeep(320, 0.2);
        setIsSubmitting(false);
      }
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passcode.length > 0) {
      validateCode(passcode);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 relative">
      <div className="w-full max-w-lg relative z-10">
        
        {/* Cute Override Modal */}
        {showCuteOverride && (
          <div
            onClick={handleOverrideClick}
            className={`absolute inset-0 bg-slate-950/95 backdrop-blur-2xl border-2 border-pink-500 rounded-3xl p-6 z-50 flex flex-col justify-between font-mono text-pink-300 shadow-2xl glow-pink transition-all ${
              overrideReady ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-pink-900/60">
              <div className="flex items-center gap-2">
                <span className="text-xl animate-spin">💖</span>
                <span className="text-xs font-bold uppercase tracking-wider text-pink-200">
                  ALISHA FIAZ — MAGIC DARWAZA
                </span>
              </div>
              <span className="text-xs">🦋🌌✨</span>
            </div>

            <div className="my-4 space-y-2 text-xs overflow-y-auto max-h-60 leading-relaxed">
              {cuteLogs.map((log, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-pink-950/40 border border-pink-800/40 flex items-center gap-2 text-pink-200">
                  <span>✨</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-pink-300 border-t border-pink-900/40 pt-2 flex items-center justify-between">
              <span>CLEARANCE: SIRF BESTIE KE LIYE 🦋</span>
              {overrideReady ? (
                <span className="animate-pulse font-bold text-pink-400">
                  👆 JAB PARH LO — YAHIN CLICK KARO, AAGE CHALO ✨
                </span>
              ) : (
                <span className="animate-pulse font-bold text-pink-400">LOADING... 🎂</span>
              )}
            </div>
          </div>
        )}

        {/* Cute Login Card */}
        <div className={`cute-glass rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300 ${
          isError ? 'border-rose-500/80 glow-pink' : 'glow-pink'
        }`}>
          
          {/* Header & Clickable Heart Crest */}
          <div className="text-center space-y-3 mb-8">
            <div 
              onClick={handleLogoClick}
              title="Click 3 times for magic override!"
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-pink-600 via-rose-500 to-purple-500 border-2 border-white/40 shadow-xl cursor-pointer hover:scale-110 active:scale-95 transition-all select-none group relative"
            >
              <span className="text-4xl group-hover:scale-125 transition-transform">🦋</span>
              <span className="absolute -bottom-2 -right-2 text-xl animate-bounce">✨</span>
              {clickCount > 0 && clickCount < 3 && (
                <span className="absolute -top-2 px-2 py-0.5 rounded-full bg-white text-pink-600 text-[10px] font-mono font-bold shadow-md">
                  {clickCount}/3 ✨
                </span>
              )}
            </div>

            <div>
              <span className="text-[11px] font-mono tracking-widest text-pink-400 font-bold uppercase block">
                DOSTI KI REGISTRY // BIRTHDAY GIRL FILE 🦋
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Alisha Fiaz's VIP Portal
              </h1>
              <p className="text-xs text-pink-200/80 mt-1 font-mono">
                Dedicated to our one & only Birthday Girl ✨
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Birthday Girl Badge */}
            <div>
              <label className="block text-xs font-mono text-pink-300 uppercase mb-1.5 flex items-center justify-between">
                <span>Birthday Girl ID</span>
                <span className="text-[10px] text-pink-400">OFFICIAL BIRTHDAY GIRL 🎂</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={badgeId}
                  onChange={(e) => setBadgeId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-pink-900/50 text-pink-200 font-mono text-sm focus:outline-none focus:border-pink-500 transition-colors"
                />
                <span className="absolute right-3 top-2.5 text-xs text-pink-400 font-mono">💖 VERIFIED</span>
              </div>
            </div>

            {/* Passcode (Birthday in DDMM) */}
            <div>
              <label className="block text-xs font-mono text-pink-300 uppercase mb-1.5 flex items-center justify-between">
                <span>Secret Birthday PIN (DDMM)</span>
                <span className="text-[10px] text-pink-300/80">ALISHA'S BIRTHDAY 🦋</span>
              </label>
              <input
                type="password"
                maxLength={4}
                value={passcode}
                onChange={handleInputChange}
                placeholder="• • • •"
                autoFocus
                className={`w-full px-4 py-3 text-center tracking-[1em] text-2xl rounded-xl bg-slate-900/90 border font-mono transition-all focus:outline-none ${
                  isError 
                    ? 'border-rose-500 text-rose-300' 
                    : 'border-pink-500/50 text-pink-300 focus:border-pink-400 shadow-inner'
                }`}
              />
            </div>

            {/* Live Status Message */}
            <div className={`p-3 rounded-xl text-xs font-mono border text-center transition-all ${
              isError 
                ? 'bg-rose-950/60 border-rose-800 text-rose-300' 
                : 'bg-pink-950/40 border-pink-800/60 text-pink-300'
            }`}>
              {statusMessage}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || passcode.length === 0}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin">💓</span>
                  <span>FILE CHECK HO RAHI HAI...</span>
                </>
              ) : (
                <>
                  <span>UNLOCK ALISHA'S SPECIAL CELEBRATION</span>
                  <span className="group-hover:translate-x-1 transition-transform">🦋 →</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Hints */}
          <div className="mt-6 pt-4 border-t border-pink-900/40 flex items-center justify-between text-[11px] font-mono text-pink-300/80">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="hover:text-pink-200 transition-colors underline decoration-dotted"
            >
              {showHint ? 'Hide Cute Hint' : 'Need a Hint? 💡'}
            </button>

            <span className="flex items-center gap-1 text-pink-400">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-pink-200 border border-pink-900/60">~</kbd>
              <span>for Magic Bypass 🪄</span>
            </span>
          </div>

          {showHint && (
            <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-pink-500/40 text-xs font-mono text-pink-200 animate-fadeIn space-y-1">
              <div>💡 <strong>Cute Hint:</strong> The PIN is Alisha's birthday in DDMM format!</div>
              <div>✨ You can also tap the birthday emblem above 3 times for instant magic access!</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
