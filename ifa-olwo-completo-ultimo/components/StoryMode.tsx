
import React, { useState } from 'react';
import { ArrowLeft, BookOpen, User, Map, Swords, CheckCircle2, XCircle, ShoppingBag, Gamepad2, Leaf, PenTool } from 'lucide-react';
import DestinyMarketGame from './DestinyMarketGame';
import OsanyinGarden from './OsanyinGarden';
import VerseBuilder from './VerseBuilder';

// --- EXISTING RPG LOGIC ---
const SCENARIOS = [
    {
        id: 'start',
        text: "Você é um jovem Omo Awo em Ilé-Ifẹ̀. A cidade sofre com uma seca terrível. O Oba convoca todos os adivinhos. O que você faz?",
        options: [
            { text: "Consulto meu próprio Ori antes de ir.", nextId: 'consult_ori' },
            { text: "Vou correndo ao palácio mostrar meu valor.", nextId: 'rush_palace' }
        ]
    },
    {
        id: 'consult_ori',
        text: "Você toca sua cabeça com reverência. Seu Ori diz para levar apenas 1 obi e água. Você chega calmo ao palácio. Os mais velhos brigam entre si. Você...",
        options: [
            { text: "Permaneço em silêncio e observo.", nextId: 'silence' },
            { text: "Interrompo e ofereço o obi ao Oba.", nextId: 'offer_obi' }
        ]
    },
    {
        id: 'rush_palace',
        text: "Você chega suado e ansioso. Um guarda barra sua entrada por não estar vestido adequadamente. Você perdeu a chance de ajudar o Rei hoje.",
        outcome: 'fail',
        advice: "A paciência é o pai do caráter (Suuru baba iwa)."
    },
    {
        id: 'silence',
        text: "Sua calma chama a atenção do Araba. Ele pede que você jogue o Opele. Você lança e cai Ejiogbe. O que isso significa?",
        options: [
            { text: "Caminho aberto, chuva virá.", nextId: 'success_rain' },
            { text: "Guerra e morte.", nextId: 'wrong_interpretation' }
        ]
    },
    {
        id: 'offer_obi',
        text: "O Oba aceita seu Obi, mas os mais velhos se ofendem com sua audácia. Você é expulso por falta de etiqueta.",
        outcome: 'fail',
        advice: "Respeite a hierarquia (Agba)."
    },
    {
        id: 'success_rain',
        text: "Correto! O céu escurece. A chuva cai. Você é aclamado como um sábio e ganha contas de coral do Rei.",
        outcome: 'success',
        advice: "A verdade de Ifá sempre prevalece."
    },
    {
        id: 'wrong_interpretation',
        text: "Você interpretou errado a bênção de Ejiogbe. O povo entra em pânico. Você precisa estudar mais.",
        outcome: 'fail',
        advice: "O conhecimento superficial é perigoso."
    }
];

