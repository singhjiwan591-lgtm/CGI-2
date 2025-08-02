import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function AdmissionsPage() {
  const admissionSteps = [
    {
      step: 1,
      title: 'Submit an Inquiry',
      description: 'Fill out our online inquiry form to receive more information about our school and programs.',
    },
    {
      step: 2,
      title: 'Schedule a Tour',
      description: 'Visit our campus to see our facilities and meet our vibrant community of students and teachers.',
    },
    {
      step: 3,
      title: 'Complete Application',
      description: 'Submit your completed application form along with all required documents through our online portal.',
    },
    {
      step: 4,
      title: 'Student Assessment',
      description: 'Prospective students will participate in a friendly assessment and interview with our admissions team.',
    },
    {
      step: 5,
      title: 'Receive Decision',
      description: 'Admission decisions are communicated via email. We look forward to welcoming new families!',
    },
  ];

  const keyDates = [
    { date: 'September 1st', event: 'Applications Open for 2025-2026' },
    { date: 'November 15th', event: 'Open House & Campus Tour' },
    { date: 'January 31st', event: 'Application Deadline' },
    { date: 'March 15th', event: 'Admission Decisions Released' },
  ];

  return (
    <div>
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-3xl font-bold md:text-5xl">Admissions</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-foreground/80">
            Join the Oakridge family. Learn more about our admissions process and how to apply.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-2xl font-bold md:text-4xl">How to Apply</h2>
          <p className="text-center mx-auto mt-4 max-w-2xl text-foreground/80">
            We have a straightforward admissions process. Follow these steps to begin your journey at Oakridge International School.
          </p>
          <div className="relative mt-12">
            <div className="absolute left-1/2 top-4 hidden h-[calc(100%-2rem)] w-0.5 -translate-x-1/2 bg-border md:block"></div>
            <div className="space-y-10">
              {admissionSteps.map((item, index) => (
                <div key={index} className="relative flex flex-col md:flex-row items-center gap-6">
                  <div className={`z-10 flex h-12 w-12 items-center justify-center rounded-full bg-chart-${(index % 5) + 1} text-white font-bold text-xl`}>
                    {item.step}
                  </div>
                  <div className="w-full md:w-1/2 md:pr-8 text-center md:text-left">
                     <Card className={index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}>
                      <CardHeader>
                        <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-foreground/80">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-headline text-2xl font-bold md:text-4xl">Key Dates & Deadlines</h2>
          <div className="mx-auto mt-10 max-w-2xl">
            <ul className="space-y-4">
              {keyDates.map((item, index) => (
                <li key={item.event} className="flex items-center rounded-lg bg-background p-4 shadow">
                  <CheckCircle2 className={`h-6 w-6 text-chart-${(index % 5) + 1} mr-4`} />
                  <div>
                    <p className="font-semibold">{item.date}</p>
                    <p className="text-foreground/80">{item.event}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-2xl font-bold md:text-3xl">Begin Your Application</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-foreground/80">
                Ready to take the first step? Our online application portal makes it easy to get started.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/register">
                Apply Online Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
        </div>
      </section>
    </div>
  );
}
