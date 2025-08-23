
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';
import { addStudent } from '@/lib/student-data-service';

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
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phoneNumber: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  fatherName: z.string().min(2, { message: "Father's name must be at least 2 characters." }),
  motherName: z.string().min(2, { message: "Mother's name must be at least 2 characters." }),
  village: z.string().min(2, { message: 'Village must be at least 2 characters.' }),
  grade: z.string().min(1, { message: 'Grade is required.' }),
  gender: z.string().min(1, { message: 'Gender is required.' }),
  dob: z.string().min(1, { message: 'Date of Birth is required.' }),
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

type FormValues = z.infer<typeof formSchema>;

export function RegisterForm({ selectedCourse }: { selectedCourse?: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [pendingRegistrationData, setPendingRegistrationData] = useState<FormValues | null>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      fatherName: '',
      motherName: '',
      village: '',
      grade: '',
      gender: '',
      dob: '',
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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmPayment = async () => {
    if (!pendingRegistrationData) return;

    setPaymentLoading(true);

    try {
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay for payment processing
        
        const studentData = {
            name: pendingRegistrationData.fullName,
            email: pendingRegistrationData.email,
            phone: pendingRegistrationData.phoneNumber,
            parent: pendingRegistrationData.fatherName,
            motherName: pendingRegistrationData.motherName,
            grade: pendingRegistrationData.grade,
            gender: pendingRegistrationData.gender,
            address: pendingRegistrationData.village,
            dob: pendingRegistrationData.dob,
            photoURL: photoDataUrl || undefined,
        };
        const newStudent = addStudent(studentData);

        if (!newStudent) {
            throw new Error('Could not save student data.');
        }
        
        toast({
            title: 'Registration Successful!',
            description: "Your application has been received. You will be redirected to login.",
        });

        setIsPaymentDialogOpen(false);
        form.reset();
        setPendingRegistrationData(null);
        setPhotoDataUrl(null);

        setTimeout(() => router.push('/login'), 1500);

    } catch (error) {
         toast({
            variant: 'destructive',
            title: 'Registration Failed',
            description: 'There was a problem saving your data. Please try again.',
        });
    } finally {
        setPaymentLoading(false);
        setLoading(false);
    }
  };

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setPendingRegistrationData(values);
    
    // Simulate reCAPTCHA verification or other checks before showing payment dialog
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsPaymentDialogOpen(true);
  }

  return (
    <>
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Enroll Now</CardTitle>
            <CardDescription>
              Create an account to begin your application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
              <div className="space-y-4 animate-in fade-in-50">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Full Name" {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormItem>
                  <FormLabel>Your Passport-size Photo</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" disabled={loading} onChange={handlePhotoUpload} />
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
                        <Input placeholder="Father's Full Name" {...field} disabled={loading} />
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
                        <Input placeholder="Mother's Full Name" {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} disabled={loading} />
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
                        <Input type="tel" placeholder="Your Phone Number" {...field} disabled={loading} />
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
                      <FormLabel>Village / Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Village / Address" {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class / Grade</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 12" {...field} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Male, Female" {...field} disabled={loading} />
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
                      <FormLabel>Email Address (for Login)</FormLabel>
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
                      <FormLabel>Create a Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} disabled={loading} />
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
                        <Input type="password" placeholder="••••••••" {...field} disabled={loading} />
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
                          disabled={loading}
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
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Verifying...' : 'Create Account & Continue'}
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

    <Dialog open={isPaymentDialogOpen} onOpenChange={ (isOpen) => {
        setIsPaymentDialogOpen(isOpen);
        if (!isOpen) {
          setLoading(false); // Reset loading state if dialog is closed manually
          setPendingRegistrationData(null);
        }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Final Step: Registration Fee</DialogTitle>
          <DialogDescription>
            A non-refundable registration fee of ₹100 is required to complete your application. This payment is processed securely.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <ShieldCheck className="h-16 w-16 text-green-500" />
            <p className="text-center text-muted-foreground">You are about to make a secure payment. We do not store your card details.</p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsPaymentDialogOpen(false)} disabled={paymentLoading}>Cancel</Button>
          <Button type="button" onClick={handleConfirmPayment} disabled={paymentLoading}>
             {paymentLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {paymentLoading ? 'Processing...' : 'Pay ₹100 Securely'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}
