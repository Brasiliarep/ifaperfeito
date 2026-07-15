
import React, { useState, useEffect } from 'react';
import { Droplet, CheckCircle2, X } from 'lucide-react';

interface Props {
    mode: 'opening' | 'closing';
    onComplete: () => void;
    onCancel: () => void;
}

const OPENING_PRAYER = [
    "Iba Olodumare, Oba ajiki.",
    "Iba Orunmila, Eleri Ipin.",
    "Iba Iba Iba Yeye, Iba Iba Iba Baba.",
    "Iba Ojugbona, Iba Oluwo.",
    "Iba Akoda, Iba Aseda.",
    "Mo juba O!"
];

const CLOSING_PRAYER = [
    "Aboru, Aboye, Abosise.",
    "Odu to jade, ko ni pa wa lara.",
    "Ebo na a fin, a da.",
    "Ase O!"
];

const IbaDigital: React.FC<Props> = ({ mode, onComplete, onCancel }) => {
    const [step, setStep] = useState(0);
    const [libationCount, setLibationCount] = useState(0);
    const [ripples, setRipples] = useState<{id: number, x: number, y: number}[]>([]);
    
    const lines = mode === 'opening' ? OPENING_PRAYER : CLOSING_PRAYER;
    const requiredLibations = 3;

    const handleTouch = (e: React.MouseEvent | React.TouchEvent) => {
        if (libationCount >= requiredLibations) return;

        // Visual Ripple Effect
        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        const id = Date.now();
        setRipples(prev => [...prev, { id, x: clientX, y: clientY }]);
        
        // Sound Effect Logic (Synthesized splash)
        playSplashSound();

        setLibationCount(prev => prev + 1);
        
        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== id));
        }, 1000);
    };

    const playSplashSound = () => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3);
        
        gain.gain.setValueAtTime(0.5, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    };

    useEffect(() => {
        if (libationCount >= requiredLibations) {
            const timer = setTimeout(() => {
                onComplete();
            }, 1500); // Wait a bit after last drop
            return () => clearTimeout(timer);
        }
    }, [libationCount, onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
            
            <button onClick={onCancel} className="absolute top-4 right-4 z-20 p-2 text-gray-500 hover:text-white"><X /></button>

            {/* Content Container */}
            <div className="relative z-10 text-center p-8 max-w-md w-full" onClick={handleTouch}>
                
                <h1 className="text-3xl font-serif text-ifa-gold mb-8 uppercase tracking-widest animate-pulse">
                    {mode === 'opening' ? "Iba (Saudação)" : "Ise (Fechamento)"}
                </h1>

                <div className="space-y-4 mb-12 min-h-[200px]">
                    {lines.map((line, idx) => (
                        <p 
                            key={idx} 
                            className={`text-xl font-medium transition-all duration-1000 ${idx <= libationCount * 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                        >
                            {line}
                        </p>
                    ))}
                </div>

                {libationCount < requiredLibations ? (
                    <div className="animate-bounce mt-8">
                        <div className="w-20 h-20 rounded-full border-4 border-blue-500 mx-auto flex items-center justify-center bg-blue-900/30">
                            <Droplet size={32} className="text-blue-400 fill-current" />
                        </div>
                        <p className="mt-4 text-sm text-gray-400 uppercase tracking-wide">Toque na tela para<br/>Derramar Água (Omi Tutu)</p>
                        <p className="mt-2 text-xs text-blue-400 font-bold">{libationCount} / {requiredLibations}</p>
                    </div>
                ) : (
                    <div className="mt-8 animate-scale-in">
                        <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                        <p className="text-lg font-bold text-green-400 uppercase">Aṣẹ.</p>
                    </div>
                )}
            </div>

            {/* Ripples Layer */}
            {ripples.map(ripple => (
                <div 
                    key={ripple.id}
                    className="absolute rounded-full border-4 border-blue-400/50 pointer-events-none animate-ripple"
                    style={{
                        left: ripple.x - 50,
                        top: ripple.y - 50,
                        width: 100,
                        height: 100
                    }}
                />
            ))}

            <style>{`
                @keyframes ripple {
                    0% { transform: scale(0); opacity: 1; }
                    100% { transform: scale(4); opacity: 0; }
                }
                .animate-ripple {
                    animation: ripple 1s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default IbaDigital;
