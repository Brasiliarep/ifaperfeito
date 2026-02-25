
import React, { useState } from 'react';
import { ArrowLeft, Eraser, Check } from 'lucide-react';
import { OpeleState } from '../types';

const SandTray = ({ onBack, onComplete }: { onBack: () => void, onComplete: (odu: OpeleState) => void }) => {
    // 8 positions (Right 1-4, Left 1-4)
    // 1 = Single mark (I - OPEN), 2 = Double mark (II - CLOSED), 0 = Empty
    const [marks, setMarks] = useState<number[]>([0,0,0,0, 0,0,0,0]);

    const toggleMark = (index: number) => {
        // HAPTIC FEEDBACK
        if (navigator.vibrate) navigator.vibrate(50);

        setMarks(prev => {
            const newMarks = [...prev];
            // Cycle: 0 -> 1 (I) -> 2 (II) -> 0
            newMarks[index] = (newMarks[index] + 1) % 3;
            if (newMarks[index] === 0) newMarks[index] = 1; // Skip empty once tapped, toggle between 1 and 2
            return newMarks;
        });
    };

    const reset = () => setMarks([0,0,0,0, 0,0,0,0]);

    const finish = () => {
        if (marks.some(m => m === 0)) {
            alert("Marque todas as posições antes de confirmar.");
            return;
        }
        
        // Convert marks (1=Open, 2=Closed) to OpeleState
        // Important: In OpeleState, 'open' = I, 'closed' = II
        const rightLeg = marks.slice(0, 4).map(m => m === 1 ? 'open' : 'closed') as any;
        const leftLeg = marks.slice(4, 8).map(m => m === 1 ? 'open' : 'closed') as any;
        
        onComplete({ rightLeg, leftLeg });
    };

    return (
        <div className="min-h-screen bg-[#3E2723] text-[#F5F5DC] p-4 flex flex-col items-center">
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <button onClick={onBack}><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-[#D4AF37]">Opón Iyanrin (Areia)</h1>
                <button onClick={reset}><Eraser /></button>
            </div>

            <div className="bg-[#D2B48C] w-full max-w-sm aspect-square rounded-full border-8 border-[#2E150F] shadow-2xl relative p-8 flex justify-center items-center overflow-hidden">
                {/* Sand Texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-50 mix-blend-multiply pointer-events-none"></div>
                
                <div className="grid grid-cols-2 gap-12 z-10 w-full h-full p-4">
                    {/* Right Column */}
                    <div className="flex flex-col justify-between items-end">
                        {[0, 1, 2, 3].map(i => (
                            <button 
                                key={i} 
                                onClick={() => toggleMark(i)}
                                className="h-12 w-20 flex items-center justify-center hover:bg-black/5 rounded transition-colors"
                            >
                                {marks[i] === 1 && <div className="h-full w-2 bg-[#2E150F] rounded-full opacity-80 shadow-inner"></div>}
                                {marks[i] === 2 && (
                                    <div className="flex gap-2 h-full">
                                        <div className="h-full w-2 bg-[#2E150F] rounded-full opacity-80 shadow-inner"></div>
                                        <div className="h-full w-2 bg-[#2E150F] rounded-full opacity-80 shadow-inner"></div>
                                    </div>
                                )}
                                {marks[i] === 0 && <span className="text-[#2E150F]/20 text-4xl">+</span>}
                            </button>
                        ))}
                    </div>

                    {/* Left Column */}
                    <div className="flex flex-col justify-between items-start">
                        {[4, 5, 6, 7].map(i => (
                            <button 
                                key={i} 
                                onClick={() => toggleMark(i)}
                                className="h-12 w-20 flex items-center justify-center hover:bg-black/5 rounded transition-colors"
                            >
                                {marks[i] === 1 && <div className="h-full w-2 bg-[#2E150F] rounded-full opacity-80 shadow-inner"></div>}
                                {marks[i] === 2 && (
                                    <div className="flex gap-2 h-full">
                                        <div className="h-full w-2 bg-[#2E150F] rounded-full opacity-80 shadow-inner"></div>
                                        <div className="h-full w-2 bg-[#2E150F] rounded-full opacity-80 shadow-inner"></div>
                                    </div>
                                )}
                                {marks[i] === 0 && <span className="text-[#2E150F]/20 text-4xl">+</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <p className="mt-8 text-[#D2B48C] text-sm text-center max-w-xs">
                Toque na areia para marcar I (Aberto) ou II (Fechado). O Opón Iyanrin é a conexão direta com a terra.
            </p>

            <button 
                onClick={finish}
                className="mt-8 bg-[#D4AF37] text-[#2E150F] px-8 py-3 rounded-full font-bold uppercase flex items-center gap-2 hover:scale-105 transition-transform shadow-lg"
            >
                <Check size={20} /> Confirmar Odu
            </button>
        </div>
    );
};

export default SandTray;
