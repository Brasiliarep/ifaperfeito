
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, X, RefreshCw, Trophy, Brain, Heart, Mic, StopCircle, Volume2 } from 'lucide-react';
import { SIGN_NAMES, NAME_TO_VALUE, valueToLeg } from '../utils/oduLogic';
import OpeleSeed from './OpeleSeed';
import { OpeleState } from '../types';

// Hardcoded Short Verses for the 16 Mejis (For comparison)
const MOCK_VERSES: Record<string, string> = {
    'Ejiogbe': "Ogbe ni o gbe mi. Ejiogbe ni o gbe mi leke. (É Ogbe que me apoia. É Ejiogbe que me eleva.)",
    'Oyeku Meji': "Oyeku Meji, ye ku ma ye. Iku ye lori mi. (Oyeku Meji, evite a morte. A morte sai da minha cabeça.)",
    'Iwori Meji': "Iwori gogi, Iwori gogi. Omo awo ni a ko ri. (Iwori olha para o mato. É o filho do segredo que não vemos.)",
    'Odi Meji': "Odi meji a di ni mu. Odi meji a di ota mu. (Odi Meji segura firme. Odi Meji segura o inimigo.)",
    'Irosun Meji': "Irosun awo ile. Irosun awo ode. (Irosun, segredo da casa. Irosun, segredo da rua.)",
    'Owonrin Meji': "Owonrin a gbe mi. Owonrin a la ona fun mi. (Owonrin me apoie. Owonrin abra o caminho para mim.)",
    'Obara Meji': "Obara meji, a fi owo fo ire. (Obara Meji, aquele que usa a mão para pegar a sorte.)",
    'Okanran Meji': "Okanran meji, a kan ile, a kan ode. (Okanran Meji, toca a casa, toca a rua.)",
    'Ogunda Meji': "Ogunda meji a da owo, a da ese. (Ogunda Meji cria a mão, cria o pé.)",
    'Osa Meji': "Osa meji a sa ota jo. (Osa Meji faz o inimigo correr.)",
    'Ika Meji': "Ika meji a ka ibi kuro. (Ika Meji retira o mal.)",
    'Oturupon Meji': "Oturupon meji a ru ebo fin. (Oturupon Meji faz o ebó ser aceito.)",
    'Otura Meji': "Otura meji, a tu ire wo ile. (Otura Meji traz a sorte para casa.)",
    'Irete Meji': "Irete meji a te ile, a te omi. (Irete Meji pisa na terra, pisa na água.)",
    'Ose Meji': "Ose meji a se ota. (Ose Meji derrota o inimigo.)",
    'Ofun Meji': "Ofun meji a fun ire fun mi. (Ofun Meji me dá sorte.)",
};

