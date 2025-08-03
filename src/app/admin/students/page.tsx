
'use client';

import { useState } from 'react';
import {
  FilePlus,
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Trash2,
  CalendarCheck,
  CalendarX,
  Clock,
  User,
  Award,
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

type Student = {
  id: string;
  name: string;
  grade: number;
  status: 'Enrolled' | 'Withdrawn' | 'Graduated';
  email: string;
  program: string;
  avatarHint: string;
  totalFees: number;
  feesPaid: number;
  attendance: {
    present: number;
    absent: number;
    late: number;
  }
};

const initialStudents: Student[] = [
  { id: '24001', name: 'Olivia Martin', grade: 10, status: 'Enrolled', email: 'olivia.martin@example.com', program: 'Science', avatarHint: 'student portrait', totalFees: 5000, feesPaid: 2500, attendance: { present: 15, absent: 1, late: 2 } },
  { id: '24002', name: 'Jackson Lee', grade: 9, status: 'Enrolled', email: 'jackson.lee@example.com', program: 'Arts', avatarHint: 'boy student', totalFees: 5000, feesPaid: 5000, attendance: { present: 18, absent: 0, late: 0 } },
  { id: '24003', name: 'Sofia Nguyen', grade: 11, status: 'Enrolled', email: 'sofia.nguyen@example.com', program: 'Technology', avatarHint: 'girl smiling', totalFees: 5500, feesPaid: 1000, attendance: { present: 17, absent: 1, late: 0 } },
  { id: '24004', name: 'Isabella Patel', grade: 12, status: 'Graduated', email: 'isabella.patel@example.com', program: 'Math', avatarHint: 'boy glasses', totalFees: 6000, feesPaid: 6000, attendance: { present: 190, absent: 5, late: 3 } },
  { id: '24005', name: 'William Kim', grade: 9, status: 'Enrolled', email: 'william.kim@example.com', program: 'Arts', avatarHint: 'student smiling', totalFees: 5000, feesPaid: 3000, attendance: { present: 16, absent: 0, late: 2 } },
  { id: '24006', name: 'Ava Brown', grade: 10, status: 'Withdrawn', email: 'ava.brown@example.com', program: 'Science', avatarHint: 'girl portrait', totalFees: 5000, feesPaid: 0, attendance: { present: 8, absent: 5, late: 1 } },
];

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const handleAddNew = () => {
    setEditingStudent(null);
    setIsFormDialogOpen(true);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setIsFormDialogOpen(true);
  };
  
  const handleViewHistory = (student: Student) => {
    setViewingStudent(student);
    setIsHistoryDialogOpen(true);
  }

  const handleDelete = (studentId: string) => {
    setStudents(students.filter(s => s.id !== studentId));
    toast({ title: 'Success', description: 'Student has been deleted.' });
  };
  
  const handleSave = (formData: FormData) => {
    const newStudentData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        grade: Number(formData.get('grade')),
        program: formData.get('program') as string,
        totalFees: Number(formData.get('totalFees')),
    };

    if (editingStudent) {
        setStudents(students.map(s => s.id === editingStudent.id ? { ...s, ...newStudentData } : s));
        toast({ title: 'Success', description: 'Student information has been updated.' });
    } else {
        const newStudent: Student = {
          id: `${new Date().getFullYear().toString().slice(2)}${Math.floor(1000 + Math.random() * 9000)}`,
          status: 'Enrolled',
          avatarHint: 'student portrait',
          feesPaid: 0,
          attendance: { present: 0, absent: 0, late: 0 },
          ...newStudentData,
        }
        setStudents([newStudent, ...students]);
        toast({ title: 'Success', description: 'New student has been added.' });
    }
    setIsFormDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold">Student Management</h1>
            <p className="text-muted-foreground">Manage all student records in one place.</p>
        </div>
        <Button onClick={handleAddNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Student
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Program</TableHead>
                <TableHead className="hidden md:table-cell">Grade</TableHead>
                <TableHead className="hidden md:table-cell text-right">Total Fees</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint={student.avatarHint} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Button variant="link" className="p-0 h-auto" onClick={() => handleViewHistory(student)}>
                        {student.name}
                    </Button>
                    <div className="text-sm text-muted-foreground md:hidden">{student.grade}th Grade</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'Enrolled' ? 'default' : student.status === 'Graduated' ? 'secondary' : 'outline'}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{student.program}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.grade}th Grade</TableCell>
                  <TableCell className="hidden md:table-cell text-right">${student.totalFees.toLocaleString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => handleViewHistory(student)}>
                          <User className="mr-2 h-4 w-4" /> View History
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => handleEdit(student)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 font-normal relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the student's record from the servers.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(student.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Yes, delete student
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
            <div className="text-xs text-muted-foreground">
                Showing <strong>1-{students.length}</strong> of <strong>{students.length}</strong> students
            </div>
        </CardFooter>
      </Card>
      
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form action={handleSave}>
            <DialogHeader>
              <DialogTitle>{editingStudent ? 'Edit Student' : 'Add New Student'}</DialogTitle>
              <DialogDescription>
                {editingStudent ? 'Update the details for this student.' : 'Fill out the form to add a new student.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" name="name" defaultValue={editingStudent?.name || ''} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" name="email" type="email" defaultValue={editingStudent?.email || ''} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="grade" className="text-right">
                  Grade
                </Label>
                <Input id="grade" name="grade" type="number" defaultValue={editingStudent?.grade || ''} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="program" className="text-right">
                  Program
                </Label>
                <Input id="program" name="program" defaultValue={editingStudent?.program || ''} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalFees" className="text-right">
                  Total Fees ($)
                </Label>
                <Input id="totalFees" name="totalFees" type="number" defaultValue={editingStudent?.totalFees || ''} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Cancel
                    </Button>
                </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="sm:max-w-md">
           {viewingStudent && (
             <>
                <DialogHeader>
                    <DialogTitle>Student History</DialogTitle>
                    <DialogDescription>
                        A complete overview of {viewingStudent.name}'s record.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                    <Card>
                        <CardContent className="pt-6 flex flex-col items-center text-center">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint={viewingStudent.avatarHint} />
                                <AvatarFallback>{viewingStudent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <h3 className="mt-4 text-xl font-bold">{viewingStudent.name}</h3>
                            <p className="text-sm text-muted-foreground">{viewingStudent.program} - {viewingStudent.grade}th Grade</p>
                            <p className="text-sm text-muted-foreground">{viewingStudent.email}</p>
                            <Badge className="mt-2">{viewingStudent.status}</Badge>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Fee Status</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-3 gap-2 text-center">
                             <div>
                                <p className="text-xs text-muted-foreground">Total Fees</p>
                                <p className="font-bold text-lg">${viewingStudent.totalFees.toLocaleString()}</p>
                             </div>
                             <div>
                                <p className="text-xs text-muted-foreground">Fees Paid</p>
                                <p className="font-bold text-lg text-green-600">${viewingStudent.feesPaid.toLocaleString()}</p>
                             </div>
                             <div>
                                <p className="text-xs text-muted-foreground">Remaining</p>
                                <p className="font-bold text-lg text-red-600">${(viewingStudent.totalFees - viewingStudent.feesPaid).toLocaleString()}</p>
                             </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Attendance Summary</CardTitle>
                        </CardHeader>
                         <CardContent className="grid grid-cols-3 gap-2 text-center">
                             <div className="flex items-center justify-center flex-col">
                                <CalendarCheck className="h-6 w-6 text-green-500 mb-1" />
                                <p className="font-bold text-lg">{viewingStudent.attendance.present}</p>
                                <p className="text-xs text-muted-foreground">Present</p>
                             </div>
                             <div className="flex items-center justify-center flex-col">
                                <CalendarX className="h-6 w-6 text-red-500 mb-1" />
                                <p className="font-bold text-lg">{viewingStudent.attendance.absent}</p>
                                <p className="text-xs text-muted-foreground">Absent</p>
                             </div>
                             <div className="flex items-center justify-center flex-col">
                                <Clock className="h-6 w-6 text-yellow-500 mb-1" />
                                <p className="font-bold text-lg">{viewingStudent.attendance.late}</p>
                                <p className="text-xs text-muted-foreground">Late</p>
                             </div>
                        </CardContent>
                    </Card>
                    {viewingStudent.status === 'Graduated' && (
                        <Button asChild className="w-full">
                            <Link href={`/certificate/${viewingStudent.id}`}>
                                <Award className="mr-2 h-4 w-4" />
                                View Certificate
                            </Link>
                        </Button>
                    )}
                </div>
             </>
           )}
        </DialogContent>
      </Dialog>
    </>
  );
}

    
