import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCdDWmXZQNx6g5ojwzgQUxIM2jIn9NJE80",
  authDomain: "nsquare-a8d87.firebaseapp.com",
  projectId: "nsquare-a8d87",
  storageBucket: "nsquare-a8d87.firebasestorage.app",
  messagingSenderId: "401552743405",
  appId: "1:401552743405:web:7d6903d470af787a8f65e4",
  measurementId: "G-MKMK3V54BQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

// Initialize Analytics only in supported environments (browser)
export const analytics = typeof window !== 'undefined' ? isSupported().then(yes => yes ? getAnalytics(app) : null) : null;
