
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Tag, Clock } from 'lucide-react';
import Link from 'next/link';

// Helper function to get data from localStorage safely
const getLocalStorageItem = (key: string) => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(key);
};

// Helper function to set data in localStorage safely
const setLocalStorageItem = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

// Helper to remove item from localStorage safely
const removeLocalStorageItem = (key: string) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
}

export function DiscountPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const checkDiscountStatus = () => {
      const discountDataStr = getLocalStorageItem('discountData');
      const discounts = [30, 40, 50];
      let expiryTime: number;

      if (discountDataStr) {
        const discountData = JSON.parse(discountDataStr);
        expiryTime = discountData.expiryTime;
        const now = new Date().getTime();

        if (expiryTime > now) {
          // Offer is still valid, use it
          setDiscount(discountData.discount);
          setIsOpen(true);
        } else {
          // Offer expired, generate a new one
          removeLocalStorageItem('discountData');
          const randomDiscount = discounts[Math.floor(Math.random() * discounts.length)];
          const newExpiryTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours
          setLocalStorageItem('discountData', JSON.stringify({ discount: randomDiscount, expiryTime: newExpiryTime }));
          setDiscount(randomDiscount);
          expiryTime = newExpiryTime;
          setIsOpen(true);
        }
      } else {
        // No offer exists, generate a new one
        const randomDiscount = discounts[Math.floor(Math.random() * discounts.length)];
        const newExpiryTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours
        setLocalStorageItem('discountData', JSON.stringify({ discount: randomDiscount, expiryTime: newExpiryTime }));
        setDiscount(randomDiscount);
        expiryTime = newExpiryTime;
        setIsOpen(true);
      }

      // Countdown timer logic
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const remaining = expiryTime - now;
        if (remaining <= 0) {
          clearInterval(interval);
          setIsOpen(false);
        } else {
          setTimeLeft({
            hours: Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((remaining % (1000 * 60)) / 1000),
          });
        }
      }, 1000);

      return () => clearInterval(interval);
    };
    
    // Show popup after a 10-second delay for first-time visitors
    const hasSeenPopup = sessionStorage.getItem('hasSeenDiscountPopup');
    if (!hasSeenPopup) {
        const timer = setTimeout(() => {
            checkDiscountStatus();
            sessionStorage.setItem('hasSeenDiscountPopup', 'true');
        }, 10000); // 10-second delay

        return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center">
            <Tag className="h-16 w-16 text-primary" />
          </div>
          <DialogTitle className="text-center text-3xl font-bold mt-4">Limited Time Offer!</DialogTitle>
          <DialogDescription className="text-center text-lg">
            Get an exclusive discount on your enrollment.
          </DialogDescription>
        </DialogHeader>
        <div className="my-6 text-center">
          <p className="text-5xl font-bold text-primary">{discount}% OFF</p>
          <p className="text-muted-foreground mt-2">on all courses</p>
        </div>
        <div className="flex items-center justify-center gap-2 text-red-500 font-medium bg-red-500/10 p-3 rounded-lg">
            <Clock className="h-5 w-5" />
            <span>Offer expires in: </span>
            <span className="font-mono tracking-widest">
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
            </span>
        </div>
        <DialogFooter className="mt-4">
          <Button asChild className="w-full" size="lg" onClick={() => setIsOpen(false)}>
            <Link href="/register">Claim My Discount</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
