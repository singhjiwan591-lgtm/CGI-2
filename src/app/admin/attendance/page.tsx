
'use client';

import { useState, useEffect } from 'react';
import { Fingerprint, LogIn, LogOut, Search, History, Loader2 } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { format } from 'date-fns';

type Student = {
  id: string;
  name: string;
  grade: number;
  photoURL?: string;
  avatarHint: string;
};

type AttendanceLog = {
    id: string;
    studentId: string;
    studentName: string;
    timestamp: Date;
    type: 'clock-in' | 'clock-out';
};

type DailyStatus = {
  status: 'Present' | 'Absent' | 'Late';
  clockedIn: string | null;
  clockedOut: string | null;
};

// Mock data
const mockStudents: Student[] = [
    { id: '1', name: 'Ravi Kumar', grade: 12, avatarHint: 'student portrait', photoURL: 'https://placehold.co/100x100.png' },
    { id: '2', name: 'Priya Sharma', grade: 11, avatarHint: 'student smiling', photoURL: 'https://placehold.co/100x100.png' },
    { id: '3', name: 'Amit Patel', grade: 12, avatarHint: 'student happy', photoURL: 'https://placehold.co/100x100.png' },
    { id: '4', name: 'Sunita Devi', grade: 10, avatarHint: 'student thinking', photoURL: 'https://placehold.co/100x100.png' },
    { id: '5', name: 'Vijay Singh', grade: 11, avatarHint: 'student outside', photoURL: 'https://placehold.co/100x100.png' },
];

export default function AttendancePage() {
    const [students, setStudents] = useState<Student[]>(mockStudents);
    const [loading, setLoading] = useState(false);
    const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>([]);
    const [dailyAttendance, setDailyAttendance] = useState<Record<string, DailyStatus>>({});
    const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const [historyStudent, setHistoryStudent] = useState<Student | null>(null);
    const [studentHistory, setStudentHistory] = useState<AttendanceLog[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        const newDailyAttendance: Record<string, DailyStatus> = {};
        
        students.forEach(student => {
            const studentLogs = attendanceLogs.filter(log => log.studentId === student.id).sort((a,b) => a.timestamp.getTime() - b.timestamp.getTime());
            const clockInLog = studentLogs.find(l => l.type === 'clock-in');
            const clockOutLog = studentLogs.find(l => l.type === 'clock-out');

            let status: 'Present' | 'Absent' | 'Late' = 'Absent';
            let clockedIn: string | null = null;

            if (clockInLog) {
                const clockInTime = clockInLog.timestamp;
                clockedIn = format(clockInTime, 'p');
                status = clockInTime.getHours() >= 9 && clockInTime.getMinutes() > 0 ? 'Late' : 'Present';
            }

            newDailyAttendance[student.id] = {
                status,
                clockedIn: clockedIn,
                clockedOut: clockOutLog ? format(clockOutLog.timestamp, 'p') : null,
            };
        });
        setDailyAttendance(newDailyAttendance);
    }, [students, attendanceLogs, selectedDate]);

    const handleClockIn = async () => {
        if (!selectedStudent) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a student first.' });
            return;
        }
        
        const student = students.find(s => s.id === selectedStudent);
        if (!student || dailyAttendance[selectedStudent]?.clockedIn) return;
        
        const newLog: AttendanceLog = {
            id: new Date().toISOString(),
            studentId: selectedStudent,
            studentName: student.name,
            timestamp: new Date(),
            type: 'clock-in'
        };
        setAttendanceLogs([...attendanceLogs, newLog]);
        toast({ title: 'Clocked In', description: `${student.name} has been clocked in.` });
        setSelectedStudent(null);
    };

    const handleClockOut = async () => {
        if (!selectedStudent) {
            toast({ variant: 'destructive', title: 'Error', description: 'Please select a student first.' });
            return;
        }

        const student = students.find(s => s.id === selectedStudent);
        if (!student || !dailyAttendance[selectedStudent]?.clockedIn || dailyAttendance[selectedStudent]?.clockedOut) return;
        
        const newLog: AttendanceLog = {
            id: new Date().toISOString(),
            studentId: selectedStudent,
            studentName: student.name,
            timestamp: new Date(),
            type: 'clock-out'
        };
        setAttendanceLogs([...attendanceLogs, newLog]);
        toast({ title: 'Clocked Out', description: `${student.name} has been clocked out.` });
        setSelectedStudent(null);
    };

    const handleViewHistory = async (student: Student) => {
        setHistoryStudent(student);
        const historyData = attendanceLogs
            .filter(log => log.studentId === student.id)
            .sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime());
        setStudentHistory(historyData);
        setIsHistoryOpen(true);
    };

    const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

  return (
    <>
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                    <CardTitle>Daily Attendance</CardTitle>
                    <CardDescription>
                      Attendance log for {format(selectedDate, 'PPP')}.
                    </CardDescription>
                </div>
                <Input 
                    type="date" 
                    value={format(selectedDate, 'yyyy-MM-dd')}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="w-auto"
                />
            </div>
             <div className="relative mt-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="w-full bg-background pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="hidden md:table-cell text-center">Clock In</TableHead>
                  <TableHead className="hidden md:table-cell text-center">Clock Out</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                 {filteredStudents.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No student data available.
                        </TableCell>
                    </TableRow>
                ) : filteredStudents.map(student => {
                  const attendance = dailyAttendance[student.id] || { status: 'Absent', clockedIn: null, clockedOut: null };
                  return (
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
                          <Badge variant={attendance.status === 'Present' ? 'default' : attendance.status === 'Absent' ? 'destructive' : 'secondary'}
                             className={cn(attendance.status === 'Present' && 'bg-green-500 hover:bg-green-600', attendance.status === 'Late' && 'bg-yellow-500 hover:bg-yellow-600' )}
                          >
                              {attendance.status}
                          </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center font-medium">
                        {attendance.clockedIn || 'N/A'}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center font-medium">
                        {attendance.clockedOut || 'N/A'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleViewHistory(student)}>
                            <History className="mr-2 h-4 w-4" /> History
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
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
            <Button onClick={handleClockIn} disabled={!selectedStudent || !!dailyAttendance[selectedStudent as string]?.clockedIn}>
                <LogIn className="mr-2 h-4 w-4" /> Clock In
            </Button>
            <Button onClick={handleClockOut} disabled={!selectedStudent || !dailyAttendance[selectedStudent as string]?.clockedIn || !!dailyAttendance[selectedStudent as string]?.clockedOut} variant="outline">
                <LogOut className="mr-2 h-4 w-4" /> Clock Out
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
    <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle>Attendance History for {historyStudent?.name}</DialogTitle>
                <DialogDescription>A log of all check-in and check-out events.</DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {studentHistory.length === 0 ? (
                             <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center">
                                    No attendance history found.
                                </TableCell>
                            </TableRow>
                        ) : studentHistory.map(log => (
                            <TableRow key={log.id}>
                                <TableCell>{format(log.timestamp, 'PPP')}</TableCell>
                                <TableCell>{format(log.timestamp, 'p')}</TableCell>
                                <TableCell>
                                    <Badge variant={log.type === 'clock-in' ? 'default' : 'secondary'} className={cn(log.type === 'clock-in' ? 'bg-green-500' : 'bg-yellow-500')}>
                                      {log.type === 'clock-in' ? 'Clock In' : 'Clock Out'}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </DialogContent>
    </Dialog>
    </>
  );
}
