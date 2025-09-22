
'use client';

import dynamic from 'next/dynamic';

// This file is kept for potential future use of dynamic components.
// The discount popup has been removed to fix a build error.

export const DynamicCongratulationsConfetti = dynamic(
  () => import('./congratulations-confetti').then(mod => mod.CongratulationsConfetti),
  { ssr: false }
);
