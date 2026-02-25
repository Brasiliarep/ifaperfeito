
import React, { useState } from 'react';
import { ArrowLeft, Box, Hexagon, Circle } from 'lucide-react';

const Igbadu = ({ onBack }: { onBack: () => void }) => {
    const [isOpen, setIsOpen] = useState(false);

    const elements = [
        { name: 'Efun (Giz)', color: 'bg-white', text: 'text-black', meaning: 'Paz, clareza, Obatala.' },
        { name: 'Osun (Pó Vermelho)', color: 'bg-red-600', text: 'text-white', meaning: 'Vida, sangue, proteção.' },
        { name: 'Edu (Carvão)', color: 'bg-black', text: 'text-white', meaning: 'Absorção, transformação, Esu.' },
        { name: 'Ero (Lama/Terra)', color: 'bg-[#5D4037]', text: 'text-[#F5F5DC]', meaning: 'Fertilidade, base, ancestrais.' }
    ];

    // Determine dominant element by time (Mock logic)
    const hour = new Date().getHours();
    const dominantIndex = hour % 4;

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center justify-center">
            <button onClick={onBack} className="absolute top-4 left-4 text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
            
            <h1 className="text-3xl font-serif text-ifa-gold mb-8">Igbadu Virtual</h1>

            <div 
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer relative w-64 h-64 md:w-80 md:h-80 transition-all duration-700 perspective-1000"
            >
                {/* CLOSED STATE */}
                <div className={`absolute inset-0 bg-[#3E2723] rounded-[40%] shadow-2xl flex items-center justify-center border-4 border-[#5D4037] transition-all duration-700 ${isOpen ? 'opacity-0 scale-150 rotate-45 pointer-events-none' : 'opacity-100 scale-100'}`}>
                    <div className="opacity-20 text-black"><Hexagon size={120} /></div>
                    <p className="absolute bottom-8 text-ifa-gold uppercase tracking-widest text-xs font-bold">Toque para Abrir</p>
                </div>

                {/* OPEN STATE */}
                <div className={`absolute inset-0 transition-all duration-700 delay-100 grid grid-cols-2 gap-2 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                    {elements.map((el, idx) => (
                        <div key={idx} className={`${el.color} ${el.text} rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-inner relative overflow-hidden`}>
                            {idx === dominantIndex && <div className="absolute top-1 right-1"><Circle size={8} className="fill-current animate-pulse"/></div>}
                            <h3 className="font-bold text-sm uppercase mb-1">{el.name}</h3>
                            <p className="text-[10px] opacity-80">{el.meaning}</p>
                        </div>
                    ))}
                </div>
            </div>

            <p className="mt-12 text-ifa-neutral text-sm max-w-sm text-center">
                {isOpen 
                    ? "O equilíbrio do universo neste momento. O elemento pulsante rege a hora atual." 
                    : "A Cabaça da Existência contém os 4 elementos primordiais. Abra para consultar o equilíbrio do mundo agora."}
            </p>
        </div>
    );
};

export default Igbadu;
