
import React, { useState } from 'react';
import { AIInterpretation, ChatResponse, EboSelectionType, SelectionMap, CustomRemedy, EboDetail, Language, OduInfo, EboLevels } from '../types';
import { askSpecificQuestion, fetchAkose } from '../services/geminiService';
import { getTranslation } from '../utils/i18n';
import ShoppingList from './ShoppingList';
import ShareCard from './ShareCard';
import TextReader from './TextReader';
import EboSelector from './EboSelector'; 
import PrintCenter from './PrintCenter';
import { 
  Heart, Wallet, Activity, Sparkles, AlertTriangle, BookOpen, 
  ShieldAlert, Crown, Compass, Swords, Feather, Users, Brain, 
  MessageCircle, Send, X, ThumbsUp, ThumbsDown, Utensils, Shirt,
  Mic, CheckCircle2, DollarSign, Ban, Plus, Search, Loader2, ChevronDown, ChevronUp, FileText, Music, Share2, Flower, Book, Copy, PenTool, Sun, Moon, Clock, Calculator, Lock, Hexagon, Printer
} from 'lucide-react';

interface Props {
  data: AIInterpretation;
  oduInfo: OduInfo; 
  initialSelections?: SelectionMap;
  onReset: () => void;
  onEndSession: (selections: SelectionMap, notes: string) => void;
  language: Language;
  onOpenMandala: () => void; 
}

type TabType = 'spirituality' | 'oriki' | 'orishas' | 'ori' | 'ebos' | 'baths' | 'love' | 'finance' | 'health' | 'dangers' | 'diet' | 'clothing' | 'obstacles' | 'ancestry' | 'personality' | 'decisions';

