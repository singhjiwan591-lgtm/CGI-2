
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRToaqZVCjfOkbMcfdRaC1K_1ymYvPNrw",
  authDomain: "gci-1-dad7e.firebaseapp.com",
  projectId: "gci-1-dad7e",
  storageBucket: "gci-1-dad7e.appspot.com",
  messagingSenderId: "3082177214",
  appId: "1:3082177214:web:82b9f84e75c61400672cef",
  measurementId: "G-GC4HDZM6DQ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

export { app, analytics };
