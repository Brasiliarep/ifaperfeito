
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { OpeleState, SeedState, OduInfo, AIInterpretation, LoadingState, ClientData, ConsultationRecord, SelectionMap, Language, DivinationMethod, CowrieState, UserProfile } from './types';
import OpeleSeed from './components/OpeleSeed';
import OponIfaBoard from './components/OponIfaBoard';
import MerindilogunBoard from './components/MerindilogunBoard';
import { calculateOdu, NAME_TO_VALUE, valueToLeg, getLegValue, SIGN_NAMES, calculateMerindilogunOdu } from './utils/oduLogic';
import { fetchInterpretation, analyzeOpeleImage, hasValidKey, setManualKey } from './services/geminiService';
import { saveConsultation } from './services/storageService';
import InterpretationView from './components/InterpretationView';
import ClientRegistration from './components/ClientRegistration';
import { PrintLayout } from './components/PrintLayout';
import ConsultationHistory from './components/ConsultationHistory';
import SettingsModal from './components/SettingsModal';
import YorubaCalendarWidget from './components/YorubaCalendarWidget'; 
import SacredTextLibrary from './components/SacredTextLibrary'; 
import AkoseLibrary from './components/AkoseLibrary';
import OogunHub from './components/OogunHub'; 
import AnalyticsDashboard from './components/AnalyticsDashboard';
import StudyMode from './components/StudyMode';
import ManualView from './components/ManualView';
import DreamJournal from './components/DreamJournal';
import FaceReading from './components/FaceReading';
import GeoHerbManager from './components/GeoHerbManager';
import LineageTree from './components/LineageTree'; 
import OduMandala from './components/OduMandala'; 
import Igbadu from './components/Igbadu'; 
import IleIfeCompass from './components/IleIfeCompass';
import IbaDigital from './components/IbaDigital'; 
import FeedbackFooter from './components/FeedbackFooter'; 
import InventoryHub from './components/InventoryHub';
import SoundHub from './components/SoundHub';
import AjogunDiagnosis from './components/AjogunDiagnosis';
import { AssentamentoGuideView } from './components/AssentamentoGuide';
import HerbIdentifier from './components/HerbIdentifier'; 
import OracleHub from './components/OracleHub'; 
import EboSimulator from './components/EboSimulator'; 
import InstallButton from './components/InstallButton';
import Amutorunwa from './components/Amutorunwa'; 
import InteractiveEbori from './components/InteractiveEbori'; 
import YorubaDictionary from './components/YorubaDictionary'; 
import SangoWheel from './components/SangoWheel'; 
import ReverseOdu from './components/ReverseOdu'; 
import EsotericHub from './components/EsotericHub'; 
import DoorGuardian from './components/DoorGuardian'; 
import VoiceCommander from './components/VoiceCommander'; 
import TreatiseView from './components/TreatiseView'; 
import MojubaMode from './components/MojubaMode'; 
import OduConstellation from './components/OduConstellation'; 
import EboDelivery from './components/EboDelivery'; 
import StoryMode from './components/StoryMode';
import SubscriptionModal from './components/SubscriptionModal'; 
import LegalModal from './components/LegalModal';
import AmbiencePlayer from './components/AmbiencePlayer';
import AgendaManager from './components/AgendaManager';
import LockScreen from './components/LockScreen'; 
import KeyInputModal from './components/KeyInputModal';
import OduLibraryTable from './components/OduLibraryTable';

import { getTranslation } from './utils/i18n';
import { checkDomainLock } from './utils/security';
import { Feather, Loader2, Users, History, GraduationCap, X, Check, Settings, Globe, Camera, Book, Shuffle, FileText, FlaskConical, BarChart3, Package, Music, Hammer, Leaf, CircleDot, Move, GripHorizontal, Baby, UserCheck, ArrowLeft, Database, Sparkles, Mic, Scale, BookOpen, PenTool, Gamepad2, Stars, ShoppingBag, Crown, Moon, MapPin, Truck, GitBranch, LayoutGrid, Search, Sun, Sunset, CloudMoon, Quote, CalendarDays, Lock, Stethoscope, Zap } from 'lucide-react';

