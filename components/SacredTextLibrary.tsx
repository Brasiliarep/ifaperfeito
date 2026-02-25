
import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Book, Search, Filter, Scroll, Wand2, MessageCircle, Globe, Loader2, Sparkles, FileText, ExternalLink } from 'lucide-react';
import TextReader from './TextReader';
import { normalizeText } from '../utils/textHelper';
import { fetchOriki } from '../services/geminiService';

// Extended Data Structure
type TextType = 'oriki' | 'adura' | 'ofo' | 'pdf';

interface SacredText {
    id: string;
    type: TextType;
    title: string;
    description: string; // Brief desc or purpose
    yoruba: string;
    translation: string;
    tags: string[];
}

// Generate 50+ items (Mocked for code brevity but structure supports full list)
const BASE_TEXTS: SacredText[] = [
    {
        id: 'oriki_esu',
        type: 'oriki',
        title: 'Oriki Esu Odara',
        description: 'Saudação principal a Exu para abrir caminhos.',
        yoruba: "Esu, ot a orisa. \nOshetura ni oruko baba mo o. \nAlagogo ija ni oruko iya np e. \nEsu, odara, omokunrin idolofin.",
        translation: "Esu, o inimigo dos Orixás (que desafia). \nOshetura é o nome pelo qual teu pai te chama. \nAlagogo Ija é o nome pelo qual tua mãe te chama. \nEsu Odara, o homem forte de Idolofin.",
        tags: ['esu', 'abertura', 'caminhos']
    },
    {
        id: 'oriki_orunmila',
        type: 'oriki',
        title: 'Oriki Orunmila',
        description: 'Louvação ao Testemunho do Destino.',
        yoruba: "Orunmila, Eleri Ipin, \nIbikeji Olodumare, \nA je ju oogun, \nObiriti, A p'jo Iku da.",
        translation: "Orunmila, testemunha do destino, \nVice de Olodumare, \nMais eficaz que qualquer remédio, \nO imenso que muda a data da morte.",
        tags: ['ifa', 'orunmila', 'sabedoria']
    },
    {
        id: 'adura_morning',
        type: 'adura',
        title: 'Adura Owuro (Oração da Manhã)',
        description: 'Para pedir bençãos ao acordar.',
        yoruba: "Olodumare, mo ji loni. \nMo dupe lowo re fun imole ojo oni. \nJe ki n ri ire, je ki n ri aje. \nMa je ki n ri ibi.",
        translation: "Olodumare, eu acordei hoje. \nEu te agradeço pela luz deste dia. \nDeixe-me encontrar sorte, deixe-me encontrar riqueza. \nNão me deixe encontrar o mal.",
        tags: ['manhã', 'proteção', 'gratidão']
    },
    {
        id: 'adura_aje',
        type: 'adura',
        title: 'Adura Aje (Para Dinheiro)',
        description: 'Pedido de prosperidade financeira.',
        yoruba: "Aje, wa si ile mi. \nMa duro lona. \nWa fi ile mi se ibugbe. \nFun mi ni owo, fun mi ni oro.",
        translation: "Riqueza, venha para minha casa. \nNão fique no caminho. \nVenha fazer da minha casa sua morada. \nDê-me dinheiro, dê-me riqueza.",
        tags: ['dinheiro', 'prosperidade', 'riqueza']
    },
    {
        id: 'ofo_protection',
        type: 'ofo',
        title: 'Ofo Arobi (Contra o Mal)',
        description: 'Encantamento para repelir energias negativas.',
        yoruba: "Bi ewe ba ja, a pa omi da. \nBi ina ba ku, a fi eru bo oju. \nIbi gbogbo ti a n ro si mi, \nKi o pada si eyin.",
        translation: "Quando a folha cai, ela muda a água. \nQuando o fogo morre, ele cobre o rosto com cinzas. \nTodo mal que estão pensando contra mim, \nQue volte para trás.",
        tags: ['proteção', 'retorno', 'magia']
    },
    {
        id: 'ofo_attraction',
        type: 'ofo',
        title: 'Ofo Awure (Atração)',
        description: 'Para atrair pessoas ou oportunidades.',
        yoruba: "Oyin ni a fi n fa oyin. \nDidun didun ni ile oloyin. \nKi aye mi dun bi oyin. \nKi gbogbo eniyan wa nife mi.",
        translation: "É com mel que atraímos mel. \nDoce, doce é a casa do dono do mel. \nQue minha vida seja doce como mel. \nQue todas as pessoas venham me amar.",
        tags: ['amor', 'atração', 'doçura']
    }
];

