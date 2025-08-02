import Image from 'next/image';
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
    { year: 2015, event: 'Company Founded', description: 'Webfolio was born with a mission to revolutionize web design.' },
    { year: 2018, event: '100th Project Completed', description: 'We celebrated a major milestone, delivering our 100th successful project.' },
    { year: 2021, event: 'Expanded to Global Clients', description: 'Our services went international, serving clients from over 20 countries.' },
    { year: 2024, event: '1000+ Clients Served', description: 'Proudly serving over a thousand clients and continuing to grow.' },
  ];

  const teamMembers = [
    {
      name: 'Alice Johnson',
      position: 'Founder & CEO',
      image: 'https://placehold.co/300x300.png',
      dataAiHint: 'woman professional',
    },
    {
      name: 'Bob Williams',
      position: 'Lead Developer',
      image: 'https://placehold.co/300x300.png',
      dataAiHint: 'man developer',
    },
    {
      name: 'Charlie Brown',
      position: 'Creative Director',
      image: 'https://placehold.co/300x300.png',
      dataAiHint: 'man creative',
    },
  ];

  const benefits = [
    'User-Centric Design Philosophy',
    'Agile & Collaborative Workflow',
    'Transparent Pricing & Communication',
    'Dedicated Long-Term Support',
    'Proven Track Record of Success',
  ];

  return (
    <div>
      <section className="bg-secondary py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">About Webfolio</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80">
            We are more than just a web agency. We are your partners in digital innovation, committed to crafting exceptional online experiences that drive results and inspire your audience.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-headline text-3xl font-bold">Our Mission</h2>
              <p className="mt-4 text-foreground/80">
                Our mission is to empower businesses with transformative digital solutions. We believe in the power of great design and technology to create meaningful connections between brands and their customers. By blending creativity with strategic thinking, we build websites and applications that are not only visually stunning but also intuitive, accessible, and performance-driven. We strive for excellence in every project, ensuring our clients achieve their goals and stand out in a crowded digital landscape.
              </p>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              data-ai-hint="office building"
              alt="Company mission"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-3xl font-bold md:text-4xl">Our Journey</h2>
          <div className="relative mt-12">
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
            {timeline.map((item, index) => (
              <div key={index} className="relative mb-8 flex w-full items-center justify-between md:odd:flex-row-reverse">
                <div className="hidden md:block w-5/12"></div>
                <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="w-full md:w-5/12">
                  <Card className="p-6">
                    <p className="font-bold text-accent">{item.year}</p>
                    <h3 className="font-headline text-xl font-bold mt-1">{item.event}</h3>
                    <p className="mt-2 text-foreground/70">{item.description}</p>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-3xl font-bold md:text-4xl">Meet Our Team</h2>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="p-6">
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarImage src={member.image} data-ai-hint={member.dataAiHint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 font-headline text-2xl font-bold">{member.name}</h3>
                  <p className="text-accent">{member.position}</p>
                  <div className="mt-4 flex justify-center space-x-4">
                    <Link href="#"><Twitter className="h-5 w-5 text-foreground/60 hover:text-accent" /></Link>
                    <Link href="#"><Linkedin className="h-5 w-5 text-foreground/60 hover:text-accent" /></Link>
                    <Link href="#"><Facebook className="h-5 w-5 text-foreground/60 hover:text-accent" /></Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-3xl font-bold md:text-4xl">Why Choose Us?</h2>
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
