import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from './firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, getDocs, query, where, doc, getDoc, setDoc } from 'firebase/firestore';
import { UserProfile } from '../types';

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    updateUsageCounters: (type: 'consultation' | 'study') => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
    updateUsageCounters: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const updateUsageCounters = async (type: 'consultation' | 'study') => {
        if (!user || !userProfile) return;
        const newCount = (type === 'consultation' ? (userProfile.consultationCount || 0) : (userProfile.studyCount || 0)) + 1;
        const updates = type === 'consultation' ? { consultationCount: newCount } : { studyCount: newCount };
        
        await setDoc(doc(db, 'users', user.uid), updates, { merge: true });
        setUserProfile({ ...userProfile, ...updates });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (u) => {
            setUser(u);
            if (u) {
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
                        await setDoc(docRef, profile);
                    }
                } catch { }

                // 2) Se não achou por email, usa o doc atual
                if (!profile && docSnap.exists()) {
                    profile = docSnap.data() as UserProfile;
                    if (profile.validUntil && new Date(profile.validUntil).getTime() < new Date().getTime()) {
                        profile = { ...profile, plan: 'free', validUntil: undefined };
                        await setDoc(docRef, { plan: 'free', validUntil: null }, { merge: true });
                    }
                }

                // 3) Se não achou nada, cria novo
                if (!profile) {
                    profile = {
                        uid: u.uid,
                        email: u.email || '',
                        name: u.displayName || (isAdmin ? 'Oluwo Supremo' : 'Sacerdote'),
                        plan: isAdmin ? 'pro_annual' : 'free',
                        role: isAdmin ? 'admin' : 'user',
                        consultationCount: 0,
                        studyCount: 0
                    };
                    await setDoc(docRef, profile);
                }

                // 4) FORÇA VIPs a terem acesso total (sobrescreve qualquer coisa)
                if (isVip && (profile.plan !== 'pro_annual' || profile.role !== 'admin')) {
                    profile = { ...profile, role: 'admin', plan: 'pro_annual', validUntil: undefined };
                    await setDoc(docRef, { role: 'admin', plan: 'pro_annual', validUntil: null }, { merge: true });
                }

                setUserProfile(profile);
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, userProfile, loading, updateUsageCounters }}>
            {children}
        </AuthContext.Provider>
    );
};
