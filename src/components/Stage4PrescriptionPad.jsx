import React, { useState } from 'react';
import { medicalSynth } from '../audio/medicalSynth';

// ==========================================
// SANAD-E-DOSTI 📜 — Stage 4
// Pehle ye "prescription pad" tha. Ab ye dosti ki
// official sanad hai — 4 hukm, ek mohar, ek dastakht.
// Clouds ki Urdu file-zubān (Mohar, Manjuri, Anjam)
// se yahan tak poora card ek hi kahani hai.
// ==========================================

export const Stage4PrescriptionPad = ({ 
  onTriggerCelebration,
  bestieName = 'Alisha Fiaz',
  dateString = 'October 27, 2010'
}) => {
  const [currentDoseIndex, setCurrentDoseIndex] = useState(0);
  const [isDispensing, setIsDispensing] = useState(false);
  const [isStamped, setIsStamped] = useState(false);
  const [showSanadModal, setShowSanadModal] = useState(false);

  // 4 Hukm (clauses) — sirf tumhari lines, koi doctor ki zubaan nahi
  const farmaans = [
    {
      title: 'HUKM-E-AWAL: KHUSHI KA FARMAAN 🎂✨',
      hukm: 'Aaj sirf hasna hai. Jo kehna hai keh do, jo karna hai kar lo — aaj tumhara din hai, tum order chalti ho.',
      muddat: 'Har do ghante baad. Jab tak hanse nahi, tab tak.',
      zamaanat: 'Kabhi khatam nahi hone wala. Zindagi bhar valid.',
      nateeja: 'Muskurahat itni ke sab poochein — "is to kuch to mila hai".',
      ehtaat: 'Aaj udasi allow nahi hai. Kisi ne di to mujhe bata dena.'
    },
    {
      title: 'HUKM-E-DUWOM: BUTTERFLIES IQRAAR 🦋',
      hukm: 'Jahan jana hai wahan jao. Jo pehnna hai pehno. Jo chahiye wo maang lo — aaj sirf tumhari baat maani jaayegi.',
      muddat: 'Aaj ke liye nahi. Hamesha ke liye.',
      zamaanat: 'Girte waqt uthane wala haath har waqt maujood hai.',
      nateeja: 'Aafat level ka confidence. Apni favorite character tum khud.',
      ehtaat: 'Zyada confidence ka asar: sab ki nazar tum par paregi.'
    },
    {
      title: 'HUKM-E-SAYUM: FIKR SE IBRAAT 🧋✈️',
      hukm: 'Saari kitabein band. Apni favorite cheezein order karo. Aaj koi formula nahi, sirf tum aur maza.',
      muddat: 'Poora din — taake raat tak has has ke thak jao.',
      zamaanat: 'Gallery full photos, aur dil full sukoon.',
      nateeja: 'Har photo mein sab se pyari tum hi lagti ho.',
      ehtaat: 'Pabandi sakht hai: exams ka naam lena aaj mana hai.'
    },
    {
      title: 'HUKM-E-CHAHUM: BIRTHDAY GIRL KA TAJ 👑',
      hukm: 'Subah uth kar ye padh lena — ke Alisha Fiaz ke liye bohot bara kuch likha hai.',
      muddat: 'Zindagi bhar. Har saal. Har birthday.',
      zamaanat: 'Mohar lag chuki hai — ye wapas nahi li ja sakti.',
      nateeja: 'Chamak aisi ke poora saal nikalti ho. Iconic.',
      ehtaat: 'Iski koi had nahi hoti — tum alag bane ho.'
    }
  ];

  const handleNextHukm = () => {
    setIsDispensing(true);
    medicalSynth.playPillDispense();

    setTimeout(() => {
      setCurrentDoseIndex((prev) => (prev + 1) % farmaans.length);
      setIsDispensing(false);
    }, 280);
  };

  const handleGrandFinale = () => {
    medicalSynth.playStampSound();
    setIsStamped(true);

    setTimeout(() => {
      medicalSynth.playBirthdayFanfare();
      if (onTriggerCelebration) onTriggerCelebration();
      setShowSanadModal(true);
    }, 350);
  };

  const handlePrint = () => {
    medicalSynth.playSparkle();
    window.print();
  };

  const activeRx = farmaans[currentDoseIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/40 text-pink-300 font-mono text-xs">
          <span>🦋</span>
          <span>SANAD-E-DOSTI // OFFICIAL BIRTHDAY FARMAAN</span>
          <span>📜</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Alisha Fiaz Ki Sanad-e-Dosti 📜
        </h2>
        <p className="text-xs text-pink-200/80 font-mono">
          Hamari official Birthday Girl ke naam. Chaar hukm, ek mohar, aur zindagi bhar ki zamaanat.
        </p>
      </div>

      {/* Main Sanad Paper Card */}
      <div 
        id="printable-sanad"
        className="relative bg-gradient-to-b from-[#1b1228] to-[#120b1c] border-2 border-pink-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl glow-pink overflow-hidden"
      >

        {/* Faint Background Watermark */}
        <div className="absolute right-6 top-1/4 text-pink-500/10 text-9xl font-serif font-black select-none pointer-events-none">
          ۞ 🦋
        </div>

        {/* Letterhead Header */}
        <div className="border-b-2 border-pink-500/30 pb-6 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-purple-500 border border-white/40 flex items-center justify-center text-white font-bold font-mono text-2xl shadow-lg">
              🎂
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-mono text-white uppercase tracking-wide flex items-center gap-2">
                <span>Dosti Ki Registry // Birthday Girl Division</span>
                <span>🦋</span>
              </h3>
              <p className="text-xs font-mono text-pink-400">
                KHASS TOR PAR ALISHA FIAZ KE NAAM • THE BIRTHDAY GIRL
              </p>
              <p className="text-[10px] font-mono text-pink-300/70">
                SANAD #: ALISHA-YAARI-FOREVER • TAREEKH: 27 OCT
              </p>
            </div>
          </div>

          <div className="text-right font-mono text-xs text-pink-300/80">
            <div>BIRTHDAY: <span className="text-white font-bold">27 Oct 🎂</span></div>
            <div>STATUS: <span className="text-pink-400 font-bold">OFFICIAL BIRTHDAY GIRL 💕</span></div>
          </div>
        </div>

        {/* Pehchaan Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-900/90 border border-pink-900/50 font-mono text-xs mb-8 shadow-inner">
          <div>
            <span className="text-pink-300/70 text-[10px] block uppercase">Birthday Girl</span>
            <span className="text-pink-300 font-bold text-sm">Alisha Fiaz 🎂🦋</span>
          </div>
          <div>
            <span className="text-pink-300/70 text-[10px] block uppercase">Pehchaan</span>
            <span className="text-rose-300 font-bold">Hadd se zyada pyari, saaf dil wali</span>
          </div>
          <div>
            <span className="text-pink-300/70 text-[10px] block uppercase">Mustaqbil</span>
            <span className="text-purple-300 font-bold">Bohot bari zindagi, lihaaz se</span>
          </div>
        </div>

        {/* Sanad ka Jism */}
        <div className="space-y-6 relative">
          <div className="flex items-start gap-4">
            <span className="text-5xl sm:text-6xl font-serif font-bold text-pink-400/90 leading-none select-none">
              ۞
            </span>

            <div className="flex-1 space-y-4">
              
              {/* Active Hukm Card */}
              <div className={`p-6 rounded-2xl bg-slate-900/90 border transition-all duration-300 ${
                isDispensing ? 'scale-95 opacity-50' : 'scale-100 opacity-100 border-pink-500/50 glow-pink'
              }`}>
                <div className="flex items-center justify-between gap-2 border-b border-pink-900/60 pb-2.5 mb-3.5">
                  <span className="text-base sm:text-lg font-bold font-mono text-white flex items-center gap-2">
                    <span>📜</span>
                    <span>{activeRx.title}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-pink-500/20 text-pink-300 border border-pink-500/40">
                    HUKM #{currentDoseIndex + 1} / {farmaans.length}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm font-mono text-pink-100 leading-relaxed">
                  <div>
                    <strong className="text-pink-400">FARMAAN:</strong> {activeRx.hukm}
                  </div>
                  <div>
                    <strong className="text-purple-300">MUDDAT:</strong> {activeRx.muddat}
                  </div>
                  <div>
                    <strong className="text-rose-300">ZAMAANAT:</strong> {activeRx.zamaanat}
                  </div>
                  <div>
                    <strong className="text-amber-300">NATEEJA:</strong> {activeRx.nateeja}
                  </div>
                  <div className="text-rose-400 pt-1">
                    <strong>EHTAAT:</strong> {activeRx.ehtaat}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Official Mohar (Grand Finale par lagti hai) */}
          {isStamped && (
            <div className="absolute right-4 bottom-2 -rotate-12 border-4 border-pink-500 rounded-3xl px-6 py-3 font-mono text-center text-pink-300 shadow-2xl glow-pink animate-bounce pointer-events-none bg-slate-950/90">
              <div className="text-[10px] font-bold tracking-widest uppercase">MOHAR-E-DOSTI</div>
              <div className="text-base sm:text-lg font-black tracking-wider">ALISHA FIAZ: PERMANENT BIRTHDAY GIRL</div>
              <div className="text-[10px] flex items-center justify-center gap-1">
                <span>DOSTI SE LIKHI GAYI</span> <span>🦋💖</span>
              </div>
            </div>
          )}

          {/* Dastakht */}
          <div className="pt-8 flex flex-wrap items-end justify-between gap-6 border-t border-pink-900/60 font-mono text-xs">
            <div>
              <p className="text-pink-300/70 text-[10px]">BIRTHDAY GIRL KE NAAM</p>
              <p className="text-pink-200 font-bold">Alisha Fiaz 🎂🦋</p>
            </div>

            <div className="text-right">
              <div className="w-52 border-b-2 border-pink-400/80 mb-1 font-serif italic text-pink-300 text-lg">
                Thommy The Roaster 🔥
              </div>
              <p className="text-pink-300/70 text-[10px]">BEPANAH DOSTI SE MUHURRAR</p>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Controls Bar */}
      <div className="no-print mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleNextHukm}
          className="px-5 py-3 rounded-2xl bg-slate-900/90 border border-pink-500/50 text-pink-200 hover:border-pink-400 hover:text-white font-mono text-xs font-bold tracking-wide transition-all inline-flex items-center gap-2"
        >
          <span>🖋️</span>
          <span>AGLA HUKM DEKHO →</span>
        </button>

        <button
          onClick={handlePrint}
          className="px-5 py-3 rounded-2xl bg-slate-900/90 border border-purple-500/50 text-purple-200 hover:border-purple-400 hover:text-white font-mono text-xs font-bold tracking-wide transition-all inline-flex items-center gap-2"
        >
          <span>🖨️</span>
          <span>SANAD PRINT KARO</span>
        </button>

        <button
          onClick={handleGrandFinale}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-mono font-bold text-xs tracking-widest transition-all shadow-xl hover:shadow-pink-500/30 inline-flex items-center gap-2"
        >
          <span>🎂</span>
          <span>SANAD PAR MOHAR LAGAO 🦋💥</span>
        </button>
      </div>

      {/* Sanad Mukammal Modal */}
      {showSanadModal && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="max-w-lg w-full rounded-3xl p-6 sm:p-8 bg-slate-900/90 border-2 border-pink-500/60 shadow-2xl glow-pink text-center space-y-4">
            
            <div className="text-4xl animate-bounce">🎂🦋🎉</div>

            <h2 className="text-2xl font-black font-mono text-white uppercase tracking-wide">
              Mohar Lag Gayi — Sanad Mukammal!
            </h2>

            <p className="text-xs font-mono text-pink-300 leading-relaxed">
              Chaaron hukm likh diye gaye aur hamesha ke liye valid hai. Ab bas maza karo,
              Alisha Fiaz — ye din tumhara hai! ✨
            </p>

            <div className="p-4 rounded-2xl bg-slate-950/90 border border-pink-500/40 font-mono text-xs text-pink-200">
              <p className="font-serif italic text-sm">
                "Alisha, you bring so much comfort and sunshine into this world.
                So immensely proud of you! ❤️"
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setShowSanadModal(false);
                  setIsStamped(false);
                  setCurrentDoseIndex(0);
                  medicalSynth.playBeep(420, 0.08);
                }}
                className="px-4 py-2 rounded-xl border border-slate-700 text-slate-400 hover:text-pink-200 hover:border-pink-500/60 font-mono text-xs transition-colors"
              >
                SAR-E-AWAL PADHNI HAI 🖋️
              </button>
              <button
                onClick={() => setShowSanadModal(false)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-mono text-xs font-bold tracking-wide hover:from-pink-400 hover:to-purple-500 transition-all shadow-lg"
              >
                JASHN MANAO! 🎂
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
