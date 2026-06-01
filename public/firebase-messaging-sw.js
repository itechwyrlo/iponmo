// IMPORTANT: This file contains real Firebase config values and must NOT be committed to source control.
// It is listed in .gitignore. Before deploying, replace all placeholder values below
// with the actual values from your Firebase project settings.

importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'VITE_FIREBASE_API_KEY_PLACEHOLDER',
  authDomain: 'VITE_FIREBASE_AUTH_DOMAIN_PLACEHOLDER',
  projectId: 'VITE_FIREBASE_PROJECT_ID_PLACEHOLDER',
  messagingSenderId: 'VITE_FIREBASE_MESSAGING_SENDER_ID_PLACEHOLDER',
  appId: 'VITE_FIREBASE_APP_ID_PLACEHOLDER',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title ?? 'New message';
  const body = payload.notification?.body ?? '';
  self.registration.showNotification(title, {
    body,
    icon: '/logo192.png',
  });
});
