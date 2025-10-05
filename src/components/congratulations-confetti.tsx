
'use client';

import React, { useState, useEffect } from 'react';
import Confetti from 'react-dom-confetti';

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 5000, // Increased duration for better effect
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

// This component ensures it's only rendered on the client
export function CongratulationsConfetti() {
  const [isClient, setIsClient] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    const handleShowConfetti = () => {
      setShowConfetti(true);
      const confettiTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // Match duration
      return () => clearTimeout(confettiTimer);
    };

    window.addEventListener('show-confetti', handleShowConfetti);

    return () => {
      window.removeEventListener('show-confetti', handleShowConfetti);
    };
  }, []);


  if (!isClient) {
      return null;
  }

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
       <Confetti active={showConfetti} config={confettiConfig} />
       {showConfetti && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto">
             <p className="text-4xl md:text-6xl font-bold font-headline text-primary [text-shadow:3px_3px_6px_rgba(0,0,0,0.3)]">
                Congratulations!
            </p>
            <p className="text-lg md:text-2xl mt-2 font-semibold text-foreground/80">
                You have been registered successfully!
            </p>
          </div>
       )}
    </div>
  );
}

    