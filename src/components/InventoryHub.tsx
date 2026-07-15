import React, { useState } from 'react';
import { ArrowLeft, Package, ShoppingCart, Calculator, Truck, DollarSign, Wallet, CalendarDays, History } from 'lucide-react';
import InventoryManager from './InventoryManager';
import AxeMarket from './AxeMarket';
import EboCalculator from './EboCalculator';
import EboDelivery from './EboDelivery';
import PriceTableManager from './PriceTableManager';
import FinancialManager from './FinancialManager';
import AgendaManager from './AgendaManager';
import ConsultationHistory from './ConsultationHistory';

const InventoryHub = ({ onBack }: { onBack: () => void }) => {
    const [subView, setSubView] = useState<'menu' | 'stock' | 'prices' | 'market' | 'calc' | 'delivery' | 'financial' | 'agenda' | 'history'>('menu');

    if (subView === 'stock') return <InventoryManager onBack={() => setSubView('menu')} />;
    if (subView === 'prices') return <PriceTableManager onBack={() => setSubView('menu')} />;
    if (subView === 'market') return <AxeMarket onBack={() => setSubView('menu')} />;
    if (subView === 'calc') return <EboCalculator onBack={() => setSubView('menu')} />;
    if (subView === 'delivery') return <EboDelivery onBack={() => setSubView('menu')} />;
    if (subView === 'financial') return <FinancialManager onBack={() => setSubView('menu')} />;
    if (subView === 'agenda') return <AgendaManager onBack={() => setSubView('menu')} />;
    // Handling history internally within InventoryHub requires passing props, but simpler to just render the component which has its own back button logic that we wrap
    if (subView === 'history') return <ConsultationHistory onBack={() => setSubView('menu')} onView={() => {}} />; // Note: onView is usually for App to switch views, here we might need to adjust ConsultationHistory to not rely on App state switching if embedded, or just use it as viewer. For now, basic view.

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 flex flex-col items-center">
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2">Gestão do Templo</h1>
                <div className="w-6"></div>
            </div>

            <div className="grid gap-6 w-full max-w-md">
                
                {/* FINANCIAL & CRM SECTION */}
                <div className="bg-gradient-to-br from-green-900/20 to-black p-4 rounded-xl border border-green-800/50 shadow-lg">
                    <h3 className="text-xs font-bold text-green-400 uppercase mb-3 flex items-center gap-2">
                        <Wallet size={14} /> Administração
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            onClick={() => setSubView('financial')}
                            className="bg-green-900/30 border border-green-700 p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-green-800 transition-all group"
                        >
                            <div className="text-green-300"><Wallet size={24} /></div>
                            <span className="text-xs font-bold text-white uppercase">Livro Caixa</span>
                        </button>
                        <button 
                            onClick={() => setSubView('history')}
                            className="bg-ifa-surface border border-ifa-border p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-ifa-gold hover:text-black transition-all group"
                        >
                            <div className="text-ifa-neutral group-hover:text-black"><History size={24} /></div>
                            <span className="text-xs font-bold text-ifa-text group-hover:text-black uppercase">Histórico</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => setSubView('stock')}
                        className="bg-ifa-base border border-ifa-border p-4 rounded-xl flex flex-col items-center gap-3 hover:border-ifa-gold transition-all group"
                    >
                        <div className="bg-ifa-wood text-white p-3 rounded-full group-hover:bg-ifa-gold transition-colors">
                            <Package size={24} />
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-sm text-ifa-text">Estoque</h3>
                            <p className="text-[10px] text-ifa-neutral">Controle de Qtd</p>
                        </div>
                    </button>

                    <button 
                        onClick={() => setSubView('prices')}
                        className="bg-ifa-base border border-ifa-border p-4 rounded-xl flex flex-col items-center gap-3 hover:border-ifa-gold transition-all group"
                    >
                        <div className="bg-ifa-wood text-white p-3 rounded-full group-hover:bg-ifa-gold transition-colors">
                            <DollarSign size={24} />
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-sm text-ifa-text">Preços</h3>
                            <p className="text-[10px] text-ifa-neutral">Tabela Custo x Venda</p>
                        </div>
                    </button>
                </div>

                <button 
                    onClick={() => setSubView('delivery')}
                    className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-ifa-gold transition-all group"
                >
                    <div className="bg-blue-900/30 text-blue-400 p-4 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Truck size={32} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-ifa-text">Ebó Delivery</h3>
                        <p className="text-xs text-ifa-neutral">Solicitar materiais de urgência.</p>
                    </div>
                </button>

                <button 
                    onClick={() => setSubView('market')}
                    className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-ifa-gold transition-all group"
                >
                    <div className="bg-ifa-wood text-white p-4 rounded-full group-hover:bg-ifa-gold transition-colors">
                        <ShoppingCart size={32} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-ifa-text">Mercado de Axé</h3>
                        <p className="text-xs text-ifa-neutral">Lista de fornecedores e cotações.</p>
                    </div>
                </button>
                
                <button 
                    onClick={() => setSubView('calc')}
                    className="bg-ifa-base border border-ifa-border p-6 rounded-xl flex items-center gap-4 hover:border-ifa-gold transition-all group"
                >
                    <div className="bg-ifa-wood text-white p-4 rounded-full group-hover:bg-ifa-gold transition-colors">
                        <Calculator size={32} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-lg text-ifa-text">Calculadora de Ebó</h3>
                        <p className="text-xs text-ifa-neutral">Proporção sagrada para oferendas.</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default InventoryHub;