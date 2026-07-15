import React, { useEffect, useState } from 'react';
import { Cookie, X } from 'lucide-react';

const CookieConsentBanner: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('ifa_cookie_consent');
        if (!consent) setVisible(true);
    }, []);

    const accept = () => {
        localStorage.setItem('ifa_cookie_consent', 'accepted');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[200] bg-ifa-base-dark border-t border-ifa-gold/20 p-4 shadow-2xl animate-fade-in">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-3 text-ifa-text text-sm flex-1">
                    <Cookie size={20} className="text-ifa-gold shrink-0" />
                    <span>
                        Este site utiliza cookies e tecnologias essenciais para funcionamento. 
                        Ao continuar navegando, você aceita nossa{' '}
                        <button onClick={() => window.dispatchEvent(new CustomEvent('open-legal', { detail: 'privacy' }))} className="text-ifa-gold underline hover:text-yellow-300">
                            Política de Privacidade
                        </button>{' '}
                        e{' '}
                        <button onClick={() => window.dispatchEvent(new CustomEvent('open-legal', { detail: 'terms' }))} className="text-ifa-gold underline hover:text-yellow-300">
                            Termos de Uso
                        </button>
                        .
                    </span>
                </div>
                <div className="flex gap-2 shrink-0">
                    <button onClick={accept} className="px-6 py-2 bg-ifa-gold text-ifa-base font-bold uppercase text-xs tracking-widest rounded hover:opacity-90 transition-all">
                        Aceitar
                    </button>
                    <button onClick={() => setVisible(false)} className="px-3 py-2 text-ifa-neutral hover:text-white border border-ifa-border rounded" aria-label="Fechar">
                        <X size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsentBanner;
