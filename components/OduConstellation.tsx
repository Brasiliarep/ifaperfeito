
import React, { useEffect, useRef } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { SIGN_NAMES } from '../utils/oduLogic';

const OduConstellation = ({ onBack }: { onBack: () => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);

    // Generate nodes for the 16 Mejis
    const nodes = Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        name: SIGN_NAMES[i],
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 800,
        z: (Math.random() - 0.5) * 800,
        connections: [Math.floor(Math.random() * 16), Math.floor(Math.random() * 16)] // Random links
    }));

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let angleY = 0;
        let angleX = 0;

        const render = () => {
            if (!canvas || !ctx) return;
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const fov = 400;

            angleY += 0.002; // Auto rotation

            // Sort nodes by depth for simple z-ordering
            const projectedNodes = nodes.map(node => {
                // Rotate Y
                let x = node.x * Math.cos(angleY) - node.z * Math.sin(angleY);
                let z = node.z * Math.cos(angleY) + node.x * Math.sin(angleY);
                
                // Perspective
                let scale = fov / (fov + z);
                let x2d = x * scale + cx;
                let y2d = node.y * scale + cy;

                return { ...node, x2d, y2d, scale, z };
            }).sort((a, b) => b.z - a.z);

            // Draw Connections
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)'; // Faint Gold
            ctx.lineWidth = 1;
            projectedNodes.forEach(node => {
                node.connections.forEach(targetId => {
                    const target = projectedNodes.find(n => n.id === targetId);
                    if (target) {
                        ctx.beginPath();
                        ctx.moveTo(node.x2d, node.y2d);
                        ctx.lineTo(target.x2d, target.y2d);
                        ctx.stroke();
                    }
                });
            });

            // Draw Nodes (Stars)
            projectedNodes.forEach(node => {
                const size = Math.max(1, 4 * node.scale);
                const alpha = Math.min(1, (node.scale + 0.2)); // Fade distant stars
                
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.beginPath();
                ctx.arc(node.x2d, node.y2d, size, 0, Math.PI * 2);
                ctx.fill();

                // Glow
                if (node.name === 'Ogbe' || node.name === 'Oyeku') {
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = '#D4AF37';
                } else {
                    ctx.shadowBlur = 0;
                }

                // Labels
                if (node.scale > 0.6) {
                    ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
                    ctx.font = `${Math.floor(12 * node.scale)}px Serif`;
                    ctx.fillText(node.name, node.x2d + 10, node.y2d);
                }
            });

            animationRef.current = requestAnimationFrame(render);
        };

        // Handle resize
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black z-50">
            <button onClick={onBack} className="absolute top-4 left-4 z-50 text-white/50 hover:text-white border border-white/20 p-2 rounded-full backdrop-blur-sm">
                <ArrowLeft />
            </button>
            <div className="absolute bottom-8 left-0 w-full text-center text-ifa-gold/50 text-xs font-serif uppercase tracking-[0.5em] pointer-events-none">
                Constelação Primordial dos 16 Odus
            </div>
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
};

export default OduConstellation;
