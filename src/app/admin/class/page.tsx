
'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Loader2, MoreHorizontal, Pencil, Trash2, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getTeachers } from '@/lib/teacher-data-service';

// Mock data service for classes
export type Class = {
  id: string;
  name: string;
  teacherId: string;
};

const getClassesKey = (schoolId: string) => `classesData_${schoolId}`;

const getStoredClasses = (schoolId: string): Class[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(getClassesKey(schoolId));
  return data ? JSON.parse(data) : [];
};

const storeClasses = (classes: Class[], schoolId: string) => {
  if (typeof window !== 'undefined') localStorage.setItem(getClassesKey(schoolId), JSON.stringify(classes));
};

export default function ClassPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState<Class | null>(null);
  const [schoolId, setSchoolId] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      const parsedSession = JSON.parse(userSession);
      if (parsedSession.schoolId) {
        const currentSchoolId = parsedSession.schoolId;
        setSchoolId(currentSchoolId);
        setClasses(getStoredClasses(currentSchoolId));
        setTeachers(getTeachers(currentSchoolId));
      }
    }
    setLoading(false);
  }, []);

  const handleOpenForm = (cls: Class | null = null) => {
    setCurrentClass(cls);
    setIsFormOpen(true);
  };

  const handleSaveClass = (formData: { name: string; teacherId: string }) => {
    if (!schoolId) return;
    let updatedClasses;
    if (currentClass) {
      updatedClasses = classes.map(c => c.id === currentClass.id ? { ...c, ...formData } : c);
      toast({ title: 'Success', description: 'Class updated successfully.' });
    } else {
      const newClass: Class = { id: Date.now().toString(), ...formData };
      updatedClasses = [...classes, newClass];
      toast({ title: 'Success', description: 'Class created successfully.' });
    }
    setClasses(updatedClasses);
    storeClasses(updatedClasses, schoolId);
    setIsFormOpen(false);
  };

  const handleDeleteClass = (id: string) => {
    if (!schoolId) return;
    const updatedClasses = classes.filter(c => c.id !== id);
    setClasses(updatedClasses);
    storeClasses(updatedClasses, schoolId);
    toast({ title: 'Success', description: 'Class deleted successfully.' });
  };
  
  const getTeacherName = (teacherId: string) => {
    return teachers.find(t => t.id === teacherId)?.name || 'Unassigned';
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Class Management</CardTitle>
            <CardDescription>Create, edit, and assign teachers to classes.</CardDescription>
          </div>
          <Button onClick={() => handleOpenForm()}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Class
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Assigned Teacher</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="h-24 text-center">No classes created yet.</TableCell></TableRow>
                ) : (
                  classes.map(cls => (
                    <TableRow key={cls.id}>
                      <TableCell className="font-medium">{cls.name}</TableCell>
                      <TableCell>{getTeacherName(cls.teacherId)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => handleOpenForm(cls)}><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500" onSelect={() => handleDeleteClass(cls.id)}><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
         <CardFooter>
            <div className="text-xs text-muted-foreground">
                Showing <strong>{classes.length}</strong> classes.
            </div>
        </CardFooter>
      </Card>
      {isFormOpen && (
        <ClassFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveClass}
          classData={currentClass}
          teachers={teachers}
        />
      )}
    </>
  );
}

const ClassFormDialog = ({ isOpen, onClose, onSave, classData, teachers }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void, classData: Class | null, teachers: any[] }) => {
  const [name, setName] = useState(classData?.name || '');
  const [teacherId, setTeacherId] = useState(classData?.teacherId || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !teacherId) {
      // Basic validation
      return;
    }
    onSave({ name, teacherId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{classData ? 'Edit Class' : 'Add New Class'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Class Name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Grade 10 - Section A" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="teacherId">Assign Teacher</Label>
              <select id="teacherId" value={teacherId} onChange={e => setTeacherId(e.target.value)} className="w-full h-10 border border-input rounded-md px-3">
                <option value="" disabled>Select a teacher</option>
                {teachers.map(teacher => (
                  <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
