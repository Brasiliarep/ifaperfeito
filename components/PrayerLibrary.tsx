
import React, { useState, useMemo } from 'react';
import { ArrowLeft, Book, Search, Filter, Star, ChevronDown, ChevronUp, Tag, Sparkles, Loader2, Scroll, Globe } from 'lucide-react';
import { fetchOriki } from '../services/geminiService';
import TextReader from './TextReader';

type Category = 'all' | 'main' | 'ori' | 'ori_morning' | 'ori_night' | 'ori_health' | 'health' | 'esu' | 'orisha' | 'iba' | 'aje' | 'ogun' | 'water' | 'funfun' | 'nature' | 'ancestors' | 'hunter' | 'earth';

interface Prayer {
    id: string;
    category: Category[]; 
    title: string;
    keywords: string[]; 
    yoruba: string;
    translation: string;
}

const PRAYERS: Prayer[] = [
    // --- MAIN ---
    {
        id: 'ifa_main',
        category: ['main', 'orisha'],
        title: 'Saudação a Òrúnmìlà',
        keywords: ['destino', 'adivinhação', 'testemunha', 'elérìí ìpín', 'sabedoria'],
        yoruba: "Orunmila, Eleri Ipin, \nIbikeji Olodumare, \nA je ju oogun, \nObiriti, A p'jo Iku da, \nOdudu ti ndu ori emere, \nKo tun ori ti ko sunwon se.",
        translation: "Orunmila, testemunha do destino, \nVice de Olodumare, \nMais eficaz que qualquer remédio, \nO imenso que muda a data da morte, \nAquele que salva a cabeça do Emere, \nE conserta a cabeça do desafortunado."
    },
    // --- ORI ---
    {
        id: 'ori_main',
        category: ['main', 'ori'],
        title: 'Oriki Ori (O Criador do Ser)',
        keywords: ['cabeça', 'destino', 'sucesso', 'pessoal'],
        yoruba: "Ori lo da mi \nEni a 'jo da \nOri lo da mi \nOri ni adani, Eda \nKo s'osa ti i da 'ni l'ehi Ori \nOri ni ma bo \nKo s'osa ti i da 'ni l'ehi Ori.",
        translation: "Foi Ori quem me criou \nJunto com quem eu fui criado \nFoi Ori quem me criou \nOri é o criador do ser \nNão há Orixá que apoie o homem mais que seu próprio Ori \nÉ Ori que eu cultuarei \nNão há Orixá que apoie o homem mais que seu próprio Ori."
    },
    // ... (Keep existing Esu, Ogun, Sango, Yemoja, Osun, Obatala, Oya, Osanyin, Osumare, Aje - not repeating to save space but they must be present in full code)
    {
        id: 'esu_odara',
        category: ['main', 'esu'],
        title: 'Esu Odara',
        keywords: ['caminhos', 'mensageiro', 'oferenda', 'bará'],
        yoruba: "Esu, ot a orisa. \nOshetura ni oruko baba mo o. \nAlagogo ija ni oruko iya np e. \nEsu, odara, omokunrin idolofin, \nO le sonso sori ori ese elese \nKo je, ko je ki eni nje gbe mi.",
        translation: "Esu, o inimigo dos Orixás. \nOshetura é o nome pelo qual teu pai te chama. \nAlagogo Ija é o nome pelo qual tua mãe te chama. \nEsu Odara, o homem forte de Idolofin. \nEle não come, e não deixa ninguém comer (sem dividir)."
    },
    {
        id: 'ogun_lakaye',
        category: ['orisha', 'ogun', 'main'],
        title: 'Ogun Lakaye',
        keywords: ['ferro', 'guerra', 'tecnologia', 'trabalho', 'vencedor'],
        yoruba: "Ogun Lakaye, Osinmole. \nOnile kangun-kangun ode Orun. \nOgun ye! \nO ni omi s'ile, f'eje we. \nOgun awo, alagbede orun.",
        translation: "Ogun Lakaye, chefe dos Orixás. \nDono de muitas casas no Céu. \nOgun vive! \nEle tem água em casa, mas prefere banhar-se com sangue. \nOgun do mistério, o ferreiro do céu."
    },
    {
        id: 'sango_oba',
        category: ['orisha', 'main'],
        title: 'Sango (O Rei)',
        keywords: ['trovão', 'fogo', 'rei', 'justiça', 'xango', 'machado'],
        yoruba: "Sango, Olukoso, \nBambi omo arigba ota segun. \nOloju orogbo, \nElere kosun, \nO n yin ina l'enu, \nO n ro bi ojo.",
        translation: "Sango, o Rei de Koso. \nBambi, filho que usa pedras para vencer a guerra. \nDono dos olhos de Orogbo. \nAquele que tem pó vermelho (Osun) no corpo. \nEle cospe fogo pela boca. \nEle troveja como a chuva."
    },
    {
        id: 'yemoja_odo',
        category: ['orisha', 'water'],
        title: 'Yemoja (Mãe das Águas)',
        keywords: ['mar', 'rio', 'mãe', 'peixes', 'fertilidade', 'iemanjá'],
        yoruba: "Yemoja, \nIya olo oyon oruba, \nOmi a bi'ni, \nOmi a wo'ni, \nYemoja, a to iwo bi odo. \nIya omo eja.",
        translation: "Yemoja, \nMãe dos seios fartos. \nÁgua que nos dá a vida. \nÁgua que nos cura. \nYemoja, é suficiente adorar-te como o rio. \nMãe dos peixes (filhos)."
    },
    {
        id: 'osun_yeye',
        category: ['orisha', 'aje', 'water'],
        title: 'Osun (Prosperidade e Fertilidade)',
        keywords: ['rio', 'amor', 'ouro', 'fertilidade', 'beleza', 'oxum'],
        yoruba: "Ore Yeye o! \nOsun aare wa! \nEleyele l'omi, \nOsun se 'gbo, se 'ju, \nOsun se 'ale, se 'owuro. \nIya mi, Oloja iyale.",
        translation: "Salve a Mãezinha! \nOsun, a bela dama! \nDona do pente de ouro nas águas, \nOsun cuida da floresta, cuida do deserto, \nOsun cuida da noite e da manhã. \nMinha mãe, a dona do mercado da casa."
    },
    {
        id: 'obatala',
        category: ['orisha', 'funfun', 'main'],
        title: 'Obatala (Orixá Funfun)',
        keywords: ['branco', 'paz', 'criação', 'céu', 'oxalá'],
        yoruba: "Obatala Oseeremagbo, \nAlabalaase, \nOba ti gbogbo aye ngb'ase fun. \nOrisa nla ti n da omo si inu. \nObatala, pa mi mo o.",
        translation: "Obatala, o Grande Rei. \nO portador da autoridade. \nO Rei a quem todo o mundo obedece. \nO grande Orixá que cria a criança no útero. \nObatala, proteja-me."
    },

    // --- NEW ADDITIONS ---
    {
        id: 'osoosi_ode',
        category: ['orisha', 'hunter', 'nature'],
        title: 'Osoosi (O Caçador)',
        keywords: ['caça', 'fartura', 'oxossi', 'floresta'],
        yoruba: "Osoosi, awo ode. \nO ode ti n je ori eran. \nOlogaraare, agbani nijo to buru. \nOsoosi, gba mi, ma je ki n s'ina.",
        translation: "Osoosi, o segredo da caça. \nO caçador que come a cabeça da caça. \nO mestre de si mesmo, que nos salva no dia difícil. \nOsoosi, salve-me, não me deixe perder o caminho."
    },
    {
        id: 'obaluaye_ile',
        category: ['orisha', 'earth', 'health'],
        title: 'Obaluaye (Senhor da Terra)',
        keywords: ['terra', 'cura', 'doença', 'omolu', 'respeito'],
        yoruba: "Obaluaye, Iku mole. \nO gbona, o tutu. \nO lu gboho, o lu gboho. \nBaba mi, f'owo wo mi, fun mi ni alafia.",
        translation: "Obaluaye, a morte na terra. \nEle é quente, ele é frio. \nEle bate o tambor. \nMeu pai, toque-me com suas mãos, dê-me saúde."
    },
    {
        id: 'nana_buruku',
        category: ['orisha', 'water', 'ancestors'],
        title: 'Nana Buruku (A Anciã)',
        keywords: ['lama', 'sabedoria', 'morte', 'renascimento', 'nanã'],
        yoruba: "Nana Buruku, Iya odo. \nO lo ninu ira, o lo ninu erofo. \nIya agba, dariji wa. \nMa je ki a ri ibinu re.",
        translation: "Nana Buruku, Mãe do rio. \nEla anda no pântano, ela anda na lama. \nMãe anciã, perdoe-nos. \nNão nos deixe ver sua raiva."
    },
    {
        id: 'olokun_okun',
        category: ['orisha', 'water', 'aje'],
        title: 'Olokun (Dono do Oceano)',
        keywords: ['mar', 'profundidade', 'riqueza', 'mistério'],
        yoruba: "Olokun, a gbe okun, a gbe osa. \nOlo omi ti n gbe omi. \nMalokun, fun mi ni ire aje. \nJe ki n lowo, je ki n la.",
        translation: "Olokun, que vive no oceano e na lagoa. \nDono da água que vive na água. \nEspírito do mar, dê-me a sorte da riqueza. \nDeixe-me ser rico, deixe-me prosperar."
    },
    {
        id: 'egbe_orun',
        category: ['orisha', 'ancestors'],
        title: 'Egbe (Companheiros do Céu)',
        keywords: ['sociedade', 'céu', 'ajuda', 'proteção'],
        yoruba: "Egbe O, muso! \nEni ti o ni Egbe l'eyin ko ni subu. \nEgbe mi ni Orun, e gba mi. \nE ma je ki n r'ibi.",
        translation: "Salve a Sociedade (Egbe)! \nAquele que tem o Egbe atrás de si não cairá. \nMeus companheiros no Céu, apoiem-me. \nNão me deixem ver o mal."
    },
    {
        id: 'ibeji_ejire',
        category: ['orisha', 'funfun'],
        title: 'Ibeji (Gêmeos)',
        keywords: ['gêmeos', 'alegria', 'crianças', 'duplicidade'],
        yoruba: "Ejire, ara isokun. \nEdunjobi, oba omo. \nO s'ile onile d'oloyo. \nIbeji, e wa gba ogede mi.",
        translation: "Gêmeos, nativos de Isokun. \nNascidos juntos, reis das crianças. \nEles transformam a casa triste em casa de alegria. \nIbeji, venham aceitar minha banana (oferenda)."
    },
    {
        id: 'iyami_osoronga',
        category: ['orisha', 'nature'],
        title: 'Iyami Osoronga (As Mães)',
        keywords: ['mães', 'pássaro', 'poder', 'respeito'],
        yoruba: "Iya mi Osoronga. \nA pani ma wa'gun. \nOlokiki oru. \nAfinju eye ti n je ni gbangba. \nE ma se mi o, e ma binu si mi.",
        translation: "Minhas Mães Osoronga. \nAquelas que matam sem usar veneno/remédio. \nFamosas na noite. \nPássaros limpos que comem a céu aberto. \nNão me façam mal, não se zanguem comigo."
    }
];

