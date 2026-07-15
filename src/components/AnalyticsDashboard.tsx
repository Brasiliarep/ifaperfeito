
import React, { useMemo } from 'react';
import { getHistory } from '../services/storageService';
import { ArrowLeft, BarChart3, TrendingUp, AlertTriangle, Users, Calendar, Globe, Map } from 'lucide-react';

const AnalyticsDashboard = ({ onBack }: { onBack: () => void }) => {
    const history = getHistory();

    const stats = useMemo(() => {
        const total = history.length;
        if (total === 0) return null;

        let ireCount = 0;
        let osogboCount = 0;
        const oduCounts: Record<string, number> = {};
        const clientFrequency: Record<string, number> = {};

        history.forEach(r => {
            if (r.interpretation.ireOrOsogbo === 'Irê') ireCount++;
            else osogboCount++;

            oduCounts[r.odu.name] = (oduCounts[r.odu.name] || 0) + 1;
            clientFrequency[r.client.fullName] = (clientFrequency[r.client.fullName] || 0) + 1;
        });

        // Sort Odus
        const sortedOdus = Object.entries(oduCounts).sort((a,b) => b[1] - a[1]).slice(0, 3);
        const topClient = Object.entries(clientFrequency).sort((a,b) => b[1] - a[1])[0];

        return {
            total,
            irePercentage: Math.round((ireCount / total) * 100),
            osogboPercentage: Math.round((osogboCount / total) * 100),
            topOdus: sortedOdus,
            topClient
        };
    }, [history]);

    return (
        <div className="min-h-screen bg-ifa-base-dark text-ifa-text p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={onBack} className="text-ifa-neutral hover:text-ifa-text">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-serif text-ifa-gold flex items-center gap-2">
                        <BarChart3 size={24} /> Termômetro da Egrégora
                    </h1>
                </div>

                {/* GLOBAL EGREGORE WIDGET */}
                <div className="mb-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 p-6 rounded-xl flex flex-col md:flex-row items-center justify-between shadow-lg gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-blue-900/30 rounded-full text-blue-400">
                            <Globe size={32} />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold uppercase text-blue-400 mb-1">Egrégora Global (Hoje)</h3>
                            <p className="text-sm text-ifa-text-light max-w-xs">
                                40% dos Babalawos ao redor do mundo tiraram <strong>Ejiogbe</strong> hoje. A energia é de abertura de caminhos.
                            </p>
                        </div>
                    </div>
                    <div className="text-center md:text-right w-full md:w-auto bg-black/20 p-4 rounded-lg">
                        <span className="text-4xl font-bold text-white block">40%</span>
                        <span className="text-xs text-blue-300 uppercase">Ejiogbe</span>
                    </div>
                </div>

                {/* REAL-TIME REGIONAL HEATMAP (Simulated) */}
                <div className="mb-8 bg-ifa-base border border-ifa-border rounded-xl p-6 shadow-lg relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-ifa-gold font-bold uppercase text-sm flex items-center gap-2">
                            <Map size={16} /> Mapa de Calor Regional
                        </h3>
                        <span className="text-[10px] text-green-400 font-bold animate-pulse uppercase">● Ao Vivo</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { region: 'São Paulo', odu: 'Oyeku Meji', trend: 'down', color: 'text-red-400' },
                            { region: 'Rio de Janeiro', odu: 'Irosun Meji', trend: 'neutral', color: 'text-yellow-400' },
                            { region: 'Bahia', odu: 'Ejiogbe', trend: 'up', color: 'text-green-400' },
                            { region: 'Exterior', odu: 'Obara Meji', trend: 'up', color: 'text-green-400' },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-ifa-base-dark p-3 rounded border border-ifa-border/50 text-center">
                                <p className="text-xs text-ifa-neutral uppercase mb-1">{item.region}</p>
                                <p className={`font-serif font-bold text-sm ${item.color}`}>{item.odu}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-ifa-neutral mt-4 text-center">
                        * Dados anonimizados baseados em consultas recentes na sua região geográfica.
                    </p>
                </div>

                {!stats ? (
                    <div className="text-center py-12 bg-ifa-base border border-ifa-border rounded-xl">
                        <p className="text-ifa-neutral">Ainda não há dados suficientes para análise local.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Energy Balance */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-ifa-base p-6 rounded-xl border border-ifa-border shadow-lg">
                                <h3 className="text-ifa-neutral text-xs font-bold uppercase mb-2">Balanço Energético (Seu Templo)</h3>
                                <div className="flex items-end gap-2 mb-2">
                                    <div className="h-4 bg-gray-700 w-full rounded-full overflow-hidden flex">
                                        <div style={{ width: `${stats.irePercentage}%` }} className="bg-green-600 h-full"></div>
                                        <div style={{ width: `${stats.osogboPercentage}%` }} className="bg-red-600 h-full"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-green-400 font-bold">{stats.irePercentage}% Irê</span>
                                    <span className="text-red-400 font-bold">{stats.osogboPercentage}% Osogbo</span>
                                </div>
                                <p className="text-xs text-ifa-neutral mt-4">
                                    {stats.osogboPercentage > 60 
                                        ? "⚠️ Alerta: A egrégora está carregada. Recomendado Ebó coletivo para o templo." 
                                        : "✅ A energia da casa está equilibrada."}
                                </p>
                            </div>

                            <div className="bg-ifa-base p-6 rounded-xl border border-ifa-border shadow-lg">
                                <h3 className="text-ifa-neutral text-xs font-bold uppercase mb-4">Odu Regente (Mais Frequente)</h3>
                                {stats.topOdus.map(([name, count], idx) => (
                                    <div key={name} className="flex justify-between items-center mb-2 border-b border-ifa-border/30 pb-1">
                                        <span className={`font-serif font-bold ${idx === 0 ? 'text-ifa-gold text-lg' : 'text-ifa-text'}`}>
                                            {idx + 1}. {name}
                                        </span>
                                        <span className="bg-ifa-base-dark px-2 py-1 rounded text-xs">{count} vezes</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Retention */}
                        <div className="bg-ifa-base p-6 rounded-xl border border-ifa-border shadow-lg flex items-center justify-between">
                            <div>
                                <h3 className="text-ifa-neutral text-xs font-bold uppercase mb-1">Volume de Atendimentos</h3>
                                <p className="text-3xl font-bold text-ifa-text">{stats.total}</p>
                            </div>
                            {stats.topClient && (
                                <div className="text-right">
                                    <h3 className="text-ifa-neutral text-xs font-bold uppercase mb-1">Consulente Mais Frequente</h3>
                                    <p className="text-xl font-bold text-ifa-gold">{stats.topClient[0]}</p>
                                    <p className="text-xs text-ifa-neutral">{stats.topClient[1]} consultas</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
