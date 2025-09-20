import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// ✅ VitePWA Precaching - This gets all your static assets
precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

const CACHE_NAME = 'dear-driving-app-v2';
const urlsToCache = [
  '/',
  '/manifest.webmanifest',  
  '/android-launchericon-192-192.png',
  '/android-launchericon-512-512.png',
  '/apple-touch-icon.png',
  '/favicon.ico',
];

// ✅ ENHANCED INSTALL EVENT
self.addEventListener('install', (event) => {
  console.log('SW: Installing version v2...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('SW: Caching essential files');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('SW: Install failed:', error);
      })
  );
  self.skipWaiting();
});

// ✅ ENHANCED ACTIVATE EVENT
self.addEventListener('activate', (event) => {
  console.log('SW: Activating...');
  event.waitUntil(
    Promise.all([
      // Clean old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && 
                !cacheName.startsWith('workbox-') && 
                !cacheName.includes('dear-driving')) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Claim all clients
      self.clients.claim()
    ])
  );
});

// ✅ RUNTIME CACHING STRATEGIES (from your Vite config)

// 1. API Requests - Network First
registerRoute(
  ({ url }) => url.pathname.includes('/api/v1/'),
  new NetworkFirst({
    cacheName: 'dear-driving-api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60, // 1 hour
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// 2. Static Images - Cache First
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'driving-school-images-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      }),
    ],
  })
);

// 3. Google Fonts CSS - Stale While Revalidate
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// 4. Google Font Files - Cache First
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      }),
    ],
  })
);

// 5. CDN Resources - Stale While Revalidate
registerRoute(
  ({ url }) => url.origin.includes('cdn.'),
  new StaleWhileRevalidate({
    cacheName: 'cdn-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
      }),
    ],
  })
);

// 6. CDN Fonts CSS (Satoshi) - Stale While Revalidate
registerRoute(
  ({ url }) => url.origin === 'https://fonts.cdnfonts.com' && url.pathname.endsWith('.css'),
  new StaleWhileRevalidate({
    cacheName: 'cdnfonts-stylesheets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
      }),
    ],
  })
);

// 7. CDN Font Files (Satoshi) - Cache First
registerRoute(
  ({ url }) => {
    return url.origin === 'https://fonts.cdnfonts.com' && 
           /\.(woff|woff2|ttf|otf|eot)$/i.test(url.pathname);
  },
  new CacheFirst({
    cacheName: 'cdnfonts-webfonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
      }),
    ],
  })
);

// 8. Push Notifications - Network Only
registerRoute(
  ({ url }) => url.pathname.includes('/subscribe-to-push'),
  new NetworkOnly({
    cacheName: 'push-notifications',
  })
);

// ✅ ENHANCED FETCH EVENT (fallback for non-workbox routes)
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests and chrome-extension requests
  if (!event.request.url.startsWith(self.location.origin) || 
      event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Let Workbox handle registered routes
  if (event.request.url.includes('/api/v1/') ||
      event.request.url.includes('fonts.googleapis.com') ||
      event.request.url.includes('fonts.gstatic.com') ||
      event.request.url.includes('fonts.cdnfonts.com') ||
      event.request.url.includes('cdn.') ||
      event.request.destination === 'image') {
    return; // Let Workbox strategies handle these
  }

  // Handle other requests with cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('SW: Serving from cache:', event.request.url);
          return response;
        }
        
        console.log('SW: Fetching from network:', event.request.url);
        return fetch(event.request).then((response) => {
          // Cache successful responses for navigation requests
          if (response.status === 200 && event.request.mode === 'navigate') {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        });
      })
      .catch((error) => {
        console.error('SW: Fetch failed:', error);
        // Return fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/') || caches.match('/index.html');
        }
        return new Response('Network error', { 
          status: 503, 
          statusText: 'Service Unavailable' 
        });
      })
  );
});

