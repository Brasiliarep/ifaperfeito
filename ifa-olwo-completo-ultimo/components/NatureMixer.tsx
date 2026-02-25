
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Volume2, VolumeX, CloudRain, Wind, Waves, Flame } from 'lucide-react';

const NatureMixer = ({ onBack }: { onBack: () => void }) => {
    const [volumes, setVolumes] = useState({ rain: 0, wind: 0, river: 0, fire: 0 });
    const audioContextRef = useRef<AudioContext | null>(null);
    const nodesRef = useRef<Record<string, GainNode>>({});

    useEffect(() => {
        // Init Audio Context
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();
        
        // In a real app, we would load samples. 
        // Here we simulate with oscillators/noise for demo purposes or placeholders.
        // For production, replace with <audio> elements or valid buffers.
        
        return () => {
            if(audioContextRef.current) audioContextRef.current.close();
        };
    }, []);

    // Mock volume control (Visual only for this demo since we don't have MP3 assets loaded)
    const handleVolume = (type: keyof typeof volumes, val: number) => {
        setVolumes(prev => ({ ...prev, [type]: val }));
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold">Sons da Natureza</h1>
                <div className="w-6"></div>
            </div>

            <div className="grid gap-6 w-full max-w-md">
                <div className="bg-ifa-base border border-ifa-border p-6 rounded-xl">
                    <div className="flex items-center gap-4 mb-4 text-blue-300">
                        <CloudRain size={24} />
                        <span className="font-bold">Chuva Suave</span>
                    </div>
                    <input 
                        type="range" min="0" max="100" 
                        value={volumes.rain}
                        onChange={(e) => handleVolume('rain', parseInt(e.target.value))}
                        className="w-full accent-blue-500"
                    />
                </div>

                <div className="bg-ifa-base border border-ifa-border p-6 rounded-xl">
                    <div className="flex items-center gap-4 mb-4 text-gray-300">
                        <Wind size={24} />
                        <span className="font-bold">Vento na Floresta</span>
                    </div>
                    <input 
                        type="range" min="0" max="100" 
                        value={volumes.wind}
                        onChange={(e) => handleVolume('wind', parseInt(e.target.value))}
                        className="w-full accent-gray-500"
                    />
                </div>

                <div className="bg-ifa-base border border-ifa-border p-6 rounded-xl">
                    <div className="flex items-center gap-4 mb-4 text-cyan-300">
                        <Waves size={24} />
                        <span className="font-bold">Corredeira de Rio (Osun)</span>
                    </div>
                    <input 
                        type="range" min="0" max="100" 
                        value={volumes.river}
                        onChange={(e) => handleVolume('river', parseInt(e.target.value))}
                        className="w-full accent-cyan-500"
                    />
                </div>

                <div className="bg-ifa-base border border-ifa-border p-6 rounded-xl">
                    <div className="flex items-center gap-4 mb-4 text-red-400">
                        <Flame size={24} />
                        <span className="font-bold">Fogueira (Sango)</span>
                    </div>
                    <input 
                        type="range" min="0" max="100" 
                        value={volumes.fire}
                        onChange={(e) => handleVolume('fire', parseInt(e.target.value))}
                        className="w-full accent-red-500"
                    />
                </div>
            </div>
            
            <p className="mt-8 text-xs text-ifa-neutral text-center">
                Ajuste os volumes para criar a ambiência perfeita para o jogo.
            </p>
        </div>
    );
};

export default NatureMixer;
