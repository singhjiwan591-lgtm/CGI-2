
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#042954] text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-4 md:gap-8 md:text-left">
          
          {/* About Section */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center justify-center md:justify-start space-x-3 mb-4">
              <Image src="https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png" alt="Global Computer Institute Logo" width={50} height={50} style={{ height: 'auto' }} />
              <span className="font-headline text-2xl font-bold text-white">Global Computer Institute</span>
            </Link>
            <p className="mt-2 text-gray-400">
              Building the future of technology, one student at a time. We are committed to providing top-quality, practical training that empowers our students to thrive in the dynamic digital landscape.
            </p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="font-headline text-lg font-semibold text-white tracking-wider">Quick Links</h3>
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
            <h3 className="font-headline text-lg font-semibold text-white tracking-wider">Contact Us</h3>
            <ul className="mt-4 space-y-3">
               <li className="flex items-start justify-center md:justify-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>Main Road, Near Bus Stand, Jalalabad (West), Punjab</span>
                </li>
                 <li className="flex items-center justify-center md:justify-start gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>(123) 555-2024</span>
                </li>
                 <li className="flex items-center justify-center md:justify-start gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>admissions@webandapp.edu</span>
                </li>
            </ul>
             <div className="mt-6 flex justify-center md:justify-start space-x-4">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-gray-400 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-gray-400 hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Global Computer Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
