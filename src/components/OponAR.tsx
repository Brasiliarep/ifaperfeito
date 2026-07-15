
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Camera, RefreshCw } from 'lucide-react';
import OpeleSeed from './OpeleSeed'; // Reusing seed visual
import { OpeleState, SeedState } from '../types';
import { SIGN_NAMES, valueToLeg, getLegValue } from '../utils/oduLogic';

const OponAR = ({ onBack }: { onBack: () => void }) => {
    const [hasPermission, setHasPermission] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [cast, setCast] = useState<OpeleState | null>(null);
    const [oduName, setOduName] = useState("");

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            setStream(mediaStream);
            setHasPermission(true);
        } catch (err) {
            alert("Erro ao acessar câmera. Verifique as permissões.");
        }
    };

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
        return () => {
            if (stream) stream.getTracks().forEach(track => track.stop());
        };
    }, [stream]);

    const handleCast = () => {
        // Random Cast logic reused
        const rVal = Math.floor(Math.random() * 16);
        const lVal = Math.floor(Math.random() * 16);
        
        const rName = SIGN_NAMES[rVal];
        const lName = SIGN_NAMES[lVal];
        const fullName = rVal === lVal ? (rName === 'Ogbe' ? 'Ejiogbe' : `${rName} Meji`) : `${rName} ${lName}`;

        setCast({
            rightLeg: valueToLeg(rVal),
            leftLeg: valueToLeg(lVal)
        });
        setOduName(fullName);
    };

    return (
        <div className="min-h-screen bg-black relative flex flex-col">
            {!hasPermission ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
                    <h1 className="text-2xl font-serif text-ifa-gold mb-4">Opon Ifá AR</h1>
                    <p className="text-gray-400 mb-8">
                        Projete o tabuleiro sagrado em qualquer superfície usando sua câmera.
                    </p>
                    <button onClick={startCamera} className="bg-ifa-gold text-black px-8 py-3 rounded-full font-bold uppercase flex items-center gap-2">
                        <Camera /> Ativar Câmera
                    </button>
                    <button onClick={onBack} className="mt-8 text-gray-500 underline">Voltar</button>
                </div>
            ) : (
                <>
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                    
                    <div className="absolute top-4 left-4 z-20">
                        <button onClick={onBack} className="bg-black/50 p-2 rounded-full text-white"><ArrowLeft /></button>
                    </div>

                    {/* AR OVERLAY - OPON */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div 
                            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border-8 border-[#5D4037]/80 bg-[#D2B48C]/40 backdrop-blur-sm relative flex items-center justify-center shadow-2xl transform rotate-x-60"
                            style={{ transform: 'perspective(1000px) rotateX(30deg)' }} // Fake 3D perspective
                        >
                            {/* Texture */}
                            <div className="absolute inset-0 rounded-full border-2 border-black/20 opacity-50"></div>
                            
                            {/* CAST RESULT */}
                            {cast ? (
                                <div className="flex gap-12 transform -rotate-x-30"> {/* Counter rotate content */}
                                    <div className="flex flex-col gap-2 scale-75">
                                        {cast.rightLeg.map((s, i) => <OpeleSeed key={i} position={i} state={s} onClick={()=>{}} />)}
                                    </div>
                                    <div className="flex flex-col gap-2 scale-75">
                                        {cast.leftLeg.map((s, i) => <OpeleSeed key={i} position={i} state={s} onClick={()=>{}} />)}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-black/50 font-bold uppercase text-sm animate-pulse">Toque para jogar</p>
                            )}
                        </div>
                    </div>

                    {/* CONTROLS */}
                    <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center z-20 p-4">
                        {oduName && (
                            <div className="bg-black/80 text-ifa-gold px-6 py-2 rounded-lg mb-4 border border-ifa-gold">
                                <h2 className="text-xl font-serif font-bold">{oduName}</h2>
                            </div>
                        )}
                        
                        <button 
                            onClick={handleCast}
                            className="bg-ifa-gold text-black w-20 h-20 rounded-full border-4 border-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
                        >
                            {cast ? <RefreshCw size={32} /> : <div className="w-4 h-4 bg-black rounded-full"></div>}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default OponAR;
