import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Code, LayoutTemplate, Search } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      icon: <LayoutTemplate className="h-10 w-10 text-accent" />,
      name: 'UI/UX Design',
      description: 'Crafting intuitive and beautiful user interfaces that provide a seamless user experience.',
    },
    {
      icon: <Code className="h-10 w-10 text-accent" />,
      name: 'Web Development',
      description: 'Building robust, scalable, and high-performance websites using modern technologies.',
    },
    {
      icon: <Search className="h-10 w-10 text-accent" />,
      name: 'SEO Optimization',
      description: 'Improving your website’s visibility on search engines to attract more organic traffic.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'A starting point for individuals and small projects.',
      features: ['1 Project', 'Basic Support', '10GB Storage'],
      cta: 'Get Started',
      variant: 'outline' as const,
    },
    {
      name: 'Standard',
      price: '$49',
      period: '/month',
      description: 'Perfect for growing businesses and professionals.',
      features: ['10 Projects', 'Priority Support', '100GB Storage', 'Advanced Analytics'],
      cta: 'Choose Standard',
      variant: 'default' as const,
    },
    {
      name: 'Premium',
      price: '$99',
      period: '/month',
      description: 'For large teams and enterprises needing more power.',
      features: ['Unlimited Projects', '24/7 Dedicated Support', '1TB Storage', 'Custom Integrations'],
      cta: 'Choose Premium',
      variant: 'outline' as const,
    },
  ];

  return (
    <div>
      <section className="bg-secondary py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Services</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80">
            We offer a comprehensive suite of digital services designed to elevate your brand and accelerate your growth.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.name} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {service.icon}
                  </div>
                  <CardTitle className="mt-4 font-headline text-2xl">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Pricing Plans</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
              Choose a plan that fits your needs. All plans are flexible and can be tailored to your specific requirements.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={plan.variant === 'default' ? 'border-accent' : ''}>
                <CardHeader className="text-center">
                  <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-foreground/70">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col">
                  <ul className="space-y-4 flex-grow">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-5 w-5 text-accent mr-3" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-8 w-full" variant={plan.variant}>
                    <Link href="/contact">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
