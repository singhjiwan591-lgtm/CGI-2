
'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Facebook, Linkedin, Twitter } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePageAnimations } from '@/hooks/usePageAnimations';

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  usePageAnimations(pageRef);

  const timeline = [
    { year: 2010, event: 'Institute Founded', description: 'Web an d App began with a mission to bridge the tech skills gap.' },
    { year: 2015, event: 'First 1000 Graduates', description: 'We proudly celebrated our first thousand successful graduates entering the tech industry.' },
    { year: 2019, event: 'New Advanced AI/ML Course', description: 'Launched our state-of-the-art curriculum in Artificial Intelligence and Machine Learning.' },
    { year: 2023, event: 'Top Placement Award', description: 'Recognized for achieving the highest placement rate in the region.' },
  ];

  const teamMembers = [
    {
      name: 'Mr. Jaswinder Singh',
      position: 'Founder & Director',
      image: 'https://i.ibb.co/MDVW5J4Z/js.jpg',
      dataAiHint: 'institute owner',
    },
    {
      name: 'Mr. Balvinder Singh',
      position: 'Co-Founder & Director',
      image: 'https://i.ibb.co/cK1V41kk/Compress-JPEG-Online-img-250x400.jpg',
      dataAiHint: 'institute owner',
    },
    {
      name: 'Ms. Sunita Patel',
      position: 'Head of Academics',
      image: 'https://placehold.co/300x300.png',
      dataAiHint: 'woman teacher',
    },
    {
      name: 'Mr. Amit Singh',
      position: 'Placement Officer',
      image: 'https://placehold.co/300x300.png',
      dataAiHint: 'man corporate',
    },
  ];

  const benefits = [
    'Industry-Relevant Curriculum',
    'Certified & Expert Instructors',
    '100% Placement Assistance',
    'Flexible Learning Schedules',
    'Focus on Practical Skills',
    'Modern Computer Labs',
  ];

  return (
    <div ref={pageRef} className="flex flex-col items-center">
      <section data-animate="fade-in" className="w-full bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-3xl font-bold md:text-5xl">About Web an d App</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-foreground/80 md:text-lg">
            Welcome to Web an d App, where we turn passion for technology into professional expertise. We are a leading computer education institute dedicated to providing high-quality, practical training that empowers our students to succeed in the fast-paced digital world.
          </p>
        </div>
      </section>

      <section data-animate="fade-in-up" className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="order-2 md:order-1">
              <h2 className="font-headline text-2xl font-bold md:text-3xl">Our Mission</h2>
              <p className="mt-4 text-foreground/80">
                Our mission is to democratize tech education and bridge the gap between academic knowledge and industry demands. We are committed to fostering an inclusive, hands-on learning environment where students from all backgrounds can acquire the skills, confidence, and real-world experience needed to thrive. We aim to build a community of innovators and problem-solvers who will lead the next wave of technological advancement.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="https://placehold.co/600x400.png"
                data-ai-hint="modern computer lab"
                alt="Modern computer lab"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section data-animate="fade-in-up" className="w-full bg-secondary py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-2xl font-bold md:text-4xl">Our Journey</h2>
          <div className="relative mt-10">
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border md:block"></div>
            {timeline.map((item, index) => (
              <div key={index} data-animate="timeline-item" className="relative mb-8 flex w-full items-center md:justify-between md:odd:flex-row-reverse">
                <div className="hidden md:block md:w-5/12"></div>
                <div className={`absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground md:left-1/2 md:-translate-x-1/2`}>
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="w-full pl-12 md:w-5/12 md:pl-0">
                  <Card className="p-4 md:p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                    <p className={`font-bold text-primary text-sm md:text-base`}>{item.year}</p>
                    <h3 className="font-headline text-lg font-bold mt-1 md:text-xl">{item.event}</h3>
                    <p className="mt-2 text-foreground/70 text-sm md:text-base">{item.description}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-animate="fade-in-up" className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-2xl font-bold md:text-4xl">Meet Our Leadership</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} data-animate="stagger-item" className="text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <CardContent className="p-4 md:p-6">
                  <Avatar className="w-24 h-24 md:w-32 md:h-32 mx-auto">
                    <AvatarImage src={member.image} data-ai-hint={member.dataAiHint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-headline text-xl font-bold md:text-2xl">{member.name}</h3>
                  <p className={`text-primary`}>{member.position}</p>
                  <div className="mt-4 flex justify-center space-x-4">
                    <Link href="#"><Twitter className="h-5 w-5 text-foreground/60 hover:text-primary" /></Link>
                    <Link href="#"><Linkedin className="h-5 w-5 text-foreground/60 hover:text-primary" /></Link>
                    <Link href="#"><Facebook className="h-5 w-5 text-foreground/60 hover:text-primary" /></Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section data-animate="fade-in-up" className="w-full bg-secondary py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-2xl font-bold md:text-4xl">Why Join Us?</h2>
          <div className="mx-auto mt-10 max-w-4xl">
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} data-animate="stagger-item-2" className="flex items-start">
                  <CheckCircle2 className={`h-5 w-5 md:h-6 md:w-6 text-primary mr-3 mt-1 flex-shrink-0`} />
                  <p className="text-base md:text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
