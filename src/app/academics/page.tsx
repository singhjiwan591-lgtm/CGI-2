
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Codepen, Database, Layers, ArrowRight } from 'lucide-react';

export default function AcademicsPage() {
  const academicPrograms = [
    {
      icon: <Codepen className="h-10 w-10 text-primary" />,
      name: 'Web Development',
      description: 'Master front-end and back-end technologies to build modern websites and applications.',
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      name: 'Data Science & Analytics',
      description: 'Learn to analyze data, build machine learning models, and derive valuable insights.',
    },
    {
      icon: <Layers className="h-10 w-10 text-primary" />,
      name: 'UI/UX Design',
      description: 'Create intuitive, user-friendly, and visually appealing digital product interfaces.',
    },
  ];

  const curriculumHighlights = [
    'Full-Stack Development with MERN/MEAN stack',
    'Advanced Python for Data Science',
    'Machine Learning and AI Fundamentals',
    'Responsive Web Design with Figma and React',
    'Cloud Computing with AWS and Azure',
    'Cybersecurity Essentials and Ethical Hacking',
  ];

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-3xl font-bold md:text-5xl">Our Courses</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-foreground/80">
            Explore our comprehensive courses designed to make you a job-ready tech professional.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-2xl font-bold md:text-4xl mb-10">Flagship Programs</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {academicPrograms.map((program) => (
              <Card key={program.name} className="text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <CardHeader>
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10`}>
                    {program.icon}
                  </div>
                  <CardTitle className="mt-4 font-headline text-xl md:text-2xl">{program.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-secondary py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-2xl font-bold md:text-4xl">Curriculum Highlights</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-foreground/80">
              Our curriculum is practical, up-to-date, and aligned with industry needs.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {curriculumHighlights.map((highlight) => (
              <div key={highlight} className="flex items-start">
                <ArrowRight className={`h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0`} />
                <p className="text-base md:text-lg">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-2xl font-bold md:text-3xl">Ready to Start Your Tech Journey?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-foreground/80">
                Take the first step towards a rewarding career in technology.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/admissions">
                Enroll Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
