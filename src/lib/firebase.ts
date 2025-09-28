// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChe50HhyCbWYgYIYsJWW_J3bN99TCtsOs",
  authDomain: "storage-ced10.firebaseapp.com",
  projectId: "storage-ced10",
  storageBucket: "storage-ced10.appspot.com",
  messagingSenderId: "428344436985",
  appId: "1:428344436985:web:2602e4762c4be76c2fda28",
  measurementId: "G-FVF1WN0D4F"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);

export { app, storage };
