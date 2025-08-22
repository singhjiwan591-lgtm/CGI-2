
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from '@/components/ui/toaster';
import { Preloader } from '@/components/preloader';
import Script from 'next/script';
import { DynamicDiscountPopup } from '@/components/dynamic-components';

export const metadata: Metadata = {
  title: {
    default: 'Global Computer Institute | Jalalabad (West), Punjab',
    template: '%s | Global Computer Institute',
  },
  description: 'Join Global Computer Institute in Jalalabad (West), Punjab for expert-led courses in Web Development, Data Science, Accounting, ADCA, CCA, and more. Start your tech career with us!',
  keywords: ['Computer Institute Jalalabad', 'Global Computer Institute', 'Computer Courses', 'ADCA', 'DCA', 'Web Development Course', 'Learn HTML', 'Typing Course', 'Punjab Computer Education'],
  authors: [{ name: 'Global Computer Institute', url: 'https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png' }],
  creator: 'Global Computer Institute',
  icons: {
    icon: 'https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png',
    shortcut: 'https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png',
    apple: 'https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png',
    title: 'Global Computer Institute | Best Tech Education in Jalalabad',
    description: 'Empowering the next generation of tech leaders with practical skills and placement assistance.',
    images: [
      {
        url: 'https://i.ibb.co/6RdhCvSg/Compress-JPEG-Online-img-800x600.jpg',
        width: 800,
        height: 600,
        alt: 'Students learning at Global Computer Institute',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global Computer Institute | Start Your Tech Career',
    description: 'Expert-led computer courses in Jalalabad, Punjab. Join us to build your future in technology.',
    images: ['https://i.ibb.co/6RdhCvSg/Compress-JPEG-Online-img-800x600.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  assets: ['https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png/assets'],
  category: 'Education',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://www.google.com/recaptcha/enterprise.js?render=6LdH2ZorAAAAADhFlqcZdaxkjJiMB6TAkFmS0Su7"
          strategy="beforeInteractive"
        />
      </head>
      <body suppressHydrationWarning={true} className="font-body bg-background text-foreground antialiased min-h-screen flex flex-col">
        <Preloader />
        <div className="relative flex flex-col items-center flex-1 w-full">
          <SiteHeader />
          <main className="flex-1 w-full">{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
        <DynamicDiscountPopup />
      </body>
    </html>
  );
}