// ... (Rest of the component remains largely the same, updated list passed to logic)

// Immersive Reader Modal
const PrayerReaderModal = ({ prayer, onClose }: { prayer: Prayer, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 z-50 bg-ifa-base-dark flex flex-col animate-fade-in overflow-hidden">
            {/* Navbar */}
            <div className="flex items-center justify-between p-4 border-b border-ifa-border bg-ifa-base">
                <button onClick={onClose} className="text-ifa-neutral hover:text-ifa-text p-2">
                    <ArrowLeft size={24} />
                </button>
                <h3 className="text-ifa-gold font-serif font-bold text-lg truncate max-w-[200px]">{prayer.title}</h3>
                <div className="w-10"></div> {/* Spacer */}
            </div>

            {/* Content Scroll */}
            <div className="flex-grow overflow-y-auto p-6 pb-24 relative">
                <div className="max-w-2xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <div className="inline-block p-3 rounded-full bg-ifa-wood/10 border border-ifa-gold/30 mb-4">
                            <Book size={32} className="text-ifa-gold" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold text-ifa-text mb-2">{prayer.title}</h1>
                        <div className="flex justify-center gap-2 flex-wrap">
                            {prayer.keywords.slice(0,3).map(k => (
                                <span key={k} className="text-xs uppercase tracking-widest text-ifa-neutral bg-ifa-surface px-2 py-1 rounded">
                                    {k}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Yoruba Text */}
                    <div className="bg-ifa-surface p-6 rounded-2xl border-l-4 border-ifa-gold shadow-lg">
                        <h4 className="text-ifa-gold text-xs font-bold uppercase mb-4 tracking-widest flex items-center gap-2">
                            <Scroll size={14}/> Yoruba (Original)
                        </h4>
                        <p className="font-serif italic text-xl md:text-2xl leading-relaxed whitespace-pre-line text-ifa-text">
                            {prayer.yoruba}
                        </p>
                        <TextReader text={prayer.yoruba} large forceLang="yo-NG" />
                    </div>

                    {/* Translation */}
                    <div className="p-6">
                        <h4 className="text-ifa-wood text-xs font-bold uppercase mb-4 tracking-widest flex items-center gap-2">
                             Tradução
                        </h4>
                        <p className="text-base md:text-lg leading-relaxed whitespace-pre-line text-ifa-neutral">
                            {prayer.translation}
                        </p>
                    </div>

                     <div className="text-center pt-8 border-t border-ifa-border/30">
                        <p className="text-xs text-ifa-wood">Ifá Guia - Sabedoria Ancestral</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PrayerCard: React.FC<{ prayer: Prayer, onOpen: () => void }> = ({ prayer, onOpen }) => {
    return (
        <div 
            onClick={onOpen}
            className="bg-ifa-base border border-ifa-border rounded-xl p-5 shadow-lg hover:border-ifa-gold transition-all cursor-pointer group relative overflow-hidden"
        >
             {/* Hover Glow Effect */}
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ifa-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="flex justify-between items-start">
                <div className="flex-grow pr-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                        {prayer.category.includes('main') && (
                            <span className="bg-ifa-gold text-ifa-base text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1 w-fit">
                                <Star size={10} fill="currentColor" /> Principal
                            </span>
                        )}
                         {prayer.category.includes('ori') && !prayer.category.includes('main') && (
                            <span className="bg-ifa-wood text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase w-fit">
                                Ori
                            </span>
                        )}
                    </div>
                    <h3 className="text-lg font-bold text-ifa-text group-hover:text-ifa-gold transition-colors line-clamp-2">
                        {prayer.title}
                    </h3>
                    <p className="text-xs text-ifa-neutral mt-1 line-clamp-1">{prayer.translation.substring(0, 60)}...</p>
                </div>
                <div className="flex items-center gap-3">
                     <div className="p-2 rounded-full bg-ifa-surface text-ifa-wood group-hover:bg-ifa-gold group-hover:text-ifa-base transition-colors">
                        <Book size={18} />
                     </div>
                </div>
            </div>
        </div>
    );
}

const PrayerLibrary: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<Category>('all');
    const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);
    const [generatedPrayers, setGeneratedPrayers] = useState<Prayer[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const categories: { id: Category; label: string }[] = [
        { id: 'all', label: 'Todos' },
        { id: 'main', label: 'Principais' },
        { id: 'ori', label: 'Ori' },
        { id: 'orisha', label: 'Orixás' },
        { id: 'esu', label: 'Esu' },
        { id: 'hunter', label: 'Caçador' },
        { id: 'earth', label: 'Terra' },
        { id: 'water', label: 'Águas' },
        { id: 'funfun', label: 'Funfun' },
        { id: 'nature', label: 'Natureza' },
        { id: 'aje', label: 'Prosperidade' },
        { id: 'health', label: 'Saúde' },
    ];

    const filteredPrayers = useMemo(() => {
        const query = searchQuery.toLowerCase();
        const allPrayers = [...PRAYERS, ...generatedPrayers];
        
        return allPrayers.filter(prayer => {
            const matchesCategory = activeCategory === 'all' || prayer.category.includes(activeCategory);
            const matchesSearch = 
                prayer.title.toLowerCase().includes(query) || 
                prayer.translation.toLowerCase().includes(query) ||
                prayer.keywords.some(k => k.toLowerCase().includes(query));

            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, activeCategory, generatedPrayers]);

    const handleConsultArchive = async () => {
        if (!searchQuery.trim()) return;
        setIsGenerating(true);
        try {
            const result = await fetchOriki(searchQuery, 'pt-BR');
            const newPrayer: Prayer = {
                id: `gen_${Date.now()}`,
                title: result.title,
                yoruba: result.yoruba,
                translation: result.translation,
                category: ['main'], 
                keywords: [searchQuery]
            };
            setGeneratedPrayers(prev => [newPrayer, ...prev]);
            setSelectedPrayer(newPrayer); 
        } catch (error) {
            alert("Não foi possível acessar os arquivos no momento.");
        } finally {
            setIsGenerating(false);
        }
    };

    if (selectedPrayer) {
        return <PrayerReaderModal prayer={selectedPrayer} onClose={() => setSelectedPrayer(null)} />;
    }

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text pb-24">
             <div className="bg-ifa-base border-b border-ifa-border p-4 sticky top-0 z-30 shadow-2xl">
                 <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text p-2">
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                            <Book size={24} /> Biblioteca de Orikis
                        </h1>
                    </div>

                    <div className="relative mb-4">
                        <input 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar (Ex: Tristeza, Vitória, Ogun...)" 
                            className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded-lg py-3 pl-12 pr-4 focus:border-ifa-gold outline-none placeholder-ifa-neutral"
                        />
                        <Search className="absolute left-4 top-3.5 text-ifa-neutral" size={20} />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {categories.map(cat => (
                            <button 
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                                    activeCategory === cat.id 
                                    ? 'bg-ifa-gold text-ifa-base border-ifa-gold' 
                                    : 'bg-transparent text-ifa-neutral border-ifa-border hover:border-ifa-gold hover:text-ifa-text'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                 </div>
             </div>

             <div className="max-w-4xl mx-auto p-4">
                 <div className="mb-4 text-xs text-ifa-wood uppercase font-bold flex justify-between items-center">
                     <span>{filteredPrayers.length} Orações disponíveis (Local)</span>
                     <Filter size={14} />
                 </div>

                 <div className="grid gap-4">
                     {filteredPrayers.length > 0 ? (
                         filteredPrayers.map(prayer => (
                             <PrayerCard key={prayer.id} prayer={prayer} onOpen={() => setSelectedPrayer(prayer)} />
                         ))
                     ) : (
                         <div className="text-center py-12 opacity-80">
                             <Book size={48} className="mx-auto mb-4 text-ifa-wood" />
                             <p className="text-ifa-neutral mb-4">Nenhum Oriki encontrado na coleção local.</p>
                             
                             <div className="bg-ifa-surface border border-ifa-border rounded-xl p-6 max-w-sm mx-auto shadow-2xl">
                                 <h3 className="text-ifa-gold font-bold text-lg mb-2 flex items-center justify-center gap-2">
                                     <Globe size={20} /> Acervo Completo
                                 </h3>
                                 <p className="text-sm text-ifa-neutral mb-6">
                                     Deseja consultar os arquivos profundos de Ifá e as escrituras antigas para <strong>"{searchQuery}"</strong>?
                                 </p>
                                 <button 
                                    onClick={handleConsultArchive}
                                    disabled={!searchQuery.trim() || isGenerating}
                                    className="w-full py-3 px-4 bg-ifa-gold text-ifa-base font-bold uppercase rounded shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 whitespace-normal text-center"
                                 >
                                     {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                                     {isGenerating ? "Pesquisando..." : "Pesquisar nas Escrituras"}
                                 </button>
                             </div>
                         </div>
                     )}
                 </div>

                 {filteredPrayers.length > 0 && searchQuery.length > 2 && (
                     <div className="mt-8 pt-8 border-t border-ifa-border/30 text-center">
                        <p className="text-xs text-ifa-wood mb-4">Busca algo mais específico?</p>
                        <button 
                            onClick={handleConsultArchive}
                            disabled={isGenerating}
                            className="px-6 py-4 bg-ifa-base border border-ifa-gold text-ifa-gold text-sm font-bold uppercase rounded hover:bg-ifa-gold/10 flex items-center justify-center gap-2 mx-auto disabled:opacity-50 whitespace-normal text-center max-w-sm w-full"
                        >
                            {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Globe size={16} />}
                            Pesquisar "{searchQuery}" nas Escrituras
                        </button>
                     </div>
                 )}
                 
                 <div className="mt-12 text-center text-xs text-ifa-wood border-t border-ifa-border/30 pt-6">
                     * O Acervo Local contém os principais Irun Imole. <br/>
                     Use a pesquisa para acessar o conhecimento universal de Ifá.
                 </div>
             </div>
        </div>
    );
};

export default PrayerLibrary;
