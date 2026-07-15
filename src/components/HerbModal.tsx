
import React from 'react';
import { HerbInfo } from '../types';
import { X, Leaf } from 'lucide-react';

interface Props {
    herb: HerbInfo;
    onClose: () => void;
}

const HerbModal: React.FC<Props> = ({ herb, onClose }) => {
    return (
        // Increased z-index to z-[100] to ensure it sits on top of everything
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in" onClick={onClose}>
            <div 
                className="bg-ifa-base w-full max-w-sm rounded-xl border-2 border-ifa-gold shadow-2xl overflow-hidden relative transform transition-all scale-100"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-2 hover:bg-red-600 transition-colors z-20"
                >
                    <X size={20} />
                </button>

                <div className="h-56 w-full bg-gray-800 relative group">
                    <img 
                        src={herb.imageUrl} 
                        alt={herb.yorubaName} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
                        }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 pt-12">
                        <h3 className="text-2xl font-serif font-bold text-ifa-gold drop-shadow-md">{herb.yorubaName}</h3>
                        <p className="text-white text-xs italic opacity-90">{herb.scientificName}</p>
                    </div>
                </div>

                <div className="p-6 bg-ifa-base-dark">
                    <div className="mb-4 p-3 bg-ifa-base rounded border border-ifa-border">
                        <h4 className="text-[10px] uppercase text-ifa-neutral font-bold mb-1 flex items-center gap-1">
                            <Leaf size={12}/> Nome Popular
                        </h4>
                        <p className="text-ifa-text font-bold text-lg">{herb.commonName}</p>
                    </div>
                    
                    <div>
                        <h4 className="text-[10px] uppercase text-ifa-neutral font-bold mb-2">Uso Litúrgico & Propriedades</h4>
                        <p className="text-sm text-ifa-text-light leading-relaxed text-justify">
                            {herb.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HerbModal;
