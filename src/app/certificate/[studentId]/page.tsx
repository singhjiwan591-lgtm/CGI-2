
'use client';

import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, BookOpen, Download, Share2, Twitter, Linkedin, Facebook, Loader2 } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useEffect, useState } from 'react';

type Student = {
  id: string;
  name: string;
  program: string;
  status: 'Graduated' | 'Enrolled' | 'Withdrawn';
};

type CertificatePageProps = {
  params: { studentId: string };
};

export default function CertificatePage({ params }: CertificatePageProps) {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());

    const fetchStudent = async () => {
      if (!params.studentId) {
        setError('No student ID provided.');
        setLoading(false);
        return;
      }

      try {
        const studentRef = doc(db, 'students', params.studentId);
        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {
          const studentData = studentSnap.data();
          if (studentData.status === 'Graduated') {
            setStudent({ id: studentSnap.id, ...studentData } as Student);
          } else {
            setError('This student has not graduated yet.');
          }
        } else {
          setError('No student found with this ID.');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch student data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [params.studentId]);
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-secondary">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    notFound();
  }
  
  if (!student) {
    // This can happen briefly or if there's an issue before error is set.
    // It can also be the state if a non-graduated student was found.
    // notFound() will handle the error case above.
    return null;
  }

  const handlePrint = () => {
    window.print();
  };
  
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out the certificate for ${student.name} from Web an d App!`;


  return (
    <div className="bg-secondary min-h-screen p-4 sm:p-8 flex items-center justify-center">
        <div className="w-full max-w-4xl">
            <div className="flex flex-col sm:flex-row gap-4 justify-end mb-4 print:hidden">
                <Button onClick={handlePrint}><Download className="mr-2 h-4 w-4" /> Download / Print</Button>
                <div className="flex gap-2">
                    <Button asChild variant="outline">
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer">
                           <Twitter className="h-5 w-5" /> <span className="sr-only">Share on Twitter</span>
                        </a>
                    </Button>
                     <Button asChild variant="outline">
                        <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-5 w-5" /> <span className="sr-only">Share on LinkedIn</span>
                        </a>
                    </Button>
                     <Button asChild variant="outline">
                        <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer">
                            <Facebook className="h-5 w-5" /> <span className="sr-only">Share on Facebook</span>
                        </a>
                    </Button>
                </div>
            </div>
            
            <Card className="p-2 print:shadow-none print:border-none">
                <div className="border-4 border-primary p-4 sm:p-8">
                <div className="border-2 border-primary p-4 sm:p-8 space-y-6 text-center">

                    <header className="flex flex-col items-center">
                        <BookOpen className="h-16 w-16 text-primary" />
                        <h1 className="text-3xl sm:text-4xl font-headline font-bold mt-2">Web an d App</h1>
                    </header>

                    <div className="space-y-2">
                        <p className="text-lg sm:text-xl text-muted-foreground font-headline">hereby presents this</p>
                        <h2 className="text-4xl sm:text-5xl font-bold font-headline text-primary tracking-wider">CERTIFICATE OF GRADUATION</h2>
                        <p className="text-lg sm:text-xl text-muted-foreground font-headline">to</p>
                    </div>

                    <div className="py-4">
                        <p className="text-5xl sm:text-6xl font-bold font-headline tracking-tight">{student.name}</p>
                        <div className="w-3/4 h-0.5 bg-primary mx-auto mt-2"></div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-base sm:text-lg text-muted-foreground">
                            for successfully completing the requirements of the high school diploma with a specialization in
                        </p>
                        <p className="text-2xl sm:text-3xl font-semibold font-headline">{student.program}</p>
                    </div>

                    <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                        <div className="border-t border-foreground pt-2">
                            <p className="font-bold font-headline">Dr. Evelyn Reed</p>
                            <p className="text-muted-foreground">Principal</p>
                        </div>
                        <div className="border-t border-foreground pt-2">
                             <p className="font-bold font-headline">Mr. David Chen</p>
                            <p className="text-muted-foreground">Head of Academics</p>
                        </div>
                    </div>

                    <footer className="pt-4">
                        <p className="text-muted-foreground text-sm">Issued on: {currentDate}</p>
                        <p className="text-muted-foreground text-xs mt-1">Student ID: {student.id}</p>
                    </footer>
                </div>
                </div>
            </Card>
        </div>

        <style jsx global>{`
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                .print-no-bg {
                    background-color: transparent !important;
                }
            }
        `}</style>
    </div>
  );
}
