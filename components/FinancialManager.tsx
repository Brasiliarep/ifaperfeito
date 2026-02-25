
import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Wallet, Plus, Calendar, CheckCircle2, AlertCircle, Clock, CreditCard, DollarSign, Search, Trash2, Users, ChevronRight, User } from 'lucide-react';
import { FinancialRecord, Installment, PaymentMethod } from '../types';
import { getFinancialRecords, saveFinancialRecord, deleteFinancialRecord, getHistory } from '../services/storageService';

const FinancialManager = ({ onBack }: { onBack: () => void }) => {
    const [records, setRecords] = useState<FinancialRecord[]>([]);
    const [viewMode, setViewMode] = useState<'list' | 'add' | 'detail' | 'client_history'>('list');
    const [activeTab, setActiveTab] = useState<'transactions' | 'clients'>('transactions'); 
    
    const [selectedRecord, setSelectedRecord] = useState<FinancialRecord | null>(null);
    const [selectedClientName, setSelectedClientName] = useState<string | null>(null); 
    
    const [filter, setFilter] = useState<'all' | 'pending' | 'overdue'>('all');
    const [search, setSearch] = useState('');

    // Form State
    const [newClient, setNewClient] = useState('');
    const [clientSuggestions, setClientSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    const [newDesc, setNewDesc] = useState('');
    const [newTotal, setNewTotal] = useState<string>('');
    const [newEntry, setNewEntry] = useState<string>('');
    const [installmentsCount, setInstallmentsCount] = useState(1);
    const [entryMethod, setEntryMethod] = useState<PaymentMethod>('pix');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const data = getFinancialRecords();
        // Sort: Overdue first, then pending, then recent paid
        const sorted = data.sort((a, b) => {
            if (a.isFullyPaid === b.isFullyPaid) {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
            return a.isFullyPaid ? 1 : -1;
        });
        setRecords(sorted);
    };

    // --- AUTOCOMPLETE LOGIC ---
    const handleClientNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setNewClient(val);
        
        if (val.length > 1) {
            // Fetch from Consultation History
            const history = getHistory();
            const uniqueNames = Array.from(new Set(history.map(r => r.client.fullName)));
            
            // Also fetch from existing Financial Records
            const financeNames = Array.from(new Set(records.map(r => r.clientName)));
            
            const allNames = Array.from(new Set([...uniqueNames, ...financeNames]));
            
            const matches = (allNames as string[]).filter(name => 
                name.toLowerCase().includes(val.toLowerCase())
            ).slice(0, 5); // Limit to 5
            
            setClientSuggestions(matches);
            setShowSuggestions(matches.length > 0);
        } else {
            setShowSuggestions(false);
        }
    };

    const selectSuggestion = (name: string) => {
        setNewClient(name);
        setShowSuggestions(false);
    };

    // --- TRANSACTION LOGIC ---
    const handleCreateTransaction = () => {
        if (!newClient || !newTotal) return;

        const totalVal = parseFloat(newTotal);
        const entryVal = parseFloat(newEntry) || 0;
        const remaining = totalVal - entryVal;
        
        const newInst: Installment[] = [];
        
        // 1. Create Entry Installment
        if (entryVal > 0) {
            newInst.push({
                id: crypto.randomUUID(),
                number: 0, 
                amount: entryVal,
                dueDate: new Date().toISOString(),
                status: 'paid',
                paidDate: new Date().toISOString(),
                method: entryMethod
            });
        }

        // 2. Create Future Installments
        if (remaining > 0 && installmentsCount > 0) {
            const amountPerInst = Math.floor((remaining / installmentsCount) * 100) / 100;
            const diff = remaining - (amountPerInst * installmentsCount); 

            for (let i = 1; i <= installmentsCount; i++) {
                const dueDate = new Date();
                dueDate.setDate(dueDate.getDate() + (i * 30));
                
                const finalAmount = i === installmentsCount ? amountPerInst + diff : amountPerInst;

                newInst.push({
                    id: crypto.randomUUID(),
                    number: i,
                    amount: finalAmount,
                    dueDate: dueDate.toISOString(),
                    status: 'pending'
                });
            }
        }

        const record: FinancialRecord = {
            id: crypto.randomUUID(),
            clientName: newClient,
            description: newDesc || 'Serviço Religioso',
            totalAmount: totalVal,
            createdAt: new Date().toISOString(),
            installments: newInst,
            isFullyPaid: remaining <= 0
        };

        saveFinancialRecord(record);
        loadData();
        setViewMode('list');
        // Reset form
        setNewClient('');
        setNewDesc('');
        setNewTotal('');
        setNewEntry('');
        setInstallmentsCount(1);
    };

    const handlePayInstallment = (record: FinancialRecord, instId: string) => {
        const updatedInstallments = record.installments.map(inst => {
            if (inst.id === instId) {
                return { 
                    ...inst, 
                    status: 'paid' as const, 
                    paidDate: new Date().toISOString() 
                };
            }
            return inst;
        });

        const updatedRecord = { ...record, installments: updatedInstallments };
        saveFinancialRecord(updatedRecord);
        if (selectedRecord && selectedRecord.id === record.id) {
            setSelectedRecord(updatedRecord); 
        }
        loadData();
    };

    const handleDelete = (id: string) => {
        if(confirm("Apagar este registro financeiro?")) {
            deleteFinancialRecord(id);
            loadData();
            if(selectedRecord?.id === id) setViewMode('list');
        }
    }

    // --- AGGREGATION LOGIC ---
    const stats = useMemo(() => {
        let totalReceivables = 0;
        let totalReceived = 0;
        let overdueCount = 0;

        records.forEach(r => {
            r.installments.forEach(i => {
                if (i.status === 'paid') {
                    totalReceived += i.amount;
                } else {
                    totalReceivables += i.amount;
                    if (new Date(i.dueDate) < new Date()) overdueCount++;
                }
            });
        });

        return { totalReceivables, totalReceived, overdueCount };
    }, [records]);

    const clientPortfolio = useMemo(() => {
        const portfolio: Record<string, { totalDebt: number, totalPaid: number, records: FinancialRecord[] }> = {};

        records.forEach(r => {
            if (!portfolio[r.clientName]) {
                portfolio[r.clientName] = { totalDebt: 0, totalPaid: 0, records: [] };
            }
            
            // Add Record
            portfolio[r.clientName].records.push(r);

            // Calc Sums
            r.installments.forEach(i => {
                if (i.status === 'paid') portfolio[r.clientName].totalPaid += i.amount;
                else portfolio[r.clientName].totalDebt += i.amount;
            });
        });

        return Object.entries(portfolio)
            .map(([name, data]) => ({ name, ...data }))
            .filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
            .sort((a,b) => b.totalDebt - a.totalDebt); 
    }, [records, search]);

    const filteredRecords = records.filter(r => {
        const matchesSearch = r.clientName.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase());
        if (!matchesSearch) return false;
        if (filter === 'all') return true;
        if (filter === 'pending') return !r.isFullyPaid;
        if (filter === 'overdue') return r.installments.some(i => i.status === 'pending' && new Date(i.dueDate) < new Date());
        return true;
    });

    // --- VIEW: NEW RECORD FORM ---
    if (viewMode === 'add') {
        const total = parseFloat(newTotal) || 0;
        const entry = parseFloat(newEntry) || 0;
        const remaining = Math.max(0, total - entry);
        const installmentVal = installmentsCount > 0 ? remaining / installmentsCount : 0;

        return (
            <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
                <div className="max-w-2xl mx-auto">
                    <button onClick={() => setViewMode('list')} className="flex items-center gap-2 text-ifa-neutral mb-6"><ArrowLeft /> Voltar</button>
                    <h2 className="text-2xl font-serif text-ifa-gold mb-6">Novo Lançamento</h2>
                    
                    <div className="bg-ifa-base border border-ifa-border rounded-xl p-6 space-y-4 shadow-xl">
                        <div className="relative">
                            <label className="text-xs uppercase font-bold text-ifa-neutral block mb-1">Cliente</label>
                            <input 
                                value={newClient} 
                                onChange={handleClientNameChange} 
                                className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text" 
                                placeholder="Comece a digitar o nome..." 
                                autoComplete="off"
                            />
                            {showSuggestions && (
                                <ul className="absolute z-10 w-full bg-ifa-surface border border-ifa-gold rounded-b-lg shadow-xl max-h-40 overflow-y-auto">
                                    {clientSuggestions.map((name, i) => (
                                        <li 
                                            key={i} 
                                            onClick={() => selectSuggestion(name)}
                                            className="p-3 hover:bg-ifa-gold hover:text-black cursor-pointer text-sm border-b border-ifa-border/30 last:border-0"
                                        >
                                            {name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div>
                            <label className="text-xs uppercase font-bold text-ifa-neutral block mb-1">Descrição</label>
                            <input value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text" placeholder="Ex: Ebó Completo + Consulta" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs uppercase font-bold text-ifa-gold block mb-1">Valor Total (R$)</label>
                                <input type="number" value={newTotal} onChange={e => setNewTotal(e.target.value)} className="w-full bg-ifa-base-dark border border-ifa-gold rounded p-3 text-ifa-text font-bold text-lg" placeholder="0.00" />
                            </div>
                            <div>
                                <label className="text-xs uppercase font-bold text-green-400 block mb-1">Entrada (R$)</label>
                                <input type="number" value={newEntry} onChange={e => setNewEntry(e.target.value)} className="w-full bg-ifa-base-dark border border-green-500 rounded p-3 text-ifa-text" placeholder="0.00" />
                            </div>
                        </div>

                        {entry > 0 && (
                            <div>
                                <label className="text-xs uppercase font-bold text-ifa-neutral block mb-1">Método da Entrada</label>
                                <div className="flex gap-2">
                                    {(['pix', 'cash', 'credit_card', 'debit_card'] as PaymentMethod[]).map(m => (
                                        <button 
                                            key={m} 
                                            onClick={() => setEntryMethod(m)}
                                            className={`px-3 py-2 rounded border text-xs font-bold uppercase ${entryMethod === m ? 'bg-ifa-gold text-ifa-base border-ifa-gold' : 'bg-ifa-base-dark border-ifa-border text-ifa-neutral'}`}
                                        >
                                            {m.replace('_', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {remaining > 0 && (
                            <div className="pt-4 border-t border-ifa-border/30">
                                <h4 className="text-sm font-bold text-ifa-text mb-4">Parcelamento do Restante (R$ {remaining.toFixed(2)})</h4>
                                <div className="flex items-center gap-4 mb-4">
                                    <button onClick={() => setInstallmentsCount(Math.max(1, installmentsCount - 1))} className="p-2 bg-ifa-wood text-white rounded">-</button>
                                    <span className="font-bold text-xl">{installmentsCount}x</span>
                                    <button onClick={() => setInstallmentsCount(installmentsCount + 1)} className="p-2 bg-ifa-wood text-white rounded">+</button>
                                </div>
                                <p className="text-ifa-neutral text-sm">
                                    {installmentsCount} parcelas de <strong>R$ {installmentVal.toFixed(2)}</strong>
                                </p>
                                <p className="text-[10px] text-ifa-neutral mt-1">Primeiro vencimento em 30 dias.</p>
                            </div>
                        )}

                        <button onClick={handleCreateTransaction} className="w-full bg-ifa-gold text-ifa-base font-bold py-4 rounded-xl uppercase tracking-widest hover:opacity-90 mt-4">
                            Lançar no Livro
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // --- VIEW: RECORD DETAIL ---
    if (viewMode === 'detail' && selectedRecord) {
        const debt = selectedRecord.installments.reduce((acc, i) => i.status === 'pending' ? acc + i.amount : acc, 0);

        return (
            <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
                <div className="max-w-2xl mx-auto">
                    <button onClick={() => setViewMode(selectedClientName ? 'client_history' : 'list')} className="flex items-center gap-2 text-ifa-neutral mb-6"><ArrowLeft /> Voltar</button>
                    
                    <div className="bg-ifa-base border border-ifa-border rounded-xl overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-ifa-border">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-ifa-gold">{selectedRecord.clientName}</h2>
                                    <p className="text-ifa-neutral text-sm">{selectedRecord.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-ifa-neutral uppercase">Total</p>
                                    <p className="text-xl font-bold text-white">R$ {selectedRecord.totalAmount.toFixed(2)}</p>
                                </div>
                            </div>
                            
                            <div className="mt-4 flex gap-4">
                                <div className="bg-green-900/20 px-4 py-2 rounded border border-green-800">
                                    <span className="text-[10px] uppercase text-green-400 block">Pago</span>
                                    <span className="font-bold text-green-300">R$ {(selectedRecord.totalAmount - debt).toFixed(2)}</span>
                                </div>
                                <div className="bg-red-900/20 px-4 py-2 rounded border border-red-800">
                                    <span className="text-[10px] uppercase text-red-400 block">Restante</span>
                                    <span className="font-bold text-red-300">R$ {debt.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-ifa-base-dark">
                            <h3 className="text-xs font-bold text-ifa-neutral uppercase mb-4 pl-2">Parcelas & Pagamentos</h3>
                            <div className="space-y-3">
                                {selectedRecord.installments.map((inst) => {
                                    const isPaid = inst.status === 'paid';
                                    const isOverdue = !isPaid && new Date(inst.dueDate) < new Date();
                                    
                                    return (
                                        <div key={inst.id} className={`flex items-center justify-between p-4 rounded-lg border ${isPaid ? 'bg-green-900/10 border-green-900/30' : isOverdue ? 'bg-red-900/10 border-red-900/50' : 'bg-ifa-base border-ifa-border'}`}>
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-full ${isPaid ? 'bg-green-800 text-green-200' : 'bg-gray-700 text-gray-400'}`}>
                                                    {inst.number === 0 ? <Wallet size={16} /> : <Calendar size={16} />}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-ifa-text">
                                                        {inst.number === 0 ? 'Entrada' : `${inst.number}ª Parcela`}
                                                    </p>
                                                    <p className="text-xs text-ifa-neutral">
                                                        {isPaid ? `Pago em ${new Date(inst.paidDate!).toLocaleDateString()}` : `Vence em ${new Date(inst.dueDate).toLocaleDateString()}`}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-bold ${isPaid ? 'text-green-400' : 'text-ifa-text'}`}>R$ {inst.amount.toFixed(2)}</p>
                                                {!isPaid && (
                                                    <button 
                                                        onClick={() => handlePayInstallment(selectedRecord, inst.id)}
                                                        className="mt-1 text-[10px] bg-ifa-gold text-ifa-base px-2 py-1 rounded font-bold uppercase hover:opacity-80"
                                                    >
                                                        Receber
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        
                        <div className="p-4 bg-ifa-base border-t border-ifa-border flex justify-end">
                            <button onClick={() => handleDelete(selectedRecord.id)} className="text-red-500 hover:text-red-400 text-xs flex items-center gap-1 uppercase font-bold">
                                <Trash2 size={14} /> Excluir Registro
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- VIEW: CLIENT HISTORY (The "Ficha") ---
    if (viewMode === 'client_history' && selectedClientName) {
        const clientRecords = records.filter(r => r.clientName === selectedClientName);
        const totalClientDebt = clientRecords.reduce((acc, r) => {
            return acc + r.installments.reduce((d, i) => i.status === 'pending' ? d + i.amount : d, 0);
        }, 0);

        return (
            <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
                <div className="max-w-3xl mx-auto">
                    <button onClick={() => { setViewMode('list'); setSelectedClientName(null); }} className="flex items-center gap-2 text-ifa-neutral mb-6"><ArrowLeft /> Voltar para Lista</button>
                    
                    <div className="flex items-center gap-4 mb-8 border-b border-ifa-border pb-6">
                        <div className="bg-ifa-gold text-ifa-base p-4 rounded-full">
                            <User size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-ifa-text">{selectedClientName}</h2>
                            <p className="text-ifa-neutral text-sm">Ficha Financeira Completa</p>
                        </div>
                        <div className="ml-auto text-right">
                            <p className="text-xs font-bold uppercase text-ifa-neutral">Dívida Total</p>
                            <p className={`text-2xl font-bold ${totalClientDebt > 0 ? 'text-red-400' : 'text-green-400'}`}>R$ {totalClientDebt.toFixed(2)}</p>
                        </div>
                    </div>

                    <h3 className="text-xs font-bold text-ifa-neutral uppercase mb-4">Histórico de Atendimentos</h3>
                    <div className="space-y-4">
                        {clientRecords.map(record => {
                            const recDebt = record.installments.reduce((acc, i) => i.status === 'pending' ? acc + i.amount : acc, 0);
                            return (
                                <div 
                                    key={record.id}
                                    onClick={() => { setSelectedRecord(record); setViewMode('detail'); }}
                                    className="bg-ifa-base border border-ifa-border rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-ifa-gold hover:bg-ifa-surface transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-ifa-base-dark p-3 rounded-full text-ifa-gold">
                                            <Users size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-ifa-text">{record.description}</h4>
                                            <p className="text-xs text-ifa-neutral">{new Date(record.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center gap-4">
                                        <div>
                                            <p className="text-[10px] uppercase text-ifa-neutral font-bold">Dívida Total</p>
                                            <p className={`text-lg font-bold ${recDebt > 0 ? 'text-red-400' : 'text-green-400'}`}>
                                                R$ {recDebt.toFixed(2)}
                                            </p>
                                        </div>
                                        <ChevronRight className="text-ifa-neutral" size={16} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }

    // --- VIEW: DASHBOARD (MAIN LIST) ---
    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                        <Wallet size={24} /> Livro Caixa & Crediário
                    </h1>
                </div>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-green-900/20 border border-green-800 p-4 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-green-400 text-xs font-bold uppercase">Total Recebido</span>
                            <CheckCircle2 size={16} className="text-green-500" />
                        </div>
                        <p className="text-2xl font-bold text-white">R$ {stats.totalReceived.toFixed(2)}</p>
                    </div>
                    <div className="bg-yellow-900/20 border border-yellow-800 p-4 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-yellow-400 text-xs font-bold uppercase">A Receber</span>
                            <Clock size={16} className="text-yellow-500" />
                        </div>
                        <p className="text-2xl font-bold text-white">R$ {stats.totalReceivables.toFixed(2)}</p>
                    </div>
                    <div className="bg-red-900/20 border border-red-800 p-4 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-red-400 text-xs font-bold uppercase">Atrasados</span>
                            <AlertCircle size={16} className="text-red-500" />
                        </div>
                        <p className="text-2xl font-bold text-white">{stats.overdueCount} <span className="text-sm font-normal text-red-300">parcelas</span></p>
                    </div>
                </div>

                {/* TAB SWITCHER */}
                <div className="flex mb-6 border-b border-ifa-border">
                    <button 
                        onClick={() => setActiveTab('transactions')} 
                        className={`px-6 py-3 font-bold text-sm uppercase border-b-2 transition-colors ${activeTab === 'transactions' ? 'border-ifa-gold text-ifa-gold' : 'border-transparent text-ifa-neutral hover:text-white'}`}
                    >
                        Transações (Dia a Dia)
                    </button>
                    <button 
                        onClick={() => setActiveTab('clients')} 
                        className={`px-6 py-3 font-bold text-sm uppercase border-b-2 transition-colors ${activeTab === 'clients' ? 'border-ifa-gold text-ifa-gold' : 'border-transparent text-ifa-neutral hover:text-white'}`}
                    >
                        Carteira de Clientes
                    </button>
                </div>

                {/* ACTION BAR */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                        <input 
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={activeTab === 'transactions' ? "Buscar transação..." : "Buscar cliente..."}
                            className="w-full bg-ifa-base border border-ifa-border rounded-lg pl-10 pr-4 py-3 text-sm text-ifa-text focus:border-ifa-gold outline-none"
                        />
                        <Search className="absolute left-3 top-3.5 text-ifa-neutral" size={16} />
                    </div>
                    
                    {activeTab === 'transactions' && (
                        <div className="flex bg-ifa-base border border-ifa-border rounded-lg p-1">
                            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-xs font-bold uppercase ${filter === 'all' ? 'bg-ifa-gold text-ifa-base' : 'text-ifa-neutral'}`}>Todos</button>
                            <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded text-xs font-bold uppercase ${filter === 'pending' ? 'bg-ifa-gold text-ifa-base' : 'text-ifa-neutral'}`}>Pendentes</button>
                            <button onClick={() => setFilter('overdue')} className={`px-4 py-2 rounded text-xs font-bold uppercase ${filter === 'overdue' ? 'bg-ifa-gold text-ifa-base' : 'text-ifa-neutral'}`}>Atrasados</button>
                        </div>
                    )}

                    <button onClick={() => setViewMode('add')} className="bg-ifa-gold text-ifa-base px-6 py-3 rounded-lg font-bold uppercase flex items-center justify-center gap-2 hover:opacity-90 shadow-lg whitespace-nowrap">
                        <Plus size={20} /> Novo Lançamento
                    </button>
                </div>

                {/* LIST CONTENT */}
                <div className="space-y-3">
                    {activeTab === 'transactions' ? (
                        <>
                            {filteredRecords.length === 0 && <p className="text-center text-ifa-neutral py-12">Nenhum registro encontrado.</p>}
                            {filteredRecords.map(record => {
                                const pendingAmount = record.installments.reduce((acc, i) => i.status === 'pending' ? acc + i.amount : acc, 0);
                                const hasOverdue = record.installments.some(i => i.status === 'pending' && new Date(i.dueDate) < new Date());

                                return (
                                    <div 
                                        key={record.id} 
                                        onClick={() => { setSelectedRecord(record); setViewMode('detail'); }}
                                        className={`bg-ifa-base border p-4 rounded-xl flex items-center justify-between cursor-pointer hover:shadow-lg transition-all ${hasOverdue ? 'border-red-500/50 hover:border-red-500' : 'border-ifa-border hover:border-ifa-gold'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-full ${record.isFullyPaid ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                                                {record.isFullyPaid ? <CheckCircle2 size={20} /> : <DollarSign size={20} />}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-ifa-text text-lg">{record.clientName}</h4>
                                                <p className="text-xs text-ifa-neutral">{record.description}</p>
                                                <p className="text-[10px] text-ifa-neutral mt-1 opacity-70">{new Date(record.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-bold text-white">R$ {record.totalAmount.toFixed(2)}</p>
                                            {pendingAmount > 0 ? (
                                                <p className={`text-xs font-bold ${hasOverdue ? 'text-red-400 animate-pulse' : 'text-yellow-400'}`}>
                                                    Resta R$ {pendingAmount.toFixed(2)}
                                                </p>
                                            ) : (
                                                <p className="text-xs font-bold text-green-400 uppercase">Quitado</p>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    ) : (
                        // CLIENT PORTFOLIO VIEW
                        <>
                            {clientPortfolio.length === 0 && <p className="text-center text-ifa-neutral py-12">Nenhum cliente encontrado.</p>}
                            {clientPortfolio.map((client, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => { setSelectedClientName(client.name); setViewMode('client_history'); }}
                                    className="bg-ifa-base border border-ifa-border p-4 rounded-xl flex items-center justify-between cursor-pointer hover:border-ifa-gold hover:bg-ifa-surface transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-ifa-base-dark p-3 rounded-full text-ifa-gold">
                                            <Users size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-ifa-text text-lg">{client.name}</h4>
                                            <p className="text-xs text-ifa-neutral">{client.records.length} atendimentos registrados</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex items-center gap-4">
                                        <div>
                                            <p className="text-[10px] uppercase text-ifa-neutral font-bold">Dívida Total</p>
                                            <p className={`text-lg font-bold ${client.totalDebt > 0 ? 'text-red-400' : 'text-green-400'}`}>
                                                R$ {client.totalDebt.toFixed(2)}
                                            </p>
                                        </div>
                                        <ChevronRight className="text-ifa-neutral" size={20} />
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FinancialManager;
