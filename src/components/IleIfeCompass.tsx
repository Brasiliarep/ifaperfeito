import React, { useState, useEffect } from 'react';
import { Compass, Navigation } from 'lucide-react';

// Interface extension to handle iOS specific property
interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    webkitCompassHeading?: number;
}

const IleIfeCompass = () => {
    const [heading, setHeading] = useState(0);
    const [bearing, setBearing] = useState(0);
    const [error, setError] = useState<string | null>(null);

    // Ilé Ifè Coordinates
    const IFE_LAT = 7.4775;
    const IFE_LNG = 4.5658;

    useEffect(() => {
        // Calculate bearing
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat1 = pos.coords.latitude * (Math.PI / 180);
                    const lon1 = pos.coords.longitude * (Math.PI / 180);
                    const lat2 = IFE_LAT * (Math.PI / 180);
                    const lon2 = IFE_LNG * (Math.PI / 180);

                    const y = Math.sin(lon2 - lon1) * Math.cos(lat2);
                    const x = Math.cos(lat1) * Math.sin(lat2) -
                            Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
                    const brng = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
                    setBearing(brng);
                },
                (err) => setError("Permissão de GPS negada.")
            );
        }

        // Device Orientation
        const handleOrientation = (e: DeviceOrientationEvent) => {
            const iosEvent = e as DeviceOrientationEventiOS;
            if (iosEvent.webkitCompassHeading) {
                // iOS
                setHeading(iosEvent.webkitCompassHeading);
            } else if (e.alpha) {
                // Android (approximate, needs compensation logic in real production but suffices here)
                setHeading(360 - e.alpha);
            }
        };

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', handleOrientation);
        }

        return () => window.removeEventListener('deviceorientation', handleOrientation);
    }, []);

    // Calculate rotation: We want the arrow to point to Ife.
    // If phone points North (0), and Ife is East (90), arrow rotates 90.
    // Formula: Bearing - Heading
    const rotation = bearing - heading;

    return (
        <div className="bg-ifa-base border border-ifa-border rounded-xl p-4 w-full max-w-md mx-auto mb-4 relative overflow-hidden flex items-center justify-between shadow-lg">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10"></div>
            
            <div className="relative z-10">
                <h3 className="text-ifa-gold text-sm font-bold uppercase flex items-center gap-2">
                    <Compass size={16} /> Bússola de Ilé Ifè
                </h3>
                <p className="text-xs text-ifa-neutral max-w-[200px] mt-1">
                    Aponte seu celular. A seta indica a direção do Berço da Civilização Yoruba.
                </p>
            </div>

            <div className="relative z-10 w-16 h-16 border-2 border-ifa-gold rounded-full flex items-center justify-center bg-black/20">
                <div 
                    className="transition-transform duration-500 ease-out"
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    <Navigation size={32} className="text-ifa-gold fill-ifa-gold" />
                </div>
                <div className="absolute top-0 text-[8px] text-ifa-neutral font-bold">N</div>
            </div>
        </div>
    );
};

export default IleIfeCompass;