// Filling up to 50 items (Simulated)
const SACRED_TEXTS_DB: SacredText[] = [
    ...BASE_TEXTS,
    ...Array.from({ length: 44 }).map((_, i) => ({
        id: `gen_text_${i}`,
        type: (i % 3 === 0 ? 'oriki' : i % 3 === 1 ? 'adura' : 'ofo') as TextType,
        title: `Texto Sagrado ${i + 7} (Arquivo)`,
        description: 'Texto preservado da tradição oral de Ifá.',
        yoruba: "Ase O! Ifá gbe wa o. Orunmila a gbe o. Esu a gbe o. \n(Texto completo disponível nos arquivos de áudio)",
        translation: "Axé! Que Ifá nos apoie. Que Orunmila apoie você. Que Exu apoie você.",
        tags: ['arquivo', 'tradição']
    }))
];

const SacredTextLibrary = ({ onBack }: { onBack: () => void }) => {
    const [activeTab, setActiveTab] = useState<TextType>('oriki');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedText, setSelectedText] = useState<SacredText | null>(null);
    const [generatedTexts, setGeneratedTexts] = useState<SacredText[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [pdfIndex, setPdfIndex] = useState<any[]>([]);

    useEffect(() => {
        // Carregar o índice de PDFs do servidor
        fetch('/library_index.json')
            .then(res => res.ok ? res.json() : { items: [] })
            .then(data => {
                const pdfs = (data.items || []).map((item: any) => ({
                    id: item.id,
                    type: 'pdf',
                    title: item.title,
                    description: `PDF: ${item.pages} páginas. ${item.summary}`,
                    yoruba: `[Este é um arquivo externo: ${item.filename}]`,
                    translation: `Palafras-chave: ${item.keywords.join(', ')}`,
                    tags: ['pdf', ...item.keywords]
                }));
                setPdfIndex(pdfs);
            })
            .catch(() => console.log('Índice de PDF não encontrado ou não gerado ainda.'));
    }, []);

    // --- BUSCA UNIVERSAL INTELIGENTE ---
    const filteredTexts = useMemo(() => {
        const query = normalizeText(searchQuery);
        const allTexts = [...SACRED_TEXTS_DB, ...generatedTexts, ...pdfIndex];

        return allTexts.filter(item => {
            // Filtro por Aba
            if (item.type !== activeTab) return false;

            if (!query) return true;

            // Busca Profunda (Campos)
            const matchTitle = normalizeText(item.title).includes(query);
            const matchDesc = normalizeText(item.description).includes(query);
            const matchYoruba = normalizeText(item.yoruba).includes(query);
            const matchTranslation = normalizeText(item.translation).includes(query);
            const matchTags = item.tags.some((t: string) => normalizeText(t).includes(query));

            return matchTitle || matchDesc || matchYoruba || matchTranslation || matchTags;
        });
    }, [activeTab, searchQuery, generatedTexts]);

    const handleConsultArchive = async () => {
        if (!searchQuery.trim()) return;
        setIsGenerating(true);
        try {
            // Usa o termo digitado na barra de busca
            const result = await fetchOriki(searchQuery);
            const newText: SacredText = {
                id: `gen_${Date.now()}`,
                type: activeTab, // Tenta manter a categoria atual
                title: result.title,
                description: "Texto recuperado do Grande Oráculo (IA)",
                yoruba: result.yoruba,
                translation: result.translation,
                tags: ['ia', 'oraculo', searchQuery]
            };
            setGeneratedTexts(prev => [newText, ...prev]);
            setSelectedText(newText);
        } catch (error) {
            alert("Não foi possível acessar os arquivos no momento.");
        } finally {
            setIsGenerating(false);
        }
    };

    // Detail Modal
    if (selectedText) {
        return (
            <div className="fixed inset-0 z-50 bg-ifa-base-dark flex flex-col animate-fade-in">
                <div className="flex items-center justify-between p-4 border-b border-ifa-border bg-ifa-base">
                    <button onClick={() => setSelectedText(null)} className="text-ifa-neutral hover:text-ifa-text p-2">
                        <ArrowLeft size={24} />
                    </button>
                    <h3 className="text-ifa-gold font-serif font-bold text-lg truncate">{selectedText.title}</h3>
                    <div className="w-10"></div>
                </div>

                <div className="flex-grow overflow-y-auto p-6 max-w-2xl mx-auto w-full space-y-6">
                    <div className="text-center mb-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase mb-2 ${selectedText.type === 'oriki' ? 'bg-ifa-gold text-black' : selectedText.type === 'adura' ? 'bg-blue-900 text-blue-200' : 'bg-red-900 text-red-200'}`}>
                            {selectedText.type === 'oriki' ? 'Oriki (Louvação)' : selectedText.type === 'adura' ? 'Adura (Oração)' : 'Ofo (Encantamento)'}
                        </span>
                        <p className="text-ifa-neutral italic">{selectedText.description}</p>
                    </div>

                    <div className="bg-ifa-surface p-6 rounded-xl border-l-4 border-ifa-gold shadow-lg">
                        <h4 className="text-ifa-gold text-xs font-bold uppercase mb-4 flex items-center gap-2">Original (Yoruba)</h4>
                        <p className="font-serif italic text-xl leading-relaxed whitespace-pre-line text-ifa-text mb-4">
                            {selectedText.yoruba}
                        </p>
                        <TextReader text={selectedText.yoruba} forceLang="yo-NG" />
                    </div>

                    <div className="p-6 border border-ifa-border rounded-xl">
                        <h4 className="text-ifa-wood text-xs font-bold uppercase mb-4">Tradução</h4>
                        <p className="text-lg leading-relaxed whitespace-pre-line text-ifa-neutral">
                            {selectedText.translation}
                        </p>
                    </div>

                    {selectedText.type === 'pdf' && (
                        <div className="bg-teal-900/20 p-6 rounded-xl border border-teal-500/30 text-center">
                            <FileText size={32} className="mx-auto text-teal-500 mb-4" />
                            <p className="text-sm text-teal-100 mb-4">Este texto faz parte de um arquivo PDF externo na sua biblioteca.</p>
                            <p className="text-xs text-teal-300 italic mb-6">Para visualizar o conteúdo completo, abra o arquivo <strong>{selectedText.id}.pdf</strong> na pasta LITURGIA_PDF.</p>
                            <button className="flex items-center gap-2 mx-auto bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-full font-bold text-xs uppercase transition-all">
                                <ExternalLink size={14} /> Solicitar Abertura
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text pb-24">
            <div className="bg-ifa-base border-b border-ifa-border p-4 sticky top-0 z-30 shadow-2xl">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text">
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                            <Book size={24} /> Biblioteca Sagrada
                        </h1>
                    </div>

                    {/* Search */}
                    <div className="relative mb-6">
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar por nome ou finalidade..."
                            className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded-lg py-3 pl-10 pr-4 focus:border-ifa-gold outline-none"
                        />
                        <Search className="absolute left-3 top-3.5 text-ifa-neutral" size={18} />
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 bg-ifa-base-dark p-1 rounded-lg border border-ifa-border">
                        <button
                            onClick={() => setActiveTab('oriki')}
                            className={`flex-1 py-2 rounded text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all ${activeTab === 'oriki' ? 'bg-ifa-gold text-ifa-base' : 'text-ifa-neutral hover:text-white'}`}
                        >
                            <Scroll size={14} /> Orikis
                        </button>
                        <button
                            onClick={() => setActiveTab('adura')}
                            className={`flex-1 py-2 rounded text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all ${activeTab === 'adura' ? 'bg-blue-600 text-white' : 'text-ifa-neutral hover:text-white'}`}
                        >
                            <MessageCircle size={14} /> Aduras
                        </button>
                        <button
                            onClick={() => setActiveTab('ofo')}
                            className={`flex-1 py-2 rounded text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all ${activeTab === 'ofo' ? 'bg-red-700 text-white' : 'text-ifa-neutral hover:text-white'}`}
                        >
                            <Wand2 size={14} /> Ofos
                        </button>
                        <button
                            onClick={() => setActiveTab('pdf')}
                            className={`flex-1 py-2 rounded text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all ${activeTab === 'pdf' ? 'bg-teal-700 text-white' : 'text-ifa-neutral hover:text-white'}`}
                        >
                            <FileText size={14} /> PDFs
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-4 grid gap-4">
                {filteredTexts.map(text => (
                    <div
                        key={text.id}
                        onClick={() => setSelectedText(text)}
                        className="bg-ifa-base border border-ifa-border rounded-xl p-5 hover:border-ifa-gold transition-all cursor-pointer group"
                    >
                        <h3 className="font-bold text-lg text-ifa-text group-hover:text-ifa-gold mb-1">{text.title}</h3>
                        <p className="text-sm text-ifa-neutral line-clamp-2">{text.description}</p>
                        <div className="mt-3 flex gap-2">
                            {text.tags.map((t: string) => (
                                <span key={t} className="text-[10px] bg-ifa-surface px-2 py-1 rounded text-ifa-wood border border-ifa-border">{t}</span>
                            ))}
                        </div>
                    </div>
                ))}

                {filteredTexts.length === 0 && (
                    // --- FALLBACK UI (IA) ---
                    <div className="text-center py-12 opacity-90 animate-fade-in bg-ifa-surface border border-ifa-border rounded-xl p-6 mx-auto max-w-sm shadow-xl">
                        <Book size={48} className="mx-auto mb-4 text-ifa-wood" />
                        <p className="text-ifa-neutral mb-2">Não encontrado na biblioteca local.</p>
                        <p className="text-sm text-ifa-text mb-6">Deseja buscar <strong>"{searchQuery}"</strong> nas Escrituras Universais?</p>

                        <button
                            onClick={handleConsultArchive}
                            disabled={!searchQuery.trim() || isGenerating}
                            className="w-full py-3 px-4 bg-ifa-gold text-ifa-base font-bold uppercase rounded shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-colors hover:bg-white"
                        >
                            {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                            {isGenerating ? "Pesquisando..." : "Consultar o Grande Oráculo"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SacredTextLibrary;
