// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "global-786",
  "appId": "1:1098988712906:web:d2948c2692ff21696078e8",
  "storageBucket": "global-786.appspot.com",
  "apiKey": "AIzaSyARNMWvmeDy812-OjytkUTM_ajFDQ4yJIY",
  "authDomain": "global-786.firebaseapp.com",
  "messagingSenderId": "1098988712906"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
