import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ============================================================
// FIREBASE CONFIGURATION
// ============================================================
// Replace these values with your Firebase project config.
// Get them from: Firebase Console → Project Settings → Your apps
// 
// For production, use environment variables (see .env.example):
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyDdX_1pzM1kzBCbX-bxJxBlP0U8v9zdH8A",
  authDomain: "ggdc-3902b.firebaseapp.com",
  projectId: "ggdc-3902b",
  storageBucket: "ggdc-3902b.firebasestorage.app",
  messagingSenderId: "403055599158",
  appId: "1:403055599158:web:ae7ab80d6162b3489e8297"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore
export const db = getFirestore(app);

export default app;
