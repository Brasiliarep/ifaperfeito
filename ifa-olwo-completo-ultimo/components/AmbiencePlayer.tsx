import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ListMusic, CloudRain, Waves, Wind, Zap, Moon, Music, Trees, Sun, Anchor } from 'lucide-react';

type SoundMode = 'rain_storm' | 'ocean_waves' | 'forest_birds' | 'river_flow' | 'windy' | 'zen_music' | 'deep_relax';

interface SoundProfile {
    id: SoundMode;
    name: string;
    icon: React.ReactNode;
    description: string;
}

const SOUND_PROFILES: SoundProfile[] = [
    { 
        id: 'ocean_waves', 
        name: 'Mar Calmo', 
        icon: <Anchor size={14}/>,
        description: 'Ondas indo e vindo (LFO).'
    },
    { 
        id: 'river_flow', 
        name: 'Rio de Oxum', 
        icon: <Waves size={14}/>,
        description: 'Água corrente cristalina.'
    },
    { 
        id: 'rain_storm', 
        name: 'Chuva & Trovão', 
        icon: <CloudRain size={14}/>,
        description: 'Tempestade tropical.'
    },
    { 
        id: 'forest_birds', 
        name: 'Floresta & Pássaros', 
        icon: <Trees size={14}/>,
        description: 'Natureza viva.'
    },
    { 
        id: 'zen_music', 
        name: 'Música Suave', 
        icon: <Sun size={14}/>,
        description: 'Harmonia etérea para paz.'
    },
    { 
        id: 'deep_relax', 
        name: 'Relaxamento Profundo', 
        icon: <Moon size={14}/>,
        description: 'Drone grave (Sono/Transe).'
    },
    { 
        id: 'windy', 
        name: 'Vento Iansã', 
        icon: <Wind size={14}/>,
        description: 'Brisa constante.'
    }
];

const AmbiencePlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [currentProfile, setCurrentProfile] = useState<SoundProfile>(SOUND_PROFILES[0]);
    const [volume, setVolume] = useState(0.5);
    
    // Audio Context & Nodes References
    const audioCtxRef = useRef<AudioContext | null>(null);
    const masterGainRef = useRef<GainNode | null>(null);
    
    // Trackers for cleanup
    const activeNodesRef = useRef<AudioNode[]>([]);
    const intervalsRef = useRef<number[]>([]);

    // --- AUDIO GENERATORS ---

    // 1. NOISE GENERATOR (Foundation for Water/Wind)
    const playNoise = (ctx: AudioContext, type: 'white' | 'pink' | 'brown', filterFreq: number = 1000, modSpeed: number = 0) => {
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        let lastOut = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            if (type === 'brown') {
                data[i] = (lastOut + (0.02 * white)) / 1.02;
                lastOut = data[i];
                data[i] *= 3.5; 
            } else if (type === 'pink') {
                data[i] = (lastOut + (0.05 * white)) / 1.05; 
                lastOut = data[i];
                data[i] *= 2; 
            } else {
                data[i] = white;
            }
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = filterFreq;

        const gain = ctx.createGain();
        gain.gain.value = 0.2; // Base volume

        // Modulation (Waves effect)
        if (modSpeed > 0) {
            const lfo = ctx.createOscillator();
            lfo.type = 'sine';
            lfo.frequency.value = modSpeed; // Hz (0.1 = very slow waves)
            const lfoGain = ctx.createGain();
            lfoGain.gain.value = 0.15; // Depth of swell
            
            lfo.connect(lfoGain).connect(gain.gain);
            lfo.start();
            activeNodesRef.current.push(lfo, lfoGain);
        }

        source.connect(filter).connect(gain).connect(masterGainRef.current!);
        source.start();
        
        activeNodesRef.current.push(source, gain, filter);
    };

    // 2. TONE GENERATOR (Music/Drone)
    const playDrone = (ctx: AudioContext, frequencies: number[], type: 'sine' | 'triangle' = 'sine') => {
        frequencies.forEach(f => {
            const osc = ctx.createOscillator();
            osc.type = type;
            osc.frequency.value = f;
            
            const gain = ctx.createGain();
            gain.gain.value = 0.05; // Low volume for music layers
            
            // Subtle detune movement
            const lfo = ctx.createOscillator();
            lfo.frequency.value = 0.1 + Math.random() * 0.1;
            const lfoGain = ctx.createGain();
            lfoGain.gain.value = 2; // Detune amount
            lfo.connect(lfoGain).connect(osc.detune);

            osc.connect(gain).connect(masterGainRef.current!);
            osc.start();
            lfo.start();
            
            activeNodesRef.current.push(osc, gain, lfo, lfoGain);
        });
    };

    // 3. EVENT GENERATORS (Thunder/Birds)
    const triggerBird = (ctx: AudioContext) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Bird logic: High pitch sine wave changing freq quickly
        osc.type = 'sine';
        const startFreq = 2000 + Math.random() * 1500;
        osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(startFreq + 500, ctx.currentTime + 0.1);
        osc.frequency.linearRampToValueAtTime(startFreq - 200, ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15 * volume, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

        osc.connect(gain).connect(masterGainRef.current!);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
    };

    const triggerThunder = (ctx: AudioContext) => {
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for(let i=0; i<bufferSize; i++) data[i] = Math.random() * 2 - 1;

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);
        filter.frequency.linearRampToValueAtTime(100, ctx.currentTime + 1);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.6 * volume, ctx.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

        source.connect(filter).connect(gain).connect(masterGainRef.current!);
        source.start();
        source.stop(ctx.currentTime + 3);
    };

    const stopAudio = () => {
        intervalsRef.current.forEach(i => clearInterval(i));
        intervalsRef.current = [];

        activeNodesRef.current.forEach(node => {
            try {
                if (node instanceof OscillatorNode || node instanceof AudioBufferSourceNode) {
                    node.stop();
                }
                node.disconnect();
            } catch (e) {
                // ignore errors if node already stopped/disconnected
            }
        });
        activeNodesRef.current = [];
    };

    // --- MAIN CONTROL ---

    const startEngine = (profile: SoundProfile) => {
        // 1. Setup Context
        if (!audioCtxRef.current) {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            audioCtxRef.current = new AudioContext();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') ctx.resume();

        // 2. Master Volume
        if (!masterGainRef.current) {
            const mg = ctx.createGain();
            mg.connect(ctx.destination);
            masterGainRef.current = mg;
        }
        masterGainRef.current.gain.value = volume;

        // 3. Cleanup Previous
        stopAudio(); 
        setIsPlaying(true);

        // 4. Route Profile
        switch (profile.id) {
            case 'ocean_waves':
                // Brown Noise + Slow LFO (0.1Hz) = Waves
                playNoise(ctx, 'brown', 600, 0.15); 
                // Slight Pink noise for "foam" hiss
                playNoise(ctx, 'pink', 800, 0.12);
                break;

            case 'river_flow':
                // Steady Brown noise, higher filter
                playNoise(ctx, 'brown', 900, 0); 
                playNoise(ctx, 'pink', 400, 0);
                break;

            case 'rain_storm':
                // Pink noise steady
                playNoise(ctx, 'pink', 1200, 0);
                // Thunder Loop
                const tInt = window.setInterval(() => {
                    if (Math.random() > 0.7) triggerThunder(ctx);
                }, 5000);
                intervalsRef.current.push(tInt);
                break;

            case 'forest_birds':
                // Wind background
                playNoise(ctx, 'pink', 300, 0.05); 
                // Birds Loop
                const bInt = window.setInterval(() => {
                    if (Math.random() > 0.4) triggerBird(ctx);
                }, 1200);
                intervalsRef.current.push(bInt);
                break;

            case 'zen_music':
                // Major Chord Pad (C E G)
                playDrone(ctx, [261.63, 329.63, 392.00], 'triangle'); // C4, E4, G4
                playDrone(ctx, [130.81], 'sine'); // C3 Bass
                // Subtle texture
                playNoise(ctx, 'pink', 100, 0.1); 
                break;

            case 'deep_relax':
                // Low Drones (A2, E3)
                playDrone(ctx, [110.00, 164.81], 'sine');
                playNoise(ctx, 'brown', 200, 0.05);
                break;

            case 'windy':
                // Modulated Pink Noise
                playNoise(ctx, 'pink', 500, 0.2); // Faster modulation for gusty wind
                playNoise(ctx, 'brown', 300, 0.1);
                break;
        }
    };

    const togglePlayback = () => {
        if (isPlaying) {
            stopAudio();
            if (audioCtxRef.current) audioCtxRef.current.suspend();
            setIsPlaying(false);
        } else {
            startEngine(currentProfile);
        }
    };

    const changeTrack = (profile: SoundProfile) => {
        setCurrentProfile(profile);
        if (isPlaying) {
            startEngine(profile);
        }
        setShowMenu(false);
    };

    // React to volume changes live
    useEffect(() => {
        if (masterGainRef.current) {
            masterGainRef.current.gain.setTargetAtTime(volume, audioCtxRef.current?.currentTime || 0, 0.1);
        }
    }, [volume]);

    return (
        <div className="fixed top-20 right-4 z-40 flex flex-col items-end gap-2">
            <div className="flex gap-2 items-center bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-lg">
                
                <button 
                    onClick={() => setShowMenu(!showMenu)}
                    className={`p-2 rounded-full transition-colors flex items-center justify-center w-10 h-10 ${showMenu ? 'bg-ifa-gold text-black' : 'text-ifa-gold hover:bg-white/10'}`}
                    title="Escolher Som"
                >
                    <ListMusic size={18} />
                </button>
                
                <button 
                    onClick={togglePlayback}
                    className={`p-2 rounded-full transition-all duration-500 flex items-center justify-center w-10 h-10 ${!isPlaying ? 'text-ifa-neutral hover:text-white' : 'bg-green-600 text-white animate-pulse-slow'}`}
                    title={isPlaying ? "Parar" : "Tocar"}
                >
                    {!isPlaying ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
            </div>

            {showMenu && (
                <div className="bg-[#1a1510]/95 border border-[#5D4037] rounded-xl p-3 shadow-2xl flex flex-col gap-2 w-64 animate-fade-in origin-top-right backdrop-blur-md max-h-80 overflow-y-auto">
                    <div className="flex justify-between items-center px-2 mb-1 border-b border-white/10 pb-2">
                        <span className="text-[10px] uppercase font-bold text-ifa-neutral">Ambiente (Gerador)</span>
                        <div className="flex items-center gap-2">
                            <Volume2 size={12} className="text-ifa-neutral"/>
                            <input 
                                type="range" 
                                min="0" max="1" step="0.05" 
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-16 h-1.5 accent-ifa-gold bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>
                    {SOUND_PROFILES.map((profile) => (
                        <button
                            key={profile.id}
                            onClick={() => changeTrack(profile)}
                            className={`flex items-start gap-3 p-2 rounded-lg text-left transition-colors border ${currentProfile.id === profile.id ? 'bg-[#5D4037] border-[#D4AF37] text-[#F5F5DC]' : 'border-transparent text-ifa-text hover:bg-white/5'}`}
                        >
                            <span className={`mt-1 p-1 rounded-full ${currentProfile.id === profile.id ? 'bg-[#D4AF37] text-black' : 'bg-black/30 text-ifa-neutral'}`}>
                                {profile.icon}
                            </span>
                            <div className="flex-grow">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold block">{profile.name}</span>
                                    {currentProfile.id === profile.id && isPlaying && (
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                                    )}
                                </div>
                                <span className="text-[9px] opacity-70 leading-tight block">{profile.description}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AmbiencePlayer;