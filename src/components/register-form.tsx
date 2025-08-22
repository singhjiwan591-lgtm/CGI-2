
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Loader2, CreditCard } from 'lucide-react';

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
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  fatherName: z.string().min(2, { message: "Father's name must be at least 2 characters." }),
  motherName: z.string().min(2, { message: "Mother's name must be at least 2 characters." }),
  village: z.string().min(2, { message: 'Village must be at least 2 characters.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string(),
  course: z.string().optional(),
  terms: z.boolean().default(false).refine(val => val === true, {
    message: 'You must accept the terms and conditions.',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export function RegisterForm({ selectedCourse }: { selectedCourse?: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid'>('pending');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      fatherName: '',
      motherName: '',
      village: '',
      password: '',
      confirmPassword: '',
      course: selectedCourse || '',
      terms: false,
    },
  });

  useEffect(() => {
    if (selectedCourse) {
      form.setValue('course', selectedCourse);
    }
  }, [selectedCourse, form]);

  const handleConfirmPayment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPaymentLoading(true);
    setTimeout(() => {
      setPaymentLoading(false);
      setPaymentStatus('paid');
      setIsPaymentDialogOpen(false);
      toast({
        title: 'Payment Successful',
        description: 'You can now fill out the registration form.',
      });
    }, 1500);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (paymentStatus !== 'paid') {
      toast({
        variant: 'destructive',
        title: 'Payment Required',
        description: 'Please pay the registration fee to continue.',
      });
      return;
    }
    setLoading(true);
    // Mock registration logic
    setTimeout(() => {
        console.log("New user registered (mock):", values);
        if(photoFile) {
          console.log("Photo file:", photoFile.name);
        }
        toast({
            title: 'Registration Submitted!',
            description: "Your application has been received. You will be contacted shortly.",
        });
        form.reset();
        setPhotoFile(null);
        router.push('/login');
        setLoading(false);
    }, 1000);
  }
  
  const isFormDisabled = loading || paymentStatus !== 'paid';

  return (
    <>
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Enroll Now</CardTitle>
            <CardDescription>
              {paymentStatus === 'pending'
                ? 'Pay the registration fee to unlock the form.'
                : 'Create an account to begin your application.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentStatus === 'pending' ? (
              <div className="space-y-4 rounded-lg border bg-secondary/50 p-6 text-center">
                <h3 className="text-lg font-semibold">Registration Fee</h3>
                <p className="text-sm text-muted-foreground">
                  A non-refundable registration fee of ₹100 is required to proceed with your application.
                </p>
                <p className="text-4xl font-bold">₹100</p>
                <Button type="button" onClick={() => setIsPaymentDialogOpen(true)} className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay to Proceed
                </Button>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in-50">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Full Name" {...field} disabled={isFormDisabled} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormItem>
                  <FormLabel>Your Passport-size Photo</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files ? e.target.files[0] : null)} disabled={isFormDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                 <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Father's Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Father's Full Name" {...field} disabled={isFormDisabled} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="motherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mother's Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Mother's Full Name" {...field} disabled={isFormDisabled} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="Your Phone Number" {...field} disabled={isFormDisabled} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="village"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Village</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Village" {...field} disabled={isFormDisabled} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {selectedCourse && (
                   <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selected Course</FormLabel>
                        <FormControl>
                          <Input readOnly disabled {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} disabled={isFormDisabled} />
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
                      <FormLabel>Create a Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} disabled={isFormDisabled} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} disabled={isFormDisabled} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isFormDisabled}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the admissions{' '}
                          <Link href="#" className="underline hover:text-primary">
                            Terms & Conditions
                          </Link>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isFormDisabled}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Submitting...' : 'Create Account & Continue'}
              </Button>
              <p className="text-sm text-foreground/80">
                Already have an account?{' '}
                <Button variant="link" asChild className="p-0 h-auto">
                  <Link href="/login">Login</Link>
                </Button>
              </p>
          </CardFooter>
        </form>
      </Form>
    </Card>

    <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Secure Payment</DialogTitle>
          <DialogDescription>
            Enter your payment details to complete the registration fee payment of ₹100.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input id="card-number" placeholder="4242 4242 4242 4242" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="expiry-date">Expiry Date</Label>
                <Input id="expiry-date" placeholder="MM / YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="card-holder">Card Holder Name</Label>
              <Input id="card-holder" placeholder="Your Name" />
            </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>Cancel</Button>
          <Button type="button" onClick={handleConfirmPayment} disabled={paymentLoading}>
             {paymentLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CreditCard className="mr-2 h-4 w-4" />
              )}
              {paymentLoading ? 'Processing...' : 'Pay ₹100'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}
