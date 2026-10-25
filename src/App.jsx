import React, { useState, useEffect } from 'react';
import JourneyHeader from './components/JourneyHeader';
import Stage0CakeIntro from './components/Stage0CakeIntro';
import { Stage1AuthGate } from './components/Stage1AuthGate';
import CloudJourney from './components/CloudJourney';
import { Stage3DilKiTashreeh } from './components/Stage3DilKiTashreeh';
import FireworksCanvas from './components/FireworksCanvas';
import { ButterfliesOverlay } from './components/ButterfliesOverlay';
import { celebrationSynth } from './audio/celebrationSynth';

// ==========================================
// 🎂 ALISHA FIAZ — BIRTHDAY GIRL WORLD
// Stage 0: 🎂 Cake Intro (layers → candles → click)
// Stage 1: 🔐 Darwaza (PIN gate)
// Stage 2: ☁️ Safar — 7 clouds + 12-sec khamoshi + ✨ naam
// Stage 3: 🌌 Dil Ki Tashreeh (sitaron ka naqsha) — yahin card mukammal hota hai + jashn
// ==========================================

export const CONFIG = {
  bestieName: 'Alisha Fiaz',
  birthdayDate: 'October 27, 2010',
};

export default function App() {
  const [stage, setStage] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);

  useEffect(() => {
    // Console easter egg
    console.log('%c🎂 Alisha Fiaz Birthday World — Official Birthday Girl 🦋', 'color:#F472B6; font-size:14px; font-weight:bold;');
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    celebrationSynth.playSparkle();
    setStage(2);
  };

  const handleStageSelect = (s) => {
    if (s > 1 && !isAuthenticated) return;
    celebrationSynth.playBeep(660, 0.06);
    setStage(s);
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-display overflow-x-hidden selection:bg-pink-500 selection:text-white bg-romantic-mesh">
      {/* Cloud journey aur cake stage apne overlays khud manage karte hain */}
      {stage !== 2 && <ButterfliesOverlay />}
      <FireworksCanvas active={celebrationActive} onComplete={() => setCelebrationActive(false)} />

      {stage > 0 && (
        <JourneyHeader
          stage={stage}
          isAuthenticated={isAuthenticated}
          onStageSelect={handleStageSelect}
          bestieName={CONFIG.bestieName}
        />
      )}

      <main className="relative z-10">
        {stage === 0 && (
          <Stage0CakeIntro
            onCandleClick={() => {
              setStage(1);
              celebrationSynth.playBirthdayFanfare();
            }}
          />
        )}

        {stage === 1 && (
          <Stage1AuthGate
            onSuccess={handleAuthSuccess}
            correctPasscode={'2710'}
            bestieName={CONFIG.bestieName}
          />
        )}

        {stage === 2 && (
          <CloudJourney
            onProceedToScanner={() => setStage(3)}
            bestieName={CONFIG.bestieName}
          />
        )}

        {stage === 3 && (
          <Stage3DilKiTashreeh
            onTriggerCelebration={() => setCelebrationActive(true)}
            bestieName={CONFIG.bestieName}
          />
        )}
      </main>
    </div>
  );
}
