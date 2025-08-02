import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Lightbulb,
  Trophy,
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
      icon: <Trophy className="h-10 w-10 text-chart-1" />,
      title: 'Experienced Faculty',
      description:
        'Our educators are passionate, experienced, and dedicated to student success.',
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-chart-2" />,
      title: 'Innovative Curriculum',
      description:
        'We offer a dynamic and engaging curriculum that fosters critical thinking and creativity.',
    },
    {
      icon: <Users className="h-10 w-10 text-chart-3" />,
      title: 'Vibrant Community',
      description:
        'We cultivate a supportive and inclusive community for students, parents, and staff.',
    },
  ];

  const testimonials = [
    {
      name: 'Jane Doe',
      title: 'Parent of a 5th Grader',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'woman portrait',
      quote:
        'Oakridge has been a transformative experience for our child. The teachers are caring and the community is wonderful. We couldn\'t be happier!',
    },
    {
      name: 'John Smith',
      title: 'Alumnus, Class of 2020',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'man portrait',
      quote:
        'The foundation I received at Oakridge prepared me for college and beyond. I am grateful for the lifelong friendships and mentorship.',
    },
    {
      name: 'Emily White',
      title: 'Parent of two students',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'woman smiling',
      quote:
        'A fantastic school with a strong academic program and a focus on character development. Highly recommended to any parent.',
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative flex h-[70dvh] min-h-[500px] w-full items-center justify-center bg-secondary md:h-[80dvh] md:min-h-[600px]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to Oakridge School
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80 md:text-xl">
            Inspiring the next generation of leaders, thinkers, and innovators.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/admissions">
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="introduction" className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="order-2 md:order-1">
              <h2 className="font-headline text-2xl font-bold md:text-4xl">
                A Tradition of Excellence
              </h2>
              <p className="mt-4 text-base text-foreground/80 md:text-lg">
                At Oakridge International School, we are committed to providing a nurturing and challenging environment where students can achieve their full potential. Our holistic approach to education focuses on academic rigor, character development, and a passion for lifelong learning. Join us to be part of a community that values curiosity, integrity, and excellence.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src="https://placehold.co/600x400.png"
                data-ai-hint="happy students"
                alt="Students in a classroom"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-secondary py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-2xl font-bold md:text-4xl">
              Why Oakridge School?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">
              Discover the pillars of our educational philosophy.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-chart-${(index % 5) + 1}/10`}>
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

      <section id="testimonials" className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-2xl font-bold md:text-4xl">
              From Our Community
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">
              Hear what parents and students have to say about their experience at Oakridge.
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
                    <Card>
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
