
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-1000',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="animate-pulse">
        <Image
          src="https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png"
          alt="Web an d App Logo"
          width={150}
          height={150}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
