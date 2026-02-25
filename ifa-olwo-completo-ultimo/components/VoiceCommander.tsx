
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Mic, Power, CloudLightning, Loader2, Sparkles, SkipForward, Repeat, XCircle, List, BookOpen, Hammer, MessageSquare } from 'lucide-react';
import { askVoiceOfThunder } from '../services/geminiService';
import RitualCardView from './RitualCardView';
import { OogunItem } from '../data/offlineLibrary';

// Definição de tipos para o reconhecimento de voz
interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}

interface VoiceCommanderProps {
    onBack: () => void;
    initialPrompt?: string; // NOVO: Permite auto-início
}

const VoiceCommander: React.FC<VoiceCommanderProps> = ({ onBack, initialPrompt }) => {
    // --- ESTADOS REACT ---
    const [sessionActive, setSessionActive] = useState(false);
    const [aiResponse, setAiResponse] = useState("");
    const [guidedMode, setGuidedMode] = useState(false);
    const [ritualSteps, setRitualSteps] = useState<string[]>([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);
    const [generatedRitual, setGeneratedRitual] = useState<OogunItem | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // --- REFS PARA CONTROLE LÓGICO ---
    const recognitionRef = useRef<any>(null);
    const micActiveRef = useRef(false);
    const isAISpeakingRef = useRef(false);
    const stepContainerRef = useRef<HTMLDivElement>(null);
    const guidedModeRef = useRef(false);
    const stepsRef = useRef<string[]>([]);
    const stepIndexRef = useRef(-1);

    useEffect(() => {
        guidedModeRef.current = guidedMode;
        stepsRef.current = ritualSteps;
        stepIndexRef.current = currentStepIndex;
    }, [guidedMode, ritualSteps, currentStepIndex]);

    // AUTO-START SE HOUVER INITIAL PROMPT
    useEffect(() => {
        if (initialPrompt) {
            setSessionActive(true);
            setIsProcessing(true);
            // Pequeno delay para garantir renderização antes de chamar a IA
            setTimeout(() => {
                executeAICommand(initialPrompt);
            }, 500);
        }
    }, [initialPrompt]);

    const fixPhoneticErrors = (text: string): string => {
        let t = text.toLowerCase();
        const map: Record<string, string> = {
            'corset': 'akose', 'a cor se': 'akose', 'acordo': 'akose', 'a posse': 'akose', 'a coce': 'akose',
            'e boa': 'ebó', 'e bom': 'ebó', 'o bo': 'ebó', 'ebo': 'ebó', 'é bom': 'ebó',
            'do': 'odu', 'odo': 'odu', 'audio': 'odu', 'o do': 'odu',
            'exu': 'esu', 'echo': 'esu', 'eixo': 'esu',
            'santo': 'santo', 'orixá': 'orisa',
            'próximo': 'próximo', 'seguinte': 'próximo', 'avançar': 'próximo', 'pode ir': 'próximo', 'vá': 'próximo',
            'repita': 'repita', 'repetir': 'repita', 'de novo': 'repita', 'o que': 'repita',
            'voltar': 'voltar', 'anterior': 'voltar', 'atrás': 'voltar',
            'ingrediente': 'ingredientes', 'material': 'ingredientes', 'lista': 'ingredientes',
            'preparo': 'preparo', 'fazer': 'preparo', 'modo': 'preparo', 'mão na massa': 'preparo',
            'reza': 'reza', 'ofo': 'reza', 'ofó': 'reza', 'oração': 'reza',
            'onde estou': 'onde', 'status': 'onde'
        };
        Object.keys(map).forEach(err => {
            const regex = new RegExp(`\\b${err}\\b`, 'gi');
            t = t.replace(regex, map[err]);
        });
        return t;
    };

    const cleanTextForSpeech = (text: string): string => {
        return text
            .replace(/<RITUAL_CARD>[\s\S]*?<\/RITUAL_CARD>/g, "Preparei o card com o ritual solicitado. Veja na tela.") // Remove JSON from speech
            .replace(/^[\*\-]\s*/, "") 
            .replace(/^\d+\.\s*/, "")  
            .replace(/[\[\]\(\)]/g, "") 
            .replace(/[*#_]/g, "")      
            .replace(/\//g, " ou ")     
            .replace(/\-/g, " ")        
            .replace(/\b[A-ZÀ-Ú]{3,}\b/g, (match) => { 
                return match.charAt(0) + match.slice(1).toLowerCase();
            })
            .replace(/\s+/g, " ")       
            .trim();
    };

    const setVisualState = (state: 'listening' | 'processing' | 'speaking' | 'error' | 'idle', message?: string) => {
        const iconEl = document.getElementById('status-icon');
        const textEl = document.getElementById('status-text');
        if (textEl && message) textEl.innerText = message;
        if (iconEl) {
            iconEl.classList.remove('ouvindo-ativo', 'animate-spin', 'animate-pulse');
            iconEl.style.backgroundColor = 'rgba(0,0,0,0.2)';
            iconEl.style.boxShadow = 'none';
            iconEl.style.borderColor = '#666';
            switch (state) {
                case 'listening':
                    iconEl.classList.add('ouvindo-ativo');
                    iconEl.style.backgroundColor = '#28a745';
                    iconEl.style.borderColor = '#28a745';
                    iconEl.style.boxShadow = '0 0 20px #28a745';
                    break;
                case 'processing':
                    iconEl.classList.add('animate-spin');
                    iconEl.style.borderColor = '#FFD700';
                    iconEl.style.borderTopColor = 'transparent';
                    break;
                case 'speaking':
                    iconEl.classList.add('animate-pulse');
                    iconEl.style.backgroundColor = '#007bff';
                    iconEl.style.borderColor = '#007bff';
                    iconEl.style.boxShadow = '0 0 30px #007bff';
                    break;
                case 'error':
                    iconEl.style.backgroundColor = '#dc3545';
                    iconEl.style.borderColor = '#dc3545';
                    break;
            }
        }
    };

    const startSession = () => {
        try {
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(' '));
            setSessionActive(true);
            setTimeout(() => {
                initSpeechRecognition();
            }, 300);
        } catch (e) {
            console.error("Erro ao iniciar sessão:", e);
            alert("Não foi possível acessar os recursos de áudio.");
        }
    };

    const initSpeechRecognition = () => {
        const { webkitSpeechRecognition, SpeechRecognition } = window as unknown as IWindow;
        const Recognition = SpeechRecognition || webkitSpeechRecognition;
        if (!Recognition) {
            alert("Seu navegador não suporta reconhecimento de voz.");
            return;
        }
        const recognition = new Recognition();
        recognition.continuous = false; 
        recognition.lang = 'pt-BR';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            console.log(">>> MIC LIGADO <<<");
            micActiveRef.current = true;
            const isGuided = document.getElementById('guided-indicator');
            setVisualState('listening', isGuided ? "Diga: Próximo, Ingredientes..." : "Ouvindo... Diga 'Babá'");
        };

        recognition.onerror = (event: any) => {
            if (event.error !== 'no-speech') {
                setVisualState('error', "Erro: " + event.error);
            }
        };

        recognition.onend = () => {
            if (micActiveRef.current && !isAISpeakingRef.current && !isProcessing) {
                try { recognition.start(); } catch (e) {}
            } else {
                if (!isAISpeakingRef.current && !isProcessing) setVisualState('idle', "Aguardando...");
            }
        };

        recognition.onresult = (event: any) => {
            const results = event.results;
            if (results && results[0] && results[0][0]) {
                const rawText = results[0][0].transcript;
                const text = fixPhoneticErrors(rawText);
                const transcriptEl = document.getElementById('transcript-display');
                if (transcriptEl) transcriptEl.innerText = `"${text}"`;
                processVoiceInput(text);
            }
        };

        recognitionRef.current = recognition;
        try { recognition.start(); } catch (e) { console.log("Mic já rodando"); }
    };

    const processVoiceInput = (text: string) => {
        const chamouBaba = text.includes('babá') || text.includes('baba') || text.includes('babar');
        if (chamouBaba) {
            triggerHaptic();
            if (guidedModeRef.current) {
                setGuidedMode(false);
                guidedModeRef.current = false;
                window.speechSynthesis.cancel(); 
                setCurrentStepIndex(-1);
            }
            const command = text.replace(/babá|baba|babar/gi, '').trim();
            if (command.length > 2) {
                executeAICommand(command);
            } else {
                speakText("Sim, sacerdote? Pode falar.");
            }
            return; 
        }

        if (guidedModeRef.current) {
            if (text.includes('próximo') || text.includes('seguinte') || text.includes('continuar')) {
                jumpStep(stepIndexRef.current + 1);
                return;
            }
            if (text.includes('voltar') || text.includes('anterior')) {
                jumpStep(stepIndexRef.current - 1);
                return;
            }
            if (text.includes('repita') || text.includes('de novo')) {
                jumpStep(stepIndexRef.current);
                return;
            }
            if (text.includes('pare') || text.includes('sair') || text.includes('cancelar')) {
                exitGuidedMode();
                return;
            }
            return; 
        }
    };

    const jumpStep = (index: number, prefixPhrase: string = "") => {
        if (index >= 0 && index < stepsRef.current.length) {
            setCurrentStepIndex(index);
            const content = stepsRef.current[index];
            const textToSpeak = prefixPhrase ? `${prefixPhrase} ${content}` : content;
            speakText(textToSpeak);
            scrollToTop();
        } else if (index >= stepsRef.current.length) {
            speakText("Fim do ritual. Diga 'Sair' para encerrar ou 'Voltar' para revisar.");
        } else {
            speakText("Este é o início.");
        }
    };

    const exitGuidedMode = () => {
        setGuidedMode(false);
        setCurrentStepIndex(-1);
        speakText("Saindo do modo sacerdote.");
    };

    const scrollToTop = () => {
        setTimeout(() => {
            if (stepContainerRef.current) {
                stepContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    const executeAICommand = async (command: string) => {
        micActiveRef.current = false; 
        if (recognitionRef.current) recognitionRef.current.stop();
        setIsProcessing(true);
        setVisualState('processing', "Consultando Oráculo...");
        setGeneratedRitual(null);

        try {
            // Se for initialPrompt, modifica o comando para garantir JSON
            const finalCommand = initialPrompt ? `Gere um Card Interativo de Ritual Completo (JSON) para: ${command}. Use fundamentos de Ifá, nomes em Yorubá, ingredientes reais e preparo detalhado.` : command;
            
            const response = await askVoiceOfThunder(finalCommand);
            setIsProcessing(false);
            
            // --- PARSER DE RITUAL CARD ---
            if (response.includes('<RITUAL_CARD>')) {
                const match = response.match(/<RITUAL_CARD>([\s\S]*?)<\/RITUAL_CARD>/);
                if (match && match[1]) {
                    try {
                        const ritualData = JSON.parse(match[1]);
                        setGeneratedRitual(ritualData);
                        setAiResponse(response.replace(/<RITUAL_CARD>[\s\S]*?<\/RITUAL_CARD>/g, ""));
                        // Não fala tudo se veio do clique automático, apenas avisa
                        if (!initialPrompt) {
                            speakText(`Encontrei o ritual de ${ritualData.title}. Exibindo a ficha técnica agora.`);
                        }
                    } catch (e) {
                        console.error("JSON Parse Error", e);
                        speakText("Houve um erro ao processar o card do ritual.");
                    }
                }
            } else {
                setAiResponse(response);
                if(!initialPrompt) speakText(response);
            }
        } catch (error) {
            setIsProcessing(false);
            speakText("Houve uma falha na conexão.");
        }
    };

    const speakText = (text: string) => {
        window.speechSynthesis.cancel();
        isAISpeakingRef.current = true;
        setVisualState('speaking', "Falando...");
        const cleanText = cleanTextForSpeech(text);
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.rate = 1.0;
        utterance.pitch = 0.9;
        utterance.onend = () => {
            isAISpeakingRef.current = false;
            micActiveRef.current = true;
            try { recognitionRef.current.start(); } catch(e) {}
        };
        utterance.onerror = () => {
            isAISpeakingRef.current = false;
            micActiveRef.current = true;
            try { recognitionRef.current.start(); } catch(e) {}
        };
        window.speechSynthesis.speak(utterance);
    };

    const triggerHaptic = () => {
        if (navigator.vibrate) navigator.vibrate(200);
    };

    useEffect(() => {
        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
            window.speechSynthesis.cancel();
        };
    }, []);

    // --- RENDER ---

    if (generatedRitual) {
        return <RitualCardView item={generatedRitual} onClose={() => setGeneratedRitual(null)} isAiGenerated={true} />;
    }

    if (!sessionActive) {
        return (
            <div className="min-h-screen bg-[#0f0c08] flex flex-col items-center justify-center p-6 text-center">
                <button onClick={onBack} className="absolute top-4 left-4 text-gray-500"><ArrowLeft /></button>
                <div className="mb-8 animate-pulse">
                    <CloudLightning size={80} className="text-[#D4AF37] mx-auto" />
                </div>
                <h1 className="text-3xl font-serif text-[#D4AF37] mb-2">Voz do Trovão</h1>
                <p className="text-gray-400 text-sm mb-8 max-w-xs mx-auto">
                    Assistente Sacerdotal por Voz.
                </p>
                <button 
                    id="btn-inicio"
                    onClick={startSession}
                    className="w-64 py-5 bg-gradient-to-r from-red-900 to-red-700 border-2 border-red-500 rounded-2xl text-white font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform"
                >
                    <Power size={24} /> Iniciar Sessão
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1a1510] text-[#F5F5DC] p-4 flex flex-col relative overflow-hidden">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6 z-10">
                <button onClick={() => { window.speechSynthesis.cancel(); onBack(); }} className="text-gray-400"><ArrowLeft /></button>
                <div className={`px-3 py-1 rounded-full border ${guidedMode ? 'bg-blue-900/40 border-blue-500 text-blue-200' : 'bg-black/40 border-gray-700 text-gray-400'}`}>
                    <span id="guided-indicator" className="text-[10px] font-bold uppercase">
                        {guidedMode ? `Modo Sacerdote (${currentStepIndex + 1}/${ritualSteps.length})` : "Modo Global"}
                    </span>
                </div>
            </div>

            {/* VISUALIZER */}
            <div className="flex-grow flex flex-col items-center justify-center z-10 mb-8 min-h-[30vh]">
                <div 
                    id="status-icon" 
                    className="w-32 h-32 rounded-full border-4 border-gray-600 bg-black/30 flex items-center justify-center transition-all duration-300"
                >
                    {isProcessing ? <Loader2 size={40} className="animate-spin text-[#D4AF37]" /> : <Mic size={40} className="text-white opacity-80" />}
                </div>

                <p id="status-text" className="text-sm font-bold uppercase text-[#D4AF37] mt-6 mb-2 animate-pulse text-center">
                    {isProcessing ? "Consultando Oráculo..." : "Ouvindo..."}
                </p>

                <p id="transcript-display" className="text-center text-lg italic text-gray-400 min-h-[2rem] font-serif max-w-sm">
                    {isProcessing ? "Aguarde a resposta dos Orixás..." : "..."}
                </p>

                {guidedMode && (
                    <div className="flex gap-4 mt-6">
                        <button onClick={() => jumpStep(currentStepIndex - 1)} className="p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700" title="Voltar"><Repeat size={20}/></button>
                        <button onClick={() => jumpStep(currentStepIndex + 1)} className="p-4 bg-ifa-gold text-black rounded-full hover:bg-white animate-pulse" title="Próximo"><SkipForward size={24}/></button>
                        <button onClick={exitGuidedMode} className="p-3 bg-red-900/50 text-red-200 rounded-full hover:bg-red-800" title="Sair"><XCircle size={20}/></button>
                    </div>
                )}
            </div>

            {/* CONTEÚDO (SCROLLABLE) */}
            {aiResponse && !guidedMode && (
                <div className="ai-message-card relative z-10 bg-[#0f0c08] border border-[#D4AF37]/50 rounded-xl p-6 shadow-2xl max-h-[40vh] overflow-y-auto mb-4 custom-scroll">
                    <div className="prose prose-invert prose-sm font-sans leading-relaxed text-gray-300">
                        {aiResponse.split('\n').map((line, i) => {
                            if (line.startsWith('###')) return <h3 key={i} className="text-[#D4AF37] font-bold text-lg mt-4 mb-2">{line.replace('###', '')}</h3>;
                            if (line.startsWith('**')) return <strong key={i} className="text-white block mt-2">{line.replace(/\*\*/g, '')}</strong>;
                            return <p key={i}>{line}</p>;
                        })}
                    </div>
                </div>
            )}

            {/* VISUALIZADOR DE PASSO ÚNICO (MODO SACERDOTE) */}
            {guidedMode && (
                <div ref={stepContainerRef} className="relative z-10 bg-blue-900/10 border-2 border-blue-500/50 rounded-xl p-6 mb-4 text-center shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all">
                    <p className="text-xs text-blue-400 uppercase font-bold mb-4 tracking-widest border-b border-blue-500/30 pb-2">
                        Passo {currentStepIndex + 1} de {ritualSteps.length}
                    </p>
                    <p className="text-xl md:text-2xl text-white font-serif italic leading-relaxed">
                        {currentStepIndex >= 0 ? ritualSteps[currentStepIndex] : "Aguardando início... Diga 'Próximo'."}
                    </p>
                    <div className="flex justify-center gap-2 mt-4 opacity-50">
                        <span className="text-[10px] bg-black/30 px-2 py-1 rounded flex items-center gap-1"><List size={10}/> Ingredientes</span>
                        <span className="text-[10px] bg-black/30 px-2 py-1 rounded flex items-center gap-1"><Hammer size={10}/> Preparo</span>
                        <span className="text-[10px] bg-black/30 px-2 py-1 rounded flex items-center gap-1"><BookOpen size={10}/> Reza</span>
                    </div>
                </div>
            )}

            <div className="text-center pb-4 text-[10px] text-gray-600 uppercase tracking-widest">
                Ifá Oluwo • Voz do Trovão
            </div>
        </div>
    );
};

export default VoiceCommander;
