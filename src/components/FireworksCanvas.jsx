import React, { useEffect, useRef } from 'react';

export default function FireworksCanvas({ active, onComplete }) {
  const canvasRef = useRef(null);
  // onComplete ko ref mein rakhte hain taake parent re-render par effect restart na ho
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Lovely romantic pastel palette
    const colors = ['#F43F5E', '#EC4899', '#F472B6', '#C084FC', '#A855F7', '#38BDF8', '#FBBF24', '#34D399', '#FFFFFF'];
    const particles = [];

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 11 + 3;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 5; // upward pop
        this.gravity = 0.18;
        this.friction = 0.985;
        this.alpha = 1;
        this.decay = Math.random() * 0.009 + 0.005;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 10 + 7;
        this.rotation = Math.random() * Math.PI * 2;
        this.vRot = (Math.random() - 0.5) * 0.12;

        // Types: 'butterfly' (30%), 'heart' (35%), 'star' (20%), 'confetti' (15%)
        const rand = Math.random();
        if (rand < 0.35) this.type = 'butterfly';
        else if (rand < 0.70) this.type = 'heart';
        else if (rand < 0.85) this.type = 'star';
        else this.type = 'confetti';

        this.wingAngle = 0;
        this.wingSpeed = Math.random() * 0.2 + 0.15;
      }

      update() {
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.vRot;
        this.wingAngle += this.wingSpeed;
        this.alpha -= this.decay;
      }

      draw(c) {
        c.save();
        c.globalAlpha = Math.max(0, this.alpha);
        c.translate(this.x, this.y);
        c.rotate(this.rotation);

        if (this.type === 'butterfly') {
          // Draw cute fluttering butterfly
          const flap = Math.abs(Math.sin(this.wingAngle));
          const w = this.size * 1.1 * flap;
          const h = this.size * 0.9;

          c.fillStyle = this.color;
          // Left wing
          c.beginPath();
          c.ellipse(-w * 0.5, 0, w * 0.5, h * 0.6, -Math.PI / 6, 0, Math.PI * 2);
          c.fill();
          // Right wing
          c.beginPath();
          c.ellipse(w * 0.5, 0, w * 0.5, h * 0.6, Math.PI / 6, 0, Math.PI * 2);
          c.fill();
          // Body
          c.fillStyle = '#475569';
          c.fillRect(-1, -h * 0.5, 2, h);
        } else if (this.type === 'heart') {
          // Cute heart
          c.fillStyle = this.color;
          const s = this.size * 0.8;
          c.beginPath();
          c.moveTo(0, s * 0.3);
          c.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.2, 0, s);
          c.bezierCurveTo(s, s * 0.2, s * 0.5, -s * 0.3, 0, s * 0.3);
          c.fill();
        } else if (this.type === 'star') {
          // Sparkle star
          c.fillStyle = '#FDE047';
          const r = this.size * 0.6;
          c.beginPath();
          for (let i = 0; i < 5; i++) {
            c.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * r, -Math.sin((18 + i * 72) * Math.PI / 180) * r);
            c.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (r * 0.45), -Math.sin((54 + i * 72) * Math.PI / 180) * (r * 0.45));
          }
          c.closePath();
          c.fill();
        } else {
          // Soft pastel ribbon confetti
          c.fillStyle = this.color;
          c.fillRect(-this.size / 2, -this.size / 3, this.size, this.size * 0.6);
        }
        c.restore();
      }
    }

    const bursts = [
      { x: canvas.width * 0.25, y: canvas.height * 0.45, count: 65, delay: 0 },
      { x: canvas.width * 0.75, y: canvas.height * 0.45, count: 65, delay: 180 },
      { x: canvas.width * 0.5, y: canvas.height * 0.35, count: 95, delay: 350 },
      { x: canvas.width * 0.35, y: canvas.height * 0.55, count: 55, delay: 550 },
      { x: canvas.width * 0.65, y: canvas.height * 0.55, count: 55, delay: 700 },
    ];

    // IMPORTANT: bursts setTimeout se spawn hote hain, is liye tab tak loop
    // zinda rahega jab tak SAARY bursts spawn ho chuke aur particles khatam.
    let spawnedBursts = 0;
    const burstTimers = bursts.map(b => {
      return setTimeout(() => {
        for (let i = 0; i < b.count; i++) {
          particles.push(new Particle(b.x, b.y));
        }
        spawnedBursts++;
      }, b.delay);
    });

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        }
      }

      if (particles.length > 0 || spawnedBursts < bursts.length) {
        animationFrameId = requestAnimationFrame(loop);
      } else {
        if (onCompleteRef.current) onCompleteRef.current();
      }
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      burstTimers.forEach(clearTimeout);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
}