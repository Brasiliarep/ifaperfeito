
import React, { useState } from 'react';
import { ClientData } from '../types';
import { User, Mail, Phone, MapPin, Briefcase, Heart, Clock, CalendarDays, Zap } from 'lucide-react';
import { useAuth } from '../services/AuthContext';

interface Props {
  onRegister: (data: ClientData) => void;
  onCancel: () => void;
}

const ClientRegistration: React.FC<Props> = ({ onRegister, onCancel }) => {
  const { userProfile } = useAuth();
  const [formData, setFormData] = useState<Partial<ClientData>>({
    consultationTime: new Date().toLocaleString(),
    maritalStatus: 'Solteiro(a)'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.mothersName) {
      onRegister({
        ...formData,
        id: crypto.randomUUID(),
        consultationTime: formData.consultationTime || new Date().toLocaleString()
      } as ClientData);
    }
  };

  // --- ADMIN SHORTCUT ---
  const handleAdminQuickStart = () => {
      onRegister({
          id: 'admin_test_user',
          fullName: 'Sacerdote Admin (Teste)',
          dateOfBirth: '1980-01-01',
          mothersName: 'Iya Agba',
          address: 'Templo Principal',
          profession: 'Babalawo',
          maritalStatus: 'Casado(a)',
          phone: '000000000',
          email: 'admin@templo.com',
          consultationTime: new Date().toLocaleString()
      });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-ifa-base border border-ifa-border rounded-3xl shadow-2xl relative">
      
      {/* Admin Quick Authorize Button (Top Right) */}
      {userProfile?.role === 'admin' && (
      <button 
        type="button" 
        onClick={handleAdminQuickStart}
        className="absolute top-4 right-4 text-green-400 hover:text-green-300 bg-green-950/40 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5 text-[10px] uppercase font-bold border border-green-500/30 hover:border-green-400/60 z-10 shadow-lg shadow-green-900/30"
        title="Pular formulário e iniciar consulta de teste"
      >
        <Zap size={14} /> <span>Autorizar Teste</span>
      </button>
      )}

      <h2 className="text-3xl font-serif text-ifa-gold mb-6 text-center">Cadastro do Consulente</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-ifa-neutral text-sm flex items-center gap-2"><User size={14}/> Nome Completo</label>
            <input required name="fullName" onChange={handleChange} className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded p-3 focus:border-ifa-gold outline-none" />
          </div>

          <div className="space-y-2">
             <label className="text-ifa-neutral text-sm flex items-center gap-2"><CalendarDays size={14}/> Data de Nascimento</label>
             <input type="date" required name="dateOfBirth" onChange={handleChange} className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded p-3 focus:border-ifa-gold outline-none" />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <label className="text-ifa-neutral text-sm flex items-center gap-2"><Heart size={14}/> Nome da Mãe</label>
            <input required name="mothersName" onChange={handleChange} className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded p-3 focus:border-ifa-gold outline-none" />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-ifa-neutral text-sm flex items-center gap-2"><MapPin size={14}/> Endereço</label>
            <input name="address" onChange={handleChange} className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded p-3 focus:border-ifa-gold outline-none" />
          </div>

          <div className="space-y-2">
             <label className="text-ifa-neutral text-sm flex items-center gap-2"><Briefcase size={14}/> Profissão</label>
             <input name="profession" onChange={handleChange} className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded p-3 focus:border-ifa-gold outline-none" />
          </div>

          <div className="space-y-2">
             <label className="text-ifa-neutral text-sm">Estado Civil</label>
             <select name="maritalStatus" onChange={handleChange} className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded p-3 focus:border-ifa-gold outline-none">
               <option>Solteiro(a)</option>
               <option>Casado(a)</option>
               <option>Divorciado(a)</option>
               <option>Viúvo(a)</option>
             </select>
          </div>

          <div className="space-y-2">
             <label className="text-ifa-neutral text-sm flex items-center gap-2"><Phone size={14}/> Telefone</label>
             <input name="phone" onChange={handleChange} className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded p-3 focus:border-ifa-gold outline-none" />
          </div>

          <div className="space-y-2">
             <label className="text-ifa-neutral text-sm flex items-center gap-2"><Mail size={14}/> E-mail</label>
             <input type="email" name="email" onChange={handleChange} className="w-full bg-ifa-base-dark border border-ifa-border text-ifa-text rounded p-3 focus:border-ifa-gold outline-none" />
          </div>
          
           <div className="space-y-2 md:col-span-2">
             <label className="text-ifa-neutral text-sm flex items-center gap-2"><Clock size={14}/> Hora do Atendimento</label>
             <input disabled value={formData.consultationTime} className="w-full bg-ifa-surface border border-ifa-border text-ifa-neutral rounded p-3 cursor-not-allowed" />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
           <button type="button" onClick={onCancel} className="flex-1 py-4 border border-ifa-border text-ifa-neutral hover:text-ifa-text rounded uppercase font-bold tracking-widest transition-colors">
            Cancelar
          </button>
          <button type="submit" className="flex-1 py-4 bg-ifa-gold text-ifa-base font-serif font-bold uppercase tracking-widest hover:opacity-90 rounded shadow-lg transition-colors">
            Iniciar Consulta
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientRegistration;
