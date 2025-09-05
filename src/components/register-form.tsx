
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

declare global {
    interface Window {
        Razorpay: any;
    }
}

const formSchema = z.object({
  schoolId: z.string({ required_error: 'Please select a branch.' }),
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

  const processRegistration = async (formData: FormValues, paymentId: string) => {
    try {
        const studentData = {
            name: formData.fullName,
            email: formData.email,
            phone: formData.phoneNumber,
            parent: formData.fatherName,
            motherName: formData.motherName,
            grade: formData.grade,
            gender: formData.gender,
            address: formData.village,
            dob: formData.dob,
            photoURL: photoDataUrl || undefined,
            password: formData.password,
            course: formData.course,
            registrationFeePaid: true,
        };
        const newStudent = addStudent(studentData, formData.schoolId);

        if (!newStudent) {
            throw new Error('Could not save student data.');
        }
        
        toast({
            title: 'Registration Successful!',
            description: `Payment ID: ${paymentId}. You will be redirected to login.`,
        });

        form.reset();
        setPhotoDataUrl(null);

        setTimeout(() => router.push('/login'), 2000);

    } catch (error) {
         toast({
            variant: 'destructive',
            title: 'Registration Failed',
            description: 'There was a problem saving your data. Please try again.',
        });
    } finally {
        setLoading(false);
    }
  };

  async function onSubmit(values: FormValues) {
    setLoading(true);

    const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: 100 * 100, // Amount in paise (100 INR)
        currency: "INR",
        name: "Global Computer Institute",
        description: "Registration Fee",
        image: "https://i.ibb.co/5X00XdH9/0cbf6ee1-8add-4c4e-afdf-1d7eb2a4d1e7.png",
        handler: function (response: any) {
            processRegistration(values, response.razorpay_payment_id);
        },
        prefill: {
            name: values.fullName,
            email: values.email,
            contact: values.phoneNumber,
        },
        notes: {
            address: values.village,
        },
        theme: {
            color: "#3B82F6",
        },
        modal: {
            ondismiss: function() {
                setLoading(false); // Re-enable the button if the user closes the modal
                toast({
                    variant: "destructive",
                    title: "Payment Cancelled",
                    description: "You cancelled the payment process.",
                })
            }
        }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
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
          <CardContent className="pt-0">
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-4">
              <div className="space-y-4 animate-in fade-in-50">
                 <FormField
                  control={form.control}
                  name="schoolId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Branch</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select the school branch" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="jalalabad">Jalalabad</SelectItem>
                          <SelectItem value="golu_ka_mor">Golu Ka Mor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Processing...' : 'Pay ₹100 & Register'}
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
    </>
  );
}

    
