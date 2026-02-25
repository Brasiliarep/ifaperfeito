
import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Search, ChevronRight, ChevronLeft } from 'lucide-react';

const CHAPTERS = [
    { title: "Prefácio & Introdução", content: "Desvendando os Segredos de Ifá...\n\nIfá é o sistema esotérico de adivinhação e religião do povo Yoruba. Baseia-se em um corpus literário chamado Odu Ifá. Orunmila é o Orixá da Sabedoria e da Adivinhação. Ele esteve presente quando Olodumare criou o universo e, portanto, conhece o destino de todas as coisas.\n\nEste tratado visa compilar os ensinamentos sagrados para o Babalawo moderno." },
    { title: "Parte I: Ejiogbe", content: "Baba Ejiogbe alalekun moni lekun...\n\nEste é o primeiro Odu-Ifá e assinala o início de tudo. Representa o nascimento, a luz, a verdade e o caminho aberto. É o Odu da vida e da morte, do dia e da noite. Ele traz a mensagem de que a verdade sempre prevalecerá.\n\nReza:\n'Ejiogbe ni o gbe mi leke. Ki n ma subu, ki n ma yin.' (É Ejiogbe que me eleva. Que eu não caia, que eu não vacile)." },
    { title: "Parte II: Oyeku Meji", content: "Baba Oyeku Meji ariké madawá ejó Ogun...\n\nOyeku Meji é o segundo Odu na ordem de chegada. Ele representa a noite, o fim dos ciclos, a ancestralidade e a sabedoria oculta na escuridão. É o oposto de Ejiogbe. Enquanto Ejiogbe é a luz do sol, Oyeku é a lua e as estrelas.\n\nEste Odu avisa sobre a necessidade de respeitar os mais velhos e os mortos (Egun)." },
    { title: "Parte III: Iwori Meji", content: "Iwori Meji iguí iguí, miyo miyo...\n\nEste é um Odu masculino, filho de Tehitana. Representa o chacal, a visão, a clareza mental e a análise profunda. Fala sobre ver o que está escondido na mata.\n\nFala sobre transformação e a necessidade de examinar o caráter das pessoas ao redor." },
    { title: "Parte IV: Odi Meji", content: "Odi Meji axama, arumá...\n\nOdi Meji é um Odu feminino, filho de Orunmilá e Ologboro. Representa o fechamento, a proteção, a defesa e o útero. É o Odu da fertilidade e do renascimento, mas também do bloqueio se não for propiciado corretamente.\n\nFala sobre a necessidade de proteger a casa e a família." },
    { title: "Parte V: Irosun Meji", content: "Irosun Meji, o sonido da memória.\n\nFala sobre o sangue, a linhagem genética e a necessidade de sacrifício para manter a ordem. É o Odu das covas no chão (Irosun = pó vermelho).\n\nAvisa sobre perdas financeiras e problemas de saúde ligados ao sangue." },
    { title: "Parte VI: Owonrin Meji", content: "Owonrin, a cabeça do caos.\n\nFala sobre acidentes inesperados e reviravoltas do destino. É o Odu da falta de moderação. Tudo que vem rápido, vai rápido.\n\nConselho: Calma e paciência são essenciais." },
    { title: "Parte VII: Obara Meji", content: "Obara Meji, o Rei Rico.\n\nFala sobre prosperidade que vem após a dúvida e a incerteza. A história da abóbora que guardava riquezas. É o Odu do comércio e da fala.\n\nA língua pode salvar ou condenar." },
    { title: "Parte VIII: Okanran Meji", content: "Okanran, o problemático.\n\nFala sobre disputas, justiça e problemas legais. É o Odu de Xangô e Exu. Representa o 'Não' que precisa ser transformado em 'Sim' através do Ebó.\n\nCuidado com brigas de rua." }
];

const TreatiseView = ({ onBack }: { onBack: () => void }) => {
    const [currentChapter, setCurrentChapter] = useState(0);

    const nextChapter = () => {
        if (currentChapter < CHAPTERS.length - 1) setCurrentChapter(prev => prev + 1);
    };

    const prevChapter = () => {
        if (currentChapter > 0) setCurrentChapter(prev => prev - 1);
    };

    return (
        <div className="min-h-screen bg-[#F5F5DC] text-[#3E2723] flex flex-col">
            {/* Header with Safe Area Padding */}
            <div className="bg-[#3E2723] text-[#F5F5DC] p-4 pt-12 flex items-center justify-between sticky top-0 z-10 shadow-md">
                <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full"><ArrowLeft /></button>
                <h1 className="text-lg font-serif font-bold truncate">Tratado de Ifá (Corpus)</h1>
                <div className="w-10"></div>
            </div>

            {/* Controls */}
            <div className="p-4 bg-[#D2B48C]/30 border-b border-[#8D6E63] flex justify-between items-center sticky top-[88px] z-10 backdrop-blur-sm">
                <button onClick={prevChapter} disabled={currentChapter === 0} className="p-2 rounded hover:bg-black/10 disabled:opacity-30"><ChevronLeft /></button>
                <span className="font-bold text-xs uppercase tracking-wide truncate max-w-[200px] text-center">{CHAPTERS[currentChapter].title}</span>
                <button onClick={nextChapter} disabled={currentChapter === CHAPTERS.length - 1} className="p-2 rounded hover:bg-black/10 disabled:opacity-30"><ChevronRight /></button>
            </div>

            {/* Content */}
            <div className="flex-grow p-6 md:p-12 overflow-y-auto font-serif leading-loose text-lg max-w-3xl mx-auto w-full pb-24">
                <h2 className="text-3xl font-bold mb-8 text-[#5D4037] border-b-2 border-[#5D4037] pb-2 inline-block">
                    {CHAPTERS[currentChapter].title}
                </h2>
                
                <div className="whitespace-pre-line text-justify text-[#2E150F]">
                    {CHAPTERS[currentChapter].content}
                    
                    <div className="mt-12 p-6 bg-[#D2B48C]/20 border-l-4 border-[#5D4037] italic text-sm text-gray-600">
                        <strong>Nota do Arquivo:</strong> Esta é uma versão digital condensada do Tratado. Para a versão completa em PDF (5000+ páginas), consulte a biblioteca física do templo ou solicite o acesso ao acervo restrito do Babalawo.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreatiseView;
