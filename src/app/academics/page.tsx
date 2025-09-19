
'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePageAnimations } from '@/hooks/usePageAnimations';
import {
  Card,
  CardDescription,
  CardTitle,
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
    color: 'from-blue-500 to-blue-700',
  },
  {
    title: 'CCA',
    description: 'Certificate in Computer Applications',
    icon: <FileText className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/HfQqCY6P/IMG-20250803-WA0011.jpg',
    dataAiHint: 'certificate computer',
    color: 'from-fuchsia-500 to-fuchsia-700',
  },
  {
    title: 'DCA',
    description: 'Diploma in Computer Applications',
    icon: <FileText className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/tPXj64KV/IMG-20250803-WA0007.jpg',
    dataAiHint: 'computer diploma',
    color: 'from-orange-500 to-orange-700',
  },
  {
    title: 'DIFA',
    description: 'Diploma in Financial Accounting',
    icon: <Calculator className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/67kgqFp4/IMG-20250803-WA0009-1.jpg',
    dataAiHint: 'financial accounting',
    color: 'from-green-500 to-green-700',
  },
   {
    title: 'Basic',
    description: 'Fundamentals of computer operations.',
    icon: <Book className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/6KM1WwR/1757604128659.png',
    dataAiHint: 'computer basics',
    color: 'from-sky-500 to-sky-700',
  },
  {
    title: 'Accounts',
    description: 'Learn financial accounting software.',
    icon: <Calculator className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/ymSwrtxx/IMG-20250803-WA0005.jpg',
    dataAiHint: 'accounting calculator',
    color: 'from-red-500 to-red-700',
  },
   {
    title: 'Typing (Eng/Pbi)',
    description: 'Master English & Punjabi typing skills.',
    icon: <Keyboard className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/3Yr8MjcT/touch-typing-keyboard.webp',
    dataAiHint: 'typing keyboard',
    color: 'from-yellow-500 to-yellow-700',
  },
   {
    title: 'HTML',
    description: 'Learn the language of the web.',
    icon: <Codepen className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/rJp1PDZ/IMG-20250803-WA0004.jpg',
    dataAiHint: 'html code',
    color: 'from-indigo-500 to-indigo-700',
  },
    {
    title: 'Internet',
    description: 'Explore the world of the internet.',
    icon: <Globe className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/LXfSf8xs/IMG-20250803-WA0006.jpg',
    dataAiHint: 'internet globe',
    color: 'from-pink-500 to-pink-700',
  },
  {
    title: 'Hardware & Software',
    description: 'Understand computer components.',
    icon: <HardDrive className="h-8 w-8" />,
    imageUrl: 'https://i.ibb.co/5hdDZj7D/IMG-20250803-WA0008.jpg',
    dataAiHint: 'computer hardware',
    color: 'from-teal-500 to-teal-700',
  },
];

export default function AcademicsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  usePageAnimations(pageRef);

  return (
    <div ref={pageRef} className="flex flex-col items-center">
      <section data-animate="fade-in" className="w-full bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-3xl font-bold md:text-5xl">Our Courses</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-foreground/80">
            Explore our comprehensive courses designed to make you a job-ready tech professional. Choose from a wide range of programs designed to get you job-ready.
          </p>
        </div>
      </section>

      <section id="courses" data-animate="fade-in-up" className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {courseCards.map((card) => (
              <Link key={card.title} href={`/register?course=${encodeURIComponent(card.title)}`} className="block group [perspective:1000px]">
                <Card 
                  data-animate="stagger-item"
                  className={`text-white relative overflow-hidden ${card.imageUrl ? '' : `bg-gradient-to-br ${card.color}`} transition-transform duration-500 transform-style-3d group-hover:[transform:rotateY(-10deg)_scale(1.05)] group-hover:shadow-2xl hover:shadow-primary/30 flex flex-col items-center justify-center p-4 md:p-6 text-center aspect-square`}
                >
                  {card.imageUrl ? (
                    <>
                      <Image src={card.imageUrl} alt={card.title} fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw" className="z-0 transition-transform duration-300 group-hover:scale-110 object-cover" data-ai-hint={card.dataAiHint} />
                      <div className="absolute inset-0 bg-black/50 z-10"></div>
                    </>
                  ) : null}
                  <div className="z-20 flex flex-col items-center justify-center transform-style-3d group-hover:[transform:translateZ(40px)] transition-transform duration-500">
                    <div className="mb-3">{card.icon}</div>
                    <CardTitle className="text-base md:text-lg font-bold">{card.title}</CardTitle>
                    <CardDescription className="text-white/80 text-xs hidden sm:block mt-1">{card.description}</CardDescription>
                  </div>
                </Card>
              </Link>
            ))}
           </div>
        </div>
      </section>
    </div>
  );
}
