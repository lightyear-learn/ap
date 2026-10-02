self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Listen for cues from the active page script indicating your turn is up
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'TRIGGER_ALERT') {
    const token = event.data.token;
    
    self.registration.showNotification('Your Turn Has Arrived!', {
      body: `Token #${token}: Please proceed to the desk immediately to avoid losing your slot.`,
      icon: '/icon.png',
      badge: '/icon.png',
      vibrate: [200, 100, 200],
      tag: 'queue-turn-alert'
    });
  }
});