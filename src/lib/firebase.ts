// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "global-786",
  "appId": "1:1098988712906:web:b8c5f2d1e4f3a7c6e0f9b1",
  "storageBucket": "global-786.appspot.com",
  "apiKey": "AIzaSyARNMWvmeDy812-OjytkUTM_ajFDQ4yJIY",
  "authDomain": "global-786.firebaseapp.com",
  "messagingSenderId": "1098988712906"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized successfully!", app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
console.log("Firebase Auth service ready!", auth);


export { app, auth };
