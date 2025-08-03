
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Code,
  Briefcase,
  Users,
  Codepen,
  Database,
  Layers,
  Palette,
  CloudCog,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
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

export default function Home() {
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
      name: 'Priya Sharma',
      title: 'Software Developer, TechNova',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'woman developer',
      quote:
        'Global Computer Institute provided the perfect launchpad for my career. The hands-on approach and expert faculty are unmatched. Highly recommended!',
    },
    {
      name: 'Rohan Verma',
      title: 'Alumnus, Class of 2022',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'man programmer',
      quote:
        'The skills I gained here were directly applicable to my job from day one. The career support team was fantastic in helping me land my first role.',
    },
    {
      name: 'Anjali Singh',
      title: 'UI/UX Designer',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'woman designer',
      quote:
        'A great learning environment with a focus on practical skills. The instructors are always ready to help and the community is very supportive.',
    },
  ];
  
  const courseCards = [
    {
      title: 'Web Development',
      description: 'Master front-end and back-end technologies.',
      icon: <Codepen className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-700',
    },
    {
      title: 'Data Science',
      description: 'Unlock insights from data with Python & ML.',
      icon: <Database className="h-8 w-8" />,
      color: 'from-fuchsia-500 to-fuchsia-700',
    },
    {
      title: 'UI/UX Design',
      description: 'Create beautiful and user-friendly interfaces.',
      icon: <Layers className="h-8 w-8" />,
      color: 'from-orange-500 to-orange-700',
    },
    {
      title: 'Graphic Design',
      description: 'Bring your creative visions to life visually.',
      icon: <Palette className="h-8 w-8" />,
      color: 'from-green-500 to-green-700',
    },
     {
      title: 'Cloud Computing',
      description: 'Learn AWS, Azure, and Google Cloud platforms.',
      icon: <CloudCog className="h-8 w-8" />,
      color: 'from-sky-500 to-sky-700',
    },
    {
      title: 'Cyber Security',
      description: 'Protect systems from digital threats & attacks.',
      icon: <ShieldCheck className="h-8 w-8" />,
      color: 'from-red-500 to-red-700',
    },
  ];

  return (
    <div className="flex flex-col items-center">
       <section className="w-full py-16 md:py-24">
         <div className="container mx-auto px-4 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Launch Your Career in Technology
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80 md:text-xl">
              Master the most in-demand tech skills with our expert-led courses. Explore our programs and find the perfect path for you.
            </p>
          </div>

        <div className="container mx-auto px-4 mt-12">
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {courseCards.map((card) => (
              <Card 
                key={card.title} 
                className={`text-white bg-gradient-to-br ${card.color} transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50 flex flex-col items-center justify-center p-4 md:p-6 text-center aspect-square`}
              >
                <div className="mb-3">{card.icon}</div>
                <CardTitle className="text-base md:text-lg font-bold">{card.title}</CardTitle>
                <CardDescription className="text-white/80 text-xs hidden sm:block mt-1">{card.description}</CardDescription>
              </Card>
            ))}
           </div>
        </div>
        <div className="mt-12 text-center">
            <Button asChild size="lg">
                <Link href="/academics">
                Explore All Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </section>

      <section id="introduction" className="w-full py-12 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="order-2 md:order-1">
              <h2 className="font-headline text-2xl font-bold md:text-4xl">
                Shape Your Future in Tech
              </h2>
              <p className="mt-4 text-base text-foreground/80 md:text-lg">
                At Global Computer Institute, we are dedicated to providing top-tier education in the latest technologies. Our curriculum is designed by industry experts to equip you with the practical skills and theoretical knowledge needed to excel in the fast-paced world of technology. Join us to turn your passion for computing into a rewarding career.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="https://placehold.co/600x400.png"
                data-ai-hint="students coding"
                alt="Students learning to code"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24">
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
              <Card key={feature.title} className="text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-secondary">
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

      <section id="testimonials" className="w-full bg-secondary py-12 md:py-24">
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
                    <Card className="transform transition-transform duration-300 hover:scale-105 bg-background">
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
    </div>
  );
}
