
'use client';

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyqOae7f0T4HducBU37pD1maDmmc_9nDM",
  authDomain: "jbd-31.firebaseapp.com",
  projectId: "jbd-31",
  storageBucket: "jbd-31.firebasestorage.app",
  messagingSenderId: "452056696306",
  appId: "1:452056696306:web:0fe259d22fa8531890176b",
  measurementId: "G-NSDVPWMS6Q"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, auth, db };
