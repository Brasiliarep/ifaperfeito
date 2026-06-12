
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { OpeleState, SeedState, OduInfo, AIInterpretation, LoadingState, ClientData, ConsultationRecord, SelectionMap, Language, DivinationMethod, CowrieState, UserProfile, IreOsogboType } from './types';
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
import IboRitual from './components/IboRitual';
import OraclePreparation from './components/OraclePreparation';
import VirtualRoom from './components/VirtualRoom';
import CookieConsentBanner from './components/CookieConsentBanner';
import { AIAssistant } from './components/AIAssistant';

import { getTranslation } from './utils/i18n';
import { checkDomainLock } from './utils/security';
import { canUseFeature, incrementAnonUsage, getAnonRemaining } from './utils/anonymousTracker';
import { Feather, Loader2, Users, History, GraduationCap, X, Check, Settings, Globe, Camera, Book, Shuffle, FileText, FlaskConical, BarChart3, Package, Music, Hammer, Leaf, CircleDot, Move, GripHorizontal, Baby, UserCheck, ArrowLeft, Database, Sparkles, Mic, Scale, BookOpen, PenTool, Gamepad2, Stars, ShoppingBag, Crown, Moon, MapPin, Truck, GitBranch, LayoutGrid, Search, Sun, Sunset, CloudMoon, Quote, CalendarDays, Lock, Stethoscope, Zap, Video, Shield } from 'lucide-react';

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

import AdminPanel from './components/AdminPanel';
import { useAuth } from './services/AuthContext';

type AppView = 'home' | 'history' | 'register' | 'input' | 'result' | 'print' | 'prayers' | 'manual' | 'oogun' | 'analytics' | 'inventory_hub' | 'sound_hub' | 'study' | 'dream_journal' | 'face_reading' | 'geo_herbs' | 'lineage_tree' | 'igbadu' | 'oracle_hub' | 'ajogun' | 'assentamentos' | 'herb_id' | 'ebo_sim' | 'mandala' | 'amutorunwa' | 'ebori' | 'dictionary' | 'sango_wheel' | 'reverse_odu' | 'esoteric_hub' | 'door_guardian' | 'voice_commander' | 'treatise' | 'story_mode' | 'mojuba' | 'constellation' | 'delivery' | 'agenda' | 'verse_builder' | 'odu_library' | 'virtual_room' | 'admin_panel';
import LoginScreen from './components/LoginScreen';

