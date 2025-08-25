
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getStudentByEmail } from '@/lib/student-data-service';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from './ui/checkbox';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
  rememberMe: z.boolean().default(false).optional(),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    // Case 1: Admin Login
    if (values.email === 'admin@webandapp.edu' && values.password === 'admin123') {
      toast({
        title: 'Admin Login Successful',
        description: 'Redirecting to your dashboard...',
      });
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('user', JSON.stringify({ email: values.email, isLoggedIn: true }));
        sessionStorage.removeItem('studentUser'); // Clear student session if any
      }
      router.push('/admin/dashboard');
      return;
    }

    // Case 2: Student Login
    const student = getStudentByEmail(values.email);

    if (student && student.password === values.password) {
       toast({
        title: 'Login Successful',
        description: 'Welcome back! Redirecting to your dashboard...',
      });
      if (typeof window !== 'undefined') {
          sessionStorage.setItem('studentUser', JSON.stringify({ 
            email: student.email, 
            name: student.name, 
            photoURL: student.photoURL,
            avatarHint: student.avatarHint
          }));
          sessionStorage.removeItem('user'); // Clear admin session if any
      }
      router.push('/student/dashboard');
    } else {
       toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email or password. Please try again.',
      });
    }
    setLoading(false);
  }

  return (
    <div className="w-full">
        <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold font-headline">Portal Login</h1>
            <p className="text-balance text-muted-foreground">
             Welcome back! Please enter your details to log in.
            </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
                <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                        <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={loading}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                        Remember me
                        </FormLabel>
                    </div>
                    </FormItem>
                )}
                />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
           Ready to start your tech journey?{' '}
          <Link href="/register" className="underline">
            Enroll Now
          </Link>
        </div>
    </div>
  );
}
