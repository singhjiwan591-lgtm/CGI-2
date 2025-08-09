
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
console.log("Firebase app initialized successfully!", app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
console.log("Firebase Auth service ready!", auth);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
console.log("Firebase Firestore service ready!", db);


// Function to initialize App Check
const initializeFirebaseAppCheck = () => {
    // Ensure this runs only on the client
    if (typeof window !== 'undefined') {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
        if (siteKey) {
            // Wait for reCAPTCHA to be ready
            window.grecaptcha.enterprise.ready(() => {
                try {
                    initializeAppCheck(app, {
                        provider: new ReCaptchaV3Provider(siteKey),
                        // Optional: set to true for automated token refresh
                        isTokenAutoRefreshEnabled: true
                    });
                    console.log("Firebase App Check initialized successfully!");
                } catch (error) {
                    console.error("Error initializing Firebase App Check:", error);
                }
            });
        } else {
            console.warn("reCAPTCHA Site Key is not found. Firebase App Check is not initialized.");
        }
    }
};

// Call the function to initialize App Check
initializeFirebaseAppCheck();


export { app, auth, db };
