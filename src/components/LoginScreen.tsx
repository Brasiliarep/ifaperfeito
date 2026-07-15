import React, { useState } from 'react';
import { auth } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Loader2, Crown, Lock } from 'lucide-react';

interface Props {
    onSuccess: () => void;
}

const LoginScreen: React.FC<Props> = ({ onSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLogin && !acceptedTerms) {
            setError('Você precisa aceitar os Termos de Uso e Política de Privacidade para criar uma conta.');
            return;
        }
        setLoading(true);
        setError('');
        setMessage('');

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                localStorage.setItem('ifa_terms_accepted', new Date().toISOString());
                await createUserWithEmailAndPassword(auth, email, password);
            }
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Erro ao autenticar. Verifique seus dados.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            setError('Digite seu e-mail acima para redefinir a senha.');
            return;
        }
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('E-mail de redefinição enviado! Verifique sua caixa de entrada.');
        } catch (err: any) {
            setError(err.message || 'Erro ao enviar e-mail de redefinição.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            onSuccess();
        } catch (err: any) {
            if (err.code !== 'auth/popup-closed-by-user') {
                setError(err.message || 'Erro ao autenticar com Google.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-[#0f0c08] flex items-center justify-center p-4">
            <div className="bg-ifa-base border border-ifa-gold/30 p-8 rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ifa-gold to-yellow-600"></div>

                <div className="flex flex-col items-center mb-8">
                    <img src="/logo.png" alt="Ifá Oluwo Logo" className="w-24 h-24 object-contain mb-4 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                    <h1 className="text-2xl font-serif text-ifa-gold font-bold uppercase tracking-widest text-center">IFÁ OLUWO</h1>
                    <p className="text-ifa-neutral text-sm mt-1">{isLogin ? 'Acesse o Codex Sacerdotal' : 'Crie sua conta de Sacerdote'}</p>
                </div>

                {error && <div className="bg-red-500/20 border border-red-500/50 text-red-200 text-sm p-3 rounded mb-4 text-center">{error}</div>}
                {message && <div className="bg-green-500/20 border border-green-500/50 text-green-200 text-sm p-3 rounded mb-4 text-center">{message}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Seu e-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="bg-black/50 border border-ifa-border text-white p-4 rounded focus:border-ifa-gold outline-none w-full"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Sua senha secreta"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="bg-black/50 border border-ifa-border text-white p-4 rounded focus:border-ifa-gold outline-none w-full"
                        required
                    />

                    {!isLogin && (
                        <label className="flex items-start gap-3 text-ifa-text text-xs cursor-pointer">
                            <input
                                type="checkbox"
                                checked={acceptedTerms}
                                onChange={e => setAcceptedTerms(e.target.checked)}
                                className="mt-0.5 accent-ifa-gold"
                            />
                            <span>
                                Aceito os{' '}
                                <span onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-legal', { detail: 'terms' })); }} className="text-ifa-gold underline hover:text-yellow-300 cursor-pointer">
                                    Termos de Uso
                                </span>{' '}
                                e{' '}
                                <span onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('open-legal', { detail: 'privacy' })); }} className="text-ifa-gold underline hover:text-yellow-300 cursor-pointer">
                                    Política de Privacidade
                                </span>{' '}
                                (LGPD)
                            </span>
                        </label>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 mt-2 bg-gradient-to-r from-yellow-600 to-yellow-700 text-white font-bold uppercase tracking-widest rounded shadow-lg hover:shadow-ifa-gold/20 hover:scale-[1.02] transition-all flex items-center justify-center disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Entrar' : 'Criar Conta')}
                    </button>
                </form>

                <div className="mt-4 mb-2 flex items-center gap-3">
                    <div className="flex-1 h-px bg-ifa-border"></div>
                    <span className="text-ifa-neutral text-xs uppercase tracking-widest">ou</span>
                    <div className="flex-1 h-px bg-ifa-border"></div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-3 border border-ifa-border rounded-lg flex items-center justify-center gap-3 text-ifa-text hover:bg-white/5 hover:border-ifa-gold/50 transition-all disabled:opacity-50"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-sm font-medium">Entrar com Google</span>
                </button>

                <div className="mt-4 text-center flex flex-col gap-3">
                    {isLogin && (
                        <button
                            type="button"
                            onClick={handleResetPassword}
                            disabled={loading}
                            className="text-ifa-gold/70 text-sm hover:text-ifa-gold transition-colors underline"
                        >
                            Esqueceu a senha?
                        </button>
                    )}
                    <button
                        onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); setAcceptedTerms(false); }}
                        className="text-ifa-neutral text-sm hover:text-white transition-colors"
                    >
                        {isLogin ? 'Não tem conta? Registre-se agora' : 'Já tem conta? Faça login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
