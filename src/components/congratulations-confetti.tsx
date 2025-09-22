
'use client';

import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}


export function CongratulationsConfetti() {
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Check if the welcome effect has already been shown in this session
    const hasBeenWelcomed = sessionStorage.getItem('hasBeenWelcomed');

    if (!hasBeenWelcomed) {
      // Show confetti
      setShowConfetti(true);
      sessionStorage.setItem('hasBeenWelcomed', 'true');

      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000); // 3 seconds for a "fast" animation

      return () => clearTimeout(timer);
    }
  }, []);
  
  const onConfettiComplete = (confetti: any) => {
    if (confetti) {
      confetti.reset();
    }
    setShowConfetti(false);
  }

  if (!showConfetti) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none">
       <ReactConfetti
        width={width}
        height={height}
        numberOfPieces={200}
        recycle={false}
        gravity={0.1}
        onConfettiComplete={onConfettiComplete}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto">
         <p className="text-4xl md:text-6xl font-bold font-headline text-primary [text-shadow:3px_3px_6px_rgba(0,0,0,0.3)]">
            Congratulations!
        </p>
        <p className="text-lg md:text-2xl mt-2 font-semibold text-foreground/80">
            Welcome to Global Computer Institute
        </p>
      </div>
    </div>
  );
}
