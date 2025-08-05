
import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Toaster } from '@/components/ui/toaster';
import { DiscountPopup } from '@/components/discount-popup';
import { Preloader } from '@/components/preloader';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    default: 'Web an d App | Jalalabad (West), Punjab',
    template: '%s | Web an d App',
  },
  description: 'Join Web an d App in Jalalabad (West), Punjab for expert-led courses in Web Development, Data Science, Accounting, ADCA, CCA, and more. Start your tech career with us!',
  keywords: ['Computer Institute Jalalabad', 'Web an d App', 'Computer Courses', 'ADCA', 'DCA', 'Web Development Course', 'Learn HTML', 'Typing Course', 'Punjab Computer Education'],
  authors: [{ name: 'Web an d App', url: 'https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png' }],
  creator: 'Web an d App',
  icons: {
    icon: 'https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png',
    shortcut: 'https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png',
    apple: 'https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png',
    title: 'Web an d App | Best Tech Education in Jalalabad',
    description: 'Empowering the next generation of tech leaders with practical skills and placement assistance.',
    images: [
      {
        url: 'https://i.ibb.co/6RdhCvSg/Compress-JPEG-Online-img-800x600.jpg',
        width: 800,
        height: 600,
        alt: 'Students learning at Web an d App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web an d App | Start Your Tech Career',
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
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied'
            });
          `}
        </Script>
        
        {/* PASTE YOUR COOKIEHUB CMP CODE SNIPPET HERE */}

        <Script src="https://www.google.com/recaptcha/enterprise.js?render=6LfKyJorAAAAAFAe9pw-5iKhu74C63ieHcwflRXG" strategy="beforeInteractive" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B8YMN5JCXM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            gtag('js', new Date());
            gtag('config', 'G-B8YMN5JCXM');
          `}
        </Script>
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
