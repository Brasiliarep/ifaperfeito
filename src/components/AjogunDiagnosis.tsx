
import React, { useState } from 'react';
import {
    ArrowLeft, Stethoscope, AlertTriangle, Search, Loader2,
    Eye, Wind, Zap, Skull, Scale, Lock, CloudLightning, Flame,
    ChevronDown, ChevronUp, BookOpen, Shield, Target, Swords, ScrollText
} from 'lucide-react';
import { searchAjogunRemedy, fetchAjogunFullEbo, type FullEbo } from '../services/geminiService';
import EboSheet from './EboSheet';

// ─── DADOS LOCAIS DOS 8 AJOGUNS ───────────────────────────────────────────────
const OITO_AJOGUNS = [
    {
        id: 'iku', number: 1, name: 'Ikú', yoruba: 'Ikú', color: 'from-gray-900 to-black', border: 'border-gray-500',
        badge: 'bg-gray-700 text-gray-200', icon: Skull,
        domain: 'Morte prematura, fim de ciclos, extinção',
        sinal: 'Sonhos com mortos, presença de Egungun, mau presságio em cruzamento de caminhos',
        oduLink: 'Oyeku Meji', remedy: 'Ebó com Agbo (carneiro) para Oyeku. Uso de Aso Funfun (branco) por 16 dias.'
    },
    {
        id: 'arun', number: 2, name: 'Àrùn', yoruba: 'Àrùn', color: 'from-green-950 to-emerald-900', border: 'border-green-600',
        badge: 'bg-green-800 text-green-100', icon: Zap,
        domain: 'Doenças físicas e crônicas, infecções, males do corpo',
        sinal: 'Calafrios sem febre, dores sem causa médica, mal-estar constante, sensação de queimação',
        oduLink: 'Odi Meji', remedy: 'Banho de Ewe Dongoyaro, Efun e Omi Tutu. Bori com coco e mel.'
    },
    {
        id: 'ofo', number: 3, name: 'Òfò', yoruba: 'Òfò', color: 'from-yellow-950 to-amber-900', border: 'border-yellow-600',
        badge: 'bg-yellow-700 text-yellow-100', icon: Wind,
        domain: 'Perdas materiais, financeiras e emocionais',
        sinal: 'Dinheiro escorrega das mãos, objetos sumindo, relacionamentos que se desfazem inexplicavelmente',
        oduLink: 'Iwori Meji', remedy: 'Ebó com Obi, Ero, Obi Abata e Omi para Esu Elegba. Evitar emprestar dinheiro por 21 dias.'
    },
    {
        id: 'oran', number: 4, name: 'Òràn', yoruba: 'Òràn', color: 'from-red-950 to-red-900', border: 'border-red-500',
        badge: 'bg-red-800 text-red-100', icon: Scale,
        domain: 'Grandes problemas, litígios, processos judiciais, vergonha pública',
        sinal: 'Conflitos que surgem do nada, acusações injustas, inimigos ocultos que emergem',
        oduLink: 'Okanran Meji', remedy: 'Oferenda de Akuko (galo) e Epo Pupa para Ogun. Rezar Ogun Onile por 7 dias.'
    },
    {
        id: 'ejo', number: 5, name: 'Ẹjọ', yoruba: 'Ẹjọ', color: 'from-purple-950 to-purple-900', border: 'border-purple-500',
        badge: 'bg-purple-800 text-purple-100', icon: Target,
        domain: 'Acusação falsa, escândalo, desonra, calúnia',
        sinal: 'Fofoca persistente, nome manchado sem razão, ser apontado injustamente',
        oduLink: 'Ogbe Meji', remedy: 'Banho de Ewe Imi Esu e Ewe Efun. Oferecer Obi e Omi para Şango pedindo justiça.'
    },
    {
        id: 'ewon', number: 6, name: 'Èwọn', yoruba: 'Èwọn', color: 'from-orange-950 to-orange-900', border: 'border-orange-500',
        badge: 'bg-orange-800 text-orange-100', icon: Lock,
        domain: 'Prisão, armadilhas, grilhões espirituais, caminhos fechados',
        sinal: 'Sensação de estar preso, projetos que nunca avançam, bloqueio em todas as frentes',
        oduLink: 'Owonrin Meji', remedy: 'Ebó de abertura de caminhos com Epo Pupa para Esu. Jogar 3 moedas numa encruzilhada.'
    },
    {
        id: 'aisan', number: 7, name: 'Àìsàn', yoruba: 'Àìsàn', color: 'from-teal-950 to-teal-900', border: 'border-teal-500',
        badge: 'bg-teal-800 text-teal-100', icon: CloudLightning,
        domain: 'Enfermidade crônica, recaídas, mal persistente que não cura',
        sinal: 'Doença que tratamentos médicos não resolvem, ciclos que se repetem, exaustão espiritual',
        oduLink: 'Otura Meji', remedy: 'Bori completo com Ori Inu e Efun. Banho de Ewe Ponpele e Manjericão sagrado (Efinrin).'
    },
    {
        id: 'ese', number: 8, name: 'Ẹṣẹ', yoruba: 'Ẹṣẹ', color: 'from-rose-950 to-rose-900', border: 'border-rose-500',
        badge: 'bg-rose-800 text-rose-100', icon: Flame,
        domain: 'Maldição, veneno espiritual, trabalho feito contra o consulente',
        sinal: 'Azarrento persistente, sensação de ser seguido, cheiro de coisa podre sem origem',
        oduLink: 'Osa Meji', remedy: 'Defumação com Efin (fumo) e Ewe Amodi. Consulta urgente com Babalawo para quebrar o Ṣé.'
    }
];

