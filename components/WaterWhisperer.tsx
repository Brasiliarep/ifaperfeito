
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Mic, Droplet, Sparkles, Waves } from 'lucide-react';

const WaterWhisperer = ({ onBack }: { onBack: () => void }) => {
    const [listening, setListening] = useState(false);
    const [energy, setEnergy] = useState(0); // 0 to 100
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const frameRef = useRef<number | null>(null);

    const start = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
            sourceRef.current.connect(analyserRef.current);
            analyserRef.current.fftSize = 256;
            analyserRef.current.smoothingTimeConstant = 0.8;
            
            setListening(true);
            analyze();
        } catch (e) {
            alert("Microfone necessário para vibrar a água.");
        }
    };

    const stop = () => {
        if (audioContextRef.current) audioContextRef.current.close();
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        setListening(false);
    };

    const analyze = () => {
        if (!analyserRef.current) return;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        const loop = () => {
            analyserRef.current!.getByteFrequencyData(dataArray);
            
            // Calculate volume/energy
            const avg = dataArray.reduce((a,b) => a+b, 0) / bufferLength;
            
            // If speaking loud enough, charge the water
            if (avg > 15) {
                setEnergy(prev => Math.min(100, prev + 0.3));
            }

            frameRef.current = requestAnimationFrame(loop);
        };
        loop();
    };

    useEffect(() => {
        return () => stop();
    }, []);

    return (
        <div className="min-h-screen bg-black text-blue-200 p-8 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#001020] to-black opacity-80 pointer-events-none"></div>
            
            <button onClick={onBack} className="absolute top-4 left-4 text-blue-400 hover:text-white z-20"><ArrowLeft /></button>
            
            <div className="z-10 text-center mb-8">
                <h1 className="text-3xl font-serif text-blue-400 mb-2 flex items-center justify-center gap-2"><Waves /> Encantador de Água</h1>
                <p className="text-xs text-blue-300 uppercase tracking-widest max-w-xs mx-auto opacity-70">
                    Segure o botão e recite seus pedidos (Adura) para consagrar a água com a vibração da sua voz.
                </p>
            </div>

            {/* THE CUP / WATER VESSEL */}
            <div className="relative w-72 h-72 rounded-full border-4 border-blue-500/30 flex items-center justify-center mb-12 overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.15)] z-10 bg-black">
                
                {/* Water Surface / Cymatics */}
                <div 
                    className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 transition-all duration-100 ease-out flex items-center justify-center overflow-hidden"
                    style={{ 
                        transform: `scale(${0.9 + (listening ? Math.random() * 0.02 : 0)})`,
                        opacity: 0.8 + (energy / 200),
                        boxShadow: `inset 0 0 ${energy}px rgba(255,255,255,0.5)`
                    }}
                >
                    {/* Simulated Cymatic Patterns */}
                    {listening && (
                        <>
                            <div className="absolute w-full h-full border-2 border-white/20 rounded-[40%] animate-spin-slow"></div>
                            <div className="absolute w-3/4 h-3/4 border-2 border-white/30 rounded-[30%] animate-spin-reverse-slow"></div>
                            <div className="absolute inset-0 border-4 border-white/10 rounded-full animate-ping"></div>
                        </>
                    )}
                </div>

                {/* Inner Glow based on Energy */}
                <div 
                    className="absolute w-full h-full bg-blue-400 blur-3xl transition-opacity duration-1000 mix-blend-screen"
                    style={{ opacity: energy / 120 }}
                ></div>

                {/* Percentage Text */}
                <div className="relative z-10 flex flex-col items-center">
                    <span className="text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
                        {Math.floor(energy)}%
                    </span>
                    <span className="text-[10px] uppercase font-bold text-blue-200 mt-1">Carga de Axé</span>
                </div>
            </div>

            <div className="z-10 h-32 flex flex-col items-center justify-center">
                {energy >= 100 ? (
                    <div className="text-center animate-scale-in">
                        <Sparkles className="mx-auto text-yellow-400 mb-4 animate-spin-slow" size={48} />
                        <h2 className="text-2xl font-bold text-white mb-2">Omi Tutu!</h2>
                        <p className="text-blue-300 text-sm">A água vibrou com suas palavras e está consagrada.</p>
                        <button onClick={() => setEnergy(0)} className="mt-6 px-6 py-2 border border-blue-500 text-blue-400 rounded-full text-xs uppercase font-bold hover:bg-blue-900/20">
                            Reiniciar
                        </button>
                    </div>
                ) : (
                    <button
                        onMouseDown={start}
                        onMouseUp={stop}
                        onTouchStart={start}
                        onTouchEnd={stop}
                        className={`w-24 h-24 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${listening ? 'bg-blue-600 border-white scale-110 shadow-[0_0_50px_blue] text-white' : 'bg-gray-900 border-gray-700 text-gray-500 hover:border-blue-500 hover:text-blue-500'}`}
                    >
                        <Mic size={40} className={listening ? 'animate-pulse' : ''} />
                    </button>
                )}
                
                {energy < 100 && (
                    <p className="mt-6 text-xs text-gray-500 animate-pulse">
                        {listening ? "Vibrando..." : "Pressione e fale para vibrar"}
                    </p>
                )}
            </div>
        </div>
    );
};

export default WaterWhisperer;
