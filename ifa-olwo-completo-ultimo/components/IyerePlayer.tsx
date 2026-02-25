
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Music, Mic2, PlayCircle, PauseCircle, Volume2, VolumeX, Drum } from 'lucide-react';

const IYERE_SONGS = [
    {
        title: "Iba Ose (Saudação)",
        odu: "Geral",
        lyrics: [
            "Iba Ose, Iba Ose o",
            "Iba Ose, Iba Ose o",
            "Baba wa o, Iba Ose o",
            "Orunmila Iba Ose o"
        ],
        tempo: 500
    },
    {
        title: "Ejiogbe Chanting",
        odu: "Ejiogbe",
        lyrics: [
            "Ejiogbe ni o gbe mi",
            "Ejiogbe ni o gbe mi leke",
            "Ki n ma subu, ki n ma yin",
            "Ejiogbe a gbe wa o"
        ],
        tempo: 600
    },
    {
        title: "Ose Oyeku (Para Ancestrais)",
        odu: "Oyeku Meji",
        lyrics: [
            "Ose o, Ose o",
            "Oyeku ma ye",
            "Ye ku ma ye",
            "Iku ye lori wa o"
        ],
        tempo: 800
    }
];

const IyerePlayer = ({ onBack }: { onBack: () => void }) => {
    const [selectedSong, setSelectedSong] = useState(IYERE_SONGS[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isDrumLoopActive, setIsDrumLoopActive] = useState(false);
    const [useGuideVocal, setUseGuideVocal] = useState(true); 
    const [activeIndex, setActiveIndex] = useState(0);
    
    const audioContextRef = useRef<AudioContext | null>(null);
    const rhythmIntervalRef = useRef<number | null>(null);
    const drumLoopIntervalRef = useRef<number | null>(null);
    const lyricTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => stopAll();
    }, []);

    const playDrumSound = (type: 'high' | 'low' | 'slap') => {
        if (!audioContextRef.current) {
             audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
        const ctx = audioContextRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'low') {
            // Omele Low
            osc.frequency.setValueAtTime(150, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            gain.gain.setValueAtTime(0.6, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        } else if (type === 'high') {
            // Omele High
            osc.frequency.setValueAtTime(300, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        } else {
            // Slap (Noise)
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            gain.gain.setValueAtTime(0.2, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        }

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
    };

    const toggleDrumLoop = () => {
        if (isDrumLoopActive) {
            if (drumLoopIntervalRef.current) clearInterval(drumLoopIntervalRef.current);
            setIsDrumLoopActive(false);
        } else {
            setIsDrumLoopActive(true);
            let step = 0;
            // Simple Adamo Pattern (approx)
            drumLoopIntervalRef.current = window.setInterval(() => {
                const pattern = [
                    'low', null, 'high', null, 
                    'low', 'low', 'high', null,
                    'slap', null, 'low', null
                ];
                const sound = pattern[step % pattern.length];
                if (sound) playDrumSound(sound as any);
                step++;
            }, 200); // Fast pace
        }
    }

    const handlePlay = () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }

        setIsPlaying(true);
        setActiveIndex(0);

        // Simple Metronome for the song itself if drum loop isn't active, 
        // or just let the drum loop handle rhythm if user wants.
        // Here we just keep a basic click track for lyrics sync visually.
        
        if (useGuideVocal) {
            queueNextLine(0);
        } else {
            // Just visual scroll
            scrollLyrics(0);
        }
    };

    const scrollLyrics = (index: number) => {
        if (index >= selectedSong.lyrics.length) {
            scrollLyrics(0);
            return;
        }
        setActiveIndex(index);
        lyricTimeoutRef.current = window.setTimeout(() => {
            scrollLyrics(index + 1);
        }, selectedSong.tempo * 4);
    }

    const queueNextLine = (index: number) => {
        if (index >= selectedSong.lyrics.length) {
            // Loop
            queueNextLine(0);
            return;
        }

        setActiveIndex(index);
        
        // Cancel previous
        window.speechSynthesis.cancel();

        const u = new SpeechSynthesisUtterance(selectedSong.lyrics[index]);
        u.rate = 0.8;
        u.pitch = 1.0;
        
        // Try to get a native voice if possible, else default
        const voices = window.speechSynthesis.getVoices();
        const yoVoice = voices.find(v => v.lang.includes('yo'));
        if (yoVoice) u.voice = yoVoice;

        u.onend = () => {
            if (isPlaying) {
                // Small delay between lines for rhythm
                setTimeout(() => queueNextLine(index + 1), 200); 
            }
        };
        
        window.speechSynthesis.speak(u);
    };

    const stopAll = () => {
        if (rhythmIntervalRef.current) clearInterval(rhythmIntervalRef.current);
        if (drumLoopIntervalRef.current) clearInterval(drumLoopIntervalRef.current);
        if (lyricTimeoutRef.current) clearTimeout(lyricTimeoutRef.current);
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setIsDrumLoopActive(false);
        setActiveIndex(0);
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8 flex flex-col">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => { stopAll(); onBack(); }} className="text-ifa-neutral hover:text-ifa-text">
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                    <Mic2 size={24} /> Modo Iyere (Karaokê)
                </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto w-full">
                <div className="w-full md:w-1/3 bg-ifa-base border border-ifa-border rounded-xl p-4">
                    <h3 className="text-ifa-gold font-bold uppercase text-xs mb-4">Cânticos Disponíveis</h3>
                    <div className="space-y-2">
                        {IYERE_SONGS.map(song => (
                            <button 
                                key={song.title}
                                onClick={() => { stopAll(); setSelectedSong(song); }}
                                className={`w-full text-left p-3 rounded flex items-center gap-3 transition-colors ${selectedSong.title === song.title ? 'bg-ifa-gold text-ifa-base font-bold' : 'hover:bg-ifa-surface'}`}
                            >
                                <Music size={16} />
                                <div>
                                    <div className="text-sm">{song.title}</div>
                                    <div className="text-[10px] opacity-70">{song.odu}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-2/3 bg-ifa-base border border-ifa-border rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
                    <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                    
                    <h2 className="text-2xl font-serif text-ifa-text font-bold mb-4 relative z-10">{selectedSong.title}</h2>

                    <div className="relative z-10 flex gap-4 mb-8">
                        <button 
                            onClick={() => { if(isPlaying) stopAll(); setUseGuideVocal(!useGuideVocal); }}
                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase border transition-colors ${useGuideVocal ? 'bg-green-900 text-green-300 border-green-500' : 'bg-ifa-surface text-ifa-neutral border-ifa-border'}`}
                        >
                            {useGuideVocal ? <Volume2 size={14} /> : <VolumeX size={14} />}
                            {useGuideVocal ? "Voz Guia: ON" : "Voz Guia: OFF"}
                        </button>
                        
                        <button 
                            onClick={toggleDrumLoop}
                            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase border transition-all ${isDrumLoopActive ? 'bg-orange-900 text-orange-300 border-orange-500 animate-pulse' : 'bg-ifa-surface text-ifa-neutral border-ifa-border'}`}
                        >
                            <Drum size={14} />
                            {isDrumLoopActive ? "Atabaque: ON" : "Atabaque: OFF"}
                        </button>
                    </div>

                    <div className="space-y-6 text-center mb-12 relative z-10 w-full flex flex-col justify-center">
                        {selectedSong.lyrics.map((line, idx) => (
                            <p 
                                key={idx} 
                                className={`text-xl md:text-3xl transition-all duration-300 font-serif leading-relaxed ${
                                    idx === activeIndex && isPlaying 
                                    ? 'text-ifa-gold scale-110 font-bold drop-shadow-md opacity-100' 
                                    : 'text-ifa-neutral opacity-30 blur-[1px]'
                                }`}
                            >
                                {line}
                            </p>
                        ))}
                    </div>

                    <div className="flex gap-4 relative z-10">
                        {!isPlaying ? (
                            <button onClick={handlePlay} className="p-4 bg-ifa-gold text-ifa-base rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-ifa-gold/50">
                                <PlayCircle size={48} />
                            </button>
                        ) : (
                            <button onClick={stopAll} className="p-4 bg-red-900/50 text-red-500 border border-red-500 rounded-full hover:scale-110 transition-transform">
                                <PauseCircle size={48} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IyerePlayer;
