
'use client';

import { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

const ATTEMPTS_LIMIT = 3;
const STORAGE_KEY = 'tamperAttempts';

export function TamperProtector() {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    const getAttempts = (): number => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? parseInt(stored, 10) : 0;
      } catch (error) {
        return 0;
      }
    };

    const incrementAttempts = (): number => {
      const currentAttempts = getAttempts();
      const newAttempts = currentAttempts + 1;
      try {
        localStorage.setItem(STORAGE_KEY, newAttempts.toString());
      } catch (error) {
        console.error("Could not save tamper attempts to localStorage.");
      }
      return newAttempts;
    };
    
    // Initial check on load
    if (getAttempts() >= ATTEMPTS_LIMIT) {
        setIsBlocked(true);
    }

    const handleDetection = (e?: Event) => {
      e?.preventDefault();
      const newCount = incrementAttempts();

      if (newCount >= ATTEMPTS_LIMIT) {
        setIsBlocked(true);
      }
      
      // Optionally, show a warning on each attempt before blocking
      if(newCount < ATTEMPTS_LIMIT) {
         console.warn(`Tampering detected. Attempt ${newCount} of ${ATTEMPTS_LIMIT}. Further attempts will block access.`);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for common dev tools shortcuts
      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.metaKey && e.altKey && (e.key === 'i' || e.key === 'j' || e.key === 'c')) || // macOS
        e.key === 'F12'
      ) {
        handleDetection(e);
      }
    };

    document.addEventListener('contextmenu', handleDetection);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleDetection);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isBlocked) {
    return (
      <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 p-4 text-center">
        <ShieldAlert className="h-20 w-20 text-red-500 mb-6" />
        <h1 className="text-3xl font-bold text-white mb-2 font-headline">Access Denied</h1>
        <p className="text-lg text-gray-300 max-w-md">
          Due to multiple attempts to tamper with the website's code, your access has been temporarily blocked for security reasons.
        </p>
      </div>
    );
  }

  return null;
}
