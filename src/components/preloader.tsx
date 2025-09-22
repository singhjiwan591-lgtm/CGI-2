
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (preloaderRef.current) {
        preloaderRef.current.style.opacity = '0';
        preloaderRef.current.addEventListener('transitionend', () => setIsVisible(false));
      }
    }, 500); // Reduced preloader time

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={preloaderRef}
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500'
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
