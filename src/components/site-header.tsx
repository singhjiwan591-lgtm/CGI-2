
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
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
import { ThemeToggle } from './theme-toggle';

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<{ email: string; isLoggedIn: boolean } | null>(null);

  const checkUserStatus = () => {
     if (typeof window !== 'undefined') {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    }
  }

  useEffect(() => {
    setIsMounted(true);
    checkUserStatus();

    // Listen for storage changes to update header in real-time
    const handleStorageChange = () => {
      checkUserStatus();
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };

  }, []);
  
  // Also check on path change, e.g. when navigating back/forward
  useEffect(() => {
    checkUserStatus();
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('user');
      // Dispatch a custom event to notify other components (like this header) immediately
      window.dispatchEvent(new Event('storage'));
    }
    router.push('/login');
  };

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

  const AuthButton = () => {
    if (user && user.isLoggedIn) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src={"https://placehold.co/100x100.png"} data-ai-hint="admin user" />
                <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/admin/dashboard')}>Dashboard</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
       <Button variant="outline" asChild>
          <Link href="/login">Login</Link>
      </Button>
    )
  }

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png" alt="Global Computer Institute Logo" width={40} height={40} style={{ height: 'auto' }} />
            
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
          <Image src="https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png" alt="Global Computer Institute Logo" width={40} height={40} style={{ height: 'auto' }} />
          
        </Link>
        <div className="flex flex-1 items-center justify-end gap-2">
            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-6 text-sm md:flex">
                <NavLinksContent />
                 <AuthButton />
            </nav>
            <ThemeToggle />

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
                    <Image src="https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png" alt="Global Computer Institute Logo" width={40} height={40} style={{ height: 'auto' }}/>
                    
                  </Link>
                </SheetHeader>
              <div className="flex flex-col h-full">
                <nav className="flex flex-col gap-4 py-4 text-lg">
                  <NavLinksContent />
                </nav>
                 <div className="mt-auto flex flex-col gap-2 border-t pt-4">
                    {user ? (
                      <>
                        <Button variant="ghost" asChild onClick={() => { router.push('/admin/dashboard'); setIsMobileMenuOpen(false); }}>
                          <span>Dashboard</span>
                        </Button>
                        <Button variant="outline" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>Logout</Button>
                      </>
                    ) : (
                      <>
                        <Button asChild onClick={() => setIsMobileMenuOpen(false)}>
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button variant="outline" asChild onClick={() => setIsMobileMenuOpen(false)}>
                          <Link href="/register">Enroll Now</Link>
                        </Button>
                      </>
                    )}
                  </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
