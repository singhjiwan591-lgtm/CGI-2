
'use client';

import { useState } from 'react';
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

const mockStudents = [
    { id: '1', name: 'Ravi Kumar', roll: '1001', grade: '12', parent: 'Manoj Kumar', gender: 'Male', address: 'Mumbai, India', dob: '2006-05-15', phone: '+91 9876543210', email: 'ravi@example.com', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'male student' },
    { id: '2', name: 'Priya Sharma', roll: '1002', grade: '11', parent: 'Sunita Sharma', gender: 'Female', address: 'Delhi, India', dob: '2007-02-20', phone: '+91 9876543211', email: 'priya@example.com', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'female student' },
    { id: '3', name: 'Amit Patel', roll: '1003', grade: '12', parent: 'Rajesh Patel', gender: 'Male', address: 'Ahmedabad, India', dob: '2006-08-10', phone: '+91 9876543212', email: 'amit@example.com', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'boy student' },
    { id: '4', name: 'Sunita Devi', roll: '1004', grade: '10', parent: 'Anil Singh', gender: 'Female', address: 'Patna, India', dob: '2008-11-25', phone: '+91 9876543213', email: 'sunita@example.com', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'girl smiling' },
    { id: '5', name: 'Vijay Singh', roll: '1005', grade: '11', parent: 'Kiran Singh', gender: 'Male', address: 'Jaipur, India', dob: '2007-07-07', phone: '+91 9876543214', email: 'vijay@example.com', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'student glasses' },
];


export default function StudentsPage() {
  const [students, setStudents] = useState(mockStudents);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


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
      <Card>
        <CardHeader>
          <CardTitle>All Students Data</CardTitle>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <CardDescription>A list of all students in the institute.</CardDescription>
            <div className="flex items-center gap-2">
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name..." className="pl-8 w-full md:w-[250px]" />
                </div>
                 <Button variant="outline"><FileDown className="mr-2 h-4 w-4"/>Download</Button>
                 <Button><PlusCircle className="mr-2 h-4 w-4"/>Add New Student</Button>
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
              {students.map((student) => (
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
                        <DropdownMenuItem className="text-red-500">
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
                Showing <strong>1-{students.length}</strong> of <strong>{students.length}</strong> students
            </div>
        </CardFooter>
      </Card>
  );
}
