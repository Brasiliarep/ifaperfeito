
import React, { useState, useEffect } from 'react';
import { Lock, ShieldAlert, Unlock } from 'lucide-react';

const LockScreen = ({ onUnlock }: { onUnlock: () => void }) => {
    const [clickCount, setClickCount] = useState(0);
    const [currency, setCurrency] = useState({ symbol: '$', name: 'USD', p1: '99', p2: '189' });

    useEffect(() => {
        const lang = navigator.language;
        if (lang === 'pt-BR') {
            setCurrency({ symbol: 'R$', name: 'BRL', p1: '99,00', p2: '189,00' });
        } else if (['pt-PT', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'nl-NL'].some(l => lang.includes(l))) {
            setCurrency({ symbol: '€', name: 'EUR', p1: '99.00', p2: '189.00' });
        }
    }, []);

    // Lógica de desbloqueio melhorada para Samsung
    const handleUnlockAttempt = (e: React.MouseEvent | React.TouchEvent) => {
        // Previne zoom ou seleção de texto
        e.preventDefault();
        e.stopPropagation();

        const newCount = clickCount + 1;
        setClickCount(newCount);

        if (newCount >= 5) {
            localStorage.setItem('ifa_dev_mode', 'true');
            // Pequena vibração se o celular suportar
            if (navigator.vibrate) navigator.vibrate(200);
            alert('🔓 Modo Desenvolvedor Ativado! Acesso liberado.');
            onUnlock();
            setClickCount(0);
        }

        // Reseta contagem se parar de clicar por 2 segundos
        const timer = setTimeout(() => setClickCount(0), 2000);
        return () => clearTimeout(timer);
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-[#1a1510] text-[#F5F5DC] flex flex-col items-center justify-start md:justify-center font-serif p-6 text-center overflow-y-auto select-none touch-manipulation">
            <div className="max-w-3xl w-full flex flex-col items-center pt-8 md:pt-0">

                {/* ÁREA DE DESBLOQUEIO (BOTÃO EXPLÍCITO) */}
                <button
                    onClick={handleUnlockAttempt}
                    onTouchStart={handleUnlockAttempt}
                    className="mb-6 p-4 rounded-full bg-black/40 border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 active:scale-95 transition-all"
                    title="Área de Segurança"
                >
                    {clickCount > 0 ? (
                        <Unlock size={48} className="text-[#D4AF37] animate-pulse" />
                    ) : (
                        <Lock size={48} className="text-[#a8a29e]" />
                    )}
                </button>

                <h1 className="text-4xl md:text-5xl text-[#D4AF37] font-bold mb-4 uppercase tracking-widest">
                    Acesso Restrito
                </h1>

                <p className="text-[#a8a29e] font-sans text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                    Este sistema é protegido. Para utilizar o <strong>Ifá Oluwo</strong>, adquira uma licença oficial.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-full">
                    {/* PLANO MENSAL */}
                    <div className="bg-white/5 border border-[#5D4037] rounded-2xl p-8 flex flex-col items-center hover:bg-white/10 transition-colors">
                        <h3 className="text-[#a8a29e] font-sans text-sm font-bold uppercase tracking-widest mb-4">Licença Mensal</h3>
                        <div className="text-5xl font-bold text-white mb-2">{currency.symbol} {currency.p1}</div>
                        <p className="font-sans text-sm text-[#a8a29e] mb-6">Acesso completo por 30 dias</p>
                        <a
                            href={`https://wa.me/?text=Ola,%20quero%20adquirir%20a%20licenca%20MENSAL%20do%20Ifa%20Oluwo%20(${currency.name})`}
                            target="_blank"
                            className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] py-3 px-8 rounded-full font-sans font-bold uppercase hover:bg-[#D4AF37] hover:text-black transition-all"
                        >
                            Adquirir Agora
                        </a>
                    </div>

                    {/* PLANO ANUAL */}
                    <div className="bg-[#D4AF37]/10 border-2 border-[#D4AF37] rounded-2xl p-8 flex flex-col items-center relative transform md:scale-105 shadow-2xl">
                        <div className="absolute -top-3 bg-[#D4AF37] text-black text-xs font-bold px-4 py-1 rounded-full uppercase">Mais Popular</div>
                        <h3 className="text-[#D4AF37] font-sans text-sm font-bold uppercase tracking-widest mb-4">Licença Anual</h3>
                        <div className="text-5xl font-bold text-white mb-2">{currency.symbol} {currency.p2}</div>
                        <p className="font-sans text-sm text-[#F5F5DC] mb-6">Acesso por 12 meses (Economize)</p>
                        <a
                            href={`https://wa.me/?text=Ola,%20quero%20adquirir%20a%20licenca%20ANUAL%20do%20Ifa%20Oluwo%20(${currency.name})`}
                            target="_blank"
                            className="bg-[#D4AF37] text-black py-3 px-8 rounded-full font-sans font-bold uppercase hover:bg-white hover:scale-105 transition-all shadow-lg"
                        >
                            Adquirir Agora
                        </a>
                    </div>
                </div>

                <div className="text-[#5D4037] font-sans text-xs flex flex-col items-center gap-2">
                    <ShieldAlert size={24} />
                    <p>Desenvolvido por Babalawo Ifálore • Todos os direitos reservados.</p>
                    <p className="opacity-50">ID: {window.location.hostname}</p>
                    {clickCount > 0 && <p className="text-[#D4AF37] font-bold">Toque: {clickCount}/5</p>}
                </div>
            </div>
        </div>
    );
};

export default LockScreen;
