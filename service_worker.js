self.addEventListener('install', function (event) {
  self.skipWaiting();
  console.info('Installed', event);
});

self.addEventListener('activate', function (event) {
  console.info('Activated', event);
});

self.addEventListener('push', function (event) {
  console.info('Push message received', event);

  event.waitUntil(
    self.registration.showNotification('New push message', {
      body: 'Long live the web platform!'
    }));
});
