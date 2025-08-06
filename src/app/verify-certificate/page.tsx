
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Award, BadgeCheck, XCircle, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

type Student = {
  id: string;
  name: string;
  grade: number;
  status: 'Enrolled' | 'Withdrawn' | 'Graduated';
  email: string;
  program: string;
  avatarHint: string;
  photoURL?: string;
};

type VerificationResult = 'pending' | 'verified' | 'not_found' | 'not_graduated';

export default function VerifyCertificatePage() {
  const [certificateId, setCertificateId] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifiedStudent, setVerifiedStudent] = useState<Student | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<VerificationResult>('pending');

  const handleVerification = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!certificateId) return;

    setLoading(true);
    setVerificationStatus('pending');
    setVerifiedStudent(null);

    try {
        const studentDocRef = doc(db, 'students', certificateId);
        const studentSnap = await getDoc(studentDocRef);

        if (studentSnap.exists()) {
            const studentData = studentSnap.data() as Omit<Student, 'id'>;
            if (studentData.status === 'Graduated') {
                setVerifiedStudent({ id: studentSnap.id, ...studentData });
                setVerificationStatus('verified');
            } else {
                 setVerifiedStudent({ id: studentSnap.id, ...studentData });
                 setVerificationStatus('not_graduated');
            }
        } else {
            setVerificationStatus('not_found');
        }
    } catch (error) {
        console.error("Verification failed:", error);
        setVerificationStatus('not_found');
    } finally {
        setLoading(false);
    }
  };

  const VerificationResultCard = () => {
    if (loading) {
        return (
             <Card className="mx-auto mt-8 max-w-lg">
                <CardContent className="p-6 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                    <p className="mt-2 text-muted-foreground">Verifying...</p>
                </CardContent>
            </Card>
        )
    }

    switch (verificationStatus) {
        case 'verified':
            return verifiedStudent && (
              <Card className="mx-auto mt-8 max-w-lg animate-in fade-in-50">
                <CardHeader className="text-center bg-green-50 text-green-800 rounded-t-lg py-4">
                  <div className="flex items-center justify-center gap-2">
                    <BadgeCheck className="h-7 w-7" />
                    <CardTitle className="text-2xl font-bold">Certificate Verified</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-center">
                    <Avatar className="mx-auto h-24 w-24 border-4 border-green-200">
                        <AvatarImage src={verifiedStudent.photoURL || `https://placehold.co/100x100.png`} data-ai-hint={verifiedStudent.avatarHint} />
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
            );
        
        case 'not_graduated':
             return (
              <Card className="mx-auto mt-8 max-w-lg animate-in fade-in-50">
                <CardHeader className="text-center bg-yellow-50 text-yellow-800 rounded-t-lg py-4">
                    <div className="flex items-center justify-center gap-2">
                        <XCircle className="h-7 w-7" />
                        <CardTitle className="text-2xl font-bold">Record Found</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-center">
                    <p className="text-lg">A record was found for student <span className="font-bold">{verifiedStudent?.name}</span>, but they have not graduated yet.</p>
                </CardContent>
              </Card>
            );

        case 'not_found':
            return (
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
            );

        default:
            return null;
    }
  }


  return (
    <div className="flex flex-col items-center bg-secondary min-h-screen">
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
                  disabled={loading}
                />
              </div>
              <Button type="submit" size="lg" className="h-11" disabled={loading || !certificateId}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="mr-2 h-5 w-5" />}
                {loading ? '' : 'Verify'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <VerificationResultCard />

      </section>
    </div>
  );
}