// ✅ PUSH NOTIFICATION HANDLERS (Enhanced)
self.addEventListener("push", (event) => {
  console.log('SW: Push event received');
  
  if (!event.data) {
    console.log('SW: No push data received');
    return;
  }

  try {
    const data = event.data.json();
    console.log('SW: Push data:', data);

    const notificationOptions = {
      body: data.message,
      icon: "/android-launchericon-192-192.png",
      badge: "/android-launchericon-192-192.png",
      tag: data.tag || "notification",
      requireInteraction: data.requireInteraction || false,
      silent: data.silent || false,
      vibrate: data.vibrate || [200, 100, 200],
      data: {
        url: data.url || "/",
        clickAction: data.clickAction || data.url || "/",
        timestamp: Date.now(),
        ...data.customData
      },
      actions: data.actions || [],
      // Enhanced notification options
      image: data.image,
      dir: data.dir || 'auto',
      lang: data.lang || 'en',
      renotify: data.renotify || false,
      sticky: data.sticky || false
    };

    event.waitUntil(
      self.registration.showNotification(
        data.title || 'DearDriving Notification', 
        notificationOptions
      )
    );
  } catch (error) {
    console.error('SW: Error processing push event:', error);
    
    // Fallback notification
    event.waitUntil(
      self.registration.showNotification('DearDriving', {
        body: 'You have a new notification',
        icon: "/android-launchericon-192-192.png",
        badge: "/android-launchericon-192-192.png",
        tag: "fallback-notification"
      })
    );
  }
});

// ✅ ENHANCED NOTIFICATION CLICK HANDLER
self.addEventListener("notificationclick", (event) => {
  console.log('SW: Notification clicked:', event.notification.tag);
  event.notification.close();

  const clickAction = event.action;
  const notificationData = event.notification.data || {};
  let url = notificationData.url || notificationData.clickAction || "/";

  // Handle custom actions
  if (clickAction && notificationData.actions) {
    const action = notificationData.actions.find(a => a.action === clickAction);
    if (action && action.url) {
      url = action.url;
    }
  }

  console.log('SW: Opening URL:', url);

  event.waitUntil(
    self.clients.matchAll({ 
      type: "window",
      includeUncontrolled: true 
    }).then((clients) => {
      // Look for existing window with the target URL
      for (let client of clients) {
        if (client.url === url && "focus" in client) {
          console.log('SW: Focusing existing window');
          return client.focus();
        }
      }
      
      // Look for any DearDriving window to focus and navigate
      for (let client of clients) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          console.log('SW: Focusing existing DearDriving window and navigating');
          client.focus();
          if ('navigate' in client) {
            return client.navigate(url);
          }
          return client.postMessage({ type: 'NAVIGATE', url: url });
        }
      }
      
      // Open new window
      if (self.clients.openWindow) {
        console.log('SW: Opening new window');
        return self.clients.openWindow(url);
      }
    }).catch((error) => {
      console.error('SW: Error handling notification click:', error);
    })
  );
});

// ✅ NOTIFICATION CLOSE HANDLER
self.addEventListener("notificationclose", (event) => {
  console.log("SW: Notification closed:", event.notification.tag);
  
  // Optional: Track notification dismissals
  const notificationData = event.notification.data || {};
  if (notificationData.trackDismissal) {
    // You can add analytics tracking here
    console.log('SW: Tracking notification dismissal');
  }
});

// ✅ MESSAGE HANDLER (for communication with main app)
self.addEventListener('message', (event) => {
  console.log('SW: Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: 'v2' });
  }
});

// ✅ BACKGROUND SYNC (for offline notification queuing)
self.addEventListener('sync', (event) => {
  console.log('SW: Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync-notifications') {
    event.waitUntil(
      // Handle queued notifications when back online
      console.log('SW: Processing queued notifications')
    );
  }
});

// ✅ PERIODIC BACKGROUND SYNC (if needed)
self.addEventListener('periodicsync', (event) => {
  console.log('SW: Periodic background sync:', event.tag);
  
  if (event.tag === 'content-sync') {
    event.waitUntil(
      // Sync content in background
      console.log('SW: Background content sync')
    );
  }
});

console.log('SW: Service Worker v2 loaded successfully with enhanced features');