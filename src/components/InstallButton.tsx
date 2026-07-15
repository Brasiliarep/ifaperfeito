
import React, { useEffect, useState } from 'react';
import { Download, Share, PlusSquare, X } from 'lucide-react';

const InstallButton = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Detect iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const ios = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(ios);

        // Detect Install Prompt (Android/Desktop)
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
        };
        window.addEventListener('beforeinstallprompt', handler);

        // Check if already installed
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
        if (isStandalone) {
            setIsVisible(false);
        } else {
            // Se não estiver instalado, mostra o botão sempre. 
            // Se não houver prompt nativo, exibimos as instruções ao clicar.
            setIsVisible(true);
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (isIOS) {
            setShowInstructions(true);
        } else if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setIsVisible(false);
            }
            setDeferredPrompt(null);
        } else {
            // Fallback
            setShowInstructions(true);
        }
    };

    if (!isVisible) return null;

    return (
        <>
            <button 
                onClick={handleInstallClick}
                className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-ifa-gold text-ifa-base px-4 py-3 rounded-full text-xs font-bold uppercase shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex items-center gap-2 hover:scale-105 transition-transform"
            >
                <Download size={16} /> Instalar App
            </button>

            {showInstructions && (
                <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setShowInstructions(false)}>
                    <div className="bg-ifa-base border border-ifa-gold rounded-xl p-6 max-w-sm text-center relative" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setShowInstructions(false)} className="absolute top-2 right-2 text-ifa-neutral"><X size={20}/></button>
                        <h3 className="text-xl font-serif text-ifa-gold mb-4">Como Instalar</h3>
                        
                        {isIOS ? (
                            <div className="space-y-4 text-ifa-text text-sm">
                                <p>No iPhone/iPad, a instalação é manual:</p>
                                <ol className="text-left space-y-3 bg-ifa-base-dark p-4 rounded-lg">
                                    <li className="flex items-center gap-2">1. Toque no botão <strong>Compartilhar</strong> <Share size={16} className="text-blue-400"/> na barra do navegador.</li>
                                    <li className="flex items-center gap-2">2. Role para baixo e toque em <strong>Adicionar à Tela de Início</strong> <PlusSquare size={16} className="text-ifa-text"/>.</li>
                                    <li>3. Confirme clicando em <strong>Adicionar</strong>.</li>
                                </ol>
                            </div>
                        ) : (
                            <div className="text-ifa-text text-sm">
                                <p>Para instalar no Android ou PC:</p>
                                <p className="mt-2">Procure nos três pontinhos do navegador a opção <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default InstallButton;