const StudyMode = ({ onBack }: { onBack: () => void }) => {
    const [currentChallenge, setCurrentChallenge] = useState<OpeleState | null>(null);
    const [correctAnswer, setCorrectAnswer] = useState<string>("");
    const [options, setOptions] = useState<string[]>([]);
    
    // Game State
    const [lives, setLives] = useState(3);
    const [feedback, setFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
    const [streak, setStreak] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // Recording State
    const [showRecorder, setShowRecorder] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedText, setRecordedText] = useState("");
    const [hasRecorded, setHasRecorded] = useState(false);

    useEffect(() => {
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        setFeedback('idle');
        setShowRecorder(false);
        setRecordedText("");
        setHasRecorded(false);
        setIsRecording(false);
        
        // Generate random Odu
        const rVal = Math.floor(Math.random() * 16);
        const lVal = Math.floor(Math.random() * 16);
        
        const rName = SIGN_NAMES[rVal];
        const lName = SIGN_NAMES[lVal];
        
        const fullName = rVal === lVal ? (rName === 'Ogbe' ? 'Ejiogbe' : rName === 'Oyeku' ? 'Oyeku Meji' : `${rName} Meji`) : `${rName} ${lName}`;
        
        const opele: OpeleState = {
            rightLeg: valueToLeg(rVal),
            leftLeg: valueToLeg(lVal)
        };
        
        setCurrentChallenge(opele);
        setCorrectAnswer(fullName);
        
        // Generate wrong options
        const wrongOptions = new Set<string>();
        while(wrongOptions.size < 3) {
             const rr = Math.floor(Math.random() * 16);
             const ll = Math.floor(Math.random() * 16);
             const rrName = SIGN_NAMES[rr];
             const llName = SIGN_NAMES[ll];
             const name = rr === ll ? (rrName === 'Ogbe' ? 'Ejiogbe' : rrName === 'Oyeku' ? 'Oyeku Meji' : `${rrName} Meji`) : `${rrName} ${llName}`;
             if(name !== fullName) wrongOptions.add(name);
        }
        
        const allOpts = [fullName, ...Array.from(wrongOptions)];
        // Shuffle
        setOptions(allOpts.sort(() => Math.random() - 0.5));
    };

    const handleGuess = (guess: string) => {
        if(gameOver) return;

        if(guess === correctAnswer) {
            setFeedback('correct');
            setStreak(s => s + 1);
            // Instead of auto-generating next, show recorder
            setShowRecorder(true);
        } else {
            setFeedback('wrong');
            setLives(prev => {
                const newLives = prev - 1;
                if(newLives <= 0) setGameOver(true);
                return newLives;
            });
            // Shake effect is handled by CSS class in render
        }
    };

    const resetGame = () => {
        setLives(3);
        setStreak(0);
        setGameOver(false);
        generateChallenge();
    }

    // --- MOCK RECORDING LOGIC ---
    // (Real speech-to-text for Yoruba in browser is unstable without backend, so we simulate the UX)
    const toggleRecording = () => {
        if (isRecording) {
            // Stop
            setIsRecording(false);
            setHasRecorded(true);
            setRecordedText("Gravação concluída. Compare sua recitação abaixo.");
        } else {
            // Start
            setIsRecording(true);
            setRecordedText("Ouvindo...");
        }
    }

    if(!currentChallenge) return null;

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col relative overflow-hidden">
             
             {/* Header with Stats */}
             <div className="flex items-center justify-between mb-8 z-10">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text">
                    <ArrowLeft size={24} />
                </button>
                
                <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                            <Heart 
                                key={i} 
                                size={24} 
                                className={`${i < lives ? 'fill-red-600 text-red-600' : 'fill-gray-800 text-gray-800'} transition-colors`}
                            />
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-ifa-gold border border-ifa-gold/30 px-3 py-1 rounded-full">
                        <Trophy size={18} />
                        <span className="font-bold text-lg">{streak}</span>
                    </div>
                </div>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center max-w-xl mx-auto w-full z-10 pb-12">
                 
                 {gameOver ? (
                     <div className="text-center bg-red-900/20 border border-red-500 p-8 rounded-2xl animate-bounce">
                         <h2 className="text-4xl font-serif font-bold text-red-500 mb-4">Fim de Jogo</h2>
                         <p className="text-ifa-text mb-6">Você alcançou {streak} acertos consecutivos!</p>
                         <button 
                            onClick={resetGame}
                            className="bg-ifa-gold text-ifa-base px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:opacity-90 flex items-center gap-2 mx-auto"
                         >
                             <RefreshCw size={20} /> Tentar Novamente
                         </button>
                     </div>
                 ) : (
                     <>
                        <h2 className="text-ifa-neutral uppercase tracking-widest text-sm mb-6 flex items-center gap-2">
                            <Brain size={16} /> Identifique o Odu
                        </h2>
                        
                        <div className="bg-ifa-base border border-ifa-border p-8 rounded-3xl shadow-2xl mb-8 transform scale-90 md:scale-100 relative">
                            <div className="flex justify-center gap-12">
                                <div className="flex flex-col items-center gap-2">
                                    {currentChallenge.rightLeg.map((s, i) => <OpeleSeed key={i} position={i} state={s} onClick={() => {}} />)}
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    {currentChallenge.leftLeg.map((s, i) => <OpeleSeed key={i} position={i} state={s} onClick={() => {}} />)}
                                </div>
                            </div>
                        </div>

                        {/* QUIZ OPTIONS */}
                        {!showRecorder && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full animate-fade-in">
                                {options.map(opt => (
                                    <button 
                                        key={opt}
                                        onClick={() => handleGuess(opt)}
                                        className={`p-4 rounded-xl font-bold text-lg border transition-all ${
                                            feedback === 'wrong' ? 'animate-shake' : ''
                                        } bg-ifa-base hover:bg-ifa-wood hover:text-white border-ifa-border text-ifa-text`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* FEEDBACK & RECORDER */}
                        {feedback === 'wrong' && (
                            <div className="mt-4 text-red-500 font-bold text-center">Incorreto! Perdeu 1 vida.</div>
                        )}

                        {showRecorder && (
                            <div className="w-full bg-ifa-surface border border-ifa-gold/50 rounded-xl p-6 text-center animate-fade-in">
                                <div className="flex items-center justify-center gap-2 text-green-400 font-bold mb-4 text-xl">
                                    <Check size={24} /> Correto! É {correctAnswer}.
                                </div>
                                
                                <p className="text-sm text-ifa-neutral mb-4">Agora, treine a reza (Ese Ifá) deste Odu:</p>
                                
                                {!hasRecorded ? (
                                    <button 
                                        onClick={toggleRecording}
                                        className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all ${
                                            isRecording ? 'bg-red-500 animate-pulse ring-4 ring-red-900' : 'bg-ifa-wood hover:bg-ifa-gold'
                                        }`}
                                    >
                                        {isRecording ? <StopCircle size={32} className="text-white"/> : <Mic size={32} className="text-white"/>}
                                    </button>
                                ) : (
                                    <div className="bg-black/30 p-4 rounded-lg mb-4 text-left border border-ifa-border">
                                        <p className="text-xs text-ifa-gold uppercase font-bold mb-2">Verso Sugerido (Comparação):</p>
                                        <p className="text-ifa-text italic font-serif">
                                            "{MOCK_VERSES[correctAnswer] || `Reze o verso padrão de ${correctAnswer} para fixar o conhecimento.`}"
                                        </p>
                                    </div>
                                )}

                                {isRecording && <p className="text-red-400 text-sm animate-pulse">Gravando...</p>}
                                
                                {hasRecorded && (
                                    <button 
                                        onClick={generateChallenge}
                                        className="mt-2 bg-ifa-gold text-ifa-base px-6 py-2 rounded-full font-bold uppercase hover:opacity-90"
                                    >
                                        Próximo Desafio
                                    </button>
                                )}
                            </div>
                        )}
                     </>
                 )}
            </div>
        </div>
    )
}

export default StudyMode;
