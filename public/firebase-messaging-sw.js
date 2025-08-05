
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
  "projectId": "webfolio-unb29",
  "appId": "1:120704760142:web:925456cffd2817de8a061f",
  "storageBucket": "webfolio-unb29.firebasestorage.app",
  "apiKey": "AIzaSyBxFNo_sOOM2uGHqzA1eqKFEbVR48wG1CM",
  "authDomain": "webfolio-unb29.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "120704760142"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
