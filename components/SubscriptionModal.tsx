import React, { useEffect, useState, useRef } from 'react';
import { Crown, CheckCircle2, Star, Shield, Lock, X, Globe, GraduationCap, Sparkles } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubscribe: () => void;
    featureName?: string;
}

const PLAN_IDS = {
    estudante_brl: "P-9S304494S91035709NIVTAXQ",
    mensal_brl:  "P-1PL22728YL341025ANIVTAXY",
    anual_brl:   "P-3L826926MA095250FNIVTAYA",
    estudante_usd: "P-7PX300165U894823ENIVTAXY",
    mensal_usd:  "P-6C735938DC578305RNIVTAYA",
    anual_usd:   "P-7JE39745J5153271YNIVTAYA",
};

declare global {
    interface Window { paypal: any; }
}

const SubscriptionModal: React.FC<Props> = ({ isOpen, onClose, onSubscribe, featureName }) => {
    const [isBrazil, setIsBrazil] = useState(true);
    const [sdkReady, setSdkReady] = useState(false);
    const onSubscribeRef = useRef(onSubscribe);
    onSubscribeRef.current = onSubscribe;
    const buttonsRendered = useRef(false);
    const currentCurrency = useRef('');

    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

    useEffect(() => {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const lang = navigator.language || '';
        setIsBrazil(
            tz.startsWith('America/Sao_Paulo') ||
            tz.startsWith('America/Fortaleza') ||
            tz.startsWith('America/Recife') ||
            tz.startsWith('America/Belem') ||
            tz.startsWith('America/Manaus') ||
            tz.startsWith('America/Porto_Velho') ||
            tz.startsWith('America/Cuiaba') ||
            lang.startsWith('pt-BR')
        );
    }, []);

    useEffect(() => {
        buttonsRendered.current = false;
    }, [isBrazil]);

    useEffect(() => {
        if (!isOpen || !clientId || sdkReady) return;
        if (document.querySelector('script[src*="paypal.com/sdk/js"]')) {
            setSdkReady(true);
            return;
        }
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription&locale=${isBrazil ? 'pt_BR' : 'en_US'}`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        const existing = document.querySelector('script[src*="paypal.com/sdk/js"]');
        if (existing) {
            setSdkReady(true);
        } else {
            script.onload = () => setSdkReady(true);
            document.body.appendChild(script);
        }
        return () => {};
    }, [isOpen, clientId, sdkReady, isBrazil]);

    useEffect(() => {
        const currencyKey = isBrazil ? 'brl' : 'usd';
        if (!sdkReady || buttonsRendered.current || !isOpen || currencyKey === currentCurrency.current) return;

        buttonsRendered.current = true;
        currentCurrency.current = currencyKey;

        const plans = [
            { key: 'estudante', planId: isBrazil ? PLAN_IDS.estudante_brl : PLAN_IDS.estudante_usd },
            { key: 'mensal', planId: isBrazil ? PLAN_IDS.mensal_brl : PLAN_IDS.mensal_usd },
            { key: 'anual', planId: isBrazil ? PLAN_IDS.anual_brl : PLAN_IDS.anual_usd },
        ];

        const timer = setTimeout(() => {
            if (!window.paypal) return;
            plans.forEach(({ key, planId }) => {
                const container = document.getElementById(`paypal-button-${key}`);
                if (!container || container.hasChildNodes()) return;
                window.paypal.Buttons({
                    createSubscription: (_data: any, actions: any) =>
                        actions.subscription.create({ plan_id: planId }),
                    onApprove: () => onSubscribeRef.current(),
                    style: { shape: 'rect', color: 'gold', layout: 'vertical', label: 'subscribe' },
                }).render(`#paypal-button-${key}`);
            });
        }, 500);

        return () => clearTimeout(timer);
    }, [sdkReady, isOpen, isBrazil]);

    if (!isOpen) return null;

    const estudante_planId = isBrazil ? PLAN_IDS.estudante_brl : PLAN_IDS.estudante_usd;
    const mensal_planId = isBrazil ? PLAN_IDS.mensal_brl : PLAN_IDS.mensal_usd;
    const anual_planId  = isBrazil ? PLAN_IDS.anual_brl  : PLAN_IDS.anual_usd;
    const currency    = isBrazil ? 'R$' : '$';
    const estudante_price = isBrazil ? '39,90' : '29.90';
    const mensal_price = isBrazil ? '79,90' : '59.90';
    const anual_price  = isBrazil ? '575,28' : '431.28';

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-4 overflow-y-auto">
            <div className="bg-gradient-to-br from-[#1a1611] to-black border border-ifa-gold/50 rounded-2xl w-full max-w-5xl relative overflow-hidden my-8 shadow-[0_0_50px_rgba(212,175,55,0.2)]">

                <button onClick={onClose} className="absolute top-4 right-4 text-ifa-neutral hover:text-white bg-black/50 p-2 rounded-full z-10 border border-white/10">
                    <X size={24} />
                </button>

                <div className="p-8 md:p-12 text-center relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ifa-gold via-yellow-300 to-ifa-gold"></div>

                    <div className="flex justify-center mb-4">
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1 text-xs text-ifa-neutral">
                            <Globe size={12} />
                            <span>{isBrazil ? 'Preços em Real Brasileiro' : 'Prices in US Dollars'}</span>
                        </div>
                    </div>

                    <div className="mx-auto w-16 h-16 bg-ifa-gold/20 rounded-full flex items-center justify-center mb-6 text-ifa-gold ring-1 ring-ifa-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                        {featureName ? <Lock size={32} /> : <Crown size={32} />}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif text-ifa-gold font-bold uppercase tracking-widest mb-4">
                        {featureName ? (isBrazil ? 'Recurso Premium' : 'Premium Feature') : (isBrazil ? 'Eleve seu Sacerdócio' : 'Elevate Your Priesthood')}
                    </h2>
                    <p className="text-ifa-neutral text-lg max-w-3xl mx-auto mb-10">
                        {featureName
                            ? (isBrazil ? `A função "${featureName}" é exclusiva para assinantes. Escolha seu plano:`
                                : `The "${featureName}" feature is exclusive to subscribers. Choose your plan:`)
                            : (isBrazil
                                ? 'Acesse o Codex Sacerdotal completo com planos que cabem no seu bolso.'
                                : 'Get full access to the Sacred Codex with plans that fit your budget.')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">

                        {/* PLANO ESTUDANTE */}
                        <div className="bg-black/50 border border-ifa-border rounded-xl p-6 relative flex flex-col group hover:border-amber-500/40 transition-colors">
                            <div className="flex items-center gap-2 mb-3">
                                <GraduationCap size={20} className="text-amber-400" />
                                <h3 className="text-lg text-white font-bold uppercase tracking-wider">
                                    {isBrazil ? 'Estudante' : 'Student'}
                                </h3>
                            </div>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-sm text-ifa-neutral">{currency}</span>
                                <span className="text-4xl font-black text-white">{estudante_price}</span>
                                <span className="text-sm text-ifa-neutral">/{isBrazil ? 'mês' : 'mo'}</span>
                            </div>

                            <ul className="space-y-3 mb-8 flex-1 text-sm">
                                <li className="flex items-start gap-3 text-ifa-neutral"><CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" /> {isBrazil ? 'Biblioteca 256 Odùs completa' : 'Complete 256 Odù Library'}</li>
                                <li className="flex items-start gap-3 text-ifa-neutral"><CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" /> {isBrazil ? 'Modo Estudo Individual' : 'Individual Study Mode'}</li>
                                <li className="flex items-start gap-3 text-ifa-neutral"><CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" /> {isBrazil ? 'Dicionário Yorubá' : 'Yoruba Dictionary'}</li>
                                <li className="flex items-start gap-3 text-ifa-neutral"><CheckCircle2 size={16} className="text-amber-400 shrink-0 mt-0.5" /> {isBrazil ? 'Nomes Yorubá' : 'Yoruba Names'}</li>
                            </ul>

                            <div className="mt-auto text-[10px] text-amber-500/70 italic mb-3">{isBrazil ? 'Ideal para iniciantes' : 'Best for beginners'}</div>

                            <div id="paypal-button-estudante" className="min-h-[40px] w-full"></div>
                        </div>

                        {/* PLANO MENSAL */}
                        <div className="bg-gradient-to-b from-[#2a2211] to-black border-2 border-ifa-gold rounded-xl p-6 relative flex flex-col shadow-[0_0_30px_rgba(212,175,55,0.15)] transform md:-translate-y-2">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ifa-gold text-black text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap">
                                <Star size={12} /> {isBrazil ? 'Promocional' : 'Promotional'}
                            </div>

                            <h3 className="text-lg text-ifa-gold font-bold uppercase tracking-wider mb-3 mt-2">
                                {isBrazil ? 'Plano Mensal' : 'Monthly Plan'}
                            </h3>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-sm text-ifa-neutral">{currency}</span>
                                <span className="text-4xl font-black text-ifa-gold">{mensal_price}</span>
                                <span className="text-sm text-ifa-neutral">/{isBrazil ? 'mês' : 'mo'}</span>
                            </div>
                            <p className="text-xs text-green-400 mb-6 font-bold tracking-wide leading-relaxed">{isBrazil ? 'Promoção válida até 30 de setembro de 2026, voltando a R$ 99,90' : 'Promotion valid until September 30, 2026, returning to $79,90'}</p>

                            <ul className="space-y-3 mb-8 flex-1 text-sm">
                                <li className="flex items-start gap-3 text-white font-medium"><Star size={16} className="text-ifa-gold shrink-0 mt-0.5 fill-ifa-gold" /> {isBrazil ? 'Interpretação ilimitada' : 'Unlimited interpretation'}</li>
                                <li className="flex items-start gap-3 text-white font-medium"><Star size={16} className="text-ifa-gold shrink-0 mt-0.5 fill-ifa-gold" /> {isBrazil ? 'Simulador de Ebó e Magias' : 'Ebó & Magic Simulator'}</li>
                                <li className="flex items-start gap-3 text-white font-medium"><Star size={16} className="text-ifa-gold shrink-0 mt-0.5 fill-ifa-gold" /> {isBrazil ? 'Amuletos e Ferramentas Esotéricas' : 'Amulets & Esoteric Tools'}</li>
                                <li className="flex items-start gap-3 text-white font-medium"><Star size={16} className="text-ifa-gold shrink-0 mt-0.5 fill-ifa-gold" /> {isBrazil ? 'Sala de Atendimento Virtual' : 'Virtual Consultation Room'}</li>
                                <li className="flex items-start gap-3 text-white font-medium"><Star size={16} className="text-ifa-gold shrink-0 mt-0.5 fill-ifa-gold" /> {isBrazil ? 'PDF sem marca d\'água' : 'Clean PDF (No watermark)'}</li>
                                <li className="flex items-start gap-3 text-white font-medium"><Shield size={16} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Todas as ferramentas liberadas' : 'All tools unlocked'}</li>
                            </ul>

                            <div id="paypal-button-mensal" className="min-h-[40px] w-full"></div>
                        </div>

                        {/* PLANO ANUAL */}
                        <div className="bg-gradient-to-b from-[#1a2211] to-black border-2 border-emerald-500/60 rounded-xl p-6 relative flex flex-col shadow-[0_0_40px_rgba(16,185,129,0.15)] group hover:border-emerald-400/80 transition-all">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-green-600 text-black text-xs font-black uppercase tracking-widest px-5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-emerald-500/30 whitespace-nowrap animate-pulse">
                                <Star size={12} className="fill-black" /> {isBrazil ? 'SUPER DESCONTO' : 'BIG SAVINGS'} <Star size={12} className="fill-black" />
                            </div>

                            <div className="flex items-center gap-2 mb-1 mt-3">
                                <Crown size={20} className="text-emerald-400" />
                                <h3 className="text-lg text-white font-bold uppercase tracking-wider">
                                    {isBrazil ? 'VIP Anual' : 'Annual VIP'}
                                </h3>
                            </div>

                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-sm text-ifa-neutral">{currency}</span>
                                <span className="text-4xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">{anual_price.split(',')[0]}<span className="text-3xl">,{anual_price.split(',')[1]}</span></span>
                                <span className="text-sm text-ifa-neutral">/{isBrazil ? 'ano' : 'yr'}</span>
                            </div>

                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-sm text-ifa-neutral line-through opacity-50">{isBrazil ? 'R$ 958,80' : '$718,80'}</span>
                                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-black px-2.5 py-0.5 rounded-full tracking-wider">40% OFF</span>
                            </div>

                            <p className="text-emerald-400/80 text-sm font-bold tracking-wide mb-5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2.5 text-center">
                                {isBrazil ? '✨ Equivale a apenas R$ 47,94 por mês!' : '✨ Equivalent to only $35,94/month!'}
                            </p>

                            <ul className="space-y-3 mb-8 flex-1 text-sm">
                                <li className="flex items-start gap-3 text-ifa-neutral"><CheckCircle2 size={16} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Tudo do Plano Mensal' : 'Everything in Monthly'}</li>
                                <li className="flex items-start gap-3 text-ifa-neutral"><CheckCircle2 size={16} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? '40% de desconto' : '40% discount'}</li>
                                <li className="flex items-start gap-3 text-ifa-neutral"><CheckCircle2 size={16} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Suporte prioritário' : 'Priority support'}</li>
                            </ul>

                            <div className="mt-auto text-[10px] text-ifa-gold/70 italic mb-3">{isBrazil ? 'Melhor custo-benefício' : 'Best value'}</div>

                            <div id="paypal-button-anual" className="min-h-[40px] w-full"></div>
                        </div>

                    </div>

                    <div className="mt-8 text-center text-xs text-ifa-neutral flex items-center justify-center gap-2">
                        <Lock size={12} /> {isBrazil ? 'Pagamento 100% seguro processado pelo PayPal' : '100% secure payment processed by PayPal'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionModal;
