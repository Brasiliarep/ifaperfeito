
import React, { useEffect, useState } from 'react';
import { ConsultationRecord, ConsultationStatus } from '../types';
import { getHistory, deleteConsultation, saveConsultation } from '../services/storageService';
import { Trash2, Eye, User, Calendar, CheckSquare, Square, RefreshCcw, MessageCircle, Clock } from 'lucide-react';

interface Props {
    onBack: () => void;
    onView: (record: ConsultationRecord) => void;
}

const ConsultationHistory: React.FC<Props> = ({ onBack, onView }) => {
    const [history, setHistory] = useState<ConsultationRecord[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setHistory(getHistory());
    }

    const handleDelete = (id: string) => {
        if(confirm("Tem certeza que deseja apagar este registro?")) {
            deleteConsultation(id);
            loadData();
        }
    }

    const toggleStatus = (record: ConsultationRecord) => {
        const newStatus: ConsultationStatus = record.status === 'completed' ? 'pending' : 'completed';
        const updatedHistory = history.map(r => r.id === record.id ? {...r, status: newStatus} : r);
        setHistory(updatedHistory);
        localStorage.setItem('ifa_consultations_v1', JSON.stringify(updatedHistory));
    }

    const sendReturnReminder = (record: ConsultationRecord) => {
        // Calculate 16 days from consultation
        // Note: record.timestamp is locale string, we need to parse it or use stored ISO if available.
        // For simplicity, assuming the record was created recently or parsing loosely.
        // In a real app, store ISO timestamp separately.
        
        const msg = `Olá ${record.client.fullName}, aqui é do Templo de Ifá. \nPassaram-se os dias desde sua consulta (${record.timestamp}). \nÉ importante agendarmos o retorno para verificar a aceitação do Ebó (Ita). \nPodemos marcar?`;
        window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    }

    return (
        <div className="min-h-screen p-8 max-w-6xl mx-auto">
             <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-serif text-ifa-gold">Histórico de Atendimentos</h2>
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text">Voltar ao Início</button>
             </div>

             {history.length === 0 ? (
                 <div className="text-center text-ifa-neutral py-12 bg-ifa-surface rounded-xl border border-ifa-border">
                     <p>Nenhum atendimento registrado.</p>
                 </div>
             ) : (
                 <div className="grid gap-4">
                     {history.map(record => (
                         <div key={record.id} className={`bg-ifa-base border p-6 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4 transition-all ${record.status === 'completed' ? 'border-green-900/50 bg-green-900/5' : 'border-ifa-border hover:border-ifa-gold'}`}>
                             <div className="flex-1">
                                 <h3 className="text-xl font-bold text-ifa-text flex items-center gap-2">
                                     <User size={18} className="text-ifa-gold"/> {record.client.fullName}
                                 </h3>
                                 <p className="text-sm text-ifa-neutral flex items-center gap-2 mt-1">
                                     <Calendar size={14}/> {record.client.consultationTime}
                                 </p>
                             </div>
                             
                             <div className="text-center">
                                 <span className="text-2xl font-serif text-ifa-gold font-bold">{record.odu.name}</span>
                                 <div className={`text-xs uppercase font-bold px-2 py-0.5 rounded mt-1 ${record.interpretation.ireOrOsogbo === 'Irê' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                                     {record.interpretation.ireOrOsogbo}
                                 </div>
                             </div>

                             <div className="flex items-center gap-2 border-l border-ifa-border pl-4 md:border-l-0 md:pl-0 flex-wrap justify-center">
                                 
                                 {/* Return Reminder Button */}
                                 {record.status !== 'completed' && (
                                     <button 
                                        onClick={() => sendReturnReminder(record)}
                                        className="p-3 bg-blue-900/20 text-blue-400 border border-blue-900/50 rounded hover:bg-blue-900/40"
                                        title="Lembrete de Retorno (16 dias)"
                                     >
                                         <Clock size={20} />
                                     </button>
                                 )}

                                 <button 
                                    onClick={() => toggleStatus(record)}
                                    className={`flex items-center gap-2 px-3 py-2 rounded text-xs font-bold uppercase transition-colors mr-2 ${record.status === 'completed' ? 'bg-green-900 text-green-400' : 'bg-yellow-900/30 text-yellow-500'}`}
                                    title={record.status === 'completed' ? 'Marcar como Pendente' : 'Marcar como Concluído'}
                                 >
                                     {record.status === 'completed' ? <CheckSquare size={16} /> : <Square size={16} />}
                                     {record.status === 'completed' ? 'Concluído' : 'Pendente'}
                                 </button>

                                 <button onClick={() => onView(record)} className="p-3 bg-ifa-wood text-white rounded hover:opacity-90" title="Ver/Imprimir">
                                     <Eye size={20} />
                                 </button>
                                 <button onClick={() => handleDelete(record.id)} className="p-3 bg-red-900/50 text-red-400 border border-red-900 rounded hover:bg-red-900" title="Apagar">
                                     <Trash2 size={20} />
                                 </button>
                             </div>
                         </div>
                     ))}
                 </div>
             )}
        </div>
    );
};

export default ConsultationHistory;
