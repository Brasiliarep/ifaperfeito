import React, { useEffect, useRef } from 'react';
import { SeedState } from '../types';

interface OpeleSeedProps {
  state: SeedState;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  position: number;
  isAnimating?: boolean;
}

function playTone(delay: number) {
  setTimeout(() => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(180 + Math.random() * 60, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.type = 'sine';
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch {}
  }, delay);
}

const OpeleSeed: React.FC<OpeleSeedProps> = ({ state, onClick, position, isAnimating = false }) => {
  const isOpen = state === 'open';
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    if (isAnimating) {
      playTone(position * 70);
    }
  }, []);

  const finalRot = useRef(`${(Math.random() * 16) - 8}deg`);

  return (
    <div
      className={`relative flex flex-col items-center ${isAnimating ? 'semente' : ''}`}
      style={isAnimating ? { '--i': position, '--rot-final': finalRot.current } as any : {}}
    >
      {/* Interlocking Brass Chain Link */}
      {position > 0 && (
        <div className="h-7 flex flex-col items-center justify-center -my-1.5 z-10 relative pointer-events-none">
          {/* Top Ring */}
          <div className="w-3 h-4 rounded-full border-2 border-[#C49E30] bg-gradient-to-b from-[#8a6f27] via-[#E2B84A] to-[#6b521b] shadow-md flex items-center justify-center">
            {/* Center link hook */}
            <div className="w-1.5 h-2 rounded-full border border-[#8a6f27] bg-black/50" />
          </div>
        </div>
      )}

      <div
        onClick={onClick}
        className={`relative w-14 h-20 md:w-16 md:h-24 cursor-pointer
          transition-all duration-300
          hover:scale-105 hover:-translate-y-1
          hover:drop-shadow-[0_6px_12px_rgba(196,158,48,0.5)]
          shadow-[0_8px_16px_rgba(0,0,0,0.6)] rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%]
          flex items-center justify-center overflow-hidden
          ${isOpen ? 'bg-[#ebdcb9]' : 'bg-[#1e100d]'}
          seed-inner ${isAnimating ? 'animating' : ''}`}
        style={{
          boxShadow: isOpen
            ? 'inset 0 0 14px rgba(138,109,39,0.7), inset 2px 2px 5px rgba(255,255,255,0.4), 0 4px 8px rgba(0,0,0,0.5)'
            : 'inset -2px -2px 12px #0f0706, inset 2px 2px 8px rgba(255,255,255,0.06), 0 6px 12px rgba(0,0,0,0.6)',
          border: '1.5px solid rgba(0,0,0,0.8)'
        }}
      >
        {/* Fine Wood Fiber Texture overlay */}
        <div className="absolute inset-0 opacity-[0.18] bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none" />

        {isOpen ? (
          // Concave Inner Shell (Open)
          <div className="w-full h-full relative flex items-center justify-center p-[2px]">
            {/* Inner Recessed Cup */}
            <div className="absolute inset-[3px] rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] bg-gradient-to-br from-[#dfcfb0] via-[#cfbd9d] to-[#ae9b79] shadow-[inset_3px_3px_7px_rgba(0,0,0,0.45)] border border-[#c4b393]/40" />
            {/* Center Split Groove */}
            <div className="absolute top-[8%] bottom-[8%] left-1/2 w-[2px] -ml-[1px] bg-[#66543b] opacity-40 blur-[0.5px]" />
            {/* Center Split Highlight */}
            <div className="absolute top-[10%] bottom-[10%] left-1/2 w-[1px] bg-white/20" />
            {/* Outer Rim Shadow */}
            <div className="absolute inset-0 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border-[2.5px] border-black/15 pointer-events-none" />
          </div>
        ) : (
          // Convex Outer Shell (Closed)
          <div className="w-full h-full relative bg-gradient-to-br from-[#3e231c] via-[#2c1713] to-[#120806]">
            {/* 3D Longitudinal Ridge (Highlight line down the spine of the seed) */}
            <div className="absolute top-[6%] bottom-[6%] left-1/2 w-[3px] -ml-[1.5px] bg-gradient-to-b from-[#6e463a] via-[#4d2d24] to-[#2c1713] rounded-full blur-[0.3px]" />
            {/* Natural Seed Spot Pattern (Subtle fibers) */}
            <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-black/40 rounded-full blur-[0.8px]" />
            {/* Glossy Reflective Highlight */}
            <div className="absolute top-[8%] left-[22%] w-[25%] h-[35%] bg-gradient-to-br from-white/12 to-transparent rounded-[50%] blur-[2.5px] transform -rotate-15 pointer-events-none" />
            {/* Outer Edge Shadowing */}
            <div className="absolute inset-0 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-[inset_0_0_12px_rgba(0,0,0,0.85)] pointer-events-none" />
          </div>
        )}
      </div>

      {/* Inline CSS for animation */}
      <style>
        {`
          @keyframes flip {
            0%   { transform: rotateY(0deg) scale(1); }
            25%  { transform: rotateY(45deg) scaleX(0.2) scaleY(1); }
            50%  { transform: rotateY(90deg) scale(1.05); }
            75%  { transform: rotateY(45deg) scaleX(0.2) scaleY(1); }
            100% { transform: rotateY(0deg) scale(1); }
          }
          .seed-inner.animating {
            animation: flip 320ms cubic-bezier(0.22,0.61,0.36,1) forwards;
          }
          .seed-inner.hover {
            transform: scale(1.03);
            filter: drop-shadow(0 0 8px rgba(255,215,0,0.4));
          }
        `}
      </style>
    </div>
  );
};

export default OpeleSeed;
