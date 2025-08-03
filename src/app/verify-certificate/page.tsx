
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Award, UserCheck, UserX, BadgeCheck, XCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

type Student = {
  id: string;
  name: string;
  grade: number;
  status: 'Enrolled' | 'Withdrawn' | 'Graduated';
  email: string;
  program: string;
  avatarHint: string;
};

// Mock student data - in a real application, this would come from a database.
const students: Student[] = [
  { id: '24001', name: 'Olivia Martin', grade: 10, status: 'Enrolled', email: 'olivia.martin@example.com', program: 'Science', avatarHint: 'student portrait' },
  { id: '24002', name: 'Jackson Lee', grade: 9, status: 'Enrolled', email: 'jackson.lee@example.com', program: 'Arts', avatarHint: 'boy student' },
  { id: '24003', name: 'Sofia Nguyen', grade: 11, status: 'Enrolled', email: 'sofia.nguyen@example.com', program: 'Technology', avatarHint: 'girl smiling' },
  { id: '24004', name: 'Isabella Patel', grade: 12, status: 'Graduated', email: 'isabella.patel@example.com', program: 'Math', avatarHint: 'boy glasses' },
  { id: '24005', name: 'William Kim', grade: 9, status: 'Enrolled', email: 'william.kim@example.com', program: 'Arts', avatarHint: 'student smiling' },
  { id: '24006', name: 'Ava Brown', grade: 10, status: 'Withdrawn', email: 'ava.brown@example.com', program: 'Science', avatarHint: 'girl portrait' },
];

type VerificationResult = 'pending' | 'verified' | 'not_found';

export default function VerifyCertificatePage() {
  const [certificateId, setCertificateId] = useState('');
  const [verifiedStudent, setVerifiedStudent] = useState<Student | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<VerificationResult>('pending');

  const handleVerification = (event: React.FormEvent) => {
    event.preventDefault();
    const student = students.find(s => s.id === certificateId);
    if (student) {
      setVerifiedStudent(student);
      setVerificationStatus('verified');
    } else {
      setVerifiedStudent(null);
      setVerificationStatus('not_found');
    }
  };

  return (
    <div className="flex flex-col items-center bg-secondary">
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-headline text-3xl font-bold md:text-5xl">Certificate Verification</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-foreground/80 md:text-lg">
            Enter the student ID from the certificate to verify its authenticity.
          </p>
        </div>
      </section>

      <section className="container mx-auto -mt-16 mb-20 px-4">
        <Card className="mx-auto max-w-lg shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-primary" />
              <span>Verification Portal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerification} className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-grow">
                <Label htmlFor="certificateId" className="sr-only">Certificate ID</Label>
                <Input
                  id="certificateId"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="Enter Student ID..."
                  className="h-11 text-base"
                />
              </div>
              <Button type="submit" size="lg" className="h-11">
                <Search className="mr-2 h-5 w-5" />
                Verify
              </Button>
            </form>
          </CardContent>
        </Card>

        {verificationStatus === 'verified' && verifiedStudent && (
          <Card className="mx-auto mt-8 max-w-lg animate-in fade-in-50">
            <CardHeader className="text-center bg-green-50 text-green-800 rounded-t-lg py-4">
              <div className="flex items-center justify-center gap-2">
                <BadgeCheck className="h-7 w-7" />
                <CardTitle className="text-2xl font-bold">Certificate Verified</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-center">
                <Avatar className="mx-auto h-24 w-24 border-4 border-green-200">
                    <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint={verifiedStudent.avatarHint} />
                    <AvatarFallback>{verifiedStudent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="mt-4 text-2xl font-bold">{verifiedStudent.name}</h3>
                <p className="text-muted-foreground">Student ID: {verifiedStudent.id}</p>
                <div className="mt-6 grid grid-cols-2 gap-4 text-left">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Grade</p>
                        <p className="font-semibold">{verifiedStudent.grade}th Grade</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Program</p>
                        <p className="font-semibold">{verifiedStudent.program}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p className="font-semibold">{verifiedStudent.email}</p>
                    </div>
                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                        <Badge variant={verifiedStudent.status === 'Graduated' ? 'default' : 'secondary'} className={verifiedStudent.status === 'Graduated' ? 'bg-primary' : ''}>
                          {verifiedStudent.status}
                        </Badge>
                    </div>
                </div>
            </CardContent>
          </Card>
        )}

        {verificationStatus === 'not_found' && (
          <Card className="mx-auto mt-8 max-w-lg animate-in fade-in-50">
            <CardHeader className="text-center bg-red-50 text-red-800 rounded-t-lg py-4">
                <div className="flex items-center justify-center gap-2">
                    <XCircle className="h-7 w-7" />
                    <CardTitle className="text-2xl font-bold">Verification Failed</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="p-6 text-center">
                <p className="text-lg">No valid record was found for the entered ID. Please check the ID and try again.</p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
