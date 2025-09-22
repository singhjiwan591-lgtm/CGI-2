
'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
  CardHeader
} from '@/components/ui/card';
import {
  FileText,
  Book,
  Keyboard,
  Globe,
  HardDrive,
  Calculator,
  Codepen,
} from 'lucide-react';

const courseCards = [
  {
    title: 'ADCA',
    description: 'Advanced Diploma in Computer Applications',
    icon: <FileText className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/C0W2VfT/1757947113101.png',
    dataAiHint: 'advanced diploma computer',
  },
  {
    title: 'CCA',
    description: 'Certificate in Computer Applications',
    icon: <FileText className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/HfQqCY6P/IMG-20250803-WA0011.jpg',
    dataAiHint: 'certificate computer',
  },
  {
    title: 'DCA',
    description: 'Diploma in Computer Applications',
    icon: <FileText className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/tPXj64KV/IMG-20250803-WA0007.jpg',
    dataAiHint: 'computer diploma',
  },
  {
    title: 'DIFA',
    description: 'Diploma in Financial Accounting',
    icon: <Calculator className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/67kgqFp4/IMG-20250803-WA0009-1.jpg',
    dataAiHint: 'financial accounting',
  },
   {
    title: 'Basic',
    description: 'Fundamentals of computer operations.',
    icon: <Book className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/6KM1WwR/1757604128659.png',
    dataAiHint: 'computer basics',
  },
  {
    title: 'Accounts',
    description: 'Learn financial accounting software.',
    icon: <Calculator className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/ymSwrtxx/IMG-20250803-WA0005.jpg',
    dataAiHint: 'accounting calculator',
  },
   {
    title: 'Typing (Eng/Pbi)',
    description: 'Master English & Punjabi typing skills.',
    icon: <Keyboard className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/3Yr8MjcT/touch-typing-keyboard.webp',
    dataAiHint: 'typing keyboard',
  },
   {
    title: 'HTML',
    description: 'Learn the language of the web.',
    icon: <Codepen className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/rJp1PDZ/IMG-20250803-WA0004.jpg',
    dataAiHint: 'html code',
  },
    {
    title: 'Internet',
    description: 'Explore the world of the internet.',
    icon: <Globe className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/LXfSf8xs/IMG-20250803-WA0006.jpg',
    dataAiHint: 'internet globe',
  },
  {
    title: 'Hardware & Software',
    description: 'Understand computer components.',
    icon: <HardDrive className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/5hdDZj7D/IMG-20250803-WA0008.jpg',
    dataAiHint: 'computer hardware',
  },
];

export default function AcademicsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={pageRef} className="flex flex-col items-center">
      <section className="w-full bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-3xl font-bold md:text-5xl">Our Courses</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-foreground/80">
            Explore our comprehensive courses designed to make you a job-ready tech professional. Choose from a wide range of programs designed to get you job-ready.
          </p>
        </div>
      </section>

      <section id="courses" className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {courseCards.map((card) => (
              <Link key={card.title} href={`/register?course=${encodeURIComponent(card.title)}`} className="block group">
                <Card 
                  className="relative overflow-hidden flex flex-col items-center justify-center p-4 md:p-6 text-center aspect-square transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl"
                >
                  <CardHeader className="p-0 items-center">
                    <div className="text-primary">{card.icon}</div>
                    <CardTitle className="text-base md:text-lg font-bold mt-3">{card.title}</CardTitle>
                  </CardHeader>
                   <CardContent className="p-0 mt-1">
                    <CardDescription className="text-xs sm:text-sm">{card.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
           </div>
        </div>
      </section>
    </div>
  );
}
