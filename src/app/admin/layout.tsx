
'use client';

import Link from 'next/link';
import {
  Bell,
  Fingerprint,
  Home,
  LineChart,
  Users,
  DollarSign,
  Menu,
  MessageSquare,
  Loader2,
  User,
  Shield,
  Book,
  Briefcase,
  Users2,
  Library,
  Banknote,
  GraduationCap,
  BookCopy,
  CalendarClock,
  PencilRuler,
  Bus,
  Bed,
  Megaphone,
  Mail,
  Component,
  Map,
  Settings,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

const navLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { 
    label: 'Academics', 
    icon: GraduationCap,
    subLinks: [
      { href: '/admin/students', label: 'Students', icon: Users2 },
      { href: '/admin/parents', label: 'Parents', icon: Users },
      { href: '/admin/teachers', label: 'Teachers', icon: Briefcase },
    ]
  },
  { 
    label: 'Class', 
    icon: Book,
    subLinks: [
       { href: '/admin/class', label: 'All Classes', icon: Book },
       { href: '/admin/subject', label: 'Subjects', icon: BookCopy },
       { href: '/admin/class-routine', label: 'Class Routine', icon: CalendarClock },
    ]
  },
   { 
    label: 'Accounting', 
    icon: Banknote,
    subLinks: [
       { href: '/admin/fees', label: 'Collect Fees', icon: DollarSign },
       { href: '/admin/account', label: 'Expense', icon: Banknote },
    ]
  },
  { href: '/admin/attendance', label: 'Attendance', icon: Fingerprint },
  { href: '/admin/exam', label: 'Exam', icon: PencilRuler },
  { href: '/admin/library', label: 'Library', icon: Library },
  { href: '/admin/transport', label: 'Transport', icon: Bus },
  { href: '/admin/hostel', label: 'Hostel', icon: Bed },
  { href: '/admin/notice', label: 'Notice', icon: Megaphone },
  { href: '/admin/messages', label: 'Message', icon: Mail },
  { href: '/admin/account-settings', label: 'Settings', icon: Settings },
];

const NavItem = ({ link, pathname, closeSheet }: { link: any, pathname: string, closeSheet?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isSubActive = link.subLinks?.some((sub: any) => pathname.startsWith(sub.href));

  useEffect(() => {
    if(isSubActive) {
      setIsOpen(true);
    }
  }, [isSubActive]);

  const handleClick = () => {
    if(link.subLinks) {
        setIsOpen(!isOpen);
    } else {
        if (closeSheet) closeSheet();
    }
  }

  if (link.subLinks) {
    return (
      <div>
        <button
          onClick={handleClick}
          className={cn(
            "w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            (isOpen || isSubActive) && "text-primary bg-primary/10"
          )}
        >
          <div className="flex items-center gap-3">
            <link.icon className="h-4 w-4" />
            {link.label}
          </div>
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>
        {isOpen && (
          <div className="pl-6 pt-2 flex flex-col gap-1">
            {link.subLinks.map((subLink: any) => (
              <Link
                key={subLink.href}
                href={subLink.href}
                onClick={closeSheet}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-sm",
                  pathname.startsWith(subLink.href) && "text-primary bg-primary/10"
                )}
              >
                <subLink.icon className="h-4 w-4" />
                {subLink.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={link.href}
      onClick={closeSheet}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        pathname === link.href && "text-primary bg-primary/10"
      )}
    >
      <link.icon className="h-4 w-4" />
      {link.label}
    </Link>
  );
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; isLoggedIn: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.isLoggedIn) {
        setUser(parsedUser);
      } else {
         router.push('/login');
      }
    } else {
      router.push('/login');
    }
    setLoading(false);
  }, [router]);
  
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-2">Loading Dashboard...</p>
        </div>
    )
  }

  if (!user) {
    return null; // or a redirect component
  }
  
  const pageTitle = navLinks.flatMap(l => l.subLinks || l).find(l => pathname.startsWith(l.href))?.label || 'Admin';
  
  const closeSheet = () => setIsSheetOpen(false);

  return (
      <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
              <Image src="https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png" alt="Logo" width={32} height={32} />
              <span className="text-xl font-headline text-foreground">GCI Admin</span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="grid items-start p-2 text-sm font-medium">
              {navLinks.map((link, index) => (
                  <NavItem key={index} link={link} pathname={pathname} />
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-muted/40">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col bg-card p-0">
               <SheetHeader className="border-b p-4">
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                  <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
                    <Image src="https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png" alt="Logo" width={32} height={32} />
                    <span className="text-xl font-headline text-foreground">GCI Admin</span>
                  </Link>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto">
                <nav className="grid gap-2 text-base font-medium p-2">
                  {navLinks.map((link, index) => (
                    <NavItem key={index} link={link} pathname={pathname} closeSheet={closeSheet} />
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
             <h1 className="text-lg font-semibold hidden md:block">Welcome, Admin!</h1>
             <p className="text-sm text-muted-foreground hidden md:block">Home &gt; {pageTitle}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer">
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src={"https://placehold.co/100x100.png"} data-ai-hint="admin user" />
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
                <div className="hidden sm:block">
                  <p className="font-semibold text-sm">Admin</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/admin/dashboard')}>
                <Home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/admin/account-settings')}>
                 <Settings className="mr-2 h-4 w-4" />
                 <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
