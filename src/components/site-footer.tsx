
import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';

export function SiteFooter() {
  return (
    <footer className="w-full bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4 md:text-left">
          <div className="flex flex-col items-center md:items-start md:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png" alt="Web an d App Logo" width={40} height={40} style={{ height: 'auto' }} />
            </Link>
            <p className="mt-4 text-foreground/70">
              Building the future of technology, one student at a time.
            </p>
          </div>
          <div className="md:mx-auto">
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/academics" className="hover:text-primary transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-primary transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
               <li>
                <Link href="/verify-certificate" className="hover:text-primary transition-colors">
                  Verify Certificate
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:ml-auto md:text-right">
            <h3 className="font-headline text-lg font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4 justify-center md:justify-end">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-foreground/70 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} Web an d App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
