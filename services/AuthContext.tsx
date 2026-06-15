import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, getDocs, query, where, doc, getDoc, setDoc } from 'firebase/firestore';
import { UserProfile } from '../types';
import { firestoreCache, scheduleWrite, acquireWriteSlot } from './overloadGuard';

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    updateUsageCounters: (type: 'consultation' | 'study') => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
    updateUsageCounters: async () => {},
    refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshProfile = async () => {
        if (!user) return;
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const profile = docSnap.data() as UserProfile;
            firestoreCache.set('profile_' + user.uid, profile);
            setUserProfile(profile);
        }
    };

    const updateUsageCounters = async (type: 'consultation' | 'study') => {
        if (!user || !userProfile) return;
        const key = `usage_${user.uid}_${type}`;
        const newCount = (type === 'consultation' ? (userProfile.consultationCount || 0) : (userProfile.studyCount || 0)) + 1;
        const updates = type === 'consultation' ? { consultationCount: newCount } : { studyCount: newCount };

        setUserProfile({ ...userProfile, ...updates });

        scheduleWrite(key, async () => {
            await acquireWriteSlot();
            await setDoc(doc(db, 'users', user.uid), updates, { merge: true });
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (u) => {
            setUser(u);
            if (u) {
                const cacheKey = 'profile_' + u.uid;
                const cached = firestoreCache.get<UserProfile>(cacheKey);

                if (cached) {
                    setUserProfile(cached);
                    setLoading(false);
                }

                const docRef = doc(db, 'users', u.uid);
                const docSnap = await getDoc(docRef);
                const VIP_EMAILS = ['safffnb@gmail.com', 'raquel.rafen@gmail.com'];
                const isAdmin = u.email === 'safffnb@gmail.com';
                const isVip = VIP_EMAILS.includes(u.email || '');

                let profile: UserProfile | null = null;

                // 1) Tenta achar perfil pelo email (recupera mesmo com UID novo)
                try {
                    const emailQuery = query(collection(db, 'users'), where('email', '==', u.email));
                    const emailMatch = await getDocs(emailQuery);
                    if (!emailMatch.empty) {
                        const sorted = emailMatch.docs
                            .map(d => d.data() as UserProfile)
                            .sort((a, b) => {
                                const rank = (p: UserProfile) => p.plan === 'free' ? 0 : p.plan === 'student_monthly' ? 1 : p.plan === 'pro_monthly' ? 2 : 3;
                                return rank(b) - rank(a);
                            });
                        profile = { ...sorted[0], uid: u.uid };
                        await acquireWriteSlot();
                        await setDoc(docRef, profile);
                    }
                } catch { }

                // 2) Se não achou por email, usa o doc atual
                if (!profile && docSnap.exists()) {
                    profile = docSnap.data() as UserProfile;
                    if (profile.validUntil && new Date(profile.validUntil).getTime() < new Date().getTime()) {
                        profile = { ...profile, plan: 'free', validUntil: undefined };
                        await acquireWriteSlot();
                        await setDoc(docRef, { plan: 'free', validUntil: null }, { merge: true });
                    }
                }

                // 3) Se não achou nada, cria novo
                if (!profile) {
                    const termsAccepted = localStorage.getItem('ifa_terms_accepted');
                    profile = {
                        uid: u.uid,
                        email: u.email || '',
                        name: u.displayName || (isAdmin ? 'Oluwo Supremo' : 'Sacerdote'),
                        plan: isAdmin ? 'pro_annual' : 'free',
                        role: isAdmin ? 'admin' : 'user',
                        consultationCount: 0,
                        studyCount: 0,
                        termsAcceptedAt: termsAccepted || undefined,
                        privacyAcceptedAt: termsAccepted || undefined,
                    };
                    await acquireWriteSlot();
                    await setDoc(docRef, profile);
                    localStorage.removeItem('ifa_terms_accepted');
                }

                // 4) FORÇA VIPs a terem acesso total (sobrescreve qualquer coisa)
                if (isVip && (profile.plan !== 'pro_annual' || profile.role !== 'admin')) {
                    profile = { ...profile, role: 'admin', plan: 'pro_annual', validUntil: undefined };
                    await acquireWriteSlot();
                    await setDoc(docRef, { role: 'admin', plan: 'pro_annual', validUntil: null }, { merge: true });
                }

                firestoreCache.set(cacheKey, profile);
                setUserProfile(profile);
                if (!cached) setLoading(false);
            } else {
                firestoreCache.invalidate('profile_' + (user?.uid || ''));
                setUserProfile(null);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, userProfile, loading, updateUsageCounters, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
