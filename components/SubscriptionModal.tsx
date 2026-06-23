import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Crown, CheckCircle2, Star, Shield, Lock, X, Globe, GraduationCap, Sparkles } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubscribe: (subscriptionId: string, planKey: string) => void;
    featureName?: string;
    subscribing?: boolean;
    subscribeError?: string;
    onDismissError?: () => void;
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

const SubscriptionModal: React.FC<Props> = ({ isOpen, onClose, onSubscribe, featureName, subscribing, subscribeError, onDismissError }) => {
    // Computed synchronously — stable from first render, no async race conditions
    const isBrazil = useMemo(() => {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const lang = navigator.language || '';
        return (
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

    const [sdkReady, setSdkReady] = useState(false);
    const onSubscribeRef = useRef(onSubscribe);
    onSubscribeRef.current = onSubscribe;
    const buttonsRendered = useRef(false);
    const currentCurrency = useRef('');

    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

    if (typeof window !== 'undefined' && !clientId) {
        console.warn('[SubscriptionModal] VITE_PAYPAL_CLIENT_ID não definida. Os botões PayPal não serão renderizados.');
    }


    useEffect(() => {
        if (isOpen) {
            buttonsRendered.current = false;
            currentCurrency.current = '';
        } else {
            // Limpa o estado quando o modal fecha para garantir que re-renderize ao abrir
            buttonsRendered.current = false;
            currentCurrency.current = '';
        }
    }, [isOpen, isBrazil]);

    useEffect(() => {
        if (!isOpen || !clientId || sdkReady) return;

        const existingScript = document.querySelector('script[src*="paypal.com/sdk/js"]') as HTMLScriptElement | null;

        if (existingScript) {
            // Script tag already in DOM — check if SDK is actually ready
            if (window.paypal) {
                setSdkReady(true);
            } else {
                // Still loading; attach a listener and wait
                const onLoad = () => setSdkReady(true);
                existingScript.addEventListener('load', onLoad);
                return () => existingScript.removeEventListener('load', onLoad);
            }
            return;
        }

        const script = document.createElement('script');
        const currency = isBrazil ? 'BRL' : 'USD';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription&currency=${currency}&locale=${isBrazil ? 'pt_BR' : 'en_US'}&enable-funding=card`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.onload = () => setSdkReady(true);
        script.onerror = () => console.error('[PayPal] Falha ao carregar o SDK do PayPal');
        document.body.appendChild(script);
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

        let attempts = 0;
        const maxAttempts = 10;

        const renderButtons = () => {
            attempts++;
            if (!window.paypal) {
                if (attempts < maxAttempts) {
                    setTimeout(renderButtons, 500);
                } else {
                    console.error('[PayPal] window.paypal não carregou a tempo.');
                    buttonsRendered.current = false;
                }
                return;
            }

            let allRendered = true;
            plans.forEach(({ key, planId }) => {
                const container = document.getElementById(`paypal-button-${key}`);
                if (!container) {
                    allRendered = false;
                    return;
                }
                // Limpa o container para evitar erros se o PayPal já renderizou nele antes
                container.innerHTML = '';
                try {
                    window.paypal.Buttons({
                        createSubscription: (_data: any, actions: any) =>
                            actions.subscription.create({ plan_id: planId }),
                        onApprove: (data: any) => onSubscribeRef.current(data.subscriptionID, key),
                        style: { shape: 'rect', color: 'gold', layout: 'vertical', label: 'subscribe' },
                    }).render(container); // Passa o elemento DOM diretamente
                } catch (err) {
                    console.error(`[PayPal] Erro ao renderizar botão ${key}:`, err);
                }
            });

            // Se algum container não estava pronto, tenta novamente (até o limite)
            if (!allRendered && attempts < maxAttempts) {
                setTimeout(renderButtons, 500);
            }
        };

        // Inicia a tentativa de renderização
        renderButtons();

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

                <div className="p-6 md:p-8 text-center relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ifa-gold via-yellow-300 to-ifa-gold"></div>

                    <div className="flex justify-center mb-3">
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-0.5 text-[10px] text-ifa-neutral">
                            <Globe size={10} />
                            <span>{isBrazil ? 'Preços em Real Brasileiro' : 'Prices in US Dollars'}</span>
                        </div>
                    </div>

                    <div className="mx-auto w-12 h-12 bg-ifa-gold/20 rounded-full flex items-center justify-center mb-3 text-ifa-gold ring-1 ring-ifa-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                        {featureName ? <Lock size={22} /> : <Crown size={22} />}
                    </div>

                    <h2 className="text-xl md:text-2xl font-serif text-ifa-gold font-bold uppercase tracking-widest mb-2">
                        {featureName ? (isBrazil ? 'Recurso Premium' : 'Premium Feature') : (isBrazil ? 'Eleve seu Sacerdócio' : 'Elevate Your Priesthood')}
                    </h2>
                    <p className="text-ifa-neutral text-sm max-w-3xl mx-auto mb-6">
                        {featureName
                            ? (isBrazil ? `A função "${featureName}" é exclusiva para assinantes. Escolha seu plano:`
                                : `The "${featureName}" feature is exclusive to subscribers. Choose your plan:`)
                            : (isBrazil
                                ? 'Acesse o Codex Sacerdotal completo com planos que cabem no seu bolso.'
                                : 'Get full access to the Sacred Codex with plans that fit your budget.')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">

                        {/* PLANO ESTUDANTE */}
                        <div className="bg-gradient-to-b from-[#1e1a14] to-black border border-amber-500/30 rounded-xl p-4 relative flex flex-col group hover:border-amber-400/60 transition-colors">
                            <div className="flex items-center gap-2 mb-1">
                                <GraduationCap size={18} className="text-ifa-gold" />
                                <h3 className="text-base text-white font-bold uppercase tracking-wider">
                                    {isBrazil ? 'Estudante' : 'Student'}
                                </h3>
                            </div>
                            <div className="flex items-baseline gap-1 mb-3">
                                <span className="text-[11px] text-ifa-neutral">{currency}</span>
                                <span className="text-3xl font-black text-ifa-gold">{estudante_price}</span>
                                <span className="text-[11px] text-ifa-neutral">/{isBrazil ? 'mês' : 'mo'}</span>
                            </div>

                            <ul className="space-y-1 mb-3 flex-1 text-xs">
                                <li className="flex items-start gap-2 text-white font-medium"><CheckCircle2 size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Jogue Ifá, Opon Ifá, Merindilogun e Ikin' : 'Play Ifá, Opon Ifá, Merindilogun & Ikin'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><CheckCircle2 size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Jogos Interativos (RPG / Story Mode)' : 'Interactive Games (RPG / Story Mode)'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><CheckCircle2 size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Leia Itãs completos de cada Odu' : 'Read complete Itãs for each Odu'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><CheckCircle2 size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Estude o Odu com profundidade' : 'Study the Odu in depth'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><CheckCircle2 size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Biblioteca 256 Odùs completa' : 'Complete 256 Odù Library'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><CheckCircle2 size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Enciclopédia de Ervas (ID + Mapa)' : 'Herb Encyclopedia (ID + Map)'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><CheckCircle2 size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Ferramentas Esotéricas' : 'Esoteric Tools'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><CheckCircle2 size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Tratados e Preces' : 'Treatises & Prayers'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><CheckCircle2 size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Igbadu Virtual e Sons Sagrados' : 'Virtual Igbadu & Sacred Sounds'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><CheckCircle2 size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Roda de Sango' : 'Sango Wheel'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><CheckCircle2 size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Dicionário Yorubá e Calendário Litúrgico' : 'Yoruba Dictionary & Liturgical Calendar'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><CheckCircle2 size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Diário de Sonhos e Árvore Genealógica' : 'Dream Journal & Lineage Tree'}</li>
                            </ul>

                            <div className="bg-amber-950/30 border border-amber-500/20 rounded-lg p-2 mb-1">
                                <p className="text-[9px] text-amber-300/80 font-bold uppercase tracking-wider mb-0.5">{isBrazil ? '✕ Não inclui' : '✕ Does not include'}</p>
                                <p className="text-[9px] text-amber-400/70 leading-relaxed">
                                    {isBrazil
                                        ? 'Atendimento a Consulente, Magias, Ebós, Voz do Trovão, Gestão de Templo, Assentamentos, Material Reverso, Bori, Diagnóstico Ajogun, Sala Virtual'
                                        : 'Client Consultation, Spells, Ebós, Thunder Voice, Temple Management, Assentamentos, Material Reverso, Bori, Ajogun Diagnosis, Virtual Room'}
                                </p>
                            </div>

                            <div className="mt-auto text-[9px] text-ifa-gold/70 italic mb-2">{isBrazil ? 'Ideal para quem busca conhecimento sem limites' : 'Perfect for those seeking unlimited knowledge'}</div>

                            <div id="paypal-button-estudante" className="min-h-[36px] w-full"></div>
                        </div>

                        {/* PLANO MENSAL */}
                        <div className="bg-gradient-to-b from-[#2a2211] to-black border-2 border-ifa-gold rounded-xl p-4 relative flex flex-col shadow-[0_0_30px_rgba(212,175,55,0.15)] transform md:-translate-y-2">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ifa-gold text-black text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full flex items-center gap-1 shadow-lg whitespace-nowrap">
                                <Star size={10} /> {isBrazil ? 'Promocional' : 'Promotional'}
                            </div>

                            <h3 className="text-base text-ifa-gold font-bold uppercase tracking-wider mb-2 mt-2">
                                {isBrazil ? 'Plano Mensal' : 'Monthly Plan'}
                            </h3>
                            <div className="flex items-baseline gap-1 mb-1">
                                <span className="text-[11px] text-ifa-neutral">{currency}</span>
                                <span className="text-3xl font-black text-ifa-gold">{mensal_price}</span>
                                <span className="text-[11px] text-ifa-neutral">/{isBrazil ? 'mês' : 'mo'}</span>
                            </div>
                            <p className="text-[10px] text-green-400 mb-3 font-bold tracking-wide leading-relaxed">{isBrazil ? 'Promoção válida até 30/09/2026, voltando a R$ 99,90' : 'Promo until Sep 30/2026, returning to $79.90'}</p>

                            <ul className="space-y-1.5 mb-3 flex-1 text-xs">
                                <li className="flex items-start gap-2 text-white font-medium"><Star size={12} className="text-ifa-gold shrink-0 mt-0.5 fill-ifa-gold" /> {isBrazil ? 'Interpretação ilimitada' : 'Unlimited interpretation'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><Star size={12} className="text-ifa-gold shrink-0 mt-0.5 fill-ifa-gold" /> {isBrazil ? 'Simulador de Ebó e Magias' : 'Ebó & Magic Simulator'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><Star size={12} className="text-ifa-gold shrink-0 mt-0.5 fill-ifa-gold" /> {isBrazil ? 'Amuletos e Ferramentas Esotéricas' : 'Amulets & Esoteric Tools'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><Star size={12} className="text-ifa-gold shrink-0 mt-0.5 fill-ifa-gold" /> {isBrazil ? 'Sala de Atendimento Virtual' : 'Virtual Consultation Room'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><Star size={12} className="text-ifa-gold shrink-0 mt-0.5 fill-ifa-gold" /> {isBrazil ? 'PDF sem marca d\'água' : 'Clean PDF (No watermark)'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><Shield size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Todas as ferramentas liberadas' : 'All tools unlocked'}</li>
                            </ul>

                            {/* Bloco exclusivo Sacerdote — ferramentas que o Estudante NÃO tem */}
                            <div className="bg-ifa-gold/10 border border-ifa-gold/40 rounded-lg p-2.5 mb-3">
                                <p className="text-[9px] text-ifa-gold font-black uppercase tracking-wider mb-1.5 flex items-center gap-1">
                                    <Crown size={9} className="shrink-0" />
                                    {isBrazil ? '✦ Exclusivo Sacerdote — não incluso no Estudante' : '✦ Priest Exclusive — not in Student plan'}
                                </p>
                                <ul className="space-y-1">
                                    <li className="flex items-center gap-1.5 text-[9px] text-ifa-gold/90 font-semibold"><Sparkles size={8} className="shrink-0 text-ifa-gold" /> {isBrazil ? 'Bori — Ritual Interativo de Ori' : 'Bori — Interactive Ori Ritual'}</li>
                                    <li className="flex items-center gap-1.5 text-[9px] text-ifa-gold/90 font-semibold"><Sparkles size={8} className="shrink-0 text-ifa-gold" /> {isBrazil ? 'Material Reverso — encontre Ebós pelos ingredientes' : 'Material Reverso — find Ebós by ingredients'}</li>
                                    <li className="flex items-center gap-1.5 text-[9px] text-ifa-gold/90 font-semibold"><Sparkles size={8} className="shrink-0 text-ifa-gold" /> {isBrazil ? 'Assentamentos — guia completo de assentamento' : 'Assentamentos — complete settlement guide'}</li>
                                    <li className="flex items-center gap-1.5 text-[9px] text-ifa-gold/90 font-semibold"><Sparkles size={8} className="shrink-0 text-ifa-gold" /> {isBrazil ? 'Diagnóstico Ajogun — leitura das forças negativas' : 'Ajogun Diagnosis — negative forces reading'}</li>
                                    <li className="flex items-center gap-1.5 text-[9px] text-ifa-gold/90 font-semibold"><Sparkles size={8} className="shrink-0 text-ifa-gold" /> {isBrazil ? 'Sala Virtual — atendimento ao consulente online' : 'Virtual Room — online client consultation'}</li>
                                </ul>
                            </div>


                            <div id="paypal-button-mensal" className="min-h-[36px] w-full"></div>
                        </div>

                        {/* PLANO ANUAL */}
                        <div className="bg-gradient-to-b from-[#1a2211] to-black border-2 border-emerald-500/60 rounded-xl p-4 relative flex flex-col shadow-[0_0_40px_rgba(16,185,129,0.15)] group hover:border-emerald-400/80 transition-all">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-green-600 text-black text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-emerald-500/30 whitespace-nowrap animate-pulse">
                                <Star size={10} className="fill-black" /> {isBrazil ? 'SUPER DESCONTO' : 'BIG SAVINGS'} <Star size={10} className="fill-black" />
                            </div>

                            <div className="flex items-center gap-2 mb-1 mt-2">
                                <Crown size={18} className="text-emerald-400" />
                                <h3 className="text-base text-white font-bold uppercase tracking-wider">
                                    {isBrazil ? 'VIP Anual' : 'Annual VIP'}
                                </h3>
                            </div>

                            <div className="flex items-baseline gap-2 mb-0.5">
                                <span className="text-[11px] text-ifa-neutral">{currency}</span>
                                <span className="text-3xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">{anual_price.split(',')[0]}<span className="text-2xl">,{anual_price.split(',')[1]}</span></span>
                                <span className="text-[11px] text-ifa-neutral">/{isBrazil ? 'ano' : 'yr'}</span>
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-[11px] text-ifa-neutral line-through opacity-50">{isBrazil ? 'R$ 958,80' : '$718,80'}</span>
                                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black px-2 py-0.5 rounded-full tracking-wider">40% OFF</span>
                            </div>

                            <p className="text-emerald-400/80 text-[11px] font-bold tracking-wide mb-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-1.5 text-center">
                                {isBrazil ? 'Equivale a R$ 47,94/mês' : 'Only $35,94/month!'}
                            </p>

                            <ul className="space-y-1.5 mb-3 flex-1 text-xs">
                                <li className="flex items-start gap-2 text-white font-medium"><CheckCircle2 size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Tudo do Plano Mensal' : 'Everything in Monthly'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><CheckCircle2 size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? '40% de desconto' : '40% discount'}</li>
                                <li className="flex items-start gap-2 text-white font-medium"><CheckCircle2 size={12} className="text-ifa-gold shrink-0 mt-0.5" /> {isBrazil ? 'Suporte prioritário' : 'Priority support'}</li>
                            </ul>

                            <div className="mt-auto text-[9px] text-ifa-gold/70 italic mb-2">{isBrazil ? 'Melhor custo-benefício' : 'Best value'}</div>

                            <div id="paypal-button-anual" className="min-h-[36px] w-full"></div>
                        </div>

                    </div>

                    <div className="mt-6 text-center text-[10px] text-ifa-neutral flex items-center justify-center gap-2">
                        <Lock size={10} /> {isBrazil ? 'Pagamento 100% seguro processado pelo PayPal' : '100% secure payment processed by PayPal'}
                    </div>
                </div>

                {subscribeError && (
                    <div className="px-8 pb-6">
                        <div className="bg-red-950/60 border border-red-500/40 rounded-xl p-4 text-center">
                            <p className="text-red-300 text-sm mb-2">{subscribeError}</p>
                            {onDismissError && (
                                <button onClick={onDismissError} className="text-xs text-ifa-neutral underline hover:text-white">
                                    {isBrazil ? 'Tentar novamente' : 'Try again'}
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {subscribing && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-20">
                        <div className="w-10 h-10 border-2 border-ifa-gold border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-ifa-gold font-serif text-lg">{isBrazil ? 'Ativando sua assinatura...' : 'Activating your subscription...'}</p>
                        <p className="text-ifa-neutral text-xs mt-1">{isBrazil ? 'Aguarde enquanto confirmamos seu pagamento' : 'Please wait while we confirm your payment'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubscriptionModal;
