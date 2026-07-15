import React, { useState } from 'react';
import { X, ChevronRight, Check } from 'lucide-react';
import { DivinationMethod, OpeleState } from '../types';

interface Props {
    method: 'opele' | 'opon' | 'ikin' | 'merindilogun';
    onComplete: (opeleResult?: OpeleState) => void;
    onBack: () => void;
}

// ─── STEP-BY-STEP preparations ───────────────────────────────────────────────

const STEPS: Record<string, { icon: string; title: string; desc: string; ofo?: string; ofoTr?: string }[]> = {
    opele: [
        {
            icon: '🚿',
            title: 'Pureza Pessoal — Limpeza e Estado Mental',
            desc: 'Lave as mãos, o rosto e os pés com água fresca (Omi Tutu). Vista-se adequadamente — preferencialmente branco ou cores claras. Se passou por situações de raiva ou estresse intenso, sente-se em silêncio por alguns minutos e respire fundo para equilibrar o Ori (cabeça) antes de tocar no Opelé.',
        },
        {
            icon: '🛖',
            title: 'Preparação do Espaço e Instrumentos',
            desc: 'Limpe e posicione o Opon-Ifá sobre uma esteira. Coloque o Opelé-Ifá sobre o tabuleiro ou ao seu lado, junto com os Ibó (instrumentos para respostas sim/não). Derrame um pouco de Omi Tutu no chão para refrescar o ambiente e acalmar as energias do espaço.',
        },
        {
            icon: '🙏',
            title: 'Mojubá — Reverência e Abertura Ritual',
            desc: 'Recite o Ìjùbá Ifá pedindo licença a Olodumare, aos ancestrais, aos mestres e a Esu (o mensageiro). Em seguida use a saudação universal a Orunmila:',
            ofo: 'Àbọ́rú, Àbọ́yẹ́, Àbọ́ṣíṣẹ.\nMojuba Olodumare. Mojuba Orunmila Baba mi.\nMojuba Esu Laroye, ode orun.\nMojuba gbogbo Egungun. Ase o.',
            ofoTr: 'Que as bênçãos se manifestem (saudação ritual a Orunmila).\nReverencio Olodumare. Reverencio Orunmila, meu Pai.\nReverencio Esu Laroye, mensageiro do céu.\nReverencio todos os Ancestrais. Que assim seja.',
        },
        {
            icon: '🔮',
            title: 'Ativação do Opelé com o Consulente',
            desc: 'Instrua o consulente a segurar o Opelé próximo à boca e mentalizar com clareza sua pergunta, depositando sua energia no instrumento por um momento. Em seguida, o Babalawo toca o Opelé no tabuleiro e nos quatro pontos cardeais antes do primeiro lançamento, para identificar o Odù regente da consulta. Agora inicie o jogo.',
        },
    ],
    opon: [
        {
            icon: '🌿',
            title: 'Espalhar o Iyerosun (Pó Sagrado)',
            desc: 'Com a ponta dos dedos, espalhe o Iyerosun (pó de ifá) uniformemente sobre a superfície do Opon Ifá, cobrindo toda a área de marcação. Este pó é o suporte das marcas do Odù — sem ele, Ifá não vê.',
        },
        {
            icon: '🙏',
            title: 'Mojuba — Saudação a Orunmila',
            desc: 'Antes de traçar qualquer marca, erga o Opon em direção ao sol (ou à luz) e profira a saudação sagrada:',
            ofo: 'Ìbà Orunmila Baba o.\nIboru, Iboya, Iboshishe.\nÀgbà tó gbèdè ikú s\'óde, àgbà tó gbèdè àrùn s\'óde.\nIfá jí mi, Ifá gbe mi o.',
            ofoTr: 'Reverência a Orunmila, o Pai.\nIboru, Iboya, Iboshishe (saudações rituais).\nO ancião que enviou a morte de volta, o ancião que enviou a doença de volta.\nIfá, acorde-me; Ifá, sustente-me.',
        },
        {
            icon: '✍️',
            title: 'Traçar as Marcas do Odù',
            desc: 'Com o dedo indicador direito, trace as marcas no Iyerosun conforme a posição das sementes do Opele simulado na tela. Duas marcas (||) = semente aberta. Uma marca (|) = semente fechada. Confirme o Odù na tela após traçar.',
        },
    ],
    ikin: [
        {
            icon: '🙏',
            title: 'Pureza e Invocação',
            desc: 'Sente-se em silêncio por um momento. Lave as mãos com água fresca (Omi Tutu). Erga os 16 Ikin simbolicamente em direção ao alto e profira a saudação a Orunmila.',
            ofo: 'Àbọ́rú, Àbọ́yẹ́, Àbọ́ṣíṣẹ.\nOrunmila Eleri Ipin, Ibikeji Olodumare.\nMo juba o, mo tire o.\nAse.',
            ofoTr: 'Que as bênçãos se manifestem.\nOrunmila, Testemunha do Destino, Vice de Deus.\nEu te saúdo, és perfeito.\nAse.',
        },
    ],
    merindilogun: [
        {
            icon: '💛',
            title: 'Invocar Oshun e Elegba',
            desc: 'Segure os 16 búzios com as duas mãos unidas sobre o coração. Invoque Elegba para abrir o caminho e Oshun para revelar a verdade:',
            ofo: 'Esu Laroye, abra o caminho deste jogo.\nOshun Yeyé Kari, mo pe o.\nGba mi, yan mi, se mi l\'awa rerin mole.\nAse.',
            ofoTr: 'Esu Laroye, abre o caminho deste jogo.\nOshun, Mãe que gargalha, eu te chamo.\nRecebe-me, guia-me, faz a verdade aparecer agora.\nAse.',
        },
        {
            icon: '🌊',
            title: 'Awọ — Molhar e Purificar os Búzios',
            desc: 'Passe os 16 búzios em Omi Tutu (água fresca) rezando mentalmente a saudação a Oshun. A água ativa o poder dos búzios e limpa qualquer energia dispersa antes do lançamento sagrado.',
        },
        {
            icon: '🎯',
            title: 'Lançar e Contar (Ona)',
            desc: 'Com as duas mãos juntas, sopre sobre os búzios e os lance sobre a Aṣọ (esteira ou pano branco). Conte quantos caem com a abertura (boca) voltada para cima — cada um aberto equivale a 1 ponto. O total revela o Odù (1-16). Confirme o Odù na tela após o lançamento.',
        },
    ],
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const OraclePreparation: React.FC<Props> = ({ method, onComplete, onBack }) => {
    const [step, setStep] = useState(0);

    const steps = STEPS[method] || [];
    const totalSteps = steps.length;
    const currentStep = steps[step];

    const next = () => {
        if (step < steps.length - 1) setStep(s => s + 1);
        else onComplete();
    };

    const titles: Record<string, string> = {
        opele: 'Opelé Ifá — Preparação Ritual',
        opon: 'Opon Ifá — Preparação Ritual',
        ikin: 'Ikin Ifá — Procedimento Sacerdotal',
        merindilogun: 'Mérìndílógún — Preparação dos Búzios',
    };

    return (
        <div className="fixed inset-0 z-[210] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-ifa-base border border-ifa-gold/30 rounded-2xl w-full max-w-lg shadow-2xl max-h-[92vh] overflow-y-auto relative animate-fade-in">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-ifa-border">
                    <div>
                        <p className="text-[10px] text-ifa-neutral uppercase tracking-widest">Obrigação Litúrgica</p>
                        <h2 className="text-ifa-gold font-serif font-bold text-lg">{titles[method]}</h2>
                    </div>
                    <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text p-2 bg-black/20 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                {/* Progress bar */}
                <div className="flex gap-1 px-5 pt-4">
                    {steps.map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= step ? 'bg-ifa-gold' : 'bg-ifa-border'}`} />
                    ))}
                </div>

                <div className="p-5">
                    {currentStep ? (
                        <div className="animate-fade-in">
                            {/* Step header */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">{currentStep.icon}</span>
                                <div>
                                    <p className="text-[10px] text-ifa-neutral uppercase">Passo {step + 1} de {totalSteps}</p>
                                    <h3 className="text-ifa-text font-bold text-base">{currentStep.title}</h3>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-ifa-base-dark border border-ifa-border rounded-xl p-4 mb-4">
                                <p className="text-ifa-neutral text-sm leading-relaxed">{currentStep.desc}</p>
                            </div>

                            {/* Ofó block */}
                            {currentStep.ofo && (
                                <div className="bg-ifa-surface border-l-4 border-ifa-gold rounded-r-xl p-4 mb-4">
                                    <p className="text-[10px] text-ifa-gold uppercase tracking-widest mb-2 font-bold">Em Iorubá — profira em voz alta:</p>
                                    <p className="text-ifa-text text-sm font-medium whitespace-pre-line italic leading-relaxed mb-3">
                                        "{currentStep.ofo}"
                                    </p>
                                    <p className="text-[10px] text-ifa-neutral uppercase tracking-widest mb-1">Tradução:</p>
                                    <p className="text-ifa-neutral text-xs whitespace-pre-line leading-relaxed">
                                        {currentStep.ofoTr}
                                    </p>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onComplete()}
                                    className="px-4 py-3 bg-black/30 text-ifa-neutral font-bold uppercase tracking-widest rounded-xl hover:text-white transition-all flex items-center justify-center"
                                    title="Pular toda a preparação (modo teste)"
                                >
                                    Pular
                                </button>
                                <button
                                    onClick={next}
                                    className="flex-1 py-3 bg-ifa-gold text-black font-bold uppercase tracking-widest rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                                >
                                    {step < steps.length - 1
                                        ? <><ChevronRight size={18} />Próximo Passo</>
                                        : <><Check size={18} />Concluído — Iniciar Jogo</>
                                    }
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default OraclePreparation;
