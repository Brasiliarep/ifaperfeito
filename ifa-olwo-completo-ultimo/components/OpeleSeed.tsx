import React from 'react';
import { SeedState } from '../types';

interface OpeleSeedProps {
  state: SeedState;
  onClick: () => void;
  position: number;
}

const OpeleSeed: React.FC<OpeleSeedProps> = ({ state, onClick, position }) => {
  const isOpen = state === 'open';

  return (
    <div className="relative flex flex-col items-center">
      {/* Connector Bead (Top) - Only for positions > 0 */}
      {position > 0 && (
         <div className="h-4 w-1 bg-gradient-to-b from-green-600 via-green-500 to-green-700 flex flex-col items-center justify-center gap-[2px]">
             {/* Mimic beads */}
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-sm"></div>
             <div className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-sm"></div>
         </div>
      )}

      <div 
        onClick={onClick}
        className={`
          relative w-14 h-20 md:w-16 md:h-24 cursor-pointer 
          transition-transform duration-300 ease-in-out transform hover:scale-105
          shadow-xl rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%]
          flex items-center justify-center overflow-hidden
          ${isOpen 
            ? 'bg-[#e3dac9]' /* Bone/Beige color for inside */
            : 'bg-[#3e2723]' /* Dark wood color for outside */
          }
        `}
        style={{
            // Teardrop shape clip-path for extra realism if border-radius isn't enough, 
            // but border-radius above does a good organic job.
            boxShadow: isOpen 
                ? 'inset 0 0 10px #b08d55, 2px 4px 6px rgba(0,0,0,0.4)' 
                : 'inset -2px -2px 10px #1a100c, 2px 4px 6px rgba(0,0,0,0.5)'
        }}
      >
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

        {isOpen ? (
          // OPEN STATE (Concave inner part)
          <div className="w-full h-full relative">
              {/* Inner depression shadow */}
              <div className="absolute inset-2 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] bg-gradient-to-br from-[#d4c5a9] to-[#c5b391] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3)]"></div>
              
              {/* Central ridge/spine often seen inside the seed */}
              <div className="absolute top-2 bottom-2 left-1/2 w-0.5 -ml-[1px] bg-[#a68b6c] opacity-50 blur-[1px]"></div>
          </div>
        ) : (
          // CLOSED STATE (Convex outer part)
          <div className="w-full h-full relative bg-gradient-to-br from-[#5d4037] to-[#281813]">
              {/* Highlight to show curvature */}
              <div className="absolute top-2 left-3 w-4 h-8 bg-white opacity-5 rounded-full blur-md transform -rotate-12"></div>
              {/* Natural imperfections */}
              <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-black opacity-20 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpeleSeed;