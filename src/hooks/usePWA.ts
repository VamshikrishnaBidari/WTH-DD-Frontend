import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

// Mock deferred prompt for bypass when real event doesn't fire
class MockBeforeInstallPromptEvent extends Event implements BeforeInstallPromptEvent {
  // Additional Event properties
  cancelBubble = false;
  returnValue = true;
  srcElement: Element | null = null;
  readonly NONE = 0 as const;
  readonly CAPTURING_PHASE = 1 as const;
  readonly AT_TARGET = 2 as const;
  readonly BUBBLING_PHASE = 3 as const;

  constructor() {
    super('beforeinstallprompt', {
      bubbles: false,
      cancelable: true,
      composed: false
    });
  }

  prompt(): Promise<void> {
    // For mock prompt, we'll just resolve - the actual install will be handled manually
    return Promise.resolve();
  }

  get userChoice(): Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }> {
    return Promise.resolve({ outcome: 'accepted' as const, platform: 'web' });
  }
}

export const usePWA = () => {
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [useMockPrompt, setUseMockPrompt] = useState(false);

  useEffect(() => {
    console.log('🔥 usePWA hook initialized - DETAILED CHECK');

    // Check if already installed
    const checkInstalled = () => {
      const isPWAInstalled = window.matchMedia('(display-mode: standalone)').matches ||
                           (window.navigator as any).standalone === true ||
                           document.referrer.includes('android-app://');
      
      console.log('🔍 PWA installed check:', {
        standalone: window.matchMedia('(display-mode: standalone)').matches,
        navigatorStandalone: (window.navigator as any).standalone,
        referrer: document.referrer,
        final: isPWAInstalled
      });
      
      setIsInstalled(isPWAInstalled);
      
      // If already installed, not installable
      if (isPWAInstalled) {
        setIsInstallable(false);
        console.log('✅ Already installed, setting isInstallable to false');
      } else {
        console.log('⏳ Not installed, waiting for beforeinstallprompt event...');
      }
    };

    checkInstalled();

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('🎉 beforeinstallprompt event fired!', e);
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
      setUseMockPrompt(false); // Real event fired, no need for mock
      console.log('✅ Set isInstallable to TRUE (real event)');
    };

    // Set up a timeout to create a mock prompt if the real event doesn't fire
    const mockPromptTimeout = setTimeout(() => {
      if (!deferredPrompt && !isInstalled) {
        console.log('⚡ Creating mock beforeinstallprompt event (bypass)');
        const mockEvent = new MockBeforeInstallPromptEvent();
        setDeferredPrompt(mockEvent);
        setIsInstallable(true);
        setUseMockPrompt(true);
        console.log('✅ Set isInstallable to TRUE (mock event)');
      }
    }, 3000); // Wait 3 seconds for the real event

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('✅ PWA was installed');
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    // 🔥 DEBUG: Check if events can be attached
    console.log('🔍 Checking window object:', {
      hasWindow: typeof window !== 'undefined',
      hasAddEventListener: typeof window.addEventListener === 'function',
      userAgent: navigator.userAgent
    });

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Debug: Log when events are attached
    console.log('🔗 PWA event listeners attached');

    // 🔥 FORCE TEST: Manually check if beforeinstallprompt should fire
    setTimeout(() => {
      console.log('🧪 5-second check - beforeinstallprompt status:', {
        deferredPromptExists: !!deferredPrompt,
        isInstallableState: isInstallable,
        isInstalledState: isInstalled
      });
    }, 5000);

    // Cleanup
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(mockPromptTimeout);
      console.log('🧹 PWA event listeners removed');
    };
  }, []);

  const installApp = async (): Promise<boolean> => {
    console.log('Install app called', { 
      hasDeferredPrompt: !!deferredPrompt, 
      isMockPrompt: useMockPrompt 
    });
    
    if (!deferredPrompt) {
      console.log('❌ No install prompt available');
      return false;
    }

    try {
      // If it's a mock prompt, we can't actually trigger the browser install
      if (useMockPrompt) {
        console.log('🔄 Mock prompt - showing manual install instructions');
        // Return true to indicate the user should see install instructions
        return true;
      }

      // Real prompt - use the browser's install flow
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log('User choice:', outcome);
      
      if (outcome === 'accepted') {
        console.log('✅ User accepted the install prompt');
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
        return true;
      } else {
        console.log('❌ User dismissed the install prompt');
        return false;
      }
    } catch (error) {
      console.error('❌ Error during install:', error);
      return false;
    }
  };

  return {
    isInstallable,
    isInstalled,
    installApp,
    canInstall: !!deferredPrompt,
    isMockPrompt: useMockPrompt
  };
};