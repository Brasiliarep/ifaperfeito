
import React, { useState, useEffect } from 'react';
import { getYorubaDay } from '../utils/yorubaCalendarLogic';
import { Calendar, Moon, Sun, Circle, Download, Hexagon, ShoppingBag } from 'lucide-react';

interface Props {
    onOpenIgbadu?: () => void;
}

const YorubaCalendarWidget: React.FC<Props> = ({ onOpenIgbadu }) => {
    const [info, setInfo] = useState(getYorubaDay());
    const [date, setDate] = useState(new Date());
    const [moonPhase, setMoonPhase] = useState<{name: string, icon: React.ReactNode}>({ name: '...', icon: <Circle size={14}/> });
    const [marketDay, setMarketDay] = useState("");

    useEffect(() => {
        const update = () => {
            const now = new Date();
            setDate(now);
            const dayInfo = getYorubaDay(now);
            setInfo(dayInfo);

            // Ose Market Logic (Mock logic based on 4-day cycle aligning with Ojo Awo/etc)
            // Typically: Day 1 (Awo) -> Ife Market, Day 2 (Ogun) -> Ejigbo, etc.
            if (dayInfo.name === 'Ojo Awo') setMarketDay("Mercado de Ifé (Aberto)");
            else if (dayInfo.name === 'Ojo Ogun') setMarketDay("Mercado de Ejigbo (Aberto)");
            else if (dayInfo.name === 'Ojo Jakuta') setMarketDay("Mercado de Oyo (Aberto)");
            else setMarketDay("Mercado de Ede (Aberto)");

            // Simple Moon Phase Logic
            const knownNewMoon = new Date('2024-01-11T11:57:00').getTime();
            const cycle = 29.53059 * 24 * 60 * 60 * 1000;
            const diff = now.getTime() - knownNewMoon;
            const age = (diff % cycle) / (24 * 60 * 60 * 1000);
            
            if (age < 1.84) setMoonPhase({ name: 'Nova', icon: <Circle size={14} className="fill-black text-white" /> }); 
            else if (age < 5.53) setMoonPhase({ name: 'Crescente', icon: <Moon size={14} /> }); 
            else if (age < 9.22) setMoonPhase({ name: 'Quarto Crescente', icon: <Moon size={14} className="fill-current" /> }); 
            else if (age < 12.91) setMoonPhase({ name: 'Gibosa', icon: <Moon size={14} className="fill-current" /> }); 
            else if (age < 16.61) setMoonPhase({ name: 'Cheia', icon: <Circle size={14} className="fill-white text-white" /> }); 
            else if (age < 20.30) setMoonPhase({ name: 'Gibosa Minguante', icon: <Moon size={14} className="fill-current" /> }); 
            else if (age < 23.99) setMoonPhase({ name: 'Quarto Minguante', icon: <Moon size={14} className="fill-current" /> }); 
            else if (age < 27.68) setMoonPhase({ name: 'Minguante', icon: <Moon size={14} /> }); 
            else setMoonPhase({ name: 'Nova', icon: <Circle size={14} className="fill-black text-white" /> });
        };

        update();
        const timer = setInterval(update, 60000);
        return () => clearInterval(timer);
    }, []);

    const addToCalendar = () => {
        // Create an .ics file content for the next 30 days of Ojo Awo
        let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//IfaGuia//YorubaCalendar//EN\n";
        
        let cursor = new Date();
        for(let i=0; i<30; i++) {
            const dayInfo = getYorubaDay(cursor);
            if(dayInfo.name === 'Ojo Awo') {
                const dateStr = cursor.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                icsContent += `BEGIN:VEVENT\nSUMMARY:Ojo Awo (Dia de Ifá)\nDTSTART:${dateStr}\nDTEND:${dateStr}\nDESCRIPTION:Dia de cultuar Orunmila.\nEND:VEVENT\n`;
            }
            cursor.setDate(cursor.getDate() + 1);
        }
        icsContent += "END:VCALENDAR";

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'OjoAwo_Calendar.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-[#1a1510] border border-[#5D4037] rounded-xl w-full shadow-lg relative group hover:border-[#D4AF37] transition-colors overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none"></div>
            
            {/* Header: title + moon/date */}
            <div className="flex items-center justify-between px-3 pt-3">
                <div className="flex items-center gap-1 text-[#a8a29e] text-[9px] uppercase tracking-widest font-medium">
                    <Calendar size={10} />
                    <span>Calendário Litúrgico</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="flex items-center gap-0.5 bg-white/10 px-1 py-0.5 rounded-full" title="Fase da Lua Aproximada">
                        {moonPhase.icon} <span className="uppercase text-[8px] text-[#a8a29e] leading-none">{moonPhase.name}</span>
                    </div>
                    <span className="text-[9px] text-[#a8a29e] leading-none">{date.toLocaleDateString()}</span>
                </div>
            </div>

            {/* Day name + greeting */}
            <div className="px-3 pt-2.5 pb-1.5">
                <h3 className={`text-base sm:text-lg font-serif font-bold ${info.color} drop-shadow-md leading-tight`}>
                    {info.name}
                </h3>
                <p className="text-[#e5e5e5] text-xs italic opacity-80 mt-0.5 leading-snug">"{info.greeting}"</p>
            </div>

            {/* Market day + buttons row */}
            <div className="flex items-center justify-between px-3 pb-1">
                <p className="text-[9px] text-ifa-gold flex items-center gap-1 leading-none"><ShoppingBag size={7}/> {marketDay}</p>
                <div className="flex gap-1 shrink-0">
                    {onOpenIgbadu && (
                        <button onClick={onOpenIgbadu} className="text-[8px] flex items-center gap-0.5 text-ifa-base bg-ifa-gold border border-ifa-gold px-1.5 py-0.5 rounded hover:bg-white transition-colors leading-none" title="Abrir Igbadu">
                            <Hexagon size={6} /> Igbadu
                        </button>
                    )}
                    <button onClick={addToCalendar} className="text-[8px] flex items-center gap-0.5 text-ifa-gold border border-ifa-gold/30 px-1.5 py-0.5 rounded hover:bg-ifa-gold hover:text-black transition-colors leading-none" title="Sincronizar Ojo Awo">
                        <Download size={6} /> Sync
                    </button>
                </div>
            </div>

            {/* Orixá badges — right-aligned below buttons */}
            <div className="flex justify-end px-3 pb-3">
                <div className="flex flex-wrap gap-1 justify-end" style={{ maxWidth: 140 }}>
                    {info.orishas.map(o => (
                        <span key={o} className="bg-[#5D4037]/50 px-1.5 py-[2px] rounded text-[8px] text-[#F5F5DC] border border-[#5D4037] leading-tight whitespace-nowrap">
                            {o}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default YorubaCalendarWidget;