// ─── SINTOMAS SENSORIAIS RÁPIDOS ──────────────────────────────────────────────
const SINTOMAS_SENSORIAIS = [
    { id: 's1', label: 'Vulto ou sombra', query: 'Vi um vulto ou sombra inexplicável' },
    { id: 's2', label: 'Calafrio repentino', query: 'Senti calafrio repentino sem motivo físico' },
    { id: 's3', label: 'Peso nos ombros', query: 'Sinto peso nos ombros e costas constantemente' },
    { id: 's4', label: 'Pesadelos repetitivos', query: 'Tenho pesadelos repetitivos com mortos ou perseguição' },
    { id: 's5', label: 'Azar persistente', query: 'Azar e má sorte constante em tudo que faço' },
    { id: 's6', label: 'Enjoo espiritual', query: 'Enjoo e náusea sem causa médica, especialmente em locais específicos' },
    { id: 's7', label: 'Dinheiro escorrega', query: 'Perco dinheiro inexplicavelmente, gastos que não consigo controlar' },
    { id: 's8', label: 'Travado / sem rumo', query: 'Sinto que estou preso, nada avança, caminhos fechados' },
    { id: 's9', label: 'Cheiro inexplicável', query: 'Sinto cheiro de coisa podre ou terra sem origem aparente' },
    { id: 's10', label: 'Conflitos constantes', query: 'Conflitos e brigas surgem do nada ao meu redor' },
    { id: 's11', label: 'Presença invasiva', query: 'Sensação de presença constante, ser observado ou seguido' },
    { id: 's12', label: 'Energia drenada', query: 'Cansaço extremo, energia drenada mesmo após descanso' },
];

// ─── ZONAS CORPORAIS ──────────────────────────────────────────────────────────
const BODY_ZONES = [
    { id: 'ori', label: 'Orí (Cabeça)', query: 'Dores de cabeça, confusão mental, pensamentos negativos constantes' },
    { id: 'peito', label: 'Okan (Coração)', query: 'Angústia no peito, ansiedade, aperto no coração sem causa cardíaca' },
    { id: 'barriga', label: 'Inu (Estômago)', query: 'Medo, ansiedade, aperto no estômago, problemas digestivos espirituais' },
    { id: 'costas', label: 'Ehin (Costas)', query: 'Peso espiritual nas costas, sensação de carregar fardo de Egungun' },
    { id: 'pernas', label: 'Ese (Pernas/Pés)', query: 'Caminhos fechados, incapacidade de progredir, pernas pesadas' },
];

