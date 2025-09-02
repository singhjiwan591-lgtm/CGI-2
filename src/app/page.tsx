
'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Code,
  Briefcase,
  Users,
  GraduationCap,
  Award,
  BarChart,
  Palette,
  Laptop,
  Film,
  Building2,
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
import { usePageAnimations } from '@/hooks/usePageAnimations';
import { gsap } from 'gsap';
import { ScrollingText } from '@/components/scrolling-text';
import { getJobs, Job } from '@/lib/job-data-service';

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const bgLogoRef = useRef<HTMLImageElement>(null);
  const [latestJobs, setLatestJobs] = useState<Job[]>([]);
  usePageAnimations(pageRef);

  useEffect(() => {
    if (bgLogoRef.current) {
      gsap.fromTo(bgLogoRef.current, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 0.05, duration: 1.5, ease: 'power3.out' }
      );
    }

    async function fetchJobs() {
      const jobs = await getJobs();
      setLatestJobs(jobs.slice(0, 4)); // Get latest 4 jobs
    }
    fetchJobs();

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
  ];

  const handleWhatsAppInquiry = (jobTitle: string) => {
    const adminPhoneNumber = '918566950470'; // Replaced with the new number
    const message = encodeURIComponent(`Hello, I am interested in the job: ${jobTitle}`);
    const whatsappUrl = `https://wa.me/${adminPhoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div ref={pageRef} className="flex flex-col items-center">
       <section data-animate="fade-in" className="relative w-full py-20 md:py-32 overflow-hidden bg-secondary">
         <div className="container mx-auto px-4 text-center relative z-10">
            <ScrollingText />
            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/80 md:text-xl">
              Your gateway to a successful career in technology. We provide expert-led training in the most in-demand skills to shape your future.
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

      <section id="introduction" data-animate="fade-in-up" className="w-full py-12 md:py-24">
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

      <section id="stats" data-animate="fade-in-up" className="w-full py-12 md:py-20 bg-secondary">
          <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  {stats.map((stat, index) => (
                      <div key={index} data-animate="stagger-item">
                          <p className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</p>
                          <p className="mt-2 text-base md:text-lg text-muted-foreground">{stat.label}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

       <section id="courses-overview" data-animate="fade-in-up" className="w-full py-12 md:py-24">
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
              <Card key={course.title} data-animate="stagger-item" className="text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-card">
                <CardHeader>
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10`}>
                    {course.icon}
                  </div>
                  <CardTitle className="mt-4 font-headline text-xl">
                    {course.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 h-16">{course.description}</p>
                  <Button variant="link" asChild className="mt-4">
                    <Link href={course.link}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

       <section id="govt-jobs" data-animate="fade-in-up" className="w-full py-12 md:py-24 bg-secondary">
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
              <Card key={job.id} data-animate="stagger-item-3" className="overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-card flex flex-col">
                <div className="relative w-full h-48">
                    <Image src={job.photoURL} alt={job.title} layout="fill" objectFit="cover" data-ai-hint="government building" />
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
            )) : (
              <p className="text-center col-span-full text-muted-foreground">No job openings at the moment. Please check back later.</p>
            )}
          </div>
        </div>
      </section>

      <section id="features" data-animate="fade-in-up" className="w-full py-12 md:py-24">
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
              <Card key={feature.title} data-animate="stagger-item-2" className="text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-card p-4">
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

      <section id="testimonials" data-animate="fade-in-up" className="w-full py-12 md:py-24 bg-secondary">
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
                    <Card className="transform transition-transform duration-300 hover:scale-[1.03] bg-background">
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
