import React from 'react';
import { X, Smartphone, Menu, Share, Plus } from 'lucide-react';

interface InstallInstructionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstallInstructionDialog: React.FC<InstallInstructionDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Detect device type for specific instructions
  const userAgent = navigator.userAgent.toLowerCase();
  const isAndroid = userAgent.includes('android');
  const isIOS = userAgent.includes('iphone') || userAgent.includes('ipad');
  const isChrome = userAgent.includes('chrome');
  const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome');

  const getInstructions = () => {
    if (isAndroid && isChrome) {
      return {
        title: "Install on Android Chrome",
        steps: [
          { icon: <Menu className="h-4 w-4" />, text: "Tap the menu (⋮) in Chrome" },
          { icon: <Plus className="h-4 w-4" />, text: "Tap 'Add to Home screen'" },
          { icon: <Smartphone className="h-4 w-4" />, text: "Tap 'Install' or 'Add'" }
        ]
      };
    } else if (isIOS && isSafari) {
      return {
        title: "Install on iOS Safari",
        steps: [
          { icon: <Share className="h-4 w-4" />, text: "Tap the Share button (□↗)" },
          { icon: <Plus className="h-4 w-4" />, text: "Scroll down and tap 'Add to Home Screen'" },
          { icon: <Smartphone className="h-4 w-4" />, text: "Tap 'Add'" }
        ]
      };
    } else {
      return {
        title: "Install DearDriving App",
        steps: [
          { icon: <Menu className="h-4 w-4" />, text: "Tap your browser menu" },
          { icon: <Plus className="h-4 w-4" />, text: "Look for 'Add to Home Screen' or 'Install App'" },
          { icon: <Smartphone className="h-4 w-4" />, text: "Tap 'Install' or 'Add'" }
        ]
      };
    }
  };

  const instructions = getInstructions();

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
      
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 shadow-lg max-w-sm w-full mx-4 animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-zinc-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Smartphone className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  {instructions.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Follow these steps
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Instructions */}
          <div className="p-5">
            <div className="space-y-3">
              {instructions.steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-medium">
                    {index + 1}
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <div className="text-gray-500 dark:text-gray-400">
                      {step.icon}
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional tip */}
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/10 border-l-2 border-blue-200 dark:border-blue-800">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                <strong>Tip:</strong> Look for the install icon (⊕) in your browser's address bar.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 pt-0">
            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 text-sm"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstallInstructionDialog;
