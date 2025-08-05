// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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


export { app, auth, db };
