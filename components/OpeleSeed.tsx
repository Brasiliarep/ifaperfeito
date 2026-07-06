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
      {/* Connector Bead (Top) - Only for positions > 0 */}
      {position > 0 && (
        <div className="h-4 w-1 bg-gradient-to-b from-green-600 via-green-500 to-green-700 flex flex-col items-center justify-center gap-[2px]">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm" />
          <div className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-sm" />
        </div>
      )}

      <div
        onClick={onClick}
        className={`relative w-14 h-20 md:w-16 md:h-24 cursor-pointer
          transition-all duration-300
          hover:scale-105 hover:-translate-y-1
          hover:drop-shadow-[0_4px_8px_rgba(255,215,0,0.4)]
          shadow-xl rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%]
          flex items-center justify-center overflow-hidden
          ${isOpen ? 'bg-[#e3dac9]' : 'bg-[#2c1a1a]'}
          seed-inner ${isAnimating ? 'animating' : ''}`}
        style={{
          boxShadow: isOpen
            ? 'inset 0 0 10px #b08d55, 2px 4px 6px rgba(0,0,0,0.4)'
            : 'inset -2px -2px 10px #1a0f0c, 2px 4px 6px rgba(0,0,0,0.5)',
        }}
      >
        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />

        {isOpen ? (
          <div className="w-full h-full relative">
            <div className="absolute inset-2 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] bg-gradient-to-br from-[#d4c5a9] to-[#c5b391] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3)]" />
            <div className="absolute top-2 bottom-2 left-1/2 w-0.5 -ml-[1px] bg-[#a68b6c] opacity-50 blur-[1px]" />
          </div>
        ) : (
          <div className="w-full h-full relative bg-gradient-to-br from-[#5d4037] to-[#281813]">
            <div className="absolute top-2 left-3 w-4 h-8 bg-white opacity-5 rounded-full blur-md transform -rotate-12" />
            <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-black opacity-20 rounded-full" />
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
