import React, { useState, useEffect, useRef } from 'react';

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    webkitCompassHeading?: number;
}

const IleIfeCompass = () => {
    const [heading, setHeading] = useState(0);
    const [bearing, setBearing] = useState(70); // default to 70 if geoloc fails
    const [isHovered, setIsHovered] = useState(false);
    const compassRef = useRef<HTMLDivElement>(null);

    const IFE_LAT = 7.4775;
    const IFE_LNG = 4.5658;

    useEffect(() => {
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
                () => {}
            );
        }

        const handleOrientation = (e: DeviceOrientationEvent) => {
            // Only use gyro if not hovered by mouse
            if (isHovered) return;
            const iosEvent = e as DeviceOrientationEventiOS;
            if (iosEvent.webkitCompassHeading) {
                setHeading(iosEvent.webkitCompassHeading);
            } else if (e.alpha !== null && e.alpha !== undefined) {
                setHeading(360 - e.alpha);
            }
        };

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', handleOrientation);
        }

        return () => {
            if (window.DeviceOrientationEvent) {
                window.removeEventListener('deviceorientation', handleOrientation);
            }
        };
    }, [isHovered]);

    // Handle hover rotate
    const getAngle = (clientX: number, clientY: number) => {
        if (!compassRef.current) return 0;
        const rect = compassRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        setIsHovered(true);
        const angle = getAngle(e.clientX, e.clientY);
        // Spin the dial to follow cursor angle
        setHeading((angle + 90 + 360) % 360);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setHeading(0);
    };

    const needleRotation = -heading;
    const ileIfeRotation = bearing - heading;

    return (
        <div style={{
            background: 'linear-gradient(160deg, #0c0e14 0%, #08090d 100%)',
            borderRadius: 0,
            padding: '12px 12px 10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            userSelect: 'none',
        }}>
            {/* Title */}
            <div style={{
                fontSize: 8,
                letterSpacing: '1.5px',
                color: 'rgba(196,158,48,0.7)',
                textTransform: 'uppercase',
                fontWeight: 700,
                width: '100%',
                textAlign: 'left',
                marginBottom: 10,
                fontFamily: 'Inter, sans-serif',
            }}>
                Bússola Sagrada de Ilê-Ifé
            </div>

            {/* Compass and Data Side-by-Side Container */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', gap: 12 }}>
                
                {/* Left Side: Compass housing */}
                <div 
                    ref={compassRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ 
                        position: 'relative', 
                        width: 90, 
                        height: 90, 
                        cursor: 'crosshair',
                        flexShrink: 0,
                    }}
                >
                    {/* Rotating dial */}
                    <div style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        position: 'relative',
                        transform: `rotate(${needleRotation}deg)`,
                        transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    }}>
                        {/* Background compass image */}
                        <img
                            src="/compass_ifa.png"
                            alt="Bússola"
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                filter: 'brightness(0.85) drop-shadow(0 0 10px rgba(196,158,48,0.25))',
                            }}
                        />

                        {/* North indicator needle (Red/Gold Arrow inside dial) */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <svg viewBox="0 0 100 100" width="30" height="30" style={{ transform: 'rotate(0deg)' }}>
                                <polygon points="50,10 53,50 47,50" fill="#e55555" />
                                <polygon points="50,90 53,50 47,50" fill="#C49E30" />
                                <circle cx="50" cy="50" r="3" fill="#111" stroke="#C49E30" strokeWidth="1" />
                            </svg>
                        </div>
                    </div>

                    {/* Seta/Pointer pointing to Ilê-Ifé (Green Arrow pointing to bearing - heading relative to compass body) */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transform: `rotate(${ileIfeRotation}deg)`,
                        transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        pointerEvents: 'none',
                    }}>
                        {/* Glowing Green Arrow Pointer on the outer edge */}
                        <svg viewBox="0 0 100 100" width="90" height="90" style={{ position: 'absolute', inset: 0 }}>
                            {/* Green Arrow head pointing up (0 degrees) */}
                            <path d="M 50,4 L 46,14 L 50,11 L 54,14 Z" fill="#2ecc71" filter="url(#glow-green)" />
                            {/* Subtle dotted line from center to arrow */}
                            <line x1="50" y1="12" x2="50" y2="35" stroke="#2ecc71" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
                            
                            <defs>
                                <filter id="glow-green">
                                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                        </svg>
                    </div>
                </div>

                {/* Right Side: Data readouts */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 0 }}>
                    {/* Heading readout */}
                    <div style={{ textAlign: 'left' }}>
                        <div style={{
                            fontSize: 15,
                            fontFamily: 'Cinzel, serif',
                            color: '#f2f2f2',
                            fontWeight: 700,
                            lineHeight: 1.1,
                            letterSpacing: '0.5px',
                        }}>
                            {Math.round(heading)}°{' '}
                            <span style={{ color: '#C49E30', fontSize: 12 }}>
                                {heading >= 337.5 || heading < 22.5 ? 'N' : heading >= 22.5 && heading < 67.5 ? 'NE' : heading >= 67.5 && heading < 112.5 ? 'E' : heading >= 112.5 && heading < 157.5 ? 'SE' : heading >= 157.5 && heading < 202.5 ? 'S' : heading >= 202.5 && heading < 247.5 ? 'SO' : heading >= 247.5 && heading < 292.5 ? 'O' : 'NO'}
                            </span>
                        </div>
                        <div style={{ fontSize: 7.5, color: 'rgba(255,255,255,0.3)', marginTop: 2, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                            {isHovered ? 'Gire para calibrar' : 'Direção atual'}
                        </div>
                    </div>

                    {/* Bearing to Ilê-Ifé badge */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        background: 'rgba(46,204,113,0.06)',
                        border: '1px solid rgba(46,204,113,0.2)',
                        borderRadius: 5,
                        padding: '4px 8px',
                        width: '100%',
                    }}>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#2ecc71', boxShadow: '0 0 5px rgba(46,204,113,0.9)', flexShrink: 0 }} />
                        <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1px', lineHeight: 1.2 }}>
                            Ilê-Ifé: <span style={{ color: '#2ecc71', fontWeight: 700 }}>{Math.round(bearing)}°</span>
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default IleIfeCompass;