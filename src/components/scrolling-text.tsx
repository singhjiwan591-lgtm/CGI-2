
'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const texts = [
  'Web and App',
  'Learn In-Demand Skills',
  'Get Certified By Experts',
  'Start Your Tech Journey Today',
];

export function ScrollingText() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-20 sm:h-24 md:h-28 overflow-hidden">
      {texts.map((text, index) => (
        <h1
          key={index}
          className={cn(
            'font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl absolute w-full transition-transform duration-1000 ease-in-out text-center',
            {
              'transform -translate-y-full opacity-0': index < currentIndex,
              'transform translate-y-0 opacity-100': index === currentIndex,
              'transform translate-y-full opacity-0': index > currentIndex,
            }
          )}
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          {text}
        </h1>
      ))}
    </div>
  );
}
