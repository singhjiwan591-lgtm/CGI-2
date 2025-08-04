
'use client';

import { useState } from 'react';
import { Fingerprint, LogIn, LogOut, Search } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const initialStudents = [
  { id: 'S001', name: 'Olivia Martin', grade: 10, status: 'Present', clockedIn: '08:30 AM', clockedOut: null, avatarHint: 'student portrait', photoURL: 'https://placehold.co/100x100.png' },
  { id: 'S002', name: 'Jackson Lee', grade: 9, status: 'Present', clockedIn: '08:25 AM', clockedOut: null, avatarHint: 'boy student', photoURL: 'https://placehold.co/100x100.png' },
  { id: 'S003', name: 'Sofia Nguyen', grade: 11, status: 'Absent', clockedIn: null, clockedOut: null, avatarHint: 'girl smiling', photoURL: 'https://placehold.co/100x100.png' },
  { id: 'S004', name: 'Isabella Patel', grade: 12, status: 'Present', clockedIn: '08:32 AM', clockedOut: null, avatarHint: 'boy glasses', photoURL: 'https://placehold.co/100x100.png' },
  { id: 'S005', name: 'William Kim', grade: 9, status: 'Late', clockedIn: '09:05 AM', clockedOut: null, avatarHint: 'student smiling', photoURL: 'https://placehold.co/100x100.png' },
  { id: 'S006', name: 'Ava Brown', grade: 10, status: 'Absent', clockedIn: null, clockedOut: null, avatarHint: 'girl portrait', photoURL: 'https://placehold.co/100x100.png' },
];


export default function AttendancePage() {
    const [students, setStudents] = useState(initialStudents);
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
    const { toast } = useToast();

    const handleClockIn = () => {
        if (!selectedStudent) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a student first.' });
            return;
        }
        
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const isLate = now.getHours() >= 9;

        setStudents(students.map(s => 
            s.id === selectedStudent && !s.clockedIn
                ? { ...s, clockedIn: time, status: isLate ? 'Late' : 'Present' }
                : s
        ));
        
        const student = students.find(s => s.id === selectedStudent);
        toast({ title: 'Clocked In', description: `${student?.name} has been clocked in at ${time}.` });
        setSelectedStudent(null);
    };

    const handleClockOut = () => {
        if (!selectedStudent) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a student first.' });
            return;
        }

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        setStudents(students.map(s => 
            s.id === selectedStudent && s.clockedIn && !s.clockedOut
                ? { ...s, clockedOut: time }
                : s
        ));
        
        const student = students.find(s => s.id === selectedStudent);
        toast({ title: 'Clocked Out', description: `${student?.name} has been clocked out at ${time}.` });
        setSelectedStudent(null);
    };

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Attendance</CardTitle>
            <CardDescription>
              A log of student clock-ins and clock-outs for today, {new Date().toLocaleDateString()}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="hidden md:table-cell text-center">Clock In</TableHead>
                  <TableHead className="hidden md:table-cell text-center">Clock Out</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map(student => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                         <Avatar className="h-10 w-10">
                            <AvatarImage src={student.photoURL} data-ai-hint={student.avatarHint} />
                            <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Grade {student.grade}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                        <Badge variant={student.status === 'Present' ? 'default' : student.status === 'Absent' ? 'destructive' : 'secondary'}
                           className={cn(student.status === 'Present' && 'bg-green-500 hover:bg-green-600', student.status === 'Late' && 'bg-yellow-500 hover:bg-yellow-600' )}
                        >
                            {student.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-center font-medium">
                      {student.clockedIn || 'N/A'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-center font-medium">
                      {student.clockedOut || 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Fingerprint Scanner</CardTitle>
            <CardDescription>Simulate student fingerprint scan to clock in or out.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-center py-8">
                 <Fingerprint className="h-32 w-32 text-primary/20" />
             </div>
             <Select onValueChange={setSelectedStudent} value={selectedStudent || ''}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a student..." />
                </SelectTrigger>
                <SelectContent>
                    {students.map(student => (
                        <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </CardContent>
          <CardFooter className="grid grid-cols-2 gap-4">
            <Button onClick={handleClockIn} disabled={!selectedStudent}>
                <LogIn className="mr-2 h-4 w-4" /> Clock In
            </Button>
            <Button onClick={handleClockOut} disabled={!selectedStudent} variant="outline">
                <LogOut className="mr-2 h-4 w-4" /> Clock Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
