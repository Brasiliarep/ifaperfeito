import React, { useEffect, useState } from 'react';
import { useAuth } from '../services/AuthContext';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';
import { UserProfile, SubscriptionPlan } from '../types';
import { Shield, Search, Loader2, Calendar, Crown, XCircle, ArrowLeft, Pencil, Trash2, X, Check, AlertTriangle, RefreshCw, UserPlus, Sparkles } from 'lucide-react';
import { auth } from '../services/firebaseConfig';

interface AdminPanelProps {
    onBack: () => void;
}

interface EditModalProps {
    user: UserProfile;
    onSave: (uid: string, newName: string, newEmail: string, newNote: string) => Promise<void>;
    onClose: () => void;
    saving: boolean;
}

const EditModal: React.FC<EditModalProps> = ({ user, onSave, onClose, saving }) => {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [note, setNote] = useState((user as any).note || '');

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-[#1a1611] border border-ifa-gold/40 rounded-2xl p-6 w-full max-w-md shadow-2xl relative" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-amber-500/20 p-2 rounded-full text-amber-400">
                            <Pencil size={18} />
                        </div>
                        <h2 className="text-lg font-bold text-white uppercase tracking-widest">Editar Sacerdote</h2>
                    </div>
                    <button onClick={onClose} className="text-ifa-neutral hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Aviso de e-mail */}
                <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-5 text-xs text-amber-300">
                    <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                    <span>Alterar o e-mail aqui atualiza apenas o perfil interno. O login do Firebase Auth permanece inalterado. Use com cuidado.</span>
                </div>

                {/* Campos */}
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-ifa-neutral uppercase tracking-widest block mb-1.5">Nome de Exibição</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full bg-black/60 border border-ifa-border text-white px-4 py-2.5 rounded-lg focus:border-ifa-gold outline-none transition-colors"
                            placeholder="Nome do sacerdote"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-ifa-neutral uppercase tracking-widest block mb-1.5">E-mail (perfil interno)</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full bg-black/60 border border-ifa-border text-white px-4 py-2.5 rounded-lg focus:border-ifa-gold outline-none transition-colors"
                            placeholder="email@exemplo.com"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-ifa-neutral uppercase tracking-widest block mb-1.5">Nota Interna (opcional)</label>
                        <textarea
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            rows={3}
                            className="w-full bg-black/60 border border-ifa-border text-white px-4 py-2.5 rounded-lg focus:border-ifa-gold outline-none transition-colors resize-none text-sm"
                            placeholder="Anotações internas sobre este sacerdote..."
                        />
                    </div>
                </div>

                {/* Botões */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        disabled={saving}
                        className="flex-1 py-2.5 border border-white/20 text-ifa-neutral rounded-lg hover:bg-white/5 transition-colors text-sm font-bold"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => onSave(user.uid, name.trim(), email.trim(), note.trim())}
                        disabled={saving || !name.trim() || !email.trim()}
                        className="flex-1 py-2.5 bg-ifa-gold text-black rounded-lg hover:opacity-90 transition-opacity text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                        {saving ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

interface DeleteModalProps {
    user: UserProfile;
    onConfirm: (uid: string) => Promise<void>;
    onClose: () => void;
    deleting: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ user, onConfirm, onClose, deleting }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-[#1a1611] border border-red-500/40 rounded-2xl p-6 w-full max-w-md shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="bg-red-500/20 p-2 rounded-full text-red-400">
                        <Trash2 size={18} />
                    </div>
                    <h2 className="text-lg font-bold text-white uppercase tracking-widest">Excluir Registro</h2>
                </div>
                <button onClick={onClose} className="text-ifa-neutral hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-5">
                <p className="text-white font-bold">{user.name}</p>
                <p className="text-ifa-neutral text-sm">{user.email}</p>
            </div>

            <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-5 text-xs text-amber-300">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <span>Isso remove o perfil do banco de dados, mas <strong>não exclui o login do Firebase Auth</strong>. O usuário pode se recadastrar. Para exclusão total, use o Console do Firebase.</span>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={onClose}
                    disabled={deleting}
                    className="flex-1 py-2.5 border border-white/20 text-ifa-neutral rounded-lg hover:bg-white/5 transition-colors text-sm font-bold"
                >
                    Cancelar
                </button>
                <button
                    onClick={() => onConfirm(user.uid)}
                    disabled={deleting}
                    className="flex-1 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-60"
                >
                    {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                    {deleting ? 'Excluindo...' : 'Confirmar Exclusão'}
                </button>
            </div>
        </div>
    </div>
);

const API_KEY = "AIzaSyDHW0PpLoUAVaFQrkLt5hSAMQ-ZVOZlK40";

interface CreateUserModalProps {
    onClose: () => void;
    onCreated: () => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({ onClose, onCreated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [plan, setPlan] = useState<SubscriptionPlan>('pro_monthly');
    const [lifetime, setLifetime] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // 1. Cria o usuário no Firebase Auth via REST API (sem deslogar o admin)
            const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, returnSecureToken: true })
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error.message || 'Erro ao criar conta');
            }

            const uid: string = data.localId;

            // 2. Cria o perfil no Firestore
            const profile: UserProfile & { validUntil?: string | null } = {
                uid,
                email,
                name: name.trim() || email.split('@')[0],
                plan: lifetime ? 'pro_annual' : plan,
                validUntil: lifetime ? null : (() => {
                    const date = new Date();
                    date.setFullYear(date.getFullYear() + 5);
                    return date.toISOString();
                })(),
                role: 'user',
                consultationCount: 0,
                studyCount: 0
            } as UserProfile;

            const { setDoc, doc } = await import('firebase/firestore');
            const { db } = await import('../services/firebaseConfig');
            await setDoc(doc(db, 'users', uid), profile);

            setSuccess(`Sacerdote "${name || email}" criado com sucesso!`);
            setEmail('');
            setPassword('');
            setName('');
            onCreated();
        } catch (err: any) {
            setError(err.message || 'Erro ao criar usuário. Verifique se o e-mail já está cadastrado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-[#1a1611] border border-ifa-gold/40 rounded-2xl p-6 w-full max-w-md shadow-2xl relative" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-500/20 p-2 rounded-full text-emerald-400">
                            <UserPlus size={18} />
                        </div>
                        <h2 className="text-lg font-bold text-white uppercase tracking-widest">Novo Sacerdote</h2>
                    </div>
                    <button onClick={onClose} className="text-ifa-neutral hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {error && <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded mb-4">{error}</div>}
                {success && <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 text-sm p-3 rounded mb-4">{success}</div>}

                <form onSubmit={handleCreate} className="space-y-4">
                    <div>
                        <label className="text-xs text-ifa-neutral uppercase tracking-widest block mb-1.5">E-mail *</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                            className="w-full bg-black/60 border border-ifa-border text-white px-4 py-2.5 rounded-lg focus:border-ifa-gold outline-none transition-colors"
                            placeholder="email@exemplo.com" />
                    </div>
                    <div>
                        <label className="text-xs text-ifa-neutral uppercase tracking-widest block mb-1.5">Senha *</label>
                        <input type="text" value={password} onChange={e => setPassword(e.target.value)} required
                            className="w-full bg-black/60 border border-ifa-border text-white px-4 py-2.5 rounded-lg focus:border-ifa-gold outline-none transition-colors"
                            placeholder="senha temporária" />
                    </div>
                    <div>
                        <label className="text-xs text-ifa-neutral uppercase tracking-widest block mb-1.5">Nome de Exibição</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)}
                            className="w-full bg-black/60 border border-ifa-border text-white px-4 py-2.5 rounded-lg focus:border-ifa-gold outline-none transition-colors"
                            placeholder="Nome do sacerdote" />
                    </div>

                    <div>
                        <label className="text-xs text-ifa-neutral uppercase tracking-widest block mb-1.5">Plano de Acesso</label>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { value: 'student_monthly' as SubscriptionPlan, label: 'Estudante' },
                                { value: 'pro_monthly' as SubscriptionPlan, label: 'PRO Mensal' },
                                { value: 'pro_annual' as SubscriptionPlan, label: 'PRO Anual' },
                            ].map(p => (
                                <button key={p.value} type="button" onClick={() => { setPlan(p.value); setLifetime(false); }}
                                    className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${plan === p.value && !lifetime
                                        ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
                                        : 'bg-black/40 text-ifa-neutral border-white/10 hover:border-white/30'}`}>
                                    {p.label}
                                </button>
                            ))}
                            <button type="button" onClick={() => setLifetime(true)}
                                className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all col-span-2 flex items-center justify-center gap-2 ${lifetime
                                    ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
                                    : 'bg-black/40 text-ifa-neutral border-white/10 hover:border-white/30'}`}>
                                <Crown size={14} /> Vitalício
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} disabled={loading}
                            className="flex-1 py-2.5 border border-white/20 text-ifa-neutral rounded-lg hover:bg-white/5 transition-colors text-sm font-bold">
                            Cancelar
                        </button>
                        <button type="submit" disabled={loading || !email || !password}
                            className="flex-1 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50">
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                            {loading ? 'Criando...' : 'Criar Sacerdote'}
                        </button>
                    </div>
                </form>

                {success && (
                    <button onClick={onClose} className="w-full mt-4 py-2.5 bg-ifa-gold text-black rounded-lg font-bold text-sm">
                        Fechar
                    </button>
                )}
            </div>
        </div>
    );
};

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
    const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
    const [deletingUser, setDeletingUser] = useState<UserProfile | null>(null);
    const [savingEdit, setSavingEdit] = useState(false);
    const [confirmingDelete, setConfirmingDelete] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, 'users'));
            const usersData: UserProfile[] = [];
            querySnapshot.forEach((doc) => {
                usersData.push(doc.data() as UserProfile);
            });
            usersData.sort((a, b) => {
                if (a.role === 'admin' && b.role !== 'admin') return -1;
                if (a.role !== 'admin' && b.role === 'admin') return 1;
                return a.email.localeCompare(b.email);
            });
            setUsers(usersData);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            alert("Erro ao buscar usuários. Verifique as permissões do banco de dados.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleGrantAccess = async (userId: string, plan: SubscriptionPlan, days: number | 'lifetime') => {
        setUpdatingUserId(userId);
        try {
            const userRef = doc(db, 'users', userId);
            let validUntil: string | null = null;
            if (days !== 'lifetime') {
                const date = new Date();
                date.setDate(date.getDate() + days);
                validUntil = date.toISOString();
            }
            await updateDoc(userRef, { plan, validUntil });
            setUsers(users.map(u => u.uid === userId ? { ...u, plan, validUntil: validUntil || undefined } : u));
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            alert("Erro ao conceder acesso.");
        } finally {
            setUpdatingUserId(null);
        }
    };

    const handleRevokeAccess = async (userId: string) => {
        if (!window.confirm("Tem certeza que deseja revogar o acesso deste usuário?")) return;
        setUpdatingUserId(userId);
        try {
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, { plan: 'free', validUntil: null });
            setUsers(users.map(u => u.uid === userId ? { ...u, plan: 'free', validUntil: undefined } : u));
        } catch (error) {
            console.error("Erro ao revogar acesso:", error);
            alert("Erro ao revogar acesso.");
        } finally {
            setUpdatingUserId(null);
        }
    };

    const handleSaveEdit = async (uid: string, newName: string, newEmail: string, newNote: string) => {
        setSavingEdit(true);
        try {
            const userRef = doc(db, 'users', uid);
            await updateDoc(userRef, { name: newName, email: newEmail, note: newNote });
            setUsers(users.map(u => u.uid === uid ? { ...u, name: newName, email: newEmail, note: newNote } as any : u));
            setEditingUser(null);
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
            alert("Erro ao salvar as alterações.");
        } finally {
            setSavingEdit(false);
        }
    };

    const handleDeleteUser = async (uid: string) => {
        setConfirmingDelete(true);
        try {
            await deleteDoc(doc(db, 'users', uid));
            setUsers(users.filter(u => u.uid !== uid));
            setDeletingUser(null);
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
            alert("Erro ao excluir o registro do usuário.");
        } finally {
            setConfirmingDelete(false);
        }
    };

    const filteredUsers = users.filter(u =>
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* Modal de Criação */}
            {showCreateModal && (
                <CreateUserModal
                    onClose={() => setShowCreateModal(false)}
                    onCreated={() => setShowCreateModal(false)}
                />
            )}

            {/* Modal de Edição */}
            {editingUser && (
                <EditModal
                    user={editingUser}
                    onSave={handleSaveEdit}
                    onClose={() => !savingEdit && setEditingUser(null)}
                    saving={savingEdit}
                />
            )}

            {/* Modal de Exclusão */}
            {deletingUser && (
                <DeleteModal
                    user={deletingUser}
                    onConfirm={handleDeleteUser}
                    onClose={() => !confirmingDelete && setDeletingUser(null)}
                    deleting={confirmingDelete}
                />
            )}

            <div className="p-4 md:p-8 max-w-7xl mx-auto animate-fade-in">
                {/* Cabeçalho */}
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="p-2 text-ifa-neutral hover:text-ifa-gold transition-colors" title="Voltar">
                        <ArrowLeft size={24} />
                    </button>
                    <div className="bg-red-500/20 p-3 rounded-full text-red-500 ring-1 ring-red-500/50">
                        <Shield size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-serif text-white font-bold uppercase tracking-widest">Painel Master</h1>
                        <p className="text-ifa-neutral">Controle de Acessos e Cortesias</p>
                    </div>
                </div>

                <div className="bg-[#1a1611] border border-ifa-gold/30 rounded-2xl overflow-hidden shadow-2xl">
                    {/* Barra de Busca + Totais + Atualizar */}
                    <div className="p-4 border-b border-ifa-gold/20 flex flex-col md:flex-row gap-4 justify-between items-center bg-black/50">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ifa-neutral" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar por e-mail ou nome..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-black border border-ifa-border text-white pl-10 pr-4 py-2 rounded focus:border-ifa-gold outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-ifa-neutral font-bold">
                                Total: <span className="text-ifa-gold">{users.length}</span>
                            </span>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                title="Criar novo sacerdote"
                                className="p-2 text-emerald-400 hover:text-emerald-300 border border-emerald-500/50 rounded-lg hover:bg-emerald-500/20 transition-all"
                            >
                                <UserPlus size={16} />
                            </button>
                            <button
                                onClick={fetchUsers}
                                disabled={loading}
                                title="Atualizar lista"
                                className="p-2 text-ifa-neutral hover:text-ifa-gold border border-white/10 rounded-lg hover:border-ifa-gold/30 transition-all disabled:opacity-50"
                            >
                                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                            </button>
                        </div>
                    </div>

                    {/* Tabela */}
                    <div className="overflow-x-auto">
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <Loader2 className="animate-spin text-ifa-gold" size={48} />
                            </div>
                        ) : (
                            <table className="w-full text-left text-sm text-gray-300">
                                <thead className="text-xs text-ifa-gold uppercase bg-black/80 border-b border-ifa-gold/20">
                                    <tr>
                                        <th className="px-5 py-4">Usuário</th>
                                        <th className="px-5 py-4 text-center">Status / Plano</th>
                                        <th className="px-5 py-4 text-center">Uso</th>
                                        <th className="px-5 py-4 text-center">Cortesias</th>
                                        <th className="px-5 py-4 text-center">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user) => (
                                        <tr key={user.uid} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                            {/* Nome + Email */}
                                            <td className="px-5 py-4">
                                                <div className="font-bold text-white flex items-center gap-2">
                                                    {user.name}
                                                    {user.role === 'admin' && <Crown size={13} className="text-ifa-gold" />}
                                                </div>
                                                <div className="text-ifa-neutral text-xs mt-0.5">{user.email}</div>
                                                {(user as any).note && (
                                                    <div className="text-[10px] text-amber-400/70 mt-1 italic">📝 {(user as any).note}</div>
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                    user.role === 'admin'
                                                        ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                                                        : user.plan !== 'free'
                                                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                                                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                                                }`}>
                                                    {user.role === 'admin' ? 'Supremo' : user.plan === 'free' ? 'Básico' : 'VIP Premium'}
                                                </span>
                                                {user.validUntil && (
                                                    <div className="text-[10px] text-ifa-neutral mt-2 flex items-center justify-center gap-1">
                                                        <Calendar size={10} /> Expira: {new Date(user.validUntil).toLocaleDateString('pt-BR')}
                                                    </div>
                                                )}
                                            </td>

                                            {/* Uso */}
                                            <td className="px-5 py-4 text-center">
                                                <span className="bg-black px-2 py-1 rounded border border-white/10 text-ifa-gold text-xs">
                                                    {user.consultationCount || 0} cons / {user.studyCount || 0} est
                                                </span>
                                            </td>

                                            {/* Cortesias */}
                                            <td className="px-5 py-4">
                                                <div className="flex flex-wrap items-center justify-center gap-1.5">
                                                    {user.role === 'admin' ? (
                                                        <span className="text-xs text-ifa-neutral italic">Acesso Ilimitado</span>
                                                    ) : updatingUserId === user.uid ? (
                                                        <Loader2 className="animate-spin text-ifa-gold" size={20} />
                                                    ) : (
                                                        <>
                                                            <button onClick={() => handleGrantAccess(user.uid, 'pro_monthly', 1)} className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/50 px-2 py-1 rounded hover:bg-blue-500/40 transition-colors whitespace-nowrap">+1 Dia</button>
                                                            <button onClick={() => handleGrantAccess(user.uid, 'pro_monthly', 3)} className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 px-2 py-1 rounded hover:bg-indigo-500/40 transition-colors whitespace-nowrap">+3 Dias</button>
                                                            <button onClick={() => handleGrantAccess(user.uid, 'student_monthly', 30)} className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/50 px-2 py-1 rounded hover:bg-amber-500/40 transition-colors whitespace-nowrap">+1 Mês Estudante</button>
                                                            <button onClick={() => handleGrantAccess(user.uid, 'pro_monthly', 30)} className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/50 px-2 py-1 rounded hover:bg-purple-500/40 transition-colors whitespace-nowrap">+1 Mês</button>
                                                            <button onClick={() => handleGrantAccess(user.uid, 'pro_annual', 'lifetime')} className="text-[10px] bg-yellow-500/20 text-yellow-300 border border-yellow-500/50 px-2 py-1 rounded hover:bg-yellow-500/40 transition-colors flex items-center gap-1 whitespace-nowrap">
                                                                <Crown size={10} /> Vitalício
                                                            </button>
                                                            {user.plan !== 'free' && (
                                                                <button onClick={() => handleRevokeAccess(user.uid)} title="Revogar Acesso" className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/50 p-1 rounded hover:bg-red-500/40 transition-colors">
                                                                    <XCircle size={13} />
                                                                </button>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Ações: Editar + Excluir */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => setEditingUser(user)}
                                                        title="Editar perfil"
                                                        className="p-2 text-amber-400 hover:text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-all"
                                                    >
                                                        <Pencil size={14} />
                                                    </button>
                                                    {currentUser?.uid !== user.uid ? (
                                                        <button
                                                            onClick={() => setDeletingUser(user)}
                                                            title="Excluir registro"
                                                            className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    ) : (
                                                        <span title="Não é possível excluir sua própria conta" className="p-2 text-white/10 cursor-not-allowed">
                                                            <Trash2 size={14} />
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredUsers.length === 0 && !loading && (
                                        <tr>
                                            <td colSpan={5} className="text-center py-12 text-ifa-neutral">
                                                Nenhum sacerdote encontrado.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminPanel;
