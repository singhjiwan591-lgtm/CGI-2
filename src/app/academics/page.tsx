
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, BrainCircuit, ArrowRight } from 'lucide-react';

export default function AcademicsPage() {
  const academicPrograms = [
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      name: 'Primary School (Grades 1-5)',
      description: 'Building a strong foundation with a focus on curiosity, creativity, and core academic skills.',
    },
    {
      icon: <BookOpen className="h-10 w-10 text-primary" />,
      name: 'Middle School (Grades 6-8)',
      description: 'Fostering critical thinking and collaboration as students transition to more advanced subjects.',
    },
    {
      icon: <BrainCircuit className="h-10 w-10 text-primary" />,
      name: 'High School (Grades 9-12)',
      description: 'Preparing students for college and future careers with a rigorous and comprehensive curriculum.',
    },
  ];

  const curriculumHighlights = [
    'STEAM-focused learning (Science, Technology, Engineering, Arts, and Math)',
    'World language programs including Spanish, French, and Mandarin',
    'Advanced Placement (AP) and International Baccalaureate (IB) courses',
    'Comprehensive arts, music, and drama programs',
    'Competitive athletics and physical education',
    'Leadership and community service opportunities',
  ];

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-3xl font-bold md:text-5xl">Academics</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-foreground/80">
            Explore our comprehensive academic programs designed to challenge and inspire students at every level.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-2xl font-bold md:text-4xl mb-10">Our Programs</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {academicPrograms.map((program) => (
              <Card key={program.name} className="text-center">
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
              Our curriculum is designed to be balanced, rigorous, and engaging.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {curriculumHighlights.map((highlight) => (
              <div key={highlight} className="flex items-start">
                <GraduationCap className={`h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0`} />
                <p className="text-base md:text-lg">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-2xl font-bold md:text-3xl">Ready to Join Us?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-foreground/80">
                Take the next step in your child's educational journey.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/admissions">
                Admissions Process <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
