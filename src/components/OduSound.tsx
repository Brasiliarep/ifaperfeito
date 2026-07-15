
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Volume2, StopCircle, Activity, Info } from 'lucide-react';
import { OduInfo } from '../types';

const OduSound = ({ odu, onBack }: { odu?: OduInfo, onBack: () => void }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const oscRefs = useRef<OscillatorNode[]>([]);
    
    // Default Odu if none provided
    const targetOdu = odu || { name: 'Ejiogbe', binaryRepresentation: 'I I I I', isMeji: true };

    const calculateFrequencies = (name: string) => {
        // Esoteric logic: Map Odu essence to Hz.
        // Base frequency 432Hz (Healing) modulated by Odu bit value
        let base = 432;
        let mod = 0;
        for(let i=0; i<name.length; i++) mod += name.charCodeAt(i);
        const f1 = base + (mod % 100);
        const f2 = base - (mod % 50); // Binaural beat diff
        return [f1, f2];
    };

    const toggleSound = () => {
        if (isPlaying) {
            oscRefs.current.forEach(o => o.stop());
            oscRefs.current = [];
            if(audioCtxRef.current) audioCtxRef.current.close();
            audioCtxRef.current = null;
            setIsPlaying(false);
        } else {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContext();
            audioCtxRef.current = ctx;

            const [f1, f2] = calculateFrequencies(targetOdu.name);

            const osc1 = ctx.createOscillator();
            const osc2 = ctx.createOscillator();
            const gain = ctx.createGain();

            osc1.frequency.value = f1;
            osc2.frequency.value = f2;
            
            // Stereo separation for binaural effect
            const panner1 = ctx.createStereoPanner();
            const panner2 = ctx.createStereoPanner();
            panner1.pan.value = -1; // Left
            panner2.pan.value = 1;  // Right

            osc1.connect(panner1).connect(gain);
            osc2.connect(panner2).connect(gain);
            
            gain.gain.value = 0.1; // Low volume
            gain.connect(ctx.destination);

            osc1.start();
            osc2.start();
            
            oscRefs.current = [osc1, osc2];
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        return () => {
            if(audioCtxRef.current) {
                audioCtxRef.current.close();
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between z-10">
                <button onClick={onBack}><ArrowLeft /></button>
            </div>

            <div className="text-center z-10">
                <h1 className="text-4xl font-serif text-ifa-gold mb-2">{targetOdu.name}</h1>
                <p className="text-ifa-neutral text-sm uppercase tracking-widest mb-12">Frequência Sonora de Alinhamento</p>

                <div className={`w-64 h-64 rounded-full border-4 border-ifa-gold/30 flex items-center justify-center relative transition-all duration-1000 ${isPlaying ? 'scale-110 shadow-[0_0_100px_rgba(212,175,55,0.3)]' : ''}`}>
                    <div className={`absolute inset-0 rounded-full border-2 border-ifa-gold/20 ${isPlaying ? 'animate-ping' : ''}`}></div>
                    <div className={`absolute inset-4 rounded-full border border-ifa-gold/10 ${isPlaying ? 'animate-pulse' : ''}`}></div>
                    
                    <button 
                        onClick={toggleSound}
                        className="w-24 h-24 bg-ifa-surface rounded-full flex items-center justify-center text-ifa-gold hover:scale-110 transition-transform shadow-2xl z-20"
                    >
                        {isPlaying ? <StopCircle size={48} /> : <Volume2 size={48} />}
                    </button>
                </div>

                <div className="mt-12 max-w-md mx-auto bg-black/20 p-4 rounded-lg flex gap-3 items-start text-left">
                    <Info size={20} className="text-ifa-gold flex-shrink-0 mt-1" />
                    <p className="text-xs text-ifa-neutral">
                        <strong>Como usar:</strong> Use fones de ouvido para perceber o efeito binaural. 
                        Este som gera uma frequência baseada na matemática do Odu {targetOdu.name} para sintonizar sua mente com a vibração do oráculo.
                    </p>
                </div>
            </div>
            
            {/* Visualizer BG */}
            {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                    <Activity size={400} className="animate-pulse text-ifa-gold" />
                </div>
            )}
        </div>
    );
};

export default OduSound;
