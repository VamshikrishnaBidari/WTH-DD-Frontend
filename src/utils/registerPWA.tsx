export const registerPWA = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      console.log('✅ PWA Service Worker registered for DearDriving');
      
      // Enhanced update handling
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Show update notification (you can integrate with your toast system)
              console.log('🔄 New DearDriving version available!');
              
              // You can dispatch a custom event to show update UI
              window.dispatchEvent(new CustomEvent('pwa-update-available'));
            }
          });
        }
      });
      
      // Handle successful activation
      registration.addEventListener('activate', () => {
        console.log('✅ DearDriving PWA activated');
      });
      
      return registration;
    } catch (error) {
      console.error('❌ PWA Service Worker registration failed:', error);
    }
  } else {
    console.warn('⚠️ Service Workers not supported in this browser');
  }
};