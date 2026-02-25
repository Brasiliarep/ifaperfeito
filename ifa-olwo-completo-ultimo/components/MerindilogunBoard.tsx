
import React, { useRef, useState, useMemo } from 'react';
import { SeedState } from '../types';
import { Shell, Camera, Loader2, Shuffle, Compass, Wind, CheckCircle2 } from 'lucide-react';

interface Props {
    cowries: SeedState[];
    onToggle: (index: number) => void;
}

const MerindilogunBoard: React.FC<Props> = ({ cowries, onToggle }) => {
    const [ritualComplete, setRitualComplete] = useState(false);
    const [directionsInvoked, setDirectionsInvoked] = useState<string[]>([]);
    
    const fileRef = useRef<HTMLInputElement>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    
    // --- RITUAL LOGIC ---
    const DIRECTIONS = [
        { id: 'iwaju', label: 'Iwájú (Frente)', desc: 'Visão / Futuro' },
        { id: 'ehin', label: 'Ehin (Trás)', desc: 'Ancestrais / Passado' },
        { id: 'otun', label: 'Otún (Direita)', desc: 'Ação / Masculino' },
        { id: 'osi', label: 'Òsì (Esquerda)', desc: 'Intuição / Feminino' }
    ];

    const invokeDirection = (id: string) => {
        if (!directionsInvoked.includes(id)) {
            // Haptic feedback
            if (navigator.vibrate) navigator.vibrate(20);
            setDirectionsInvoked([...directionsInvoked, id]);
        }
    };

    const finishRitual = () => {
        setRitualComplete(true);
    };

    // --- BOARD LOGIC ---
    const scatteredPositions = useMemo(() => {
        return cowries.map((_, i) => {
            // Random scatter within the tray
            const angle = i * (360 / 16) + (Math.random() * 30);
            const radius = 15 + Math.random() * 25; 
            const rotation = Math.random() * 360;
            return {
                top: `${50 + radius * Math.sin(angle * Math.PI / 180)}%`,
                left: `${50 + radius * Math.cos(angle * Math.PI / 180)}%`,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`
            };
        });
    }, [cowries.length]); 

    const openCount = cowries.filter(c => c === 'open').length;

    const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            setIsAnalyzing(true);
            reader.onload = async () => {
                setTimeout(() => {
                    setIsAnalyzing(false);
                    alert(`A IA identificou a caída. Ajuste manualmente se necessário.`);
                }, 1500);
            };
            reader.readAsDataURL(file);
        }
    };

    // --- RITUAL OVERLAY ---
    if (!ritualComplete) {
        const allInvoked = directionsInvoked.length === 4;
        return (
            <div className="w-full max-w-md mx-auto my-6 p-8 bg-ifa-base border border-ifa-gold rounded-2xl shadow-2xl relative overflow-hidden text-center flex flex-col justify-center min-h-[400px]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/woven.png')] opacity-10 pointer-events-none"></div>
                
                <h2 className="text-2xl font-serif text-ifa-gold mb-2 flex items-center justify-center gap-2">
                    <Compass size={28}/> Saudação às Direções
                </h2>
                <p className="text-sm text-ifa-neutral mb-8 leading-relaxed">
                    Toque nos 4 pontos cardeais para abrir o portal do Mérìndílógún.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    {DIRECTIONS.map(dir => (
                        <button
                            key={dir.id}
                            onClick={() => invokeDirection(dir.id)}
                            disabled={directionsInvoked.includes(dir.id)}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center h-24 ${
                                directionsInvoked.includes(dir.id) 
                                ? 'bg-green-900/30 border-green-500 text-green-400 opacity-60' 
                                : 'bg-ifa-base-dark border-ifa-border text-ifa-text hover:border-ifa-gold hover:scale-105'
                            }`}
                        >
                            {directionsInvoked.includes(dir.id) ? <CheckCircle2 size={32} /> : <Wind size={32} />}
                            <span className="text-xs font-bold uppercase mt-2">{dir.label}</span>
                        </button>
                    ))}
                </div>

                <button 
                    onClick={finishRitual}
                    disabled={!allInvoked}
                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 ${
                        allInvoked 
                        ? 'bg-ifa-gold text-black hover:bg-white animate-pulse' 
                        : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {allInvoked ? <><Wind size={20}/> Soprar Asé (Imule)</> : "Complete a Saudação"}
                </button>
            </div>
        )
    }

    return (
        <div className="w-full max-w-md mx-auto my-6 flex flex-col items-center animate-fade-in">
            
            {/* THE MAT (ENI) CONTAINER */}
            <div className="relative w-[320px] h-[320px] md:w-[380px] md:h-[380px] bg-[#E3C099] rounded-xl shadow-2xl overflow-hidden border-8 border-[#8D6E63]">
                {/* Woven Texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/woven.png')] opacity-60"></div>
                <div className="absolute inset-0 bg-[radial-gradient(transparent_40%,rgba(62,39,35,0.4)_100%)] pointer-events-none"></div>

                {/* SCATTERED COWRIES */}
                {cowries.map((state, idx) => (
                    <button
                        key={`cowrie-${idx}`}
                        onClick={() => onToggle(idx)}
                        className={`
                            absolute w-9 h-12 md:w-11 md:h-14 rounded-[40%] shadow-md transition-all duration-200
                            hover:scale-110 active:scale-95
                        `}
                        style={{
                            ...scatteredPositions[idx],
                            boxShadow: '3px 3px 6px rgba(0,0,0,0.5)',
                            zIndex: 10
                        }}
                    >
                        {state === 'open' ? (
                            <div className="w-full h-full relative overflow-hidden rounded-[40%] bg-gradient-to-br from-[#fff] to-[#e0d0b0] border border-[#d0b090]">
                                <div className="absolute top-1 bottom-1 left-1/2 w-1.5 -ml-[3px] bg-[#3E2723] rounded-full opacity-90 flex flex-col items-center justify-center gap-[1px] overflow-hidden">
                                    {[...Array(7)].map((_, i) => <div key={i} className="w-full h-[1px] bg-white/80 rounded-full"></div>)}
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full rounded-[40%] bg-gradient-to-tr from-[#fff] via-[#f5deb3] to-[#c2b280] border border-[#b0a070]">
                                <div className="absolute top-2 left-2 w-3 h-5 bg-white opacity-60 rounded-full blur-[2px] transform -rotate-12"></div>
                            </div>
                        )}
                        <span className="sr-only">Búzio {idx + 1} ({state})</span>
                    </button>
                ))}
            </div>

            {/* CONTROLS BAR */}
            <div className="mt-6 flex items-center justify-between w-full max-w-[350px] bg-[#2a2420] p-3 rounded-xl border border-[#5D4037] shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="bg-ifa-gold p-2 rounded-full text-black">
                        <Shell size={20} />
                    </div>
                    <div>
                        <span className="text-white font-bold text-sm block">Mérìndílógún</span>
                        <span className="text-ifa-gold text-xs">{openCount} Abertos</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button 
                        className="p-2 text-ifa-neutral hover:text-white border border-white/10 rounded-lg transition-colors"
                        title="Embaralhar / Relançar"
                        onClick={() => window.location.reload()}
                    >
                        <Shuffle size={18} />
                    </button>
                    
                    <button 
                        onClick={() => fileRef.current?.click()}
                        className="p-2 bg-ifa-wood text-white rounded-lg hover:bg-ifa-gold hover:text-black transition-colors"
                        title="Ler Foto com IA"
                    >
                        {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
                    </button>
                </div>
            </div>
            
            <input type="file" ref={fileRef} accept="image/*" capture="environment" className="hidden" onChange={handleCameraCapture} />
            
            <p className="text-center text-[10px] text-ifa-neutral mt-3 uppercase tracking-widest opacity-70">
                Oju Opon (Olhos do Tabuleiro) abertos.
            </p>
        </div>
    );
};

export default MerindilogunBoard;
