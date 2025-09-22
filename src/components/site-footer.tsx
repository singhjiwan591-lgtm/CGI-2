
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

export function SiteFooter() {
  return (
    <footer className="w-full bg-card text-foreground/80 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-4 md:gap-8 md:text-left">
          
          {/* About Section */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center justify-center md:justify-start space-x-3 mb-4">
              <Image src="https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png" alt="Global Computer Institute Logo" width={50} height={50} style={{ height: 'auto' }} />
              <span className="font-headline text-2xl font-bold text-foreground">Global Computer Institute</span>
            </Link>
            <p className="mt-2 text-muted-foreground">
              Building the future of technology, one student at a time. We are committed to providing top-quality, practical training that empowers our students to thrive in the dynamic digital landscape.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/academics" className="hover:text-primary transition-colors">Courses</Link></li>
              <li><Link href="/admissions" className="hover:text-primary transition-colors">Admissions</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/verify-certificate" className="hover:text-primary transition-colors">Verify Certificate</Link></li>
            </ul>
          </div>
          
          {/* Contact & Socials */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-foreground tracking-wider">Contact Us</h3>
            <ul className="mt-4 space-y-3">
               <li className="flex items-start justify-center md:justify-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>Main Road, Near Bus Stand, Jalalabad (West), Punjab</span>
                </li>
                 <li className="flex items-center justify-center md:justify-start gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>+91 85669 50470</span>
                </li>
                 <li className="flex items-center justify-center md:justify-start gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>admissions@webandapp.edu</span>
                </li>
            </ul>
             <div className="mt-6 flex justify-center md:justify-start space-x-4">
              <Link href="https://facebook.com/your-page" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="https://instagram.com/your-handle" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="https://linkedin.com/company/your-company" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Global Computer Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

    