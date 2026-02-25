
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Mic, MicOff, CheckCircle2, AlertCircle } from 'lucide-react';

// Interfaces for Web Speech API
interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}

const MojubaMode = ({ onBack }: { onBack: () => void }) => {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [authStatus, setAuthStatus] = useState<'idle' | 'listening' | 'success' | 'fail'>('idle');
    const recognitionRef = useRef<any>(null);

    // Required keywords for "Mojuba"
    const KEYWORDS = ['olodumare', 'orunmila', 'iba', 'ase', 'laroye', 'akoda', 'aseda'];

    useEffect(() => {
        const { webkitSpeechRecognition, SpeechRecognition } = window as unknown as IWindow;
        const Recognition = SpeechRecognition || webkitSpeechRecognition;

        if (Recognition) {
            const recognition = new Recognition();
            recognition.continuous = true;
            recognition.lang = 'pt-BR'; // or 'yo-NG' if available/supported by browser
            recognition.interimResults = true;

            recognition.onstart = () => setListening(true);
            recognition.onend = () => setListening(false);

            recognition.onresult = (event: any) => {
                const current = event.resultIndex;
                const text = event.results[current][0].transcript.toLowerCase();
                setTranscript(text);
                checkAuth(text);
            };

            recognitionRef.current = recognition;
        }
        
        return () => {
            if(recognitionRef.current) recognitionRef.current.stop();
        };
    }, []);

    const checkAuth = (text: string) => {
        // Count how many keywords were spoken
        const hitCount = KEYWORDS.reduce((acc, word) => text.includes(word) ? acc + 1 : acc, 0);
        
        if (hitCount >= 3) {
            setAuthStatus('success');
            if(recognitionRef.current) recognitionRef.current.stop();
        }
    };

    const toggleListening = () => {
        if (listening) {
            recognitionRef.current?.stop();
            setAuthStatus('idle');
        } else {
            setAuthStatus('listening');
            setTranscript("");
            recognitionRef.current?.start();
        }
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-8 flex flex-col items-center justify-center">
            <button onClick={onBack} className="absolute top-4 left-4 text-ifa-neutral hover:text-ifa-text"><ArrowLeft/></button>
            
            <h1 className="text-3xl font-serif text-ifa-gold mb-2">Mojuba Voice</h1>
            <p className="text-ifa-neutral text-sm mb-12">Autenticador Litúrgico por Voz</p>

            <div className={`relative w-64 h-64 rounded-full border-4 flex items-center justify-center mb-8 transition-all duration-500 ${authStatus === 'success' ? 'border-green-500 bg-green-900/20 shadow-[0_0_50px_green]' : authStatus === 'listening' ? 'border-ifa-gold bg-ifa-gold/10 shadow-[0_0_50px_orange] animate-pulse' : 'border-gray-700 bg-black/40'}`}>
                
                {authStatus === 'success' ? (
                    <CheckCircle2 size={80} className="text-green-500" />
                ) : (
                    <button onClick={toggleListening} className="z-10">
                        {listening ? <Mic size={64} className="text-ifa-gold" /> : <MicOff size={64} className="text-gray-500" />}
                    </button>
                )}

                {/* Rings */}
                {listening && (
                    <>
                        <div className="absolute inset-0 border-2 border-ifa-gold rounded-full animate-ping opacity-20"></div>
                        <div className="absolute inset-4 border-2 border-ifa-gold rounded-full animate-ping animation-delay-500 opacity-20"></div>
                    </>
                )}
            </div>

            <div className="h-24 text-center max-w-md w-full">
                {authStatus === 'success' ? (
                    <div className="animate-scale-in">
                        <p className="text-green-400 font-bold text-xl uppercase mb-2">Reza Aceita (Aṣẹ)</p>
                        <p className="text-sm text-ifa-neutral">A entonação e as palavras chaves foram reconhecidas pelos ancestrais.</p>
                    </div>
                ) : (
                    <>
                        <p className="text-ifa-text italic text-lg mb-2">"{transcript || "Pressione o microfone e recite o Iba..."}"</p>
                        {listening && <p className="text-xs text-ifa-gold animate-pulse uppercase font-bold">Ouvindo...</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default MojubaMode;