const INITIAL_OPELE: OpeleState = {
  rightLeg: ['open', 'open', 'open', 'open'],
  leftLeg: ['open', 'open', 'open', 'open'],
};

const INITIAL_COWRIES: CowrieState = Array(16).fill('closed');

const PROVERBS = [
    { yo: "A kii gbo kikun odo, ki a fi omi rẹ se oube.", pt: "Não se ouve o ronco do mar e se usa sua água para matar a sede (Respeite as forças)." },
    { yo: "Iwa l'ewa", pt: "O caráter é a beleza." },
    { yo: "Bi omi ti nsan, bee ni a nfi oju gba a.", pt: "Como a água corre, assim devemos acompanhar o fluxo da vida." },
    { yo: "Agba kii wa loja, ki ori omo titun o wo.", pt: "O ancião não está no mercado para deixar a cabeça do bebê torta (Responsabilidade)." },
    { yo: "Aje ke lana, omo ku loni.", pt: "A bruxa gritou ontem, a criança morreu hoje (Cuidado com coincidências)." }
];

type AppView = 'home' | 'history' | 'register' | 'input' | 'result' | 'print' | 'prayers' | 'manual' | 'oogun' | 'analytics' | 'inventory_hub' | 'sound_hub' | 'study' | 'dream_journal' | 'face_reading' | 'geo_herbs' | 'lineage_tree' | 'igbadu' | 'oracle_hub' | 'ajogun' | 'assentamentos' | 'herb_id' | 'ebo_sim' | 'mandala' | 'amutorunwa' | 'ebori' | 'dictionary' | 'sango_wheel' | 'reverse_odu' | 'esoteric_hub' | 'door_guardian' | 'voice_commander' | 'treatise' | 'story_mode' | 'mojuba' | 'constellation' | 'delivery' | 'agenda' | 'verse_builder' | 'odu_library';

