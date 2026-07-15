
import React, { useState } from 'react';
import { ArrowLeft, Sun, Moon, Battery, Calendar } from 'lucide-react';
import { getYorubaDay } from '../utils/yorubaCalendarLogic';

const BioCalendar = ({ onBack }: { onBack: () => void }) => {
    const today = new Date();
    const yorubaDay = getYorubaDay(today);
    
    // Simulate Biorhythm
    const physical = Math.sin(2 * Math.PI * (Date.now() / (23 * 24 * 3600 * 1000))) * 100;
    const emotional = Math.sin(2 * Math.PI * (Date.now() / (28 * 24 * 3600 * 1000))) * 100;
    const spiritual = Math.sin(2 * Math.PI * (Date.now() / (33 * 24 * 3600 * 1000))) * 100;

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-8 flex flex-col items-center">
            <button onClick={onBack} className="absolute top-4 left-4 z-20 text-ifa-neutral hover:text-white"><ArrowLeft /></button>
            
            <h2 className="text-2xl font-serif text-ifa-gold mb-2">Calendário Biocósmico</h2>
            <p className="text-xs text-ifa-neutral uppercase tracking-widest mb-8">{today.toLocaleDateString()} • {yorubaDay.name}</p>

            <div className="w-full max-w-md space-y-6">
                
                {/* Physical */}
                <div className="bg-ifa-base border border-ifa-border p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold flex items-center gap-2 text-red-400"><Battery /> Físico (Ogun)</span>
                        <span className="text-xs">{Math.round(physical)}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: `${Math.abs(physical)}%`, opacity: physical > 0 ? 1 : 0.3 }}></div>
                    </div>
                    <p className="text-xs text-ifa-neutral mt-2">
                        {physical > 0 ? "Alta energia para trabalho e esforço." : "Descanse. Evite cirurgias ou esforços."}
                    </p>
                </div>

                 {/* Emotional */}
                 <div className="bg-ifa-base border border-ifa-border p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold flex items-center gap-2 text-blue-400"><Moon /> Emocional (Yemoja)</span>
                        <span className="text-xs">{Math.round(emotional)}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${Math.abs(emotional)}%`, opacity: emotional > 0 ? 1 : 0.3 }}></div>
                    </div>
                    <p className="text-xs text-ifa-neutral mt-2">
                        {emotional > 0 ? "Bom para relacionamentos e criatividade." : "Instabilidade. Evite discussões familiares."}
                    </p>
                </div>

                 {/* Spiritual */}
                 <div className="bg-ifa-base border border-ifa-border p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold flex items-center gap-2 text-white"><Sun /> Espiritual (Obatala)</span>
                        <span className="text-xs">{Math.round(spiritual)}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-white" style={{ width: `${Math.abs(spiritual)}%`, opacity: spiritual > 0 ? 1 : 0.3 }}></div>
                    </div>
                    <p className="text-xs text-ifa-neutral mt-2">
                        {spiritual > 0 ? "Conexão alta. Ótimo para divinação." : "Bloqueio intuitivo. Use oráculos mecânicos (Ikin)."}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default BioCalendar;
