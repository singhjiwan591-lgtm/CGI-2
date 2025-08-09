
'use client';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

declare global {
    interface Window {
      FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
      grecaptcha: any;
    }
}

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
const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized successfully!");

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
console.log("Firebase Auth service ready!");

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
console.log("Firebase Firestore service ready!");

// Function to initialize App Check, only runs on client
const initializeFirebaseAppCheck = () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
        console.warn("reCAPTCHA Site Key is not found. App Check is not initialized.");
        return;
    }
    
    // Check if grecaptcha is available and ready
    if (window.grecaptcha && window.grecaptcha.enterprise && typeof window.grecaptcha.enterprise.ready === 'function') {
         window.grecaptcha.enterprise.ready(() => {
            try {
                initializeAppCheck(app, {
                    provider: new ReCaptchaV3Provider(siteKey),
                    isTokenAutoRefreshEnabled: true
                });
                console.log("Firebase App Check initialized successfully!");
            } catch (error) {
                console.error("Error initializing Firebase App Check:", error);
            }
        });
    } else {
        console.error("reCAPTCHA script not loaded or ready yet. App Check initialization deferred.");
    }
};

// Ensure this runs only on the client
if (typeof window !== 'undefined') {
    initializeFirebaseAppCheck();
}


export { app, auth, db };
