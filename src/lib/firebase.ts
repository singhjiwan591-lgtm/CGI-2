
'use client';

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { useEffect } from 'react';

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "jbd-31",
  "appId": "1:452056696306:web:15a51c4161b04678d2b992",
  "storageBucket": "jbd-31.appspot.com",
  "apiKey": "AIzaSyCxrjG1_17p2N-dC_wDsoGpg-H22n3hXBA",
  "authDomain": "jbd-31.firebaseapp.com",
  "messagingSenderId": "452056696306"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, auth, db };
