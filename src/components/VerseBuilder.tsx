
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, RefreshCw, Trophy } from 'lucide-react';

const VERSES = [
    {
        odu: "Ejiogbe",
        correctOrder: [
            "Ejiogbe ni o gbe mi",
            "Ejiogbe ni o gbe mi leke",
            "Ki n ma subu",
            "Ki n ma yin"
        ],
        translation: "É Ejiogbe que me apoia. É Ejiogbe que me eleva. Que eu não caia. Que eu não vacile."
    },
    {
        odu: "Osa Meji",
        correctOrder: [
            "Osa meji",
            "A sa ota jo",
            "O sa ibi",
            "O sa iku nu"
        ],
        translation: "Osa Meji. Aquele que faz o inimigo correr. Ele afasta o mal. Ele afasta a morte."
    }
];

const VerseBuilder = ({ onBack }: { onBack: () => void }) => {
    const [currentVerse, setCurrentVerse] = useState(VERSES[0]);
    const [shuffledParts, setShuffledParts] = useState<string[]>([]);
    const [selectedParts, setSelectedParts] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        loadLevel();
    }, []);

    const loadLevel = () => {
        const v = VERSES[Math.floor(Math.random() * VERSES.length)];
        setCurrentVerse(v);
        setShuffledParts([...v.correctOrder].sort(() => Math.random() - 0.5));
        setSelectedParts([]);
        setIsComplete(false);
        setIsCorrect(false);
    };

    const handleSelect = (part: string) => {
        if (isComplete) return;
        const newSelection = [...selectedParts, part];
        setSelectedParts(newSelection);
        setShuffledParts(shuffledParts.filter(p => p !== part));

        if (newSelection.length === currentVerse.correctOrder.length) {
            checkResult(newSelection);
        }
    };

    const handleUndo = () => {
        if (selectedParts.length === 0 || isComplete) return;
        const lastPart = selectedParts[selectedParts.length - 1];
        setSelectedParts(selectedParts.slice(0, -1));
        setShuffledParts([...shuffledParts, lastPart]);
    };

    const checkResult = (selection: string[]) => {
        const correct = selection.every((val, index) => val === currentVerse.correctOrder[index]);
        setIsCorrect(correct);
        setIsComplete(true);
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold">Construtor de Versos</h1>
                <div className="w-6"></div>
            </div>

            <div className="w-full max-w-md">
                <p className="text-center text-ifa-neutral mb-6">Coloque as frases do Odu <strong>{currentVerse.odu}</strong> na ordem correta.</p>

                {/* Drop Zone */}
                <div className="bg-ifa-base border-2 border-dashed border-ifa-border rounded-xl p-4 min-h-[200px] mb-6 space-y-2 relative">
                    {selectedParts.map((part, idx) => (
                        <div key={idx} className="bg-ifa-wood text-white p-3 rounded text-center font-serif animate-fade-in">
                            {part}
                        </div>
                    ))}
                    {selectedParts.length === 0 && (
                        <p className="text-ifa-neutral/30 text-center mt-12 uppercase font-bold text-xs">Toque nas peças abaixo</p>
                    )}
                    
                    {selectedParts.length > 0 && !isComplete && (
                        <button onClick={handleUndo} className="absolute bottom-2 right-2 text-xs text-red-400 font-bold uppercase">Desfazer</button>
                    )}
                </div>

                {/* Options */}
                {!isComplete && (
                    <div className="grid gap-2">
                        {shuffledParts.map((part, idx) => (
                            <button 
                                key={idx}
                                onClick={() => handleSelect(part)}
                                className="bg-ifa-surface border border-ifa-border p-3 rounded text-center text-ifa-text hover:border-ifa-gold transition-all"
                            >
                                {part}
                            </button>
                        ))}
                    </div>
                )}

                {/* Result */}
                {isComplete && (
                    <div className="text-center animate-bounce">
                        {isCorrect ? (
                            <div className="bg-green-900/20 border border-green-500 p-6 rounded-xl">
                                <Trophy className="mx-auto text-green-500 mb-2" size={40} />
                                <h2 className="text-2xl font-bold text-green-400 mb-2">Correto!</h2>
                                <p className="text-white italic mb-4">"{currentVerse.translation}"</p>
                                <button onClick={loadLevel} className="bg-green-600 text-white px-6 py-3 rounded-full font-bold">Próximo</button>
                            </div>
                        ) : (
                            <div className="bg-red-900/20 border border-red-500 p-6 rounded-xl">
                                <h2 className="text-2xl font-bold text-red-500 mb-4">Incorreto</h2>
                                <button onClick={loadLevel} className="bg-ifa-wood text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 mx-auto">
                                    <RefreshCw size={18}/> Tentar Novamente
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerseBuilder;
