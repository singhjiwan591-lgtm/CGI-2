
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Facebook, Linkedin, Twitter } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function AboutPage() {
  const timeline = [
    { year: 1995, event: 'School Founded', description: 'Oakridge opened its doors with a vision for quality education.' },
    { year: 2005, event: 'First Graduating Class', description: 'We celebrated our first batch of graduates, ready to take on the world.' },
    { year: 2015, event: 'Campus Expansion', description: 'Opened our new state-of-the-art science and arts wing.' },
    { year: 2024, event: '2000+ Students Strong', description: 'Proudly serving a diverse community of over 2000 students.' },
  ];

  const teamMembers = [
    {
      name: 'Dr. Evelyn Reed',
      position: 'Principal',
      image: 'https://placehold.co/300x300.png',
      dataAiHint: 'woman professional',
    },
    {
      name: 'Mr. David Chen',
      position: 'Head of Academics',
      image: 'https://placehold.co/300x300.png',
      dataAiHint: 'man teacher',
    },
    {
      name: 'Mrs. Sarah Adams',
      position: 'Admissions Director',
      image: 'https://placehold.co/300x300.png',
      dataAiHint: 'woman administrator',
    },
  ];

  const benefits = [
    'Holistic Student Development',
    'Low Student-to-Teacher Ratio',
    'Safe & Inclusive Campus',
    'Strong Parent-Teacher Partnership',
    'Focus on Critical Thinking',
    'Diverse Extracurricular Activities',
  ];

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-3xl font-bold md:text-5xl">About Oakridge School</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-foreground/80 md:text-lg">
            We are a community of learners, dedicated to academic excellence and personal growth in a supportive, international environment.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="order-2 md:order-1">
              <h2 className="font-headline text-2xl font-bold md:text-3xl">Our Mission</h2>
              <p className="mt-4 text-foreground/80">
                Our mission is to inspire and empower every student to reach their full potential. We foster a love for learning, a commitment to character, and the skills necessary to thrive in a global society. By providing a rich and varied curriculum, we encourage students to explore their passions, think critically, and become compassionate, responsible citizens of the world.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="https://placehold.co/600x400.png"
                data-ai-hint="school campus"
                alt="School campus"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-secondary py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-2xl font-bold md:text-4xl">Our History</h2>
          <div className="relative mt-10">
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-border md:block"></div>
            {timeline.map((item, index) => (
              <div key={index} className="relative mb-8 flex w-full items-center md:justify-between md:odd:flex-row-reverse">
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
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center">
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

      <section className="w-full bg-secondary py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-2xl font-bold md:text-4xl">Why Choose Oakridge?</h2>
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
