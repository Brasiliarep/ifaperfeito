
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Moon, Play, Pause, Volume2, Info, CloudFog } from 'lucide-react';

const LucidDreamingPlayer = ({ onBack }: { onBack: () => void }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(0); // Minutes elapsed
    const audioCtxRef = useRef<AudioContext | null>(null);
    const oscRefs = useRef<(OscillatorNode | AudioBufferSourceNode)[]>([]);
    
    // THETA WAVE CONFIG (4Hz difference)
    // Left Ear: 200Hz | Right Ear: 204Hz
    // Result: 4Hz Beat (Deep Relaxation / REM)

    const startBinaural = () => {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Base Gain
        const masterGain = ctx.createGain();
        masterGain.gain.value = 0.1; // Low volume
        masterGain.connect(ctx.destination);

        // Oscillator 1 (Left)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.value = 200;
        const panner1 = ctx.createStereoPanner();
        panner1.pan.value = -1;
        osc1.connect(panner1).connect(masterGain);

        // Oscillator 2 (Right)
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.value = 204; // +4Hz difference
        const panner2 = ctx.createStereoPanner();
        panner2.pan.value = 1;
        osc2.connect(panner2).connect(masterGain);

        // Pink Noise (Background Texture)
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = data[i];
            data[i] *= 3.5; 
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 0.02; // Very subtle
        noise.connect(noiseGain).connect(ctx.destination);

        osc1.start();
        osc2.start();
        noise.start();

        oscRefs.current = [osc1, osc2, noise];
        setIsPlaying(true);
    };

    const stopBinaural = () => {
        oscRefs.current.forEach(node => node.stop());
        if (audioCtxRef.current) audioCtxRef.current.close();
        setIsPlaying(false);
    };

    useEffect(() => {
        let interval: number;
        if (isPlaying) {
            interval = window.setInterval(() => {
                setTimer(t => t + 1);
                
                // Reality Check Bell every 5 minutes
                if ((timer + 1) % 5 === 0) {
                    playBell();
                }
            }, 60000); // Every minute
        }
        return () => {
            clearInterval(interval);
            stopBinaural();
        };
    }, [isPlaying, timer]);

    const playBell = () => {
        // Soft bell sound to trigger lucidity check
        const ctx = audioCtxRef.current;
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain).connect(ctx.destination);
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        osc.start();
        osc.stop(ctx.currentTime + 1.5);
    };

    return (
        <div className="min-h-screen bg-[#0a0a1a] text-purple-200 p-8 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Stars BG */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse"></div>
            
            <button onClick={onBack} className="absolute top-4 left-4 z-20 hover:text-white"><ArrowLeft /></button>

            <div className="z-10 text-center max-w-md">
                <div className="mb-8 relative">
                    <div className={`w-40 h-40 rounded-full bg-gradient-to-b from-purple-900 to-black mx-auto flex items-center justify-center shadow-[0_0_60px_rgba(147,51,234,0.3)] transition-all duration-[5000ms] ${isPlaying ? 'scale-110 shadow-[0_0_100px_rgba(147,51,234,0.6)]' : ''}`}>
                        <Moon size={64} className="text-purple-400" />
                    </div>
                    {isPlaying && (
                        <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-ping"></div>
                    )}
                </div>

                <h1 className="text-3xl font-serif text-white mb-2">Sonhos Lúcidos de Ifá</h1>
                <p className="text-sm text-purple-400 mb-8 uppercase tracking-widest">Frequência Theta (4Hz) • Indução Astral</p>

                <div className="flex justify-center gap-6 mb-12">
                    <button 
                        onClick={isPlaying ? stopBinaural : startBinaural}
                        className="bg-purple-600 hover:bg-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                    >
                        {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                    </button>
                </div>

                {isPlaying && (
                    <div className="animate-fade-in mb-8">
                        <p className="text-4xl font-light text-white mb-2">{timer} min</p>
                        <p className="text-xs text-gray-400">Tempo de Sessão</p>
                    </div>
                )}

                <div className="bg-purple-900/20 p-4 rounded-xl border border-purple-500/20 text-left flex gap-3">
                    <Info className="flex-shrink-0 text-purple-400" />
                    <div className="text-xs text-gray-300 space-y-2">
                        <p><strong>Instruções:</strong> Use fones de ouvido. O som binaural cria uma frequência Theta no cérebro, facilitando o transe consciente.</p>
                        <p><strong>Reality Check:</strong> A cada 5 minutos, um sino suave tocará. Pergunte-se: "Estou sonhando?" para despertar dentro do sonho.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LucidDreamingPlayer;
