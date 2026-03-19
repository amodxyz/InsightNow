import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB_O5TZY5GHHPsE4yxQGJHPnTBe3ogXEbM",
  authDomain: "insightnow247.firebaseapp.com",
  projectId: "insightnow247",
  storageBucket: "insightnow247.firebasestorage.app",
  messagingSenderId: "836767725095",
  appId: "1:836767725095:web:1bec76da5b86a7ef8a8002",
  measurementId: "G-WTWM9NFTZH"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
