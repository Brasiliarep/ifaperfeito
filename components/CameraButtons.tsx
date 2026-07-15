import React, { useRef, useState } from 'react';
import { Camera, Image } from 'lucide-react';

interface Props {
    onCapture?: (file: File) => void;
}

export const CameraButtons: React.FC<Props> = ({ onCapture }) => {
    const fileRef = useRef<HTMLInputElement>(null);
    const galleryRef = useRef<HTMLInputElement>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsAnalyzing(true);
            setTimeout(() => {
                setIsAnalyzing(false);
                alert('Integração com API Gemini vision virá aqui!');
                if (onCapture) onCapture(e.target.files![0]);
            }, 2000);
        }
    };

    return (
        <div className="w-full max-w-md mt-6 mb-4 flex flex-col items-center">
            <div className="flex w-full gap-3">
                <button type="button" onClick={() => fileRef.current?.click()} className="flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-[rgba(255,255,255,0.05)] border border-ifa-gold/30 rounded-xl hover:bg-ifa-gold/10 transition-all text-ifa-gold font-bold tracking-wider text-[11px] md:text-sm">
                    {isAnalyzing ? <div className="w-5 h-5 border-2 border-ifa-gold border-t-transparent rounded-full animate-spin" /> : <Camera size={20} />}
                    <span>TIRAR FOTO</span>
                </button>
                <button type="button" onClick={() => galleryRef.current?.click()} className="flex-1 flex items-center justify-center gap-2 px-4 py-4 bg-[rgba(255,255,255,0.05)] border border-ifa-gold/30 rounded-xl hover:bg-ifa-gold/10 transition-all text-ifa-neutral font-bold tracking-wider text-[11px] md:text-sm">
                    {isAnalyzing ? <div className="w-5 h-5 border-2 border-ifa-gold border-t-transparent rounded-full animate-spin" /> : <Image size={20} />}
                    <span>ENVIAR IMAGEM</span>
                </button>
            </div>
            <input type="file" ref={fileRef} accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
            <input type="file" ref={galleryRef} accept="image/*" className="hidden" onChange={handleFile} />
        </div>
    );
};

export default CameraButtons;
