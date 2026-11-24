'use client';

import React, { useEffect, useState } from 'react';
import { Download, X, Share, PlusSquare, Fingerprint } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSTip, setShowIOSTip] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[PWA] Service Worker registered:', reg.scope);
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    }

    // 2. Check if already installed / running in standalone mode
    if (typeof window !== 'undefined') {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true;

      if (isStandalone) {
        setIsInstalled(true);
        return;
      }

      // Check if dismissed in this session
      const dismissed = sessionStorage.getItem('pwa_prompt_dismissed');
      if (dismissed) {
        return;
      }

      // Detect iOS Safari
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isAppleMobile = /iphone|ipad|ipod/.test(userAgent);
      const isSafari =
        isAppleMobile &&
        userAgent.includes('safari') &&
        !userAgent.includes('crios') &&
        !userAgent.includes('fxios');

      if (isAppleMobile) {
        setIsIOS(true);
      }

      // Capture Android / Chromium beforeinstallprompt
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setIsVisible(true);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

      // On iOS or mobile devices where beforeinstallprompt doesn't fire immediately,
      // reveal after a short delay (1.5s) so the user gets prompted
      const timer = setTimeout(() => {
        const isMobileScreen = window.innerWidth <= 768 || isAppleMobile;
        if (isMobileScreen && !isStandalone) {
          setIsVisible(true);
        }
      }, 1500);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        clearTimeout(timer);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Android / Chromium native install dialog
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsVisible(false);
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      // Toggle iOS instruction tooltip
      setShowIOSTip((prev) => !prev);
    } else {
      // Fallback for desktop / other browsers without deferred prompt
      alert('To install, open your browser menu (⋮) and select "Add to Home Screen" or "Install App".');
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (!isVisible || isInstalled) return null;

  return (
    <aside aria-label="Install App" className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-5 sm:bottom-5 sm:max-w-sm z-50 animate-fade-in">
      <div className="bg-slate-900/95 border border-slate-700/80 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl ring-1 ring-slate-800 flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* App Icon & Details */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#0c1017] border border-rose-500/40 p-1 flex items-center justify-center shrink-0 shadow-sm">
              <Fingerprint className="w-5 h-5 text-rose-500 stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="font-extrabold text-xs text-slate-100 truncate">
                Install The Imposter
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                Add to home screen for fullscreen play
              </p>
            </div>
          </div>

          {/* Dismiss button */}
          <button
            type="button"
            onClick={handleDismiss}
            title="Dismiss install banner"
            className="text-slate-400 hover:text-slate-200 active:scale-90 p-1.5 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Button & iOS Instructions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleInstallClick}
            className="flex-1 py-2 px-3.5 bg-rose-600 hover:bg-rose-500 active:scale-[0.98] text-white font-bold text-xs rounded-xl border border-rose-500 shadow-md shadow-rose-900/30 flex items-center justify-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isIOS ? 'How to Install on iOS' : 'Install App'}</span>
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            className="py-2 px-3 bg-slate-800/80 hover:bg-slate-700 active:scale-[0.98] text-slate-300 font-semibold text-xs rounded-xl transition-colors"
          >
            Later
          </button>
        </div>

        {/* iOS Helper Instructions Dropdown */}
        {showIOSTip && (
          <div className="mt-1 pt-2.5 border-t border-slate-800 text-[11px] text-slate-300 space-y-1.5 animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-200 shrink-0">
                1
              </span>
              <span>
                Tap the <b className="text-slate-100">Share</b> button <Share className="w-3 h-3 inline text-blue-400 mx-0.5" /> in Safari.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-200 shrink-0">
                2
              </span>
              <span>
                Scroll down and select <b className="text-slate-100">Add to Home Screen</b> <PlusSquare className="w-3 h-3 inline text-slate-200 mx-0.5" />.
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
