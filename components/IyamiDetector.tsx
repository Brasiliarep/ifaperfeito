
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Mic, Activity, AlertTriangle } from 'lucide-react';

const IyamiDetector = ({ onBack }: { onBack: () => void }) => {
    const [listening, setListening] = useState(false);
    const [alertLevel, setAlertLevel] = useState(0); // 0 - 100
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const animationRef = useRef<number | null>(null);

    const startListening = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            analyserRef.current = audioContextRef.current.createAnalyser();
            sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
            
            sourceRef.current.connect(analyserRef.current);
            analyserRef.current.fftSize = 256;
            
            setListening(true);
            draw();
        } catch (err) {
            alert("Permissão de microfone negada.");
        }
    };

    const stopListening = () => {
        if(audioContextRef.current) audioContextRef.current.close();
        if(animationRef.current) cancelAnimationFrame(animationRef.current);
        setListening(false);
        setAlertLevel(0);
    };

    const draw = () => {
        if(!canvasRef.current || !analyserRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if(!ctx) return;

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const render = () => {
            analyserRef.current!.getByteFrequencyData(dataArray);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Simulate Detection Logic (High frequency spikes typical of birds/screeching)
            // This is a simulation for flavor, not real spectral ornithology.
            const highFreqs = dataArray.slice(bufferLength / 2);
            const avgHigh = highFreqs.reduce((a,b) => a+b, 0) / highFreqs.length;
            
            // Random fluctuations to simulate "sensing"
            if (avgHigh > 30 && Math.random() > 0.95) {
                setAlertLevel(prev => Math.min(100, prev + 10));
            } else {
                setAlertLevel(prev => Math.max(0, prev - 0.5));
            }

            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for(let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i] / 2;
                ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }

            animationRef.current = requestAnimationFrame(render);
        };
        render();
    };

    useEffect(() => {
        return () => stopListening();
    }, []);

    return (
        <div className="min-h-screen bg-black text-ifa-text p-4 flex flex-col items-center justify-center">
            <button onClick={onBack} className="absolute top-4 left-4 text-ifa-neutral hover:text-white"><ArrowLeft /></button>
            
            <h1 className="text-2xl font-serif text-red-500 mb-8 flex items-center gap-2">
                <Activity /> Sensor de Iyami
            </h1>

            <div className="relative w-full max-w-sm aspect-square bg-gray-900 rounded-full border-4 border-red-900 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(153,27,27,0.5)]">
                <canvas ref={canvasRef} width={300} height={300} className="w-full h-full rounded-full opacity-50" />
                
                {listening && alertLevel > 70 && (
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                        <AlertTriangle size={100} className="text-red-600" />
                    </div>
                )}
            </div>

            <div className="text-center h-20 mb-8">
                {listening ? (
                    alertLevel > 70 ? (
                        <p className="text-red-500 font-bold text-xl animate-pulse">ALERTA: Vibração Aguda Detectada!<br/><span className="text-sm text-white">Recomendado Ipese (Oferenda) imediata.</span></p>
                    ) : (
                        <p className="text-green-500">Monitorando frequências ambientais...</p>
                    )
                ) : (
                    <p className="text-ifa-neutral">Toque para iniciar a escuta espiritual.</p>
                )}
            </div>

            {!listening ? (
                <button onClick={startListening} className="w-20 h-20 bg-red-900 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                    <Mic size={32} />
                </button>
            ) : (
                <button onClick={stopListening} className="px-8 py-3 border border-red-500 text-red-500 rounded-full font-bold uppercase hover:bg-red-900/20">
                    Parar
                </button>
            )}
        </div>
    );
};

export default IyamiDetector;
