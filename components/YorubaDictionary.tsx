
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Book, Volume2, Loader2, Filter } from 'lucide-react';
import { searchYorubaDictionary } from '../services/geminiService';
import TextReader from './TextReader';

// DATABASE ROBUSTA (50+ Termos)
const STATIC_DB: Record<string, any> = {
    'ase': { word: 'Aṣẹ', phonetic: '/ah-sheh/', meaning: 'Força vital, poder de realização, amém. A energia que faz as coisas acontecerem.', usage_example: 'Aṣẹ Olódùmarè (Pelo poder de Deus).' },
    'abo': { word: 'Àbò', phonetic: '/ah-boh/', meaning: 'Proteção, escudo, defesa espiritual.', usage_example: 'Fun mi ni àbò (Dê-me proteção).' },
    'aje': { word: 'Ajé', phonetic: '/ah-jeh/', meaning: 'Riqueza, dinheiro, comércio. Também se refere às Iyami (Mães Ancestrais).', usage_example: 'Aje a wo ile (A riqueza entra em casa).' },
    'akose': { word: 'Àkóse', phonetic: '/ah-koh-she/', meaning: 'Medicina mágica de Ifá. O uso de encantamentos e materiais para alterar a realidade.', usage_example: 'Akose jaiye (Remédio para vencer na vida).' },
    'babalawo': { word: 'Babalawo', phonetic: '/ba-ba-la-wo/', meaning: 'Pai do Segredo. Sacerdote supremo de Ifá.', usage_example: 'Babalawo n bo (O sacerdote está chegando).' },
    'ebo': { word: 'Ebó', phonetic: '/eh-boh/', meaning: 'Sacrifício, oferenda. O ato de manipular energia para alterar o destino.', usage_example: 'Ebó riru (Oferecer sacrifício).' },
    'egun': { word: 'Egún', phonetic: '/eh-goon/', meaning: 'Espírito ancestral, ossos, a morte familiar.', usage_example: 'Egun ile (Ancestral da casa).' },
    'esu': { word: 'Èṣù', phonetic: '/eh-shoo/', meaning: 'O mensageiro divino, dono dos caminhos e do caos criativo.', usage_example: 'Esu Odara (Exu bondoso).' },
    'ifá': { word: 'Ifá', phonetic: '/ee-fah/', meaning: 'O sistema oracular, a sabedoria de Olodumare.', usage_example: 'Ifá gbe wa (Ifá nos apoie).' },
    'iwa': { word: 'Ìwà', phonetic: '/ee-wah/', meaning: 'Caráter, comportamento. A essência da beleza em Ifá.', usage_example: 'Ìwà l\'ẹwà (O caráter é a beleza).' },
    'iyami': { word: 'Ìyàmi', phonetic: '/ee-yah-me/', meaning: 'Minhas Mães. As feiticeiras ancestrais, donas do pássaro.', usage_example: 'Iba Iyami Osoronga.' },
    'odu': { word: 'Odù', phonetic: '/oh-doo/', meaning: 'Caminho, destino, recipiente. Os 256 arquétipos da criação.', usage_example: 'Odu to jade (O Odu que saiu).' },
    'olodumare': { word: 'Olódùmarè', phonetic: '/oh-lo-doo-ma-reh/', meaning: 'Deus Supremo, o dono da fonte da criação.', usage_example: 'Iba Olodumare.' },
    'ori': { word: 'Orí', phonetic: '/oh-ree/', meaning: 'Cabeça (física e espiritual). O Deus pessoal de cada indivíduo.', usage_example: 'Ori mi gbe mi (Meu Ori me apoie).' },
    'orun': { word: 'Ọ̀run', phonetic: '/aw-roon/', meaning: 'Céu, mundo espiritual, morada dos ancestrais.', usage_example: 'Ara Orun (Habitante do céu).' },
    'osogbo': { word: 'Osogbo', phonetic: '/oh-sho-gbo/', meaning: 'Negatividade, azar, má sorte. Oposto de Ire.', usage_example: 'Osogbo kuro (Mal vá embora).' },
    'ire': { word: 'Irê', phonetic: '/ee-reh/', meaning: 'Sorte, bem-estar, bênçãos.', usage_example: 'Ire aje (Sorte de dinheiro).' },
    'agbonniregun': { word: 'Agbọnmìrègún', phonetic: '/ag-bon-mi-reh-goon/', meaning: 'Título de louvor a Orunmila.', usage_example: 'Ifa Agbonmiregun.' },
    'ajogun': { word: 'Ajogun', phonetic: '/ah-jo-goon/', meaning: 'Guerreiros do mal (Morte, Doença, Perda).', usage_example: 'Ajogun ma se mi.' },
    'apejure': { word: 'Apèjúwe', phonetic: '/ah-peh-joo-weh/', meaning: 'Descrição, padrão, exemplo.' },
    'aye': { word: 'Ayé', phonetic: '/ah-yeh/', meaning: 'Terra, mundo físico, vida.', usage_example: 'Aye loja (A terra é um mercado).' },
    'babalorisa': { word: 'Babálórìṣà', phonetic: '/ba-ba-lo-ree-sha/', meaning: 'Pai de Santo, sacerdote de Orixá.' },
    'difa': { word: 'Dáfá', phonetic: '/da-fah/', meaning: 'Consultar o oráculo de Ifá.' },
    'eje': { word: 'Ẹ̀jẹ̀', phonetic: '/eh-jeh/', meaning: 'Sangue. A força vital vermelha.', usage_example: 'Eje n san (O sangue flui).' },
    'eko': { word: 'Ẹ̀kọ', phonetic: '/eh-kaw/', meaning: 'Acaçá, massa de milho branco.', usage_example: 'Eko fun Esu.' },
    'ewe': { word: 'Ewé', phonetic: '/eh-weh/', meaning: 'Folha, erva, medicina vegetal.', usage_example: 'Ewe Ifá (Folha de Ifá).' },
    'faworun': { word: 'Fawọrun', phonetic: '/fa-wo-roon/', meaning: 'Aquele que vê o céu.' },
    'gbigbona': { word: 'Gbígbóná', phonetic: '/gbee-gbo-nah/', meaning: 'Quente, calor, febre.' },
    'ibu': { word: 'Ibú', phonetic: '/ee-boo/', meaning: 'Profundidade, rio fundo.' },
    'ikin': { word: 'Ikin', phonetic: '/ee-keen/', meaning: 'Semente de dendezeiro sagrada usada para divinação.' },
    'ile': { word: 'Ilé', phonetic: '/ee-leh/', meaning: 'Casa, terra, lar.' },
    'ipese': { word: 'Ipèsè', phonetic: '/ee-peh-sheh/', meaning: 'Oferenda especial para as Iyami (Mães).' },
    'iroke': { word: 'Irokẹ', phonetic: '/ee-ro-keh/', meaning: 'Sino ou badalo de madeira/marfim do Babalawo.' },
    'iruke': { word: 'Irukẹ', phonetic: '/ee-roo-keh/', meaning: 'Cauda de animal usada como cetro de poder.' },
    'itan': { word: 'Ìtàn', phonetic: '/ee-tan/', meaning: 'História, mito, lenda de um Odu.' },
    'iyerosun': { word: 'Iyèròsùn', phonetic: '/ee-yeh-ro-soon/', meaning: 'Pó amarelo sagrado do Irosun (árvore) para marcar Odus.' },
    'jijo': { word: 'Jijọ', phonetic: '/jee-jaw/', meaning: 'Ato de queimar/torrar ervas para fazer pó preto.' },
    'kabiyesi': { word: 'Kábíyèsí', phonetic: '/ka-bee-yeh-see/', meaning: 'Sua Majestade (Saudação a Reis).' },
    'lilo': { word: 'Lílò', phonetic: '/lee-loh/', meaning: 'Uso, aplicação, moagem.' },
    'maferefun': { word: 'Mafèrèfún', phonetic: '/ma-feh-reh-foon/', meaning: 'Louvado seja (termo da Santeria/Lukumi).' },
    'oba': { word: 'Ọba', phonetic: '/aw-ba/', meaning: 'Rei, governante.' },
    'obi': { word: 'Obì', phonetic: '/oh-bee/', meaning: 'Noz de cola, usada para perguntas sim/não.' },
    'ogun': { word: 'Ògún', phonetic: '/oh-goon/', meaning: 'Orixá do ferro, guerra e tecnologia.' },
    'omi': { word: 'Omi', phonetic: '/oh-me/', meaning: 'Água.' },
    'opon': { word: 'Ọpọn', phonetic: '/aw-pon/', meaning: 'Tabuleiro de adivinhação de Ifá.' },
    'oriki': { word: 'Oríkì', phonetic: '/oh-ree-kee/', meaning: 'Poesia de louvor, invocação.' },
    'orogbo': { word: 'Orógbó', phonetic: '/oh-ro-gbo/', meaning: 'Bitter kola, semente da longevidade de Xangô.' },
    'osan': { word: 'Ọ̀sán', phonetic: '/aw-san/', meaning: 'Tarde, dia.' },
    'ose': { word: 'Ọ̀sẹ̀', phonetic: '/aw-sheh/', meaning: 'Semana, dia de culto, sabão.' },
    'otun': { word: 'Ọ̀tún', phonetic: '/aw-toon/', meaning: 'Direita.' },
    'osi': { word: 'Òsì', phonetic: '/oh-see/', meaning: 'Esquerda.' },
    'sango': { word: 'Ṣàngó', phonetic: '/shan-go/', meaning: 'Orixá do trovão e justiça.' },
    'tutu': { word: 'Tútù', phonetic: '/too-too/', meaning: 'Fresco, frio, calmo.' },
};

