
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
  FileText,
  Book,
  Keyboard,
  Globe,
  HardDrive,
  Calculator,
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
import { DynamicScrollingText } from '@/components/dynamic-components';

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
      name: 'Jeevan Singh',
      title: 'Software Developer, TechNova',
      avatar: 'https://i.ibb.co/NnBnqdS/Jiwan.png',
      dataAiHint: 'man developer',
      quote:
        'Web an d App provided the perfect launchpad for my career. The hands-on approach and expert faculty are unmatched. Highly recommended!',
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
  
  const courseCards = [
    {
      title: 'ADCA',
      description: 'Advanced Diploma in Computer Applications',
      icon: <FileText className="h-8 w-8" />,
      imageUrl: 'https://i.ibb.co/0VXPWLDb/IMG-20250803-WA0010.jpg',
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
      imageUrl: 'https://i.ibb.co/kj7RqXt/IMG-20250803-WA0003.jpg',
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

  return (
    <div className="flex flex-col items-center">
       <section className="w-full py-20 md:py-32">
         <div className="container mx-auto px-4 text-center">
            <DynamicScrollingText />
            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80 md:text-xl">
              Master the most in-demand tech skills with our expert-led courses. Explore our programs and find the perfect path for you.
            </p>
             <div className="mt-8 flex justify-center gap-4">
               <Button asChild size="lg">
                  <Link href="/academics">
                    Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                 <Button asChild size="lg" variant="outline">
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
            </div>
          </div>
      </section>

      <section id="courses" className="w-full py-12 md:py-20 bg-secondary">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="font-headline text-2xl font-bold md:text-4xl">
              Our Popular Courses
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">
              Choose from a wide range of courses designed to get you job-ready.
            </p>
          </div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {courseCards.map((card) => (
              <Link key={card.title} href={`/register?course=${encodeURIComponent(card.title)}`} className="block group">
                <Card 
                  className={`text-white relative overflow-hidden ${card.imageUrl ? '' : `bg-gradient-to-br ${card.color}`} transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 flex flex-col items-center justify-center p-4 md:p-6 text-center aspect-square`}
                >
                  {card.imageUrl ? (
                    <>
                      <Image src={card.imageUrl} alt={card.title} fill className="z-0 transition-transform duration-300 group-hover:scale-110 object-cover" data-ai-hint={card.dataAiHint} />
                      <div className="absolute inset-0 bg-black/50 z-10"></div>
                    </>
                  ) : null}
                  <div className="z-20 flex flex-col items-center justify-center">
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

      <section id="introduction" className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="order-2 md:order-1">
              <h2 className="font-headline text-2xl font-bold md:text-4xl">
                Shape Your Future in Tech
              </h2>
              <p className="mt-4 text-base text-foreground/80 md:text-lg">
                At Web an d App, we are dedicated to providing top-tier education in the latest technologies. Our curriculum is designed by industry experts to equip you with the practical skills and theoretical knowledge needed to excel in the fast-paced world of technology. Join us to turn your passion for computing into a rewarding career.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="https://i.ibb.co/6RdhCvSg/Compress-JPEG-Online-img-800x600.jpg"
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

      <section id="features" className="w-full py-12 md:py-24 bg-secondary">
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
              <Card key={feature.title} className="text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-card">
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
                    <Card className="transform transition-transform duration-300 hover:scale-105 bg-secondary">
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

      <section id="logo-card" className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h2 className="font-headline text-2xl font-bold md-text-4xl text-center mb-8">
            Our Identity
          </h2>
          <Card className="w-full max-w-sm p-8 bg-card transform transition-transform duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 flex justify-center items-center">
            <Image
              src="https://i.ibb.co/9mp7zWKw/GCI-Logo-png.png"
              alt="Web an d App Logo"
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
