
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { OpeleState, SeedState, OduInfo, AIInterpretation, LoadingState, ClientData, ConsultationRecord, SelectionMap, Language, DivinationMethod, CowrieState, UserProfile, IreOsogboType } from './types';
import OpeleSeed from './components/OpeleSeed';
import OponIfaBoard from './components/OponIfaBoard';
import MerindilogunBoard from './components/MerindilogunBoard';
import IkinRitual from './components/IkinRitual';
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
import CameraButtons from './components/CameraButtons';
import { AIAssistant } from './components/AIAssistant';
import { SocialMediaStudio } from './components/SocialMediaStudio';
import { ArticlesList } from './components/ArticlesList';
import { ArticleViewer } from './components/ArticleViewer';
import OrixaQuiz from './components/OrixaQuiz';
import { EncyclopediaHub } from './components/EncyclopediaHub';
import { EntityViewer } from './components/EntityViewer';
import { CategoryPage } from './components/CategoryPage';
import SEO from './components/SEO';
import { auth } from './services/firebaseConfig';

import { getTranslation } from './utils/i18n';
import { checkDomainLock } from './utils/security';
import { canUseFeature, incrementAnonUsage, getAnonRemaining } from './utils/anonymousTracker';
import { Activity, Feather, Loader2, Users, History, GraduationCap, X, Check, Settings, Globe, Camera, Book, Shuffle, FileText, FlaskConical, BarChart3, Package, Music, Hammer, Leaf, CircleDot, Move, GripHorizontal, Baby, UserCheck, ArrowLeft, Database, Sparkles, Mic, Scale, BookOpen, PenTool, Gamepad2, Stars, Star, ShoppingBag, Crown, Moon, MapPin, Truck, GitBranch, LayoutGrid, Search, Sun, Sunset, CloudMoon, Quote, CalendarDays, Lock, Stethoscope, Zap, Video, Shield, Home, Bell, ChevronRight, HelpCircle, RefreshCw, Flame, Share2, LogOut } from 'lucide-react';

const INITIAL_OPELE: OpeleState = {
    rightLeg: ['open', 'open', 'open', 'open'],
    leftLeg: ['open', 'open', 'open', 'open'],
};

const INITIAL_COWRIES: CowrieState = Array(16).fill('closed');

const PROVERBS = [
    { yo: "A kii gbo kikun odo, ki a fi omi r├ƒÔòæÔòú se oube.", pt: "N├úo se ouve o ronco do mar e se usa sua ├ígua para matar a sede (Respeite as for├ºas)." },
    { yo: "Iwa l'ewa", pt: "O car├íter Ôö£┬« a beleza." },
    { yo: "Bi omi ti nsan, bee ni a nfi oju gba a.", pt: "Como a ├ígua corre, assim devemos acompanhar o fluxo da vida." },
    { yo: "Agba kii wa loja, ki ori omo titun o wo.", pt: "O anci├úo n├úo est├í no mercado para deixar a cabe├ºa do beb├¬ torta (Responsabilidade)." },
    { yo: "Aje ke lana, omo ku loni.", pt: "A bruxa gritou ontem, a crian├ºa morreu hoje (Cuidado com coincid├¬ncias)." }
];

import AdminPanel from './components/AdminPanel';
import { useAuth } from './services/AuthContext';

type AppView = 'home' | 'history' | 'register' | 'input' | 'result' | 'print' | 'prayers' | 'manual' | 'oogun' | 'analytics' | 'inventory_hub' | 'sound_hub' | 'study' | 'dream_journal' | 'face_reading' | 'geo_herbs' | 'lineage_tree' | 'igbadu' | 'oracle_hub' | 'ajogun' | 'assentamentos' | 'herb_id' | 'ebo_sim' | 'mandala' | 'amutorunwa' | 'ebori' | 'dictionary' | 'sango_wheel' | 'reverse_odu' | 'esoteric_hub' | 'door_guardian' | 'voice_commander' | 'treatise' | 'story_mode' | 'mojuba' | 'constellation' | 'delivery' | 'agenda' | 'verse_builder' | 'odu_library' | 'virtual_room' | 'admin_panel' | 'social_studio' | 'articles' | 'article' | 'orixa_quiz' | 'encyclopedia_hub' | 'encyclopedia_entity' | 'encyclopedia_category';
import LoginScreen from './components/LoginScreen';

