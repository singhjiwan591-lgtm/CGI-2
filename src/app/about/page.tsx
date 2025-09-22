
'use client';

import React, { useRef } from 'react';
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

const timeline = [
  { year: 2010, event: 'Institute Founded', description: 'Global Computer Institute began with a mission to bridge the tech skills gap.' },
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
    name: 'Jeevan Singh',
    position: 'Web Developer',
    image: 'https://i.ibb.co/NnBnqdS/Jiwan.png',
    dataAiHint: 'man developer',
  },
  {
    name: 'Jeevan Singh',
    position: 'Mobile Application Development',
    image: 'https://i.ibb.co/Pv1xJFLX/Whats-App-Image-2025-06-29-at-1-03-58-PM.jpg',
    dataAiHint: 'man developer',
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

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={pageRef} className="flex flex-col items-center">
      <section className="w-full bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-3xl font-bold md:text-5xl [text-shadow:2px_2px_4px_rgba(0,0,0,0.1)] dark:[text-shadow:2px_2px_6px_rgba(0,0,0,0.4)]">About Global Computer Institute</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-foreground/80 md:text-lg">
            Welcome to Global Computer Institute, a premier computer education institute where we transform passion for technology into professional excellence. We are committed to providing top-quality, practical training that empowers our students to thrive in the dynamic digital landscape. Our mission is to make tech education accessible, fostering a community of innovators and problem-solvers who will shape the future.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="order-2 md:order-1">
              <h2 className="font-headline text-2xl font-bold md:text-3xl">Our Mission</h2>
              <p className="mt-4 text-foreground/80">
                Our mission is to democratize technology education by bridging the gap between academic learning and the demands of the tech industry. We provide a hands-on, inclusive learning environment where students from all backgrounds can develop the skills, confidence, and real-world experience needed to excel. We are dedicated to building a community of forward-thinking professionals who will lead the next wave of technological innovation and solve real-world challenges.
              </p>
            </div>
            <div className="order-1 md:order-2 group [perspective:1000px]">
              <Image
                src="https://i.ibb.co/jv8gNqNH/Compress-JPEG-Online-img-800x600.jpg"
                alt="Modern computer lab with students learning"
                width={800}
                height={600}
                data-ai-hint="modern computer lab"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-secondary py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-2xl font-bold md:text-4xl">Our Journey</h2>
          <div className="relative mt-10">
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border md:block"></div>
            {timeline.map((item, index) => (
              <div key={index} className="relative mb-8 flex w-full items-center md:justify-between md:odd:flex-row-reverse group [perspective:1000px]">
                <div className="hidden md:block md:w-5/12"></div>
                <div className={`absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground md:left-1/2 md:-translate-x-1/2`}>
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="w-full pl-12 md:w-5/12 md:pl-0">
                  <Card className="p-4 md:p-6">
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

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-2xl font-bold md:text-4xl">Meet Our Leadership</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {teamMembers.map((member, index) => (
              <div key={`${member.name}-${index}`} className="group [perspective:1000px]">
                <Card className="text-center">
                  <CardContent className="p-4 md:p-6">
                    <Avatar className="w-24 h-24 md:w-32 md:h-32 mx-auto ring-2 ring-primary/20 p-1">
                      <AvatarImage src={member.image} alt={`Photo of ${member.name}`} data-ai-hint={member.dataAiHint} />
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-secondary py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-2xl font-bold md:text-4xl">Why Join Us?</h2>
          <div className="mx-auto mt-10 max-w-4xl">
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start">
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
