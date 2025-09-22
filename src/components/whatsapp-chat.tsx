
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
    <div className="fixed bottom-6 right-6 z-50">
        {/* Inquiry Bubbles */}
        <div 
            className={cn(
                "flex flex-col items-end space-y-2 mb-2 transition-all duration-300 ease-in-out",
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            )}
        >
            {inquiries.map((msg, index) => (
                <Link
                    key={index}
                    href={getWhatsAppUrl(msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-background border border-border shadow-md p-3 rounded-xl max-w-xs text-sm text-foreground hover:bg-muted transition-transform duration-200 hover:scale-105"
                    onClick={() => setIsOpen(false)}
                >
                    {msg}
                </Link>
            ))}
        </div>

        {/* Main Floating Action Button */}
        <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
                "p-3 text-white rounded-full shadow-lg transition-transform duration-300 hover:scale-110 flex items-center justify-center",
                isOpen ? "bg-red-500 hover:bg-red-600" : "bg-[#25D366] hover:bg-[#1DA851]"
            )}
            aria-label={isOpen ? "Close chat inquiries" : "Open chat inquiries"}
        >
            {isOpen ? <X className="h-6 w-6" /> : <WhatsAppIcon />}
        </button>
    </div>
  );
}
