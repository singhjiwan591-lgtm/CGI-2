
'use client';

import { app } from '@/lib/firebase';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { useEffect } from 'react';

// Make grecaptcha available on the window object for TypeScript
declare global {
  interface Window {
    grecaptcha: any;
  }
}

export function AppCheckInitializer() {
  useEffect(() => {
    // This effect runs only once on the client-side after the component mounts
    if (typeof window !== 'undefined') {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        console.warn("reCAPTCHA Site Key is not found in .env. App Check is not initialized.");
        return;
      }
      
      const initAppCheck = () => {
        try {
          // Initialize App Check
          initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(siteKey),
            isTokenAutoRefreshEnabled: true
          });
          console.log("Firebase App Check initialized successfully!");
        } catch (error) {
          console.error("Error initializing Firebase App Check:", error);
        }
      };

      // Poll for grecaptcha to be ready. This ensures the script is loaded.
      const interval = setInterval(() => {
        if (window.grecaptcha?.ready) {
          clearInterval(interval);
          // The grecaptcha.ready() function ensures that the reCAPTCHA API is fully loaded.
          window.grecaptcha.ready(() => {
            initAppCheck();
          });
        }
      }, 100); // Check every 100ms
    }
  }, []);

  return null; // This component does not render anything
}
