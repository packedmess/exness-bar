console.log('[Service Worker] Push notifications service worker successfully registered.');

function receivePushNotification(event) {
  console.log('[Service Worker] Push Received.');

  const {data} = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.message,
    }),
  );
}

function openPushNotification(event) {
  console.log('[Service Worker] Notification click Received.', event.notification.data);

  event.notification.close();
  event.waitUntil(self.clients.openWindow('/profile'));
}

self.addEventListener('push', receivePushNotification);
self.addEventListener('notificationclick', openPushNotification);
