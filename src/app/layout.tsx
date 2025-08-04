
import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from '@/components/ui/toaster';
import { DiscountPopup } from '@/components/discount-popup';
import { Preloader } from '@/components/preloader';

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: {
    default: 'Global Computer Institute | Jalalabad (West), Punjab',
    template: '%s | Global Computer Institute',
  },
  description: 'Join Global Computer Institute in Jalalabad (West), Punjab for expert-led courses in Web Development, Data Science, Accounting, ADCA, CCA, and more. Start your tech career with us!',
  keywords: ['Computer Institute Jalalabad', 'Global Computer Institute', 'Computer Courses', 'ADCA', 'DCA', 'Web Development Course', 'Learn HTML', 'Typing Course', 'Punjab Computer Education'],
  authors: [{ name: 'Global Computer Institute', url: 'https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png' }],
  creator: 'Global Computer Institute',
  icons: {
    icon: 'https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png',
    shortcut: 'https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png',
    apple: 'https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png',
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
  viewport: 'width=device-width, initial-scale=1',
  robots: {
    index: true,
    follow: true,
  },
  assets: ['https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png/assets'],
  category: 'Education',
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
      </head>
      <body className="font-body bg-background text-foreground antialiased min-h-screen flex flex-col">
        <Preloader />
        <div className="relative flex flex-col items-center flex-1 w-full">
          <SiteHeader />
          <main className="flex-1 w-full">{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
        <DiscountPopup />
      </body>
    </html>
  );
}
