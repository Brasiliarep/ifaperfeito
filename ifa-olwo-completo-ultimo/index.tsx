
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import IfaBoard from './components/IfaBoard';
import InterpretationView from './components/InterpretationView';
import SettingsModal from './components/SettingsModal';
import IboRitual from './components/IboRitual';
import { OduInfo, AIInterpretation, IreOsogboType, ConsultationRecord, ClientData, BabalawoProfile, EboSelectionType, CustomRemedy, LoadingState } from './types';
import { fetchInterpretation } from './services/geminiService';
import { saveConsultation, getHistory, deleteConsultation, saveProfile, getProfile } from './services/storageService';
import { Menu, Settings, History, BookOpen, Volume2, Mic, X, ChevronLeft, ChevronRight, Loader2, MessageSquare, Lightbulb, Zap, Share2, Printer } from 'lucide-react';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useTextToSpeech } from './hooks/useTextToSpeech';
import { useTheme } from './hooks/useTheme';
import { v4 as uuidv4 } from 'uuid';
import { initSecurity, checkDomainLock } from './utils/security';

// Initialize Security Protocols
try {
    checkDomainLock();
    initSecurity();
} catch (e) {
    console.error("Security Halt");
}

const App: React.FC = () => {
    const [currentOdu, setCurrentOdu] = useState<OduInfo | null>(null);
    const [interpretation, setInterpretation] = useState<AIInterpretation | null>(null);
    const [loading, setLoading] = useState<LoadingState>({ isLoading: false });
    const [showSettings, setShowSettings] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [historyRecords, setHistoryRecords] = useState<ConsultationRecord[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<ConsultationRecord | null>(null);
    const [showIboRitual, setShowIboRitual] = useState(false);
    const [iboResult, setIboResult] = useState<IreOsogboType | null>(null);

    const { theme, toggleTheme } = useTheme();
    const { isListening, startListening, stopListening, transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const { speak, stopSpeaking, isSpeaking, browserSupportsTextToSpeech } = useTextToSpeech();

    useEffect(() => {
        setHistoryRecords(getHistory());
    }, []);

    const handleOduSelected = (odu: OduInfo) => {
        setCurrentOdu(odu);
        setShowIboRitual(true); // Start Ibo Ritual
    };

    const handleIboComplete = async (result: IreOsogboType) => {
        setIboResult(result);
        setShowIboRitual(false);
        if (currentOdu) {
            await fetchAndSetInterpretation(currentOdu, result);
        }
    };

    const fetchAndSetInterpretation = async (odu: OduInfo, iboResult: IreOsogboType) => {
        setLoading({ isLoading: true, message: `Ifá está revelando os segredos de ${odu.name} e o caminho de ${iboResult.type} (${iboResult.subType})...` });
        try {
            const lang = 'pt-BR'; // Assuming default language for now
            const aiInterpretation = await fetchInterpretation(odu, lang, iboResult);
            setInterpretation(aiInterpretation);
        } catch (error) {
            console.error("Error fetching interpretation:", error);
            // Handle error, maybe show a fallback interpretation
        } finally {
            setLoading({ isLoading: false });
        }
    };

    const handleSaveConsultation = (clientData: ClientData) => {
        if (currentOdu && interpretation && iboResult) {
            const newRecord: ConsultationRecord = {
                id: uuidv4(),
                client: clientData,
                odu: currentOdu,
                interpretation: interpretation,
                selections: {
                    general: 'none',
                    love: 'none',
                    finance: 'none',
                    health: 'none',
                    customRemedies: [],
                    mandala: { selected: false, price: 0 }
                },
                timestamp: new Date().toISOString(),
                language: 'pt-BR',
                status: 'completed',
                iboResult: iboResult, // Save Ibo result with consultation
            };
            saveConsultation(newRecord);
            setHistoryRecords(getHistory());
            setSelectedRecord(newRecord);
        }
    };

    const handleViewHistory = () => {
        setHistoryRecords(getHistory());
        setShowHistory(true);
    };

    const handleSelectHistoryRecord = (record: ConsultationRecord) => {
        setSelectedRecord(record);
        setCurrentOdu(record.odu);
        setInterpretation(record.interpretation);
        setIboResult(record.iboResult || null); // Load Ibo result
        setShowHistory(false);
    };

    const handleDeleteHistoryRecord = (id: string) => {
        if (confirm("Tem certeza que deseja deletar este registro de consulta?")) {
            deleteConsultation(id);
            setHistoryRecords(getHistory());
            if (selectedRecord?.id === id) {
                setSelectedRecord(null);
                setCurrentOdu(null);
                setInterpretation(null);
                setIboResult(null);
            }
        }
    };

    const handleBackToBoard = () => {
        setCurrentOdu(null);
        setInterpretation(null);
        setSelectedRecord(null);
        setIboResult(null);
    };

    const handleChatWithIfa = () => {
        // Implement chat functionality
        alert("Funcionalidade de Chat com Ifá em desenvolvimento!");
    };

    const handlePrintInterpretation = () => {
        // Implement print functionality
        alert("Funcionalidade de Impressão em desenvolvimento!");
    };

    return (
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-ifa-base text-ifa-text' : 'bg-ifa-base-light text-ifa-text-dark'} font-sans transition-colors duration-300`}>
            {/* Header */}
            <header className="sticky-safe top-0 bg-ifa-base-dark text-ifa-text-light p-4 shadow-lg flex justify-between items-center z-50">
                <div className="flex items-center gap-4">
                    <button onClick={() => setShowSettings(true)} className="text-ifa-gold hover:text-ifa-text transition-colors">
                        <Menu size={24} />
                    </button>
                    <h1 className="text-xl font-serif font-bold text-ifa-gold">Ifá Oluwo</h1>
                </div>
                <div className="flex items-center gap-4">
                    {currentOdu && (
                        <button onClick={handleBackToBoard} className="text-ifa-neutral hover:text-ifa-text transition-colors flex items-center gap-1">
                            <ChevronLeft size={20} />
                            <span className="hidden md:inline">Voltar ao Jogo</span>
                        </button>
                    )}
                    <button onClick={handleViewHistory} className="text-ifa-neutral hover:text-ifa-text transition-colors">
                        <History size={24} />
                    </button>
                    <button onClick={() => setShowSettings(true)} className="text-ifa-neutral hover:text-ifa-text transition-colors">
                        <Settings size={24} />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 overflow-auto">
                {showIboRitual && (
                    <IboRitual onComplete={handleIboComplete} onCancel={() => setShowIboRitual(false)} />
                )}

                {!currentOdu && !showIboRitual && (
                    <IfaBoard onOduSelected={handleOduSelected} setLoading={setLoading} />
                )}

                {currentOdu && interpretation && !showIboRitual && (
                    <InterpretationView 
                        odu={currentOdu} 
                        interpretation={interpretation} 
                        onSaveConsultation={handleSaveConsultation}
                        iboResult={iboResult}
                    />
                )}
            </main>

            {/* Loading Overlay */}
            {loading.isLoading && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] backdrop-blur-sm">
                    <div className="bg-ifa-surface p-6 rounded-lg shadow-xl flex flex-col items-center gap-4 text-ifa-text">
                        <Loader2 className="animate-spin text-ifa-gold" size={48} />
                        <p className="text-lg font-serif italic">{loading.message || "Ifá está consultando..."}</p>
                    </div>
                </div>
            )}

            {/* Modals */}
            <SettingsModal 
                isOpen={showSettings} 
                onClose={() => setShowSettings(false)} 
                currentTheme={theme} 
                toggleTheme={toggleTheme} 
                browserSupportsSpeechRecognition={browserSupportsSpeechRecognition}
                browserSupportsTextToSpeech={browserSupportsTextToSpeech}
            />

            {showHistory && (
                <div className="fixed inset-0 z-[150] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm pt-safe">
                    <div className="bg-ifa-base border border-ifa-border rounded-xl p-6 max-w-3xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto mt-8">
                        <button onClick={() => setShowHistory(false)} className="absolute top-4 right-4 text-ifa-neutral hover:text-ifa-text p-2 bg-black/20 rounded-full">
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-serif text-ifa-gold mb-6 mt-2">Histórico de Consultas</h2>
                        {
                            historyRecords.length === 0 ? (
                                <p className="text-ifa-neutral text-center">Nenhum registro de consulta encontrado.</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {historyRecords.map(record => (
                                        <div key={record.id} className="bg-ifa-surface border border-ifa-border rounded-lg p-4 flex flex-col gap-2 relative">
                                            <h3 className="text-ifa-gold font-bold text-lg">{record.client.fullName}</h3>
                                            <p className="text-ifa-text-light text-sm">Odu: {record.odu.name}</p>
                                            <p className="text-ifa-neutral text-xs">{new Date(record.timestamp).toLocaleString()}</p>
                                            {record.iboResult && (
                                                <p className="text-ifa-neutral text-xs">Ibó: <span className={`font-bold ${record.iboResult.type === 'IRE' ? 'text-green-400' : 'text-red-400'}`}>{record.iboResult.type} ({record.iboResult.subType})</span></p>
                                            )}
                                            <div className="flex gap-2 mt-2">
                                                <button onClick={() => handleSelectHistoryRecord(record)} className="px-3 py-1 bg-ifa-wood text-white text-xs rounded hover:bg-ifa-gold transition-colors">Ver Detalhes</button>
                                                <button onClick={() => handleDeleteHistoryRecord(record.id)} className="px-3 py-1 bg-red-700 text-white text-xs rounded hover:bg-red-800 transition-colors">Deletar</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
