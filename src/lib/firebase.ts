
'use client';

// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyqOae7f0T4HducBU37pD1maDmmc_9nDM",
  authDomain: "jbd-31.firebaseapp.com",
  projectId: "jbd-31",
  storageBucket: "jbd-31.appspot.com",
  messagingSenderId: "452056696306",
  appId: "1:452056696306:web:0fe259d22fa8531890176b",
  measurementId: "G-NSDVPWMS6Q"
};

// Initialize Firebase for SSR, if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const messaging = (typeof window !== 'undefined') ? getMessaging(app) : null;

const VAPID_KEY = 'BFvFzlUy4XcVX1Epvkhrm7tOG4wKju9y9x6VPhhb0SOiEMzZoKX_enFG-2FteaqISyWSqb1hN20zyvvV92nDeRA';

const requestNotificationPermission = async () => {
  if (!messaging) return;
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY });
      if (currentToken) {
        console.log('FCM Token:', currentToken);
        // You can send this token to your server for sending targeted notifications
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    } else {
      console.log('Unable to get permission to notify.');
    }
  } catch (error) {
    console.error('An error occurred while retrieving token. ', error);
  }
};

export { app, auth, db, storage, messaging, requestNotificationPermission };
