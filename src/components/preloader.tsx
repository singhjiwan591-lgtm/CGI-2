
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Directly hide the component once loading is complete.
      setIsVisible(false);
    };

    // Check if the document is already loaded
    if (document.readyState === 'complete') {
      // Use a small timeout to prevent flash of content
      setTimeout(handleLoad, 100);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500',
      )}
    >
      <div>
        <Image
          src="https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png"
          alt="Web and App Logo"
          width={150}
          height={150}
          className="object-contain animate-pulse"
          style={{ height: 'auto' }}
          priority
        />
      </div>
    </div>
  );
}
