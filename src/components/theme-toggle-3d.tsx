
'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

export function ThemeToggle3D() {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!isMounted) {
    return (
      <div className="w-16 h-8 rounded-full bg-muted flex items-center justify-center">
        <div className="w-6 h-6 bg-background rounded-full"></div>
      </div>
    );
  }

  return (
    <div
      className="relative w-16 h-8 rounded-full p-1 flex items-center cursor-pointer bg-muted"
      onClick={handleToggle}
      style={{
        transition: 'background-color 0.3s ease',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <div
        className={cn(
          'absolute w-6 h-6 rounded-full bg-background shadow-md flex items-center justify-center transition-transform duration-300 ease-in-out',
          theme === 'light' ? 'translate-x-0' : 'translate-x-8'
        )}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute w-full h-full"
          style={{
            transition: 'transform 0.3s ease-in-out',
            transform: theme === 'light' ? 'rotateY(0deg)' : 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <Sun className="h-4 w-4 text-yellow-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div
          className="absolute w-full h-full"
          style={{
            transition: 'transform 0.3s ease-in-out',
            transform: theme === 'light' ? 'rotateY(180deg)' : 'rotateY(0deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <Moon className="h-4 w-4 text-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}
