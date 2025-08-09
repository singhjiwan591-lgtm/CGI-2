
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyDyqOae7f0T4HducBU37pD1maDmmc_9nDM",
  authDomain: "jbd-31.firebaseapp.com",
  projectId: "jbd-31",
  storageBucket: "jbd-31.firebasestorage.app",
  messagingSenderId: "452056696306",
  appId: "1:452056696306:web:0fe259d22fa8531890176b",
  measurementId: "G-NSDVPWMS6Q"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image || '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
