
'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function AdmissionsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const admissionSteps = [
    {
      step: 1,
      title: 'Submit an Inquiry',
      description: 'Fill out our online inquiry form to get course details, fee structure, and a free counseling session.',
    },
    {
      step: 2,
      title: 'Attend a Demo Class',
      description: 'Experience our teaching methodology firsthand by attending a free demo class for the course of your choice.',
    },
    {
      step: 3,
      title: 'Complete Enrollment',
      description: 'Submit your completed enrollment form and required documents through our secure online portal.',
    },
    {
      step: 4,
      title: 'Basic Aptitude Test',
      description: 'A simple test to understand your current skill level. No prior coding knowledge required!',
    },
    {
      step: 5,
      title: 'Start Your Batch',
      description: 'Admission confirmation and batch details will be sent via email. Welcome to the future of tech!',
    },
  ];

  const keyDates = [
    { date: '1st of Every Month', event: 'New Batches Start for All Courses' },
    { date: 'Every Saturday', event: 'Free Career Counseling & Demo Classes' },
    { date: 'Ongoing', event: 'Enrollment Open for 2024-2025' },
    { date: 'Within 48 Hours', event: 'Receive Admission Confirmation' },
  ];

  return (
    <div ref={pageRef} className="flex flex-col items-center">
      <section className="w-full bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-3xl font-bold md:text-5xl">Admissions</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-foreground/80">
            Join Global Computer Institute. Learn about our simple enrollment process.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-2xl font-bold md:text-4xl">How to Enroll</h2>
          <p className="text-center mx-auto mt-4 max-w-2xl text-foreground/80">
            We have a straightforward admissions process. Follow these steps to begin your journey at Global Computer Institute.
          </p>
          <div className="relative mt-12">
            <div className="absolute left-1/2 top-4 hidden h-[calc(100%-2rem)] w-0.5 -translate-x-1/2 bg-border md:block"></div>
            <div className="space-y-10">
              {admissionSteps.map((item, index) => (
                <div key={item.step} className="relative flex flex-col items-center gap-6 md:flex-row md:items-stretch md:justify-center">
                  <div className={`z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl flex-shrink-0`}>
                    {item.step}
                  </div>
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:text-right'} `}>
                     <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground/80">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-secondary py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-2xl font-bold md:text-4xl">Key Dates & Deadlines</h2>
          <div className="mx-auto mt-10 max-w-2xl">
            <ul className="space-y-4">
              {keyDates.map((item) => (
                <li key={item.event} className="flex items-center rounded-lg bg-background p-4 shadow-md">
                  <CheckCircle2 className={`h-6 w-6 text-primary mr-4`} />
                  <div>
                    <p className="font-semibold">{item.date}</p>
                    <p className="text-foreground/80">{item.event}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-2xl font-bold md:text-3xl">Begin Your Application</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-foreground/80">
                Ready to take the first step? Our online portal makes it easy to get started.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/register">
                Enroll Online Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
