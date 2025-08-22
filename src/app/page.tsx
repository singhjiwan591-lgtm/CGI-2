
'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Code,
  Briefcase,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { DynamicScrollingText } from '@/components/dynamic-components';
import { usePageAnimations } from '@/hooks/usePageAnimations';
import { gsap } from 'gsap';

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const bgLogoRef = useRef<HTMLImageElement>(null);
  usePageAnimations(pageRef);

  useEffect(() => {
    if (bgLogoRef.current) {
      gsap.set(bgLogoRef.current, { transformPerspective: 1000 });
      gsap.to(bgLogoRef.current, {
        rotationY: 360,
        duration: 45,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  const features = [
    {
      icon: <Code className="h-10 w-10 text-primary" />,
      title: 'Expert Instructors',
      description:
        'Learn from industry professionals with years of real-world experience.',
    },
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: 'Hands-On Projects',
      description:
        'Build a portfolio of practical projects that showcase your skills to employers.',
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: 'Career Support',
      description:
        'Get placement assistance, resume workshops, and interview preparation.',
    },
  ];

  const testimonials = [
    {
      name: 'Jeevan Singh',
      title: 'Software Developer, TechNova',
      avatar: 'https://i.ibb.co/NnBnqdS/Jiwan.png',
      dataAiHint: 'man developer',
      quote:
        'Web and App provided the perfect launchpad for my career. The hands-on approach and expert faculty are unmatched. Highly recommended!',
    },
    {
      name: 'Priya Kaur',
      title: 'Alumna, Class of 2023',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'woman programmer',
      quote:
        'The skills I gained here were directly applicable to my job from day one. The career support team was fantastic in helping me land my first role.',
    },
    {
      name: 'Amit Sharma',
      title: 'UI/UX Designer',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'man designer',
      quote:
        'A great learning environment with a focus on practical skills. The instructors are always ready to help and the community is very supportive.',
    },
  ];
  
  return (
    <div ref={pageRef} className="flex flex-col items-center">
       <section data-animate="fade-in" className="relative w-full py-20 md:py-32 overflow-hidden">
         <div className="container mx-auto px-4 text-center relative z-10">
            <DynamicScrollingText />
            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80 md:text-xl">
              Master the most in-demand tech skills with our expert-led courses. Explore our programs and find the perfect path for you.
            </p>
             <div className="mt-8 flex justify-center gap-4">
               <Button asChild size="lg" className="transform transition-transform hover:scale-105">
                  <Link href="/academics">
                    Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                 <Button asChild size="lg" variant="outline" className="transform transition-transform hover:scale-105">
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
            </div>
          </div>
          <div
            className="absolute inset-0 z-0 flex items-center justify-center opacity-5"
          >
            <Image
              ref={bgLogoRef}
              src="https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png"
              alt="Background Logo"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </div>
      </section>

      <section id="introduction" data-animate="fade-in-up" className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="order-2 md:order-1">
              <h2 className="font-headline text-2xl font-bold md:text-4xl">
                Shape Your Future in Tech
              </h2>
              <p className="mt-4 text-base text-foreground/80 md:text-lg">
                At Web and App, we are dedicated to providing top-tier education in the latest technologies. Our curriculum is designed by industry experts to equip you with the practical skills and theoretical knowledge needed to excel in the fast-paced world of technology. Join us to turn your passion for computing into a rewarding career.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="https://i.ibb.co/4wy0PXmb/Compress-JPEG-Online-img-800x600.jpg"
                data-ai-hint="students coding"
                alt="Students learning to code"
                width={800}
                height={600}
                style={{ height: 'auto', width: '100%' }}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" data-animate="fade-in-up" className="w-full py-12 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-2xl font-bold md:text-4xl">
              Why Choose Us?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">
              We provide the tools and support you need to succeed in the tech industry.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {features.map((feature) => (
              <Card key={feature.title} data-animate="stagger-item-2" className="text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-card">
                <CardHeader>
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4 font-headline text-xl md:text-2xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" data-animate="fade-in-up" className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-2xl font-bold md:text-4xl">
              Success Stories from Our Alumni
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">
              Hear what our graduates have to say about their journey with us.
            </p>
          </div>
          <Carousel
            opts={{ align: 'start', loop: true }}
            className="mx-auto mt-10 w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="transform transition-transform duration-300 hover:scale-[1.03] bg-secondary/80">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <p className="text-base italic text-foreground/90 md:text-lg">
                          "{testimonial.quote}"
                        </p>
                        <div className="mt-6 flex items-center">
                          <Avatar>
                            <AvatarImage
                              src={testimonial.avatar}
                              data-ai-hint={testimonial.dataAiHint}
                            />
                            <AvatarFallback>
                              {testimonial.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-4 text-left">
                            <div className="font-bold">{testimonial.name}</div>
                            <div className="text-sm text-foreground/70">
                              {testimonial.title}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>

      <section id="logo-card" data-animate="fade-in-up" className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h2 className="font-headline text-2xl font-bold md-text-4xl text-center mb-8">
            Our Identity
          </h2>
          <Card className="w-full max-w-sm p-8 bg-card transform transition-transform duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 flex justify-center items-center">
            <Image
              src="https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png"
              alt="Web and App Logo"
              width={200}
              height={200}
              className="object-contain"
            />
          </Card>
        </div>
      </section>
    </div>
  );
}
