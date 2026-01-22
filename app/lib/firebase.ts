import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// REPLACE THE VALUES BELOW WITH YOUR FIREBASE CONFIGURATION
// You can find these in the Firebase Console -> Project Settings -> General -> Your Apps
const firebaseConfig = {
  apiKey: "AIzaSyDdy2FxJzfQDvMZFSAT8QADfFhOra_asDc",
  authDomain: "notes-app-ee5af.firebaseapp.com",
  projectId: "notes-app-ee5af",
  storageBucket: "notes-app-ee5af.firebasestorage.app",
  messagingSenderId: "389361043979",
  appId: "1:389361043979:web:98543e7452a1893143950e",
  measurementId: "G-0DMNR1BPFW"
};

// Initialize Firebase (Singleton pattern to avoid re-initialization error)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
