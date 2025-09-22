
'use client';

import { useState, useEffect } from 'react';
import Confetti from 'react-dom-confetti';
import { useWindowSize } from '@/hooks/useWindowSize';
import React from 'react';

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

function ConfettiWrapper() {
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    const hasBeenWelcomed = sessionStorage.getItem('hasBeenWelcomed');

    if (!hasBeenWelcomed) {
      const welcomeTimer = setTimeout(() => {
        setShowConfetti(true);
        sessionStorage.setItem('hasBeenWelcomed', 'true');

        const confettiTimer = setTimeout(() => {
          setShowConfetti(false);
        }, 3000); 

        return () => clearTimeout(confettiTimer);
      }, 500);

      return () => clearTimeout(welcomeTimer);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center">
       <Confetti active={showConfetti} config={confettiConfig} />
       {showConfetti && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto animate-in fade-in-0 duration-500">
             <p className="text-4xl md:text-6xl font-bold font-headline text-primary [text-shadow:3px_3px_6px_rgba(0,0,0,0.3)]">
                Congratulations!
            </p>
            <p className="text-lg md:text-2xl mt-2 font-semibold text-foreground/80">
                Welcome to Global Computer Institute
            </p>
          </div>
       )}
    </div>
  );
}

// A new component that ensures it's only rendered on the client
export function CongratulationsConfetti() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <ConfettiWrapper /> : null;
}
