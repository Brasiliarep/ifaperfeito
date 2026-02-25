
import React, { useState, useEffect } from 'react';
import { Volume2, StopCircle } from 'lucide-react';

interface TextReaderProps {
    text: string;
    label?: string;
    large?: boolean;
    forceLang?: string;
}

const TextReader: React.FC<TextReaderProps> = ({ text, label, large = false, forceLang }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [hasYorubaSupport, setHasYorubaSupport] = useState(false);

    useEffect(() => {
        const loadVoice = () => {
            const voices = window.speechSynthesis.getVoices();
            
            // 1. Check if user selected a preferred voice in settings
            const savedVoiceURI = localStorage.getItem('ifa_preferred_voice');
            const savedVoice = voices.find(v => v.voiceURI === savedVoiceURI);

            // 2. Check specifically for Yoruba support in system
            const yorubaVoice = voices.find(v => v.lang === 'yo-NG' || v.lang === 'yo' || v.lang.includes('yo-'));
            setHasYorubaSupport(!!yorubaVoice);

            if (forceLang === 'yo-NG') {
                if (yorubaVoice) {
                    setSelectedVoice(yorubaVoice); 
                } else if (savedVoice) {
                    setSelectedVoice(savedVoice);
                }
            } else {
                if (savedVoice) {
                    setSelectedVoice(savedVoice);
                }
            }
        };

        loadVoice();
        window.speechSynthesis.onvoiceschanged = loadVoice;
    }, [forceLang]);

    const speakPart = (textPart: string, lang: string, rate: number, pitch: number, delay: number = 0) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                if (!isSpeaking) { resolve(); return; } // Abort if stopped
                
                const utterance = new SpeechSynthesisUtterance(textPart);
                
                // Voice Selection Logic
                if (selectedVoice && (lang === 'pt-BR' || !hasYorubaSupport)) {
                    utterance.voice = selectedVoice;
                }
                
                // --- THUNDER VOICE PROTOCOL (IMPONDERÁVEL) ---
                if (lang === 'yo-NG' || forceLang === 'yo-NG') {
                    // Ritual Mode: Deep and Slow
                    utterance.rate = 0.75; // Slower than normal (0.8x)
                    utterance.pitch = 0.7; // Graver/Deeper (0.7x) - The "Thunder"
                    // Fallback to browser lang if native Yoruba not found to avoid spelling
                    utterance.lang = hasYorubaSupport ? 'yo-NG' : 'pt-BR'; 
                } else {
                    // Normal/Authoritative
                    utterance.rate = 0.95;
                    utterance.pitch = 0.9;
                    utterance.lang = 'pt-BR';
                }

                utterance.onend = () => resolve();
                utterance.onerror = () => resolve();
                
                window.speechSynthesis.speak(utterance);
            }, delay);
        });
    };

    const toggleSpeech = async (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            return;
        }

        window.speechSynthesis.cancel();
        setIsSpeaking(true);

        // --- RITUAL STRUCTURE PARSING ---
        // Checks if text follows "Ipe: ... Ofo: ... Ase: ..." pattern from AI
        if (text.includes("Ipe:") || text.includes("Ofo:")) {
            // Regex to split: Ipe: (content) Ofo: (content) Ase: (content)
            const ipeMatch = text.match(/Ipe:\s*(.*?)(?=(Ofo:|Ase:|$))/is);
            const ofoMatch = text.match(/Ofo:\s*(.*?)(?=(Ase:|$))/is);
            const aseMatch = text.match(/Ase:\s*(.*)/is);

            const ipe = ipeMatch ? ipeMatch[1].trim() : "";
            const ofo = ofoMatch ? ofoMatch[1].trim() : "";
            const ase = aseMatch ? aseMatch[1].trim() : "";

            // SEQUENTIAL EXECUTION (The Pilgrimage)
            if (ipe) await speakPart(ipe, 'yo-NG', 0.8, 0.8, 0); // The Call (Strong)
            if (ofo) await speakPart(ofo, 'yo-NG', 0.7, 0.7, 1000); // The Incantation (Slow, Grave, Paused)
            if (ase) await speakPart(ase, 'pt-BR', 0.9, 0.9, 1500); // The Seal (Firm)
            
            setIsSpeaking(false);
        } else {
            // Standard / Legacy Text
            await speakPart(text, forceLang || 'pt-BR', forceLang === 'yo-NG' ? 0.7 : 1.0, forceLang === 'yo-NG' ? 0.7 : 1.0);
            setIsSpeaking(false);
        }
    };

    if (large) {
        return (
            <button 
                onClick={toggleSpeech}
                className={`w-full mt-4 p-4 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                    isSpeaking 
                    ? 'bg-red-900/20 text-red-500 border border-red-500' 
                    : 'bg-ifa-gold text-ifa-base hover:opacity-90'
                }`}
            >
                {isSpeaking ? <StopCircle size={24} /> : <Volume2 size={24} />}
                {isSpeaking ? "Silenciar Voz" : (forceLang === 'yo-NG' ? "Invocação (Voz do Trovão)" : "Ouvir Orientação")}
            </button>
        );
    }

    return (
        <button 
            onClick={toggleSpeech}
            className={`flex items-center gap-2 rounded-full transition-all ${
                isSpeaking 
                ? 'px-2 py-1 bg-red-900/50 text-red-400 border border-red-500 animate-pulse' 
                : 'p-2 bg-ifa-gold/10 text-ifa-gold border border-ifa-gold/30 hover:bg-ifa-gold/20'
            }`}
            title={label || "Ouvir"}
        >
            {isSpeaking ? <StopCircle size={14} /> : <Volume2 size={14} />}
            {label && <span className="text-xs font-bold uppercase tracking-wide">{label}</span>}
        </button>
    );
};

export default TextReader;
