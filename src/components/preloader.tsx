
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (preloaderRef.current && logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
      );

      const timer = setTimeout(() => {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => setIsVisible(false),
        });
      }, 2000); // Total preloader time

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={preloaderRef}
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-background'
      )}
    >
      <div ref={logoRef}>
        <Image
          src="https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png"
          alt="Web and App Logo"
          width={150}
          height={150}
          className="object-contain"
          style={{ height: 'auto' }}
          priority
        />
      </div>
    </div>
  );
}
