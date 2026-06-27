
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
import { AIAssistant } from './components/AIAssistant';

import { getTranslation } from './utils/i18n';
import { checkDomainLock } from './utils/security';
import { canUseFeature, incrementAnonUsage, getAnonRemaining } from './utils/anonymousTracker';
import { Feather, Loader2, Users, History, GraduationCap, X, Check, Settings, Globe, Camera, Book, Shuffle, FileText, FlaskConical, BarChart3, Package, Music, Hammer, Leaf, CircleDot, Move, GripHorizontal, Baby, UserCheck, ArrowLeft, Database, Sparkles, Mic, Scale, BookOpen, PenTool, Gamepad2, Stars, ShoppingBag, Crown, Moon, MapPin, Truck, GitBranch, LayoutGrid, Search, Sun, Sunset, CloudMoon, Quote, CalendarDays, Lock, Stethoscope, Zap, Video, Shield, Home, Bell, ChevronRight, HelpCircle, RefreshCw } from 'lucide-react';

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


    const [homeSearch, setHomeSearch] = useState('');
    const [dailyWisdom, setDailyWisdom] = useState(PROVERBS[0]);
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

    // ── isPro: true somente para planos pro_monthly e pro_annual ──
    const isPro = (plan?: string) => plan !== 'free' && plan !== 'student_monthly' && plan !== undefined;

    // ── GUARD: bloqueia acesso funcional às views exclusivas de Sacerdote (pro_monthly / pro_annual) ──
    // Estudantes e usuários free são redirecionados ao home + paywall, independente de como chegaram aqui.
    useEffect(() => {
        if (authLoading) return; // Aguarda confirmação de auth antes de agir
        const PRO_ONLY_LABELS: Partial<Record<AppView, string>> = {
            ebori:          'Bori',
            reverse_odu:    'Material Reverso',
            assentamentos:  'Assentamentos',
            ajogun:         'Diagnóstico Ajogun',
            virtual_room:   'Sala Virtual',
        };
        const featureLabel = PRO_ONLY_LABELS[view];
        if (!featureLabel) return; // View não é restrita

        if (!user) {
            // Não autenticado: vai para login
            setView('home');
            setShowLoginModal(true);
            return;
        }
        if (!isPro(userProfile?.plan)) {
            // Autenticado mas plano free ou estudante: abre paywall
            setView('home');
            setBlockedFeature(featureLabel);
            setShowPaywall(true);
        }
    }, [view, user, userProfile?.plan, authLoading]); // eslint-disable-line react-hooks/exhaustive-deps

    const requireAuth = (action: () => void) => {
        if (!user) { setShowLoginModal(true); return; }
        action();
    };



    const handleProFeature = (featureName: string, action: () => void) => {
        if (!user) { setShowLoginModal(true); return; }
        if (!isPro(userProfile?.plan)) {
            setBlockedFeature(featureName);
            setShowPaywall(true);
        } else {
            action();
        }
    };

    const handleStudentOrProFeature = (featureName: string, action: () => void) => {
        if (!user) { setShowLoginModal(true); return; }
        if (!isPro(userProfile?.plan) && userProfile?.plan !== 'student_monthly') {
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
                throw new Error('Usuário não autenticado. Faça login novamente.');
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
        if (divinationMethod === 'ikin') {
            return (<div className="w-full flex justify-center py-4"><IkinRitual key={ikinKey} opele={opele} onToggle={toggleSeed} onReset={() => { setOpele(INITIAL_OPELE); setIkinKey(k => k + 1); }} oduName={currentOdu?.name} /></div>);
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

    // Dados reais do histórico de consultas para o hero
    const heroStats = useMemo(() => {
        try {
            const raw = localStorage.getItem('ifa_consultations_v1');
            const records: ConsultationRecord[] = raw ? JSON.parse(raw) : [];
            const pending = records.filter(r => r.status !== 'completed');
            const last = records[records.length - 1];
            return {
                pendingCount: pending.length,
                totalCount: records.length,
                lastClient: last?.client?.fullName || '—',
                lastOdu: last?.odu?.name || '—',
            };
        } catch { return { pendingCount: 0, totalCount: 0, lastClient: '—', lastOdu: '—' }; }
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

    // Slim Sidebar Content for Desktop
    const SidebarSlimContent = () => {
        const nav = (v: AppView) => { setView(v); };
        const userName = (userProfile as any)?.displayName || user?.email?.split('@')[0] || 'Babaláwo';
        const initials = userName.slice(0, 2).toUpperCase();

        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', padding: '24px 0' }}>
                <div style={{ marginBottom: 32, cursor: 'pointer' }} onClick={() => nav('home')}>
                    <YorubaLogo />
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, width: '100%', alignItems: 'center' }}>
                    <button className={`ds-sidebar-slim-item ${view === 'home' ? 'active' : ''}`} onClick={() => nav('home')} title="Início">
                        <Home size={18} />
                    </button>
                    <button className="ds-sidebar-slim-item" onClick={startNewSession} title="Atendimento">
                        <Users size={18} />
                        <div style={{ position: 'absolute', top: 4, right: 4, width: 6, height: 6, borderRadius: '50%', background: '#C49E30' }} />
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'oracle_hub' ? 'active' : ''}`} onClick={() => handleStudentOrProFeature(t.featureAdvancedOracles, () => nav('oracle_hub'))} title="Divinação">
                        <CircleDot size={18} />
                    </button>
                    <button className="ds-sidebar-slim-item" onClick={() => handleStudentOrProFeature(t.featureTreatise, () => nav('treatise'))} title="Estudos">
                        <GraduationCap size={18} />
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'odu_library' ? 'active' : ''}`} onClick={() => nav('odu_library')} title="Biblioteca Odu">
                        <Book size={18} />
                    </button>
                    <button className={`ds-sidebar-slim-item ${view === 'ebori' ? 'active' : ''}`} onClick={() => handleProFeature(t.featureBori, () => nav('ebori'))} title="Rituais & Ebó">
                        <UserCheck size={18} />
                    </button>
                </div>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 24, height: 1, background: 'rgba(196,158,48,0.1)' }} />
                    <button className="ds-sidebar-slim-item" onClick={() => setShowSettings(true)} title="Configurações">
                        <Settings size={18} />
                    </button>
                    <div 
                        className="ds-sidebar-profile-avatar" 
                        style={{ border: 'none', background: 'rgba(196,158,48,0.1)', width: 32, height: 32, fontSize: 11, cursor: 'pointer', marginTop: 8 }} 
                        onClick={() => user ? setShowSettings(true) : setShowLoginModal(true)}
                        title={userName}
                    >
                        {user ? initials : '?'}
                    </div>
                </div>
            </div>
        );
    };

    // Sidebar content — shared between desktop and mobile drawer
    const SidebarContent = ({ onNav }: { onNav?: () => void }) => {
        const nav = (v: AppView) => { setView(v); onNav?.(); };
        const userName = (userProfile as any)?.displayName || user?.email?.split('@')[0] || 'Babaláwo';
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
                        <h1>IFÁ OLUWO</h1>
                        <span>CÓDEX SACERDOTAL</span>
                    </div>
                </div>

                {/* Nav Links */}
                <div style={{ flex: 1, overflowY: 'auto' }} className="scrollbar-hide">
                    <button className={`ds-sidebar-item ${view === 'home' ? 'active' : ''}`} onClick={() => nav('home')}>
                        <Home size={16} /> <span>Início</span>
                    </button>
                    
                    <button className="ds-sidebar-item mt-2" onClick={startNewSession}>
                        <Users size={16} /> 
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <span>Atendimento ao Consulente</span>
                        </div>
                        <div className="ds-sidebar-badge">{heroStats.pendingCount || 1}</div>
                    </button>

                    <button className={`ds-sidebar-item ${view === 'oracle_hub' ? 'active' : ''}`} onClick={() => handleStudentOrProFeature(t.featureAdvancedOracles, () => nav('oracle_hub'))}>
                        <CircleDot size={16} /> <span>Divinação</span>
                    </button>

                    <button className="ds-sidebar-item" onClick={() => handleStudentOrProFeature(t.featureTreatise, () => nav('treatise'))}>
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
                        <UserCheck size={16} /> <span>Rituais & Ebó</span>
                    </button>

                    <button className={`ds-sidebar-item ${view === 'oogun' ? 'active' : ''}`} onClick={() => handleProFeature(t.featureOogun, () => nav('oogun'))}>
                        <FlaskConical size={16} /> <span>Magia (Oogun)</span>
                    </button>

                    <button className={`ds-sidebar-item ${view === 'agenda' ? 'active' : ''}`} onClick={() => nav('agenda')}>
                        <CalendarDays size={16} /> <span>Calendário Litúrgico</span>
                    </button>

                    <button className="ds-sidebar-item" onClick={() => handleStudentOrProFeature(t.featureAdvancedOracles, () => nav('oracle_hub'))}>
                        <Sparkles size={16} /> <span>Oráculos Sagrados</span>
                    </button>

                    <button className={`ds-sidebar-item ${view === 'esoteric_hub' ? 'active' : ''}`} onClick={() => handleStudentOrProFeature(t.featureEsotericTools, () => nav('esoteric_hub'))}>
                        <Stars size={16} /> <span>Ferramentas Esotéricas</span>
                    </button>

                    <button className={`ds-sidebar-item ${view === 'inventory_hub' ? 'active' : ''}`} onClick={() => handleProFeature(t.featureInventory, () => nav('inventory_hub'))}>
                        <Settings size={16} /> <span>Gestão do Templo</span>
                    </button>

                    <div className="ds-sidebar-divider" style={{ margin: '24px 12px' }} />

                    <button className="ds-sidebar-item" onClick={() => setShowSettings(true)}>
                        <Settings size={16} /> <span>Configurações</span>
                    </button>
                    <button className="ds-sidebar-item">
                        <HelpCircle size={16} /> <span>Ajuda & Suporte</span>
                    </button>
                </div>

                {/* User Profile */}
                <div className="ds-sidebar-profile" style={{ margin: '16px 12px 24px', border: 'none', background: 'rgba(196,158,48,0.03)', borderRadius: 12 }} onClick={() => user ? setShowSettings(true) : setShowLoginModal(true)}>
                    <div className="ds-sidebar-profile-avatar" style={{ border: 'none', background: 'rgba(196,158,48,0.1)' }}>{user ? initials : '?'}</div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>Babaláwo</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#E8DCC2', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
                            {user ? userName : 'Visitante'}
                        </div>
                        <div style={{ fontSize: 10, color: '#C49E30', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                            {isPlanVip && <Crown size={10} />}
                            {userProfile?.plan === 'pro_annual' ? 'Plano VIP Anual' : userProfile?.plan === 'pro_monthly' ? 'VIP Mensal' : userProfile?.plan === 'student_monthly' ? 'Estudante' : user ? 'Plano Free' : 'Entrar'}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderHome = () => {
        const hour = new Date().getHours();
        const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
        const GreetIcon = hour < 12 ? Sun : hour < 18 ? Sunset : CloudMoon;
        const displayName = (userProfile as any)?.displayName || user?.email?.split('@')[0] || 'Babaláwo';
        const lastOduName = heroStats.lastOdu !== '—' ? heroStats.lastOdu : 'OGBE MEJI';

        const nav = (v: AppView) => setView(v);

        return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#070707' }}>

            {/* ===== SIDEBAR DESKTOP ===== */}
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

            {/* ===== MAIN CONTENT ===== */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', overflowY: 'auto' }} className="scrollbar-hide">
                <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', padding: '32px 40px 64px' }}>

                    {/* ── TOPBAR ── */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
                        {/* Left: Brand / Logo Text */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: 9, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'rgba(196,158,48,0.7)', marginBottom: 2 }}>
                                Sistema de Divinação
                            </div>
                            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 700, color: '#E8DCC2', margin: 0, letterSpacing: '2px', lineHeight: 1 }}>
                                IFÁ OLUWO
                            </h2>
                        </div>

                        {/* Right: actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            {/* Bell */}
                            <button
                                style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(196,158,48,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', cursor: 'pointer', color: 'rgba(196,158,48,0.5)', position: 'relative', flexShrink: 0 }}
                                title="Notificações"
                            >
                                <Bell size={17} />
                                <div style={{ position: 'absolute', top: 9, right: 9, width: 6, height: 6, borderRadius: '50%', background: '#C49E30', border: '1px solid #070707' }} />
                            </button>

                            {/* Assistente AI */}
                            <button
                                className="ds-btn-primary"
                                style={{ padding: '0 20px', height: 40, fontSize: 11, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}
                                onClick={() => handleProFeature(t.featureVoiceCommand, () => setView('voice_commander'))}
                            >
                                <Sparkles size={13} /> Assistente
                            </button>

                            {/* Mobile hamburger */}
                            <button
                                className="md:hidden"
                                onClick={() => setSidebarOpen(true)}
                                style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(196,158,48,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', cursor: 'pointer', color: 'rgba(196,158,48,0.6)', flexShrink: 0 }}
                            >
                                <GripHorizontal size={20} />
                            </button>
                        </div>
                    </div>

                    {/* ── HERO GRID (2 colunas) ── */}
                    <div className="p1-layout" style={{ marginBottom: 40 }}>
                        {/* LEFT: ODU GRANDE (Now with Image Background) */}
                        <div
                            className="p1-card p1-odu-large hero-btn"
                            style={{ 
                                cursor: 'pointer', 
                                position: 'relative', 
                                overflow: 'hidden',
                                backgroundImage: 'url(/opon_ifa_hero.png)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                border: '1px solid rgba(196,158,48,0.2)',
                                boxShadow: 'inset 0 0 80px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.5)',
                            }}
                            onClick={() => handleStudentOrProFeature('Igbadu Virtual', () => setView('igbadu'))}
                        >
                            {/* Dark overlay for readability */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,12,18,0.95) 0%, rgba(7,12,18,0.4) 100%)', pointerEvents: 'none' }} />

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ fontSize: 9, letterSpacing: '3px', textTransform: 'uppercase', color: '#E8DCC2', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#C49E30', boxShadow: '0 0 6px rgba(196,158,48,0.8)' }} />
                                    Odu do Dia
                                    <div style={{ marginLeft: 'auto', fontSize: 8, color: 'rgba(232,220,194,0.6)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                        <RefreshCw size={10} /> Atualiza diariamente
                                    </div>
                                </div>

                                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 44, fontWeight: 800, color: '#E8DCC2', margin: '0 0 16px', letterSpacing: '2px', lineHeight: 1.1, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                                    {lastOduName.toUpperCase()}
                                </h2>
                                <p style={{ fontSize: 13, color: 'rgba(232,220,194,0.7)', lineHeight: 1.7, marginBottom: 32, maxWidth: '85%', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                                    A paciência é o pai do bom caráter. Quem espera com fé, colhe o fruto da sabedoria ancestral.
                                </p>

                                <div className="p1-odu-badges">
                                    <div className="p1-pill" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', borderColor: 'rgba(196,158,48,0.3)' }}>
                                        <span className="p1-pill-label" style={{ color: 'rgba(232,220,194,0.6)' }}>Elemento</span>
                                        <span className="p1-pill-value" style={{ color: '#E8DCC2' }}>Fogo & Água</span>
                                    </div>
                                    <div className="p1-pill" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', borderColor: 'rgba(196,158,48,0.3)' }}>
                                        <span className="p1-pill-label" style={{ color: 'rgba(232,220,194,0.6)' }}>Orixá</span>
                                        <span className="p1-pill-value" style={{ color: '#E8DCC2' }}>Ogun & Yemanjá</span>
                                    </div>
                                    <div className="p1-pill" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', borderColor: 'rgba(196,158,48,0.3)' }}>
                                        <span className="p1-pill-label" style={{ color: 'rgba(232,220,194,0.6)' }}>Vibração</span>
                                        <span className="p1-pill-value green" style={{ color: '#4ab87a' }}>Positiva (Ire)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: stats + quote + voz */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {/* Row: 2 stat cards */}
                            <div className="p1-stat-row">
                                <div className="p1-card p1-stat-card" style={{ cursor: 'pointer' }} onClick={startNewSession}>
                                    <div className="label"><Users size={11} /> Atendimentos</div>
                                    <div>
                                        <div className="value">{heroStats.totalCount}</div>
                                        <div className="desc">{heroStats.pendingCount} pendentes</div>
                                    </div>
                                    <div className="action">INICIAR SESSÃO <ChevronRight size={11} /></div>
                                </div>
                                <div className="p1-card p1-stat-card" style={{ cursor: 'pointer' }} onClick={() => setView('agenda')}>
                                    <div className="label"><CalendarDays size={11} /> Litúrgico</div>
                                    <div>
                                        <div className="value">14</div>
                                        <div className="desc">dias para Orunmila</div>
                                    </div>
                                    <div className="action">VER AGENDA <ChevronRight size={11} /></div>
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="p1-card p1-quote-card">
                                <div className="p1-quote-text">
                                    "{dailyWisdom.pt}"
                                </div>
                                <div style={{ marginTop: 16, fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(196,158,48,0.4)' }}>
                                    Provérbio Iorubá — Corpus de Ifá
                                </div>
                            </div>

                            {/* Voice card */}
                            <div className="p1-card p1-voice-card">
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1 }}>
                                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(196,158,48,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(196,158,48,0.25)', flexShrink: 0 }}>
                                        <Mic size={18} style={{ color: '#C49E30' }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 600, color: '#E8DCC2', letterSpacing: '0.5px' }}>Comando de Voz</div>
                                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>Diga "Ifá, consultar Oráculo"</div>
                                    </div>
                                </div>
                                <button
                                    className="ds-btn-ghost"
                                    style={{ padding: '7px 14px', fontSize: 9, letterSpacing: '1.5px', flexShrink: 0 }}
                                    onClick={() => handleProFeature(t.featureVoiceCommand, () => setView('voice_commander'))}
                                >
                                    ATIVAR
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── BÚSSOLA + CALENDÁRIO (estava na sidebar original) ── */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
                        <div className="glass-card-no-clip rounded-xl" style={{ background: 'rgba(20,80,45,0.12)', borderColor: 'rgba(30,150,80,0.2)' }}>
                            <IleIfeCompass />
                        </div>
                        <div className="glass-card-no-clip rounded-xl">
                            <YorubaCalendarWidget onOpenIgbadu={() => handleStudentOrProFeature('Igbadu Virtual', () => setView('igbadu'))} />
                        </div>
                    </div>

                    {/* ── SEÇÕES ORIGINAIS RESTAURADAS ── */}
                    <div className="space-y-6 md:space-y-8 mt-12">
                        {/* Conhecimento */}
                        <div>
                            <div className="section-label" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', color: 'rgba(196,158,48,0.8)' }}>{t.sectionKnowledge}</span>
                                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(210,165,40,0.3), transparent)' }}></div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3.5">
                                <GlassCard onClick={() => nav('odu_library')} label={t.menuOduLibrary} icon={Book} theme="gold" />
                                <GlassCard onClick={() => handleStudentOrProFeature(t.featureTreatise, () => nav('treatise'))} label={t.menuTreatise} icon={BookOpen} theme="gold" />
                                <GlassCard onClick={() => handleStudentOrProFeature(t.featurePrayers, () => nav('prayers'))} label={t.menuPrayers} icon={Book} theme="blue" />
                                <GlassCard onClick={() => nav('amutorunwa')} label={t.menuYorubaNames} icon={Baby} theme="wine" />
                                <GlassCard onClick={() => nav('dictionary')} label={t.menuDictionary} icon={Book} theme="white" />
                                <GlassCard onClick={() => handleProFeature(t.featureRPG, () => nav('story_mode'))} label={t.menuRPG} icon={Gamepad2} theme="white" />
                            </div>
                        </div>

                        {/* Esotérico */}
                        <div>
                            <div className="section-label" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', color: 'rgba(196,158,48,0.8)' }}>{t.sectionEsoteric}</span>
                                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(180,60,130,0.25), transparent)' }}></div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3.5">
                                <button onClick={() => { const flash = document.createElement('div'); flash.style.cssText = 'position:fixed;inset:0;background:rgba(255,100,50,0.08);pointer-events:none;z-index:9999;animation:flash-trovao 0.3s ease forwards;'; document.body.appendChild(flash); setTimeout(() => flash.remove(), 300); setHomeSearch(''); handleProFeature(t.featureVoiceCommand, () => setView('voice_commander')); }}
                                    className="voz-trovao md:col-span-3 glass-card glass-hero-gold rounded-2xl h-[60px] flex items-center justify-center gap-3 px-5 text-white cursor-pointer mb-2">
                                    <Mic size={20} className="shrink-0 drop-shadow-md opacity-90" />
                                    <span className="text-xs uppercase tracking-widest font-medium drop-shadow-md">{t.menuVoiceThunder}</span>
                                </button>
                                <GlassCard onClick={() => handleStudentOrProFeature(t.featureAdvancedOracles, () => nav('oracle_hub'))} label={t.menuOracleHub} icon={CircleDot} variant="purple" theme="purple" />
                                <GlassCard onClick={() => handleStudentOrProFeature(t.featureEsotericTools, () => nav('esoteric_hub'))} label={t.menuEsotericTools} icon={Sparkles} variant="purple" theme="purple" />
                                <GlassCard onClick={() => handleProFeature(t.featureBori, () => nav('ebori'))} label={t.menuBori} icon={UserCheck} variant="purple" theme="green" proOnly />
                                <GlassCard onClick={() => handleProFeature(t.featureReverseMath, () => nav('reverse_odu'))} label={t.menuReverseMath} icon={Database} variant="purple" theme="red" proOnly />
                                <GlassCard onClick={() => handleProFeature(t.featureEboSim, () => nav('ebo_sim'))} label={t.menuEboSim} icon={Move} variant="purple" theme="green" proOnly />
                                <GlassCard onClick={() => handleStudentOrProFeature(t.featureSacredSounds, () => nav('sound_hub'))} label={t.menuSacredSounds} icon={Music} variant="purple" theme="acqua" />
                                <GlassCard onClick={() => nav('dream_journal')} label={t.menuDreamJournal} icon={Moon} variant="purple" />
                            </div>
                        </div>

                        {/* Magia */}
                        <div>
                            <div className="section-label" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', color: 'rgba(196,158,48,0.8)' }}>{t.sectionMagic}</span>
                                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(200,50,50,0.25), transparent)' }}></div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3.5">
                                <GlassCard onClick={() => handleStudentOrProFeature(t.featureSangoWheel, () => nav('sango_wheel'))} label={t.menuSangoWheel} icon={Scale} theme="orange" />
                                <GlassCard onClick={() => handleProFeature(t.featureOogun, () => nav('oogun'))} label={t.menuOogun} icon={FlaskConical} theme="green" proOnly />
                                <GlassCard onClick={() => handleStudentOrProFeature(t.featureHerbID, () => nav('herb_id'))} label={t.menuHerbID} icon={Leaf} theme="lime" />
                                <GlassCard onClick={() => handleProFeature(t.featureAssentamentos, () => nav('assentamentos'))} label={t.menuAssentamentos} icon={Hammer} theme="gold" proOnly />
                                <GlassCard onClick={() => handleStudentOrProFeature(t.featureHerbMap, () => nav('geo_herbs'))} label={t.menuHerbMap} icon={MapPin} />
                                <GlassCard onClick={() => handleProFeature(t.featureAjogun, () => nav('ajogun'))} label={t.menuAjogun} icon={Stethoscope} theme="red" proOnly />
                            </div>
                        </div>

                        {/* Gestão */}
                        <div>
                            <div className="section-label" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', color: 'rgba(196,158,48,0.8)' }}>{t.sectionManagement}</span>
                                <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(50,100,220,0.25), transparent)' }}></div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3.5">
                                <GlassCard onClick={() => handleProFeature(t.featureInventory, () => nav('inventory_hub'))} label={t.menuInventory} icon={Package} theme="gold" proOnly />
                                <GlassCard onClick={() => nav('agenda')} label={t.menuAgenda} icon={CalendarDays} theme="sapphire" />
                                <GlassCard onClick={() => handleStudentOrProFeature(t.featureLineage, () => nav('lineage_tree'))} label={t.menuLineage} icon={GitBranch} />
                                <GlassCard onClick={() => handleStudentOrProFeature(t.featureAnalytics, () => nav('analytics'))} label={t.menuAnalytics} icon={BarChart3} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
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

            {view === 'result' && interpretation && <div className="min-h-screen py-12"><InterpretationView data={interpretation} oduInfo={currentOdu} initialSelections={activeRecord?.selections} language={language} isStudent={userProfile?.plan === 'student_monthly'} onReset={() => { setInterpretation(null); setOpele(INITIAL_OPELE); setCowries(INITIAL_COWRIES); setDivinationMethod(null); setView('input'); }} onEndSession={handleEndSession} onOpenMandala={() => setView('mandala')} /></div>}
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
