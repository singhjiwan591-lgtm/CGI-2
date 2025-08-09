'use client';

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { useEffect } from 'react';

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "courses-1-11b17",
  "appId": "1:550601892749:web:b8c5f2d1e4f3a7c6e0f9b1",
  "storageBucket": "courses-1-11b17.appspot.com",
  "apiKey": "AIzaSyARNMWvmeDy812-OjytkUTM_ajFDQ4yJIY",
  "authDomain": "courses-1-11b17.firebaseapp.com",
  "messagingSenderId": "550601892749"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, auth, db };
