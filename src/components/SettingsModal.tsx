
import React, { useState, useEffect, useRef } from 'react';
import { BabalawoProfile } from '../types';
import { User, Phone, MapPin, Mail, Save, X, Award, Sun, Moon, Volume2, Download, Upload, Share2, Archive, Briefcase, RefreshCw, Code, Key as KeyIcon } from 'lucide-react';
import { saveProfile, getProfile, importData, downloadZipBackup, downloadSourceCode } from '../services/storageService';
import { setManualKey } from '../services/geminiService';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const SettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const [profile, setProfile] = useState<BabalawoProfile>({
        name: '',
        title: 'Babalawo',
        phone: '',
        address: '',
        email: ''
    });
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [devClicks, setDevClicks] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            const saved = getProfile();
            if (saved) setProfile(saved);

            const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' || 'dark';
            setTheme(currentTheme);

            // Safe Audio Loading
            if ('speechSynthesis' in window) {
                const loadVoices = () => {
                    const availVoices = window.speechSynthesis.getVoices();
                    if (availVoices.length > 0) {
                        setVoices(availVoices);
                    }
                };
                loadVoices();
                if (window.speechSynthesis.onvoiceschanged !== undefined) {
                    window.speechSynthesis.onvoiceschanged = loadVoices;
                }
                const prefVoice = localStorage.getItem('ifa_preferred_voice');
                if (prefVoice) setSelectedVoiceURI(prefVoice);
            }

            const savedKey = localStorage.getItem('ifa_manual_key') || '';
            setApiKey(savedKey);
            setIsAdmin(localStorage.getItem('ifa_is_admin') === 'true');
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const toggleTheme = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('ifa_theme', newTheme);
    };

    const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedVoiceURI(e.target.value);
        localStorage.setItem('ifa_preferred_voice', e.target.value);

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const v = voices.find(vo => vo.voiceURI === e.target.value);
            if (v) {
                const u = new SpeechSynthesisUtterance("Alaafia. Ifá a gbe wa o.");
                u.voice = v;
                if (v.lang.includes('yo')) u.lang = v.lang;
                window.speechSynthesis.speak(u);
            }
        }
    };

    const handleBackup = () => {
        downloadZipBackup();
    };

    const handleRestoreClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const success = await importData(e.target.files[0]);
            if (success) {
                alert("Backup restaurado com sucesso! O aplicativo será recarregado.");
                window.location.reload();
            }
            e.target.value = '';
        }
    };

    const handleSave = () => {
        saveProfile(profile);
        if (apiKey.trim().startsWith('gsk_')) {
            setManualKey(apiKey.trim());
        } else if (apiKey.trim() === '') {
            localStorage.removeItem('ifa_manual_key');
        }
        onClose();
    };

    const handleTitleClick = () => {
        const newClicks = devClicks + 1;
        setDevClicks(newClicks);
        if (newClicks === 5) {
            setIsAdmin(true);
            localStorage.setItem('ifa_is_admin', 'true');
            alert("Modo Criador do App ativado com sucesso! As configurações secretas estão visíveis.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm pt-safe">
            <div className="bg-ifa-base border border-ifa-border rounded-xl p-6 max-w-lg w-full relative shadow-2xl max-h-[90vh] overflow-y-auto mt-8">
                <button onClick={onClose} className="absolute top-4 right-4 text-ifa-neutral hover:text-ifa-text p-2 bg-black/20 rounded-full">
                    <X size={24} />
                </button>

                <h2 onClick={handleTitleClick} className="text-2xl font-serif text-ifa-gold mb-6 text-center mt-2 cursor-pointer select-none">Configurações</h2>

                {/* --- SEÇÃO DADOS/BACKUP (MOVED TO TOP) --- */}
                <div className="mb-8 border-b border-ifa-border pb-6 bg-ifa-gold/5 p-4 rounded-lg border border-ifa-gold/20">
                    <h3 className="text-ifa-gold font-bold text-sm uppercase mb-4 flex items-center gap-2"><Archive size={18} /> Segurança de Dados (Backup)</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleBackup}
                            className="p-3 bg-ifa-base-dark border border-ifa-border text-ifa-gold rounded hover:bg-ifa-wood hover:text-white transition-colors flex flex-col items-center gap-2"
                        >
                            <Download size={20} />
                            <span className="text-xs font-bold uppercase">Baixar Backup (.ZIP)</span>
                        </button>
                        <button
                            onClick={handleRestoreClick}
                            className="p-3 bg-ifa-base-dark border border-ifa-border text-ifa-text rounded hover:bg-ifa-wood hover:text-white transition-colors flex flex-col items-center gap-2"
                        >
                            <Upload size={20} />
                            <span className="text-xs font-bold uppercase">Restaurar (ZIP/JSON)</span>
                        </button>
                        <button
                            onClick={() => {
                                if (confirm("Isso irá limpar o cache do aplicativo e recarregar. Útil se o app parecer 'travado' ou offline. Continuar?")) {
                                    if ('serviceWorker' in navigator) {
                                        navigator.serviceWorker.getRegistrations().then(function (registrations) {
                                            for (let registration of registrations) {
                                                registration.unregister();
                                            }
                                            window.location.reload();
                                        });
                                    } else {
                                        window.location.reload();
                                    }
                                }
                            }}
                            className="p-3 bg-ifa-base-dark border border-ifa-border text-red-500 rounded hover:bg-ifa-wood hover:text-white transition-colors flex flex-col items-center gap-2 col-span-2"
                        >
                            <RefreshCw size={20} />
                            <span className="text-xs font-bold uppercase">Resetar Cache / Forçar Atualização</span>
                        </button>
                        <button
                            onClick={downloadSourceCode}
                            className="p-3 bg-ifa-base-dark border border-ifa-border text-ifa-neutral hover:text-ifa-text rounded hover:bg-ifa-wood transition-colors flex flex-col items-center gap-2 col-span-2"
                        >
                            <Code size={20} />
                            <span className="text-xs font-bold uppercase">Baixar Código Fonte (Projeto)</span>
                        </button>
                        <input
                            type="file"
                            accept=".json,.zip"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* --- SEÇÃO CHAVE API (Sempre visível) --- */}
                <div className="mb-8 border-b border-ifa-border pb-6 bg-amber-900/10 p-4 rounded-lg border border-amber-500/20">
                    <h3 className="text-amber-400 font-bold text-sm uppercase mb-4 flex items-center gap-2"><KeyIcon size={18} /> Chave de Acesso (Groq API)</h3>
                    <div>
                        <label className="text-ifa-neutral text-xs block mb-2 uppercase font-bold">Chave de API — necessária para leituras</label>
                        <input
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full bg-black border border-ifa-border text-white rounded p-3 focus:border-ifa-gold outline-none font-mono text-sm"
                            placeholder="gsk_..."
                        />
                        <p className="text-[10px] text-ifa-neutral mt-2 italic">Acesse <strong>console.groq.com</strong> → API Keys → Create Key. Chave gratuita. Começa com <strong>gsk_</strong>.</p>
                    </div>
                </div>

                {/* --- SEÇÃO APARÊNCIA --- */}
                <div className="mb-8 border-b border-ifa-border pb-6">
                    <h3 className="text-ifa-text font-bold text-sm uppercase mb-4 flex items-center gap-2">Aparência & Som</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <button
                            onClick={() => toggleTheme('dark')}
                            className={`p-3 rounded border flex items-center justify-center gap-2 ${theme === 'dark' ? 'bg-ifa-gold text-ifa-base font-bold border-ifa-gold' : 'bg-ifa-surface text-ifa-neutral border-ifa-border'}`}
                        >
                            <Moon size={18} /> Modo Escuro
                        </button>
                        <button
                            onClick={() => toggleTheme('light')}
                            className={`p-3 rounded border flex items-center justify-center gap-2 ${theme === 'light' ? 'bg-ifa-gold text-ifa-base font-bold border-ifa-gold' : 'bg-ifa-surface text-ifa-neutral border-ifa-border'}`}
                        >
                            <Sun size={18} /> Modo Claro
                        </button>
                    </div>

                    <div>
                        <label className="text-ifa-neutral text-sm flex items-center gap-2 mb-2"><Volume2 size={14} /> Voz de Leitura</label>
                        <select
                            value={selectedVoiceURI}
                            onChange={handleVoiceChange}
                            className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded p-3 focus:border-ifa-gold outline-none text-sm"
                        >
                            <option value="">Automático (Padrão do Sistema)</option>
                            {voices.map(v => (
                                <option key={v.voiceURI} value={v.voiceURI}>
                                    {v.name} ({v.lang})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* --- SEÇÃO PERFIL --- */}
                <div className="space-y-4">
                    <h3 className="text-ifa-text font-bold text-sm uppercase mb-2">Perfil do Sacerdote</h3>
                    <p className="text-xs text-ifa-neutral italic mb-2">Estes dados aparecerão no cabeçalho das impressões.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-ifa-neutral text-sm flex items-center gap-2 mb-1"><Briefcase size={14} /> Título</label>
                            <select name="title" value={profile.title} onChange={handleChange} className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded p-3 focus:border-ifa-gold outline-none text-sm">
                                <option value="Babalawo">Babalawo</option>
                                <option value="Iyanifa">Iyanifa</option>
                                <option value="Oluwo">Oluwo</option>
                                <option value="Bokono">Bokono</option>
                                <option value="Awo">Awo</option>
                                <option value="Babalorixá">Babalorixá</option>
                                <option value="Iyalorixá">Iyalorixá</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-ifa-neutral text-sm flex items-center gap-2 mb-1"><User size={14} /> Nome Religioso</label>
                            <input name="name" value={profile.name} onChange={handleChange} className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded p-3 focus:border-ifa-gold outline-none" placeholder="Ex: Ifálore" />
                        </div>
                    </div>

                    <div>
                        <label className="text-ifa-neutral text-sm flex items-center gap-2 mb-1"><Phone size={14} /> Telefone / WhatsApp</label>
                        <input name="phone" value={profile.phone} onChange={handleChange} className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded p-3 focus:border-ifa-gold outline-none" placeholder="(00) 00000-0000" />
                    </div>

                    <div>
                        <label className="text-ifa-neutral text-sm flex items-center gap-2 mb-1"><Mail size={14} /> E-mail</label>
                        <input name="email" value={profile.email} onChange={handleChange} className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded p-3 focus:border-ifa-gold outline-none" placeholder="contato@templo.com" />
                    </div>

                    <div>
                        <label className="text-ifa-neutral text-sm flex items-center gap-2 mb-1"><MapPin size={14} /> Endereço do Templo</label>
                        <input name="address" value={profile.address} onChange={handleChange} className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded p-3 focus:border-ifa-gold outline-none" placeholder="Rua, Número, Bairro, Cidade" />
                    </div>
                </div>

                <div className="mt-8">
                    <button
                        onClick={handleSave}
                        className="w-full py-4 bg-ifa-gold text-ifa-base font-bold uppercase tracking-widest hover:opacity-90 rounded flex items-center justify-center gap-2 shadow-lg"
                    >
                        <Save size={20} /> Salvar Configurações
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
