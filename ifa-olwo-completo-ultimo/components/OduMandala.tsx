
import React, { useEffect, useRef } from 'react';
import { OduInfo } from '../types';
import { ArrowLeft, Download, Sparkles, Hexagon } from 'lucide-react';
import { NAME_TO_VALUE } from '../utils/oduLogic';

interface Props {
    odu: OduInfo;
    onBack: () => void;
}

const OduMandala: React.FC<Props> = ({ odu, onBack }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Obtém os 8 bits do Odu (0=Fechado/II, 1=Aberto/I)
    // Ordem: Perna Direita (1,2,3,4) + Perna Esquerda (1,2,3,4)
    const getOduBits = (name: string): number[] => {
        let rootR = name;
        let rootL = name;
        
        if (name === 'Ejiogbe') { rootR = 'Ogbe'; rootL = 'Ogbe'; }
        else if (name.includes(' Meji')) { 
            const n = name.split(' ')[0]; rootR = n; rootL = n; 
        } else {
            const parts = name.split(' ');
            rootR = parts[0] || 'Ogbe';
            rootL = parts[1] || 'Ogbe';
        }

        const valR = NAME_TO_VALUE[rootR] !== undefined ? NAME_TO_VALUE[rootR] : 15;
        const valL = NAME_TO_VALUE[rootL] !== undefined ? NAME_TO_VALUE[rootL] : 15;

        // Converter para array de 4 bits (de cima para baixo no Opele)
        const toBits = (val: number) => {
            const bits = [];
            for(let i=3; i>=0; i--) bits.push((val >> i) & 1);
            return bits;
        };

        return [...toBits(valR), ...toBits(valL)]; // [R1, R2, R3, R4, L1, L2, L3, L4]
    };

    const drawMandala = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const bits = getOduBits(odu.name);

        // 1. Limpar
        ctx.clearRect(0,0,w,h);

        // 2. Fundo Místico
        const gradient = ctx.createRadialGradient(cx, cy, 20, cx, cy, w/2);
        gradient.addColorStop(0, '#2E150F');
        gradient.addColorStop(1, '#0f0c08');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);

        // 3. Grid de Geometria Sagrada (Flor da Vida / Estrela)
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.1)';
        ctx.lineWidth = 1;
        
        // Desenhar Círculo Base
        ctx.beginPath();
        ctx.arc(cx, cy, w/2 - 40, 0, Math.PI * 2);
        ctx.stroke();

        // 4. Mapear os 8 Bits em coordenadas polares (Constelação)
        // Divide o círculo em 8 fatias. Se bit=1 (Aberto/Luz), o ponto é ativo.
        const radius = w/2 - 60;
        const points: {x: number, y: number, active: boolean}[] = [];

        for (let i = 0; i < 8; i++) {
            const angle = (i * (360/8)) * (Math.PI / 180) - (Math.PI / 2); // Começa no topo
            points.push({
                x: cx + radius * Math.cos(angle),
                y: cy + radius * Math.sin(angle),
                active: bits[i] === 1 // 1 = Aberto (Luz/Ponto Ativo)
            });
        }

        // 5. Conectar Pontos Ativos (Linhas de Ouro)
        ctx.beginPath();
        ctx.strokeStyle = '#D4AF37'; // Ouro
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#D4AF37';

        // Conecta todos os pontos ativos entre si (Geometria)
        for(let i=0; i<points.length; i++) {
            if(points[i].active) {
                for(let j=i+1; j<points.length; j++) {
                    if(points[j].active) {
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                    }
                }
            }
        }
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset

        // 6. Desenhar os Nós (Estrelas)
        points.forEach((p, i) => {
            if (p.active) {
                // Ponto Aberto (Luz)
                ctx.fillStyle = '#FFF';
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#FFF';
                ctx.beginPath();
                ctx.arc(p.x, p.y, 6, 0, Math.PI*2);
                ctx.fill();
            } else {
                // Ponto Fechado (Sombra - Pequeno círculo escuro)
                ctx.fillStyle = '#3E2723';
                ctx.strokeStyle = '#5D4037';
                ctx.lineWidth = 2;
                ctx.shadowBlur = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 4, 0, Math.PI*2);
                ctx.fill();
                ctx.stroke();
            }
        });

        // 7. Símbolo Central (Assinatura Binária Tradicional)
        // Desenha o Odu no centro (marcações I / II)
        const drawBinaryCenter = () => {
            const barW = 6;
            const barH = 20;
            const gap = 25;
            const startY = cy - 50;
            const offsetX = 20;

            // Direita (Bits 0-3)
            for(let i=0; i<4; i++) {
                const mark = bits[i] === 1 ? 'I' : 'II';
                const y = startY + (i * gap);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; // Fantasma
                if (mark === 'I') ctx.fillRect(cx + offsetX, y, barW, barH);
                else { ctx.fillRect(cx + offsetX - 4, y, barW, barH); ctx.fillRect(cx + offsetX + 4, y, barW, barH); }
            }
            // Esquerda (Bits 4-7)
            for(let i=0; i<4; i++) {
                const mark = bits[i+4] === 1 ? 'I' : 'II';
                const y = startY + (i * gap);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; 
                if (mark === 'I') ctx.fillRect(cx - offsetX - barW, y, barW, barH);
                else { ctx.fillRect(cx - offsetX - barW - 4, y, barW, barH); ctx.fillRect(cx - offsetX - barW + 4, y, barW, barH); }
            }
        };
        drawBinaryCenter();
    };

    useEffect(() => {
        drawMandala();
    }, [odu]);

    const downloadMandala = () => {
        const canvas = canvasRef.current;
        if(canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `Mandala_${odu.name}.png`;
            link.href = url;
            link.click();
        }
    };

    return (
        <div className="min-h-screen bg-black text-ifa-text p-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-md flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text"><ArrowLeft /></button>
                <h1 className="text-xl font-serif text-ifa-gold flex items-center gap-2"><Hexagon size={20}/> Mandala Sagrada</h1>
                <button onClick={downloadMandala} className="text-ifa-gold hover:text-white"><Download /></button>
            </div>

            <div className="relative mb-8">
                <canvas 
                    ref={canvasRef} 
                    width={400} 
                    height={400} 
                    className="rounded-full border-4 border-ifa-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.2)] bg-[#0f0c08]"
                />
            </div>

            <div className="text-center max-w-sm">
                <h2 className="text-3xl font-serif text-white font-bold mb-2 uppercase tracking-widest">{odu.name}</h2>
                <p className="text-ifa-neutral text-xs italic leading-relaxed">
                    Esta é a assinatura geométrica vibracional do Odu. 
                    Os pontos de luz (I) se conectam para formar o caminho da energia. 
                    Medite sobre esta forma para absorver o Axé.
                </p>
            </div>
        </div>
    );
};

export default OduMandala;
