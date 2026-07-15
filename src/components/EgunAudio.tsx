
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Headphones, Play, Pause } from 'lucide-react';

const EgunAudio = ({ onBack }: { onBack: () => void }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const intervalsRef = useRef<number[]>([]);

    useEffect(() => {
        return () => stopAudio();
    }, []);

    const playSound = () => {
        if (isPlaying) {
            stopAudio();
            return;
        }

        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        audioContextRef.current = ctx;
        setIsPlaying(true);

        // Background Drone (Low Wind)
        const droneOsc = ctx.createOscillator();
        const droneGain = ctx.createGain();
        droneOsc.frequency.value = 50;
        droneOsc.type = 'sine';
        droneGain.gain.value = 0.2;
        droneOsc.connect(droneGain).connect(ctx.destination);
        droneOsc.start();

        // Random Whispers (Simulated with Noise bursts positioned in 3D space)
        const triggerWhisper = () => {
            if (ctx.state === 'closed') return;
            
            const panner = ctx.createStereoPanner();
            // Pan randomly left (-1) to right (1) to creating circling effect
            panner.pan.value = Math.random() * 2 - 1; 

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            // Filter to sound like a whisper/wind voice
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 200 + Math.random() * 500;
            filter.Q.value = 1;

            osc.type = 'triangle';
            osc.frequency.value = 100 + Math.random() * 50; // Low pitch modulation
            
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 1); // Fade in
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3); // Fade out

            osc.connect(filter).connect(gain).connect(panner).connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 3);
        };

        // Schedule random whispers
        const interval = window.setInterval(triggerWhisper, 2500);
        intervalsRef.current.push(interval);
    };

    const stopAudio = () => {
        intervalsRef.current.forEach(i => clearInterval(i));
        if (audioContextRef.current) audioContextRef.current.close();
        setIsPlaying(false);
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <button onClick={onBack} className="absolute top-4 left-4 z-20"><ArrowLeft /></button>
            
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50 animate-pulse"></div>

            <div className="z-10 text-center max-w-md">
                <Headphones size={64} className="mx-auto mb-6 text-gray-500" />
                <h1 className="text-3xl font-serif text-ifa-gold mb-4">Sussurro dos Ancestrais</h1>
                <p className="text-gray-400 text-sm mb-12 leading-relaxed">
                    Coloque fones de ouvido. Esta experiência utiliza áudio 3D (binaural) para simular o círculo sagrado dos Egun (Espíritos) ao seu redor.
                </p>

                <button 
                    onClick={playSound}
                    className={`w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all ${isPlaying ? 'border-red-500 bg-red-900/20 shadow-[0_0_50px_red]' : 'border-white bg-white/10 hover:bg-white/20'}`}
                >
                    {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>
                
                {isPlaying && (
                    <p className="mt-8 text-xs text-red-400 font-bold uppercase tracking-widest animate-pulse">
                        Conexão Estabelecida...
                    </p>
                )}
            </div>
        </div>
    );
};

export default EgunAudio;
