
'use client';

import { app } from '@/lib/firebase';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { useEffect } from 'react';

// Make grecaptcha available on the window object for TypeScript
declare global {
  interface Window {
    grecaptcha: any;
    FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean | string;
  }
}

export function AppCheckInitializer() {
  useEffect(() => {
    // This effect runs only once on the client-side after the component mounts
    if (typeof window !== 'undefined') {
      
      // IMPORTANT: Set the debug token to true to get a token printed in the console.
      // This MUST be set before initializeAppCheck() is called.
      // This is useful for development and debugging.
      // Remember to register this token in the Firebase console.
      if (process.env.NODE_ENV !== 'production') {
        self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      }
      
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        console.warn("reCAPTCHA Site Key is not found. App Check will not be initialized in production.");
        return;
      }
      
      try {
        // Initialize App Check
        initializeAppCheck(app, {
          provider: new ReCaptchaV3Provider(siteKey),
          isTokenAutoRefreshEnabled: true
        });
        console.log("Firebase App Check initialized successfully.");
      } catch (error) {
        console.error("Error initializing Firebase App Check:", error);
      }
    }
  }, []);

  return null; // This component does not render anything
}
