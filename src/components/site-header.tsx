
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Image from 'next/image';


export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/academics', label: 'Courses' },
    { href: '/admissions', label: 'Admissions' },
    { href: '/contact', label: 'Contact' },
  ];

  const NavLinksContent = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === link.href
              ? 'text-foreground font-semibold'
              : 'text-foreground/60'
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png" alt="Global Computer Institute Logo" width={40} height={40} />
            
          </Link>
          <div className="flex flex-1 items-center justify-end">
             {/* Render a placeholder or nothing on the server for the dynamic parts */}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png" alt="Global Computer Institute Logo" width={40} height={40} />
          
        </Link>
        <div className="flex flex-1 items-center justify-end gap-2">
            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-6 text-sm md:flex">
                <NavLinksContent />
            </nav>
            <div className="hidden md:flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                       <Avatar>
                        <AvatarImage src="https://i.ibb.co/TDhF0sY8/IMG-20250804-WA0006.jpg" data-ai-hint="user portrait" />
                        <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                      </Avatar>
                      <span className="sr-only">Toggle user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild><Link href="/login">Portal Login</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/register">Register</Link></DropdownMenuItem>
                    <DropdownMenuItem asChild><Link href="/admin/dashboard">Admin Dashboard</Link></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

            </div>

            {/* Mobile Navigation */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader className="border-b pb-4">
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                  <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image src="https://i.ibb.co/dwFFgmGS/1000058336-removebg-preview.png" alt="Global Computer Institute Logo" width={40} height={40} />
                    
                  </Link>
                </SheetHeader>
              <div className="flex flex-col h-full">
                <nav className="flex flex-col gap-4 py-4 text-lg">
                  <NavLinksContent />
                </nav>
                 <div className="mt-auto flex flex-col gap-2 border-t pt-4">
                    <Button variant="ghost" asChild onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/login">Portal Login</Link>
                    </Button>
                    <Button asChild onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/register">Enroll Now</Link>
                    </Button>
                    <Button variant="outline" asChild onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/admin/dashboard">Admin Dashboard</Link>
                    </Button>
                  </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
