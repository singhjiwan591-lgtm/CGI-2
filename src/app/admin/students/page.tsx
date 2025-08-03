
'use client';

import { useState } from 'react';
import {
  FilePlus,
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Trash2,
  DollarSign,
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

type Student = {
  id: string;
  name: string;
  grade: number;
  status: 'Enrolled' | 'Withdrawn' | 'Graduated';
  email: string;
  program: string;
  avatarHint: string;
  totalFees: number;
};

const initialStudents: Student[] = [
  { id: '24001', name: 'Olivia Martin', grade: 10, status: 'Enrolled', email: 'olivia.martin@example.com', program: 'Science', avatarHint: 'student portrait', totalFees: 5000 },
  { id: '24002', name: 'Jackson Lee', grade: 9, status: 'Enrolled', email: 'jackson.lee@example.com', program: 'Arts', avatarHint: 'boy student', totalFees: 5000 },
  { id: '24003', name: 'Sofia Nguyen', grade: 11, status: 'Enrolled', email: 'sofia.nguyen@example.com', program: 'Technology', avatarHint: 'girl smiling', totalFees: 5500 },
  { id: '24004', name: 'Isabella Patel', grade: 12, status: 'Graduated', email: 'isabella.patel@example.com', program: 'Math', avatarHint: 'boy glasses', totalFees: 6000 },
  { id: '24005', name: 'William Kim', grade: 9, status: 'Enrolled', email: 'william.kim@example.com', program: 'Arts', avatarHint: 'student smiling', totalFees: 5000 },
  { id: '24006', name: 'Ava Brown', grade: 10, status: 'Withdrawn', email: 'ava.brown@example.com', program: 'Science', avatarHint: 'girl portrait', totalFees: 5000 },
];

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const { toast } = useToast();

  const handleAddNew = () => {
    setEditingStudent(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setIsDialogOpen(true);
  };

  const handleDelete = (studentId: string) => {
    setStudents(students.filter(s => s.id !== studentId));
    toast({ title: 'Success', description: 'Student has been deleted.' });
  };
  
  const handleSave = (formData: FormData) => {
    const newStudentData: Student = {
        id: editingStudent ? editingStudent.id : `${new Date().getFullYear().toString().slice(2)}${Math.floor(1000 + Math.random() * 9000)}`,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        grade: Number(formData.get('grade')),
        program: formData.get('program') as string,
        totalFees: Number(formData.get('totalFees')),
        status: 'Enrolled',
        avatarHint: 'student portrait'
    };

    if (editingStudent) {
        setStudents(students.map(s => s.id === editingStudent.id ? { ...s, ...newStudentData } : s));
        toast({ title: 'Success', description: 'Student information has been updated.' });
    } else {
        setStudents([newStudentData, ...students]);
        toast({ title: 'Success', description: 'New student has been added.' });
    }
    setIsDialogOpen(false);
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
                    <div>{student.name}</div>
                    <div className="text-sm text-muted-foreground md:hidden">{student.grade}th Grade</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={student.status === 'Enrolled' ? 'default' : 'secondary'}>
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
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
    </>
  );
}
