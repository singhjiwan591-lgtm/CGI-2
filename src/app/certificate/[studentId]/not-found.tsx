import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
        <FileQuestion className="h-24 w-24 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline">Certificate Not Found</h1>
        <p className="text-muted-foreground mt-2 max-w-md">
            The student ID you entered does not exist or the student has not yet graduated. Please check the ID and try again.
        </p>
        <div className="mt-6 flex gap-4">
            <Button asChild>
                <Link href="/verify-certificate">Try Again</Link>
            </Button>
            <Button asChild variant="outline">
                <Link href="/">Return to Home</Link>
            </Button>
        </div>
    </div>
  );
}
