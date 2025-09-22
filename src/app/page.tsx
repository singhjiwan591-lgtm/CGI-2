
'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Code,
  Briefcase,
  GraduationCap,
  Award,
  Palette,
  Laptop,
  Film,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollingText } from '@/components/scrolling-text';
import { getJobs, Job } from '@/lib/job-data-service';

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const bgLogoRef = useRef<HTMLImageElement>(null);
  const [latestJobs, setLatestJobs] = useState<Job[]>([]);

  useEffect(() => {
    const jobs = getJobs();
    setLatestJobs(jobs.slice(0, 4)); // Get latest 4 jobs
  }, []);

  const features = [
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: 'Expert Instructors',
      description:
        'Learn from industry professionals with years of real-world experience.',
    },
    {
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      title: 'Practical, Hands-On Projects',
      description:
        'Build a strong portfolio of practical projects that showcase your skills to employers.',
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      title: 'Guaranteed Career Support',
      description:
        'Get 100% placement assistance, resume workshops, and interview preparation.',
    },
  ];
  
  const courseCategories = [
      {
          icon: <Code className="h-8 w-8 text-primary" />,
          title: "Web Design & Development",
          description: "Master HTML, CSS, JavaScript, and modern frameworks.",
          link: "/academics"
      },
      {
          icon: <Palette className="h-8 w-8 text-primary" />,
          title: "Graphic Designing",
          description: "Unleash your creativity with Photoshop, Illustrator, and CorelDRAW.",
           link: "/academics"
      },
      {
          icon: <Laptop className="h-8 w-8 text-primary" />,
          title: "Basic & Advanced Diploma",
          description: "Comprehensive computer courses like ADCA, DCA, and CCA.",
           link: "/academics"
      },
      {
          icon: <Film className="h-8 w-8 text-primary" />,
          title: "Video Editing",
          description: "Learn to create stunning videos with professional editing software.",
           link: "/academics"
      }
  ];

  const stats = [
    { value: '5,000+', label: 'Successful Students' },
    { value: '20+', label: 'Expert Instructors' },
    { value: '50+', label: 'Industry-Ready Courses' },
    { value: '95%', label: 'Placement Rate' },
  ];

  const testimonials = [
    {
      name: 'Jeevan Singh',
      title: 'Software Developer, TechNova',
      avatar: 'https://i.ibb.co/NnBnqdS/Jiwan.png',
      dataAiHint: 'man developer',
      quote:
        'Global Computer Institute provided the perfect launchpad for my career. The hands-on approach and expert faculty are unmatched. Highly recommended!',
    },
     {
      name: 'Priya Sharma',
      title: 'Graphic Designer',
      avatar: 'https://picsum.photos/seed/priya/100/100',
      dataAiHint: 'woman designer',
      quote:
        'The graphic design course was fantastic. I learned so much and landed a great job right after graduating. The instructors are very supportive.',
    },
  ];

  const handleWhatsAppInquiry = (jobTitle: string) => {
    const adminPhoneNumber = '918566950470';
    const message = encodeURIComponent(`Hello, I am interested in the job: ${jobTitle}`);
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div ref={pageRef} className="flex flex-col items-center">
       <section className="relative w-full py-20 md:py-32 overflow-hidden bg-secondary">
         <div className="container mx-auto px-4 text-center relative z-10">
            <ScrollingText />
            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80 md:text-xl">
              Your gateway to a successful career in technology. We provide expert-led training in the most in-demand skills to shape your future.
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
          <div
            className="absolute inset-0 z-0 flex items-center justify-center"
          >
            <Image
              ref={bgLogoRef}
              src="https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png"
              alt="Background Logo"
              width={400}
              height={400}
              className="object-contain opacity-5"
              priority
            />
          </div>
      </section>

      <section id="introduction" className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="order-2 md:order-1">
              <h2 className="font-headline text-2xl font-bold md:text-4xl">
                Welcome to Global Computer Institute
              </h2>
              <p className="mt-4 text-base text-foreground/80 md:text-lg">
                At Global Computer Institute, we are dedicated to providing top-tier education in the latest technologies. Our curriculum is designed by industry experts to equip you with the practical skills and theoretical knowledge needed to excel in the fast-paced world of technology. Join us to turn your passion for computing into a rewarding career and achieve new heights of success.
              </p>
            </div>
            <div className="order-1 md:order-2 group">
              <Image
                src="https://i.ibb.co/8Dt1M0L4/Whats-App-Image-2025-09-11-at-8-52-29-PM.jpg"
                alt="Students and teachers collaborating in a classroom at Global Computer Institute"
                width={800}
                height={600}
                data-ai-hint="institute students teachers"
                style={{ height: 'auto', width: '100%' }}
                className="rounded-lg shadow-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="w-full py-12 md:py-20 bg-secondary">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {stats.map((stat, index) => (
                      <div key={index}>
                          <p className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</p>
                          <p className="mt-2 text-base md:text-lg text-muted-foreground">{stat.label}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

       <section id="courses-overview" className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-2xl font-bold md:text-4xl">
              Our Popular Courses
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">
              We offer a wide range of courses to kickstart your career in the tech industry.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {courseCategories.map((course) => (
              <div key={course.title} className="group">
                <Card className="text-center bg-card h-full flex flex-col transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      {course.icon}
                    </div>
                    <CardTitle className="mt-4 font-headline text-xl">
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-foreground/80">{course.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" asChild className="mt-auto">
                      <Link href={course.link}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

       <section id="govt-jobs" className="w-full py-12 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-2xl font-bold md:text-4xl">
              Latest Govt. Job Openings
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">
              Stay updated with the latest government job vacancies relevant to your skills.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 md:gap-8">
            {latestJobs.length > 0 ? latestJobs.map((job) => (
              <div key={job.id} className="group">
                <Card className="overflow-hidden bg-card flex flex-col h-full transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  <div className="relative w-full h-48">
                      <Image src={job.photoURL} alt={job.title} fill={true} className="object-cover" data-ai-hint="government building" />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                      <CardHeader className="p-0">
                          <CardTitle className="font-headline text-xl mb-2">
                              {job.title}
                          </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 flex-grow">
                          <CardDescription className="text-foreground/80">{job.description}</CardDescription>
                      </CardContent>
                      <CardFooter className="p-0 pt-4 mt-auto">
                          <Button className="w-full" onClick={() => handleWhatsAppInquiry(job.title)}>
                              Apply on WhatsApp
                          </Button>
                      </CardFooter>
                  </div>
                </Card>
              </div>
            )) : (
              <p className="text-center col-span-full text-muted-foreground">No job openings at the moment. Please check back later.</p>
            )}
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-2xl font-bold md:text-4xl">
              Why Choose Global Computer Institute?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">
              We provide the tools, environment, and support you need to succeed in the tech industry.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="group">
                <Card className="text-center bg-card p-4 h-full transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-12 md:py-24 bg-secondary">
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
                <CarouselItem key={`${testimonial.name}-${index}`} className="group">
                  <div className="p-1">
                    <Card className="bg-background transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <p className="text-base italic text-foreground/90 md:text-lg">
                          "{testimonial.quote}"
                        </p>
                        <div className="mt-6 flex items-center">
                          <Avatar>
                            <AvatarImage
                              src={testimonial.avatar}
                              alt={`Photo of ${testimonial.name}`}
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

    