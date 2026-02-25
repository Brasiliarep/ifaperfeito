import React from 'react';
import { OduInfo, AIInterpretation } from '../types';
import { X, Share2 } from 'lucide-react';

interface Props {
    odu: OduInfo;
    data: AIInterpretation;
    onClose: () => void;
}

const ShareCard: React.FC<Props> = ({ odu, data, onClose }) => {
    
    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
            <div className="absolute top-4 right-4">
                 <button onClick={onClose} className="text-white hover:text-gray-300 p-2"><X size={32} /></button>
            </div>

            <div className="text-white text-center mb-4">
                <p className="text-sm">Tire um Print (Screenshot) da tela abaixo para compartilhar</p>
            </div>

            {/* The Card to Screenshot */}
            <div className="bg-[#1a1510] border-4 border-[#D4AF37] p-6 rounded-2xl shadow-2xl max-w-sm w-full relative overflow-hidden text-center aspect-[9/16] flex flex-col items-center justify-between">
                
                {/* Texture BG */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                
                <div className="relative z-10 w-full flex-shrink-0">
                     <div className="w-14 h-14 bg-[#D4AF37] rounded-full mx-auto mb-3 flex items-center justify-center">
                        <Share2 className="text-[#1a1510]" size={28} />
                     </div>
                     <h2 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] mb-1">Orientações de Ifá</h2>
                     <h1 className="text-3xl font-serif font-bold text-[#F5F5DC] mb-2">{odu.name}</h1>
                     <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase ${data.ireOrOsogbo === 'Irê' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                         {data.ireOrOsogbo}
                     </div>
                </div>

                <div className="relative z-10 py-2 flex flex-col items-center justify-center flex-grow overflow-hidden">
                    <p className="text-[#D4AF37] font-serif text-base italic mb-3 line-clamp-3">"{data.summary}"</p>
                    <div className="w-16 h-0.5 bg-[#5D4037] mx-auto mb-3 flex-shrink-0"></div>
                    <p className="text-[#e5e5e5] text-xs md:text-sm leading-relaxed px-2 line-clamp-[8] md:line-clamp-[10]">
                        {data.generalAdvice}
                    </p>
                </div>

                <div className="relative z-10 w-full mt-2 flex-shrink-0">
                    <p className="text-[#5D4037] text-[10px] uppercase tracking-widest">App Ifá Guia</p>
                </div>
            </div>
        </div>
    );
};

export default ShareCard;