
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Compass, MapPin } from 'lucide-react';

const LeyLineCompass = ({ onBack }: { onBack: () => void }) => {
    const [heading, setHeading] = useState(0);

    useEffect(() => {
        const handleOrientation = (e: DeviceOrientationEvent) => {
            if (e.alpha) setHeading(360 - e.alpha);
        };
        window.addEventListener('deviceorientation', handleOrientation);
        return () => window.removeEventListener('deviceorientation', handleOrientation);
    }, []);

    const directions = [
        { label: 'Mar (Yemoja)', angle: 45, color: 'text-blue-400' },
        { label: 'Mata (Oxossi)', angle: 135, color: 'text-green-400' },
        { label: 'Cemitério (Egun)', angle: 225, color: 'text-gray-400' },
        { label: 'Rio (Osun)', angle: 315, color: 'text-yellow-400' },
    ];

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-8 flex flex-col items-center justify-center">
            <button onClick={onBack} className="absolute top-4 left-4 z-20 text-ifa-neutral hover:text-white"><ArrowLeft /></button>
            
            <h2 className="text-2xl font-serif text-ifa-gold mb-8">Bússola de Força</h2>

            <div className="relative w-72 h-72 border-4 border-ifa-wood rounded-full bg-black/40 shadow-2xl flex items-center justify-center">
                
                {/* Rotating Dial */}
                <div 
                    className="absolute w-full h-full rounded-full transition-transform duration-300 ease-out"
                    style={{ transform: `rotate(${-heading}deg)` }}
                >
                    {directions.map(dir => (
                        <div 
                            key={dir.label}
                            className={`absolute text-xs font-bold uppercase ${dir.color} flex flex-col items-center w-20 text-center`}
                            style={{ 
                                top: '50%', 
                                left: '50%', 
                                transform: `translate(-50%, -50%) rotate(${dir.angle}deg) translateY(-120px)` 
                            }}
                        >
                            <MapPin size={16} className="mb-1" />
                            {dir.label}
                        </div>
                    ))}
                    
                    {/* Tick Marks */}
                    <div className="absolute top-2 left-1/2 w-1 h-4 bg-red-500 -translate-x-1/2"></div>
                    <div className="absolute bottom-2 left-1/2 w-1 h-4 bg-gray-500 -translate-x-1/2"></div>
                    <div className="absolute left-2 top-1/2 w-4 h-1 bg-gray-500 -translate-y-1/2"></div>
                    <div className="absolute right-2 top-1/2 w-4 h-1 bg-gray-500 -translate-y-1/2"></div>
                </div>

                {/* Static Arrow */}
                <div className="absolute text-red-500 z-10 drop-shadow-lg">
                    <Compass size={48} className="fill-current" />
                </div>
            </div>

            <div className="mt-12 text-center text-sm text-ifa-neutral max-w-xs">
                Aponte o celular. A seta vermelha indica o Norte Magnético. As direções indicam os locais de força relativa à sua posição atual (Simbólico).
            </div>
        </div>
    );
};

export default LeyLineCompass;
