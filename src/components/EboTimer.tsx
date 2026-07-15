import React, { useState, useEffect, useRef } from 'react';
import { Clock, Play, Pause, RotateCcw, Bell } from 'lucide-react';

const EboTimer = () => {
    const [timeLeft, setTimeLeft] = useState(0); // in seconds
    const [isActive, setIsActive] = useState(false);
    const [duration, setDuration] = useState(15); // Default 15 mins
    const timerRef = useRef<number | null>(null);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const startTimer = () => {
        if (timeLeft === 0) setTimeLeft(duration * 60);
        setIsActive(true);
    };

    const pauseTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(0);
    };

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = window.setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            // Timer finished
            setIsActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
            // Play simple beep/bell logic here or alert
            playBellSound(); 
            alert("Tempo do Ritual Concluído! Aṣẹ.");
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive, timeLeft]);

    const playBellSound = () => {
        // Simple oscillator beep
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = 440; // A4
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1.5);
        osc.start();
        osc.stop(ctx.currentTime + 1.5);
    };

    return (
        <div className="bg-black/30 border border-ifa-gold/30 rounded-lg p-4 mt-6">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-ifa-gold text-xs font-bold uppercase flex items-center gap-2">
                    <Clock size={16} /> Cronômetro Litúrgico
                </h4>
                <select 
                    value={duration} 
                    onChange={(e) => { setDuration(Number(e.target.value)); setTimeLeft(0); setIsActive(false); }}
                    className="bg-ifa-base border border-ifa-border text-xs rounded p-1 text-ifa-text"
                    disabled={isActive || timeLeft > 0}
                >
                    <option value={5}>5 Min (Defumação)</option>
                    <option value={15}>15 Min (Banho)</option>
                    <option value={30}>30 Min (Repouso)</option>
                    <option value={60}>1 Hora (Oferenda)</option>
                </select>
            </div>

            <div className="text-center mb-4">
                <span className="text-4xl font-mono font-bold text-white tracking-widest">
                    {formatTime(timeLeft > 0 ? timeLeft : duration * 60)}
                </span>
            </div>

            <div className="flex justify-center gap-4">
                {!isActive ? (
                    <button onClick={startTimer} className="p-2 rounded-full bg-green-700 text-white hover:bg-green-600 transition-colors">
                        <Play size={20} fill="currentColor" />
                    </button>
                ) : (
                    <button onClick={pauseTimer} className="p-2 rounded-full bg-yellow-700 text-white hover:bg-yellow-600 transition-colors">
                        <Pause size={20} fill="currentColor" />
                    </button>
                )}
                <button onClick={resetTimer} className="p-2 rounded-full bg-ifa-surface border border-ifa-border text-ifa-neutral hover:text-white transition-colors">
                    <RotateCcw size={20} />
                </button>
            </div>
        </div>
    );
};

export default EboTimer;