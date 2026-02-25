
import React, { useState } from 'react';
import { ArrowLeft, Flame, Sparkles } from 'lucide-react';

const SixteenLamps = ({ onBack }: { onBack: () => void }) => {
    const [litLamps, setLitLamps] = useState<number[]>([]);
    
    // The lamps should be lit in a circle, but for simplicity we allow any order, 
    // counting progress.
    const toggleLamp = (index: number) => {
        if (!litLamps.includes(index)) {
            setLitLamps([...litLamps, index]);
        }
    };

    const allLit = litLamps.length === 16;

    return (
        <div className="min-h-screen bg-black text-ifa-gold p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <button onClick={onBack} className="absolute top-4 left-4 text-ifa-neutral hover:text-white z-20"><ArrowLeft /></button>
            
            <div className="z-10 text-center mb-8">
                <h1 className="text-3xl font-serif font-bold mb-2">Oloju Merindinlogun</h1>
                <p className="text-sm text-ifa-neutral">Acenda as 16 lâmpadas de Osun para trazer clarividência e riqueza.</p>
            </div>

            <div className="relative w-80 h-80 z-10">
                {/* Center Image/Symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-32 h-32 rounded-full border-4 border-ifa-gold flex items-center justify-center transition-all duration-1000 ${allLit ? 'bg-ifa-gold shadow-[0_0_100px_rgba(212,175,55,0.8)]' : 'bg-black'}`}>
                        {allLit ? <Sparkles size={48} className="text-black animate-spin-slow" /> : <span className="text-xs uppercase font-bold text-ifa-neutral">Osun</span>}
                    </div>
                </div>

                {/* Lamps Circle */}
                {[...Array(16)].map((_, i) => {
                    const angle = (i / 16) * Math.PI * 2;
                    const radius = 140; // px
                    const x = 160 + Math.cos(angle) * radius - 20; // Center offset
                    const y = 160 + Math.sin(angle) * radius - 20;
                    const isLit = litLamps.includes(i);

                    return (
                        <button
                            key={i}
                            onClick={() => toggleLamp(i)}
                            className={`absolute w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isLit ? 'text-orange-400 scale-125' : 'text-gray-800'}`}
                            style={{ left: x, top: y }}
                        >
                            <Flame size={isLit ? 32 : 24} className={isLit ? 'fill-orange-500 animate-pulse' : ''} />
                        </button>
                    );
                })}
            </div>

            {allLit && (
                <div className="z-10 mt-8 text-center animate-fade-in bg-black/50 p-6 rounded-xl border border-ifa-gold">
                    <h2 className="text-2xl font-bold mb-2">Ore Yeye O!</h2>
                    <p className="italic text-white">"Que a luz de Osun ilumine seu caminho e traga a doçura da vida."</p>
                </div>
            )}
            
            {/* Background Glow */}
            {allLit && <div className="absolute inset-0 bg-orange-900/20 animate-pulse z-0"></div>}
        </div>
    );
};

export default SixteenLamps;
