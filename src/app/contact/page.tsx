import Image from 'next/image';
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

export default function ContactPage() {
  const contactDetails = [
    { icon: <MapPin className="h-6 w-6 text-accent" />, text: '123 Creative Lane, Suite 100, Design City, 12345' },
    { icon: <Mail className="h-6 w-6 text-accent" />, text: 'hello@webfolio.com' },
    { icon: <Phone className="h-6 w-6 text-accent" />, text: '(123) 456-7890' },
  ];

  return (
    <div>
      <section className="bg-secondary py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-4xl font-bold md:text-5xl">Get in Touch</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80">
            Have a project in mind or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-headline text-3xl font-bold">Contact Information</h2>
              <p className="mt-4 text-foreground/80">
                Reach out to us through any of the following channels. We're excited to start a conversation with you.
              </p>
              <ul className="mt-8 space-y-6">
                {contactDetails.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">{detail.icon}</div>
                    <span className="ml-4 text-lg">{detail.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <h3 className="font-headline text-xl font-semibold">Follow Us</h3>
                <div className="mt-4 flex space-x-4">
                  <a href="#" aria-label="Facebook"><Facebook className="h-6 w-6 text-foreground/70 hover:text-accent transition-colors" /></a>
                  <a href="#" aria-label="Instagram"><Instagram className="h-6 w-6 text-foreground/70 hover:text-accent transition-colors" /></a>
                  <a href="#" aria-label="LinkedIn"><Linkedin className="h-6 w-6 text-foreground/70 hover:text-accent transition-colors" /></a>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4 pb-16 md:pb-24">
          <h2 className="text-center font-headline text-3xl font-bold md:text-4xl mb-8">Our Location</h2>
          <div className="aspect-video w-full">
            <Image 
              src="https://placehold.co/1200x600.png"
              data-ai-hint="street map"
              alt="Google Map"
              width={1200}
              height={600}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
