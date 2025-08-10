
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Download, Twitter, Linkedin, Facebook } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Student = {
  id: string;
  name: string;
  program: string;
  status: 'Graduated' | 'Enrolled' | 'Withdrawn';
};

async function getStudent(studentId: string): Promise<Student | null> {
    if (!studentId) return null;

    try {
        const studentRef = doc(db, 'students', studentId);
        const studentSnap = await getDoc(studentRef);

        if (studentSnap.exists()) {
            const studentData = studentSnap.data();
            if (studentData.status === 'Graduated') {
                return { id: studentSnap.id, ...studentData } as Student;
            }
        }
    } catch (err) {
        console.error('Failed to fetch student data:', err);
    }
    return null;
}

export default async function CertificatePage({ params }: { params: { studentId: string } }) {
  const student = await getStudent(params.studentId);
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (!student) {
    notFound();
  }

  // NOTE: Sharing functionality will not work in a Server Component as it requires client-side window object.
  // For a real app, this would need to be extracted into a client component.
  const shareUrl = `https://your-app-domain.com/certificate/${student.id}`;
  const shareText = `Check out the certificate for ${student.name} from Web and App!`;


  return (
    <div className="bg-secondary min-h-screen p-4 sm:p-8 flex items-center justify-center">
        <div className="w-full max-w-4xl">
            <div className="flex flex-col sm:flex-row gap-4 justify-end mb-4 print:hidden">
                <Button><Download className="mr-2 h-4 w-4" /> Download / Print</Button>
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
                        <h1 className="text-3xl sm:text-4xl font-headline font-bold mt-2">Web and App</h1>
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
