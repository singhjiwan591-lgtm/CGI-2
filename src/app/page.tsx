import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Rocket,
  Shield,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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

export default function Home() {
  const features = [
    {
      icon: <Rocket className="h-10 w-10 text-accent" />,
      title: 'Innovative Solutions',
      description:
        'We provide cutting-edge solutions tailored to your needs, pushing the boundaries of technology.',
    },
    {
      icon: <Shield className="h-10 w-10 text-accent" />,
      title: 'Secure & Reliable',
      description:
        'Our commitment to security and reliability ensures your data and services are always safe.',
    },
    {
      icon: <Users className="h-10 w-10 text-accent" />,
      title: 'Customer Centric',
      description:
        'We prioritize our customers, offering dedicated support and building long-lasting relationships.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Jennings',
      title: 'CEO, Tech Innovators',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'woman portrait',
      quote:
        'Webfolio transformed our online presence. Their team is professional, creative, and incredibly efficient. The results speak for themselves!',
    },
    {
      name: 'Mike Anderson',
      title: 'Marketing Director, Future Co.',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'man portrait',
      quote:
        'An absolute pleasure to work with. They understood our vision perfectly and delivered a product that exceeded all our expectations. Highly recommended.',
    },
    {
      name: 'Jessica Chen',
      title: 'Founder, Startup Hub',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'woman smiling',
      quote:
        'The best in the business. Their attention to detail and commitment to quality is unparalleled. We couldn\'t be happier with our new website.',
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative flex h-[80dvh] min-h-[600px] w-full items-center justify-center bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Build Your Digital Future
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80 md:text-xl">
            We craft stunning, high-performance websites and applications that
            drive growth and inspire users.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/services">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="introduction" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-headline text-3xl font-bold md:text-4xl">
                Welcome to Webfolio
              </h2>
              <p className="mt-4 text-lg text-foreground/80">
                We are a passionate team of designers, developers, and
                strategists dedicated to helping businesses succeed in the
                digital world. From startups to established enterprises, we
                partner with you to create web experiences that captivate and
                convert. Our approach combines creative design with robust
                technology to deliver solutions that are not only beautiful but
                also effective.
              </p>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              data-ai-hint="team collaboration"
              alt="Team working together"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      <section id="features" className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Our Core Strengths
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
              Discover why clients trust us to bring their digital visions to
              life.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <CardTitle className="mt-4 font-headline text-2xl">
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

      <section id="testimonials" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
              We've helped hundreds of businesses grow. Here's what they think
              about our work.
            </p>
          </div>
          <Carousel
            opts={{ align: 'start', loop: true }}
            className="mx-auto mt-12 w-full max-w-4xl"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <p className="text-lg italic text-foreground/90">
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
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
    </div>
  );
}
