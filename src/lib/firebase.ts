// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// IMPORTANT: Replace the placeholder values with the actual values from your Firebase project console.
const firebaseConfig = {
  "projectId": "studio-8507896087", // Provided project ID
  "appId": "YOUR_APP_ID",
  "storageBucket": "YOUR_STORAGE_BUCKET",
  "apiKey": "YOUR_API_KEY",
  "authDomain": "YOUR_AUTH_DOMAIN",
  "messagingSenderId": "YOUR_MESSAGING_SENDER_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
