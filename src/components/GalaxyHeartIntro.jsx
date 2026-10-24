import React, { useEffect, useRef, useState } from 'react';
import { medicalSynth } from '../audio/medicalSynth';

// ==========================================
// 🌌 GALAXY HEART INTRO — bears ki jagah (Stage 0 se pehle)
// Ek galaxy screen. Jahar click karo, sitaron ke particles
// usi jagah se firework ki tarahoot kar ke ek dil (heart)
// bana lein, aur center mein "my love" ubhar aata hai.
// ==========================================

const STAR_COLORS = ['#F472B6', '#FB7185', '#C084FC', '#A855F7', '#FDE68A', '#F9A8D4', '#FFFFFF'];

// Polygon ka area centroid — dil ke asal motte/beech hissay ka point
function polygonCentroid(pts) {
  let A = 0, gx = 0, gy = 0;
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[i];
    const p1 = pts[(i + 1) % pts.length];
    const cross = p0.x * p1.y - p1.x * p0.y;
    A += cross;
    gx += (p0.x + p1.x) * cross;
    gy += (p0.y + p1.y) * cross;
  }
  A *= 0.5;
  if (Math.abs(A) < 1e-6) return { x: pts[0].x, y: pts[0].y };
  return { x: gx / (6 * A), y: gy / (6 * A) };
}

// Screen par fit hone wale heart shape ke target points (outline + inner fill)
function buildHeartTargets(w, h) {
  const cx = w / 2;
  const cy = h * 0.44;

  // Raw parametric heart
  const raw = [];
  const STEPS = 220;
  for (let i = 0; i < STEPS; i++) {
    const t = (i / STEPS) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    raw.push({ x, y });
  }

  // Bounds (raw coordinate system: y up)
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  raw.forEach((p) => {
    minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
  });
  const rawCX = (minX + maxX) / 2;
  const rawCY = (minY + maxY) / 2;

  const heartH = Math.min(h * 0.46, w * 0.6);
  const scale = Math.min(heartH / (maxY - minY), (w * 0.8) / (maxX - minX));

  const map = (rx, ry) => ({
    x: cx + (rx - rawCX) * scale,
    y: cy - (ry - rawCY) * scale, // flip y (canvas y neeche)
  });

  const targets = [];
  const outer = [];
  // Sirf EK dil — bold outline do qareeb rings se (koi inner fill nahi, kam particles)
  [[1.0, 92], [0.9, 80]].forEach(([rf, n], ri) => {
    for (let i = 0; i < n; i++) {
      const t = (i / n) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3) * rf;
      const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * rf;
      const p = map(x, y);
      targets.push(p);
      if (ri === 0) outer.push(p);
    }
  });

  // "my love" dil ke AREA centroid par — bounding-box center se upar, asal beech mein
  const c = polygonCentroid(outer);
  const textSize = Math.max(26, Math.min(92, Math.round(scale * 6)));

  return { targets, textX: c.x, textY: c.y, textSize };
}