function App() {
    const { user, userProfile, loading: authLoading, updateUsageCounters } = useAuth();
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
    const [language, setLanguage] = useState<Language>(() => {
      try {
        const saved = localStorage.getItem('ifa_language') as Language | null;
        if (saved && ['pt-BR', 'pt-PT', 'en', 'es', 'yo'].includes(saved)) return saved;
        const nav = (navigator.language || 'pt-BR').slice(0, 2);
        if (nav === 'pt') return 'pt-BR';
        if (nav === 'en') return 'en';
        if (nav === 'es') return 'es';
        if (nav === 'yo') return 'yo';
      } catch {}
      return 'pt-BR';
    });
    const [showSettings, setShowSettings] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [showQuickStudyModal, setShowQuickStudyModal] = useState(false);
    const [studySelection, setStudySelection] = useState({ right: 'Ogbe', left: 'Ogbe' });
    const [showOpeningRitual, setShowOpeningRitual] = useState(false);
    const [showClosingRitual, setShowClosingRitual] = useState(false);
    const [showIboRitual, setShowIboRitual] = useState(false);
    const [iboResult, setIboResult] = useState<IreOsogboType | null>(null);
    const [showPreparation, setShowPreparation] = useState(false);
    const [pendingMethod, setPendingMethod] = useState<DivinationMethod | null>(null);
    const [chatInitialQuery, setChatInitialQuery] = useState("");


    const [homeSearch, setHomeSearch] = useState('');
    const [dailyWisdom, setDailyWisdom] = useState(PROVERBS[0]);
    const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [virtualRoomData, setVirtualRoomData] = useState<{ mode: 'babalawo' | 'consulente', room: string }>({ mode: 'babalawo', room: 'SalaIfaOluwo' });

    const [showPaywall, setShowPaywall] = useState(false);
    const [blockedFeature, setBlockedFeature] = useState('');

    const viewRef = useRef<AppView>('home');

    // HISTORY API - For Android Back Button/Gesture
    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            if (e.state && e.state.view) {
                setView(e.state.view);
            } else {
                setView('home');
            }
        };
        window.addEventListener('popstate', handlePopState);

        // Initial state
        if (!window.history.state) {
            window.history.replaceState({ view: 'home' }, '', '');
        }

        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    // Push to history when view changes
    useEffect(() => {
        if (window.history.state?.view !== view) {
            window.history.pushState({ view }, '', '');
        }
        viewRef.current = view;
    }, [view]);

    // Close language menu on outside click
    useEffect(() => {
      if (!isLangMenuOpen) return;
      const handler = () => setIsLangMenuOpen(false);
      document.addEventListener('click', handler, { once: true });
      return () => document.removeEventListener('click', handler);
    }, [isLangMenuOpen]);

    // SWIPE LOGIC - Refined for Android system gestures
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

            // Only trigger if vertical movement is minimal and horizontal is significant
            if (Math.abs(deltaX) > 80 && Math.abs(deltaY) < 50) {
                // Swipe Left-to-Right (Back)
                if (deltaX > 0 && viewRef.current !== 'home') {
                    // Se o sistema já cuidou do popstate pelo gesto lateral do Android, 
                    // não precisamos forçar aqui, mas para garantir compatibilidade:
                    if (viewRef.current === 'result') {
                        if (confirm("Deseja sair da leitura e voltar ao início?")) setView('home');
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
        setDailyWisdom(PROVERBS[0]);

        // Handle URL Parameters for Virtual Room
        const params = new URLSearchParams(window.location.search);
        const viewParam = params.get('view');
        const modeParam = params.get('mode') as 'babalawo' | 'consulente';
        const roomParam = params.get('room');

        if (viewParam === 'virtual_room' && modeParam && roomParam) {
            setVirtualRoomData({ mode: modeParam, room: roomParam });
            setView('virtual_room');
        }
        const handleLegalEvent = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (detail === 'terms' || detail === 'privacy') setLegalModalType(detail);
        };
        window.addEventListener('open-legal', handleLegalEvent);
        return () => window.removeEventListener('open-legal', handleLegalEvent);
    }, []);

    const requireAuth = (action: () => void) => {
        if (!user) { setShowLoginModal(true); return; }
        action();
    };

    const isPro = (plan?: string) => plan === 'pro_monthly' || plan === 'pro_annual';

    const handleProFeature = (featureName: string, action: () => void) => {
        if (!user) { setShowLoginModal(true); return; }
        if (!isPro(userProfile?.plan)) {
            setBlockedFeature(featureName);
            setShowPaywall(true);
        } else {
            action();
        }
    };
    const handleSubscribe = () => { setShowPaywall(false); };

    const handleChangeLanguage = (lang: Language) => {
      setLanguage(lang);
      setIsLangMenuOpen(false);
      try { localStorage.setItem('ifa_language', lang); } catch {}
    };

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
        setPendingMethod(method);
        setShowPreparation(true);
    };

    const handlePreparationComplete = (opeleResult?: OpeleState) => {
        if (opeleResult) setOpele(opeleResult); // Ikin: auto-sets the Odù from throw results
        setDivinationMethod(pendingMethod);
        setPendingMethod(null);
        setShowPreparation(false);
    };

    const renderBoard = () => {
        if (divinationMethod === 'merindilogun') {
            return (<div className="w-full flex justify-center py-4"><MerindilogunBoard cowries={cowries} onToggle={toggleCowrie} /></div>);
        }
        if (divinationMethod === 'opon' || divinationMethod === 'ikin') {
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
    const onOpeningRitualComplete = () => { setShowOpeningRitual(false); setDivinationMethod(null); setShowIboRitual(true); };
    const handleIboComplete = (result: IreOsogboType) => { setIboResult(result); setShowIboRitual(false); setView('input'); };
    const handleStudyStart = () => {
        if (!user) {
            if (!canUseFeature('study')) {
                setBlockedFeature(t.btnStudy);
                setShowPaywall(true);
                return;
            }
            setClient({ id: 'study', fullName: 'Estudo Individual', dateOfBirth: 'N/A',
                mothersName: 'N/A', address: 'N/A', consultationTime: new Date().toLocaleString(),
                profession: 'Estudante', maritalStatus: 'N/A', phone: 'N/A', email: 'N/A' });
            setDivinationMethod(null); setShowQuickStudyModal(false); setView('input');
            return;
        }
        if (userProfile?.plan === 'free' && (userProfile.studyCount || 0) >= 3) {
            setBlockedFeature(t.btnStudy);
            setShowPaywall(true);
            return;
        }
        setClient({ id: 'study', fullName: 'Estudo Individual', dateOfBirth: 'N/A', mothersName: 'N/A', address: 'N/A', consultationTime: new Date().toLocaleString(), profession: 'Estudante', maritalStatus: 'N/A', phone: 'N/A', email: 'N/A' });
        setDivinationMethod(null); setShowQuickStudyModal(false); setView('input');
    };

    const handleInterpret = async (oduToInterpret = currentOdu) => {
        setLoading({ isLoading: true, message: t.interpreting });
        try {
            const result = await fetchInterpretation(oduToInterpret, language, iboResult ?? undefined);
            setInterpretation(result);
            if (!user) {
                if (client?.id === 'study') incrementAnonUsage('study');
                else incrementAnonUsage('consultation');
            } else if (client?.id === 'study') {
                updateUsageCounters('study');
            } else {
                updateUsageCounters('consultation');
            }
            setView('result');
        } catch (e: any) {
            alert(`Erro na leitura. Verifique sua conexão. Detalhe: ${e.message}`);
        } finally {
            setLoading({ isLoading: false });
        }
    };

    const startNewSession = () => {
        if (!user) {
            if (!canUseFeature('consultation')) {
                setBlockedFeature(t.btnConsultation);
                setShowPaywall(true);
                return;
            }
            setClient({
                id: 'anon', fullName: 'Visitante', dateOfBirth: '',
                mothersName: '', address: '', consultationTime: new Date().toLocaleString(),
                profession: '', maritalStatus: '', phone: '', email: ''
            });
            setDivinationMethod(null); setView('input');
            return;
        }
        if (userProfile?.plan === 'student_monthly') {
            setBlockedFeature(t.btnConsultation);
            setShowPaywall(true);
            return;
        }
        if (userProfile?.plan === 'free' && (userProfile.consultationCount || 0) >= 3) {
            setBlockedFeature(t.btnConsultation);
            setShowPaywall(true);
            return;
        }
        setClient(null); setInterpretation(null); setOpele(INITIAL_OPELE); setCowries(INITIAL_COWRIES);
        setDivinationMethod(null); setShowQuickStudyModal(false); setActiveRecord(null); setView('register');
    }

    const handleEndSession = (finalSelections: SelectionMap, notes: string) => {
        if (client && interpretation) {
            const record: ConsultationRecord = {
                id: crypto.randomUUID(), client: client, odu: currentOdu, interpretation: interpretation,
                selections: finalSelections, timestamp: new Date().toLocaleString(), language: language, notes: notes, status: 'pending'
            };
            saveConsultation(record); setActiveRecord(record);
            // Navegação para impressão agora é controlada pelo PrintCenter inline (InterpretationView)
        }
    }

    const GlassCard = ({ onClick, label, icon: Icon, variant = 'mini', feature, className = '' }: any) => {
        if (homeSearch && !label.toLowerCase().includes(homeSearch.toLowerCase())) return null;
        const variantClass = variant === 'hero' ? 'glass-gold' : variant === 'green' ? 'glass-green' : variant === 'blue' ? 'glass-blue' : variant === 'terra' ? 'glass-terra' : 'glass-mini';
        const handleClick = () => { setHomeSearch(''); feature ? handleProFeature(feature, onClick) : onClick(); };
        return (
            <button onClick={handleClick} className={`${variant === 'mini' ? 'glass-mini' : 'glass-card ' + variantClass} rounded-2xl flex flex-col items-center justify-center gap-3 ${variant === 'hero' ? 'p-8 md:p-12' : variant === 'mini' ? 'p-5 min-h-[100px]' : 'p-6 min-h-[80px]'} text-white cursor-pointer hover:-translate-y-0.5 transition-all duration-300 ${className}`}>
                {Icon && <Icon size={variant === 'hero' ? 32 : variant === 'mini' ? 20 : 24} className="shrink-0 drop-shadow-md opacity-90" />}
                <span className={`${variant === 'hero' ? 'font-serif text-lg md:text-2xl tracking-wider' : variant === 'mini' ? 'text-[10px] uppercase tracking-widest font-medium opacity-80' : 'text-xs uppercase tracking-widest font-medium'} drop-shadow-md`}>{label}</span>
            </button>
        );
    };

    const renderHome = () => (
        <div className="min-h-screen flex flex-col md:flex-row relative z-[1]">
            {/* ===== SIDEBAR ===== */}
            <aside className="glass-sidebar w-full md:w-[260px] shrink-0 p-5 flex flex-col gap-4 md:h-screen md:sticky md:top-0 md:overflow-y-auto z-10 scrollbar-hide">
                {/* Logo */}
                <div className="flex items-center gap-3 md:flex-col md:items-start mb-2 mt-2">
                    <img src="/logo.png" alt="Ifá Oluwo" className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-[0_0_20px_rgba(232,200,74,0.3)]" />
                    <div>
                        <h1 className="font-serif font-black text-ifa-gold tracking-widest uppercase leading-none text-lg md:text-xl" style={{textShadow: '0 0 30px rgba(232,200,74,0.3)'}}>IFÁ OLUWO</h1>
                        <span className="text-[9px] tracking-[3px] text-ifa-neutral/60 uppercase mt-0.5 block">{t.homeSubtitle}</span>
                    </div>
                </div>

                {/* Mobile top controls */}
                <div className="flex md:hidden items-center gap-2">
                    {!user && (
                        <button onClick={() => setShowLoginModal(true)} className="glass-btn text-ifa-gold text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                            <span>{t.btnLogin}</span>
                        </button>
                    )}
                    <button onClick={() => setShowSettings(true)} className="glass-btn text-ifa-neutral px-2.5 py-1.5 rounded-lg"><Settings size={14} /></button>
                    <div className="relative">
                        <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="glass-btn text-ifa-neutral text-xs font-bold px-2.5 py-1.5 rounded-lg">{language}</button>
                        {isLangMenuOpen && (
                            <div className="absolute right-0 top-full mt-1 bg-[#0a0608]/95 backdrop-blur-xl border border-ifa-gold/30 rounded-xl shadow-2xl z-50 overflow-hidden min-w-[150px]">
                                {(['pt-BR', 'pt-PT', 'en', 'es', 'yo'] as Language[]).map(l => (
                                    <button key={l} onClick={() => handleChangeLanguage(l)} className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-ifa-gold/15 transition-colors ${l === language ? 'text-ifa-gold' : 'text-ifa-neutral'}`}>
                                        {l === 'pt-BR' ? t.langPtBr : l === 'pt-PT' ? t.langPtPt : l === 'en' ? t.langEn : l === 'es' ? t.langEs : t.langYo}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Calendar */}
                {!homeSearch && (
                    <div className="glass-card rounded-xl overflow-hidden">
                        <YorubaCalendarWidget onOpenIgbadu={() => handleProFeature('Igbadu Virtual', () => setView('igbadu'))} />
                    </div>
                )}

                {/* Compass */}
                {!homeSearch && (
                    <div className="glass-green rounded-xl overflow-hidden glass-card">
                        <IleIfeCompass />
                    </div>
                )}

                {/* Search */}
                <div className="relative">
                    <input value={homeSearch} onChange={(e) => setHomeSearch(e.target.value)} placeholder={t.searchPlaceholder} className="glass-mini w-full rounded-xl py-2.5 pl-9 pr-3 text-xs text-ifa-text placeholder-ifa-neutral/40 outline-none focus:border-ifa-gold/30 transition-colors" style={{border: '0.5px solid rgba(255,255,255,0.06)'}} />
                    <Search className="absolute left-3 top-2.5 text-ifa-neutral/40" size={14} />
                    {homeSearch && <button onClick={() => setHomeSearch('')} className="absolute right-3 top-2.5 text-ifa-neutral/40 hover:text-white"><X size={12} /></button>}
                </div>

                {/* Visitor CTA */}
                {!user && !homeSearch && (
                    <div className="glass-card rounded-xl p-4 text-xs text-ifa-neutral/80 space-y-2">
                        <span className="text-ifa-gold font-bold text-sm">{t.visitorTitle}</span>
                        <p>{t.visitorFree.replace('{consults}', getAnonRemaining('consultation').toString()).replace('{studies}', getAnonRemaining('study').toString())}</p>
                        <div className="flex gap-2 pt-1">
                            <button onClick={() => setShowLoginModal(true)} className="glass-btn text-ifa-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">{t.visitorRegister}</button>
                            <button onClick={() => { setBlockedFeature(''); setShowPaywall(true); }} className="glass-btn text-ifa-green text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">{t.visitorSubscribe}</button>
                        </div>
                    </div>
                )}
            </aside>

            {/* ===== MAIN AREA ===== */}
            <div className="flex-1 flex flex-col min-h-0">
                {/* Topbar */}
                <div className="glass-topbar hidden md:flex items-center justify-end gap-2 px-6 py-3">
                    {!user && (
                        <button onClick={() => setShowLoginModal(true)} className="glass-btn text-ifa-gold text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg flex items-center gap-2">
                            <span>{t.btnLoginRegister}</span>
                        </button>
                    )}
                    {userProfile?.role === 'admin' && (
                        <button onClick={() => setView('admin_panel')} className="glass-btn text-red-400 text-xs font-bold uppercase tracking-wider px-3 py-2 rounded-lg flex items-center gap-1.5 bg-red-500/5">
                            <Shield size={14} /> <span>{t.btnAdmin}</span>
                        </button>
                    )}
                    <button onClick={() => setShowSettings(true)} className="glass-btn text-ifa-neutral p-2 rounded-lg"><Settings size={16} /></button>
                    <div className="relative">
                        <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="glass-btn text-ifa-neutral text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-lg">{language}</button>
                        {isLangMenuOpen && (
                            <div className="absolute right-0 top-full mt-1 bg-[#0a0608]/95 backdrop-blur-xl border border-ifa-gold/30 rounded-xl shadow-2xl z-50 overflow-hidden min-w-[150px]">
                                {(['pt-BR', 'pt-PT', 'en', 'es', 'yo'] as Language[]).map(l => (
                                    <button key={l} onClick={() => handleChangeLanguage(l)} className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-ifa-gold/15 transition-colors ${l === language ? 'text-ifa-gold' : 'text-ifa-neutral'}`}>
                                        {l === 'pt-BR' ? t.langPtBr : l === 'pt-PT' ? t.langPtPt : l === 'en' ? t.langEn : l === 'es' ? t.langEs : t.langYo}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 md:p-8 overflow-y-auto scrollbar-hide">
                    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
                        {/* Hero Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <GlassCard onClick={startNewSession} label={t.btnConsultation} icon={Users} variant="hero" />
                            <GlassCard onClick={handleStudyStart} label={t.btnStudy} icon={GraduationCap} variant="green" />
                        </div>

                        {/* Medium Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <GlassCard onClick={() => setView('virtual_room')} label={t.menuVirtualRoom} icon={Video} variant="blue" feature={t.featureVirtualRoom} />
                            <GlassCard onClick={() => setView('oracle_hub')} label={t.menuOracleHub} icon={CircleDot} variant="terra" feature={t.featureAdvancedOracles} />
                        </div>

                        {/* Conhecimento */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-ifa-gold/30 to-transparent"></div>
                                <span className="section-label">{t.sectionKnowledge}</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-ifa-gold/30 to-transparent"></div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <GlassCard onClick={() => setView('odu_library')} label={t.menuOduLibrary} icon={Book} />
                                <GlassCard onClick={() => setView('treatise')} label={t.menuTreatise} icon={BookOpen} feature={t.featureTreatise} />
                                <GlassCard onClick={() => setView('prayers')} label={t.menuPrayers} icon={Book} feature={t.featurePrayers} />
                                <GlassCard onClick={() => setView('amutorunwa')} label={t.menuYorubaNames} icon={Baby} />
                                <GlassCard onClick={() => setView('dictionary')} label={t.menuDictionary} icon={Book} />
                                <GlassCard onClick={() => setView('story_mode')} label={t.menuRPG} icon={Gamepad2} feature={t.featureRPG} />
                            </div>
                        </div>

                        {/* Esotérico */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-purple-500/30 to-transparent"></div>
                                <span className="section-label">{t.sectionEsoteric}</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-purple-500/30 to-transparent"></div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <button onClick={() => { setHomeSearch(''); handleProFeature(t.featureVoiceCommand, () => setView('voice_commander')); }} className="md:col-span-2 glass-card glass-gold rounded-2xl p-5 min-h-[80px] flex items-center justify-center gap-3 text-white hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
                                    <Mic size={24} className="shrink-0 drop-shadow-md opacity-90" />
                                    <span className="text-xs uppercase tracking-widest font-medium drop-shadow-md">{t.menuVoiceThunder}</span>
                                </button>
                                <GlassCard onClick={() => setView('esoteric_hub')} label={t.menuEsotericTools} icon={Sparkles} feature={t.featureEsotericTools} />
                                <GlassCard onClick={() => setView('ebori')} label={t.menuBori} icon={UserCheck} feature={t.featureBori} />
                                <GlassCard onClick={() => setView('reverse_odu')} label={t.menuReverseMath} icon={Database} feature={t.featureReverseMath} />
                                <GlassCard onClick={() => setView('ebo_sim')} label={t.menuEboSim} icon={Move} feature={t.featureEboSim} />
                                <GlassCard onClick={() => setView('sound_hub')} label={t.menuSacredSounds} icon={Music} feature={t.featureSacredSounds} />
                                <GlassCard onClick={() => setView('dream_journal')} label={t.menuDreamJournal} icon={Moon} />
                            </div>
                        </div>

                        {/* Magia */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-red-500/30 to-transparent"></div>
                                <span className="section-label">{t.sectionMagic}</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-red-500/30 to-transparent"></div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <GlassCard onClick={() => setView('sango_wheel')} label={t.menuSangoWheel} icon={Scale} feature={t.featureSangoWheel} />
                                <GlassCard onClick={() => setView('oogun')} label={t.menuOogun} icon={FlaskConical} feature={t.featureOogun} />
                                <GlassCard onClick={() => setView('herb_id')} label={t.menuHerbID} icon={Leaf} feature={t.featureHerbID} />
                                <GlassCard onClick={() => setView('assentamentos')} label={t.menuAssentamentos} icon={Hammer} feature={t.featureAssentamentos} />
                                <GlassCard onClick={() => setView('geo_herbs')} label={t.menuHerbMap} icon={MapPin} feature={t.featureHerbMap} />
                                <GlassCard onClick={() => setView('ajogun')} label={t.menuAjogun} icon={Stethoscope} feature={t.featureAjogun} />
                            </div>
                        </div>

                        {/* Gestão */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-px flex-1 bg-gradient-to-r from-blue-500/30 to-transparent"></div>
                                <span className="section-label">{t.sectionManagement}</span>
                                <div className="h-px flex-1 bg-gradient-to-l from-blue-500/30 to-transparent"></div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <GlassCard onClick={() => setView('inventory_hub')} label={t.menuInventory} icon={Package} feature={t.featureInventory} />
                                <GlassCard onClick={() => setView('agenda')} label={t.menuAgenda} icon={CalendarDays} />
                                <GlassCard onClick={() => setView('lineage_tree')} label={t.menuLineage} icon={GitBranch} feature={t.featureLineage} />
                                <GlassCard onClick={() => setView('analytics')} label={t.menuAnalytics} icon={BarChart3} feature={t.featureAnalytics} />
                            </div>
                        </div>

                        {/* Footer button */}
                        <div className="pt-4">
                            <GlassCard onClick={() => setView('manual')} label={t.menuManual} icon={BookOpen} variant="terra" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

    if (authLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-ifa-gold"><Loader2 className="animate-spin" size={48} /></div>;
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

                {view === 'virtual_room' && <VirtualRoom mode={virtualRoomData.mode} roomName={virtualRoomData.room} onBack={() => setView('home')} />}

                {view === 'mandala' && <OduMandala odu={currentOdu} onBack={() => setView('result')} />}
                {view === 'history' && <ConsultationHistory onBack={() => setView('home')} onView={(r) => { setActiveRecord(r); setView('print'); }} />}
                {view === 'register' && <div className="min-h-screen flex items-center justify-center p-4"><ClientRegistration onRegister={handleRegister} onCancel={() => setView('home')} /></div>}
                {view === 'study' && <StudyMode onBack={() => setView('home')} />}
                {view === 'odu_library' && <OduLibraryTable onBack={() => setView('home')} />}
                {view === 'admin_panel' && <AdminPanel onBack={() => setView('home')} />}
            </div>

            {showLoginModal && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center" onClick={() => setShowLoginModal(false)}>
                    <div className="relative" onClick={e => e.stopPropagation()}>
                        <LoginScreen onSuccess={() => setShowLoginModal(false)} />
                    </div>
                </div>
            )}
            <SubscriptionModal isOpen={showPaywall} onClose={() => setShowPaywall(false)} onSubscribe={handleSubscribe} featureName={blockedFeature} />
            <LegalModal type={legalModalType} onClose={() => setLegalModalType(null)} />
            <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

            {showOpeningRitual && <IbaDigital mode="opening" onComplete={onOpeningRitualComplete} onCancel={() => setShowOpeningRitual(false)} />}
            {showClosingRitual && <IbaDigital mode="closing" onComplete={() => { setShowClosingRitual(false); setView('print'); }} onCancel={() => setShowClosingRitual(false)} />}
            {showIboRitual && <IboRitual onComplete={handleIboComplete} onCancel={() => { setShowIboRitual(false); setView('input'); }} />}

            {view === 'input' && !loading.isLoading && (
                <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 w-full">
                    <header className="text-center mb-6">
                        <h2 className="text-ifa-neutral uppercase tracking-widest text-sm mb-2">{client?.id === 'study' ? t.btnStudy : t.btnConsultation}</h2>
                        <h1 className="text-3xl font-serif font-bold text-ifa-text">{client?.fullName || '...'}</h1>
                    </header>

                    {!divinationMethod ? (
                        <div className="w-full max-w-2xl animate-fade-in">
                            <p className="text-center text-ifa-neutral text-[10px] uppercase tracking-widest mb-5">{t.oracleTitle}</p>
                            <div className="grid grid-cols-2 gap-4">

                                <button onClick={() => handleMethodSelection('opele')} className="bg-ifa-base border-2 border-ifa-border rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:border-ifa-gold hover:bg-ifa-surface transition-all group">
                                    <div className="w-16 h-16 rounded-full bg-amber-900/40 border border-amber-600/30 flex items-center justify-center text-amber-400 group-hover:bg-ifa-gold group-hover:text-black transition-all"><GripHorizontal size={30} /></div>
                                    <span className="font-bold font-serif uppercase text-ifa-text tracking-wide">{t.oracleOpele}</span>
                                    <span className="text-[10px] text-ifa-gold tracking-widest uppercase">{t.oracleOpeleSub}</span>
                                    <span className="text-[10px] text-ifa-neutral">{t.oracleOpeleDesc}</span>
                                </button>

                                <button onClick={() => handleMethodSelection('opon')} className="bg-ifa-base border-2 border-ifa-border rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:border-ifa-gold hover:bg-ifa-surface transition-all group">
                                    <div className="w-16 h-16 rounded-full bg-yellow-900/40 border border-yellow-600/30 flex items-center justify-center text-yellow-400 group-hover:bg-ifa-gold group-hover:text-black transition-all"><CircleDot size={30} /></div>
                                    <span className="font-bold font-serif uppercase text-ifa-text tracking-wide">{t.oracleOpon}</span>
                                    <span className="text-[10px] text-ifa-gold tracking-widest uppercase">{t.oracleOponSub}</span>
                                    <span className="text-[10px] text-ifa-neutral">{t.oracleOponDesc}</span>
                                </button>

                                <button onClick={() => handleMethodSelection('ikin')} className="bg-ifa-base border-2 border-ifa-gold/40 rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:border-ifa-gold hover:bg-ifa-surface transition-all group relative overflow-hidden">
                                    <div className="absolute top-2 right-2 bg-ifa-gold/20 text-ifa-gold text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{t.badgeSacerdotal}</div>
                                    <div className="w-16 h-16 rounded-full bg-orange-900/40 border border-orange-500/40 flex items-center justify-center text-orange-400 group-hover:bg-ifa-gold group-hover:text-black transition-all"><Stars size={30} /></div>
                                    <span className="font-bold font-serif uppercase text-ifa-text tracking-wide">{t.oracleIkin}</span>
                                    <span className="text-[10px] text-ifa-gold tracking-widest uppercase">{t.oracleIkinSub}</span>
                                    <span className="text-[10px] text-ifa-neutral">{t.oracleIkinDesc}</span>
                                </button>

                                <button onClick={() => handleMethodSelection('merindilogun')} className="bg-ifa-base border-2 border-ifa-border rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:border-ifa-gold hover:bg-ifa-surface transition-all group">
                                    <div className="w-16 h-16 rounded-full bg-rose-900/40 border border-rose-600/30 flex items-center justify-center text-rose-400 group-hover:bg-ifa-gold group-hover:text-black transition-all"><Move size={30} /></div>
                                    <span className="font-bold font-serif uppercase text-ifa-text tracking-wide">{t.oracleMerindilogun}</span>
                                    <span className="text-[10px] text-ifa-gold tracking-widest uppercase">{t.oracleMerindilogunSub}</span>
                                    <span className="text-[10px] text-ifa-neutral">{t.oracleMerindilogunDesc}</span>
                                </button>

                            </div>
                        </div>
                    ) : (
                        <div className="animate-fade-in w-full flex flex-col items-center">
                            <button onClick={() => setDivinationMethod(null)} className="mb-4 text-xs font-bold uppercase text-ifa-neutral hover:text-ifa-gold flex items-center gap-2"><ArrowLeft size={14} /> {t.oracleChangeMethod}</button>
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
                        <h2 className="text-2xl font-serif text-ifa-gold mb-2 text-center">{t.studySelectOdu}</h2>
                        {/* Selectores Simplificados para Odu Manual */}
                        <div className="flex flex-col gap-4 mt-4">
                            <select value={studySelection.right} onChange={(e) => setStudySelection({ ...studySelection, right: e.target.value })} className="bg-ifa-base-dark p-3 rounded border text-white">{(Object.values(SIGN_NAMES) as string[]).sort().map(n => <option key={n} value={n}>{n}</option>)}</select>
                            <select value={studySelection.left} onChange={(e) => setStudySelection({ ...studySelection, left: e.target.value })} className="bg-ifa-base-dark p-3 rounded border text-white">{(Object.values(SIGN_NAMES) as string[]).sort().map(n => <option key={n} value={n}>{n}</option>)}</select>
                            <button onClick={() => {
                                const r = valueToLeg(NAME_TO_VALUE[studySelection.right]);
                                const l = valueToLeg(NAME_TO_VALUE[studySelection.left]);
                                setOpele({ rightLeg: r, leftLeg: l });
                                setShowQuickStudyModal(false);
                            }} className="bg-ifa-gold text-black p-3 rounded font-bold">{t.studyConfirm}</button>
                        </div>
                    </div>
                </div>
            )}

            {showPreparation && pendingMethod && (
                <OraclePreparation
                    method={pendingMethod as 'opele' | 'opon' | 'ikin' | 'merindilogun'}
                    onComplete={handlePreparationComplete}
                    onBack={() => { setShowPreparation(false); setPendingMethod(null); }}
                />
            )}

            <CookieConsentBanner />
            <AIAssistant lang={language} />
        </div>
    );
}

export default App;