const YorubaDictionary = ({ onBack }: { onBack: () => void }) => {
    const [query, setQuery] = useState('');
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // Get sorted keys
    const allKeys = useMemo(() => Object.keys(STATIC_DB).sort(), []);
    const alphabet = useMemo(() => Array.from(new Set(allKeys.map(k => k[0].toUpperCase()))), [allKeys]);

    const handleSearch = async (term?: string) => {
        const q = term || query;
        if (!q.trim()) return;
        
        // 1. Local Search
        const lowerKey = q.toLowerCase().trim();
        // Exact Match
        if (STATIC_DB[lowerKey]) {
            setResult(STATIC_DB[lowerKey]);
            return;
        }
        // Partial match
        const partial = allKeys.find(k => k.includes(lowerKey));
        if (partial) {
            setResult(STATIC_DB[partial]);
            return;
        }

        // 2. AI Search (Fallback)
        setLoading(true);
        setResult(null);
        try {
            const data = await searchYorubaDictionary(q);
            setResult(data);
        } catch (e) {
            alert("Erro ao consultar o dicionário online.");
        } finally {
            setLoading(false);
        }
    };

    const filterByLetter = (letter: string) => {
        setSelectedLetter(letter);
        setResult(null); // Clear detailed view to show list
    };

    const filteredList = useMemo(() => {
        if (!selectedLetter) return [];
        return allKeys.filter(k => k.toUpperCase().startsWith(selectedLetter));
    }, [selectedLetter, allKeys]);

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-2xl flex items-center justify-between mb-6">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2"><Book size={24}/> Dicionário Yorubá</h1>
                <div className="w-6"></div>
            </div>

            <div className="w-full max-w-2xl">
                {/* Search Bar */}
                <div className="relative mb-6">
                    <input 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Pesquisar termo (ex: Odu, Ase)..."
                        className="w-full bg-ifa-base border border-ifa-border rounded-xl pl-12 pr-12 py-4 text-lg focus:border-ifa-gold outline-none shadow-lg"
                    />
                    <Search className="absolute left-4 top-5 text-ifa-neutral" size={20} />
                    <button 
                        onClick={() => handleSearch()}
                        disabled={loading}
                        className="absolute right-2 top-2 p-2 bg-ifa-gold text-black rounded-lg hover:opacity-90 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Ir"}
                    </button>
                </div>

                {/* Alphabet Filter */}
                <div className="flex flex-wrap gap-1 justify-center mb-6 bg-ifa-base p-2 rounded-lg border border-ifa-border">
                    {alphabet.map(letter => (
                        <button
                            key={letter}
                            onClick={() => filterByLetter(letter)}
                            className={`w-8 h-8 rounded text-xs font-bold transition-all ${selectedLetter === letter ? 'bg-ifa-gold text-black scale-110' : 'text-ifa-neutral hover:bg-ifa-surface hover:text-white'}`}
                        >
                            {letter}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="min-h-[300px]">
                    {/* CASE 1: SHOW SINGLE RESULT */}
                    {result ? (
                        <div className="bg-ifa-base border border-ifa-gold rounded-xl p-6 shadow-2xl animate-fade-in relative">
                            <button onClick={() => setResult(null)} className="absolute top-4 right-4 text-ifa-neutral hover:text-white">x</button>
                            <div className="flex justify-between items-start mb-4 border-b border-ifa-border pb-4">
                                <div>
                                    <h2 className="text-4xl font-serif font-bold text-ifa-gold mb-1">{result.word}</h2>
                                    <span className="text-ifa-neutral text-sm font-mono tracking-wider">{result.phonetic}</span>
                                </div>
                                <TextReader text={result.word} forceLang="yo-NG" />
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xs font-bold text-ifa-wood uppercase mb-2">Definição Litúrgica</h3>
                                    <p className="text-lg leading-relaxed text-white font-serif">{result.meaning}</p>
                                </div>

                                {result.usage_example && (
                                    <div className="bg-black/30 p-4 rounded border-l-4 border-ifa-gold">
                                        <h3 className="text-xs font-bold text-ifa-gold uppercase mb-2 flex items-center gap-2"><Volume2 size={12}/> Exemplo de Uso</h3>
                                        <p className="italic text-ifa-text-light text-lg">"{result.usage_example}"</p>
                                    </div>
                                )}

                                {result.synonyms && (
                                    <div className="flex gap-2 flex-wrap pt-4 border-t border-ifa-border/30">
                                        <span className="text-xs text-ifa-neutral mr-2">Relacionados:</span>
                                        {result.synonyms.map((syn: string) => (
                                            <span key={syn} onClick={() => { setQuery(syn); handleSearch(syn); }} className="text-xs bg-ifa-base-dark border border-ifa-border px-2 py-1 rounded text-ifa-neutral hover:border-ifa-gold cursor-pointer">{syn}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : selectedLetter ? (
                        // CASE 2: SHOW LIST BY LETTER
                        <div className="grid gap-3">
                            <h3 className="text-ifa-gold font-bold uppercase mb-2 ml-1">Termos com "{selectedLetter}"</h3>
                            {filteredList.map(key => (
                                <button 
                                    key={key}
                                    onClick={() => handleSearch(key)}
                                    className="text-left bg-ifa-base border border-ifa-border p-4 rounded-lg hover:border-ifa-gold hover:bg-ifa-surface transition-all group"
                                >
                                    <h4 className="font-bold text-ifa-text text-lg group-hover:text-ifa-gold">{STATIC_DB[key].word}</h4>
                                    <p className="text-sm text-ifa-neutral truncate">{STATIC_DB[key].meaning}</p>
                                </button>
                            ))}
                        </div>
                    ) : (
                        // CASE 3: EMPTY STATE
                        <div className="text-center mt-12 text-ifa-neutral opacity-50 flex flex-col items-center">
                            <Book size={64} className="mb-4 text-ifa-wood" />
                            <p>Selecione uma letra ou digite um termo para acessar o conhecimento.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default YorubaDictionary;
