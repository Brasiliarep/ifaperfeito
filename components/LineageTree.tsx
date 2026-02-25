
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Plus, GitBranch, Calendar } from 'lucide-react';

interface Member {
    id: string;
    name: string;
    role: 'Oluwo' | 'Ojugbona' | 'Apetebi' | 'Omo Awo';
    initiationDate: string;
    parentId?: string; // Who initiated them
}

const LineageTree = ({ onBack }: { onBack: () => void }) => {
    const [members, setMembers] = useState<Member[]>([]);
    const [newName, setNewName] = useState('');
    const [newRole, setNewRole] = useState('Omo Awo');
    const [newDate, setNewDate] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('ifa_lineage');
        if (saved) setMembers(JSON.parse(saved));
    }, []);

    const saveMembers = (list: Member[]) => {
        setMembers(list);
        localStorage.setItem('ifa_lineage', JSON.stringify(list));
    };

    const addMember = () => {
        if (!newName) return;
        const newM: Member = {
            id: crypto.randomUUID(),
            name: newName,
            role: newRole as any,
            initiationDate: newDate
        };
        saveMembers([...members, newM]);
        setNewName('');
        setNewDate('');
    };

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft size={24} /></button>
                    <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                        <GitBranch size={24} /> Árvore de Axé (Genealogia)
                    </h1>
                </div>

                <div className="bg-ifa-base border border-ifa-border rounded-xl p-6 mb-8">
                    <h3 className="text-sm font-bold text-ifa-gold uppercase mb-4">Novo Membro da Família</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input 
                            placeholder="Nome do Iniciado" 
                            value={newName} 
                            onChange={e => setNewName(e.target.value)}
                            className="bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text"
                        />
                        <select 
                            value={newRole}
                            onChange={e => setNewRole(e.target.value)}
                            className="bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text"
                        >
                            <option>Omo Awo</option>
                            <option>Apetebi</option>
                            <option>Iyanifa</option>
                            <option>Babalawo</option>
                        </select>
                        <input 
                            type="date"
                            value={newDate}
                            onChange={e => setNewDate(e.target.value)}
                            className="bg-ifa-base-dark border border-ifa-border rounded p-3 text-ifa-text"
                        />
                    </div>
                    <button onClick={addMember} className="w-full bg-ifa-gold text-ifa-base py-3 rounded font-bold hover:opacity-90 flex items-center justify-center gap-2">
                        <Plus size={18} /> Adicionar à Linhagem
                    </button>
                </div>

                <div className="relative border-l-2 border-ifa-wood ml-4 space-y-8 pl-8 py-4">
                    {members.length === 0 && <p className="text-ifa-neutral italic">Nenhum membro registrado.</p>}
                    
                    {members.map(m => (
                        <div key={m.id} className="relative bg-ifa-base border border-ifa-border p-4 rounded-lg shadow-lg">
                            {/* Connector line */}
                            <div className="absolute top-1/2 -left-10 w-10 h-0.5 bg-ifa-wood"></div>
                            
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-xl text-ifa-text">{m.name}</h4>
                                    <span className="bg-ifa-wood text-white text-[10px] px-2 py-0.5 rounded uppercase">{m.role}</span>
                                </div>
                                {m.initiationDate && (
                                    <div className="text-xs text-ifa-neutral flex items-center gap-1">
                                        <Calendar size={12} /> {new Date(m.initiationDate).toLocaleDateString()}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LineageTree;
