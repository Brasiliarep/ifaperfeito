
import React, { useState } from 'react';
import { ArrowLeft, UserCheck, Disc, Mic2 } from 'lucide-react';
import TextReader from './TextReader';

const ZONES = [
    { 
        id: 'iwaju', 
        label: 'Iwájú (Testa)', 
        meaning: 'Visão, Futuro, Sorte.', 
        material: 'Obi, Água, Orogbo.', 
        prayer: 'Iwájú o! Ki n riran. (Testa! Que eu tenha visão e clareza para enxergar meu destino.)' 
    },
    { 
        id: 'atari', 
        label: 'Àtàrí (Topo)', 
        meaning: 'Conexão Divina, Orixá Pessoal.', 
        material: 'Ori, Efun, Mel, Algodão.', 
        prayer: 'Ori mi gbe mi. Ori mi la mi. Ko sosa ti i da ni lehin ori eni. (Meu Ori me apoie. Ninguém pode ajudar mais que o próprio Ori.)' 
    },
    { 
        id: 'ipako', 
        label: 'Ipákó (Nuca)', 
        meaning: 'Passado, Ancestrais, Suporte.', 
        material: 'Atare, Gim (Oti).', 
        prayer: 'Eyin mi o! Ki n ma subu. Egbe mi leyin mi. (Minhas costas! Que eu não caia. Meus ancestrais me suportem.)' 
    },
    { 
        id: 'okan', 
        label: 'Ọkàn (Peito)', 
        meaning: 'Emoção, Caráter (Iwa), Sentimento.', 
        material: 'Água fresca, Folha da Costa (Odundun).', 
        prayer: 'Okan mi bale. Odundun a dun okan. (Meu coração está calmo. Odundun acalma o coração.)' 
    },
    { 
        id: 'owo', 
        label: 'Ọwọ (Mãos)', 
        meaning: 'Trabalho, Ação, Receber e Dar.', 
        material: 'Sabão da Costa (Ose), Ewe Aje.', 
        prayer: 'Owo mi a gbe ire. Owo mi a mu owo. (Minhas mãos carregarão sorte. Minhas mãos segurarão dinheiro.)' 
    },
    { 
        id: 'ese', 
        label: 'Ẹsẹ (Pés)', 
        meaning: 'Caminhos, Movimento, Viagens.', 
        material: 'Oti, Gin, Dendê (para caminhos).', 
        prayer: 'Ese mi a rin ona ire. Ese mi ko ni rin si ibi. (Meus pés andarão caminhos bons. Meus pés não andarão para o mal.)' 
    }
];

const InteractiveEbori = ({ onBack }: { onBack: () => void }) => {
    const [activeZone, setActiveZone] = useState<any>(null);

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><UserCheck size={20}/> Alinhamento Ori & Ara</h1>
                <div className="w-6"></div>
            </div>

            <div className="flex flex-col items-center relative w-full max-w-sm">
                {/* Abstract Body Visualization */}
                <div className="w-64 h-[420px] bg-[#2a2420] rounded-[100px] border-4 border-[#5D4037] relative shadow-2xl mb-8 flex justify-center">
                    
                    {/* ZONES */}
                    {/* Atari */}
                    <button 
                        onClick={() => setActiveZone(ZONES[1])}
                        className={`absolute top-4 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all z-10 ${activeZone?.id === 'atari' ? 'bg-ifa-gold border-white scale-125 shadow-glow' : 'bg-white/10 border-ifa-gold/50 hover:bg-white/20'}`}
                    >
                        <Disc size={20} />
                    </button>

                    {/* Iwaju */}
                    <button 
                        onClick={() => setActiveZone(ZONES[0])}
                        className={`absolute top-16 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all z-10 ${activeZone?.id === 'iwaju' ? 'bg-ifa-gold border-white scale-125' : 'bg-white/10 border-ifa-gold/50 hover:bg-white/20'}`}
                    >
                        <Disc size={16} />
                    </button>

                    {/* Ipako (Hidden behind/simulated by side pos or just abstract) - placing near neck */}
                    <button 
                        onClick={() => setActiveZone(ZONES[2])}
                        className={`absolute top-24 -right-4 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all z-10 ${activeZone?.id === 'ipako' ? 'bg-ifa-gold border-white scale-125' : 'bg-white/10 border-ifa-gold/50 hover:bg-white/20'}`}
                    >
                        <Disc size={12} />
                    </button>

                    {/* Okan (Chest) */}
                    <button 
                        onClick={() => setActiveZone(ZONES[3])}
                        className={`absolute top-36 w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all z-10 ${activeZone?.id === 'okan' ? 'bg-ifa-gold border-white scale-125' : 'bg-white/10 border-ifa-gold/50 hover:bg-white/20'}`}
                    >
                        <Disc size={24} />
                    </button>

                    {/* Owo (Hands - Abstracted to sides) */}
                    <button 
                        onClick={() => setActiveZone(ZONES[4])}
                        className={`absolute top-48 -left-8 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all z-10 ${activeZone?.id === 'owo' ? 'bg-ifa-gold border-white scale-125' : 'bg-white/10 border-ifa-gold/50 hover:bg-white/20'}`}
                    >
                        <Disc size={16} />
                    </button>
                    <button 
                        onClick={() => setActiveZone(ZONES[4])}
                        className={`absolute top-48 -right-8 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all z-10 ${activeZone?.id === 'owo' ? 'bg-ifa-gold border-white scale-125' : 'bg-white/10 border-ifa-gold/50 hover:bg-white/20'}`}
                    >
                        <Disc size={16} />
                    </button>

                    {/* Ese (Feet - Bottom) */}
                    <button 
                        onClick={() => setActiveZone(ZONES[5])}
                        className={`absolute bottom-4 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all z-10 ${activeZone?.id === 'ese' ? 'bg-ifa-gold border-white scale-125' : 'bg-white/10 border-ifa-gold/50 hover:bg-white/20'}`}
                    >
                        <Disc size={20} />
                    </button>

                    {/* Body Outline Hints */}
                    <div className="absolute top-28 w-40 h-[1px] bg-[#5D4037] opacity-50"></div> {/* Shoulders */}
                    <div className="absolute top-28 h-64 w-[1px] bg-[#5D4037] opacity-30"></div> {/* Spine */}
                </div>

                {/* Info Panel */}
                <div className="w-full bg-ifa-base border border-ifa-border rounded-xl p-6 min-h-[220px]">
                    {activeZone ? (
                        <div className="animate-fade-in">
                            <h3 className="text-xl font-bold text-ifa-gold mb-2">{activeZone.label}</h3>
                            <p className="text-sm text-ifa-neutral mb-4">{activeZone.meaning}</p>
                            
                            <div className="mb-4">
                                <span className="text-xs uppercase font-bold text-ifa-text-light block mb-1">Materiais:</span>
                                <span className="text-sm">{activeZone.material}</span>
                            </div>

                            <div className="bg-black/20 p-3 rounded border-l-4 border-ifa-gold">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="text-xs uppercase font-bold text-ifa-neutral block mb-1">Reza (Ofo):</span>
                                        <p className="italic text-ifa-text text-sm">{activeZone.prayer}</p>
                                    </div>
                                    <div className="ml-2">
                                        <TextReader text={activeZone.prayer} forceLang="yo-NG" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-ifa-neutral mt-10">Toque em um ponto do corpo para ver o fundamento e ouvir a reza.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InteractiveEbori;
