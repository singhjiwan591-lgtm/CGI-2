
'use client';

import { useState, useEffect } from 'react';
import {
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Trash2,
  User,
  Loader2,
  Search,
  FileDown,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { getAllStudents, addStudent, updateAllStudents } from '@/lib/student-data-service';

type Student = {
    id: string;
    name: string;
    roll: string;
    grade: string;
    parent: string;
    gender: string;
    address: string;
    dob: string;
    phone: string;
    email: string;
    photoURL?: string;
    avatarHint: string;
};

const newStudentInitialState = {
    name: '', grade: '', parent: '', gender: '', address: '', dob: '', phone: '', email: ''
};


export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Omit<Student, 'id'|'roll'|'photoURL'|'avatarHint'>>(newStudentInitialState);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setStudents(getAllStudents());
    setLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({...prev, [name]: value}));
  }

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.grade || !newStudent.email) {
        toast({ variant: 'destructive', title: 'Validation Error', description: 'Please fill all required fields.'});
        return;
    }

    const addedStudent = addStudent(newStudent);
    setStudents(prev => [addedStudent, ...prev]);
    
    toast({ title: 'Success', description: 'Student added successfully.' });
    setIsAddDialogOpen(false);
    setNewStudent(newStudentInitialState);
  };
  
  const openDeleteDialog = (student: Student) => {
    setStudentToDelete(student);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteStudent = () => {
    if (!studentToDelete) return;
    const updatedStudents = students.filter(s => s.id !== studentToDelete.id);
    setStudents(updatedStudents);
    updateAllStudents(updatedStudents); // Persist change
    toast({ title: 'Success', description: `${studentToDelete.name} has been deleted.` });
    setIsDeleteDialogOpen(false);
    setStudentToDelete(null);
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.roll.includes(searchTerm)
  );

  if (loading) {
    return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    )
  }

  const handleViewDetails = (studentId: string) => {
    router.push(`/admin/students/${studentId}`);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Students Data</CardTitle>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <CardDescription>A list of all students in the institute.</CardDescription>
            <div className="flex items-center gap-2">
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search by name, roll, email..." 
                        className="pl-8 w-full md:w-[250px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                 <Button variant="outline"><FileDown className="mr-2 h-4 w-4"/>Download</Button>
                 <Button onClick={() => setIsAddDialogOpen(true)}><PlusCircle className="mr-2 h-4 w-4"/>Add New Student</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Gender</TableHead>
                <TableHead className="hidden md:table-cell">Grade</TableHead>
                <TableHead className="hidden md:table-cell">Parent's Name</TableHead>
                <TableHead className="hidden lg:table-cell">Address</TableHead>
                <TableHead className="hidden lg:table-cell">Date of Birth</TableHead>
                <TableHead className="hidden xl:table-cell">Phone</TableHead>
                <TableHead className="hidden xl:table-cell">E-mail</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                  <TableRow>
                      <TableCell colSpan={10} className="h-24 text-center">
                          No students found.
                      </TableCell>
                  </TableRow>
              ) : filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={student.photoURL || `https://placehold.co/100x100.png`} data-ai-hint={student.avatarHint} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                     <Button variant="link" className="p-0 h-auto" onClick={() => handleViewDetails(student.id)}>
                        {student.name}
                    </Button>
                    <div className="text-sm text-muted-foreground md:hidden">Roll: {student.roll}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{student.gender}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.grade}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.parent}</TableCell>
                  <TableCell className="hidden lg:table-cell">{student.address}</TableCell>
                  <TableCell className="hidden lg:table-cell">{student.dob}</TableCell>
                  <TableCell className="hidden xl:table-cell">{student.phone}</TableCell>
                  <TableCell className="hidden xl:table-cell">{student.email}</TableCell>
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
                        <DropdownMenuItem onSelect={() => handleViewDetails(student.id)}>
                          <User className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onSelect={() => openDeleteDialog(student)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
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
                Showing <strong>1-{filteredStudents.length}</strong> of <strong>{students.length}</strong> students
            </div>
        </CardFooter>
      </Card>

      {/* Add Student Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleAddStudent}>
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new student record.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" name="name" value={newStudent.name} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="grade" className="text-right">Grade</Label>
                <Input id="grade" name="grade" value={newStudent.grade} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="parent" className="text-right">Parent's Name</Label>
                <Input id="parent" name="parent" value={newStudent.parent} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">Gender</Label>
                <Input id="gender" name="gender" value={newStudent.gender} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">Address</Label>
                <Input id="address" name="address" value={newStudent.address} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dob" className="text-right">D.O.B</Label>
                <Input id="dob" name="dob" type="date" value={newStudent.dob} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">Phone</Label>
                <Input id="phone" name="phone" type="tel" value={newStudent.phone} onChange={handleInputChange} className="col-span-3" />
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" name="email" type="email" value={newStudent.email} onChange={handleInputChange} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit">Add Student</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete the record for <span className="font-semibold">{studentToDelete?.name}</span>.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleDeleteStudent}>
                    Yes, delete student
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
