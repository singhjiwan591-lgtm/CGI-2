
'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Mail, MapPin, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const contactDetails = [
    { icon: <MapPin className="h-6 w-6 text-primary" />, text: 'Main Road, Near Bus Stand, Jalalabad (West), Punjab' },
    { icon: <Mail className="h-6 w-6 text-primary" />, text: 'admissions@webandapp.edu' },
    { icon: <Phone className="h-6 w-6 text-primary" />, text: '(123) 555-2024' },
  ];

  return (
    <div ref={pageRef} className="flex flex-col items-center">
      <section className="w-full bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-3xl font-bold md:text-5xl">Get in Touch</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base md:text-lg text-foreground/80">
            We are here to answer your questions about courses, admissions, and career opportunities.
          </p>
        </div>
      </section>

      <section className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="font-headline text-2xl font-bold md:text-3xl">Contact Information</h2>
              <p className="mt-4 text-foreground/80">
                For course counseling, enrollment, or any other inquiries, please contact us using the information below.
              </p>
              <ul className="mt-6 space-y-4 md:mt-8 md:space-y-6">
                {contactDetails.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">{detail.icon}</div>
                    <span className="ml-3 md:ml-4 text-base md:text-lg">{detail.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 md:mt-8">
                <h3 className="font-headline text-lg font-semibold md:text-xl">Follow Us</h3>
                <div className="mt-4 flex space-x-4">
                  <a href="#" aria-label="Facebook"><Facebook className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" /></a>
                  <a href="#" aria-label="Instagram"><Instagram className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" /></a>
                  <a href="#" aria-label="LinkedIn"><Linkedin className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" /></a>
                </div>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="container mx-auto px-4 pb-12 md:pb-24">
          <h2 className="text-center font-headline text-2xl font-bold md:text-4xl mb-6 md:mb-8">Our Location</h2>
          <div className="aspect-video w-full">
            <iframe
                src="https://maps.google.com/maps?q=P9P5%2BG6%20Wasal%20Mohan%20Ke%20(Golu%20Ka%20Mor),%20Punjab&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg shadow-md"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
