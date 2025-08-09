
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

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

import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '@/lib/firebase';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
  rememberMe: z.boolean().default(false).optional(),
});

declare global {
    interface Window {
      grecaptcha: any;
    }
}

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

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
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
        toast({ variant: 'destructive', title: 'Client-side Error', description: 'reCAPTCHA site key is not configured.' });
        setLoading(false);
        return;
    }

    grecaptcha.enterprise.ready(async () => {
      try {
        const token = await grecaptcha.enterprise.execute(siteKey, {action: 'LOGIN'});
        if (!token) {
            throw new Error('reCAPTCHA verification failed. Please try again.');
        }
        
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast({
          title: 'Login Successful',
          description: 'Redirecting to your dashboard...',
        });
        // Redirect to admin dashboard if admin logs in, otherwise to a general user page
        if (values.email === 'admin@example.com') {
          router.push('/admin/dashboard');
        } else {
          router.push('/'); 
        }
      } catch (error: any) {
        let errorMessage = 'Invalid email or password. Please try again.';
        if (error.message.includes('reCAPTCHA')) {
            errorMessage = error.message;
        }
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    });
  }

  const handleGoogleLogin = async () => {
    setLoading(true);
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
        toast({ variant: 'destructive', title: 'Client-side Error', description: 'reCAPTCHA site key is not configured.' });
        setLoading(false);
        return;
    }
     grecaptcha.enterprise.ready(async () => {
        try {
            const token = await grecaptcha.enterprise.execute(siteKey, {action: 'LOGIN_GOOGLE'});
            if (!token) {
                throw new Error('reCAPTCHA verification failed. Please try again.');
            }

            await signInWithPopup(auth, googleProvider);
            toast({
                title: 'Login Successful',
                description: 'Welcome!',
            });
            router.push('/');
        } catch (error: any) {
            let errorMessage = 'Could not log in with Google. Please try again.';
            if (error.message.includes('reCAPTCHA')) {
                errorMessage = error.message;
            }
            toast({
                variant: 'destructive',
                title: 'Google Login Failed',
                description: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    });
  }
  
  const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
  );

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
                    <Input type="email" placeholder="admin@example.com" {...field} />
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
                    <Input type="password" placeholder="••••••••" {...field} />
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
            <Button variant="outline" type="button" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <GoogleIcon />
              Log in with Google
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
