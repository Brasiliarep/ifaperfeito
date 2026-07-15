
import React, { useState, useRef } from 'react';
import { ArrowLeft, Mic2, Activity, PlayCircle, RefreshCw, Drum } from 'lucide-react';

const RhythmOracle = ({ onBack }: { onBack: () => void }) => {
    const [taps, setTaps] = useState<number[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const [result, setResult] = useState<{orisha: string, msg: string, bpm: number} | null>(null);
    const tapBtnRef = useRef<HTMLButtonElement>(null);

    const handleTap = () => {
        const now = Date.now();
        setTaps(prev => [...prev, now]);
        
        // Haptic
        if (navigator.vibrate) navigator.vibrate(10);

        // Visual Feedback
        if(tapBtnRef.current) {
            tapBtnRef.current.style.transform = 'scale(0.95)';
            setTimeout(() => {
                if(tapBtnRef.current) tapBtnRef.current.style.transform = 'scale(1)';
            }, 50);
        }
    };

    const startSession = () => {
        setTaps([]);
        setResult(null);
        setIsRecording(true);
    };

    const finishSession = () => {
        setIsRecording(false);
        analyzeRhythm();
    };

    const analyzeRhythm = () => {
        if (taps.length < 5) {
            alert("Toques insuficientes. Tente manter o ritmo por mais tempo.");
            return;
        }

        // Calculate Intervals
        const intervals = [];
        for(let i=1; i<taps.length; i++) {
            intervals.push(taps[i] - taps[i-1]);
        }

        // Average BPM
        const avgInterval = intervals.reduce((a,b) => a+b, 0) / intervals.length;
        const bpm = Math.round(60000 / avgInterval);

        // Variance (Stability)
        const variance = intervals.reduce((acc, val) => acc + Math.pow(val - avgInterval, 2), 0) / intervals.length;
        const stdDev = Math.sqrt(variance);
        const stability = stdDev / avgInterval; // Lower is more stable

        let orisha = "";
        let msg = "";

        // Heuristic Logic
        if (stability > 0.4) {
            // Chaotic / Erratic
            orisha = "Esu (Exu)";
            msg = "Ritmo quebrado e imprevisível. Energia de mudança, caos criativo ou confusão. Necessário organizar os caminhos.";
        } else if (bpm > 160) {
            // Very Fast
            orisha = "Oya (Iansã)";
            msg = "Ritmo de tempestade e rapidez. Ansiedade ou urgência de transformação.";
        } else if (bpm > 120) {
            // Fast & Stable
            orisha = "Ogun";
            msg = "Batida de guerra e trabalho. Energia alta, foco e determinação. Cuidado com o estresse.";
        } else if (bpm > 90) {
            // Medium / Regal
            orisha = "Sango (Xangô)";
            msg = "Ritmo real e cadenciado. Autoridade e justiça. Equilíbrio entre ação e pensamento.";
        } else if (bpm > 60) {
            // Slow & Flowing
            orisha = "Osun / Yemoja";
            msg = "Ritmo das águas. Emoção, fluidez, maternidade. Momento de nutrir e acalmar.";
        } else {
            // Very Slow
            orisha = "Obatala";
            msg = "Lentidão e paciência. Paz profunda, necessidade de repouso e clareza mental.";
        }

        setResult({ orisha, msg, bpm });
    };

    return (
        <div className="min-h-screen bg-black text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-white"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><Drum size={20}/> Ayan Agalu (Ritmo)</h1>
                <div className="w-6"></div>
            </div>

            {!result ? (
                <div className="flex flex-col items-center justify-center flex-grow w-full max-w-md">
                    <p className="text-center text-ifa-neutral mb-8">
                        {isRecording 
                            ? "Feche os olhos. Batuque na tela seguindo seu coração." 
                            : "O ritmo revela o estado do seu Ori. Inicie para começar."}
                    </p>

                    {!isRecording ? (
                        <button 
                            onClick={startSession}
                            className="w-24 h-24 rounded-full bg-ifa-gold text-black flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-110 transition-transform"
                        >
                            <PlayCircle size={48} />
                        </button>
                    ) : (
                        <>
                            <button 
                                ref={tapBtnRef}
                                onClick={handleTap}
                                className="w-64 h-64 rounded-full bg-gradient-to-br from-gray-800 to-black border-4 border-ifa-gold/50 flex items-center justify-center active:bg-gray-700 transition-colors shadow-2xl mb-8 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-20"></div>
                                <span className="text-ifa-gold text-xs font-bold uppercase tracking-widest pointer-events-none">Tap Here</span>
                            </button>

                            <button 
                                onClick={finishSession}
                                className="bg-red-900 text-red-200 px-8 py-3 rounded-full font-bold uppercase border border-red-500 hover:bg-red-800"
                            >
                                Analisar Ritmo
                            </button>
                            <p className="mt-4 text-xs text-ifa-neutral">{taps.length} toques registrados</p>
                        </>
                    )}
                </div>
            ) : (
                <div className="animate-fade-in w-full max-w-md text-center">
                    <div className="mb-8">
                        <div className="text-6xl font-bold text-ifa-gold mb-2">{result.bpm} <span className="text-sm font-normal text-ifa-neutral">BPM</span></div>
                        <Activity className="mx-auto text-ifa-gold mb-4" />
                    </div>

                    <div className="bg-ifa-base border border-ifa-gold p-8 rounded-2xl shadow-2xl mb-8">
                        <h2 className="text-2xl font-serif font-bold text-white mb-2">Regência: {result.orisha}</h2>
                        <div className="h-1 w-20 bg-ifa-gold mx-auto mb-4"></div>
                        <p className="text-ifa-text-light leading-relaxed">{result.msg}</p>
                    </div>

                    <button 
                        onClick={startSession} 
                        className="bg-ifa-wood text-white px-8 py-3 rounded-full font-bold uppercase flex items-center justify-center gap-2 mx-auto hover:opacity-90"
                    >
                        <RefreshCw size={20} /> Tentar Novamente
                    </button>
                </div>
            )}
        </div>
    );
};

export default RhythmOracle;
