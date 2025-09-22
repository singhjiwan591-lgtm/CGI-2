
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const inquiries = [
    "Hello, I want to know about the courses you offer.",
    "What is the fee structure for the ADCA course?",
    "Can I get details about placement assistance?",
    "What are the timings for the new batches?",
    "I have a general inquiry."
];

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '918566950470';

  const getWhatsAppUrl = (message: string) => `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={cn(
          'fixed z-50 md:hidden bottom-0 left-0 right-0 p-4 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="bg-background border rounded-t-2xl shadow-lg max-h-[70vh] flex flex-col">
            <div className="p-4 border-b">
                <h3 className="font-semibold text-lg">How can we help?</h3>
                <p className="text-sm text-muted-foreground">Select an option to start a chat.</p>
            </div>
            <div className="overflow-y-auto p-4 space-y-3">
                {inquiries.map((msg, index) => (
                    <Link
                        key={index}
                        href={getWhatsAppUrl(msg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-secondary p-4 rounded-lg text-sm text-foreground hover:bg-muted"
                        onClick={() => setIsOpen(false)}
                    >
                        {msg}
                    </Link>
                ))}
            </div>
        </div>
      </div>
      
      {/* Desktop bubbles */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="relative flex items-end justify-end">
          <div 
            className={cn(
                "absolute bottom-0 right-[calc(100%+1rem)] w-64 space-y-2 transition-all duration-300 ease-in-out hidden md:block",
                isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
            )}
          >
            {inquiries.map((msg, index) => (
              <Link
                key={index}
                href={getWhatsAppUrl(msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-background border border-border shadow-md p-3 rounded-xl text-sm text-foreground hover:bg-muted transition-transform duration-200 hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
                {msg}
              </Link>
            ))}
          </div>

          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
                "p-3 h-14 w-14 text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-110 flex items-center justify-center",
                isOpen ? "bg-red-500 hover:bg-red-600" : "bg-[#25D366] hover:bg-[#1DA851]"
            )}
            aria-label={isOpen ? "Close chat inquiries" : "Open chat inquiries"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <WhatsAppIcon />}
          </Button>
        </div>
      </div>
    </>
  );
}