function App() {
    useEffect(() => {
      if (location.hostname.includes('localhost')) {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then(rs => rs.forEach(r => r.unregister()));
        }
        if ('caches' in window) {
          caches.keys().then(ks => ks.forEach(k => caches.delete(k)));
        }
      }
    }, []);

    const { user, userProfile, loading: authLoading, updateUsageCounters, refreshProfile } = useAuth();
    const safeEmail = user?.email?.toLowerCase().trim() || '';
    const isBaba = safeEmail === 'babaifalore@gmail.com' || safeEmail === 'babaifalote@gmail.com' || safeEmail === 'safffnb@gmail.com' || safeEmail === 'raquel.rafen@gmail.com';
    const userPlan = isBaba ? 'pro_annual' : (userProfile?.plan || 'free');
    const [isLocked, setIsLocked] = useState(false);
    const [isKeyMissing, setIsKeyMissing] = useState(false);
    const [view, setView] = useState<AppView>('home');
    const [opele, setOpele] = useState<OpeleState>(INITIAL_OPELE);
    const [ikinKey, setIkinKey] = useState(0);
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
    const [articleSlug, setArticleSlug] = useState("");


    const [homeSearch, setHomeSearch] = useState('');
    const [dailyWisdom, setDailyWisdom] = useState(PROVERBS[0]);

    // Listen for open-article custom event (from browser nav)
    useEffect(() => {
        const handler = (e: Event) => {
            const slug = (e as CustomEvent).detail;
            if (slug) { setArticleSlug(slug); setView('article'); }
        };
        window.addEventListener('open-article', handler);
        return () => window.removeEventListener('open-article', handler);
    }, []);

    const [encyclopediaEntityId, setEncyclopediaEntityId] = useState("");
    const [encyclopediaCategory, setEncyclopediaCategory] = useState("");
    
    // Listen for open-entity custom event
    useEffect(() => {
        const handler = (e: Event) => {
            const id = (e as CustomEvent).detail;
            if (id) { setEncyclopediaEntityId(id); setView('encyclopedia_entity'); }
        };
        window.addEventListener('open-entity', handler);
        return () => window.removeEventListener('open-entity', handler);
    }, []);

    const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [virtualRoomData, setVirtualRoomData] = useState<{ mode: 'babalawo' | 'consulente', room: string }>({ mode: 'babalawo', room: 'SalaIfaOluwo' });

    const [showPaywall, setShowPaywall] = useState(false);
    const [blockedFeature, setBlockedFeature] = useState('');
    const [subscribing, setSubscribing] = useState(false);
    const [subscribeError, setSubscribeError] = useState('');

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
                    // Se o sistema j├í cuidou do popstate pelo gesto lateral do Android, 
                    // n├úo precisamos for├ºar aqui, mas para garantir compatibilidade:
                    if (viewRef.current === 'result') {
                        if (confirm("Deseja sair da leitura e voltar ao in├¡cio?")) setView('home');
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

    // ÔÇöÔÇö isPro: true somente para planos pro_monthly e pro_annual ÔÇöÔÇö
    const isPro = (plan?: string) => {
        const safeEmail = user?.email?.toLowerCase().trim() || '';
        if (safeEmail === 'babaifalore@gmail.com' || safeEmail === 'babaifalote@gmail.com' || safeEmail === 'safffnb@gmail.com' || safeEmail === 'raquel.rafen@gmail.com') return true;
        return plan !== 'free' && plan !== 'student_monthly' && plan !== 'estudante' && plan !== undefined;
    };

    // ÔÇöÔÇö GUARD: bloqueia acesso funcional ├ás views exclusivas de Sacerdote (pro_monthly / pro_annual) ÔÇöÔÇö
    // Estudantes e usu├írios free s├úo redirecionados ao home + paywall, independente de como chegaram aqui.
    useEffect(() => {
        if (authLoading) return; // Aguarda confirma├º├úo de auth antes de agir
        const PRO_ONLY_LABELS: Partial<Record<AppView, string>> = {
            ebori:          'Bori',
            reverse_odu:    'Material Reverso',
            assentamentos:  'Assentamentos',
            ajogun:         'Diagn├│stico Ajogun',
            virtual_room:   'Sala Virtual',
            esoteric_hub:   'Eb├│ Simulador / Ferramentas',
            delivery:       'Entrega de Eb├│',
            oogun:          'Oogun Hub',
            inventory_hub:  'Invent├írio',
            story_mode:     'Story Mode (RPG)',
        };
        const featureLabel = PRO_ONLY_LABELS[view];
        if (!featureLabel) return; // View n├úo ├® restrita

        if (!user) {
            // N├úo autenticado: vai para login
            setView('home');
            setShowLoginModal(true);
            return;
        }
        if (!isPro(userPlan)) {
            // Autenticado mas plano free ou estudante: abre paywall
            setView('home');
            setBlockedFeature(featureLabel);
            setShowPaywall(true);
        }
    }, [view, user, userPlan, authLoading]); // eslint-disable-line react-hooks/exhaustive-deps

    const requireAuth = (action: () => void) => {
        if (!user) { setShowLoginModal(true); return; }
        action();
    };



    const handleProFeature = (featureName: string, action: () => void) => {
        if (!user) { setShowLoginModal(true); return; }
        if (!isPro(userPlan)) {
            setBlockedFeature(featureName);
            setShowPaywall(true);
        } else {
            action();
        }
    };

    const handleStudentOrProFeature = (featureName: string, action: () => void) => {
        if (!user) { setShowLoginModal(true); return; }
        if (!isPro(userPlan) && userPlan !== 'student_monthly') {
            setBlockedFeature(featureName);
            setShowPaywall(true);
        } else {
            action();
        }
    };
    const handleSubscribe = async (subscriptionId: string, planKey: string) => {
        setSubscribing(true);
        setSubscribeError('');
        try {
            const currentUid = user?.uid;
            if (!currentUid) {
                throw new Error('Usu├írio n├úo autenticado. Fa├ºa login novamente.');
            }
            const res = await fetch('/api/activate-subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subscriptionId, uid: currentUid, planKey }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Falha ao ativar assinatura');
            await refreshProfile();
            setShowPaywall(false);
        } catch (err: any) {
            setSubscribeError(err.message || 'Erro ao ativar assinatura. Contate o suporte.');
        } finally {
            setSubscribing(false);
        }
    };

    const handleChangeLanguage = (lang: Language) => {
      setLanguage(lang);
      setIsLangMenuOpen(false);
      try { localStorage.setItem('ifa_language', lang); } catch {}
    };

    // --- NAVEGAÔö£├ºÔö£├óO PARA CHAT VIA BUSCA ---
    const handleOpenArticle = (slug: string) => {
        setArticleSlug(slug);
        setView('article');
    };

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
        if (opeleResult) setOpele(opeleResult); // Ikin: auto-sets the Od├╣ from throw results
        setDivinationMethod(pendingMethod);
        setPendingMethod(null);
        setShowPreparation(false);
        // Se veio da Adivinha├º├úo R├ípida (home) com cliente j├í definido, vai direto para input
        if (view === 'home') {
            setView('input');
        }
    };

    const renderBoard = () => {
        if (divinationMethod === 'merindilogun') {
            return (<div className="w-full flex justify-center py-4"><MerindilogunBoard cowries={cowries} onToggle={toggleCowrie} /></div>);
        }
        if (divinationMethod === 'ikin') {
            return (<div className="w-full flex justify-center py-4"><IkinRitual key={ikinKey} opele={opele} onToggle={toggleSeed} onReset={() => { setOpele(INITIAL_OPELE); setIkinKey(k => k + 1); }} oduName={currentOdu?.name} /></div>);
        }
        if (divinationMethod === 'opon') {
            return (<div className="w-full flex justify-center py-4"><OponIfaBoard opele={opele} onToggle={toggleSeed} onSetState={setOpele} /></div>);
        }
        return (
            <div className="w-full flex flex-col items-center">
                <div className="bg-ifa-base border border-ifa-border p-8 md:p-12 rounded-3xl shadow-2xl relative max-w-2xl w-full mb-4">
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
                <CameraButtons />
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
        if (userPlan === 'free' && (userProfile?.studyCount || 0) >= 3) {
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
            const result = await fetchInterpretation(oduToInterpret, language, iboResult ?? undefined, userProfile?.plan === 'student_monthly');
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
            alert(`Erro na leitura. Verifique sua conex├úo. Detalhe: ${e.message}`);
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
        if (userPlan === 'student_monthly') {
            setBlockedFeature(t.btnConsultation);
            setShowPaywall(true);
            return;
        }
        if (userPlan === 'free' && (userProfile?.consultationCount || 0) >= 3) {
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
            // Navega├º├úo para impress├úo agora Ôö£┬« controlada pelo PrintCenter inline (InterpretationView)
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

    const GlassCard = ({ onClick, label, icon: Icon, variant = 'mini', feature, className = '', subtitle, theme, proOnly }: any) => {
        if (homeSearch && !label.toLowerCase().includes(homeSearch.toLowerCase())) return null;
        const variantMap: Record<string, string> = { hero: 'glass-hero-gold', green: 'glass-hero-green', blue: 'glass-blue', terra: 'glass-terra', purple: 'glass-purple' };
        const vClass = variantMap[variant] || 'glass-mini';
        const isHero = variant === 'hero' || variant === 'green';
        const isMedium = variant === 'blue' || variant === 'terra' || variant === 'purple';
        const isNavCard = !isHero && !isMedium;
        const themeColor = theme ? THEME_MAP[theme] : null;
        const handleClick = () => { setHomeSearch(''); feature ? (proOnly ? handleProFeature(feature, onClick) : handleStudentOrProFeature(feature, onClick)) : onClick(); };
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

    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Dados reais do hist├│rico de consultas para o hero
    const heroStats = useMemo(() => {
        try {
            const raw = localStorage.getItem('ifa_consultations_v1');
            const records: ConsultationRecord[] = raw ? JSON.parse(raw) : [];
            const pending = records.filter(r => r.status !== 'completed');
            const last = records[records.length - 1];
            return {
                pendingCount: pending.length,
                totalCount: records.length,
                lastClient: last?.client?.fullName || '├ö├ç├Â',
                lastOdu: last?.odu?.name || '├ö├ç├Â',
            };
        } catch { return { pendingCount: 0, totalCount: 0, lastClient: '├ö├ç├Â', lastOdu: '├ö├ç├Â' }; }
    }, [view]); // re-computa ao voltar para home

    const YorubaLogo = () => (
        <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" stroke="#C49E30" strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
            <circle cx="50" cy="50" r="40" stroke="#C49E30" strokeWidth="1" opacity="0.5" />
            <path d="M50 15L85 35V65L50 85L15 65V35L50 15Z" stroke="#C49E30" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="10" fill="#C49E30" opacity="0.8" />
            <path d="M50 15V85M15 35L85 65M15 65L85 35" stroke="#C49E30" strokeWidth="0.5" opacity="0.4" />
        </svg>
    );

    // Full Sidebar Content for Desktop (220px, with text labels + groups)
    const SidebarSlimContent = () => {
        const nav = (v: AppView) => { setView(v); };
        const userName = (userProfile as any)?.displayName || user?.email?.split('@')[0] || 'Babal├íwo';
        const initials = userName.slice(0, 2).toUpperCase();
        const isPlanVip = isPro(userProfile?.plan);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Logo / Brand */}
                <div className="ds-sidebar-brand" onClick={() => nav('home')}>
                    <YorubaLogo />
                    <div className="logo-text">
                        <h1>IF&Aacute; OLUWO</h1>
                        <span>C&oacute;dex Sacerdotal</span>
                    </div>
                </div>

                {/* Home Button */}
                <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 16 }} className="scrollbar-hide">
                    <button className="ds-sidebar-slim-home" onClick={() => nav('home')} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <Home size={14} style={{ color: '#C49E30', opacity: 0.9 }} />
                        <span>Painel Principal</span>
                    </button>

                    {/* ARTIGOS EM DESTAQUE */}
                    <button className={`ds-sidebar-slim-item ${view === 'articles' ? 'active' : ''}`} onClick={() => nav('articles')} style={{ border: '1px solid rgba(196,158,48,0.2)', borderRadius: 8, marginBottom: 8 }}>
                        <BookOpen size={13} style={{ color: '#C49E30' }} /> <span style={{ color: '#C49E30', fontWeight: 600 }}>Artigos</span>
                        <span className="item-badge-new">Novo</span>
                    </button>

                    {/* DIVINAÔö£├ºÔö£├óO */}
                    <div className="ds-sidebar-slim-group">Divina├º├úo</div>
                    <button className={`ds-sidebar-slim-item ${view === 'oracle_hub' ? 'active' : ''}`} onClick={() => handleStudentOrProFeature(t.featureAdvancedOracles, () => nav('oracle_hub'))}>
                        <CircleDot size={13} /> <span>Todos os Or├ículos</span>
                    </button>
                    <button className="ds-sidebar-slim-item" onClick={startNewSession}>
                        <Users size={13} /> <span>Nova Consulta</span>
                        {heroStats.pendingCount > 0 && <span className="item-badge">{heroStats.pendingCount}</span>}
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'history' ? 'active' : ''}`} onClick={() => nav('history')}>
                        <History size={13} /> <span>Hist├│rico Completo</span>
                    </button>
                    <button className="ds-sidebar-slim-item" onClick={() => handleStudentOrProFeature(t.featureAnalytics, () => nav('analytics'))}>
                        <BarChart3 size={13} /> <span>Analytics e Dados</span>
                    </button>
                    <button className="ds-sidebar-slim-item" onClick={() => handleProFeature(t.featureInventory, () => nav('inventory_hub'))}>
                        <Package size={13} /> <span>Resultados</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'virtual_room' ? 'active' : ''}`} onClick={() => handleProFeature(t.featureVirtualRoom, () => nav('virtual_room'))}>
                        <Video size={13} /> <span>Sala Virtual</span>
                        <span className="item-badge-new">Novo</span>
                    </button>

                    {/* CONHECIMENTO */}
                    <div className="ds-sidebar-slim-group">Conhecimento</div>
                    <button className={`ds-sidebar-slim-item ${view === 'odu_library' ? 'active' : ''}`} onClick={() => nav('odu_library')}>
                        <Book size={13} /> <span>Biblioteca de Odus</span>
                        <span style={{ marginLeft: 'auto', fontSize: 8, color: 'rgba(196,158,48,0.45)' }}>256</span>
                    </button>
                    <button className="ds-sidebar-slim-item" onClick={() => handleStudentOrProFeature(t.featureTreatise, () => nav('treatise'))}>
                        <GraduationCap size={13} /> <span>Tratados &amp; Estudos</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'prayers' ? 'active' : ''}`} onClick={() => handleStudentOrProFeature(t.featurePrayers, () => nav('prayers'))}>
                        <BookOpen size={13} /> <span>Ora├º├Áes &amp; Textos</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'dictionary' ? 'active' : ''}`} onClick={() => nav('dictionary')}>
                        <Search size={13} /> <span>Dicion├írio Yorub├í</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'amutorunwa' ? 'active' : ''}`} onClick={() => nav('amutorunwa')}>
                        <Baby size={13} /> <span>Nomes Iorub├ís (Amutorunwa)</span>
                    </button>
                    <button className="ds-sidebar-slim-item" onClick={() => nav('manual')}>
                        <HelpCircle size={13} /> <span>Manual de Uso</span>
                    </button>

                    {/* FERRAMENTAS ESPIRITUAIS */}
                    <div className="ds-sidebar-slim-group">Ferramentas Espirituais</div>
                    <button className={`ds-sidebar-slim-item ${view === 'esoteric_hub' ? 'active' : ''}`} onClick={() => handleProFeature(t.featureEsotericTools, () => nav('esoteric_hub'))}>
                        <Sparkles size={13} /> <span>Eb├│ Simulador</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'ebori' ? 'active' : ''}`} onClick={() => handleProFeature(t.featureBori, () => nav('ebori'))}>
                        <UserCheck size={13} /> <span>Bori (Fortalecimento)</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'sound_hub' ? 'active' : ''}`} onClick={() => handleStudentOrProFeature(t.featureSacredSounds, () => nav('sound_hub'))}>
                        <Music size={13} /> <span>Mojuba (Reza)</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'constellation' ? 'active' : ''}`} onClick={() => nav('constellation')}>
                        <Stars size={13} /> <span>Sons Sagrados</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'dream_journal' ? 'active' : ''}`} onClick={() => nav('dream_journal')}>
                        <Moon size={13} /> <span>Di├írio de Sonhos</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'constellation' ? 'active' : ''}`} onClick={() => nav('constellation')}>
                        <CircleDot size={13} /> <span>Constela├º├úo de Odu</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'mandala' ? 'active' : ''}`} onClick={() => nav('mandala')}>
                        <RefreshCw size={13} /> <span>Material Reverso</span>
                    </button>

                    {/* OOGUN & MAGIA */}
                    <div className="ds-sidebar-slim-group">Oogun &amp; Magia</div>
                    <button className={`ds-sidebar-slim-item ${view === 'oogun' ? 'active' : ''}`} onClick={() => handleProFeature(t.featureOogun, () => nav('oogun'))}>
                        <FlaskConical size={13} /> <span>Oogun Hub</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'herb_id' ? 'active' : ''}`} onClick={() => handleStudentOrProFeature(t.featureHerbID, () => nav('herb_id'))}>
                        <Leaf size={13} /> <span>Identificador de Ervas</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'geo_herbs' ? 'active' : ''}`} onClick={() => handleStudentOrProFeature(t.featureHerbMap, () => nav('geo_herbs'))}>
                        <MapPin size={13} /> <span>Mapa Geobot├ónico</span>
                    </button>
                    <button className="ds-sidebar-slim-item" onClick={() => handleProFeature(t.featureAjogun, () => nav('ajogun'))}>
                        <Stethoscope size={13} /> <span>Ajogun (Diagn├│stico)</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'assentamentos' ? 'active' : ''}`} onClick={() => handleProFeature(t.featureAssentamentos, () => nav('assentamentos'))}>
                        <Hammer size={13} /> <span>Assentamentos</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'sango_wheel' ? 'active' : ''}`} onClick={() => handleStudentOrProFeature(t.featureSangoWheel, () => nav('sango_wheel'))}>
                        <Scale size={13} /> <span>Roda de Xang├┤</span>
                    </button>

                    {/* GESTÔö£├óO & TEMPLO */}
                    <div className="ds-sidebar-slim-group">Gest├úo &amp; Templo</div>
                    <button className={`ds-sidebar-slim-item ${view === 'inventory_hub' ? 'active' : ''}`} onClick={() => handleProFeature(t.featureInventory, () => nav('inventory_hub'))}>
                        <Package size={13} /> <span>Invent├írio</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'agenda' ? 'active' : ''}`} onClick={() => nav('agenda')}>
                        <CalendarDays size={13} /> <span>Agenda Lit├║rgica</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'analytics' ? 'active' : ''}`} onClick={() => handleStudentOrProFeature(t.featureAnalytics, () => nav('analytics'))}>
                        <BarChart3 size={13} /> <span>Analytics &amp; Relat├│rios</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'lineage_tree' ? 'active' : ''}`} onClick={() => handleStudentOrProFeature(t.featureLineage, () => nav('lineage_tree'))}>
                        <GitBranch size={13} /> <span>├ürvore de Linhagem</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'delivery' ? 'active' : ''}`} onClick={() => handleProFeature('Entrega de Eb├│', () => nav('delivery'))}>
                        <Truck size={13} /> <span>Entrega de Eb├┤</span>
                    </button>

                    {/* EXTRAS */}
                    <div className="ds-sidebar-slim-group">Extras</div>
                    <button className={`ds-sidebar-slim-item ${view === 'igbadu' ? 'active' : ''}`} onClick={() => handleStudentOrProFeature('Igbadu Virtual', () => nav('igbadu'))}>
                        <LayoutGrid size={13} /> <span>Igbadu (Altar)</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'mandala' ? 'active' : ''}`} onClick={() => nav('mandala')}>
                        <CircleDot size={13} /> <span>Mandala de Odu</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'story_mode' ? 'active' : ''}`} onClick={() => handleProFeature(t.featureRPG, () => nav('story_mode'))}>
                        <Gamepad2 size={13} /> <span>Story Mode (RPG)</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'igbadu' ? 'active' : ''}`} onClick={() => handleStudentOrProFeature('Igbadu Virtual', () => nav('igbadu'))}>
                        <Stars size={13} /> <span>B├║ssola de Il├¬-If├¬</span>
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'agenda' ? 'active' : ''}`} onClick={() => nav('agenda')}>
                        <CalendarDays size={13} /> <span>Calend├írio Yorub├í</span>
                        <span className="item-badge-new">Novo</span>
                    </button>

                    {/* IA & INTERAÔö£├ºÔö£├óO */}
                    <div className="ds-sidebar-slim-group">IA &amp; Intera├º├úo</div>
                    <button className="ds-sidebar-slim-item" onClick={() => handleProFeature(t.featureVoiceCommand, () => setView('voice_commander'))}>
                        <Mic size={13} /> <span>Comando de Voz</span>
                    </button>
                    <button className="ds-sidebar-slim-item" onClick={() => nav('verse_builder')}>
                        <PenTool size={13} /> <span>Construtor de Versos</span>
                    </button>
                    <button className="ds-sidebar-slim-item" onClick={() => nav('social_studio')}>
                        <Share2 size={13} /> <span>Social Media Studio</span>
                    </button>

                    <div className="ds-sidebar-divider" style={{ margin: '12px 16px' }} />

                    <button className="ds-sidebar-slim-item" onClick={() => setShowSettings(true)}>
                        <Settings size={13} /> <span>Configura├º├Áes</span>
                    </button>
                    <button className="ds-sidebar-slim-item" style={{ color: '#d44a4a' }} onClick={() => auth.signOut()}>
                        <LogOut size={13} /> <span>Sair</span>
                    </button>
                </div>

                {/* User Profile Footer */}
                <div className="ds-sidebar-profile" style={{ padding: '12px 14px', borderTop: '1px solid rgba(196,158,48,0.08)', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
                    onClick={() => user ? setShowSettings(true) : setShowLoginModal(true)}>
                    <div className="ds-sidebar-profile-avatar" style={{ border: 'none', background: 'rgba(196,158,48,0.1)' }}>{user ? initials : '?'}</div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1px' }}>Babal├íwo</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#E8DCC2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                            {user ? userName : 'Visitante'}
                        </div>
                        <div style={{ fontSize: 9.5, color: '#C49E30', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                            {isPlanVip && <Crown size={9} />}
                            {userProfile?.plan === 'pro_annual' ? 'VIP Anual' : userProfile?.plan === 'pro_monthly' ? 'VIP Mensal' : userProfile?.plan === 'student_monthly' ? 'Estudante' : user ? 'Plano Free' : 'Entrar'}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Sidebar content ├ö├ç├Â shared between desktop and mobile drawer
    const SidebarContent = ({ onNav }: { onNav?: () => void }) => {
        const nav = (v: AppView) => { setView(v); onNav?.(); };
        const userName = (userProfile as any)?.displayName || user?.email?.split('@')[0] || 'Babal├íwo';
        const initials = userName.slice(0, 2).toUpperCase();
        const isPlanVip = isPro(userProfile?.plan);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0 12px' }}>
                {/* Logo */}
                <div className="p1-sidebar-brand" style={{ padding: '32px 12px 24px' }}>
                    <div style={{ color: '#E8DCC2' }}>
                        <CircleDot size={32} />
                    </div>
                    <div className="logo-text">
                        <h1>IF&Aacute; OLUWO</h1>
                        <span>C&Oacute;DEX SACERDOTAL</span>
                    </div>
                </div>

                {/* Nav Links */}
                <div style={{ flex: 1, overflowY: 'auto' }} className="scrollbar-hide">
                    <button className={`ds-sidebar-item ${view === 'home' ? 'active' : ''}`} onClick={() => nav('home')}>
                        <Home size={16} /> <span>In├¡cio</span>
                    </button>

                    <button className={`ds-sidebar-item ${view === 'articles' ? 'active' : ''}`} onClick={() => nav('articles')} style={{ border: '1px solid rgba(196,158,48,0.2)', borderRadius: 8, margin: '4px 0' }}>
                        <BookOpen size={16} style={{ color: '#C49E30' }} /> <span style={{ color: '#C49E30', fontWeight: 600 }}>Artigos</span>
                        <span className="item-badge-new" style={{ marginLeft: 'auto' }}>Novo</span>
                    </button>
                    
                    <button className="ds-sidebar-item mt-2" onClick={startNewSession}>
                        <Users size={16} /> 
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <span>Atendimento ao Consulente</span>
                        </div>
                        <div className="ds-sidebar-badge">{heroStats.pendingCount || 1}</div>
                    </button>

                    <button className={`ds-sidebar-item ${view === 'oracle_hub' ? 'active' : ''}`} onClick={() => handleProFeature(t.featureAdvancedOracles, () => nav('oracle_hub'))}>
                        <CircleDot size={16} /> <span>Divina├º├úo</span>
                    </button>

                    <button className="ds-sidebar-item" onClick={() => handleProFeature(t.featureTreatise, () => nav('treatise'))}>
                        <GraduationCap size={16} /> <span>Estudos</span>
                    </button>

                    <button className={`ds-sidebar-item ${view === 'odu_library' ? 'active' : ''}`} onClick={() => nav('odu_library')}>
                        <Book size={16} />
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <span>Biblioteca</span>
                            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>256 Odu</span>
                        </div>
                    </button>

                    <button className={`ds-sidebar-item ${view === 'ebori' ? 'active' : ''}`} onClick={() => handleProFeature(t.featureBori, () => nav('ebori'))}>
                        <UserCheck size={16} /> <span>Rituais & Eb├│</span>
                    </button>

                    <button className={`ds-sidebar-item ${view === 'oogun' ? 'active' : ''}`} onClick={() => handleProFeature(t.featureOogun, () => nav('oogun'))}>
                        <FlaskConical size={16} /> <span>Magia (Oogun)</span>
                    </button>

                    <button className={`ds-sidebar-item ${view === 'agenda' ? 'active' : ''}`} onClick={() => nav('agenda')}>
                        <CalendarDays size={16} /> <span>Calend├írio Lit├║rgico</span>
                    </button>

                    <button className="ds-sidebar-item" onClick={() => handleProFeature(t.featureAdvancedOracles, () => nav('oracle_hub'))}>
                        <Sparkles size={16} /> <span>Or├ículos Sagrados</span>
                    </button>

                    <button className={`ds-sidebar-item ${view === 'esoteric_hub' ? 'active' : ''}`} onClick={() => handleProFeature(t.featureEsotericTools, () => nav('esoteric_hub'))}>
                        <Stars size={16} /> <span>Ferramentas EsotÔö£┬«ricas</span>
                    </button>

                    <button className={`ds-sidebar-item ${view === 'inventory_hub' ? 'active' : ''}`} onClick={() => handleProFeature(t.featureInventory, () => nav('inventory_hub'))}>
                        <Settings size={16} /> <span>Gest├úo do Templo</span>
                    </button>

                    <div className="ds-sidebar-divider" style={{ margin: '24px 12px' }} />

                    <button className="ds-sidebar-item" onClick={() => setShowSettings(true)}>
                        <Settings size={16} /> <span>Configura├º├Áes</span>
                    </button>
                    <button className="ds-sidebar-item" style={{ color: '#d44a4a' }} onClick={() => auth.signOut()}>
                        <LogOut size={16} /> <span>Sair</span>
                    </button>
                </div>

                {/* User Profile */}
                <div className="ds-sidebar-profile" style={{ margin: '16px 12px 24px', border: 'none', background: 'rgba(196,158,48,0.03)', borderRadius: 12 }} onClick={() => user ? setShowSettings(true) : setShowLoginModal(true)}>
                    <div className="ds-sidebar-profile-avatar" style={{ border: 'none', background: 'rgba(196,158,48,0.1)' }}>{user ? initials : '?'}</div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Babal├íwo</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#E8DCC2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                            {user ? userName : 'Visitante'}
                        </div>
                        <div style={{ fontSize: 10, color: '#C49E30', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                            {isPlanVip && <Crown size={10} />}
                            {userPlan === 'pro_annual' ? 'Plano VIP Anual' : userPlan === 'pro_monthly' ? 'VIP Mensal' : userPlan === 'student_monthly' ? 'Estudante' : user ? 'Plano Free' : 'Entrar'}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderHome = () => {
        const hour = new Date().getHours();
        const displayName = (userProfile as any)?.displayName || user?.email?.split('@')[0] || 'Babalawo';
        const nav = (v: AppView) => setView(v);

        // ÔöÇÔöÇ ODU DO DIA: calculado deterministicamente pela data (muda todo dia, igual para todos) ÔöÇÔöÇ
        const ODU_DO_DIA_LIST: Array<{ name: string; regente: string; elemento: string; energia: string; simbolo: string; desc: string }> = [
            { name: 'Ejiogbe',       regente: 'Orunmila',  elemento: 'Luz',      energia: 'Renova├º├úo',    simbolo: 'Clareza',     desc: 'O Grande Caminho est├í aberto. Momento de recome├ºos e vis├úo espiritual.' },
            { name: 'Oyeku Meji',    regente: 'Orixanl├í',  elemento: 'Vazio',    energia: 'Transi├º├úo',    simbolo: 'Sil├¬ncio',    desc: 'Tempo de recolhimento. Oyeku pede respeito aos ancestrais e cautela.' },
            { name: 'Iwori Meji',    regente: 'Es├║',       elemento: 'Fogo',     energia: 'Revela├º├úo',    simbolo: 'Mente',       desc: 'O pensamento domina. Hora de consultar o Ori antes de agir.' },
            { name: 'Odi Meji',      regente: 'Iemanj├í',   elemento: '├ügua',     energia: 'Fertilidade',  simbolo: 'Womb',        desc: 'Energia de gesta├º├úo. Projetos plantados hoje geram frutos abundantes.' },
            { name: 'Irosun Meji',   regente: 'Xang├┤',     elemento: 'Sangue',   energia: 'Justi├ºa',      simbolo: 'Verdade',     desc: 'Xang├┤ exige honestidade. Verdades ocultas v├¬m ├á tona.' },
            { name: 'Owonrin Meji',  regente: 'Es├║',       elemento: 'Vento',    energia: 'Transforma├º├úo',simbolo: 'Mudan├ºa',     desc: 'Owonrin traz imprevistos. Esteja preparado para viradas r├ípidas.' },
            { name: 'Obara Meji',    regente: 'Xang├┤',     elemento: 'Ouro',     energia: 'Realeza',      simbolo: 'Nobreza',     desc: 'Obara ├® o Od├╣ dos reis. Aja com dignidade e lideran├ºa hoje.' },
            { name: 'Okanran Meji',  regente: 'Ogum',      elemento: 'Ferro',    energia: 'Batalha',      simbolo: 'Conflito',    desc: 'Okanran acende o fogo da disputa. Evite brigas desnecess├írias.' },
            { name: 'Ogunda Meji',   regente: 'Ogum',      elemento: 'Ferro',    energia: 'Abertura',     simbolo: 'Movimento',   desc: 'Ogum abre caminhos. ├ôtimo dia para iniciar projetos e viagens.' },
            { name: 'Osa Meji',      regente: 'Ians├ú',     elemento: 'Trov├úo',   energia: 'Revolu├º├úo',    simbolo: 'Tempestade',  desc: 'Osa varre o velho para o novo entrar. Deixe ir o que n├úo serve.' },
            { name: 'Ika Meji',      regente: 'Nan├ú',      elemento: 'Terra',    energia: 'Prote├º├úo',     simbolo: 'Raiz',        desc: 'Ika protege as ra├¡zes. Honre seus ancestrais e sua linhagem hoje.' },
            { name: 'Oturupon Meji', regente: 'Omolu',     elemento: 'Cinzas',   energia: 'Cura',         simbolo: 'Renova├º├úo',   desc: 'Oturupon transforma doen├ºas em sa├║de. Dia prop├¡cio para curas.' },
            { name: 'Otura Meji',    regente: 'Oxal├í',     elemento: 'Branco',   energia: 'Paz',          simbolo: 'Harmonia',    desc: 'Otura traz paz profunda. Resolva conflitos com di├ílogo e serenidade.' },
            { name: 'Irete Meji',    regente: 'Ox├│ssi',    elemento: 'Floresta', energia: 'Prosperidade', simbolo: 'Abund├óncia',  desc: 'Irete promete fartura. Ca├ºe suas metas com foco e persist├¬ncia.' },
            { name: 'Ose Meji',      regente: 'Oxum',      elemento: 'Mel',      energia: 'Amor',         simbolo: 'Do├ºura',      desc: 'Oxum derrama sua ben├º├úo. Excelente dia para assuntos do cora├º├úo.' },
            { name: 'Ofun Meji',     regente: 'Iemanj├í',   elemento: 'Mar',      energia: 'Profundidade', simbolo: 'Mist├®rio',    desc: 'Ofun guarda segredos antigos. Aprofunde sua espiritualidade hoje.' },
        ];
        // ├ìndice determin├¡stico: dias desde 01/01/2024, mod 16
        const today = new Date();
        const epoch = new Date(2024, 0, 1);
        const daysSinceEpoch = Math.floor((today.getTime() - epoch.getTime()) / 86400000);
        const dailyOduData = ODU_DO_DIA_LIST[daysSinceEpoch % ODU_DO_DIA_LIST.length];

        const oduAttrs = [
            { label: 'Regente', value: dailyOduData.regente },
            { label: 'Elemento', value: dailyOduData.elemento },
            { label: 'Energia', value: dailyOduData.energia },
            { label: 'S├¡mbolo', value: dailyOduData.simbolo },
        ];

        const timelineItems = [
            { time: '09:00', label: 'Consulta: In├¡cio', sub: 'Aguardando cliente', color: '#4ab87a' },
            { time: '09:30', label: 'Carlos dos Santos', sub: 'Consulta iniciada', color: '#e2b84a' },
            { time: '11:00', label: 'Bori ÔÇö Prepara├º├úo', sub: 'Agendado', color: '#50a0e0' },
            { time: '14:00', label: 'Entrega de Eb├│', sub: 'Pendente', color: '#e2b84a' },
        ];

        const bars1 = [40, 55, 35, 70, 60, 80, 65];
        const bars2 = [60, 45, 75, 50, 85, 70, 90];

        const recentActivities = heroStats.totalCount > 0 ? [
            { label: `Consulta: ${heroStats.lastClient}`, time: 'Hoje', color: '#4ab87a' },
            { label: `Odu: ${heroStats.lastOdu}`, time: '2h', color: '#e2b84a' },
            { label: 'Modo Estudo ativo', time: '1d', color: '#50a0e0' },
        ] : [
            { label: 'Nenhuma consulta ainda', time: 'ÔÇö', color: 'rgba(196,158,48,0.3)' },
        ];

        return (
        <div className="neo-dashboard-layout">
            <SEO 
                title="If├í Oluwo - Codex Sacerdotal | Or├ículo e Intelig├¬ncia Artificial" 
                description="A maior e mais avan├ºada plataforma do mundo para Babalawos e praticantes de If├í. Divina├º├úo com IA, 256 Odus, calend├írio lit├║rgico e muito mais." 
            />

            {/* ===== SIDEBAR ESQUERDA ===== */}
            <aside className="ds-sidebar-slim hidden md:flex md:flex-col">
                <SidebarSlimContent />
            </aside>

            {/* ===== MOBILE DRAWER ===== */}
            {sidebarOpen && (
                <div className="ds-sidebar-drawer md:hidden z-50 fixed inset-0">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                    <div className="absolute top-0 left-0 bottom-0 w-[280px] bg-[#070707] border-r border-[rgba(196,158,48,0.08)]">
                        <SidebarContent onNav={() => setSidebarOpen(false)} />
                    </div>
                </div>
            )}

            {/* ===== MAIN AREA (Topbar + Center/Right) ===== */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: '100vh' }}>

                {/* ÔöÇÔöÇ TOPBAR FULL-WIDTH ÔöÇÔöÇ */}
                <div style={{ padding: '14px 24px', borderBottom: '1px solid rgba(196,158,48,0.08)', background: '#07090d', flexShrink: 0, zIndex: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <div style={{ position: 'relative', flex: '1 1 180px', minWidth: 140, maxWidth: 260 }}>
                            <Search size={12} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(196,158,48,0.45)', pointerEvents: 'none' }} />
                            <input value={homeSearch} onChange={e => setHomeSearch(e.target.value)} placeholder="Buscar odus, estudos, ora├º├Áes, fun├º├Áes..."
                                style={{ width: '100%', height: 32, paddingLeft: 28, paddingRight: 10, borderRadius: 8, border: '1px solid rgba(196,158,48,0.15)', background: 'rgba(255,255,255,0.03)', color: '#E8DCC2', fontSize: 11, outline: 'none', boxSizing: 'border-box' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
                            {[
                                { icon: Users, label: 'Consultas hoje', value: heroStats.totalCount, delta: '+5', color: '#C49E30' },
                                { icon: Book, label: 'Odus estudados', value: 89, delta: '+7', color: '#C49E30' },
                                { icon: CircleDot, label: 'Odu do dia', value: dailyOduData.name.split(' ').slice(0,2).join(' '), delta: null, color: '#C49E30' },
                                { icon: Bell, label: 'Pr├│ximo evento', value: 'Eb├┤ de Ox├│ssi', delta: '20 Jun', color: '#4ab87a' },
                            ].map((s, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,158,48,0.12)', flexShrink: 0 }}>
                                    <s.icon size={10} style={{ color: 'rgba(196,158,48,0.4)', flexShrink: 0 }} />
                                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                                        <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', textTransform: 'uppercase' }}>{s.label}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <span style={{ fontSize: 11, fontWeight: 700, color: s.color, fontFamily: 'Cinzel, serif' }}>{s.value}</span>
                                            {s.delta && <span style={{ fontSize: 8, color: '#4ab87a', fontWeight: 600 }}>{s.delta}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ flex: 1 }} />
                        <div style={{ position: 'relative', flexShrink: 0 }}>
                            <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                style={{ height: 32, padding: '0 10px', borderRadius: 8, border: '1px solid rgba(196,158,48,0.2)', background: 'rgba(196,158,48,0.05)', cursor: 'pointer', color: 'rgba(196,158,48,0.8)', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 5 }}>
                                <Globe size={10} />{language}
                            </button>
                            {isLangMenuOpen && (
                                <div style={{ position: 'absolute', right: 0, top: '100%', marginTop: 4, zIndex: 50, overflow: 'hidden', minWidth: 140, borderRadius: 12, border: '1px solid rgba(196,158,48,0.25)', background: '#090e14', boxShadow: '0 16px 48px rgba(0,0,0,0.6)' }}>
                                    {(['pt-BR', 'pt-PT', 'en', 'es', 'yo'] as Language[]).map(l => (
                                        <button key={l} onClick={() => { setLanguage(l); setIsLangMenuOpen(false); try { localStorage.setItem('ifa_language', l); } catch {} }}
                                            style={{ width: '100%', textAlign: 'left', padding: '9px 14px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: l === language ? '#e2b84a' : 'rgba(255,255,255,0.5)', background: l === language ? 'rgba(210,165,40,0.08)' : 'transparent', border: 'none', cursor: 'pointer' }}>
                                            {l === 'pt-BR' ? t.langPtBr : l === 'pt-PT' ? t.langPtPt : l === 'en' ? t.langEn : l === 'es' ? t.langEs : t.langYo}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button onClick={() => handleProFeature(t.featureVoiceCommand, () => setView('voice_commander'))}
                            style={{ height: 32, padding: '0 12px', borderRadius: 8, border: '1px solid rgba(196,158,48,0.25)', background: 'rgba(196,158,48,0.07)', cursor: 'pointer', color: '#E8DCC2', fontSize: 10, fontWeight: 600, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ab87a', boxShadow: '0 0 6px rgba(74,184,122,0.8)', animation: 'ds-pulse-dot 2s ease-in-out infinite' }} />
                            Assistente
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 4px 4px', borderRadius: 24, border: '1px solid rgba(196,158,48,0.2)', background: 'rgba(196,158,48,0.04)', cursor: 'pointer', flexShrink: 0 }}
                            onClick={() => user ? setShowSettings(true) : setShowLoginModal(true)}>
                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(196,158,48,0.15)', border: '1px solid rgba(196,158,48,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#C49E30', fontFamily: 'Cinzel, serif' }}>
                                {((userProfile as any)?.displayName || user?.email?.split('@')[0] || 'B').slice(0,2).toUpperCase()}
                            </div>
                            <div style={{ lineHeight: 1.1 }}>
                                <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '1px' }}>Babalawo</div>
                                <div style={{ fontSize: 10, fontWeight: 600, color: '#E8DCC2' }}>{displayName.split(' ')[0]}</div>
                            </div>
                        </div>
                        {(userProfile as any)?.role === 'admin' && (
                            <button onClick={() => setView('admin_panel')} style={{ height: 32, padding: '0 10px', borderRadius: 8, border: '1px solid rgba(200,40,40,0.3)', background: 'rgba(200,40,40,0.1)', cursor: 'pointer', color: 'rgba(240,100,100,0.85)', fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 5 }}>
                                <Shield size={10} /> Admin
                            </button>
                        )}
                        <button className="md:hidden" onClick={() => setSidebarOpen(true)}
                            style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(196,158,48,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', cursor: 'pointer', color: 'rgba(196,158,48,0.6)', flexShrink: 0 }}>
                            <GripHorizontal size={16} />
                        </button>
                </div>
                </div>
                {/* END TOPBAR */}

                {/* ÔöÇÔöÇ CENTER + RIGHT ROW ÔöÇÔöÇ */}
                <div className="flex flex-col xl:flex-row flex-1 items-start w-full">

                {/* ===== COLUNA CENTRAL ===== */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto', padding: '24px 28px 64px' }}>

                    {/* ÔöÇÔöÇ ODU DO DIA ÔöÇÔöÇ */}
                    <div className="neo-odu-card">
                        {/* COL 1 ÔÇö Texto */}
                        <div className="neo-odu-content">
                            <div className="neo-odu-label">Odu do Dia</div>
                            <h2 className="neo-odu-title">
                                {dailyOduData.name.toUpperCase().split(' ').map((word, idx) => (
                                    <React.Fragment key={idx}>
                                        {word}
                                        {idx < dailyOduData.name.split(' ').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </h2>
                            <p className="neo-odu-desc">{dailyOduData.desc}</p>
                            <button onClick={() => handleStudentOrProFeature('Igbadu Virtual', () => nav('igbadu'))}
                                style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 6, background: '#07090d', border: '1px solid rgba(196,158,48,0.5)', cursor: 'pointer', color: '#C49E30', fontSize: 9, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>
                                Consultar Odu do Dia <ChevronRight size={12} />
                            </button>
                        </div>

                        {/* COL 2 ÔÇö Mandala */}
                        <div className="neo-odu-mandala-slot">
                            <style>{`
                                .neo-odu-mandala-img {
                                    width: 280px !important;
                                    height: 280px !important;
                                    min-width: 280px !important;
                                    min-height: 280px !important;
                                    max-width: 280px !important;
                                    max-height: 280px !important;
                                    border-radius: 50%;
                                    border: 2px solid rgba(196,158,48,0.6);
                                    box-shadow: 0 0 25px rgba(196,158,48,0.25);
                                    object-fit: cover;
                                    position: relative;
                                    z-index: 1;
                                    transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
                                    flex-shrink: 0;
                                }
                                .neo-odu-mandala-img:hover {
                                    transform: scale(1.06);
                                    border-color: rgba(196,158,48,1);
                                    box-shadow: 0 0 50px rgba(196,158,48,0.6);
                                }
                                .neo-odu-mandala-slot::before {
                                    width: 320px !important;
                                    height: 320px !important;
                                }
                            `}</style>
                            <img src="/opon_ifa_hero.png" alt="Mandala" className="neo-odu-mandala-img" />
                        </div>

                        {/* COL 3 ÔÇö Calend├írio Lit├║rgico e Atributos */}
                        <div className="neo-odu-calendar-col" style={{ width: '100%', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
                            <YorubaCalendarWidget onOpenIgbadu={() => handleStudentOrProFeature('Igbadu Virtual', () => nav('igbadu'))} />
                            
                            {/* Atributos (agora embaixo do calend├írio) */}
                            <div className="neo-odu-attrs-col">
                                {[
                                    { icon: Flame, label: 'Elemento', value: dailyOduData.elemento },
                                    { icon: Crown, label: 'Regente', value: dailyOduData.regente },
                                    { icon: Zap, label: 'Energia', value: dailyOduData.energia },
                                    { icon: CircleDot, label: 'S├¡mbolo', value: dailyOduData.simbolo },
                                ].map((a, i) => (
                                    <div key={i} className="neo-odu-attr-row">
                                        <div className="neo-odu-attr-icon"><a.icon size={14} /></div>
                                        <div className="neo-odu-attr-info">
                                            <span className="neo-odu-attr-info-label">{a.label}</span>
                                            <span className="neo-odu-attr-info-value">{a.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ÔöÇÔöÇ ADIVINHA├ç├âO R├üPIDA ÔöÇÔöÇ */}
                    <div className="neo-section-header" style={{ marginBottom: 12 }}>
                        <span className="neo-section-title">Ôèò Adivinha├º├úo R├ípida</span>
                        <div className="neo-section-line" />
                    </div>
                    <div className="neo-divination-strip">
                        {[
                            { img: '/card_opele.jpg', title: 'Opele', method: 'opele' as DivinationMethod },
                            { img: '/card_opon.png', title: 'Opon If├í', method: 'opon' as DivinationMethod },
                            { img: '/card_ikin.png', title: 'Ikin', method: 'ikin' as DivinationMethod },
                            { img: '/card_merindilogun.png', title: 'Merindilogun', method: 'merindilogun' as DivinationMethod },
                        ].map((card, i) => (
                            <div key={i} className="neo-div-card" onClick={() => {
                                setHomeSearch('');
                                if (!user) {
                                    // An├┤nimo: verifica quota e define cliente
                                    if (!canUseFeature('consultation')) { setBlockedFeature(t.btnConsultation); setShowPaywall(true); return; }
                                    setClient({ id: 'anon', fullName: 'Visitante', dateOfBirth: '', mothersName: '', address: '', consultationTime: new Date().toLocaleString(), profession: '', maritalStatus: '', phone: '', email: '' });
                                } else {
                                    // Logado: verifica quota e define cliente tempor├írio para a sess├úo r├ípida
                                    if (userPlan === 'student_monthly') { setBlockedFeature(t.btnConsultation); setShowPaywall(true); return; }
                                    if (userPlan === 'free' && (userProfile?.consultationCount || 0) >= 3) { setBlockedFeature(t.btnConsultation); setShowPaywall(true); return; }
                                    setClient({ id: 'quick', fullName: 'Consulta R├ípida', dateOfBirth: '', mothersName: '', address: '', consultationTime: new Date().toLocaleString(), profession: '', maritalStatus: '', phone: '', email: '' });
                                    setInterpretation(null); setOpele(INITIAL_OPELE); setCowries(INITIAL_COWRIES); setActiveRecord(null);
                                }
                                setPendingMethod(card.method);
                                setShowPreparation(true);
                            }}>
                                <img src={card.img} alt={card.title} className="neo-div-card-img" style={{ filter: 'brightness(1.15) contrast(1.05)', opacity: 1 }} />
                                <div className="neo-div-card-body">
                                    <div className="neo-div-card-title" style={{ fontFamily: "'Cinzel', serif", fontSize: 13, letterSpacing: '2px', fontWeight: 700, color: '#E8DCC2', textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}>{card.title}</div>
                                </div>
                            </div>
                        ))}
                        <button className="neo-div-card-more" onClick={() => handleStudentOrProFeature(t.featureAdvancedOracles, () => nav('oracle_hub'))}>
                            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(196,158,48,0.08)', border: '1px solid rgba(196,158,48,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C49E30' }}>
                                <CircleDot size={16} />
                            </div>
                            <span>Mais<br/>Or├ículos</span>
                        </button>
                    </div>

                    {/* ÔöÇÔöÇ ATENDIMENTO A CONSULENTE + MODO DE ESTUDO ÔöÇÔöÇ */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">

                        {/* ATENDIMENTO A CONSULENTE */}
                        <div style={{ background: 'linear-gradient(135deg, rgba(196,158,48,0.05) 0%, rgba(10,11,15,0.8) 100%)', border: '1px solid rgba(196,158,48,0.18)', borderRadius: 14, padding: '18px 20px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(196,158,48,0.5), transparent)' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(196,158,48,0.12)', border: '1px solid rgba(196,158,48,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Users size={13} style={{ color: '#C49E30' }} />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#E8DCC2', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Atendimento a Consulente</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                {[
                                    { icon: Users, label: 'Nova Consulta', sub: 'Iniciar atendimento', color: '#4ab87a', action: startNewSession },
                                    { icon: Video, label: 'Sala Virtual', sub: 'Consulta online', color: '#50a0e0', action: () => handleProFeature(t.featureVirtualRoom, () => nav('virtual_room')) },
                                    { icon: FileText, label: 'Imprimir Consulta', sub: 'Completa ou resumida', color: '#e2b84a', action: () => nav('history') },
                                    { icon: Feather, label: 'Compartilhar', sub: 'WhatsApp, e-mail', color: '#C49E30', action: () => nav('history') },
                                    { icon: History, label: 'Hist├│rico', sub: 'Consultas realizadas', color: 'rgba(196,158,48,0.6)', action: () => nav('history') },
                                    { icon: Bell, label: 'Lembretes', sub: 'Acompanhar retornos', color: 'rgba(80,160,224,0.7)', action: () => nav('agenda') },
                                ].map((item, i) => (
                                    <button key={i} onClick={() => { setHomeSearch(''); item.action(); }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', transition: 'all 200ms ease', textAlign: 'left' }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(196,158,48,0.07)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,158,48,0.2)'; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                                        <div style={{ width: 30, height: 30, borderRadius: 8, background: `${item.color}15`, border: `1px solid ${item.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <item.icon size={14} style={{ color: item.color }} />
                                        </div>
                                        <div style={{ fontSize: 10.5, fontWeight: 600, color: '#E8DCC2', lineHeight: 1.2 }}>{item.label}</div>
                                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', lineHeight: 1.2 }}>{item.sub}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* MODO DE ESTUDO */}
                        <div style={{ background: 'linear-gradient(135deg, rgba(74,184,122,0.05) 0%, rgba(10,11,15,0.8) 100%)', border: '1px solid rgba(74,184,122,0.18)', borderRadius: 14, padding: '18px 20px', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(74,184,122,0.5), transparent)' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(74,184,122,0.12)', border: '1px solid rgba(74,184,122,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <GraduationCap size={13} style={{ color: '#4ab87a' }} />
                                </div>
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#E8DCC2', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>Modo de Estudo</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                {[
                                    { icon: Book, label: 'Biblioteca de Odus', sub: 'Estudo do 256 Odus', color: '#4ab87a', action: () => nav('odu_library') },
                                    { icon: BookOpen, label: 'Modo de Estudo', sub: 'Jogo educativo', color: '#4ab87a', action: handleStudyStart },
                                    { icon: BookOpen, label: 'Tratados & Textos', sub: 'Mais de 50 textos', color: '#50a0e0', action: () => handleStudentOrProFeature(t.featureTreatise, () => nav('treatise')) },
                                    { icon: Book, label: 'Orikis & Ora├º├Áes', sub: 'Rezas sagradas', color: '#50a0e0', action: () => handleStudentOrProFeature(t.featurePrayers, () => nav('prayers')) },
                                    { icon: Search, label: 'Dicion├írio Yorub├í', sub: 'Mais de 70 verbetes', color: '#C49E30', action: () => nav('dictionary') },
                                    { icon: GraduationCap, label: 'Simulados', sub: 'Testar conhecimentos', color: 'rgba(74,184,122,0.6)', action: () => handleStudentOrProFeature(t.featureTreatise, () => nav('treatise')) },
                                ].map((item, i) => (
                                    <button key={i} onClick={() => { setHomeSearch(''); item.action(); }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', transition: 'all 200ms ease', textAlign: 'left' }}
                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(74,184,122,0.07)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,184,122,0.2)'; }}
                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                                        <div style={{ width: 30, height: 30, borderRadius: 8, background: `${item.color}15`, border: `1px solid ${item.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <item.icon size={14} style={{ color: item.color }} />
                                        </div>
                                        <div style={{ fontSize: 10.5, fontWeight: 600, color: '#E8DCC2', lineHeight: 1.2 }}>{item.label}</div>
                                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', lineHeight: 1.2 }}>{item.sub}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ÔöÇÔöÇ CONSULTAS & A├ç├òES R├üPIDAS ÔöÇÔöÇ */}
                    <div style={{ background: 'linear-gradient(90deg, rgba(196,158,48,0.04), rgba(196,158,48,0.02), transparent)', border: '1px solid rgba(196,158,48,0.12)', borderRadius: 12, padding: '14px 20px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, rgba(196,158,48,0.6), transparent)' }} />
                        <div style={{ fontSize: 8, letterSpacing: '3px', color: 'rgba(196,158,48,0.5)', textTransform: 'uppercase', marginBottom: 12, fontWeight: 700 }}>ÔåÆ Consultas e A├º├Áes R├ípidas</div>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            {[
                                { icon: Users, label: 'Nova Consulta', sub: 'Iniciar agora', color: '#4ab87a', action: startNewSession },
                                { icon: Video, label: 'Atendimento Online', sub: 'Sala Virtual', color: '#50a0e0', action: () => handleProFeature(t.featureVirtualRoom, () => nav('virtual_room')) },
                                { icon: FlaskConical, label: 'Eb├┤ Recomendado', sub: 'N├¡veis de Eb├┤', color: '#e2b84a', action: () => handleProFeature(t.featureOogun, () => nav('oogun')) },
                                { icon: FileText, label: 'Imprimir Consulta', sub: 'Completa ou resumida', color: '#C49E30', action: () => nav('history') },
                                { icon: Feather, label: 'Compartilhar', sub: 'WhatsApp, E-mail', color: 'rgba(196,158,48,0.6)', action: () => nav('history') },
                            ].map((btn, i) => (
                                <button key={i} onClick={() => { setHomeSearch(''); btn.action(); }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: `1px solid ${btn.color}25`, cursor: 'pointer', transition: 'all 200ms ease', flex: 1, minWidth: 140 }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${btn.color}12`; (e.currentTarget as HTMLElement).style.borderColor = `${btn.color}50`; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; (e.currentTarget as HTMLElement).style.borderColor = `${btn.color}25`; }}>
                                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${btn.color}18`, border: `1px solid ${btn.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <btn.icon size={14} style={{ color: btn.color }} />
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{ fontSize: 11, fontWeight: 600, color: '#E8DCC2', lineHeight: 1.2 }}>{btn.label}</div>
                                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>{btn.sub}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ÔöÇÔöÇ CONHECIMENTO / ESOT├ëRICO / MAGIA / VOZ & SOM ÔöÇÔöÇ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
                        {[
                            {
                                title: 'Conhecimento', color: '#C49E30', icon: Book,
                                items: [
                                    { icon: Book, label: 'Biblioteca de Odus', sub: '256 Odus', color: '#C49E30', action: () => nav('odu_library') },
                                    { icon: BookOpen, label: 'Enciclop├®dia Sagrada', sub: 'Orix├ís e Entidades', color: '#C49E30', action: () => nav('encyclopedia_hub') },
                                    { icon: BookOpen, label: 'Tratados & Textos', sub: 'Mais de 50 textos', color: '#C49E30', action: () => handleStudentOrProFeature(t.featureTreatise, () => nav('treatise')) },
                                    { icon: Book, label: 'Orikis & Ora├º├Áes', sub: 'Rezas e c├ónticos', color: '#C49E30', action: () => handleStudentOrProFeature(t.featurePrayers, () => nav('prayers')) },
                                    { icon: Search, label: 'Dicion├írio Yorub├í', sub: 'Mais de 70 verbetes', color: '#C49E30', action: () => nav('dictionary') },
                                    { icon: BookOpen, label: 'Modo de Estudo', sub: 'Jogo educativo', color: '#C49E30', action: handleStudyStart },
                                    { icon: HelpCircle, label: 'Manual do App', sub: 'Guia completo', color: '#C49E30', action: () => nav('manual') },
                                ]
                            },
                            {
                                title: 'Esot├®rico', color: '#b04a8a', icon: Sparkles,
                                items: [
                                    { icon: Sparkles, label: 'Central Esot├®rica', sub: '14 ferramentas', color: '#b04a8a', action: () => handleProFeature(t.featureEsotericTools, () => nav('esoteric_hub')) },
                                    { icon: Stethoscope, label: 'Detector Iyami', sub: 'Energia das m├úes', color: '#b04a8a', action: () => handleProFeature(t.featureEsotericTools, () => nav('esoteric_hub')) },
                                    { icon: Lock, label: 'Leitor de Press├ígios', sub: 'Base de press├ígios', color: '#b04a8a', action: () => handleProFeature(t.featureEsotericTools, () => nav('esoteric_hub')) },
                                    { icon: RefreshCw, label: 'Mandala do Odu', sub: 'Geometria sagrada', color: '#9b6dd4', action: () => nav('mandala') },
                                    { icon: Stars, label: 'B├║ssola Sagrada', sub: 'Dire├º├Áes espirituais', color: '#9b6dd4', action: () => handleStudentOrProFeature('Igbadu Virtual', () => nav('igbadu')) },
                                    { icon: CircleDot, label: 'Mais Ferramentas', sub: 'E muito mais...', color: 'rgba(176,74,138,0.5)', action: () => handleProFeature(t.featureEsotericTools, () => nav('esoteric_hub')) },
                                ]
                            },
                            {
                                title: 'Magia e Rituais', color: '#d44a4a', icon: Hammer,
                                items: [
                                    { icon: Hammer, label: 'Casa de Ogun', sub: 'Akos├¿, ├ôf├▓, ├îw├▓s├án...', color: '#d44a4a', action: () => handleProFeature(t.featureOogun, () => nav('oogun')) },
                                    { icon: Move, label: 'Simulador de Eb├│s', sub: 'Jogo de sele├º├úo', color: '#d44a4a', action: () => handleProFeature(t.featureEboSim, () => nav('ebo_sim')) },
                                    { icon: Leaf, label: 'Ervas & Rem├®dios', sub: 'Identificador por IA', color: '#4ab87a', action: () => handleStudentOrProFeature(t.featureHerbID, () => nav('herb_id')) },
                                    { icon: UserCheck, label: 'Assentamentos', sub: 'Guia & Cat├ílogo', color: '#d44a4a', action: () => handleProFeature(t.featureAssentamentos, () => nav('assentamentos')) },
                                    { icon: Scale, label: 'Julgamento de S├áng├│', sub: 'Veredicto divino', color: 'rgba(212,74,74,0.7)', action: () => handleStudentOrProFeature(t.featureSangoWheel, () => nav('sango_wheel')) },
                                    { icon: CircleDot, label: 'Mais Ferramentas', sub: 'E muito mais...', color: 'rgba(212,74,74,0.4)', action: () => handleProFeature(t.featureOogun, () => nav('oogun')) },
                                ]
                            },
                            {
                                title: 'Voz & Som', color: '#4ab8d4', icon: Mic,
                                items: [
                                    { icon: Mic, label: 'Comandante de Voz', sub: 'Assistente de voz', color: '#4ab8d4', action: () => handleProFeature(t.featureVoiceCommand, () => setView('voice_commander')) },
                                    { icon: Music, label: 'Central de Sons', sub: 'Todos os sons', color: '#4ab8d4', action: () => handleStudentOrProFeature(t.featureSacredSounds, () => nav('sound_hub')) },
                                    { icon: Stars, label: 'C├ónticos de If├í', sub: 'C├ónticos com s├¡ntese', color: '#4ab8d4', action: () => handleStudentOrProFeature(t.featureSacredSounds, () => nav('sound_hub')) },
                                    { icon: CircleDot, label: 'Sons dos Odus', sub: 'Frequ├¬ncia 432Hz', color: '#4ab8d4', action: () => nav('constellation') },
                                    { icon: Activity, label: 'Misturador Natural', sub: 'Chuva, vento, rio, fogo', color: 'rgba(74,184,212,0.6)', action: () => handleStudentOrProFeature(t.featureSacredSounds, () => nav('sound_hub')) },
                                    { icon: CircleDot, label: 'Mais Sons', sub: 'E muito mais...', color: 'rgba(74,184,212,0.4)', action: () => handleStudentOrProFeature(t.featureSacredSounds, () => nav('sound_hub')) },
                                ]
                            },
                            {
                                title: 'Marketing & Cria├º├úo', color: '#8b5cf6', icon: Sparkles,
                                items: [
                                    { icon: Video, label: 'Est├║dio de Redes', sub: 'Roteiros de IA', color: '#8b5cf6', action: () => handleProFeature('Social Media Studio', () => nav('social_studio')) },
                                ]
                            },
                        ].map((section, si) => (
                            <div key={si} style={{ background: `linear-gradient(160deg, ${section.color}08 0%, rgba(10,11,15,0.9) 100%)`, border: `1px solid ${section.color}20`, borderRadius: 14, overflow: 'hidden' }}>
                                {/* Section Header */}
                                <div style={{ padding: '12px 14px 10px', borderBottom: `1px solid ${section.color}15`, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 22, height: 22, borderRadius: 6, background: `${section.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <section.icon size={11} style={{ color: section.color }} />
                                    </div>
                                    <span style={{ fontSize: 10, fontWeight: 700, color: section.color, letterSpacing: '1.5px', textTransform: 'uppercase' }}>{section.title}</span>
                                </div>
                                {/* Items */}
                                <div style={{ padding: '8px 6px' }}>
                                    {section.items.map((item, i) => (
                                        <button key={i} onClick={() => { setHomeSearch(''); item.action(); }} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 8px', borderRadius: 8, background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 180ms ease' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${section.color}10`; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                                            <div style={{ width: 28, height: 28, borderRadius: 7, background: `${item.color}15`, border: `1px solid ${item.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <item.icon size={12} style={{ color: item.color }} />
                                            </div>
                                            <div>
                                                <div style={{ fontSize: 10.5, fontWeight: 600, color: '#E8DCC2', lineHeight: 1.2 }}>{item.label}</div>
                                                <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.35)', lineHeight: 1.2 }}>{item.sub}</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ÔöÇÔöÇ CENTRO OPERACIONAL ÔöÇÔöÇ */}
                    <div className="neo-section-header" style={{ marginTop: 8 }}>
                        <span className="neo-section-title" style={{ color: 'rgba(196,158,48,0.85)', fontSize: 10 }}>Ôèò Centro Operacional do Sacerdote</span>
                        <div className="neo-section-line" />
                    </div>
                    <div className="neo-op-metrics flex flex-wrap gap-3" style={{ marginBottom: 20 }}>
                        {[
                            { img: '/babalawo_consulta.png', label: 'Consultas', value: heroStats.totalCount || '06', color: '#C49E30', action: () => nav('history') },
                            { img: '/ebo_ritual.png', label: 'Eb├│s', value: '02', color: '#e2b84a', action: () => handleProFeature(t.featureEboSim, () => nav('ebo_sim')) },
                            { img: '/ebo_ritual.png', label: 'Bori', value: '01', color: '#4ab87a', action: () => handleProFeature(t.featureBori, () => nav('ebori')) },
                            { img: '/oxossi_evento.png', label: 'Assentamentos', value: '01', color: '#b04a8a', action: () => handleProFeature(t.featureAssentamentos, () => nav('assentamentos')) },
                            { img: '/babalawo_consulta.png', label: 'Clientes aguardando', value: heroStats.pendingCount || '03', color: '#50a0e0', action: () => nav('history') },
                            { img: '/yoruba_elder.png', label: 'Materiais pendentes', value: '02', color: '#C49E30', action: () => handleProFeature(t.featureInventory, () => nav('inventory_hub')) },
                        ].map((m, i) => (
                            <button key={i} onClick={m.action} style={{ background: 'linear-gradient(160deg, rgba(196,158,48,0.06), rgba(10,11,15,0.9))', border: '1px solid rgba(196,158,48,0.15)', borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, position: 'relative', overflow: 'hidden', flex: 1, minWidth: 100, cursor: 'pointer', transition: 'transform 0.2s ease, border-color 0.2s ease', textAlign: 'center' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,158,48,0.4)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,158,48,0.15)'; }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 60, overflow: 'hidden', opacity: 0.18 }}>
                                    <img src={m.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.3)' }} />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(10,11,15,1))' }} />
                                </div>
                                <div style={{ fontSize: 28, fontFamily: 'Cinzel, serif', fontWeight: 700, color: m.color, lineHeight: 1, zIndex: 1 }}>{m.value}</div>
                                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', textAlign: 'center', letterSpacing: '0.5px', zIndex: 1 }}>{m.label}</div>
                            </button>
                        ))}
                    </div>

                    <div className="neo-op-lower">
                        {/* LINHA DO TEMPO */}
                        <div className="neo-op-panel">
                            <div className="neo-op-panel-title"><Activity size={11} /> Linha do Tempo do Dia</div>
                            {timelineItems.map((item, i) => (
                                <div key={i} className="neo-timeline-item">
                                    <span className="neo-timeline-time">{item.time}</span>
                                    <div className="neo-timeline-dot" style={{ background: item.color }} />
                                    <div><div className="neo-timeline-label">{item.label}</div><div className="neo-timeline-sub">{item.sub}</div></div>
                                </div>
                            ))}
                        </div>

                        {/* PREPARA├ç├âO RITUAL ÔÇö com imagem */}
                        <div className="neo-op-panel" style={{ padding: 0, overflow: 'hidden' }}>
                            <div style={{ position: 'relative', height: 110 }}>
                                <img src="/ebo_ritual.png" alt="Prepara├º├úo Ritual" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,11,15,0.3), rgba(10,11,15,0.95))' }} />
                                <div style={{ position: 'absolute', bottom: 10, left: 14 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <FlaskConical size={10} style={{ color: '#C49E30' }} />
                                        <span style={{ fontSize: 9, letterSpacing: '2px', color: 'rgba(196,158,48,0.8)', textTransform: 'uppercase', fontWeight: 700 }}>Prepara├º├úo Ritual</span>
                                    </div>
                                    <div style={{ fontSize: 11, color: '#E8DCC2', fontWeight: 600 }}>Pr├│ximo Eb├┤</div>
                                </div>
                            </div>
                            <div style={{ padding: '10px 14px 14px' }}>
                                {['Obi','Atar├¬','Orobo','Mel','├ügua','Ervas'].map((it, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: '1px solid rgba(196,158,48,0.05)' }}>
                                        <div style={{ width: 14, height: 14, borderRadius: 3, border: '1px solid rgba(196,158,48,0.3)', background: i < 2 ? 'rgba(74,184,122,0.3)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            {i < 2 && <Check size={9} color="#4ab87a" />}
                                        </div>
                                        <span style={{ fontSize: 11, color: i < 2 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.7)', textDecoration: i < 2 ? 'line-through' : 'none' }}>{it}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FLUXO RITUAL */}
                        <div className="neo-op-panel">
                            <div className="neo-op-panel-title"><RefreshCw size={11} /> Fluxo Ritual</div>
                            {['Consulta','Odu','Interpreta├º├úo','Fomomenda├º├úo','Agendamento','Prepara├º├úo','Execu├º├úo','Entrega'].map((step, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
                                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: i < 2 ? 'rgba(74,184,122,0.2)' : i === 2 ? 'rgba(196,158,48,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i < 2 ? 'rgba(74,184,122,0.4)' : i === 2 ? 'rgba(196,158,48,0.4)' : 'rgba(196,158,48,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, color: i < 2 ? '#4ab87a' : i === 2 ? '#C49E30' : 'rgba(255,255,255,0.3)', flexShrink: 0, fontWeight: 700 }}>{i + 1}</div>
                                    <span style={{ fontSize: 11, color: i < 2 ? 'rgba(74,184,122,0.8)' : i === 2 ? '#E8DCC2' : 'rgba(255,255,255,0.35)' }}>{step}</span>
                                    {i === 2 && <span style={{ marginLeft: 'auto', fontSize: 8, color: '#C49E30', background: 'rgba(196,158,48,0.1)', padding: '2px 6px', borderRadius: 10 }}>HOJE</span>}
                                </div>
                            ))}
                        </div>

                        {/* AGENDA 7 DIAS ÔÇö com imagem de fundo sutil */}
                        <div className="neo-op-panel" style={{ padding: 0, overflow: 'hidden' }}>
                            <div style={{ position: 'relative', height: 90 }}>
                                <img src="/oxossi_evento.png" alt="Agenda" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4) saturate(0.7)' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,11,15,0.2), rgba(10,11,15,0.98))' }} />
                                <div style={{ position: 'absolute', bottom: 10, left: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <CalendarDays size={10} style={{ color: '#C49E30' }} />
                                    <span style={{ fontSize: 9, letterSpacing: '2px', color: 'rgba(196,158,48,0.8)', textTransform: 'uppercase', fontWeight: 700 }}>Agenda dos Pr├│ximos 7 Dias</span>
                                </div>
                            </div>
                            <div style={{ padding: '8px 14px 12px' }}>
                                {[
                                    { day: 'HOJE', date: '27 Jun', event: 'Consulta', color: '#4ab87a' },
                                    { day: 'SEXTA', date: '28 Jun', event: 'Bori', color: '#C49E30' },
                                    { day: 'S├üBADO', date: '29 Jun', event: 'Assentamento If├í', color: '#b04a8a' },
                                    { day: 'DOMINGO', date: '30 Jun', event: 'Eb├┤ de Ox├│ssi', color: '#e2b84a' },
                                    { day: 'TER├çA', date: '02 Jul', event: 'Bori Coletivo', color: '#50a0e0' },
                                ].map((ev, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', borderBottom: '1px solid rgba(196,158,48,0.05)' }}>
                                        <div style={{ minWidth: 60 }}>
                                            <div style={{ fontSize: 8, color: 'rgba(196,158,48,0.6)', fontWeight: 700, letterSpacing: '0.5px' }}>{ev.day}</div>
                                            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)' }}>{ev.date}</div>
                                        </div>
                                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: ev.color, flexShrink: 0, boxShadow: `0 0 6px ${ev.color}` }} />
                                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>{ev.event}</span>
                                    </div>
                                ))}
                                <button style={{ fontSize: 10, color: '#C49E30', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', width: '100%', textAlign: 'center' }} onClick={() => nav('agenda')}>Ver agenda completa ÔåÆ</button>
                            </div>
                        </div>
                    </div>

                    {/* ÔöÇÔöÇ AN├üLISES & INDICADORES ÔöÇÔöÇ */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <span style={{ fontSize: 9, letterSpacing: '3px', color: 'rgba(196,158,48,0.6)', textTransform: 'uppercase', fontWeight: 700 }}>Ôèò An├ílises & Indicadores</span>
                        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(196,158,48,0.25), transparent)' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 24 }}>
                        {[
                            { label: 'Consultas', value: heroStats.totalCount || 42, sub: '+22% vs. m├¬s anterior', bars: bars1, color: '#C49E30', img: '/babalawo_consulta.png' },
                            { label: 'Odus + Consultados', value: 'Ogbe Meji', bars: [50,40,70,60,80,55,90], color: '#4ab87a', isText: true, img: '/yoruba_elder.png' },
                            { label: 'Eb├┤s Realizados', value: 18, sub: '+16% vs. m├¬s anterior', bars: bars2, color: '#e2b84a', img: '/ebo_ritual.png' },
                            { label: 'Receita', value: 'R$ 8.450', sub: '+23% vs. m├¬s anterior', bars: bars1.map(v => Math.round(v * 1.2)), color: '#4ab87a', isText: true, img: '/compass_ifa.png' },
                            { label: 'Horas Atendidas', value: '36h 20m', sub: '+19% vs. m├¬s anterior', bars: bars2.map(v => Math.round(v * 0.8)), color: '#50a0e0', isText: true, img: '/ifa_moon.png' },
                            { label: 'Mapa dos Consulentes', value: null, bars: [], color: '#b04a8a', isMap: true, img: '/babalawo_consulta.png' },
                        ].map((stat, i) => (
                            <button key={i} onClick={() => nav('analytics')} style={{ background: 'linear-gradient(160deg, rgba(196,158,48,0.05), rgba(10,11,15,0.95))', border: '1px solid rgba(196,158,48,0.14)', borderRadius: 14, overflow: 'hidden', position: 'relative', cursor: 'pointer', transition: 'transform 0.2s ease, border-color 0.2s ease', padding: 0 }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,158,48,0.3)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(196,158,48,0.14)'; }}>
                                {/* Image header subtle */}
                                <div style={{ position: 'relative', height: 60, overflow: 'hidden', width: '100%' }}>
                                    <img src={stat.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35) saturate(0.6)' }} />
                                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(10,11,15,0.95))' }} />
                                    <div style={{ position: 'absolute', bottom: 8, left: 12, fontSize: 8, letterSpacing: '1.5px', color: 'rgba(196,158,48,0.55)', textTransform: 'uppercase', fontWeight: 700 }}>{stat.label}</div>
                                </div>
                                <div style={{ padding: '10px 12px 12px', width: '100%', boxSizing: 'border-box', textAlign: 'left' }}>
                                    {stat.isMap ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                            {/* Mini world map dots */}
                                            <div style={{ width: '100%', height: 50, background: 'rgba(176,74,138,0.06)', borderRadius: 6, border: '1px solid rgba(176,74,138,0.15)', position: 'relative', overflow: 'hidden' }}>
                                                {[
                                                    { x: '20%', y: '40%' }, { x: '35%', y: '30%' }, { x: '48%', y: '45%' },
                                                    { x: '55%', y: '55%' }, { x: '65%', y: '35%' }, { x: '75%', y: '50%' },
                                                    { x: '25%', y: '60%' }, { x: '80%', y: '40%' }, { x: '12%', y: '55%' },
                                                ].map((dot, di) => (
                                                    <div key={di} style={{ position: 'absolute', left: dot.x, top: dot.y, width: 4, height: 4, borderRadius: '50%', background: '#b04a8a', boxShadow: '0 0 4px #b04a8a' }} />
                                                ))}
                                            </div>
                                            <div style={{ fontSize: 10, color: 'rgba(176,74,138,0.7)', fontFamily: 'Cinzel, serif' }}>9 regi├Áes</div>
                                        </div>
                                    ) : (
                                        <>
                                            <div style={{ fontSize: stat.isText ? 18 : 26, fontFamily: 'Cinzel, serif', fontWeight: 700, color: stat.color, lineHeight: 1, marginBottom: 4 }}>{stat.value}</div>
                                            {stat.sub && <div style={{ fontSize: 9, color: '#4ab87a', marginBottom: 8 }}>Ôåæ {stat.sub}</div>}
                                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 28 }}>
                                                {stat.bars.map((h, j) => (
                                                    <div key={j} style={{ flex: 1, height: `${h}%`, background: `${stat.color}30`, borderTop: `1px solid ${stat.color}70`, borderRadius: '1px 1px 0 0' }} />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* ÔöÇÔöÇ INTELIG├èNCIA ARTIFICIAL ÔöÇÔöÇ */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <span style={{ fontSize: 9, letterSpacing: '3px', color: 'rgba(196,158,48,0.6)', textTransform: 'uppercase', fontWeight: 700 }}>Ôèò Intelig├¬ncia Artificial ÔÇö Sugest├Áes do Assistente</span>
                        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(196,158,48,0.25), transparent)' }} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                        {[
                            { icon: Sparkles, iconBg: 'rgba(196,158,48,0.15)', iconColor: '#C49E30', title: 'Hoje ├® um bom dia para...', body: 'Realizar eb├│ de prosperidade e iniciar novos projetos. Ogum abre os caminhos nesta fase lunar.', accent: '#C49E30', action: () => handleProFeature(t.featureEboSim, () => nav('ebo_sim')) },
                            { icon: Users, iconBg: 'rgba(74,184,122,0.15)', iconColor: '#4ab87a', title: 'Consulente Jo├úo', body: 'Est├í h├í 30 dias sem retorno. Considere um acompanhamento ou novo agendamento.', accent: '#4ab87a', action: () => nav('history') },
                            { icon: Zap, iconBg: 'rgba(229,85,85,0.15)', iconColor: '#e55555', title: 'Aten├º├úo', body: 'Voc├¬ ainda n├úo registrou os materiais do Eb├┤ de amanh├ú. Verifique a lista de prepara├º├úo.', accent: '#e55555', action: () => handleProFeature(t.featureInventory, () => nav('inventory_hub')) },
                        ].map((card, i) => (
                            <button key={i} onClick={card.action} style={{ background: `linear-gradient(135deg, ${card.accent}06, rgba(10,11,15,0.95))`, border: `1px solid ${card.accent}22`, borderRadius: 14, padding: '16px', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s ease, border-color 0.2s ease', textAlign: 'left', display: 'block', width: '100%' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.borderColor = `${card.accent}50`; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.borderColor = `${card.accent}22`; }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${card.accent}50, transparent)` }} />
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                    <div style={{ width: 34, height: 34, borderRadius: 10, background: card.iconBg, border: `1px solid ${card.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <card.icon size={16} style={{ color: card.iconColor }} />
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: '#E8DCC2', lineHeight: 1.2 }}>{card.title}</span>
                                </div>
                                <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{card.body}</p>
                            </button>
                        ))}
                    </div>

                    {/* ÔöÇÔöÇ ODUS RELACIONADOS / BIBLIOTECA / CALEND├üRIO ÔöÇÔöÇ */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <span style={{ fontSize: 9, letterSpacing: '3px', color: 'rgba(196,158,48,0.6)', textTransform: 'uppercase', fontWeight: 700 }}>Ôèò Odus Relacionados ÔÇó Biblioteca Inteligente ÔÇó Calend├írio Yorub├í</span>
                        <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(196,158,48,0.25), transparent)' }} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">

                        {/* ODUS RELACIONADOS */}
                        <div style={{ background: 'linear-gradient(160deg, rgba(196,158,48,0.05), rgba(10,11,15,0.95))', border: '1px solid rgba(196,158,48,0.14)', borderRadius: 14, overflow: 'hidden' }}>
                            <div style={{ position: 'relative', height: 80, overflow: 'hidden' }}>
                                <img src="/yoruba_elder.png" alt="Odus" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4) sepia(0.4)' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(10,11,15,1))' }} />
                                <div style={{ position: 'absolute', bottom: 10, left: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <CircleDot size={10} style={{ color: '#C49E30' }} />
                                    <span style={{ fontSize: 9, letterSpacing: '2px', color: 'rgba(196,158,48,0.8)', textTransform: 'uppercase', fontWeight: 700 }}>Odus Relacionados ao Odu do Dia</span>
                                </div>
                            </div>
                            <div style={{ padding: '8px 14px 12px' }}>
                                {['Ogbe Yono','Osa Meji','Otura Meji','Irosun','Iwori Meji'].map((nome, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid rgba(196,158,48,0.06)', cursor: 'pointer' }}
                                        onClick={() => nav('odu_library')}
                                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(196,158,48,0.04)'}
                                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C49E30', opacity: 0.6 }} />
                                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: 'Cinzel, serif' }}>{nome}</span>
                                        </div>
                                        <span style={{ fontSize: 9, color: 'rgba(196,158,48,0.4)' }}>H├í {i === 0 ? '2h' : `${i}d`}</span>
                                    </div>
                                ))}
                                <button style={{ fontSize: 10, color: '#C49E30', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', width: '100%', textAlign: 'center' }} onClick={() => nav('odu_library')}>Ver todos relacionados ÔåÆ</button>
                            </div>
                        </div>

                        {/* BIBLIOTECA INTELIGENTE */}
                        <div style={{ background: 'linear-gradient(160deg, rgba(80,160,224,0.05), rgba(10,11,15,0.95))', border: '1px solid rgba(80,160,224,0.14)', borderRadius: 14, overflow: 'hidden' }}>
                            <div style={{ position: 'relative', height: 80, overflow: 'hidden' }}>
                                <img src="/ifa_library.png" alt="Biblioteca" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(10,11,15,1))' }} />
                                <div style={{ position: 'absolute', bottom: 10, left: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <BookOpen size={10} style={{ color: '#50a0e0' }} />
                                    <span style={{ fontSize: 9, letterSpacing: '2px', color: 'rgba(80,160,224,0.8)', textTransform: 'uppercase', fontWeight: 700 }}>Biblioteca Inteligente</span>
                                </div>
                            </div>
                            <div style={{ padding: '8px 14px 12px' }}>
                                {[
                                    { title: 'A Energia de Ogum na Vida Cotidiana', type: 'Tratado', time: '15 min' },
                                    { title: 'Movimento e Transforma├º├úo em If├í', type: 'Estudo', time: '22 min' },
                                    { title: 'Os Caminhos da Expans├úo', type: 'Artigo', time: '18 min' },
                                ].map((text, i) => (
                                    <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(80,160,224,0.07)', cursor: 'pointer' }} onClick={() => nav('treatise')}
                                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(80,160,224,0.04)'}
                                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 1.3, marginBottom: 3 }}>{text.title}</div>
                                        <div style={{ fontSize: 9, color: 'rgba(80,160,224,0.5)' }}>{text.type} ÔÇó {text.time} de leitura</div>
                                    </div>
                                ))}
                                <button style={{ fontSize: 10, color: '#50a0e0', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', width: '100%', textAlign: 'center' }} onClick={() => nav('treatise')}>Ver mais estudos ÔåÆ</button>
                            </div>
                        </div>

                        {/* CALEND├üRIO YORUB├ü - agora no Odu do Dia, mantemos aqui como refer├¬ncia visual vazia */}
                        <div style={{ background: 'linear-gradient(160deg, rgba(196,158,48,0.04), rgba(10,11,15,0.95))', border: '1px solid rgba(196,158,48,0.12)', borderRadius: 14, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, padding: 20 }}>
                            <div style={{ fontSize: 9, letterSpacing: '2px', color: 'rgba(196,158,48,0.5)', textTransform: 'uppercase' }}>Calend├írio Lit├║rgico</div>
                            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>Veja o calend├írio completo no topo da p├ígina Ôåæ</div>
                            <button style={{ fontSize: 10, color: '#C49E30', background: 'none', border: '1px solid rgba(196,158,48,0.25)', borderRadius: 6, padding: '5px 12px', cursor: 'pointer' }} onClick={() => handleStudentOrProFeature('Igbadu Virtual', () => nav('igbadu'))}>Abrir Igbadu</button>
                        </div>
                    </div>

                </div>
                </div>
                {/* END COLUNA CENTRAL */}

                {/* ===== PAINEL LATERAL DIREITO ===== */}
                <div className="neo-right-panel">

                    {/* 1. B├ÜSSOLA */}
                    <div className="neo-widget" style={{ padding: 0, background: 'transparent', border: '1px solid rgba(196,158,48,0.18)', borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
                        <IleIfeCompass />
                    </div>




                    {/* NOVO QUIZ BANNER */}
                    <div className="neo-widget" style={{ padding: '0', border: '1px solid rgba(196,158,48,0.3)', borderRadius: 14, marginBottom: 12, background: 'linear-gradient(135deg, #0c0e14 0%, #1a1608 100%)', overflow: 'hidden', position: 'relative', cursor: 'pointer' }} onClick={() => nav('orixa_quiz')}>
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(196,158,48,0.15) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
                        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, position: 'relative', zIndex: 1 }}>
                            <div>
                                <div style={{ fontSize: 9, letterSpacing: '2px', color: '#C49E30', textTransform: 'uppercase', marginBottom: 4, fontWeight: 800 }}>Novo Or├ículo</div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: 'Georgia, serif', lineHeight: 1.2, marginBottom: 4 }}>Qual seria seu Orix├í?</div>
                                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>O or├ículo revelar├í a possibilidade de quem rege seu caminho.</div>
                            </div>
                            <div style={{ fontSize: 40, filter: 'drop-shadow(0 0 15px rgba(196,158,48,0.4))' }}>­ƒö«</div>
                        </div>
                        <div style={{ background: 'rgba(196,158,48,0.1)', padding: '8px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(196,158,48,0.15)' }}>
                            <span style={{ fontSize: 10, color: '#C49E30', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Fazer Quiz Gr├ítis</span>
                            <ChevronRight size={14} color="#C49E30" />
                        </div>
                    </div>

                    {/* 3. PR├ôXIMO EVENTO */}
                    <div className="neo-widget" style={{ padding: '12px 14px', border: '1px solid rgba(196,158,48,0.15)', borderRadius: 14, marginBottom: 12, background: 'linear-gradient(160deg, #0c0e14 0%, #08090d 100%)' }}>
                        <div style={{ fontSize: 8, letterSpacing: '2px', color: 'rgba(196,158,48,0.7)', textTransform: 'uppercase', marginBottom: 10, fontWeight: 700 }}>
                            Pr├│ximo Evento
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                            {/* Left part: Date badge + Info */}
                            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1, minWidth: 0 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(196,158,48,0.08)', border: '1px solid rgba(196,158,48,0.22)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <span style={{ fontSize: 14, fontWeight: 700, color: '#C49E30', lineHeight: 1, fontFamily: 'Cinzel, serif' }}>24</span>
                                    <span style={{ fontSize: 7, color: 'rgba(196,158,48,0.5)', textTransform: 'uppercase' }}>Jun</span>
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <div style={{ fontSize: 11.5, fontWeight: 600, color: '#E8DCC2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Eb├┤ de Ox├│ssi</div>
                                    <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Prep: 2 dias antes ├ás 5h</div>
                                </div>
                            </div>
                            {/* Right part: Small image */}
                            <img src="/oxossi_evento.png" alt="Ox├│ssi" style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover', border: '1px solid rgba(196,158,48,0.25)', flexShrink: 0 }} />
                        </div>
                    </div>

                    {/* 4. PROV├ëRBIO YORUB├ü */}
                    <div className="neo-widget" style={{ padding: '12px 14px', border: '1px solid rgba(196,158,48,0.15)', borderRadius: 14, marginBottom: 12, background: 'linear-gradient(160deg, #0c0e14 0%, #08090d 100%)' }}>
                        <div style={{ fontSize: 8, letterSpacing: '2px', color: 'rgba(196,158,48,0.7)', textTransform: 'uppercase', marginBottom: 10, fontWeight: 700 }}>
                            Prov├®rbio Yorub├í
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                            {/* Left part: Quote */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <blockquote style={{ margin: 0, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 11, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4, borderLeft: '1.5px solid rgba(196,158,48,0.3)', paddingLeft: 8 }}>
                                    "{dailyWisdom.pt}"
                                </blockquote>
                            </div>
                            {/* Right part: Small image */}
                            <img src="/yoruba_elder.png" alt="Elder" style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover', border: '1px solid rgba(196,158,48,0.25)', flexShrink: 0 }} />
                        </div>
                    </div>

                    {/* 5. VOZ & SOM */}
                    <div className="neo-widget" style={{ border: '1px solid rgba(74,184,212,0.15)', borderRadius: 14, marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                            <div style={{ width: 24, height: 24, borderRadius: 7, background: 'rgba(74,184,212,0.12)', border: '1px solid rgba(74,184,212,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Mic size={12} style={{ color: '#4ab8d4' }} />
                            </div>
                            <div className="neo-widget-title" style={{ margin: 0 }}>Voz & Som</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>C├ónticos e sons sagrados</span>
                            <button className="ds-btn-ghost" style={{ padding: '5px 10px', fontSize: 9, letterSpacing: '1px' }} onClick={() => handleStudentOrProFeature(t.featureSacredSounds, () => nav('sound_hub'))}>Ouvir</button>
                        </div>
                    </div>

                    {/* 6. ATIVIDADES RECENTES */}
                    <div className="neo-widget" style={{ border: '1px solid rgba(196,158,48,0.12)', borderRadius: 14, marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <div style={{ width: 24, height: 24, borderRadius: 7, background: 'rgba(196,158,48,0.1)', border: '1px solid rgba(196,158,48,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Activity size={12} style={{ color: '#C49E30' }} />
                            </div>
                            <div className="neo-widget-title" style={{ margin: 0 }}>Atividades Recentes</div>
                        </div>
                        {recentActivities.map((act, i) => (
                            <div key={i} className="neo-activity-item">
                                <div className="neo-activity-dot" style={{ background: act.color }} />
                                <span className="neo-activity-label">{act.label}</span>
                                <span className="neo-activity-time">{act.time}</span>
                            </div>
                        ))}
                        <button style={{ fontSize: 10, color: '#C49E30', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0 0', width: '100%', textAlign: 'left' }} onClick={() => nav('history')}>Ver todas as atividades ÔåÆ</button>
                    </div>

                    {/* 7. ATIVIDADES FUTURAS */}
                    <div className="neo-widget" style={{ border: '1px solid rgba(74,184,122,0.12)', borderRadius: 14, marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <div style={{ width: 24, height: 24, borderRadius: 7, background: 'rgba(74,184,122,0.1)', border: '1px solid rgba(74,184,122,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CalendarDays size={12} style={{ color: '#4ab87a' }} />
                            </div>
                            <div className="neo-widget-title" style={{ margin: 0 }}>Atividades Futuras</div>
                        </div>
                        {[
                            { label: 'Eb├┤ de Or├ómil├í', date: 'Amanh├ú 16:00', color: '#C49E30' },
                            { label: 'Bori para cliente', date: '30 Jun 14:00', color: '#4ab87a' },
                            { label: 'Consulta agendada', date: '01 Jul 10:30', color: '#50a0e0' },
                            { label: 'Consulta agendada', date: '02 Jul 15:00', color: '#50a0e0' },
                        ].map((it, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(74,184,122,0.06)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: it.color, boxShadow: `0 0 5px ${it.color}` }} />
                                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>{it.label}</span>
                                </div>
                                <span style={{ fontSize: 9, color: 'rgba(196,158,48,0.45)', whiteSpace: 'nowrap' }}>{it.date}</span>
                            </div>
                        ))}
                        <button style={{ fontSize: 10, color: '#4ab87a', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0 0', width: '100%', textAlign: 'left' }} onClick={() => nav('agenda')}>Ver agenda completa ÔåÆ</button>
                    </div>

                    {/* 8. PREMIUM CTA */}
                    {!isPro(userPlan) && (
                        <div className="neo-widget" style={{ border: '1px solid rgba(196,158,48,0.2)', borderRadius: 14, background: 'linear-gradient(135deg, rgba(150,100,8,0.12), rgba(10,11,15,0.9))' }}>
                            <button onClick={() => { setBlockedFeature(''); setShowPaywall(true); }}
                                style={{ width: '100%', padding: '11px', borderRadius: 8, background: 'linear-gradient(135deg, rgba(150,100,8,0.7), rgba(195,148,18,0.6))', border: '1px solid rgba(210,165,40,0.3)', cursor: 'pointer', color: '#1a0e00', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                <Crown size={12} /> Ver Planos Premium
                            </button>
                        </div>
                    )}
                </div>
                {/* END RIGHT PANEL */}

                </div>
                {/* END CENTER+RIGHT ROW */}

            </div>
            {/* END MAIN AREA */}

        </div>
        );
    };


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
                {view === 'sango_wheel' && <SangoWheel onBack={() => setView('home')} isStudent={!isPro(userPlan)} />}

                {/* OOGUN HUB COM FUNÔö£├ºÔö£├óO DE NAVEGAÔö£├ºÔö£├óO CORRETA */}
                {view === 'oogun' && <OogunHub onBack={() => setView('home')} onOpenInventory={() => setView('inventory_hub')} onConsultOracle={handleConsultOracle} />}

                {view === 'ebori' && <InteractiveEbori onBack={() => setView('home')} />}
                {view === 'herb_id' && <HerbIdentifier onBack={() => setView('home')} />}
                {view === 'dictionary' && <YorubaDictionary onBack={() => setView('home')} />}
                {view === 'oracle_hub' && <OracleHub onBack={() => setView('home')} isStudent={!isPro(userPlan)} />}
                {view === 'esoteric_hub' && <EsotericHub onBack={() => setView('home')} />}
                {view === 'reverse_odu' && <ReverseOdu onBack={() => setView('home')} isStudent={!isPro(userPlan)} />}
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
                {/* ASSENTAMENTOS COM FUNÔö£├ºÔö£├óO DE NAVEGAÔö£├ºÔö£├óO */}
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

                {view === 'encyclopedia_hub' && (
                  <EncyclopediaHub 
                    onBack={() => setView('home')} 
                    onSelectCategory={(cat) => { setEncyclopediaCategory(cat); setView('encyclopedia_category'); }}
                  />
                )}
                {view === 'encyclopedia_entity' && <EntityViewer entityId={encyclopediaEntityId} onBack={() => setView('encyclopedia_hub')} />}
                {view === 'encyclopedia_category' && (
                  <CategoryPage 
                    category={encyclopediaCategory as any} 
                    onBack={() => setView('encyclopedia_hub')} 
                    onSelectEntity={(id) => { setEncyclopediaEntityId(id); setView('encyclopedia_entity'); }}
                  />
                )}

                {view === 'articles' && <ArticlesList onBack={() => setView('home')} onOpen={handleOpenArticle} />}
                {view === 'article' && <ArticleViewer slug={articleSlug} onBack={() => setView('articles')} />}
                {view === 'mandala' && <OduMandala odu={currentOdu} onBack={() => setView('result')} />}
                {view === 'history' && <ConsultationHistory onBack={() => setView('home')} onView={(r) => { setActiveRecord(r); setView('print'); }} />}
                {view === 'register' && <div className="min-h-screen flex items-center justify-center p-4"><ClientRegistration onRegister={handleRegister} onCancel={() => setView('home')} /></div>}
                {view === 'study' && <StudyMode onBack={() => setView('home')} />}
                {view === 'odu_library' && <OduLibraryTable onBack={() => setView('home')} />}
                {view === 'admin_panel' && <AdminPanel onBack={() => setView('home')} />}
                {view === 'social_studio' && (
                    <div className="pt-20 px-4 min-h-screen">
                        <button onClick={() => setView('home')} className="mb-4 text-slate-400 hover:text-white flex items-center gap-2">
                            <ArrowLeft className="w-5 h-5" /> Voltar
                        </button>
                        <SocialMediaStudio />
                    </div>
                )}
            </div>

            {showLoginModal && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center" onClick={() => setShowLoginModal(false)}>
                    <div className="relative" onClick={e => e.stopPropagation()}>
                        <LoginScreen onSuccess={() => setShowLoginModal(false)} />
                    </div>
                </div>
            )}
            <SubscriptionModal isOpen={showPaywall} onClose={() => { if (!subscribing) { setShowPaywall(false); setSubscribeError(''); } }} onSubscribe={handleSubscribe} featureName={blockedFeature} subscribing={subscribing} subscribeError={subscribeError} onDismissError={() => setSubscribeError('')} />
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
                            {divinationMethod !== 'merindilogun' && (
                                <div className="card-selecionado text-center mb-8 bg-ifa-surface p-4 rounded-lg border border-ifa-border/30 w-full max-w-md mt-4">
                                    <p className="text-ifa-neutral text-xs uppercase mb-1">{t.oduDetected}</p>
                                    <h2 className="text-3xl font-serif text-ifa-text font-bold">{currentOdu.name}</h2>
                                </div>
                            )}
                            <div className="space-y-4 w-full max-w-md">
                                {(divinationMethod !== 'merindilogun' || cowries.filter(c => c === 'open').length > 0) && (
                                    <button onClick={() => handleInterpret()} disabled={loading.isLoading} className="w-full py-4 bg-ifa-gold text-ifa-base font-bold text-lg uppercase tracking-widest hover:opacity-90 transition-all rounded-lg shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 whitespace-normal text-center relative overflow-hidden group">
                                        {loading.isLoading ? <><Loader2 className="animate-spin" /> {loading.message}</> : t.interpret}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                    <button onClick={() => setView('home')} className="mt-12 text-ifa-wood hover:text-ifa-gold border-t border-ifa-border/30 pt-4 w-full max-w-xs">{t.cancel}</button>
                </div>
            )}

            {view === 'result' && interpretation && <div className="min-h-screen py-12"><InterpretationView data={interpretation} oduInfo={currentOdu} initialSelections={activeRecord?.selections} language={language} isStudent={!isPro(userPlan) || client?.id === 'study'} onReset={() => { setInterpretation(null); setOpele(INITIAL_OPELE); setCowries(INITIAL_COWRIES); setDivinationMethod(null); setView('input'); }} onEndSession={handleEndSession} onOpenMandala={() => setView('mandala')} /></div>}
            {view === 'print' && activeRecord && <PrintLayout record={activeRecord} onBack={() => setView('home')} onReturnToSession={interpretation ? () => setView('result') : undefined} isStudent={!isPro(userPlan) || activeRecord?.client?.id === 'study'} />}

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


            {view === 'orixa_quiz' && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <OrixaQuiz onBack={() => setView('home')} />
                </div>
            )}

            <CookieConsentBanner />
        </div>
    );
}

export default App;

