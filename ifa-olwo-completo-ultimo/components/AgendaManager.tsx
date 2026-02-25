
import React, { useState, useEffect } from 'react';
import { ArrowLeft, CalendarDays, Plus, MessageCircle, Trash2, Clock, CheckCircle2, User, Search, RefreshCw } from 'lucide-react';
import { AgendaEvent, EventType } from '../types';
import { getAgendaEvents, saveAgendaEvent, deleteAgendaEvent, getHistory } from '../services/storageService';

const AgendaManager = ({ onBack }: { onBack: () => void }) => {
    const [events, setEvents] = useState<AgendaEvent[]>([]);
    const [view, setView] = useState<'list' | 'add'>('list');
    const [filter, setFilter] = useState<'all' | 'today' | 'upcoming'>('all');
    
    // Form State
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [eventType, setEventType] = useState<EventType>('return_16');
    const [customDate, setCustomDate] = useState('');
    const [description, setDescription] = useState('');
    
    // Autocomplete State
    const [suggestions, setSuggestions] = useState<{name: string, phone: string}[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = () => {
        const data = getAgendaEvents();
        // Sort by date (nearest first)
        const sorted = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setEvents(sorted);
    };

    const handleClientType = (val: string) => {
        setClientName(val);
        if (val.length > 1) {
            const history = getHistory();
            const uniqueClients = new Map();
            history.forEach(r => {
                if (!uniqueClients.has(r.client.fullName)) {
                    uniqueClients.set(r.client.fullName, r.client.phone);
                }
            });
            
            const matches = Array.from(uniqueClients.entries())
                .filter(([name]) => name.toLowerCase().includes(val.toLowerCase()))
                .map(([name, phone]) => ({ name, phone }))
                .slice(0, 5);
            
            setSuggestions(matches);
            setShowSuggestions(matches.length > 0);
        } else {
            setShowSuggestions(false);
        }
    };

    const selectSuggestion = (s: {name: string, phone: string}) => {
        setClientName(s.name);
        setClientPhone(s.phone);
        setShowSuggestions(false);
    };

    const handleQuickAdd = (days: number, type: EventType, defaultDesc: string) => {
        const date = new Date();
        date.setDate(date.getDate() + days);
        const dateStr = date.toISOString().split('T')[0];
        
        setCustomDate(dateStr);
        setEventType(type);
        setDescription(defaultDesc);
        // Don't change view yet, let user fill client
    };

    const saveEvent = () => {
        if (!clientName || !customDate) return;

        const newEvent: AgendaEvent = {
            id: crypto.randomUUID(),
            clientName,
            clientPhone,
            date: customDate,
            type: eventType,
            description: description || getTypeLabel(eventType),
            completed: false
        };

        saveAgendaEvent(newEvent);
        loadEvents();
        setView('list');
        // Reset form
        setClientName('');
        setClientPhone('');
        setDescription('');
    };

    const toggleComplete = (event: AgendaEvent) => {
        const updated = { ...event, completed: !event.completed };
        saveAgendaEvent(updated);
        loadEvents();
    };

    const handleDelete = (id: string) => {
        if (confirm("Apagar compromisso?")) {
            deleteAgendaEvent(id);
            loadEvents();
        }
    };

    const sendWhatsapp = (event: AgendaEvent) => {
        if (!event.clientPhone) {
            alert("Telefone do cliente não cadastrado.");
            return;
        }

        const today = new Date().toLocaleDateString();
        let message = `Olá ${event.clientName}, a benção de Ifá! \n`;
        
        switch (event.type) {
            case 'return_16':
                message += `Este é um lembrete do Templo. Hoje completa o ciclo de 16 dias do seu jogo. É importante verificarmos o Ita (aceitação do Ebó) para garantir que os caminhos continuem abertos. Podemos agendar?`;
                break;
            case 'cycle_7':
                message += `Passaram-se 7 dias do seu ritual. Lembre-se que hoje encerra o preceito. Como você está se sentindo?`;
                break;
            case 'restriction':
                message += `Lembrete importante do seu Odu: Hoje é um dia de atenção com a proibição (Ewo) de ${event.description}. Mantenha a disciplina.`;
                break;
            default:
                message += `Lembrete de compromisso espiritual: ${event.description}.`;
        }

        const link = `https://wa.me/${event.clientPhone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(link, '_blank');
    };

    const getTypeLabel = (type: string) => {
        switch(type) {
            case 'return_16': return 'Retorno (16 Dias)';
            case 'cycle_7': return 'Ciclo de 7 Dias';
            case 'cycle_3': return 'Ciclo de 3 Dias';
            case 'restriction': return 'Alerta de Ewo';
            default: return 'Geral';
        }
    };

    const getTypeColor = (type: string) => {
        switch(type) {
            case 'return_16': return 'text-purple-400 border-purple-500 bg-purple-900/20';
            case 'cycle_7': return 'text-blue-400 border-blue-500 bg-blue-900/20';
            case 'restriction': return 'text-red-400 border-red-500 bg-red-900/20';
            default: return 'text-ifa-gold border-ifa-gold bg-ifa-gold/10';
        }
    };

    const filteredEvents = events.filter(e => {
        const eventDate = new Date(e.date);
        const today = new Date();
        today.setHours(0,0,0,0);
        eventDate.setHours(0,0,0,0);

        if (filter === 'today') return eventDate.getTime() === today.getTime();
        if (filter === 'upcoming') return eventDate.getTime() >= today.getTime();
        return true;
    });

    if (view === 'add') {
        return (
            <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
                <div className="max-w-xl mx-auto">
                    <button onClick={() => setView('list')} className="flex items-center gap-2 text-ifa-neutral mb-6"><ArrowLeft /> Voltar</button>
                    <h2 className="text-2xl font-serif text-ifa-gold mb-6">Novo Compromisso</h2>

                    <div className="bg-ifa-base border border-ifa-border rounded-xl p-6 shadow-xl">
                        {/* Quick Actions */}
                        <div className="mb-6 grid grid-cols-3 gap-2">
                            <button onClick={() => handleQuickAdd(16, 'return_16', 'Verificar Ita do Ebó')} className="p-2 border border-purple-500/50 rounded bg-purple-900/20 text-xs font-bold text-purple-300 hover:bg-purple-900/40">+16 Dias (Ita)</button>
                            <button onClick={() => handleQuickAdd(7, 'cycle_7', 'Fim do Preceito')} className="p-2 border border-blue-500/50 rounded bg-blue-900/20 text-xs font-bold text-blue-300 hover:bg-blue-900/40">+7 Dias (Ciclo)</button>
                            <button onClick={() => handleQuickAdd(3, 'cycle_3', 'Banho de Ervas')} className="p-2 border border-green-500/50 rounded bg-green-900/20 text-xs font-bold text-green-300 hover:bg-green-900/40">+3 Dias (Banho)</button>
                        </div>

                        <div className="space-y-4">
                            <div className="relative">
                                <label className="text-xs uppercase font-bold text-ifa-neutral block mb-1">Cliente</label>
                                <input 
                                    value={clientName}
                                    onChange={e => handleClientType(e.target.value)}
                                    className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text"
                                    placeholder="Buscar nome..."
                                />
                                {showSuggestions && (
                                    <ul className="absolute z-10 w-full bg-ifa-surface border border-ifa-gold rounded-b shadow-xl max-h-40 overflow-y-auto">
                                        {suggestions.map((s, i) => (
                                            <li key={i} onClick={() => selectSuggestion(s)} className="p-3 hover:bg-ifa-gold hover:text-black cursor-pointer text-sm border-b border-ifa-border/30">
                                                {s.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div>
                                <label className="text-xs uppercase font-bold text-ifa-neutral block mb-1">Telefone (WhatsApp)</label>
                                <input 
                                    value={clientPhone}
                                    onChange={e => setClientPhone(e.target.value)}
                                    className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text"
                                    placeholder="5511999999999"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs uppercase font-bold text-ifa-neutral block mb-1">Data</label>
                                    <input 
                                        type="date"
                                        value={customDate}
                                        onChange={e => setCustomDate(e.target.value)}
                                        className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs uppercase font-bold text-ifa-neutral block mb-1">Tipo</label>
                                    <select 
                                        value={eventType}
                                        onChange={e => setEventType(e.target.value as EventType)}
                                        className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text"
                                    >
                                        <option value="return_16">Retorno (16 Dias)</option>
                                        <option value="cycle_7">Ciclo 7 Dias</option>
                                        <option value="restriction">Alerta de Ewo</option>
                                        <option value="offering">Oferenda</option>
                                        <option value="other">Outro</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs uppercase font-bold text-ifa-neutral block mb-1">Descrição</label>
                                <textarea 
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    className="w-full bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text h-24"
                                />
                            </div>

                            <button onClick={saveEvent} className="w-full bg-ifa-gold text-ifa-base font-bold py-3 rounded-lg hover:opacity-90 mt-4">
                                Agendar Compromisso
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- LIST VIEW ---
    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft size={24} /></button>
                    <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                        <CalendarDays size={24} /> Agenda Litúrgica
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="flex bg-ifa-base border border-ifa-border rounded-lg p-1">
                        <button onClick={() => setFilter('today')} className={`px-4 py-2 rounded text-xs font-bold uppercase ${filter === 'today' ? 'bg-ifa-gold text-ifa-base' : 'text-ifa-neutral'}`}>Hoje</button>
                        <button onClick={() => setFilter('upcoming')} className={`px-4 py-2 rounded text-xs font-bold uppercase ${filter === 'upcoming' ? 'bg-ifa-gold text-ifa-base' : 'text-ifa-neutral'}`}>Futuros</button>
                        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded text-xs font-bold uppercase ${filter === 'all' ? 'bg-ifa-gold text-ifa-base' : 'text-ifa-neutral'}`}>Todos</button>
                    </div>
                    <button onClick={() => setView('add')} className="bg-ifa-gold text-ifa-base px-6 py-2 rounded-lg font-bold uppercase flex items-center gap-2 hover:opacity-90">
                        <Plus size={20} /> Agendar
                    </button>
                </div>

                <div className="space-y-3">
                    {filteredEvents.length === 0 && <p className="text-center text-ifa-neutral py-12">Nenhum compromisso encontrado.</p>}
                    
                    {filteredEvents.map(event => {
                        const isToday = new Date(event.date).toLocaleDateString() === new Date().toLocaleDateString();
                        const isPast = new Date(event.date) < new Date() && !isToday;
                        
                        return (
                            <div key={event.id} className={`bg-ifa-base border p-4 rounded-xl flex flex-col md:flex-row items-center gap-4 transition-all ${event.completed ? 'opacity-60 border-ifa-border' : isToday ? 'border-ifa-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]' : 'border-ifa-border'}`}>
                                
                                {/* Date Box */}
                                <div className={`flex flex-col items-center justify-center p-3 rounded-lg min-w-[80px] ${isToday ? 'bg-ifa-gold text-ifa-base' : isPast ? 'bg-red-900/30 text-red-400' : 'bg-ifa-base-dark text-ifa-neutral'}`}>
                                    <span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'short' })}</span>
                                    <span className="text-2xl font-bold">{new Date(event.date).getDate()}</span>
                                    <span className="text-[10px] uppercase">{new Date(event.date).toLocaleDateString(undefined, { month: 'short' })}</span>
                                </div>

                                <div className="flex-grow text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                        <h3 className="font-bold text-lg text-ifa-text">{event.clientName}</h3>
                                        <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold ${getTypeColor(event.type)}`}>
                                            {getTypeLabel(event.type)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-ifa-neutral">{event.description}</p>
                                </div>

                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => sendWhatsapp(event)}
                                        className="p-3 bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/50 rounded-full hover:bg-[#25D366] hover:text-white transition-all"
                                        title="Enviar Lembrete WhatsApp"
                                    >
                                        <MessageCircle size={20} />
                                    </button>
                                    
                                    <button 
                                        onClick={() => toggleComplete(event)}
                                        className={`p-3 rounded-full border transition-all ${event.completed ? 'bg-green-900 text-green-400 border-green-500' : 'bg-ifa-base-dark text-ifa-neutral border-ifa-border hover:border-ifa-gold'}`}
                                        title={event.completed ? "Reabrir" : "Concluir"}
                                    >
                                        {event.completed ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                                    </button>

                                    <button onClick={() => handleDelete(event.id)} className="p-3 bg-red-900/20 text-red-400 border border-red-900 rounded-full hover:bg-red-900 hover:text-white transition-all">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default AgendaManager;
