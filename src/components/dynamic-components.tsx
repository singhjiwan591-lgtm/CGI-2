
'use client';

import dynamic from 'next/dynamic';

export const DynamicDiscountPopup = dynamic(() => 
  import('@/components/discount-popup').then(mod => mod.DiscountPopup), 
  { ssr: false }
);
