import { useState, useEffect, useRef } from 'react';

export const usePWAContext = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      
      // Check if currently running as installed PWA
      const isPWAInstalled = window.matchMedia('(display-mode: standalone)').matches ||
                            (window.navigator as any).standalone === true ||
                            document.referrer.includes('android-app://');

      console.log('PWA Context Detection (ONLY ONCE):', {
        standalone: window.matchMedia('(display-mode: standalone)').matches,
        navigator: (window.navigator as any).standalone,
        referrer: document.referrer,
        final: isPWAInstalled
      });

      setIsInstalled(isPWAInstalled);
      setIsInitialized(true);
    }
  }, []); // Empty dependency array!

  return {
    isPWA: isInstalled,
    isInstalled,
    isInitialized
  };
};