// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "webfolio-unb29",
  "appId": "1:120704760142:web:925456cffd2817de8a061f",
  "storageBucket": "webfolio-unb29.firebasestorage.app",
  "apiKey": "AIzaSyBxFNo_sOOM2uGHqzA1eqKFEbVR48wG1CM",
  "authDomain": "webfolio-unb29.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "120704760142"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
