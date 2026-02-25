
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
        <div className="bg-[#1a1510] border border-[#5D4037] rounded-xl p-4 w-full max-w-md mx-auto mb-8 shadow-lg relative overflow-hidden group hover:border-[#D4AF37] transition-colors">
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-[#a8a29e] text-xs uppercase tracking-widest">
                    <Calendar size={14} />
                    <span>Calendário Litúrgico</span>
                </div>
                <div className="text-[#a8a29e] text-xs flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full" title="Fase da Lua Aproximada">
                        {moonPhase.icon} <span className="uppercase text-[10px]">{moonPhase.name}</span>
                    </div>
                    {date.toLocaleDateString()}
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h3 className={`text-2xl font-serif font-bold ${info.color} mb-1 drop-shadow-md`}>
                        {info.name}
                    </h3>
                    <p className="text-[#e5e5e5] text-sm italic opacity-80">"{info.greeting}"</p>
                    <p className="text-xs text-ifa-gold flex items-center gap-1 mt-1"><ShoppingBag size={10}/> {marketDay}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-1 justify-end flex-wrap max-w-[120px]">
                        {info.orishas.map(o => (
                            <span key={o} className="bg-[#5D4037]/50 px-2 py-0.5 rounded text-[10px] text-[#F5F5DC] border border-[#5D4037]">
                                {o}
                            </span>
                        ))}
                    </div>
                    
                    <div className="flex gap-2">
                        {onOpenIgbadu && (
                            <button onClick={onOpenIgbadu} className="text-[10px] flex items-center gap-1 text-ifa-base bg-ifa-gold border border-ifa-gold px-2 py-1 rounded hover:bg-white transition-colors" title="Abrir Igbadu">
                                <Hexagon size={10} /> Igbadu
                            </button>
                        )}
                        <button onClick={addToCalendar} className="text-[10px] flex items-center gap-1 text-ifa-gold border border-ifa-gold/30 px-2 py-1 rounded hover:bg-ifa-gold hover:text-black transition-colors" title="Sincronizar Ojo Awo">
                            <Download size={10} /> Sync
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YorubaCalendarWidget;