// ─── TIPO DO RESULTADO ─────────────────────────────────────────────────────────
interface AjogunResult {
    ajogunName: string;
    yorubaName: string;
    hierarchy: number;
    spiritualCause: string;
    symptoms: string[];
    suggestedRemedy: string;
    ofo: string;
    oduReference: string;
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
const AjogunDiagnosis = ({ onBack }: { onBack: () => void }) => {
    const [customSymptom, setCustomSymptom] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [result, setResult] = useState<AjogunResult | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [showCosmology, setShowCosmology] = useState(false);
    const [expandedAjogun, setExpandedAjogun] = useState<string | null>(null);

    // ─── EBO SHEET STATE ─────────────────────────────────────────────────────
    const [eboSheet, setEboSheet] = useState<{ open: boolean; data: FullEbo | null; loading: boolean; preset: 'babalawo' | 'consulente' }>({
        open: false, data: null, loading: false, preset: 'babalawo'
    });

    const handleFazerEbo = async (preset: 'babalawo' | 'consulente') => {
        if (!result) return;
        setEboSheet({ open: true, data: null, loading: true, preset });
        try {
            const fullEbo = await fetchAjogunFullEbo(
                result.ajogunName,
                result.yorubaName || result.ajogunName,
                result.symptoms || [],
                result.suggestedRemedy
            );
            setEboSheet({ open: true, data: fullEbo, loading: false, preset });
        } catch {
            setEboSheet({ open: false, data: null, loading: false, preset: 'babalawo' });
        }
    };

    const runDiagnosis = async (query: string, triggerId: string) => {
        setSelectedId(triggerId);
        setIsSearching(true);
        setResult(null);
        try {
            const res = await searchAjogunRemedy(query, 'pt-BR');
            setResult(res as AjogunResult);
        } catch {
            alert('Erro ao consultar o Oráculo de Ifá.');
        } finally {
            setIsSearching(false);
        }
    };

    const hierarchyColor = (n: number) => {
        if (n === 1) return 'bg-gray-700 text-gray-200';
        if (n <= 3) return 'bg-red-800 text-red-100';
        if (n <= 6) return 'bg-orange-800 text-orange-100';
        return 'bg-amber-800 text-amber-100';
    };

    return (
        <div className="min-h-screen bg-[#0f0a05] text-[#F5F5DC] p-4 flex flex-col overflow-y-auto">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button onClick={onBack} className="text-gray-400 hover:text-ifa-gold p-1 rounded-full hover:bg-white/5 transition-colors">
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-lg font-serif text-ifa-gold flex items-center gap-2">
                    <Stethoscope size={18} /> Diagnóstico Ajogun
                </h1>
                <div className="w-8" />
            </div>

            {/* Intro banner */}
            <div className="bg-gradient-to-r from-purple-950/60 to-red-950/60 border border-purple-700/40 rounded-xl p-4 mb-5 text-sm text-gray-300 leading-relaxed">
                <p className="mb-1 text-purple-300 font-bold text-xs uppercase tracking-widest">Sobre os Ajoguns</p>
                <p>
                    Ajoguns são as forças adversas da cosmologia Yorùbá — "guerreiros contra a humanidade".
                    Ao contrário dos Orixás (benevolentes), os Ajoguns testam e desequilibram.
                    Não são demônios: são forças cósmicas de oposição que fazem parte do equilíbrio universal.
                    Ifá os diagnostica e prescreve Ebós para apaziguá-los.
                </p>
                <button
                    onClick={() => setShowCosmology(!showCosmology)}
                    className="mt-3 flex items-center gap-1 text-purple-400 hover:text-purple-200 text-xs font-bold transition-colors"
                >
                    <BookOpen size={13} />
                    {showCosmology ? 'Ocultar' : 'Ver'} os 8 Líderes Ajoguns
                    {showCosmology ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>
            </div>

            {/* Os 8 Ajoguns — accordion */}
            {showCosmology && (
                <div className="mb-6 space-y-2">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 text-center">Hierarquia dos 8 Líderes</p>
                    {OITO_AJOGUNS.map(aj => {
                        const Icon = aj.icon;
                        const open = expandedAjogun === aj.id;
                        return (
                            <div key={aj.id} className={`border ${aj.border} rounded-lg overflow-hidden bg-gradient-to-r ${aj.color}`}>
                                <button
                                    className="w-full flex items-center gap-3 px-4 py-3 text-left"
                                    onClick={() => setExpandedAjogun(open ? null : aj.id)}
                                >
                                    <span className={`${aj.badge} text-xs font-bold rounded-full px-2 py-0.5`}>#{aj.number}</span>
                                    <Icon size={16} className="text-gray-300 flex-shrink-0" />
                                    <span className="font-bold text-white flex-grow">{aj.name}</span>
                                    <span className="text-gray-400 text-xs italic hidden sm:block">{aj.domain.split(',')[0]}</span>
                                    {open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
                                </button>
                                {open && (
                                    <div className="px-4 pb-4 space-y-2 text-sm">
                                        <p><span className="text-gray-400 font-bold">Domínio:</span> <span className="text-gray-200">{aj.domain}</span></p>
                                        <p><span className="text-gray-400 font-bold">Sinais:</span> <span className="text-gray-300 italic">{aj.sinal}</span></p>
                                        <p><span className="text-gray-400 font-bold">Odù:</span> <span className="text-yellow-300">{aj.oduLink}</span></p>
                                        <p className="bg-black/30 p-2 rounded text-xs text-gray-300 border border-white/10">
                                            <span className="text-green-400 font-bold">Remédio Base:</span> {aj.remedy}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ─── SINTOMAS SENSORIAIS ─── */}
            <div className="mb-5">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Eye size={13} /> Manifestações Sensoriais
                </p>
                <div className="flex flex-wrap gap-2">
                    {SINTOMAS_SENSORIAIS.map(s => (
                        <button
                            key={s.id}
                            onClick={() => runDiagnosis(s.query, s.id)}
                            disabled={isSearching}
                            className={`px-3 py-1.5 rounded-full border text-xs font-semibold transition-all disabled:opacity-50 ${selectedId === s.id
                                ? 'bg-purple-800 border-purple-400 text-purple-100 shadow-lg shadow-purple-900/40'
                                : 'bg-[#1a1510] border-gray-700 text-gray-300 hover:border-purple-600 hover:text-purple-200'
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── ZONAS CORPORAIS ─── */}
            <div className="mb-5">
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Shield size={13} /> Zona do Corpo Afetada
                </p>
                <div className="flex flex-wrap gap-2">
                    {BODY_ZONES.map(z => (
                        <button
                            key={z.id}
                            onClick={() => runDiagnosis(z.query, z.id)}
                            disabled={isSearching}
                            className={`px-3 py-2 rounded-lg border text-xs font-bold uppercase transition-all disabled:opacity-50 ${selectedId === z.id
                                ? 'bg-red-900 border-red-400 text-red-100'
                                : 'bg-[#1a1510] border-gray-700 text-gray-300 hover:border-red-700 hover:text-red-300'
                                }`}
                        >
                            {z.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ─── INPUT LIVRE ─── */}
            <div className="bg-[#1a1510] border border-gray-700 rounded-xl p-4 mb-6">
                <h3 className="text-ifa-gold text-xs font-bold uppercase mb-2 flex items-center gap-2">
                    <Swords size={13} /> Descreva o Sintoma ou Situação
                </h3>
                <div className="flex gap-2">
                    <input
                        value={customSymptom}
                        onChange={e => setCustomSymptom(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && customSymptom.trim()) runDiagnosis(customSymptom, 'custom'); }}
                        placeholder="Ex: Vi um vulto, sinto frio constante, perco dinheiro..."
                        className="flex-grow bg-black/40 border border-gray-700 rounded px-3 py-2 text-sm text-gray-200 focus:border-ifa-gold outline-none placeholder:text-gray-600"
                    />
                    <button
                        onClick={() => { if (customSymptom.trim()) runDiagnosis(customSymptom, 'custom'); }}
                        disabled={!customSymptom.trim() || isSearching}
                        className="bg-purple-900 border border-purple-600 text-white px-4 rounded hover:bg-purple-800 disabled:opacity-50 flex items-center gap-2 transition-colors"
                    >
                        {isSearching ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                    </button>
                </div>
            </div>

            {/* ─── LOADING ─── */}
            {isSearching && (
                <div className="text-center py-10 animate-pulse">
                    <Loader2 className="animate-spin mx-auto text-purple-400 mb-3" size={36} />
                    <p className="text-purple-300 text-sm">Ifá está consultando os Ajoguns...</p>
                </div>
            )}

            {/* ─── RESULTADO ─── */}
            {result && !isSearching && (
                <div className="bg-gradient-to-b from-purple-950/40 to-black/60 border-2 border-purple-600 rounded-2xl p-5 space-y-4 animate-fade-in">

                    {/* Cabeçalho do resultado */}
                    <div className="flex items-center gap-3 border-b border-purple-700/40 pb-3">
                        <AlertTriangle className="text-purple-400 flex-shrink-0" size={28} />
                        <div>
                            <p className="text-xs text-gray-500 uppercase">Força Identificada</p>
                            <h2 className="text-2xl font-bold text-white">{result.ajogunName}</h2>
                            <p className="text-purple-300 text-sm italic">{result.yorubaName}</p>
                        </div>
                        {result.hierarchy && (
                            <span className={`ml-auto text-xs font-bold px-2 py-1 rounded-full ${hierarchyColor(result.hierarchy)}`}>
                                #{result.hierarchy} líder
                            </span>
                        )}
                    </div>

                    {/* Causa espiritual */}
                    <div>
                        <p className="text-xs text-purple-400 font-bold uppercase mb-1">Causa Espiritual</p>
                        <p className="text-gray-200 text-sm leading-relaxed">{result.spiritualCause}</p>
                    </div>

                    {/* Sintomas identificados */}
                    {result.symptoms && result.symptoms.length > 0 && (
                        <div>
                            <p className="text-xs text-purple-400 font-bold uppercase mb-2">Sintomas Associados</p>
                            <div className="flex flex-wrap gap-2">
                                {result.symptoms.map((s, i) => (
                                    <span key={i} className="bg-purple-900/40 border border-purple-600/40 text-purple-200 text-xs px-2 py-1 rounded-full">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Remédio */}
                    <div className="bg-black/40 border border-green-700/40 rounded-xl p-3">
                        <p className="text-xs text-green-400 font-bold uppercase mb-1">Remédio Prescrito (Ebó)</p>
                        <p className="text-gray-200 text-sm leading-relaxed">{result.suggestedRemedy}</p>
                    </div>

                    {/* Ofó */}
                    {result.ofo && (
                        <div className="bg-black/30 border border-yellow-700/30 rounded-xl p-3">
                            <p className="text-xs text-yellow-400 font-bold uppercase mb-1">Ofó (Reza)</p>
                            <p className="text-yellow-200 text-sm italic leading-relaxed">{result.ofo}</p>
                        </div>
                    )}

                    {/* Odù */}
                    {result.oduReference && (
                        <p className="text-xs text-gray-500 text-right">
                            Odù de referência: <span className="text-ifa-gold font-bold">{result.oduReference}</span>
                        </p>
                    )}

                    {/* Aviso */}
                    <p className="text-xs text-gray-600 text-center italic border-t border-gray-800 pt-3">
                        ⚠️ Este diagnóstico é orientativo. Para confirmação definitiva, consulte um Babalawo para o Jogo de Ifá.
                    </p>

                    {/* Botões de Ação */}
                    <div className="grid grid-cols-2 gap-3 mt-2">
                        <button
                            onClick={() => handleFazerEbo('babalawo')}
                            className="flex flex-col items-center justify-center gap-1 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl py-3 transition-all"
                        >
                            <Shield size={18} className="text-ifa-gold" />
                            <span className="text-[10px] uppercase font-bold text-ifa-gold">Imp. Babalawo</span>
                        </button>
                        <button
                            onClick={() => handleFazerEbo('consulente')}
                            className="flex flex-col items-center justify-center gap-1 bg-ifa-gold/10 border border-ifa-gold/20 hover:bg-ifa-gold/20 rounded-xl py-3 transition-all"
                        >
                            <ScrollText size={18} className="text-ifa-gold" />
                            <span className="text-[10px] uppercase font-bold text-white">Imp. Consulente</span>
                        </button>
                    </div>
                </div>
            )}

            {/* EboSheet Modal */}
            {eboSheet.open && (
                <EboSheet
                    ebo={eboSheet.data || {
                        titulo: 'Carregando Ebó...',
                        orixaRegente: '...',
                        materiais: [],
                        passos: [],
                        ofo: '',
                        ofo_traducao: '',
                        orcamento_estimado: 0,
                        observacoes: '',
                    }}
                    isLoading={eboSheet.loading}
                    initialPreset={eboSheet.preset}
                    onClose={() => setEboSheet({ open: false, data: null, loading: false, preset: 'babalawo' })}
                />
            )}

            <div className="h-12" />
        </div>
    );
};

export default AjogunDiagnosis;
