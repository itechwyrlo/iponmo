// IMPORTANT: This file contains real Firebase config values and must NOT be committed to source control.
// It is listed in .gitignore. Before deploying, replace all placeholder values below
// with the actual values from your Firebase project settings.

importScripts('https://www.gstatic.com/firebasejs/12.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.14.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyC4otpQQyek6VXVO4IYI1ynMR4j58mV3GM',
  authDomain: 'iponmo-a3dd5.firebaseapp.com',
  projectId: 'iponmo-a3dd5',
  messagingSenderId: '529677416614',
  appId: '1:529677416614:web:a27c43fd4836c29ed2dc67',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // Visible in DevTools → Application → Service Workers → Inspect
  console.log('[SW] onBackgroundMessage received. Full payload:', JSON.stringify(payload));
  const title = payload.notification?.title ?? 'New message';
  const body = payload.notification?.body ?? '';
  console.log('[SW] Showing OS notification — title:', title, '| body:', body, '| data:', JSON.stringify(payload.data));
  self.registration.showNotification(title, {
    body,
    icon: '/logo192.png',
  });
});
