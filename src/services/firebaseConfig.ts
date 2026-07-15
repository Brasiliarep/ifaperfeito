import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDHW0PpLoUAVaFQrkLt5hSAMQ-ZVOZlK40",
  authDomain: "ifa-oluwo.firebaseapp.com",
  projectId: "ifa-oluwo",
  storageBucket: "ifa-oluwo.firebasestorage.app",
  messagingSenderId: "1074014685125",
  appId: "1:1074014685125:web:c89b2159dfb73a3f202dac",
  measurementId: "G-NPLTYSCZEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
