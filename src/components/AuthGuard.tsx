import React from 'react';
import { useAuth } from '../services/AuthContext';
import { Loader2, Lock } from 'lucide-react';

interface AuthGuardProps {
    children: React.ReactNode;
    onLoginRequired?: () => void;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, onLoginRequired }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loader2 className="animate-spin text-ifa-gold" size={40} />
            </div>
        );
    }

    if (!user) {
        if (onLoginRequired) {
            onLoginRequired();
        }
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black gap-4 p-4">
                <Lock size={48} className="text-ifa-gold/50" />
                <p className="text-ifa-neutral text-sm text-center">Faça login para acessar esta funcionalidade.</p>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;
