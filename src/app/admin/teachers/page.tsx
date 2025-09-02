
'use client';

import { useState, useEffect } from 'react';
import { Loader2, PlusCircle, MoreHorizontal, Pencil, Trash2, Search, Phone, Mail, GraduationCap, Banknote, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getTeachers, addTeacher, updateTeacher, deleteTeacher, Teacher } from '@/lib/teacher-data-service';
import { formatNumber } from '@/lib/utils';
import { format } from 'date-fns';

const initialTeacherState: Omit<Teacher, 'id' | 'joiningDate'> = {
    name: '', qualification: '', phone: '', email: '', address: '', salary: 0, photoURL: '', avatarHint: 'teacher portrait'
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<Teacher | null>(null);
  const [schoolId, setSchoolId] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
      const userSession = sessionStorage.getItem('user');
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        if (parsedSession.schoolId) {
          setSchoolId(parsedSession.schoolId);
          setLoading(true);
          const fetchedTeachers = await getTeachers(parsedSession.schoolId);
          setTeachers(fetchedTeachers);
          setLoading(false);
        }
      }
    }
    loadData();
  }, []);

  const handleOpenForm = (teacher: Teacher | null = null) => {
    setCurrentTeacher(teacher);
    setIsFormOpen(true);
  };
  
  const handleCloseForm = () => {
      setIsFormOpen(false);
      setCurrentTeacher(null);
  }

  const handleSaveTeacher = async (formData: Omit<Teacher, 'id' | 'joiningDate'>) => {
    if (!schoolId) {
      toast({ variant: 'destructive', title: 'Error', description: 'School not identified.' });
      return;
    }
    setLoading(true);
    try {
      if (currentTeacher?.id) {
        const updated = await updateTeacher({ ...currentTeacher, ...formData }, schoolId);
        setTeachers(teachers.map(t => t.id === updated.id ? updated : t));
        toast({ title: 'Success', description: 'Teacher details updated successfully.' });
      } else {
        const newTeacherData = await addTeacher(formData, schoolId);
        setTeachers([newTeacherData, ...teachers]);
        toast({ title: 'Success', description: 'Teacher added successfully.' });
      }
      handleCloseForm();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save teacher details.' });
    } finally {
      setLoading(false);
    }
  };

  const openDeleteDialog = (teacher: Teacher) => {
    setCurrentTeacher(teacher);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!currentTeacher || !schoolId) return;
    setLoading(true);
    try {
        await deleteTeacher(currentTeacher.id, schoolId);
        setTeachers(teachers.filter(t => t.id !== currentTeacher.id));
        toast({ title: 'Success', description: 'Teacher record deleted successfully.'});
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete teacher record.' });
    } finally {
        setLoading(false);
        setIsDeleteDialogOpen(false);
        setCurrentTeacher(null);
    }
  }

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && teachers.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>All Teachers Data</CardTitle>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
            <CardDescription>Manage teacher profiles, contact information, and qualifications.</CardDescription>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-8 w-full md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={() => handleOpenForm()}><PlusCircle className="mr-2 h-4 w-4" />Add New Teacher</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Teacher</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Qualification</TableHead>
                <TableHead className="hidden lg:table-cell">Joining Date</TableHead>
                <TableHead className="text-right">Salary</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No teachers found. Click "Add New Teacher" to get started.
                  </TableCell>
                </TableRow>
              ) : filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={teacher.photoURL} data-ai-hint={teacher.avatarHint} />
                        <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{teacher.name}</div>
                        <div className="text-sm text-muted-foreground md:hidden">{teacher.qualification}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-sm">
                          <Phone className="h-3 w-3"/> {teacher.phone}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3"/> {teacher.email}
                      </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{teacher.qualification}</TableCell>
                  <TableCell className="hidden lg:table-cell">{format(new Date(teacher.joiningDate), 'PPP')}</TableCell>
                  <TableCell className="text-right font-medium">₹{formatNumber(teacher.salary)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => handleOpenForm(teacher)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onSelect={() => openDeleteDialog(teacher)}>
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
            Showing <strong>1-{filteredTeachers.length}</strong> of <strong>{teachers.length}</strong> teachers
          </div>
        </CardFooter>
      </Card>
      
      {isFormOpen && <TeacherFormDialog open={isFormOpen} onClose={handleCloseForm} onSave={handleSaveTeacher} teacher={currentTeacher} loading={loading} />}
      {isDeleteDialogOpen && <DeleteConfirmationDialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)} onConfirm={handleDelete} teacher={currentTeacher} loading={loading} />}
    </>
  );
}

// Teacher Form Dialog Component
const TeacherFormDialog = ({ open, onClose, onSave, teacher, loading }: { open: boolean, onClose: () => void, onSave: (data: any) => void, teacher: Teacher | null, loading: boolean }) => {
    const [formData, setFormData] = useState(teacher || initialTeacherState);

    useEffect(() => {
        setFormData(teacher || initialTeacherState);
    }, [teacher]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: name === 'salary' ? parseFloat(value) || 0 : value }));
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    }
    
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                 <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{teacher ? 'Edit Teacher' : 'Add New Teacher'}</DialogTitle>
                        <DialogDescription>
                            Fill in the details below. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="qualification">Qualification</Label>
                            <Input id="qualification" name="qualification" value={formData.qualification} onChange={handleChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" name="address" value={formData.address} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salary">Salary (Monthly)</Label>
                            <Input id="salary" name="salary" type="number" value={formData.salary} onChange={handleChange} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                 </form>
            </DialogContent>
        </Dialog>
    )
}

// Delete Confirmation Dialog Component
const DeleteConfirmationDialog = ({ open, onClose, onConfirm, teacher, loading }: { open: boolean, onClose: () => void, onConfirm: () => void, teacher: Teacher | null, loading: boolean }) => (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
          <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                  This action cannot be undone. This will permanently delete the record for <span className="font-semibold">{teacher?.name}</span>.
              </DialogDescription>
          </DialogHeader>
          <DialogFooter>
              <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
              <Button variant="destructive" onClick={onConfirm} disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Yes, delete teacher
              </Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
)