export default function GalaxyHeartIntro({ onComplete }) {
  const canvasRef = useRef(null);
  const [assembled, setAssembled] = useState(false);
  const [clicked, setClicked] = useState(false);

  // refs taake RAF loop ko fresh values milte rahein bina effect restart
  const st = useRef({
    clicked: false,
    assembled: false,
    particles: [],
    startT: 0,
    w: 0,
    h: 0,
    bgStars: [],
    raf: 0,
    cx: 0,
    cy: 0,
    textX: 0,
    textY: 0,
    textSize: 0,
    assembleT: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      st.current.w = w;
      st.current.h = h;
      st.current.cx = w / 2;
      st.current.cy = h * 0.44;
      // background twinkling stars
      const count = Math.round((w * h) / 6500);
      st.current.bgStars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        tw: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.02 + 0.008,
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    const drawStarGlow = (x, y, size, color, alpha) => {
      ctx.globalAlpha = alpha * 0.25;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size * 1.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      // chhota sparkle cross
      ctx.globalAlpha = alpha * 0.6;
      ctx.strokeStyle = color;
      ctx.lineWidth = size * 0.35;
      ctx.beginPath();
      ctx.moveTo(x - size * 1.5, y); ctx.lineTo(x + size * 1.5, y);
      ctx.moveTo(x, y - size * 1.5); ctx.lineTo(x, y + size * 1.5);
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const easeOutQuad = (p) => 1 - (1 - p) * (1 - p);
    const easeInOutCubic = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

    const loop = () => {
      const s = st.current;
      const now = performance.now();
      ctx.clearRect(0, 0, s.w, s.h);

      // 1) background twinkle
      for (const bg of s.bgStars) {
        bg.tw += bg.sp;
        const a = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(bg.tw));
        ctx.globalAlpha = a;
        ctx.fillStyle = '#E9D5FF';
        ctx.beginPath();
        ctx.arc(bg.x, bg.y, bg.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // 2) heart particles
      if (s.clicked) {
        const pulse = s.assembled ? 1 + 0.03 * Math.sin(now / 520) : 1;
        for (const p of s.particles) {
          const lt = now - s.startT - p.delay;
          let prog = Math.max(0, Math.min(1, lt / p.dur));
          const t1 = 0.32;
          let x, y;
          if (prog <= t1) {
            const k = easeOutQuad(prog / t1);
            x = p.sx + (p.scx - p.sx) * k;
            y = p.sy + (p.scy - p.sy) * k;
          } else {
            const k = easeInOutCubic((prog - t1) / (1 - t1));
            const etx = s.cx + (p.tx - s.cx) * pulse;
            const ety = s.cy + (p.ty - s.cy) * pulse;
            x = p.scx + (etx - p.scx) * k;
            y = p.scy + (ety - p.scy) * k;
          }
          p.tw += 0.05;
          const tw = 0.7 + 0.3 * Math.sin(p.tw);
          drawStarGlow(x, y, p.size, p.color, prog * tw);
        }

        // assembly complete?
        if (!s.assembled && now - s.startT > 2400) {
          s.assembled = true;
          s.assembleT = now;
          setAssembled(true);
        }

        // 3) "my love" — canvas par hi heart ke centroid par draw (exact align)
        if (s.assembled) {
          const a = Math.min(1, (now - s.assembleT) / 900);
          const pulseScale = 1 + 0.03 * Math.sin(now / 520);
          ctx.save();
          ctx.globalAlpha = a;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = `700 ${s.textSize}px "Segoe Script", "Brush Script MT", "Comic Sans MS", cursive`;
          ctx.shadowColor = 'rgba(244,114,182,0.9)';
          ctx.shadowBlur = s.textSize * 0.6;
          ctx.fillStyle = '#FDF2F8';
          ctx.fillText('my love', s.cx, s.cy - (s.cy - s.textY) * pulseScale);
          ctx.shadowBlur = s.textSize * 0.28;
          ctx.fillStyle = '#F9A8D4';
          ctx.fillText('my love', s.cx, s.cy - (s.cy - s.textY) * pulseScale);
          ctx.restore();
          ctx.globalAlpha = 1;
        }
      }

      s.raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(st.current.raf);
    };
  }, []);

  const handleClick = (e) => {
    const s = st.current;
    if (s.clicked) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const { targets, textX, textY, textSize } = buildHeartTargets(s.w, s.h);
    s.textX = textX;
    s.textY = textY;
    s.textSize = textSize;
    s.particles = targets.map((tg) => {
      const ang = Math.random() * Math.PI * 2;
      const rad = 60 + Math.random() * 200;
      return {
        sx: px,
        sy: py,
        scx: px + Math.cos(ang) * rad,
        scy: py + Math.sin(ang) * rad,
        tx: tg.x,
        ty: tg.y,
        delay: Math.random() * 550,
        dur: 1500 + Math.random() * 400,
        size: Math.random() * 1.0 + 1.0,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        tw: Math.random() * Math.PI * 2,
      };
    });
    s.clicked = true;
    s.startT = performance.now();
    setClicked(true);
    medicalSynth.playSparkle();
  };

  const handleProceed = () => {
    medicalSynth.playBirthdayFanfare();
    if (onComplete) onComplete();
  };

  return (
    <div
      onClick={handleClick}
      className="bg-galaxy fixed inset-0 z-[70] flex items-center justify-center overflow-hidden cursor-crosshair"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Title / hint */}
      <div className="absolute top-8 inset-x-0 text-center pointer-events-none px-4">
        <h1 className="text-lg sm:text-xl font-mono text-pink-200/90 tracking-wide drop-shadow">
          🌌 Alisha Fiaz ke liye…
        </h1>
      </div>

      {!clicked && (
        <div className="absolute bottom-24 inset-x-0 text-center pointer-events-none animate-pulse-slow px-4">
          <p className="text-sm sm:text-base font-mono text-white/85">
            💫 screen par <span className="text-pink-300 font-bold">kahin bhi CLICK</span> karo… dil banega ✨
          </p>
        </div>
      )}

      {/* proceed button ("my love" canvas par draw hoti hai) */}
      {assembled && (
        <div
          className="absolute left-0 right-0 flex justify-center px-4 pointer-events-none animate-fadeIn"
          style={{ top: '80%' }}
        >
          <button
            onClick={handleProceed}
            className="pointer-events-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-mono font-bold text-sm tracking-wide transition-all shadow-xl hover:shadow-pink-500/40 inline-flex items-center gap-2 animate-pulse-slow"
          >
            🎂 Aage Chalo — Cake Dekho ✨
          </button>
        </div>
      )}
    </div>
  );
}
