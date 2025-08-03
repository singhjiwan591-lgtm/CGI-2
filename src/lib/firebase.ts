// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: "webfolio-unb29",
  appId: "1:120704760142:web:925456cffd2817de8a061f",
  storageBucket: "webfolio-unb29.firebasestorage.app",
  apiKey: "AIzaSyBxFNo_sOOM2uGHqzA1eqKFEbVR48wG1CM",
  authDomain: "webfolio-unb29.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "120704760142"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
let analytics;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

export { app, analytics };
