
import React, { useState } from 'react';
import { X, Check, ShieldCheck, Crown, Zap } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubscribe: (plan: 'semester' | 'annual') => void;
    featureName: string; // What feature triggered this
}

const SubscriptionModal: React.FC<Props> = ({ isOpen, onClose, onSubscribe, featureName }) => {
    const [selectedPlan, setSelectedPlan] = useState<'semester' | 'annual'>('annual');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
            <div className="bg-[#1a1510] w-full max-w-lg rounded-2xl border-2 border-[#D4AF37] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-ifa-neutral hover:text-white z-10 p-2">
                    <X size={24} />
                </button>

                {/* Banner */}
                <div className="bg-gradient-to-r from-[#D4AF37] to-[#B08D26] p-6 text-center pt-8">
                    <div className="inline-block p-3 bg-black/20 rounded-full mb-3 backdrop-blur-sm">
                        <Crown size={32} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-[#1a1510] uppercase tracking-wide">
                        Ifá Guia <span className="text-white">PRO</span>
                    </h2>
                    <p className="text-black/70 text-sm font-bold mt-1">
                        Desbloqueie o Poder Total do Oráculo
                    </p>
                </div>

                <div className="p-6 overflow-y-auto">
                    
                    <div className="text-center mb-6">
                        <p className="text-ifa-neutral text-sm mb-2">Recurso Bloqueado:</p>
                        <span className="inline-block px-3 py-1 bg-ifa-base-dark border border-ifa-gold/50 rounded text-ifa-gold font-bold uppercase text-xs">
                            {featureName}
                        </span>
                        <p className="text-ifa-text mt-4 text-sm leading-relaxed">
                            Para garantir a manutenção desta tecnologia sagrada e o suporte contínuo, recursos avançados de IA e fundamentos são exclusivos para assinantes.
                        </p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 mb-8 bg-ifa-base-dark p-4 rounded-xl border border-ifa-border">
                        <div className="flex items-center gap-3">
                            <Check size={18} className="text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-300">Interpretação Completa c/ IA (Ebós, Caminhos)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Check size={18} className="text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-300">Ferramentas Esotéricas (AR, Sons, Igbadu)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Check size={18} className="text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-300">Gestão de Templo (CRM, Financeiro, Estoque)</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Check size={18} className="text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-300">Catálogo Completo de Akoses e Ervas</span>
                        </div>
                    </div>

                    {/* Plans */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <button 
                            onClick={() => setSelectedPlan('semester')}
                            className={`p-4 rounded-xl border-2 transition-all text-left relative ${selectedPlan === 'semester' ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-ifa-border bg-ifa-base-dark opacity-70 hover:border-ifa-neutral'}`}
                        >
                            <div className="text-xs uppercase font-bold text-ifa-neutral mb-1">Semestral</div>
                            <div className="text-2xl font-bold text-white">R$ 99,00</div>
                            <div className="text-[10px] text-ifa-neutral">a cada 6 meses</div>
                        </button>

                        <button 
                            onClick={() => setSelectedPlan('annual')}
                            className={`p-4 rounded-xl border-2 transition-all text-left relative ${selectedPlan === 'annual' ? 'border-[#D4AF37] bg-[#D4AF37]/10' : 'border-ifa-border bg-ifa-base-dark opacity-70 hover:border-ifa-neutral'}`}
                        >
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow-md whitespace-nowrap">
                                Melhor Valor
                            </div>
                            <div className="text-xs uppercase font-bold text-ifa-neutral mb-1">Anual</div>
                            <div className="text-2xl font-bold text-white">R$ 189,00</div>
                            <div className="text-[10px] text-ifa-neutral">a cada 12 meses</div>
                            <div className="text-[10px] text-green-400 font-bold mt-1">Economize R$ 9,00/ano</div>
                        </button>
                    </div>

                    <button 
                        onClick={() => onSubscribe(selectedPlan)}
                        className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#8D6E63] text-black font-bold uppercase rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 animate-pulse-slow"
                    >
                        <Zap size={20} fill="black" /> Liberar Acesso Agora
                    </button>

                    <p className="text-center text-[10px] text-ifa-neutral mt-4 flex items-center justify-center gap-1 opacity-70">
                        <ShieldCheck size={12} /> Pagamento Seguro (Simulado)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionModal;