const SpecificProblemInput = ({ onGenerate, isLoading, t }: { onGenerate: (text: string) => void; isLoading: boolean; t: any; }) => {
    const [text, setText] = useState("");
    return (
        <div className="mt-8 bg-ifa-base-dark p-4 rounded border border-ifa-border shadow-inner">
            <label className="text-ifa-gold text-xs font-bold uppercase mb-2 block flex items-center gap-2 justify-between">
                <span className="flex items-center gap-2"><Search size={14} /> {t.askQuestion} (Akose)</span>
            </label>
            <div className="flex gap-2">
                <input 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="..."
                    className="flex-grow bg-ifa-base border border-ifa-border text-ifa-text px-4 py-2 rounded focus:border-ifa-gold outline-none text-sm"
                />
                <button 
                    onClick={() => { onGenerate(text); setText(""); }}
                    disabled={!text.trim() || isLoading}
                    className="bg-ifa-wood text-white px-4 py-2 rounded hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
                >
                    {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                </button>
            </div>
        </div>
    );
};

const InterpretationView: React.FC<Props> = ({ data, oduInfo, initialSelections, onReset, onEndSession, language, onOpenMandala }) => {
  const [activeTab, setActiveTab] = useState<TabType>('spirituality');
  const t = getTranslation(language);
  
  // --- ROBUST STATE INITIALIZATION ---
  const [selections, setSelections] = useState<SelectionMap>(() => {
      const defaults: SelectionMap = {
          general: 'basic',
          love: 'none',
          finance: 'none',
          health: 'none',
          customRemedies: [],
          mandala: { selected: false, price: 50 }
      };

      if (initialSelections) {
          return {
              ...defaults,
              ...initialSelections,
              mandala: initialSelections.mandala || defaults.mandala,
              customRemedies: initialSelections.customRemedies || []
          };
      }
      return defaults;
  });

  const [notes, setNotes] = useState("");
  const [isGeneratingRemedy, setIsGeneratingRemedy] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showPrintCenter, setShowPrintCenter] = useState(false);
  const [question, setQuestion] = useState("");
  const [chatResponse, setChatResponse] = useState<ChatResponse | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  // Bath Budget State
  const [showBathBudget, setShowBathBudget] = useState(false);
  const [bathPrices, setBathPrices] = useState<Record<string, number>>({});
  const [bathLabor, setBathLabor] = useState<number>(0);

  const isIre = data.ireOrOsogbo && (data.ireOrOsogbo.trim().toLowerCase() === 'ire' || data.ireOrOsogbo.trim().toLowerCase() === 'irê');

  const getPlanetaryInfluence = () => {
      const hours = new Date().getHours();
      if (hours >= 6 && hours < 12) return { name: 'Iselogbe (Manhã)', icon: <Sun size={14} />, desc: 'Energia de criação e novidade.' };
      if (hours >= 12 && hours < 18) return { name: 'Osan (Tarde)', icon: <Sun size={14} />, desc: 'Energia de pico, realização.' };
      if (hours >= 18 && hours < 24) return { name: 'Irole (Noite)', icon: <Moon size={14} />, desc: 'Energia de reflexão e mistério.' };
      return { name: 'Oganjo (Madrugada)', icon: <Moon size={14} />, desc: 'Energia de espíritos e feiticeiras.' };
  }
  const planet = getPlanetaryInfluence();

  const renderTextField = (value: any, fallback: string) => {
      if (!value) return fallback;
      if (typeof value === 'string') return value;
      if (typeof value === 'object') {
          if (value.yoruba || value.translation) {
              return `${value.yoruba || ''}\n${value.translation || ''}`.trim();
          }
          return JSON.stringify(value);
      }
      return String(value);
  };

  const updateSelection = (category: keyof SelectionMap, type: EboSelectionType) => {
      setSelections(prev => ({ ...prev, [category]: type }));
  };

  const updateCustomSelection = (id: string, type: EboSelectionType) => {
      setSelections(prev => ({
          ...prev,
          customRemedies: prev.customRemedies.map(r => r.id === id ? { ...r, selection: type } : r)
      }));
  };

  const deleteCustomRemedy = (id: string) => {
      setSelections(prev => ({
          ...prev,
          customRemedies: prev.customRemedies.filter(r => r.id !== id)
      }));
  }

  const updateMandalaSettings = (selected: boolean, price: number) => {
      setSelections(prev => ({
          ...prev,
          mandala: { selected, price }
      }));
  };

  const calculateBathTotal = () => {
      const materials = data.herbalBaths.ingredients.reduce((acc, item) => acc + (bathPrices[item] || 0), 0);
      return materials + bathLabor;
  }

  const handleGenerateAkose = async (problemText: string) => {
      if(!problemText.trim()) return;
      setIsGeneratingRemedy(true);
      try {
          const categoryName = activeTab; 
          const result = await fetchAkose(data.oduName, categoryName, problemText, language);
          
          const mappedSolution: EboLevels = {
              basic: {
                  title: result.titulo_yoruba || "Akose Básico",
                  description: result.titulo_yoruba || "Akose Básico",
                  instructions: "Modo simplificado: Use os materiais básicos, reze o ofo e tenha fé.",
                  ingredients: (result.materiais || []).slice(0, 3),
                  ofo: result.ofo_ativacao?.yoruba,
                  translation: result.ofo_ativacao?.portugues
              },
              medium: {
                  title: "Akose Intermediário",
                  description: result.finalidade || "Akose Intermediário",
                  instructions: result.modo_preparo_sacerdotal || "Siga as instruções tradicionais.",
                  ingredients: result.materiais || [],
                  ofo: result.ofo_ativacao?.yoruba,
                  translation: result.ofo_ativacao?.portugues
              },
              complete: {
                  title: "Akose Completo (Sacerdotal)",
                  description: "Akose Completo (Sacerdotal)",
                  instructions: (result.modo_preparo_sacerdotal || "") + "\n\n(Requer ativação no Opon Ifá)",
                  ingredients: result.materiais || [],
                  ofo: result.ofo_ativacao?.yoruba,
                  translation: result.ofo_ativacao?.portugues
              }
          };

          const newRemedy: CustomRemedy = {
              id: crypto.randomUUID(),
              category: categoryName,
              problem: problemText,
              solution: mappedSolution,
              selection: 'basic'
          };
          setSelections(prev => ({
              ...prev,
              customRemedies: [...prev.customRemedies, newRemedy]
          }));
      } catch (error) {
          console.error(error);
          alert("Erro.");
      } finally {
          setIsGeneratingRemedy(false);
      }
  };

  const renderCustomRemedies = () => {
      const relevantRemedies = selections.customRemedies.filter(r => r.category === activeTab);
      if (relevantRemedies.length === 0) return null;
      return (
          <div className="mt-6 space-y-6">
              {relevantRemedies.map(remedy => (
                  <div key={remedy.id} className="relative bg-ifa-base-dark p-4 rounded border border-ifa-border/50">
                      <button onClick={() => deleteCustomRemedy(remedy.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-400 p-1"><X size={14}/></button>
                      <h5 className="font-bold text-ifa-text text-sm mb-1"><span className="text-ifa-gold">{remedy.problem}</span></h5>
                      <EboSelector category={remedy.category} basic={remedy.solution.basic} medium={remedy.solution.medium} complete={remedy.solution.complete} currentSelection={remedy.selection} onSelect={(t: any) => updateCustomSelection(remedy.id, t)} oduName={data.oduName} />
                  </div>
              ))}
          </div>
      )
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!question.trim()) return;
      setIsAsking(true);
      try {
          const result = await askSpecificQuestion(data.oduName, data, question, language);
          setChatResponse(result);
      } catch (error) { console.error(error); } finally { setIsAsking(false); }
  };
  const closeChat = () => { setShowChat(false); setChatResponse(null); setQuestion(""); };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'spirituality', label: t.tabSpirituality, icon: <Sparkles size={14} /> },
    { id: 'oriki', label: t.tabOriki, icon: <Book size={14} /> }, 
    { id: 'orishas', label: t.tabOrishas, icon: <Crown size={14} /> },
    { id: 'ori', label: t.tabOri, icon: <Compass size={14} /> },
    { id: 'ebos', label: t.tabEbos, icon: <Feather size={14} /> },
    { id: 'baths', label: t.tabBaths, icon: <Flower size={14} /> }, 
    { id: 'love', label: t.tabLove, icon: <Heart size={14} /> },
    { id: 'finance', label: t.tabFinance, icon: <Wallet size={14} /> },
    { id: 'health', label: t.tabHealth, icon: <Activity size={14} /> },
    { id: 'dangers', label: t.tabDangers, icon: <AlertTriangle size={14} /> }, 
    { id: 'diet', label: t.tabDiet, icon: <Utensils size={14} /> },
    { id: 'clothing', label: t.tabClothing, icon: <Shirt size={14} /> },
    { id: 'obstacles', label: t.tabObstacles, icon: <Swords size={14} /> },
    { id: 'ancestry', label: t.tabAncestry, icon: <Users size={14} /> },
    { id: 'personality', label: t.tabPersonality, icon: <Brain size={14} /> },
    { id: 'decisions', label: t.tabDecisions, icon: <Activity size={14} /> },
  ];

  return (
    <div className="animate-fade-in w-full max-w-6xl mx-auto p-4 md:p-8 bg-ifa-base text-ifa-text pb-24">
      
      {/* Header */}
      <div className="text-center mb-8 border-b border-ifa-border pb-6 relative">
        <h2 className="text-ifa-gold text-sm uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            {t.oduDetected} <span className="bg-ifa-wood text-white px-2 rounded-full text-[10px]">{planet.name}</span>
        </h2>
        
        <div className="mb-4">
             <span className={`inline-block px-4 py-1 rounded-full text-lg font-bold uppercase shadow-lg ${isIre ? 'bg-green-900 text-green-200 border border-green-500' : 'bg-red-900 text-red-200 border border-red-500'}`}>
                 {isIre ? 'Irê (Positivo)' : 'Osogbo (Negativo)'}
             </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-bold text-ifa-text mb-4 drop-shadow-md">
          {data.oduName}
        </h1>
        
        <div className={`mb-6 p-4 rounded-xl border max-w-3xl mx-auto ${isIre ? 'bg-green-900/20 border-green-500/50' : 'bg-red-900/20 border-red-500/50'}`}>
            <h3 className={`text-sm font-bold uppercase mb-2 ${isIre ? 'text-green-400' : 'text-red-400'}`}>
                Orientação do Caminho
            </h3>
            <p className="text-lg text-white leading-relaxed font-serif font-medium">
                {data.ireOsogboDescription || data.generalAdvice || "Consulte o Itan para detalhes."}
            </p>
            <p className="text-sm text-ifa-neutral mt-2 italic">
                Ação: {data.ireOsogboAction || "Consulte o Ebó."}
            </p>
        </div>

        <div className="flex justify-center items-center gap-2">
            <p className="text-lg text-ifa-neutral italic">"{data.summary}"</p>
            <TextReader text={`${data.oduName}. ${data.summary}`} />
        </div>
        
        <div className="absolute top-0 right-0 flex gap-2">
            <button 
                onClick={() => setShowPrintCenter(true)}
                className="p-3 bg-ifa-wood text-white rounded-full hover:opacity-90 shadow-lg"
                title="Central de Impressão"
            >
                <Printer size={20} />
            </button>
            <button 
                onClick={() => setShowShare(true)}
                className="p-3 bg-ifa-gold text-ifa-base rounded-full hover:opacity-90 shadow-lg"
                title="Compartilhar Card"
            >
                <Share2 size={20} />
            </button>
        </div>
      </div>

      <div className="mb-8 flex justify-center">
          <div className="bg-ifa-base-dark border border-ifa-border rounded-lg p-3 flex items-center gap-4 text-xs text-ifa-neutral">
              <div className="flex items-center gap-1"><Clock size={14} /> {new Date().toLocaleTimeString()}</div>
              <div className="h-4 w-[1px] bg-ifa-border"></div>
              <div className="flex items-center gap-1">{planet.icon} {planet.desc}</div>
          </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1 space-y-6">
              <div className="bg-ifa-surface p-6 rounded-lg border border-ifa-border shadow-xl relative">
                  <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2 text-ifa-gold"><BookOpen size={20} /><h3 className="font-serif font-bold text-xl">Itan</h3></div><TextReader text={data.itan} /></div>
                  <p className="text-ifa-text leading-relaxed text-sm md:text-base font-light font-sans max-h-[400px] overflow-y-auto pr-2 custom-scroll">{data.itan || "O Itan deste Odu traz ensinamentos sobre paciência e sabedoria."}</p>
                  
                  {/* RESUMO DIDÁTICO ABAIXO DO ITAN */}
                  {data.itanSummary && (
                      <div className="mt-4 pt-4 border-t border-ifa-border/30 bg-ifa-base-dark p-3 rounded border border-ifa-border/50">
                          <h4 className="text-xs font-bold text-ifa-gold uppercase mb-1">Resumo para o Consulente:</h4>
                          <p className="text-sm italic text-ifa-neutral">{data.itanSummary}</p>
                      </div>
                  )}
              </div>
              
              <div className="bg-ifa-surface p-6 rounded-lg border border-ifa-border shadow-xl">
                  <div className="flex items-center gap-2 text-ifa-gold mb-4"><ShieldAlert size={20} /><h3 className="font-serif font-bold text-xl">{t.tabDangers}</h3></div>
                  <p className="text-ifa-text leading-relaxed text-sm md:text-base font-light">{data.dangers || "Evite conflitos desnecessários."}</p>
              </div>
          </div>

          <div className="xl:col-span-2 flex flex-col">
              <div className="mb-8 bg-[#2E7D32]/10 p-6 rounded-lg border border-[#2E7D32]/30 relative">
                  <div className="flex justify-between items-center mb-3"><h3 className="font-serif text-xl text-[#81c784]">{t.generalAdvice}</h3><TextReader text={data.generalAdvice} /></div>
                  <p className="text-ifa-text leading-relaxed">{data.generalAdvice || "Mantenha a calma e busque o equilíbrio."}</p>
              </div>

              <div className="mb-6"><div className="flex flex-wrap gap-3 justify-center md:justify-start">{tabs.map((tab) => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`relative group flex flex-col items-center justify-center w-24 h-20 md:w-28 md:h-24 p-2 rounded-xl transition-all duration-300 border-2 shadow-lg ${activeTab === tab.id ? 'bg-ifa-text-light border-ifa-gold text-ifa-base -translate-y-1 shadow-yellow-900/30' : 'bg-ifa-base-dark border-ifa-border text-ifa-neutral hover:bg-ifa-surface hover:text-ifa-text'}`}><div className="mb-1">{tab.icon}</div><span className="text-xs font-bold text-center leading-tight">{tab.label}</span></button>)}</div></div>

              <div className="bg-ifa-surface p-8 rounded-xl border border-ifa-border flex-grow shadow-2xl relative overflow-hidden min-h-[400px]">
                  <div className="flex items-center justify-between mb-6"><h3 className="text-2xl font-serif text-ifa-gold flex items-center gap-3">{tabs.find(t => t.id === activeTab)?.icon}{tabs.find(t => t.id === activeTab)?.label}</h3></div>
                  <div className="animate-fade-in text-lg text-ifa-text leading-relaxed whitespace-pre-line font-light">
                      
                      {activeTab === 'ebos' && (
                          <div>
                              <p className="mb-4 text-ifa-neutral">{t.tabEbos}</p>
                              <EboSelector category={t.tabEbos} basic={data.solutionsAndEbos.basic} medium={data.solutionsAndEbos.medium} complete={data.solutionsAndEbos.complete} currentSelection={selections.general} onSelect={(t:any) => updateSelection('general', t)} oduName={data.oduName}/>
                              <SpecificProblemInput onGenerate={handleGenerateAkose} isLoading={isGeneratingRemedy} t={t} />
                              {renderCustomRemedies()}
                          </div>
                      )}

                      {activeTab === 'love' && (
                          <div>
                              <p className="mb-4">{data.love.analysis || "Para o amor, é necessário paciência."}</p>
                              <EboSelector category={t.tabLove} basic={data.love.ebos.basic} medium={data.love.ebos.medium} complete={data.love.ebos.complete} currentSelection={selections.love} onSelect={(t:any) => updateSelection('love', t)} oduName={data.oduName}/>
                              {renderCustomRemedies()}
                          </div>
                      )}

                      {activeTab === 'finance' && (
                          <div>
                              <p className="mb-4">{data.finance.analysis || "Tenha cautela com gastos."}</p>
                              <EboSelector category={t.tabFinance} basic={data.finance.ebos.basic} medium={data.finance.ebos.medium} complete={data.finance.ebos.complete} currentSelection={selections.finance} onSelect={(t:any) => updateSelection('finance', t)} oduName={data.oduName}/>
                              {renderCustomRemedies()}
                          </div>
                      )}

                      {activeTab === 'health' && (
                          <div>
                              <p className="mb-4">{data.health.analysis || "Cuide da alimentação."}</p>
                              <div className="mb-4 flex flex-wrap gap-2">
                                  {data.health.risks && data.health.risks.map(r => <span key={r} className="bg-red-900/30 text-red-200 px-3 py-1 rounded-full text-xs font-bold border border-red-800">{r}</span>)}
                              </div>
                              <EboSelector category={t.tabHealth} basic={data.health.ebos.basic} medium={data.health.ebos.medium} complete={data.health.ebos.complete} currentSelection={selections.health} onSelect={(t:any) => updateSelection('health', t)} oduName={data.oduName}/>
                              {renderCustomRemedies()}
                          </div>
                      )}

                      {activeTab === 'spirituality' && <p className="whitespace-pre-line">{renderTextField(data.spirituality, "Conecte-se com sua essência.")}</p>}
                      {/* ... other tabs ... */}
                      {activeTab === 'oriki' && (
                          <div className="space-y-6">
                              <div className="bg-black/20 p-4 rounded border-l-4 border-ifa-gold">
                                  <h4 className="text-ifa-gold text-sm font-bold uppercase mb-2">Reza do Odu (Chant)</h4>
                                  <p className="italic mb-2">{data.chant?.yoruba || "Ifá wa gbo temi."}</p>
                                  {data.chant?.yoruba && <TextReader text={data.chant.yoruba} forceLang="yo-NG" />}
                                  <p className="text-sm text-ifa-neutral mt-2 border-t border-ifa-border pt-2">{data.chant?.translation}</p>
                              </div>
                              <div className="bg-blue-900/10 p-4 rounded border-l-4 border-blue-500">
                                  <h4 className="text-blue-400 text-sm font-bold uppercase mb-2">Oriki Pessoal (Para o Consulente)</h4>
                                  <p className="italic mb-2">{data.oduOriki?.yoruba}</p>
                                  {data.oduOriki?.yoruba && <TextReader text={data.oduOriki.yoruba} forceLang="yo-NG" />}
                                  <p className="text-sm text-ifa-neutral mt-2">{data.oduOriki?.translation}</p>
                                  <p className="text-xs text-ifa-gold mt-2 font-bold uppercase">Modo de Rezar: {data.oduOriki?.instructions}</p>
                              </div>
                          </div>
                      )}
                      
                      {/* ... rest of the tabs ... */}
                      {activeTab === 'orishas' && <p className="whitespace-pre-line">{renderTextField(data.rulingOrishas, "Informação não disponível.")}</p>}
                      {activeTab === 'ori' && <p className="whitespace-pre-line">{renderTextField(data.destinyAndOri, "Informação não disponível.")}</p>}
                      {activeTab === 'dangers' && <p className="whitespace-pre-line">{renderTextField(data.dangers, "Informação não disponível.")}</p>}
                      {activeTab === 'diet' && <div><p className="text-green-400 mb-2">👍 {renderTextField(data.diet?.positive, "")}</p><p className="text-red-400">🚫 {renderTextField(data.diet?.negative, "")}</p></div>}
                      {activeTab === 'clothing' && <div><p className="text-green-400 mb-2">👍 {renderTextField(data.clothing?.positive, "")}</p><p className="text-red-400">🚫 {renderTextField(data.clothing?.negative, "")}</p></div>}
                      {activeTab === 'obstacles' && <p className="whitespace-pre-line">{renderTextField(data.obstaclesAndEnemies, "Informação não disponível.")}</p>}
                      {activeTab === 'ancestry' && <p className="whitespace-pre-line">{renderTextField(data.ancestry, "Informação não disponível.")}</p>}
                      {activeTab === 'personality' && <p className="whitespace-pre-line">{renderTextField(data.personality, "Informação não disponível.")}</p>}
                      {activeTab === 'decisions' && <p className="whitespace-pre-line">{renderTextField(data.decisionMaking, "Informação não disponível.")}</p>}
                      
                      {activeTab === 'baths' && (
                          <div className="bg-green-900/10 p-6 rounded border border-green-700">
                              <h4 className="text-green-400 font-bold text-xl mb-2">{data.herbalBaths?.name || "Banho de Ervas"}</h4>
                              <p className="text-sm text-ifa-neutral mb-4 italic">{data.herbalBaths.purpose}</p>
                              <ShoppingList ingredients={data.herbalBaths.ingredients || []} />
                              <div className="mt-4">
                                  <h5 className="font-bold text-sm uppercase mb-2">Preparo:</h5>
                                  <p className="text-sm leading-relaxed whitespace-pre-line">{data.herbalBaths.preparation}</p>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </div>

      {/* Rest of the component (Mandala, Notes, etc) */}
      <div className="mt-16 flex flex-col items-center gap-6">
        <div className="w-full max-w-2xl bg-black/40 border border-ifa-gold/30 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <div className="bg-ifa-wood text-white p-3 rounded-full">
                    <Hexagon size={24} />
                </div>
                <div>
                    <h4 className="text-ifa-gold font-bold uppercase text-sm">Mandala do Odu {data.oduName}</h4>
                    <p className="text-xs text-ifa-neutral">Arte digital vibracional para o cliente.</p>
                </div>
            </div>
            
            <div className="flex items-center gap-4">
                <button onClick={onOpenMandala} className="text-xs text-ifa-gold underline hover:text-white">
                    Visualizar / Imprimir
                </button>
                <div className="flex items-center gap-2 bg-ifa-base-dark p-2 rounded border border-ifa-border">
                    <span className="text-xs font-bold text-green-400">R$</span>
                    <input 
                        type="number" 
                        value={selections.mandala?.price || ''} 
                        onChange={(e) => updateMandalaSettings(selections.mandala?.selected || false, parseFloat(e.target.value))}
                        placeholder="Preço"
                        className="w-16 bg-transparent text-white text-sm outline-none text-right"
                    />
                </div>
                <button 
                    onClick={() => updateMandalaSettings(!selections.mandala?.selected, selections.mandala?.price || 50)}
                    className={`px-4 py-2 rounded text-xs font-bold uppercase transition-colors ${selections.mandala?.selected ? 'bg-green-600 text-white' : 'bg-ifa-base border border-ifa-border text-ifa-neutral hover:border-ifa-gold'}`}
                >
                    {selections.mandala?.selected ? 'Incluído' : 'Adicionar'}
                </button>
            </div>
        </div>

        <div className="w-full max-w-2xl mx-auto bg-ifa-base-dark border border-ifa-gold/50 rounded-lg p-6 shadow-inner relative">
            <div className="absolute -top-3 left-4 bg-ifa-base-dark px-2 text-ifa-gold text-xs font-bold uppercase flex items-center gap-2 border border-ifa-gold/50 rounded-full">
                <Lock size={12} /> Notas Confidenciais do Babalawo
            </div>
            <textarea 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                placeholder="Escreva aqui observações que não aparecerão na impressão do cliente (a menos que autorizado)."
                className="w-full h-32 bg-ifa-base border border-ifa-border text-ifa-text p-4 rounded focus:border-ifa-gold outline-none resize-none text-sm placeholder-ifa-neutral/30"
            />
            <p className="text-[10px] text-ifa-neutral mt-2 text-right">
                Este campo é salvo automaticamente, mas permanece oculto por padrão.
            </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6 w-full mt-4">
            <button onClick={onReset} className="px-8 py-4 bg-transparent border-2 border-ifa-gold text-ifa-gold font-serif uppercase tracking-widest hover:bg-ifa-gold hover:text-ifa-base transition-all duration-300 rounded">{t.playAgain}</button>
            <button onClick={() => setShowChat(true)} className="px-8 py-4 bg-ifa-wood text-white font-serif uppercase tracking-widest hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg rounded"><MessageCircle size={20} /> {t.askQuestion}</button>
        </div>
        <div className="w-full border-t border-ifa-border mt-8 pt-8 flex justify-center">
            <button onClick={() => onEndSession(selections, notes)} className="px-12 py-4 bg-red-900/30 border border-red-800 text-red-200 font-bold uppercase tracking-widest hover:bg-red-900 transition-colors rounded shadow-2xl flex items-center gap-2"><X size={20} /> {t.endSession}</button>
        </div>
      </div>

      {showShare && <ShareCard odu={oduInfo} data={data} onClose={() => setShowShare(false)} />}
      {showPrintCenter && <PrintCenter data={data} oduInfo={oduInfo} selections={selections} notes={notes} interactiveQA={chatResponse ? { question, answer: chatResponse.fullAnswer } : undefined} onClose={() => setShowPrintCenter(false)} />}
      
      {showChat && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="bg-ifa-base w-full max-w-lg rounded-xl border border-ifa-gold shadow-2xl flex flex-col h-[600px]">
                <div className="flex justify-between items-center p-4 border-b border-ifa-border">
                    <h3 className="font-serif font-bold text-ifa-gold">Oráculo Interativo</h3>
                    <button onClick={closeChat} className="text-ifa-neutral hover:text-white"><X /></button>
                </div>
                <div className="flex-grow p-4 overflow-y-auto space-y-4">
                    {!chatResponse && <p className="text-center text-ifa-neutral mt-8">Faça uma pergunta específica para {data.oduName}.</p>}
                    {chatResponse && (
                        <div className="space-y-4 animate-fade-in">
                            <div className="bg-ifa-wood text-white p-3 rounded-br-xl rounded-tl-xl rounded-tr-xl self-end ml-8">
                                <p className="text-sm font-bold mb-1">Resumo:</p>
                                <p>{chatResponse.shortSummary}</p>
                            </div>
                            <div className="bg-ifa-surface border border-ifa-border p-4 rounded-bl-xl rounded-tr-xl rounded-tl-xl mr-8">
                                <p className="text-sm leading-relaxed whitespace-pre-line">{chatResponse.fullAnswer}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-4 border-t border-ifa-border bg-ifa-base-dark">
                    <form onSubmit={handleAskQuestion} className="flex gap-2">
                        <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ex: Devo viajar este mês?" className="flex-grow bg-ifa-base border border-ifa-border rounded-full px-4 py-2 text-sm focus:border-ifa-gold outline-none"/>
                        <button type="submit" disabled={isAsking} className="bg-ifa-gold text-ifa-base p-2 rounded-full hover:opacity-90 disabled:opacity-50"><Send size={20} /></button>
                    </form>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default InterpretationView;
