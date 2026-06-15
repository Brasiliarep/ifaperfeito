
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
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

    const toggleCowrie = useCallback((index: number) => {
        setCowries(prev => {
            const newCowries = [...prev];
            newCowries[index] = newCowries[index] === 'open' ? 'closed' : 'open';
            return newCowries;
        });
    }, []);

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
                        {opele.rightLeg.map((state, idx) => (<OpeleSeed key={`r-${idx}`} position={idx} state={state} onClick={() => toggleSeed('right', idx)} isAnimating={true} />))}
                    </div>
                    <div className="flex flex-col items-center gap-4 z-10">
                        <h3 className="text-ifa-gold text-sm uppercase tracking-widest mb-2 font-bold">{t.leftLeg}</h3>
                        {opele.leftLeg.map((state, idx) => (<OpeleSeed key={`l-${idx}`} position={idx} state={state} onClick={() => toggleSeed('left', idx)} isAnimating={true} />))}
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

    const Orb = ({ size = 38 }: { size?: number }) => (
        <div className="shrink-0 flex items-center justify-center" style={{
            width: size, height: size, borderRadius: 11,
            background: 'rgba(180,125,15,0.22)',
            border: '0.5px solid rgba(210,165,40,0.4)',
            boxShadow: '0 0 20px rgba(180,125,15,0.25), inset 0 1px 0 rgba(255,220,80,0.15)',
        }}>
            <svg width={size * 0.5} height={size * 0.55} viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8 2 4 6 4 10c0 4 2 7 4 9l4 7 4-7c2-2 4-5 4-9 0-4-4-8-8-8z" fill="#e2b84a" opacity="0.7"/>
                <circle cx="12" cy="9" r="3.5" fill="#e2b84a" opacity="0.85"/>
                <path d="M12 14v13" stroke="#e2b84a" strokeWidth="1.5" opacity="0.5"/>
            </svg>
        </div>
    );

    const THEME_MAP: Record<string, { color: string; rgb: string }> = {
        gold: { color: '#e2b84a', rgb: '210,165,40' },
        blue: { color: '#4a90d9', rgb: '74,144,217' },
        wine: { color: '#b04a8a', rgb: '176,74,138' },
        white: { color: 'rgba(255,255,255,0.5)', rgb: '255,255,255' },
        purple: { color: '#9b6dd4', rgb: '155,109,212' },
        green: { color: '#4ab87a', rgb: '74,184,122' },
        red: { color: '#d44a4a', rgb: '212,74,74' },
        acqua: { color: '#4ab8d4', rgb: '74,184,212' },
        orange: { color: '#d47a4a', rgb: '212,122,74' },
        lime: { color: '#7ab84a', rgb: '122,184,74' },
        sapphire: { color: '#4a8ad4', rgb: '74,138,212' },
    };

    const GlassCard = ({ onClick, label, icon: Icon, variant = 'mini', feature, className = '', subtitle, theme }: any) => {
        if (homeSearch && !label.toLowerCase().includes(homeSearch.toLowerCase())) return null;
        const variantMap: Record<string, string> = { hero: 'glass-hero-gold', green: 'glass-hero-green', blue: 'glass-blue', terra: 'glass-terra', purple: 'glass-purple' };
        const vClass = variantMap[variant] || 'glass-mini';
        const isHero = variant === 'hero' || variant === 'green';
        const isMedium = variant === 'blue' || variant === 'terra' || variant === 'purple';
        const isNavCard = !isHero && !isMedium;
        const themeColor = theme ? THEME_MAP[theme] : null;
        const handleClick = () => { setHomeSearch(''); feature ? handleProFeature(feature, onClick) : onClick(); };
        const iconSize = isHero ? 20 : isMedium ? 18 : 17;
        const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (!isHero) return;
            const r = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
            const y = ((e.clientY - r.top) / r.height * 100).toFixed(1);
            e.currentTarget.style.setProperty('--mx', x + '%');
            e.currentTarget.style.setProperty('--my', y + '%');
        };
        return (
            <button onClick={handleClick} onMouseMove={isHero ? handleMouseMove : undefined}
                className={`${isHero || isMedium ? 'glass-card ' + vClass : 'glass-mini'} ${isHero ? 'hero-btn' : ''} ${isNavCard ? 'nav-card' : ''} flex ${isHero ? 'flex-row items-center gap-3 px-4' : 'flex-col items-center justify-center gap-2'} ${isHero ? 'min-h-[82px]' : isMedium ? 'h-[60px] p-4' : 'p-3.5 min-h-[92px]'} text-white cursor-pointer ${className}`}
                style={themeColor ? { '--cor-tema': themeColor.color, '--cor-tema-rgb': themeColor.rgb } as any : {}}>
                {isHero ? (
                    <div className="shrink-0 flex items-center justify-center" style={{ width: 46, height: 46, borderRadius: 13, background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
                        <Icon size={iconSize} className={`drop-shadow-md ${isNavCard ? 'nav-icon' : ''}`} style={{ opacity: 0.9 }} />
                    </div>
                ) : (
                    Icon && <Icon size={iconSize} className={`shrink-0 drop-shadow-md opacity-80 ${isNavCard ? 'nav-icon' : ''}`} />
                )}
                <div className={`flex flex-col ${isHero ? 'items-start flex-1 min-w-0' : 'items-center'}`}>
                    <span className={`${isHero ? `font-serif tracking-[0.8px] drop-shadow-md` : 'text-[9px] uppercase tracking-widest font-medium opacity-80'} drop-shadow-md`}
                        style={isHero ? { fontSize: 12.5, fontWeight: 600, color: variant === 'hero' ? '#f0d060' : 'rgba(80,220,140,0.9)' } : {}}>
                        {label}
                    </span>
                    {subtitle && <span className="text-[9.5px] tracking-[2px] uppercase" style={{ opacity: 0.45, color: variant === 'hero' ? '#e2b84a' : '#2db87a' }}>{subtitle}</span>}
                </div>
            </button>
        );
    };

    const renderHome = () => (
        <div className="min-h-screen flex flex-col relative z-[1]">
            {/* ===== TOPBAR ===== */}
            <div className="glass-topbar flex items-center justify-between px-4 md:px-6 py-2.5 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                    <Orb />
                    <div className="leading-tight">
                        <h1 className="font-serif tracking-[3px] uppercase" style={{ fontSize: 17, fontWeight: 700, color: '#e2b84a', textShadow: '0 0 28px rgba(210,165,40,0.45)' }}>IFÁ OLUWO</h1>
                        <span className="block uppercase tracking-[3.5px]" style={{ fontSize: 8.5, color: 'rgba(210,165,40,0.38)' }}>{t.homeSubtitle}</span>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-2" style={{ fontSize: 10, letterSpacing: '1.5px', color: 'rgba(210,165,40,0.32)' }}>
                    <span>+50.000 sacerdotes</span>
                    <span style={{ color: 'rgba(210,165,40,0.15)' }}>·</span>
                    <span>256 Odu catalogados</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                    {!user && (
                        <button onClick={() => setShowLoginModal(true)} className="glass-btn hidden md:flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: '#e2b84a' }}>
                            {t.btnLoginRegister}
                        </button>
                    )}
                    {userProfile?.role === 'admin' && (
                        <button onClick={() => setView('admin_panel')} className="glass-btn flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ background: 'rgba(200,40,40,0.12)', borderColor: 'rgba(200,40,40,0.3)', color: 'rgba(240,100,100,0.85)' }}>
                            <Shield size={12} /> <span className="hidden md:inline">{t.btnAdmin}</span>
                        </button>
                    )}
                    <button onClick={() => setShowSettings(true)} className="glass-btn p-1.5 md:p-2" style={{ color: 'var(--text-mid)' }}><Settings size={14} /></button>
                    <div className="relative">
                        <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="glass-btn px-2 py-1.5 md:px-3 md:py-2 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-mid)' }}>{language}</button>
                        {isLangMenuOpen && (
                            <div className="absolute right-0 top-full mt-1 z-50 overflow-hidden min-w-[150px] rounded-xl border" style={{ background: '#09060c', borderColor: 'rgba(210,165,40,0.3)', boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}>
                                {(['pt-BR', 'pt-PT', 'en', 'es', 'yo'] as Language[]).map(l => (
                                    <button key={l} onClick={() => handleChangeLanguage(l)}
                                        className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${l === language ? 'text-[#e2b84a]' : ''}`}
                                        style={{ color: l === language ? '#e2b84a' : 'var(--text-mid)', background: l === language ? 'rgba(210,165,40,0.08)' : 'transparent' }}
                                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(210,165,40,0.1)')}
                                        onMouseLeave={e => (e.currentTarget.style.background = l === language ? 'rgba(210,165,40,0.08)' : 'transparent')}>
                                        {l === 'pt-BR' ? t.langPtBr : l === 'pt-PT' ? t.langPtPt : l === 'en' ? t.langEn : l === 'es' ? t.langEs : t.langYo}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== SIDEBAR + MAIN ===== */}
            <div className="flex flex-1 flex-col md:flex-row min-h-0">
                <aside className="glass-sidebar w-full md:w-[258px] shrink-0 p-4 md:p-5 flex flex-col gap-3.5 md:gap-4 md:h-[calc(100vh-var(--sat,0px))] md:sticky md:top-0 md:overflow-y-auto z-10 scrollbar-hide">
                    {/* Mobile controls */}
                    <div className="flex md:hidden items-center gap-2">
                        {!user && (
                            <button onClick={() => setShowLoginModal(true)} className="glass-btn px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: '#e2b84a' }}>{t.btnLogin}</button>
                        )}
                        <button onClick={() => setShowSettings(true)} className="glass-btn px-2 py-1.5" style={{ color: 'var(--text-mid)' }}><Settings size={13} /></button>
                        <div className="relative">
                            <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="glass-btn px-2 py-1.5 text-[10px] font-bold" style={{ color: 'var(--text-mid)' }}>{language}</button>
                            {isLangMenuOpen && (
                                <div className="absolute right-0 top-full mt-1 z-50 overflow-hidden min-w-[150px] rounded-xl border" style={{ background: '#09060c', borderColor: 'rgba(210,165,40,0.3)', boxShadow: '0 16px 48px rgba(0,0,0,0.5)' }}>
                                    {(['pt-BR', 'pt-PT', 'en', 'es', 'yo'] as Language[]).map(l => (
                                        <button key={l} onClick={() => handleChangeLanguage(l)}
                                            className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${l === language ? 'text-[#e2b84a]' : ''}`}
                                            style={{ color: l === language ? '#e2b84a' : 'var(--text-mid)', background: l === language ? 'rgba(210,165,40,0.08)' : 'transparent' }}
                                            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(210,165,40,0.1)')}
                                            onMouseLeave={e => (e.currentTarget.style.background = l === language ? 'rgba(210,165,40,0.08)' : 'transparent')}>
                                            {l === 'pt-BR' ? t.langPtBr : l === 'pt-PT' ? t.langPtPt : l === 'en' ? t.langEn : l === 'es' ? t.langEs : t.langYo}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Calendar */}
                    {!homeSearch && (
                        <div className="glass-card-no-clip rounded-xl overflow-hidden">
                            <YorubaCalendarWidget onOpenIgbadu={() => handleProFeature('Igbadu Virtual', () => setView('igbadu'))} />
                        </div>
                    )}

                    {/* Compass */}
                    {!homeSearch && (
                        <div className="glass-card-no-clip rounded-xl" style={{ background: 'rgba(20,80,45,0.12)', borderColor: 'rgba(30,150,80,0.2)' }}>
                            <IleIfeCompass />
                        </div>
                    )}

                    {/* Search */}
                    <div className="relative">
                        <input value={homeSearch} onChange={(e) => setHomeSearch(e.target.value)} placeholder={t.searchPlaceholder}
                            className="glass-mini w-full rounded-xl py-2.5 pl-9 pr-3 text-xs outline-none"
                            style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'var(--border-white)', color: 'var(--text-bright)' }} />
                        <Search className="absolute left-3 top-2.5" size={14} style={{ color: 'var(--text-muted)' }} />
                        {homeSearch && <button onClick={() => setHomeSearch('')} className="absolute right-3 top-2.5" style={{ color: 'var(--text-muted)' }}><X size={12} /></button>}
                    </div>

                    {/* Visitor CTA */}
                    {!user && !homeSearch && (
                        <div className="glass-card rounded-xl p-3.5 flex flex-col gap-2.5 mt-auto" style={{ background: 'rgba(210,165,40,0.06)', borderColor: 'rgba(210,165,40,0.18)' }}>
                            <div>
                                <span className="font-bold" style={{ fontSize: 11, color: '#e2b84a' }}>{t.visitorTitle}</span>
                                <p className="mt-1" style={{ fontSize: 10.5, lineHeight: '1.5', color: 'var(--text-mid)' }}>
                                    {t.visitorFree.replace('{consults}', getAnonRemaining('consultation').toString()).replace('{studies}', getAnonRemaining('study').toString())}
                                </p>
                            </div>
                            <button onClick={() => { setBlockedFeature(''); setShowPaywall(true); }}
                                className="w-full py-2 rounded-full text-center text-[10px] font-bold uppercase tracking-wider"
                                style={{ background: 'rgba(210,165,40,0.14)', border: '0.5px solid rgba(210,165,40,0.35)', color: '#e2b84a', letterSpacing: '1.5px' }}>
                                {t.visitorSubscribe} — ACESSO ILIMITADO
                            </button>
                        </div>
                    )}
                </aside>

                {/* Main */}
                <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1 p-4 md:p-8 overflow-y-auto scrollbar-hide">
                        <div className="max-w-6xl mx-auto space-y-5 md:space-y-7">
                            {/* Hero */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <GlassCard onClick={startNewSession} label={t.btnConsultation} icon={Users} variant="hero" subtitle="Modo Babalaô ativo" />
                                <GlassCard onClick={handleStudyStart} label={t.btnStudy} icon={GraduationCap} variant="green" subtitle="Aprendizado guiado" />
                            </div>

                            {/* Medium */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <GlassCard onClick={() => setView('virtual_room')} label={t.menuVirtualRoom} icon={Video} variant="blue" feature={t.featureVirtualRoom} />
                                <GlassCard onClick={() => setView('oracle_hub')} label={t.menuOracleHub} icon={CircleDot} variant="terra" feature={t.featureAdvancedOracles} />
                            </div>

                            {/* Conhecimento */}
                            <div>
                                <div className="section-label">
                                    <span>— {t.sectionKnowledge}</span>
                                    <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(210,165,40,0.3), transparent)' }}></div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3.5">
                                    <GlassCard onClick={() => setView('odu_library')} label={t.menuOduLibrary} icon={Book} className="glass-tint-gold" theme="gold" />
                                    <GlassCard onClick={() => setView('treatise')} label={t.menuTreatise} icon={BookOpen} feature={t.featureTreatise} className="glass-tint-gold" theme="gold" />
                                    <GlassCard onClick={() => setView('prayers')} label={t.menuPrayers} icon={Book} feature={t.featurePrayers} className="glass-tint-blue" theme="blue" />
                                    <GlassCard onClick={() => setView('amutorunwa')} label={t.menuYorubaNames} icon={Baby} className="glass-tint-wine" theme="wine" />
                                    <GlassCard onClick={() => setView('dictionary')} label={t.menuDictionary} icon={Book} className="glass-tint-neutral" theme="white" />
                                    <GlassCard onClick={() => setView('story_mode')} label={t.menuRPG} icon={Gamepad2} feature={t.featureRPG} className="glass-tint-neutral" />
                                </div>
                            </div>

                            {/* Esotérico */}
                            <div>
                                <div className="section-label">
                                    <span>— {t.sectionEsoteric}</span>
                                    <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(180,60,130,0.25), transparent)' }}></div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3.5">
                                    <button onClick={(e) => { const flash = document.createElement('div'); flash.style.cssText = 'position:fixed;inset:0;background:rgba(255,100,50,0.08);pointer-events:none;z-index:9999;animation:flash-trovao 0.3s ease forwards;'; document.body.appendChild(flash); setTimeout(() => flash.remove(), 300); setHomeSearch(''); handleProFeature(t.featureVoiceCommand, () => setView('voice_commander')); }}
                                        className="voz-trovao md:col-span-3 glass-card glass-hero-gold rounded-2xl h-[60px] flex items-center justify-center gap-3 px-5 text-white cursor-pointer">
                                        <Mic size={20} className="shrink-0 drop-shadow-md opacity-90" />
                                        <span className="text-xs uppercase tracking-widest font-medium drop-shadow-md">{t.menuVoiceThunder}</span>
                                    </button>
                                    <GlassCard onClick={() => setView('esoteric_hub')} label={t.menuEsotericTools} icon={Sparkles} variant="purple" feature={t.featureEsotericTools} theme="purple" />
                                    <GlassCard onClick={() => setView('ebori')} label={t.menuBori} icon={UserCheck} variant="purple" feature={t.featureBori} theme="green" />
                                    <GlassCard onClick={() => setView('reverse_odu')} label={t.menuReverseMath} icon={Database} variant="purple" feature={t.featureReverseMath} theme="red" />
                                    <GlassCard onClick={() => setView('ebo_sim')} label={t.menuEboSim} icon={Move} variant="purple" feature={t.featureEboSim} theme="green" />
                                    <GlassCard onClick={() => setView('sound_hub')} label={t.menuSacredSounds} icon={Music} variant="purple" feature={t.featureSacredSounds} theme="acqua" />
                                    <GlassCard onClick={() => setView('dream_journal')} label={t.menuDreamJournal} icon={Moon} variant="purple" />
                                </div>
                            </div>

                            {/* Magia */}
                            <div>
                                <div className="section-label">
                                    <span>— {t.sectionMagic}</span>
                                    <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(200,50,50,0.25), transparent)' }}></div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3.5">
                                    <GlassCard onClick={() => setView('sango_wheel')} label={t.menuSangoWheel} icon={Scale} feature={t.featureSangoWheel} theme="orange" />
                                    <GlassCard onClick={() => setView('oogun')} label={t.menuOogun} icon={FlaskConical} feature={t.featureOogun} theme="green" />
                                    <GlassCard onClick={() => setView('herb_id')} label={t.menuHerbID} icon={Leaf} feature={t.featureHerbID} theme="lime" />
                                    <GlassCard onClick={() => setView('assentamentos')} label={t.menuAssentamentos} icon={Hammer} feature={t.featureAssentamentos} theme="gold" />
                                    <GlassCard onClick={() => setView('geo_herbs')} label={t.menuHerbMap} icon={MapPin} feature={t.featureHerbMap} />
                                    <GlassCard onClick={() => setView('ajogun')} label={t.menuAjogun} icon={Stethoscope} feature={t.featureAjogun} theme="red" />
                                </div>
                            </div>

                            {/* Gestão */}
                            <div>
                                <div className="section-label">
                                    <span>— {t.sectionManagement}</span>
                                    <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(50,100,220,0.25), transparent)' }}></div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3.5">
                                    <GlassCard onClick={() => setView('inventory_hub')} label={t.menuInventory} icon={Package} feature={t.featureInventory} theme="gold" />
                                    <GlassCard onClick={() => setView('agenda')} label={t.menuAgenda} icon={CalendarDays} theme="sapphire" />
                                    <GlassCard onClick={() => setView('lineage_tree')} label={t.menuLineage} icon={GitBranch} feature={t.featureLineage} />
                                    <GlassCard onClick={() => setView('analytics')} label={t.menuAnalytics} icon={BarChart3} feature={t.featureAnalytics} />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button className="glass-btn flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-white)' }}>
                                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                    Instalar App
                                </button>
                                <button onClick={() => { setBlockedFeature(''); setShowPaywall(true); }}
                                    className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(170,120,15,0.92), rgba(210,160,25,0.82))',
                                        border: '1px solid rgba(240,195,55,0.45)',
                                        boxShadow: '0 4px 22px rgba(170,120,15,0.38), inset 0 1px 0 rgba(255,230,100,0.2)',
                                        color: '#1a0e00'
                                    }}>
                                    <span>💬</span> Assistente
                                </button>
                            </div>
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
                            <div className="card-selecionado text-center mb-8 bg-ifa-surface p-4 rounded-lg border border-ifa-border/30 w-full max-w-md mt-4">
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
