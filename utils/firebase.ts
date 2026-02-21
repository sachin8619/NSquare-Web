import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

function getServiceAccount() {
  const sa = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!sa) return null;
  
  // If it's already an object (some environments might parse it)
  if (typeof sa === 'object') return sa;

  try {
    // Try parsing as is
    return JSON.parse(sa);
  } catch (e) {
    try {
      // Try handling cases where it might be a stringified string (double escaped)
      return JSON.parse(JSON.parse(sa));
    } catch (e2) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT. Ensure it is a valid JSON string.');
      return null;
    }
  }
}

function initializeFirebaseAdmin() {
  if (admin.apps.length) return admin.app();

  const serviceAccount = getServiceAccount();
  if (serviceAccount) {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  } else {
    console.warn('Firebase Service Account not found. Backend Firebase features will be unavailable.');
    return null;
  }
}

export const getAuth = () => {
  const app = initializeFirebaseAdmin();
  if (!app) throw new Error('Firebase Admin not initialized. Check FIREBASE_SERVICE_ACCOUNT.');
  return admin.auth(app);
};

export const getDb = () => {
  const app = initializeFirebaseAdmin();
  if (!app) throw new Error('Firebase Admin not initialized. Check FIREBASE_SERVICE_ACCOUNT.');
  return admin.firestore(app);
};
