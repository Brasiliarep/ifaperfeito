
import React, { useState, useEffect } from 'react';
import { Video, Users, Share2, Shield, X, MessageSquare, Monitor, Layout, ArrowLeft } from 'lucide-react';

interface VirtualRoomProps {
    onBack: () => void;
    mode: 'babalawo' | 'consulente';
    roomName?: string;
}

const VirtualRoom: React.FC<VirtualRoomProps> = ({ onBack, mode, roomName = "SalaIfaOluwo" }) => {
    const [isJitsiLoaded, setIsJitsiLoaded] = useState(false);
    const domain = "meet.jit.si";
    const containerId = "jitsi-container";

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://${domain}/external_api.js`;
        script.async = true;
        script.onload = () => {
            setIsJitsiLoaded(true);
            const api = new (window as any).JitsiMeetExternalAPI(domain, {
                roomName: roomName,
                width: '100%',
                height: '100%',
                parentNode: document.querySelector(`#${containerId}`),
                configOverwrite: {
                    startWithAudioMuted: false,
                    startWithVideoMuted: false,
                },
                interfaceConfigOverwrite: {
                    TOOLBAR_BUTTONS: [
                        'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                        'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                        'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                        'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                        'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                        'security'
                    ],
                },
            });

            return () => api.dispose();
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [roomName]);

    const handleShareLink = () => {
        const url = `${window.location.origin}?view=virtual_room&mode=consulente&room=${roomName}`;
        if (navigator.share) {
            navigator.share({
                title: 'Sala de Atendimento Virtual - Ifá Oluwo',
                text: 'Entre na sala de atendimento virtual para sua consulta.',
                url: url
            });
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(url);
            alert("Link de atendimento copiado para o consulente!");
        }
    };

    const isBabalawo = mode === 'babalawo';

    return (
        <div className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar (Controls & Shared Desktop) */}
            <div className={`flex flex-col ${isBabalawo ? 'w-full md:w-80' : 'w-0 overflow-hidden'} border-r border-white/10 bg-[#0f0c08] transition-all`}>
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="text-ifa-gold" size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest text-ifa-gold">Painel do Mestre</span>
                    </div>
                    <button onClick={onBack} className="text-ifa-neutral hover:text-white"><X size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div>
                        <h3 className="text-[10px] font-bold text-ifa-neutral uppercase tracking-widest mb-3">Controle de Sessão</h3>
                        <button
                            onClick={handleShareLink}
                            className="w-full bg-ifa-gold text-black py-3 rounded-lg font-bold text-xs uppercase flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg"
                        >
                            <Share2 size={16} /> Link p/ Consulente
                        </button>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                        <h3 className="text-[10px] font-bold text-ifa-neutral uppercase tracking-widest mb-3">Visão do Consulente</h3>
                        <div className="space-y-2">
                            <button className="w-full bg-white/5 border border-white/10 text-white text-left p-3 rounded-lg text-xs flex items-center justify-between group hover:border-ifa-gold transition-all">
                                <div className="flex items-center gap-2">
                                    <Layout size={14} className="text-ifa-gold" />
                                    <span>Compartilhar Odù</span>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                            </button>
                            <button className="w-full bg-white/5 border border-white/10 text-white text-left p-3 rounded-lg text-xs flex items-center justify-between group hover:border-ifa-gold transition-all">
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={14} className="text-ifa-gold" />
                                    <span>Enviar Interpretação</span>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-ifa-neutral"></div>
                            </button>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                        <div className="bg-amber-900/10 border border-amber-900/30 p-3 rounded-lg text-amber-200/50 text-[10px] italic">
                            "A voz do mestre guia, o olhar do mestre observa. Que a sabedoria flua nesta sala."
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-black/40 border-t border-white/10">
                    <button onClick={onBack} className="w-full flex items-center justify-center gap-2 text-[10px] uppercase font-bold text-ifa-neutral hover:text-white transition-all py-2">
                        <ArrowLeft size={12} /> Encerrar Atendimento
                    </button>
                </div>
            </div>

            {/* Video Main Area */}
            <div className="flex-1 flex flex-col relative">
                {!isJitsiLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0a0a0a]">
                        <div className="w-12 h-12 border-4 border-ifa-gold border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs font-bold uppercase tracking-widest text-ifa-gold animate-pulse">Iniciando Sala de Axé...</span>
                    </div>
                )}
                <div id={containerId} className="w-full h-full"></div>

                {/* Overlays for Consulente */}
                {!isBabalawo && (
                    <div className="absolute top-4 left-4 z-10">
                        <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-ifa-gold flex items-center justify-center text-black font-bold">IF</div>
                            <div>
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Mestre Babalawo</h4>
                                <p className="text-[10px] text-ifa-gold tracking-widest uppercase">Atendimento ao Vivo</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Back button for all */}
                <button
                    onClick={onBack}
                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/40 hover:bg-black/80 rounded-full flex items-center justify-center text-white border border-white/10 backdrop-blur-sm transition-all shadow-xl"
                    title="Sair"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

export default VirtualRoom;
