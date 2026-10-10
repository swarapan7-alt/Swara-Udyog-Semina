import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;
let isConfigured = false;
let configError: string | null = null;

try {
  // Check if firebase-applet-config is present or if env vars are provided
  // In AI Studio, firebase-applet-config.json is placed in the project root if provisioned
  // We dynamically check for configuration
  const config = (window as unknown as { __FIREBASE_CONFIG__?: Record<string, string> }).__FIREBASE_CONFIG__;
  
  if (config && config.apiKey && config.projectId) {
    const app = getApps().length === 0 ? initializeApp(config) : getApp();
    dbInstance = getFirestore(app);
    authInstance = getAuth(app);
    isConfigured = true;
  }
} catch (err) {
  configError = err instanceof Error ? err.message : String(err);
  console.info('Firebase initialization note: using responsive local storage layer.');
}

export const db = dbInstance;
export const auth = authInstance;
export const isFirebaseActive = isConfigured;
export const firebaseInitError = configError;
