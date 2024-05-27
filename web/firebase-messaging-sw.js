importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyB9pU6I0uR4c12tn48JdpCl8EGC2oYyOAI",
  authDomain: "lolocal-a010b.firebaseapp.com",
  databaseURL: "https://lolocal-a010b-default-rtdb.firebaseio.com/",
  projectId: "lolocal-a010b",
  storageBucket: "lolocal-a010b.appspot.com",
  messagingSenderId: "499538476096",
  appId: "1:499538476096:web:60b5ccd9d5cb93f56773a5",
  measurementId: "G-N8BP5ZMC4Z"
});


const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            const title = payload.notification.title;
            const options = {
                body: payload.notification.score
              };
            return registration.showNotification(title, options);
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});