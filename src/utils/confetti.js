// ==========================================
// CELEBRATION CONFETTI 🎊 — canvas-confetti
// ka chhota shared helper. Har fireworks
// moment ke saath screen-bhar pastel burst.
// ==========================================
import confetti from 'canvas-confetti';

const PASTELS = ['#F43F5E', '#EC4899', '#F472B6', '#C084FC', '#A855F7', '#FBBF24', '#FFFFFF'];

function sideCannon(angle, originX) {
  confetti({
    particleCount: 45,
    spread: 55,
    startVelocity: 45,
    ticks: 160,
    colors: PASTELS,
    origin: { x: originX, y: 0.7 },
    angle,
    scalar: 1.1,
    zIndex: 60,
    disableForReducedMotion: true,
  });
}

function emojiShapes() {
  return ['🦋', '💖', '🎂']
    .map((text) => {
      try {
        return confetti.shapeFromText({ text, scalar: 2 });
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean);
}

// Do wave: foran side cannons + star burst, phir ~0.6s baad doosri wave
export function fireCelebrationConfetti() {
  if (typeof window === 'undefined') return;

  sideCannon(60, 0);
  sideCannon(120, 1);

  confetti({
    particleCount: 70,
    spread: 360,
    startVelocity: 25,
    ticks: 120,
    colors: PASTELS,
    shapes: ['circle', 'square'],
    scalar: 0.9,
    origin: { x: 0.5, y: 0.45 },
    zIndex: 60,
    disableForReducedMotion: true,
  });

  const shapes = emojiShapes();
  if (shapes.length) {
    confetti({
      particleCount: 18,
      spread: 100,
      startVelocity: 30,
      ticks: 170,
      shapes,
      scalar: 2.2,
      origin: { x: 0.5, y: 0.5 },
      zIndex: 60,
      disableForReducedMotion: true,
    });
  }

  setTimeout(() => {
    sideCannon(65, 0.05);
    sideCannon(115, 0.95);
  }, 620);
}