function App() {
  const [isLocked, setIsLocked] = useState(false);
  const [isKeyMissing, setIsKeyMissing] = useState(false);
  const [view, setView] = useState<AppView>('home');
  const [opele, setOpele] = useState<OpeleState>(INITIAL_OPELE);
  const [cowries, setCowries] = useState<CowrieState>(INITIAL_COWRIES);
  const [divinationMethod, setDivinationMethod] = useState<DivinationMethod | null>(null);
  const [client, setClient] = useState<ClientData | null>(null);
  const [interpretation, setInterpretation] = useState<AIInterpretation | null>(null);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: false });
  const [activeRecord, setActiveRecord] = useState<ConsultationRecord | null>(null);
  const [language, setLanguage] = useState<Language>('pt-BR');
  const [showSettings, setShowSettings] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [showQuickStudyModal, setShowQuickStudyModal] = useState(false);
  const [studySelection, setStudySelection] = useState({ right: 'Ogbe', left: 'Ogbe' });
  const [showOpeningRitual, setShowOpeningRitual] = useState(false);
  const [showClosingRitual, setShowClosingRitual] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState(""); 
  
  const [homeSearch, setHomeSearch] = useState('');
  const [dailyWisdom, setDailyWisdom] = useState(PROVERBS[0]);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);

  const [user, setUser] = useState<UserProfile>({ 
      uid: 'guest', 
      email: '', 
      plan: 'pro_annual', 
      name: 'Visitante' 
  });
  const [showPaywall, setShowPaywall] = useState(false);
  const [blockedFeature, setBlockedFeature] = useState('');
  const [usageCount, setUsageCount] = useState(0);

  const viewRef = useRef<AppView>('home');

  useEffect(() => {
    viewRef.current = view;
  }, [view]);

  // SWIPE LOGIC
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > 60 && Math.abs(deltaY) < 40) {
            if (deltaX > 0 && viewRef.current !== 'home') {
                if (viewRef.current === 'result') {
                    if(confirm("Deseja sair da leitura e voltar ao início?")) setView('home');
                } else {
                    setView('home');
                }
            }
        }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const allowed = checkDomainLock();
    if (!allowed) { setIsLocked(true); return; }
    if (!hasValidKey()) { setIsKeyMissing(true); }
    setUser(prev => ({ ...prev, plan: 'pro_annual' }));
    setDailyWisdom(PROVERBS[0]); 
  }, []);

  const incrementUsage = () => {
      const newCount = usageCount + 1;
      setUsageCount(newCount);
      localStorage.setItem('ifa_usage_count', newCount.toString());
  }

  const handleProFeature = (featureName: string, action: () => void) => { action(); };
  const handleSubscribe = () => { setShowPaywall(false); };

  // --- NAVEGAÇÃO PARA CHAT VIA BUSCA ---
  const handleConsultOracle = (query: string) => {
      setChatInitialQuery(query);
      setView('voice_commander');
  };

  const currentOdu: OduInfo = useMemo(() => {
      if (divinationMethod === 'merindilogun') { return calculateMerindilogunOdu(cowries); }
      return calculateOdu(opele);
  }, [opele, cowries, divinationMethod]);

  const t = getTranslation(language);

  const toggleSeed = (leg: 'right' | 'left', index: number) => {
    setOpele(prev => {
      const newLeg = [...prev[leg === 'right' ? 'rightLeg' : 'leftLeg']] as [SeedState, SeedState, SeedState, SeedState];
      newLeg[index] = newLeg[index] === 'open' ? 'closed' : 'open';
      return { ...prev, [leg === 'right' ? 'rightLeg' : 'leftLeg']: newLeg };
    });
  };

  const toggleCowrie = (index: number) => {
      setCowries(prev => {
          const newCowries = [...prev];
          newCowries[index] = newCowries[index] === 'open' ? 'closed' : 'open';
          return newCowries;
      });
  };

  const handleMethodSelection = (method: DivinationMethod) => {
      setDivinationMethod(method);
  };

  const renderBoard = () => {
      if (divinationMethod === 'merindilogun') {
          return (<div className="w-full flex justify-center py-4"><MerindilogunBoard cowries={cowries} onToggle={toggleCowrie} /></div>);
      }
      if (divinationMethod === 'opon') {
          return (<div className="w-full flex justify-center py-4"><OponIfaBoard opele={opele} onToggle={toggleSeed} /></div>);
      }
      return (
        <div className="bg-ifa-base border border-ifa-border p-8 md:p-12 rounded-3xl shadow-2xl relative max-w-2xl w-full mb-8">
            <div className="flex justify-center gap-12 md:gap-24 mb-10 relative">
                <div className="absolute left-1/2 top-4 bottom-4 w-1 -ml-0.5 bg-ifa-border rounded opacity-50 hidden md:block"></div>
                <div className="flex flex-col items-center gap-4 z-10">
                    <h3 className="text-ifa-gold text-sm uppercase tracking-widest mb-2 font-bold">{t.rightLeg}</h3>
                    {opele.rightLeg.map((state, idx) => (<OpeleSeed key={`r-${idx}`} position={idx} state={state} onClick={() => toggleSeed('right', idx)} />))}
                </div>
                <div className="flex flex-col items-center gap-4 z-10">
                    <h3 className="text-ifa-gold text-sm uppercase tracking-widest mb-2 font-bold">{t.leftLeg}</h3>
                    {opele.leftLeg.map((state, idx) => (<OpeleSeed key={`l-${idx}`} position={idx} state={state} onClick={() => toggleSeed('left', idx)} />))}
                </div>
            </div>
        </div>
      );
  };

  const handleRegister = (data: ClientData) => { setClient(data); setShowOpeningRitual(true); };
  const onOpeningRitualComplete = () => { setShowOpeningRitual(false); setDivinationMethod(null); setView('input'); }
  const handleStudyStart = () => {
      setClient({ id: 'study', fullName: 'Estudo Individual', dateOfBirth: 'N/A', mothersName: 'N/A', address: 'N/A', consultationTime: new Date().toLocaleString(), profession: 'Estudante', maritalStatus: 'N/A', phone: 'N/A', email: 'N/A' });
      setDivinationMethod(null); setShowQuickStudyModal(false); setView('input');
  };

  const handleInterpret = async (oduToInterpret = currentOdu) => {
    setLoading({ isLoading: true, message: t.interpreting });
    try {
      const result = await fetchInterpretation(oduToInterpret, language);
      setInterpretation(result);
      incrementUsage(); 
      setView('result');
    } catch (e: any) {
        alert(`Erro na leitura. Verifique sua conexão. Detalhe: ${e.message}`);
    } finally {
      setLoading({ isLoading: false });
    }
  };
  
  const startNewSession = () => {
      setClient(null); setInterpretation(null); setOpele(INITIAL_OPELE); setCowries(INITIAL_COWRIES);
      setDivinationMethod(null); setShowQuickStudyModal(false); setActiveRecord(null); setView('register');
  }

  const handleEndSession = (finalSelections: SelectionMap, notes: string) => {
      if (client && interpretation) {
           const record: ConsultationRecord = {
              id: crypto.randomUUID(), client: client, odu: currentOdu, interpretation: interpretation,
              selections: finalSelections, timestamp: new Date().toLocaleString(), language: language, notes: notes, status: 'pending'
          };
          saveConsultation(record); setActiveRecord(record); setShowClosingRitual(true);
      }
  }

  const MenuBtn = ({ onClick, label, icon: Icon, colorClass, fullWidth = false, feature }: any) => {
      if (homeSearch && !label.toLowerCase().includes(homeSearch.toLowerCase())) return null;
      return (
        <button 
            onClick={() => { setHomeSearch(''); feature ? handleProFeature(feature, onClick) : onClick(); }} 
            className={`w-full ${fullWidth ? 'col-span-2' : ''} ${colorClass} border border-white/10 text-white font-bold text-sm uppercase rounded-lg shadow-lg flex items-center justify-center gap-3 py-4 px-4 hover:brightness-110 relative overflow-hidden group min-h-[60px] transition-all`}
        >
            <Icon size={20} className="shrink-0" /> <span className="text-center text-xs md:text-sm font-sans">{label}</span>
        </button>
      );
  };

  const renderHome = () => (
      <div className="flex flex-col items-center min-h-screen p-4 pb-24 relative bg-gradient-to-br from-black to-[#0f0c08]">
         {/* HEADER */}
         <div className="w-full flex justify-between items-center mb-6 pt-12 md:pt-4">
             <div className="flex items-center gap-2">
                 <div className="bg-ifa-gold p-2 rounded-full text-black"><Crown size={20} /></div>
                 <div className="flex flex-col">
                    <h1 className="text-xl font-serif font-black text-ifa-gold tracking-widest uppercase leading-none">IFÁ OLUWO</h1>
                    <span className="text-[8px] text-ifa-neutral uppercase tracking-wider hidden md:block">Codex Sacerdotal</span>
                 </div>
             </div>
             <div className="flex gap-3">
                 <button onClick={() => setShowSettings(true)} className="text-ifa-neutral hover:text-ifa-gold p-2 border border-white/10 rounded"><Settings size={20} /></button>
                 <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="text-ifa-neutral hover:text-ifa-gold p-2 border border-white/10 rounded text-xs font-bold">{language}</button>
             </div>
         </div>

         {/* Calendar Widget */}
         {!homeSearch && <YorubaCalendarWidget onOpenIgbadu={() => handleProFeature('Igbadu Virtual', () => setView('igbadu'))} />}
         
         {!homeSearch && <IleIfeCompass />}
         
         <div className="w-full max-w-md space-y-4 pb-20">
            {/* Search Bar */}
            <div className="relative mb-4">
                <input value={homeSearch} onChange={(e) => setHomeSearch(e.target.value)} placeholder="Buscar função..." className="w-full bg-ifa-base-dark border border-ifa-border rounded-xl py-3 pl-10 pr-4 text-ifa-text focus:border-ifa-gold outline-none shadow-inner" />
                <Search className="absolute left-3 top-3.5 text-ifa-neutral" size={18} />
                {homeSearch && <button onClick={() => setHomeSearch('')} className="absolute right-3 top-3.5 text-ifa-neutral hover:text-white"><X size={16}/></button>}
            </div>

            {/* --- SEÇÃO 1: PRINCIPAL (CORE) --- */}
            <MenuBtn onClick={startNewSession} label="Atendimento ao Consulente" icon={Users} colorClass="bg-ifa-gold text-black" fullWidth />
            <div className="grid grid-cols-2 gap-3">
                <MenuBtn onClick={handleStudyStart} label="Modo Estudo Individual" icon={GraduationCap} colorClass="bg-ifa-wood" />
                <MenuBtn onClick={() => setView('oracle_hub')} label="Oráculos Sagrados" icon={CircleDot} colorClass="bg-yellow-800/90" />
            </div>

            {/* --- SEÇÃO 2: CONHECIMENTO & ESTUDO --- */}
            <h3 className="text-xs font-bold text-ifa-neutral uppercase tracking-widest mt-6 mb-2 pl-1 border-l-4 border-ifa-gold">Conhecimento (Imo)</h3>
            <div className="grid grid-cols-2 gap-3">
                <MenuBtn onClick={() => setView('odu_library')} label="Biblioteca 256 Odu" icon={Book} colorClass="bg-amber-900/80" />
                <MenuBtn onClick={() => setView('treatise')} label="Tratado Ifá Completo" icon={BookOpen} colorClass="bg-stone-800/90" />
                <MenuBtn onClick={() => setView('prayers')} label="Bibl. Sagrada (Rezas)" icon={Book} colorClass="bg-indigo-900/80" />
                <MenuBtn onClick={() => setView('amutorunwa')} label="Nomes Yorubá" icon={Baby} colorClass="bg-pink-900/80" />
                <MenuBtn onClick={() => setView('dictionary')} label="Dicionário Yorubá" icon={Book} colorClass="bg-gray-700/80" />
            </div>

            {/* --- SEÇÃO 3: FERRAMENTAS ESOTÉRICAS & VOZ --- */}
            <h3 className="text-xs font-bold text-ifa-neutral uppercase tracking-widest mt-6 mb-2 pl-1 border-l-4 border-purple-500">Esotérico (Awo)</h3>
            <MenuBtn onClick={() => setView('voice_commander')} label="Voz do Trovão (Comando)" icon={Mic} colorClass="bg-red-800/80" fullWidth />
            <div className="grid grid-cols-2 gap-3">
                <MenuBtn onClick={() => setView('esoteric_hub')} label="Ferramentas Esotéricas" icon={Sparkles} colorClass="bg-purple-900/90" />
                <MenuBtn onClick={() => setView('ebori')} label="Ori & Ara (Interativo)" icon={UserCheck} colorClass="bg-blue-900/80" />
                <MenuBtn onClick={() => setView('reverse_odu')} label="Mat. Reversa" icon={Database} colorClass="bg-teal-900/80" />
                <MenuBtn onClick={() => setView('ebo_sim')} label="Simulador Ebó" icon={Move} colorClass="bg-orange-800/80" />
                <MenuBtn onClick={() => setView('sound_hub')} label="Sons Sagrados" icon={Music} colorClass="bg-violet-900/80" />
                <MenuBtn onClick={() => setView('dream_journal')} label="Diário de Sonhos" icon={Moon} colorClass="bg-indigo-900/70" />
            </div>

            {/* --- SEÇÃO 4: MAGIA PRÁTICA --- */}
            <h3 className="text-xs font-bold text-ifa-neutral uppercase tracking-widest mt-6 mb-2 pl-1 border-l-4 border-red-500">Magia (Oogun)</h3>
            <div className="grid grid-cols-2 gap-3">
                <MenuBtn onClick={() => setView('sango_wheel')} label="Roda de Xangô" icon={Scale} colorClass="bg-red-900/80" />
                {/* ATUALIZADO: Akose para Oogun Hub com onConsultOracle */}
                <MenuBtn onClick={() => setView('oogun')} label="ỌỌGÙN (MAGIAS)" icon={FlaskConical} colorClass="bg-emerald-900/80" />
                <MenuBtn onClick={() => setView('herb_id')} label="ID Ewé (Ervas)" icon={Leaf} colorClass="bg-green-900/80" />
                <MenuBtn onClick={() => setView('assentamentos')} label="Assentamentos" icon={Hammer} colorClass="bg-stone-700/80" />
                <MenuBtn onClick={() => setView('geo_herbs')} label="Mapa de Ervas" icon={MapPin} colorClass="bg-green-800/80" />
                <MenuBtn onClick={() => setView('ajogun')} label="Diagnóstico (Ajogun)" icon={Stethoscope} colorClass="bg-rose-900/80" />
            </div>

            {/* --- SEÇÃO 5: GESTÃO E SOCIAL --- */}
            <h3 className="text-xs font-bold text-ifa-neutral uppercase tracking-widest mt-6 mb-2 pl-1 border-l-4 border-blue-500">Gestão do Templo</h3>
            <div className="grid grid-cols-2 gap-3">
                <MenuBtn onClick={() => setView('inventory_hub')} label="Gestão Templo" icon={Package} colorClass="bg-orange-900/80" />
                <MenuBtn onClick={() => setView('agenda')} label="Agenda Litúrgica" icon={CalendarDays} colorClass="bg-blue-800/80" />
                <MenuBtn onClick={() => setView('lineage_tree')} label="Linhagem (Axé)" icon={GitBranch} colorClass="bg-cyan-900/80" />
                <MenuBtn onClick={() => setView('analytics')} label="Painel Egrégora" icon={BarChart3} colorClass="bg-gray-800/90" />
                <MenuBtn onClick={() => setView('story_mode')} label="Jogos de Ifá (RPG)" icon={Gamepad2} colorClass="bg-yellow-700/80" />
            </div>

            {/* FOOTER BUTTON */}
            <div className="mt-6">
                <MenuBtn onClick={() => setView('manual')} label="Manual do Sacerdote" icon={BookOpen} colorClass="bg-stone-600" fullWidth />
            </div>
         </div>
      </div>
  );

  if (isLocked) return <LockScreen onUnlock={() => setIsLocked(false)} />;
  if (isKeyMissing) return <KeyInputModal onSave={setManualKey} />;

  return (
    <div className="min-h-screen bg-ifa-base-dark text-ifa-text font-sans relative overflow-x-hidden pt-safe pb-safe">
      <InstallButton />
      {(view === 'input' || view === 'study') && <AmbiencePlayer />}

      {view === 'home' && (<>{renderHome()}<FeedbackFooter /></>)}
      {view === 'manual' && <ManualView onBack={() => setView('home')} />}
      
      <div className="pt-8">
          {view === 'prayers' && <SacredTextLibrary onBack={() => setView('home')} />}
          {view === 'sango_wheel' && <SangoWheel onBack={() => setView('home')} />}
          
          {/* OOGUN HUB COM FUNÇÃO DE NAVEGAÇÃO CORRETA */}
          {view === 'oogun' && <OogunHub onBack={() => setView('home')} onOpenInventory={() => setView('inventory_hub')} onConsultOracle={handleConsultOracle} />}
          
          {view === 'ebori' && <InteractiveEbori onBack={() => setView('home')} />}
          {view === 'herb_id' && <HerbIdentifier onBack={() => setView('home')} />}
          {view === 'dictionary' && <YorubaDictionary onBack={() => setView('home')} />}
          {view === 'oracle_hub' && <OracleHub onBack={() => setView('home')} />}
          {view === 'esoteric_hub' && <EsotericHub onBack={() => setView('home')} />}
          {view === 'reverse_odu' && <ReverseOdu onBack={() => setView('home')} />}
          {view === 'door_guardian' && <DoorGuardian onBack={() => setView('home')} />}
          
          {/* VOICE COMMANDER COM INITIAL PROMPT */}
          {view === 'voice_commander' && <VoiceCommander onBack={() => { setView('home'); setChatInitialQuery(""); }} initialPrompt={chatInitialQuery} />}
          
          {view === 'treatise' && <TreatiseView onBack={() => setView('home')} />}
          {view === 'mojuba' && <MojubaMode onBack={() => setView('home')} />}
          {view === 'constellation' && <OduConstellation onBack={() => setView('home')} />}
          {view === 'amutorunwa' && <Amutorunwa onBack={() => setView('home')} />}
          {view === 'face_reading' && <FaceReading onBack={() => setView('home')} />}
          {view === 'lineage_tree' && <LineageTree onBack={() => setView('home')} />}
          {view === 'inventory_hub' && <InventoryHub onBack={() => setView('home')} />}
          {view === 'sound_hub' && <SoundHub onBack={() => setView('home')} />}
          {/* ASSENTAMENTOS COM FUNÇÃO DE NAVEGAÇÃO */}
          {view === 'assentamentos' && <AssentamentoGuideView onBack={() => setView('home')} onConsultOracle={handleConsultOracle} />}
          
          {view === 'ebo_sim' && <EboSimulator onBack={() => setView('home')} />}
          {view === 'geo_herbs' && <GeoHerbManager onBack={() => setView('home')} />}
          {view === 'analytics' && <AnalyticsDashboard onBack={() => setView('home')} />}
          {view === 'dream_journal' && <DreamJournal onBack={() => setView('home')} />}
          {view === 'igbadu' && <Igbadu onBack={() => setView('home')} />}
          {view === 'ajogun' && <AjogunDiagnosis onBack={() => setView('home')} />}
          {view === 'story_mode' && <StoryMode onBack={() => setView('home')} />}
          {view === 'agenda' && <AgendaManager onBack={() => setView('home')} />}
          {view === 'delivery' && <EboDelivery onBack={() => setView('home')} />}
          {view === 'verse_builder' && <StoryMode onBack={() => setView('home')} />}
          
          {view === 'mandala' && <OduMandala odu={currentOdu} onBack={() => setView('result')} />}
          {view === 'history' && <ConsultationHistory onBack={() => setView('home')} onView={(r) => { setActiveRecord(r); setView('print'); }} />}
          {view === 'register' && <div className="min-h-screen flex items-center justify-center p-4"><ClientRegistration onRegister={handleRegister} onCancel={() => setView('home')} /></div>}
          {view === 'study' && <StudyMode onBack={() => setView('home')} />}
          {view === 'odu_library' && <OduLibraryTable onBack={() => setView('home')} />}
      </div>

      <SubscriptionModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} onSubscribe={handleSubscribe} featureName={blockedFeature} />
      <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

      {showOpeningRitual && <IbaDigital mode="opening" onComplete={onOpeningRitualComplete} onCancel={() => setShowOpeningRitual(false)} />}
      {showClosingRitual && <IbaDigital mode="closing" onComplete={() => { setShowClosingRitual(false); setView('print'); }} onCancel={() => setShowClosingRitual(false)} />}

      {view === 'input' && !loading.isLoading && (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 w-full">
          <header className="text-center mb-6">
            <h2 className="text-ifa-neutral uppercase tracking-widest text-sm mb-2">{client?.id === 'study' ? t.btnStudy : t.btnConsultation}</h2>
            <h1 className="text-3xl font-serif font-bold text-ifa-text">{client?.fullName || '...'}</h1>
          </header>
          
          {!divinationMethod ? (
              <div className="w-full max-w-4xl grid gap-6 md:grid-cols-3 animate-fade-in">
                  <button onClick={() => handleMethodSelection('opele')} className="aspect-square bg-ifa-base border-2 border-ifa-border rounded-xl p-6 flex flex-col items-center justify-center hover:border-ifa-gold hover:bg-ifa-surface transition-all group">
                      <div className="w-16 h-16 bg-ifa-wood text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-ifa-gold group-hover:text-black"><GripHorizontal size={32} /></div>
                      <h3 className="text-xl font-bold font-serif uppercase">Opele Ifá</h3>
                  </button>
                  <button onClick={() => handleMethodSelection('opon')} className="aspect-square bg-ifa-base border-2 border-ifa-border rounded-xl p-6 flex flex-col items-center justify-center hover:border-ifa-gold hover:bg-ifa-surface transition-all group">
                      <div className="w-16 h-16 bg-ifa-wood text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-ifa-gold group-hover:text-black"><CircleDot size={32} /></div>
                      <h3 className="text-xl font-bold font-serif uppercase">Opon Ifá</h3>
                  </button>
                  <button onClick={() => handleMethodSelection('merindilogun')} className="aspect-square bg-ifa-base border-2 border-ifa-border rounded-xl p-6 flex flex-col items-center justify-center hover:border-ifa-gold hover:bg-ifa-surface transition-all group">
                      <div className="w-16 h-16 bg-ifa-wood text-white rounded-full flex items-center justify-center mb-4 group-hover:bg-ifa-gold group-hover:text-black"><Move size={32} /></div>
                      <h3 className="text-xl font-bold font-serif uppercase">Mérìndílógún</h3>
                  </button>
              </div>
          ) : (
              <div className="animate-fade-in w-full flex flex-col items-center">
                  <button onClick={() => setDivinationMethod(null)} className="mb-4 text-xs font-bold uppercase text-ifa-neutral hover:text-ifa-gold flex items-center gap-2"><ArrowLeft size={14} /> Trocar Método</button>
                  {renderBoard()}
                  <div className="text-center mb-8 bg-ifa-surface p-4 rounded-lg border border-ifa-border/30 w-full max-w-md mt-4">
                      <p className="text-ifa-neutral text-xs uppercase mb-1">{t.oduDetected}</p>
                      <h2 className="text-3xl font-serif text-ifa-text font-bold">{currentOdu.name}</h2>
                  </div>
                  <div className="space-y-4 w-full max-w-md">
                        <button onClick={() => handleInterpret()} disabled={loading.isLoading} className="w-full py-4 bg-ifa-gold text-ifa-base font-bold text-lg uppercase tracking-widest hover:opacity-90 transition-all rounded-lg shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 whitespace-normal text-center relative overflow-hidden group">
                            {loading.isLoading ? <><Loader2 className="animate-spin" /> {loading.message}</> : t.interpret}
                        </button>
                  </div>
              </div>
          )}
          <button onClick={() => setView('home')} className="mt-12 text-ifa-wood hover:text-ifa-gold border-t border-ifa-border/30 pt-4 w-full max-w-xs">{t.cancel}</button>
        </div>
      )}
      
      {view === 'result' && interpretation && <div className="min-h-screen py-12"><InterpretationView data={interpretation} oduInfo={currentOdu} initialSelections={activeRecord?.selections} language={language} onReset={() => { setInterpretation(null); setOpele(INITIAL_OPELE); setCowries(INITIAL_COWRIES); setDivinationMethod(null); setView('input'); }} onEndSession={handleEndSession} onOpenMandala={() => setView('mandala')} /></div>}
      {view === 'print' && activeRecord && <PrintLayout record={activeRecord} onBack={() => setView('home')} onReturnToSession={interpretation ? () => setView('result') : undefined} />}
      
      {showQuickStudyModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
              <div className="bg-ifa-base border border-ifa-border rounded-xl p-6 md:p-8 max-w-lg w-full relative shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
                  <button onClick={() => setShowQuickStudyModal(false)} className="absolute top-4 right-4 text-ifa-neutral hover:text-ifa-text"><X size={24} /></button>
                  <h2 className="text-2xl font-serif text-ifa-gold mb-2 text-center">Selecionar Odu</h2>
                  {/* Selectores Simplificados para Odu Manual */}
                  <div className="flex flex-col gap-4 mt-4">
                        <select value={studySelection.right} onChange={(e) => setStudySelection({...studySelection, right: e.target.value})} className="bg-ifa-base-dark p-3 rounded border text-white">{(Object.values(SIGN_NAMES) as string[]).sort().map(n => <option key={n} value={n}>{n}</option>)}</select>
                        <select value={studySelection.left} onChange={(e) => setStudySelection({...studySelection, left: e.target.value})} className="bg-ifa-base-dark p-3 rounded border text-white">{(Object.values(SIGN_NAMES) as string[]).sort().map(n => <option key={n} value={n}>{n}</option>)}</select>
                        <button onClick={() => {
                            const r = valueToLeg(NAME_TO_VALUE[studySelection.right]);
                            const l = valueToLeg(NAME_TO_VALUE[studySelection.left]);
                            setOpele({ rightLeg: r, leftLeg: l });
                            setShowQuickStudyModal(false);
                        }} className="bg-ifa-gold text-black p-3 rounded font-bold">Confirmar</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}

export default App;
