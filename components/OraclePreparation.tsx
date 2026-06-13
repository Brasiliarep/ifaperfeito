import React, { useState } from 'react';
import { X, ChevronRight, RefreshCw, Check, Loader2 } from 'lucide-react';
import { DivinationMethod, OpeleState, SeedState } from '../types';

interface Props {
    method: 'opele' | 'opon' | 'ikin' | 'merindilogun';
    onComplete: (opeleResult?: OpeleState) => void;
    onBack: () => void;
}

// ─── IBO IKIN — 8 interactive throws ────────────────────────────────────────
const IkinThrow: React.FC<{ onComplete: (state: OpeleState) => void }> = ({ onComplete }) => {
    const [throws, setThrows] = useState<(1 | 2)[]>([]); // 1=closed(I), 2=open(II)
    const [throwing, setThrowing] = useState(false);

    function somIkin() {
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(200 + Math.random() * 80, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.type = 'sine';
        osc.start(); osc.stop(ctx.currentTime + 0.2);
      } catch {}
    }

    const doThrow = () => {
        if (throws.length >= 8 || throwing) return;
        setThrowing(true);
        somIkin();
        setTimeout(() => {
            const remaining = Math.random() < 0.5 ? 1 : 2; // 1 nut remaining = 2 marks; 2 remaining = 1 mark
            setThrows(prev => {
                const next = [...prev, remaining as 1 | 2];
                if (next.length === 8) {
                    const toSeed = (v: 1 | 2): SeedState => v === 1 ? 'open' : 'closed';
                    const state: OpeleState = {
                        rightLeg: [toSeed(next[0]), toSeed(next[1]), toSeed(next[2]), toSeed(next[3])],
                        leftLeg: [toSeed(next[4]), toSeed(next[5]), toSeed(next[6]), toSeed(next[7])],
                    };
                    setTimeout(() => onComplete(state), 1200);
                }
                return next;
            });
            setThrowing(false);
        }, 600);
    };

    const reset = () => setThrows([]);

    const markLabel = (v: 1 | 2) => v === 1
        ? <span className="text-xs font-mono text-ifa-gold font-bold">|| (2 marcas)</span>
        : <span className="text-xs font-mono text-ifa-neutral font-bold">|&nbsp; (1 marca)</span>;

    const remaining = 8 - throws.length;

    return (
        <div className="flex flex-col items-center gap-5 w-full">
            <div className="text-center">
                <p className="text-ifa-gold font-serif text-lg font-bold">Ikin Ifá — Lançamento Sacerdotal</p>
                <p className="text-ifa-neutral text-xs mt-1">
                    Segure os 16 Ikin na mão direita. Passe para a esquerda e conte os que ficam.
                    <br /><span className="text-ifa-gold">1 restante = 2 marcas (||) · 2 restantes = 1 marca (|)</span>
                </p>
            </div>

            {/* Throw grid 2×4 */}
            <div className="grid grid-cols-4 gap-2 w-full max-w-xs">
                {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className={`ikin aspect-square rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all ${throws[i] !== undefined
                        ? 'bg-ifa-gold/10 border-ifa-gold/50'
                        : i === throws.length
                            ? 'border-ifa-gold/40 bg-ifa-surface animate-pulse'
                            : 'border-ifa-border bg-ifa-base-dark'
                        }`}
                        style={{ '--dx': `${(Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 30)}px`, '--dr': `${(Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 10)}deg` } as any}>
                        <span className="text-[9px] text-ifa-neutral uppercase">{i < 4 ? `D${i + 1}` : `E${i - 3}`}</span>
                        {throws[i] !== undefined
                            ? <span className="text-[11px] font-mono font-bold text-ifa-gold">{throws[i] === 1 ? '||' : '|'}</span>
                            : i === throws.length && <span className="text-ifa-gold text-xs">→</span>
                        }
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex gap-6 text-xs text-ifa-neutral">
                <span>D1-D4 = <span className="text-ifa-gold">Lado Direito</span></span>
                <span>E1-E4 = <span className="text-ifa-gold">Lado Esquerdo</span></span>
            </div>

            {/* Result preview */}
            {throws.length > 0 && (
                <div className="bg-ifa-base-dark border border-ifa-border rounded-xl p-3 w-full max-w-xs">
                    <p className="text-[10px] text-ifa-neutral uppercase tracking-widest mb-2 text-center">Lançamentos</p>
                    <div className="flex gap-2 flex-wrap justify-center">
                        {throws.map((v, i) => (
                            <div key={i} className="text-center">
                                <div className="text-[10px] text-ifa-neutral">{i < 4 ? `D${i + 1}` : `E${i - 3}`}</div>
                                {markLabel(v)}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex gap-3 w-full max-w-xs">
                {throws.length < 8 ? (
                    <button
                        onClick={doThrow}
                        disabled={throwing}
                        className="flex-1 py-3 bg-ifa-gold text-black font-bold uppercase tracking-widest rounded-xl hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                        {throwing
                            ? <><Loader2 className="animate-spin" size={18} />Lançando...</>
                            : <>🌰 Lançar ({remaining} restantes)</>
                        }
                    </button>
                ) : (
                    <div className="flex-1 py-3 bg-green-700/30 border border-green-500/50 text-green-300 font-bold uppercase text-center rounded-xl flex items-center justify-center gap-2">
                        <Check size={18} />Odù Revelado — Aguarde...
                    </div>
                )}
                {throws.length > 0 && throws.length < 8 && (
                    <button onClick={reset} className="p-3 border border-ifa-border text-ifa-neutral hover:text-ifa-text rounded-xl">
                        <RefreshCw size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};

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
    const isIkin = method === 'ikin';
    const totalSteps = isIkin ? 1 : steps.length;
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
                {!isIkin && (
                    <div className="flex gap-1 px-5 pt-4">
                        {steps.map((_, i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= step ? 'bg-ifa-gold' : 'bg-ifa-border'}`} />
                        ))}
                    </div>
                )}

                <div className="p-5">
                    {/* Ikin: interactive throw UI */}
                    {isIkin ? (
                        <IkinThrow onComplete={opeleState => onComplete(opeleState)} />
                    ) : currentStep ? (
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
                            <button
                                onClick={next}
                                className="w-full py-3 bg-ifa-gold text-black font-bold uppercase tracking-widest rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
                            >
                                {step < steps.length - 1
                                    ? <><ChevronRight size={18} />Próximo Passo</>
                                    : <><Check size={18} />Concluído — Iniciar Jogo</>
                                }
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default OraclePreparation;
