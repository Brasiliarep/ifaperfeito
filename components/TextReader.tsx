
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, StopCircle } from 'lucide-react';

interface TextReaderProps {
    text: string;
    label?: string;
    large?: boolean;
    forceLang?: string;
}

const TextReader: React.FC<TextReaderProps> = ({ text, label, large = false, forceLang }) => {
    // UI state (for button appearance only)
    const [isPlayingUI, setIsPlayingUI] = useState(false);
    // Synchronous ref — no race condition
    const isSpeakingRef = useRef(false);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const [hasYorubaSupport, setHasYorubaSupport] = useState(false);

    useEffect(() => {
        const loadVoice = () => {
            const voices = window.speechSynthesis.getVoices();

            // 1. Check saved preferred voice
            const savedVoiceURI = localStorage.getItem('ifa_preferred_voice');
            const savedVoice = voices.find(v => v.voiceURI === savedVoiceURI);

            // 2. Check for Yoruba support
            const yorubaVoice = voices.find(v => v.lang === 'yo-NG' || v.lang === 'yo' || v.lang.includes('yo-'));
            setHasYorubaSupport(!!yorubaVoice);

            if (forceLang === 'yo-NG') {
                setSelectedVoice(yorubaVoice || savedVoice || null);
            } else {
                setSelectedVoice(savedVoice || null);
            }
        };

        loadVoice();
        window.speechSynthesis.onvoiceschanged = loadVoice;
        return () => { window.speechSynthesis.onvoiceschanged = null; };
    }, [forceLang]);

    const speakPart = (textPart: string, lang: string, rate: number, pitch: number, delay: number = 0): Promise<void> => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                // Use the synchronous ref — no React state race condition
                if (!isSpeakingRef.current) { resolve(); return; }

                const utterance = new SpeechSynthesisUtterance(textPart);

                // Voice selection
                if (selectedVoice && (lang === 'pt-BR' || !hasYorubaSupport)) {
                    utterance.voice = selectedVoice;
                }

                if (lang === 'yo-NG' || forceLang === 'yo-NG') {
                    // Ritual Mode: Deep and Slow (Thunder Voice Protocol)
                    utterance.rate = 0.75;
                    utterance.pitch = 0.7;
                    utterance.lang = hasYorubaSupport ? 'yo-NG' : 'pt-BR';
                } else {
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

        if (isSpeakingRef.current) {
            // Stop
            window.speechSynthesis.cancel();
            isSpeakingRef.current = false;
            setIsPlayingUI(false);
            return;
        }

        if (!text || !text.trim()) return;

        // Start — set ref synchronously BEFORE any async work
        window.speechSynthesis.cancel();
        isSpeakingRef.current = true;
        setIsPlayingUI(true);

        try {
            // Ritual structure parsing: Ipe / Ofo / Ase triple
            if (text.includes('Ipe:') || text.includes('Ofo:')) {
                const ipeMatch = text.match(/Ipe:\s*(.*?)(?=(Ofo:|Ase:|$))/is);
                const ofoMatch = text.match(/Ofo:\s*(.*?)(?=(Ase:|$))/is);
                const aseMatch = text.match(/Ase:\s*(.*)/is);

                const ipe = ipeMatch ? ipeMatch[1].trim() : '';
                const ofo = ofoMatch ? ofoMatch[1].trim() : '';
                const ase = aseMatch ? aseMatch[1].trim() : '';

                if (ipe) await speakPart(ipe, 'yo-NG', 0.8, 0.8, 0);
                if (ofo) await speakPart(ofo, 'yo-NG', 0.7, 0.7, 1000);
                if (ase) await speakPart(ase, 'pt-BR', 0.9, 0.9, 1500);
            } else {
                // Standard text — clean markdown before speaking
                const clean = text
                    .replace(/[*#_~`]/g, '')
                    .replace(/\[.*?\]\(.*?\)/g, '')
                    .replace(/\s+/g, ' ')
                    .trim();
                await speakPart(clean, forceLang || 'pt-BR', forceLang === 'yo-NG' ? 0.7 : 1.0, forceLang === 'yo-NG' ? 0.7 : 1.0);
            }
        } finally {
            isSpeakingRef.current = false;
            setIsPlayingUI(false);
        }
    };

    if (large) {
        return (
            <button
                onClick={toggleSpeech}
                className={`w-full mt-4 p-4 rounded-full font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${isPlayingUI
                        ? 'bg-red-900/20 text-red-500 border border-red-500'
                        : 'bg-ifa-gold text-ifa-base hover:opacity-90'
                    }`}
            >
                {isPlayingUI ? <StopCircle size={24} /> : <Volume2 size={24} />}
                {isPlayingUI ? 'Silenciar Voz' : (forceLang === 'yo-NG' ? 'Invocação (Voz do Trovão)' : 'Ouvir Orientação')}
            </button>
        );
    }

    return (
        <button
            onClick={toggleSpeech}
            className={`flex items-center gap-1 rounded-full transition-all flex-shrink-0 ${isPlayingUI
                    ? 'px-2 py-1 bg-red-900/50 text-red-400 border border-red-500 animate-pulse'
                    : 'p-1.5 bg-ifa-gold/10 text-ifa-gold border border-ifa-gold/30 hover:bg-ifa-gold/20'
                }`}
            title={label || 'Ouvir em voz alta'}
            aria-label={label || 'Ouvir em voz alta'}
        >
            {isPlayingUI ? <StopCircle size={14} /> : <Volume2 size={14} />}
            {label && <span className="text-xs font-bold uppercase tracking-wide">{label}</span>}
        </button>
    );
};

export default TextReader;
