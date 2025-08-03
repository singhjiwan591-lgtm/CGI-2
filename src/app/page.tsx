
'use client';

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
import Autoplay from "embla-carousel-autoplay";
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

  const heroSlides = [
    {
      image: 'https://placehold.co/1920x1080.png',
      dataAiHint: 'modern classroom students',
      title: 'Launch Your Career in Technology',
      description: 'Master the most in-demand tech skills with our expert-led courses.',
    },
    {
      image: 'https://placehold.co/1920x1080.png',
      dataAiHint: 'coding on laptop',
      title: 'Become a Full-Stack Developer',
      description: 'From front-end design to back-end architecture, we cover it all.',
    },
    {
      image: 'https://placehold.co/1920x1080.png',
      dataAiHint: 'data analytics dashboard',
      title: 'Unlock the Power of Data Science',
      description: 'Learn to analyze data, build AI models, and drive business decisions.',
    },
     {
      image: 'https://placehold.co/1920x1080.png',
      dataAiHint: 'group of students collaborating',
      title: 'Join a Community of Innovators',
      description: 'Collaborate, learn, and grow with a network of passionate tech enthusiasts.',
    },
  ]

  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );


  return (
    <div className="flex flex-col items-center">
      <section className="w-full">
         <Carousel 
            className="w-full"
            plugins={[autoplayPlugin.current]}
            onMouseEnter={autoplayPlugin.current.stop}
            onMouseLeave={autoplayPlugin.current.reset}
            opts={{ loop: true }}
         >
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[70dvh] min-h-[500px] w-full md:h-[80vh] md:min-h-[600px]">
                  <Image
                    src={slide.image}
                    data-ai-hint={slide.dataAiHint}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="relative z-10 flex h-full items-center justify-center">
                    <div className="container mx-auto px-4 text-center text-white">
                      <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                        {slide.title}
                      </h1>
                      <p className="mx-auto mt-4 max-w-3xl text-base text-white/80 md:text-xl">
                        {slide.description}
                      </p>
                      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button asChild size="lg" className="w-full sm:w-auto">
                          <Link href="/admissions">
                            Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-primary">
                          <Link href="/academics">Explore Courses</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
        </Carousel>
      </section>

      <section id="introduction" className="w-full py-12 md:py-24">
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

      <section id="features" className="w-full bg-secondary py-12 md:py-24">
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
              <Card key={feature.title} className="text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
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

      <section id="testimonials" className="w-full py-12 md:py-24">
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
                    <Card className="transform transition-transform duration-300 hover:scale-105">
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
