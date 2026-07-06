import React, { useState, useEffect } from 'react';
import { ArrowLeft, Wind, Flame, Moon, Leaf, Sparkles, HelpCircle, RefreshCw } from 'lucide-react';

const Igbadu = ({ onBack }: { onBack: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedElement, setSelectedElement] = useState<number | null>(null);

    const elements = [
        {
            name: 'Edu (Carvão Sagrado)',
            yoruba: 'Edu (Norte / Àríwá)',
            color: 'from-purple-600/20 to-purple-950/40 border-b border-r border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.3)]',
            textColor: 'text-purple-300',
            glowColor: 'rgba(168,85,247,0.4)',
            icon: Moon,
            meaning: 'Representa a absorção das energias negativas, a noite cósmica, a capacidade de transmutação e a força implacável de Eṣù. É o mistério que antecede a criação.',
            orixa: 'Eṣù / Àjògún',
            conselho: 'Momento de silenciar, recolher-se e purificar os caminhos antes de agir. Use a sabedoria para reter o mal e transmutá-lo em força viva.'
        },
        {
            name: 'Efun (Giz Branco)',
            yoruba: 'Efun (Leste / Ìlà Oòrùn)',
            color: 'from-white/20 to-slate-200/40 border-b border-l border-white/60 shadow-[0_0_25px_rgba(255,255,255,0.45)]',
            textColor: 'text-slate-300',
            glowColor: 'rgba(255,255,255,0.5)',
            icon: Wind,
            meaning: 'Representa a clareza espiritual, a paz divina (Àlàfia), a pureza cósmica e a presença do grande pai Obatalá. É a luz fria que traz ordem do caos primordial.',
            orixa: 'Òrìṣàálá (Obatalá)',
            conselho: 'Busque clareza mental e calma. Afaste o estresse e a pressa. Vista roupas brancas (Funfun) e use água fria para acalmar seu Orí.'
        },
        {
            name: 'Osun (Pó Vermelho)',
            yoruba: 'Osun (Oeste / Ìwọ Oòrùn)',
            color: 'from-red-600/20 to-red-950/40 border-t border-r border-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.35)]',
            textColor: 'text-red-300',
            glowColor: 'rgba(239,68,68,0.45)',
            icon: Flame,
            meaning: 'Representa a força vital ativa, a circulação do sangue, a paixão, a fertilidade feminina e a proteção mágica de Ọ̀ṣun e das Ìyámi Oṣòròngá. É o calor do axé.',
            orixa: 'Ọ̀ṣun / Ìyámi Oṣòròngá',
            conselho: 'Ative sua força interior e magnetismo pessoal. Excelente período para rituais de atração, prosperidade e proteção energética contra perigos ocultos.'
        },
        {
            name: 'Ero (Terra e Folhas)',
            yoruba: 'Ero (Sul / Gúsù)',
            color: 'from-amber-600/20 to-amber-950/40 border-t border-l border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.3)]',
            textColor: 'text-amber-300',
            glowColor: 'rgba(245,158,11,0.35)',
            icon: Leaf,
            meaning: 'Representa a estabilidade física, a fertilidade da terra, a cura divina através das folhas sagradas (Ewe) e o enraizamento profundo na ancestralidade (Egúngún).',
            orixa: 'Egúngún / Òsányìn',
            conselho: 'Conecte-se com suas raízes familiares e ancestrais. Pise descalço na terra e prepare banhos de folhas frescas para consolidar projetos materiais.'
        }
    ];

    // Determine dominant element by time
    const hour = new Date().getHours();
    const dominantIndex = hour % 4;

    // Default selection to dominant element on load
    useEffect(() => {
        if (selectedElement === null) {
            setSelectedElement(dominantIndex);
        }
    }, [dominantIndex]);

    const activeEl = selectedElement !== null ? elements[selectedElement] : elements[dominantIndex];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0805] via-[#040404] to-black text-ifa-text p-4 md:p-8 flex flex-col items-center relative overflow-hidden">
            {/* Custom Styles for Mystical Effects */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes float-igbadu {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes orbit-gold {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-float-igbadu {
                    animation: float-igbadu 6s ease-in-out infinite;
                }
                .animate-orbit-gold {
                    animation: orbit-gold 40s linear infinite;
                }
            `}} />

            {/* Background Light Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-950/10 via-transparent to-transparent pointer-events-none"></div>

            {/* Navbar */}
            <div className="w-full max-w-2xl flex items-center justify-between mb-8 z-10">
                <button 
                    onClick={onBack} 
                    className="text-ifa-neutral hover:text-ifa-gold p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-ifa-gold/50 transition-all shadow-lg"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl md:text-2xl font-serif text-ifa-gold tracking-widest font-bold flex items-center gap-2">
                    <Sparkles size={18} className="text-ifa-gold animate-pulse" /> IGBADU VIRTUAL
                </h1>
                <button 
                    onClick={() => alert("Igbadu representa a cabaça da existência. O hemisfério superior é o Orun (Céu) e o inferior o Aye (Terra). Ao abrir, revelam-se os quatro elementos cósmicos primordiais que regem a harmonia cósmica.")}
                    className="text-ifa-neutral hover:text-ifa-gold p-2.5 rounded-full bg-white/5 border border-white/10 transition-all shadow-lg"
                    title="Explicar Ritual"
                >
                    <HelpCircle size={20} />
                </button>
            </div>

            {/* Main Interactive Stage */}
            <div className="flex flex-col items-center justify-center flex-grow w-full max-w-xl z-10 mb-8">
                
                {/* Fixed Outer Frame that handles centering and size strictly */}
                <div className="relative w-[290px] h-[290px] md:w-[360px] md:h-[360px] flex-shrink-0 aspect-square flex items-center justify-center">
                    
                    {/* Golden Celestial Compass Ring (Surrounds the gourd) */}
                    <div className={`absolute w-[350px] h-[350px] md:w-[430px] md:h-[430px] pointer-events-none transition-opacity duration-1000 flex items-center justify-center ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                        <svg viewBox="0 0 100 100" className="w-full h-full absolute animate-orbit-gold pointer-events-none">
                            {/* Outer dotted gold circle */}
                            <circle cx="50" cy="50" r="48" fill="none" stroke="#c49e30" strokeWidth="0.6" strokeDasharray="1,5" strokeLinecap="round" opacity="0.8" />
                            {/* Inner thin gold circle */}
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(196,158,48,0.25)" strokeWidth="0.4" />
                            {/* Cardinal ticks (North, South, East, West) */}
                            <line x1="50" y1="2" x2="50" y2="7" stroke="#c49e30" strokeWidth="0.8" />
                            <line x1="50" y1="93" x2="50" y2="98" stroke="#c49e30" strokeWidth="0.8" />
                            <line x1="2" y1="50" x2="7" y2="50" stroke="#c49e30" strokeWidth="0.8" />
                            <line x1="93" y1="50" x2="98" y2="50" stroke="#c49e30" strokeWidth="0.8" />
                            
                            {/* Diagonal tiny gold stars/markers */}
                            <circle cx="18.2" cy="18.2" r="1.2" fill="#c49e30" />
                            <circle cx="81.8" cy="18.2" r="1.2" fill="#c49e30" />
                            <circle cx="18.2" cy="81.8" r="1.2" fill="#c49e30" />
                            <circle cx="81.8" cy="81.8" r="1.2" fill="#c49e30" />
                        </svg>
                    </div>

                    {/* 1. CLOSED STATE (Photorealistic Gourd - Perfect Circle) */}
                    <div 
                        onClick={() => setIsOpen(true)}
                        className={`absolute w-full h-full rounded-full border-2 border-ifa-gold/30 bg-neutral-900/40 p-1 shadow-[0_0_35px_rgba(212,175,55,0.15)] overflow-hidden transition-all duration-700 cursor-pointer flex items-center justify-center select-none ${
                            isOpen 
                            ? 'scale-110 opacity-0 pointer-events-none rotate-12' 
                            : 'scale-100 opacity-100 hover:border-ifa-gold/60 animate-float-igbadu'
                        }`}
                    >
                        <img 
                            src="./igbadu_closed.png" 
                            alt="Igbadu Fechado" 
                            className="w-full h-full object-cover rounded-full pointer-events-none"
                            onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?q=80&w=400';
                            }}
                        />
                        <div className="absolute inset-0 bg-black/40 hover:bg-black/25 transition-colors flex flex-col items-center justify-center p-4">
                            <div className="w-14 h-14 rounded-full bg-black/75 border border-ifa-gold/40 flex items-center justify-center backdrop-blur-sm mb-3">
                                <Sparkles size={20} className="text-ifa-gold animate-pulse" />
                            </div>
                            <p className="text-ifa-gold text-[9px] tracking-[4px] uppercase font-serif text-center font-bold px-4 py-1.5 bg-black/60 border border-ifa-gold/20 rounded-full backdrop-blur-sm">
                                Toque para Abrir
                            </p>
                        </div>
                    </div>

                    {/* 2. OPEN STATE (Interactive Altar Gourd - Perfect Circle) */}
                    <div 
                        className={`absolute w-full h-full rounded-full border-2 border-ifa-gold/40 bg-black/60 p-1 shadow-[0_0_40px_rgba(212,175,55,0.25)] overflow-hidden transition-all duration-700 flex items-center justify-center select-none ${
                            isOpen 
                            ? 'scale-100 opacity-100 rotate-0' 
                            : 'scale-90 opacity-0 pointer-events-none -rotate-12'
                        }`}
                    >
                        {/* Photorealistic Open Calabash Background */}
                        <img 
                            src="./igbadu_open.png" 
                            alt="Igbadu Aberto" 
                            className="w-full h-full object-cover rounded-full pointer-events-none"
                            onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=400';
                            }}
                        />

                        {/* Interactive Clickable Overlay Grid (Z-Index above background) */}
                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 z-20">
                            {/* TOP-LEFT: Osun (Oeste) - Index 2 */}
                            <button 
                                onClick={() => setSelectedElement(2)}
                                className={`relative flex flex-col items-center justify-center p-3 transition-all duration-300 ${
                                    selectedElement === 2 
                                    ? `bg-gradient-to-br ${elements[2].color} opacity-100` 
                                    : 'bg-black/5 hover:bg-white/5 opacity-0 hover:opacity-60'
                                }`}
                            >
                                <Flame size={22} className={selectedElement === 2 ? 'text-red-300 animate-pulse' : 'text-white/60'} />
                                <span className="text-[10px] font-serif mt-1.5 text-white/90">Osun</span>
                                {dominantIndex === 2 && (
                                    <span className="absolute top-3 left-3 text-[6px] bg-ifa-gold text-black font-bold px-1.5 py-0.5 rounded uppercase tracking-widest leading-none">DOM</span>
                                )}
                            </button>

                            {/* TOP-RIGHT: Efun (Leste) - Index 1 */}
                            <button 
                                onClick={() => setSelectedElement(1)}
                                className={`relative flex flex-col items-center justify-center p-3 transition-all duration-300 ${
                                    selectedElement === 1 
                                    ? `bg-gradient-to-bl ${elements[1].color} opacity-100` 
                                    : 'bg-black/5 hover:bg-white/5 opacity-0 hover:opacity-60'
                                }`}
                            >
                                <Wind size={22} className={selectedElement === 1 ? 'text-slate-200 animate-pulse' : 'text-white/60'} />
                                <span className="text-[10px] font-serif mt-1.5 text-white/90">Efun</span>
                                {dominantIndex === 1 && (
                                    <span className="absolute top-3 right-3 text-[6px] bg-ifa-gold text-black font-bold px-1.5 py-0.5 rounded uppercase tracking-widest leading-none">DOM</span>
                                )}
                            </button>

                            {/* BOTTOM-LEFT: Edu (Norte) - Index 0 */}
                            <button 
                                onClick={() => setSelectedElement(0)}
                                className={`relative flex flex-col items-center justify-center p-3 transition-all duration-300 ${
                                    selectedElement === 0 
                                    ? `bg-gradient-to-tr ${elements[0].color} opacity-100` 
                                    : 'bg-black/5 hover:bg-white/5 opacity-0 hover:opacity-60'
                                }`}
                            >
                                <Moon size={22} className={selectedElement === 0 ? 'text-purple-300 animate-pulse' : 'text-white/60'} />
                                <span className="text-[10px] font-serif mt-1.5 text-white/90">Edu</span>
                                {dominantIndex === 0 && (
                                    <span className="absolute bottom-3 left-3 text-[6px] bg-ifa-gold text-black font-bold px-1.5 py-0.5 rounded uppercase tracking-widest leading-none">DOM</span>
                                )}
                            </button>

                            {/* BOTTOM-RIGHT: Ero (Sul) - Index 3 */}
                            <button 
                                onClick={() => setSelectedElement(3)}
                                className={`relative flex flex-col items-center justify-center p-3 transition-all duration-300 ${
                                    selectedElement === 3 
                                    ? `bg-gradient-to-tl ${elements[3].color} opacity-100` 
                                    : 'bg-black/5 hover:bg-white/5 opacity-0 hover:opacity-60'
                                }`}
                            >
                                <Leaf size={22} className={selectedElement === 3 ? 'text-amber-300 animate-pulse' : 'text-white/60'} />
                                <span className="text-[10px] font-serif mt-1.5 text-white/90">Ero</span>
                                {dominantIndex === 3 && (
                                    <span className="absolute bottom-3 right-3 text-[6px] bg-ifa-gold text-black font-bold px-1.5 py-0.5 rounded uppercase tracking-widest leading-none">DOM</span>
                                )}
                            </button>
                        </div>

                        {/* Central Cosmic Divider Line Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                            <div className="w-full h-[1px] bg-ifa-gold/20"></div>
                            <div className="h-full w-[1px] bg-ifa-gold/20 absolute"></div>
                            {/* Inner Circle compass hub */}
                            <div className="w-12 h-12 rounded-full border border-ifa-gold/30 bg-black/55 backdrop-blur-xs flex items-center justify-center">
                                <div className="w-4 h-4 rounded-full border border-ifa-gold/45 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-ifa-gold animate-ping"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DETAILS DISPLAY CARD */}
                {isOpen && activeEl && (
                    <div className="w-full mt-10 animate-fade-in px-2">
                        <div className="bg-black/65 border border-ifa-gold/20 rounded-2xl p-5 md:p-6 backdrop-blur-md relative overflow-hidden shadow-2xl">
                            {/* Golden Top Accent */}
                            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-ifa-gold to-transparent"></div>
                            
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-ifa-border/30">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${activeEl.textColor}`}>
                                        <activeEl.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-ifa-gold font-serif font-bold text-base leading-none">
                                            {activeEl.name}
                                        </h3>
                                        <p className="text-ifa-neutral text-[10px] uppercase tracking-wider mt-1">
                                            {activeEl.yoruba}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[9px] uppercase tracking-widest text-ifa-neutral block font-bold leading-none mb-1">Orixá Regente</span>
                                    <span className="text-xs font-serif font-bold text-white block leading-none">{activeEl.orixa}</span>
                                </div>
                            </div>

                            {/* Fundamento & Conselho */}
                            <div className="space-y-4">
                                <div>
                                    <span className="text-[9px] uppercase tracking-widest text-ifa-neutral font-bold block mb-1">Fundamento Cósmico</span>
                                    <p className="text-xs text-gray-300 leading-relaxed">
                                        {activeEl.meaning}
                                    </p>
                                </div>

                                <div className="bg-ifa-gold/5 border border-ifa-gold/15 p-3.5 rounded-lg">
                                    <span className="text-[9px] uppercase tracking-widest text-ifa-gold font-bold block mb-1 flex items-center gap-1">
                                        <Sparkles size={10} /> Conselho do Altar
                                    </span>
                                    <p className="text-xs text-gray-300 italic font-serif">
                                        "{activeEl.conselho}"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Reset / Close Gourd Button */}
                        <button 
                            onClick={() => { setIsOpen(false); setSelectedElement(dominantIndex); }}
                            className="mt-6 mx-auto flex items-center gap-2 text-xs uppercase tracking-widest text-ifa-neutral hover:text-white transition-all underline decoration-ifa-gold/45"
                        >
                            <RefreshCw size={12} className="text-ifa-gold/60" /> Fechar Cabaça da Existência
                        </button>
                    </div>
                )}

                {/* Closed helper instructions */}
                {!isOpen && (
                    <p className="mt-8 text-ifa-neutral text-xs max-w-sm text-center leading-relaxed">
                        A Cabaça da Existência (Igbadu) une o Orun (Céu) e o Aye (Terra). Toque na cabaça para abrir o Altar e revelar os 4 elementos.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Igbadu;
