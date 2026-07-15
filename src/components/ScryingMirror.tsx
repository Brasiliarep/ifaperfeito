
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Eye, RefreshCw } from 'lucide-react';

const WORDS = [
    "Caminho", "Verdade", "Mentira", "Oculto", "Água", "Fogo", "Sangue", "Amor", 
    "Traição", "Morte", "Nascimento", "Riqueza", "Perda", "Medo", "Coragem"
];

const IMAGES = [
    "🐍", "🦅", "💀", "👑", "🗡️", "🏺", "👁️", "🌊", "🔥", "🌪️"
];

const ScryingMirror = ({ onBack }: { onBack: () => void }) => {
    const [visions, setVisisons] = useState<{id: number, content: string, x: number, y: number, type: 'word'|'icon'}[]>([]);
    
    const triggerVision = (e: React.MouseEvent | React.TouchEvent) => {
        let clientX = 0, clientY = 0;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        const type: 'word' | 'icon' = Math.random() > 0.5 ? 'word' : 'icon';
        const content = type === 'word' 
            ? WORDS[Math.floor(Math.random() * WORDS.length)] 
            : IMAGES[Math.floor(Math.random() * IMAGES.length)];

        const newVision = {
            id: Date.now(),
            content,
            x: clientX,
            y: clientY,
            type
        };

        setVisisons(prev => [...prev, newVision]);

        // Fade out
        setTimeout(() => {
            setVisisons(prev => prev.filter(v => v.id !== newVision.id));
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-black overflow-hidden relative cursor-none" onClick={triggerVision} onTouchStart={triggerVision}>
            <button onClick={(e) => { e.stopPropagation(); onBack(); }} className="absolute top-4 left-4 z-50 text-gray-500 hover:text-white cursor-pointer">
                <ArrowLeft />
            </button>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-br from-gray-900 to-black border border-gray-800 shadow-[0_0_100px_rgba(255,255,255,0.05)] flex items-center justify-center">
                    <p className="text-gray-900 text-xs font-serif uppercase tracking-[1em] opacity-20">Obsidiana</p>
                </div>
            </div>

            <div className="absolute bottom-8 w-full text-center text-gray-600 text-xs pointer-events-none">
                Toque na superfície escura para revelar o oculto.
            </div>

            {visions.map(v => (
                <div 
                    key={v.id}
                    className="absolute pointer-events-none animate-fade-out-up text-white font-serif"
                    style={{ 
                        left: v.x, 
                        top: v.y,
                        transform: 'translate(-50%, -50%)',
                        fontSize: v.type === 'icon' ? '3rem' : '1.5rem',
                        textShadow: '0 0 20px rgba(255,255,255,0.8)'
                    }}
                >
                    {v.content}
                </div>
            ))}
            
            <style>{`
                @keyframes fade-out-up {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                    20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -150%) scale(1.2); }
                }
                .animate-fade-out-up {
                    animation: fade-out-up 3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ScryingMirror;
