
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwbs3nf3crkFWHr_sSnsl0sUJ6Z_UKtUU",
  authDomain: "the-outcome-466907-n2.firebaseapp.com",
  projectId: "the-outcome-466907-n2",
  storageBucket: "the-outcome-466907-n2.firebasestorage.app",
  messagingSenderId: "621495501559",
  appId: "1:621495501559:web:3e1df2e783b51d821709f2",
  measurementId: "G-PTFCZ62VXW"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