const RPGComponent = ({ onBack }: { onBack: () => void }) => {
    const [currentStep, setCurrentStep] = useState('start');
    const scenario = SCENARIOS.find(s => s.id === currentStep);

    if (!scenario) return null;

    return (
        <div className="max-w-md w-full bg-[#2E150F] border-4 border-[#D4AF37] p-8 rounded-xl shadow-2xl relative overflow-hidden">
            <button 
                onClick={onBack} 
                className="absolute top-4 left-4 text-white/50 hover:text-white z-50 p-2 rounded-full hover:bg-black/20 transition-colors"
                aria-label="Voltar"
            >
                <ArrowLeft />
            </button>
            
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none"></div>
            
            <h1 className="text-2xl font-bold text-[#D4AF37] mb-6 flex items-center gap-2 relative z-10 pl-8">
                <Map size={24} /> A Jornada do Awo
            </h1>

            <p className="text-lg leading-relaxed mb-8 relative z-10 font-serif">
                {scenario.text}
            </p>

            {scenario.outcome ? (
                <div className="text-center relative z-10 animate-fade-in">
                    {scenario.outcome === 'success' ? (
                        <div className="text-green-400 mb-4">
                            <CheckCircle2 size={64} className="mx-auto mb-2" />
                            <h2 className="text-xl font-bold uppercase">Sucesso!</h2>
                        </div>
                    ) : (
                        <div className="text-red-400 mb-4">
                            <XCircle size={64} className="mx-auto mb-2" />
                            <h2 className="text-xl font-bold uppercase">Falha</h2>
                        </div>
                    )}
                    <p className="italic text-sm opacity-80 mb-6">"{scenario.advice}"</p>
                    <button onClick={() => setCurrentStep('start')} className="bg-[#D4AF37] text-black px-6 py-2 rounded-full font-bold uppercase hover:scale-105 transition-transform">
                        Jogar Novamente
                    </button>
                </div>
            ) : (
                <div className="space-y-3 relative z-10">
                    {scenario.options?.map((opt, idx) => (
                        <button 
                            key={idx}
                            onClick={() => setCurrentStep(opt.nextId)}
                            className="w-full text-left p-4 bg-[#5D4037] border border-[#8D6E63] rounded-lg hover:bg-[#D4AF37] hover:text-black transition-colors font-sans font-bold"
                        >
                            {opt.text}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// --- MAIN WRAPPER COMPONENT ---
const StoryMode = ({ onBack }: { onBack: () => void }) => {
    const [game, setGame] = useState<'menu' | 'rpg' | 'market' | 'garden' | 'verse'>('menu');

    if (game === 'market') return <DestinyMarketGame onBack={() => setGame('menu')} />;
    if (game === 'garden') return <OsanyinGarden onBack={() => setGame('menu')} />;
    if (game === 'verse') return <VerseBuilder onBack={() => setGame('menu')} />;

    return (
        <div className="min-h-screen bg-[#3E2723] text-[#F5F5DC] p-4 flex flex-col items-center justify-center font-serif">
            
            {game === 'menu' && (
                <div className="w-full max-w-md animate-fade-in">
                    <div className="flex items-center gap-4 mb-8">
                        <button onClick={onBack} className="text-white/50 hover:text-white"><ArrowLeft /></button>
                        <h1 className="text-3xl font-bold text-[#D4AF37]">Jogos & Educação</h1>
                    </div>

                    <div className="grid gap-6">
                        <button 
                            onClick={() => setGame('rpg')}
                            className="bg-[#2E150F] border-2 border-[#8D6E63] p-6 rounded-xl flex items-center gap-4 hover:border-[#D4AF37] hover:bg-[#3E2723] transition-all group shadow-xl"
                        >
                            <div className="bg-[#D4AF37] text-black p-4 rounded-full group-hover:scale-110 transition-transform">
                                <BookOpen size={32} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-xl text-[#D4AF37]">A Jornada do Awo</h3>
                                <p className="text-sm opacity-80 mt-1">RPG Textual. Tome decisões éticas.</p>
                            </div>
                        </button>

                        <button 
                            onClick={() => setGame('verse')}
                            className="bg-[#2E150F] border-2 border-[#8D6E63] p-6 rounded-xl flex items-center gap-4 hover:border-[#D4AF37] hover:bg-[#3E2723] transition-all group shadow-xl"
                        >
                            <div className="bg-blue-600 text-white p-4 rounded-full group-hover:scale-110 transition-transform">
                                <PenTool size={32} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-xl text-blue-300">Construtor de Versos</h3>
                                <p className="text-sm opacity-80 mt-1">Minigame de memorização de rezas.</p>
                            </div>
                        </button>

                        <button 
                            onClick={() => setGame('market')}
                            className="bg-[#2E150F] border-2 border-[#8D6E63] p-6 rounded-xl flex items-center gap-4 hover:border-[#D4AF37] hover:bg-[#3E2723] transition-all group shadow-xl"
                        >
                            <div className="bg-green-700 text-white p-4 rounded-full group-hover:scale-110 transition-transform">
                                <ShoppingBag size={32} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-xl text-green-400">Mercado do Destino</h3>
                                <p className="text-sm opacity-80 mt-1">Simulador Econômico de Templo.</p>
                            </div>
                        </button>

                        <button 
                            onClick={() => setGame('garden')}
                            className="bg-[#2E150F] border-2 border-[#8D6E63] p-6 rounded-xl flex items-center gap-4 hover:border-[#D4AF37] hover:bg-[#3E2723] transition-all group shadow-xl"
                        >
                            <div className="bg-green-500 text-white p-4 rounded-full group-hover:scale-110 transition-transform">
                                <Leaf size={32} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-xl text-green-300">Jardim de Osanyin</h3>
                                <p className="text-sm opacity-80 mt-1">Tamagotchi de Ervas Sagradas.</p>
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {game === 'rpg' && <RPGComponent onBack={() => setGame('menu')} />}
        </div>
    );
};

export default StoryMode;
