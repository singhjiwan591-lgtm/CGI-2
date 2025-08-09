
'use client';

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { useEffect } from 'react';

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "fir-feat-prod-9892b",
  "appId": "1:95804345479:web:9f8319fca378e5f2e62a19",
  "storageBucket": "fir-feat-prod-9892b.appspot.com",
  "apiKey": "AIzaSyCX_S8vR4D8G6w_Z3v6e5GfI7sW3x_QJjY",
  "authDomain": "fir-feat-prod-9892b.firebaseapp.com",
  "messagingSenderId": "95804345479"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, auth, db };
