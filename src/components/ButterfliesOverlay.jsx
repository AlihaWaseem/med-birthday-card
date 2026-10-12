import React, { useEffect, useState } from 'react';

// Generates delicate, fluttering 3D butterflies floating peacefully in the background
export const ButterfliesOverlay = () => {
  const [butterflies, setButterflies] = useState([]);

  useEffect(() => {
    const butterflyColors = [
      { wing: '#F472B6', accent: '#FDA4AF' }, // Pink / Rose
      { wing: '#C084FC', accent: '#E9D5FF' }, // Lavender / Lilac
      { wing: '#38BDF8', accent: '#BAE6FD' }, // Soft Sky Blue
      { wing: '#FBBF24', accent: '#FEF3C7' }, // Soft Gold / Honey
      { wing: '#34D399', accent: '#A7F3D0' }, // Mint / Soft Emerald
    ];

    const initial = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      x: Math.random() * 90 + 5, // percentage
      y: Math.random() * 85 + 10,
      scale: Math.random() * 0.4 + 0.6,
      duration: Math.random() * 8 + 12, // slow, peaceful drift
      delay: Math.random() * 5,
      color: butterflyColors[i % butterflyColors.length],
      driftAngle: (Math.random() - 0.5) * 40,
    }));

    setButterflies(initial);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {butterflies.map((b) => (
        <div
          key={b.id}
          className="absolute transition-transform"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            transform: `scale(${b.scale}) rotate(${b.driftAngle}deg)`,
            animation: `butterflyFloat ${b.duration}s ease-in-out infinite alternate`,
            animationDelay: `${b.delay}s`,
          }}
        >
          {/* Animated 3D Butterfly */}
          <div className="relative flex items-center justify-center cursor-pointer pointer-events-auto hover:scale-125 transition-transform group">
            
            {/* Left Wing with 3D flap animation */}
            <div
              className="w-5 h-6 rounded-tl-[80%] rounded-tr-[30%] rounded-bl-[60%] rounded-br-[10%] origin-right shadow-sm"
              style={{
                backgroundColor: b.color.wing,
                backgroundImage: `radial-gradient(circle at 70% 30%, ${b.color.accent} 0%, ${b.color.wing} 70%)`,
                animation: 'wingFlapLeft 0.35s ease-in-out infinite alternate',
                filter: 'drop-shadow(0 0 6px rgba(244, 114, 182, 0.4))',
              }}
            />

            {/* Butterfly Body */}
            <div className="w-1 h-5 bg-slate-800 rounded-full mx-[-1px] z-10 relative">
              {/* Antennae */}
              <div className="absolute -top-2 -left-1 w-1.5 h-2 border-l border-t border-slate-700 rounded-tl-full" />
              <div className="absolute -top-2 -right-1 w-1.5 h-2 border-r border-t border-slate-700 rounded-tr-full" />
            </div>

            {/* Right Wing with 3D flap animation */}
            <div
              className="w-5 h-6 rounded-tr-[80%] rounded-tl-[30%] rounded-br-[60%] rounded-bl-[10%] origin-left shadow-sm"
              style={{
                backgroundColor: b.color.wing,
                backgroundImage: `radial-gradient(circle at 30% 30%, ${b.color.accent} 0%, ${b.color.wing} 70%)`,
                animation: 'wingFlapRight 0.35s ease-in-out infinite alternate',
                filter: 'drop-shadow(0 0 6px rgba(244, 114, 182, 0.4))',
              }}
            />

            {/* Little fairy sparkle trail on hover */}
            <span className="absolute -top-3 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">
              ✨
            </span>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes wingFlapLeft {
          0% { transform: perspective(400px) rotateY(0deg); }
          100% { transform: perspective(400px) rotateY(65deg); }
        }
        @keyframes wingFlapRight {
          0% { transform: perspective(400px) rotateY(0deg); }
          100% { transform: perspective(400px) rotateY(-65deg); }
        }
        @keyframes butterflyFloat {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-24px) translateX(16px) rotate(10deg); }
          66% { transform: translateY(-10px) translateX(-20px) rotate(-8deg); }
          100% { transform: translateY(-35px) translateX(25px) rotate(12deg); }
        }
      `}</style>
    </div>
  );
};