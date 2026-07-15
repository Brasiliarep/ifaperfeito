
import React, { useState } from 'react';
import { ArrowLeft, MapPin, ShoppingBag, Truck, Star, Clock, Plus } from 'lucide-react';

const STORES = [
    { id: 1, name: "Casa de Ervas Vovó Benta", rating: 4.8, time: "30-45 min", fee: "R$ 8,00" },
    { id: 2, name: "Império dos Orixás", rating: 4.5, time: "40-60 min", fee: "R$ 5,00" },
    { id: 3, name: "Mercadão do Axé", rating: 4.9, time: "20-30 min", fee: "Grátis" },
];

const ITEMS = [
    { name: "Pombo Branco (Casal)", price: 35.00 },
    { name: "Dendê (1L)", price: 12.00 },
    { name: "Efun (Bola)", price: 2.00 },
    { name: "Obi Abata (4 Gomos)", price: 5.00 },
    { name: "Orogbo", price: 4.00 },
    { name: "Gim (Garrafa)", price: 25.00 },
];

const EboDelivery = ({ onBack }: { onBack: () => void }) => {
    const [cart, setCart] = useState<any[]>([]);
    const [view, setView] = useState('list'); // list | store

    const addToCart = (item: any) => {
        setCart([...cart, item]);
    };

    const total = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
            {/* Header */}
            <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center gap-4">
                <button onClick={onBack}><ArrowLeft /></button>
                <div className="flex-grow">
                    <h1 className="font-bold text-lg">Ebó Delivery</h1>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={12} className="text-red-500" /> Entregar em: Templo Principal
                    </div>
                </div>
                <div className="relative">
                    <ShoppingBag />
                    {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 overflow-y-auto pb-24">
                {view === 'list' ? (
                    <>
                        <div className="bg-ifa-gold text-ifa-base p-4 rounded-xl flex items-center justify-between shadow-lg mb-4">
                            <div>
                                <h3 className="font-bold text-lg">Kit Ejiogbe Completo</h3>
                                <p className="text-xs opacity-90">Tudo para o Ebó de Abertura</p>
                            </div>
                            <button className="bg-white text-ifa-gold px-4 py-2 rounded-full font-bold text-sm">Ver</button>
                        </div>

                        <h3 className="font-bold text-gray-700 mb-2">Lojas Próximas</h3>
                        {STORES.map(store => (
                            <div key={store.id} onClick={() => setView('store')} className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4 cursor-pointer hover:bg-gray-50">
                                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">🏪</div>
                                <div className="flex-grow">
                                    <h4 className="font-bold">{store.name}</h4>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                        <span className="flex items-center gap-1 text-yellow-600"><Star size={12} fill="currentColor"/> {store.rating}</span>
                                        <span>•</span>
                                        <span>{store.time}</span>
                                        <span>•</span>
                                        <span className="text-green-600 font-bold">{store.fee}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="animate-fade-in">
                        <button onClick={() => setView('list')} className="text-xs text-gray-500 mb-4 underline">Voltar para Lojas</button>
                        <div className="bg-white p-6 rounded-xl shadow-sm mb-4 text-center">
                            <h2 className="font-bold text-xl">Casa de Ervas Vovó Benta</h2>
                            <p className="text-xs text-gray-500">Materiais Litúrgicos • Ervas Frescas</p>
                        </div>

                        <div className="grid gap-3">
                            {ITEMS.map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-lg flex justify-between items-center shadow-sm">
                                    <div>
                                        <p className="font-bold">{item.name}</p>
                                        <p className="text-green-700 font-bold text-sm">R$ {item.price.toFixed(2)}</p>
                                    </div>
                                    <button onClick={() => addToCart(item)} className="p-2 bg-gray-100 rounded-full text-green-600 hover:bg-green-100">
                                        <Plus size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Cart Bar */}
            {cart.length > 0 && (
                <div className="fixed bottom-0 left-0 w-full bg-white border-t p-4 shadow-lg flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500">Total do Pedido</p>
                        <p className="font-bold text-xl">R$ {total.toFixed(2)}</p>
                    </div>
                    <button onClick={() => alert("Pedido enviado para o motoboy! (Simulação)")} className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2">
                        Fazer Pedido <Truck size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default EboDelivery;
