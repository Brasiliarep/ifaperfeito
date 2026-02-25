
import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Shield, Check } from 'lucide-react';

const DoorGuardian = ({ onBack }: { onBack: () => void }) => {
    const [active, setActive] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [sigilPlaced, setSigilPlaced] = useState(false);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setActive(true);
            }
        } catch (err) {
            alert("Câmera não disponível.");
        }
    };

    const placeSigil = () => {
        setSigilPlaced(true);
        setTimeout(() => {
            alert("Sigilo de Proteção Ativado na Porta!");
            setSigilPlaced(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-black text-white relative flex flex-col">
            {!active ? (
                <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
                    <Shield size={64} className="text-ifa-gold mb-4" />
                    <h1 className="text-2xl font-serif font-bold mb-4">Guardião da Porta (Onibode)</h1>
                    <p className="text-gray-400 mb-8">
                        Use a Realidade Aumentada para projetar o Sigilo de Proteção (Odu) na entrada de sua casa.
                    </p>
                    <button onClick={startCamera} className="bg-ifa-gold text-black px-8 py-3 rounded-full font-bold uppercase">
                        Ativar Câmera
                    </button>
                    <button onClick={onBack} className="mt-8 text-sm text-gray-500 underline">Voltar</button>
                </div>
            ) : (
                <div className="relative flex-grow overflow-hidden">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    
                    <button onClick={onBack} className="absolute top-4 left-4 bg-black/50 p-2 rounded-full text-white z-20">
                        <ArrowLeft />
                    </button>

                    {/* AR Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <div className={`w-64 h-64 border-4 border-ifa-gold rounded-full flex items-center justify-center opacity-50 ${sigilPlaced ? 'animate-ping' : ''}`}>
                            {/* Odu Symbol (Ejiogbe) */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <div className="w-2 h-8 bg-ifa-gold rounded-full"></div>
                                    <div className="w-2 h-8 bg-ifa-gold rounded-full"></div>
                                    <div className="w-2 h-8 bg-ifa-gold rounded-full"></div>
                                    <div className="w-2 h-8 bg-ifa-gold rounded-full"></div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="w-2 h-8 bg-ifa-gold rounded-full"></div>
                                    <div className="w-2 h-8 bg-ifa-gold rounded-full"></div>
                                    <div className="w-2 h-8 bg-ifa-gold rounded-full"></div>
                                    <div className="w-2 h-8 bg-ifa-gold rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-0 w-full flex justify-center z-20">
                        <button 
                            onClick={placeSigil}
                            className="bg-ifa-gold text-black w-16 h-16 rounded-full border-4 border-white flex items-center justify-center shadow-lg"
                        >
                            <Check size={32} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoorGuardian;
