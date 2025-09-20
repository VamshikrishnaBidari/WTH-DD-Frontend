import React, { useState, useEffect } from 'react';
import { usePWA } from '../hooks/usePWA';
import { X, Download, Smartphone, Sparkles } from 'lucide-react';

const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, installApp, isMockPrompt } = usePWA();
  const [dismissed, setDismissed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showManualInstructions, setShowManualInstructions] = useState(false);

  // Check if user has dismissed the banner before
  useEffect(() => {
    const dismissedBefore = localStorage.getItem('pwa-banner-dismissed');
    if (dismissedBefore) {
      const dismissedTime = parseInt(dismissedBefore);
      const now = Date.now();
      const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
      
      // If dismissed more than 7 days ago, allow showing again
      if (dismissedTime && (now - dismissedTime) > sevenDays) {
        localStorage.removeItem('pwa-banner-dismissed');
        setDismissed(false);
      } else {
        setDismissed(true);
      }
    }
  }, []);

  // Enhanced mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone', 'mobile'];
      const isMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));
      
      // Check screen size and touch capability
      const isMobileScreen = window.innerWidth <= 768;
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // If beforeinstallprompt fired, it's definitely mobile
      const hasInstallPrompt = isInstallable;
      
      const isMobileDevice = isMobileUA || hasInstallPrompt || (isMobileScreen && hasTouchScreen);
      
      console.log('Mobile detection:', {
        userAgent: userAgent,
        isMobileUA,
        isMobileScreen,
        hasTouchScreen,
        hasInstallPrompt,
        final: isMobileDevice
      });
      
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isInstallable]); // Add isInstallable as dependency

  // Debug log the conditions
  console.log('PWA Banner conditions:', {
    isInstalled,
    isInstallable,
    dismissed,
    isMobile,
    shouldShow: !isInstalled && isInstallable && !dismissed && isMobile
  });

  // Don't show if:
  // - Already installed
  // - Not installable
  // - Dismissed
  // - Not a mobile device
  if (isInstalled || !isInstallable || dismissed || !isMobile) return null;

  const handleInstall = async () => {
    setIsLoading(true);
    try {
      const success = await installApp();
      if (success) {
        if (isMockPrompt) {
          // For mock prompts, show manual install instructions
          setShowManualInstructions(true);
        } else {
          // For real prompts, the app was actually installed
          setDismissed(true);
          localStorage.setItem('pwa-banner-dismissed', 'true');
        }
      }
    } catch (error) {
      console.error('Installation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    // Remember dismissal for 7 days
    localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in duration-300" />
      
      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500">
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-700 mx-4 mb-4 rounded-2xl shadow-2xl border border-white/20">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/5 to-transparent rounded-2xl" />
          <div className="absolute -top-1 -right-1 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-xl" />
          
          <div className="relative p-6">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Content */}
            <div className="pr-8">
              {showManualInstructions ? (
                // Manual install instructions for mock prompts
                <>
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        Install DearDriving
                      </h3>
                      <p className="text-white/80 text-sm">
                        Follow these steps to install
                      </p>
                    </div>
                  </div>

                  {/* Manual instructions */}
                  <div className="mb-6 text-white/90 text-sm space-y-2">
                    <p className="font-medium">To install this app:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2">
                      <li>Tap the browser menu (⋮ or share button)</li>
                      <li>Look for "Add to Home Screen" or "Install App"</li>
                      <li>Tap "Add" or "Install" to confirm</li>
                    </ol>
                  </div>

                  {/* Close button */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        setShowManualInstructions(false);
                        setDismissed(true);
                        localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
                      }}
                      className="bg-white text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Got it
                    </button>
                  </div>
                </>
              ) : (
                // Normal install banner
                <>
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">
                        Install DearDriving
                      </h3>
                      <p className="text-white/80 text-sm">
                        Get the full app experience
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center space-x-2 text-white/90 text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>Fast & native feel</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/90 text-sm">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span>Push notifications</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={handleInstall}
                      disabled={isLoading}
                      className="flex-1 bg-white text-blue-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Download className="h-5 w-5" />
                          <span>Install</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={handleDismiss}
                      className="px-4 py-3 text-white/80 hover:text-white font-medium text-sm transition-colors"
                    >
                      Dismiss
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PWAInstallBanner;