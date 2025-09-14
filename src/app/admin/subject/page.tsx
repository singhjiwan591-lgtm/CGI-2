
'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Loader2, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data service for subjects
export type Subject = {
  id: string;
  name: string;
  code: string;
};

const getSubjectsKey = (schoolId: string) => `subjectsData_${schoolId}`;

const getStoredSubjects = (schoolId: string): Subject[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(getSubjectsKey(schoolId));
  return data ? JSON.parse(data) : [];
};

const storeSubjects = (subjects: Subject[], schoolId: string) => {
  if (typeof window !== 'undefined') localStorage.setItem(getSubjectsKey(schoolId), JSON.stringify(subjects));
};

export default function SubjectPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] useState(false);
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [schoolId, setSchoolId] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      const parsedSession = JSON.parse(userSession);
      if (parsedSession.schoolId) {
        const currentSchoolId = parsedSession.schoolId;
        setSchoolId(currentSchoolId);
        setSubjects(getStoredSubjects(currentSchoolId));
      }
    }
    setLoading(false);
  }, []);

  const handleOpenForm = (sub: Subject | null = null) => {
    setCurrentSubject(sub);
    setIsFormOpen(true);
  };

  const handleSaveSubject = (formData: { name: string; code: string }) => {
    if (!schoolId) return;
    let updatedSubjects;
    if (currentSubject) {
      updatedSubjects = subjects.map(s => s.id === currentSubject.id ? { ...s, ...formData } : s);
      toast({ title: 'Success', description: 'Subject updated successfully.' });
    } else {
      const newSubject: Subject = { id: Date.now().toString(), ...formData };
      updatedSubjects = [...subjects, newSubject];
      toast({ title: 'Success', description: 'Subject created successfully.' });
    }
    setSubjects(updatedSubjects);
    storeSubjects(updatedSubjects, schoolId);
    setIsFormOpen(false);
  };

  const handleDeleteSubject = (id: string) => {
    if (!schoolId) return;
    const updatedSubjects = subjects.filter(s => s.id !== id);
    setSubjects(updatedSubjects);
    storeSubjects(updatedSubjects, schoolId);
    toast({ title: 'Success', description: 'Subject deleted successfully.' });
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Subject Management</CardTitle>
            <CardDescription>Create and manage academic subjects.</CardDescription>
          </div>
          <Button onClick={() => handleOpenForm()}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Subject
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject Name</TableHead>
                  <TableHead>Subject Code</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="h-24 text-center">No subjects created yet.</TableCell></TableRow>
                ) : (
                  subjects.map(sub => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.name}</TableCell>
                      <TableCell>{sub.code}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onSelect={() => handleOpenForm(sub)}><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500" onSelect={() => handleDeleteSubject(sub.id)}><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
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
                Showing <strong>{subjects.length}</strong> subjects.
            </div>
        </CardFooter>
      </Card>
      {isFormOpen && (
        <SubjectFormDialog
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveSubject}
          subjectData={currentSubject}
        />
      )}
    </>
  );
}

const SubjectFormDialog = ({ isOpen, onClose, onSave, subjectData }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void, subjectData: Subject | null }) => {
  const [name, setName] = useState(subjectData?.name || '');
  const [code, setCode] = useState(subjectData?.code || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, code });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{subjectData ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Subject Name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Mathematics" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Subject Code</Label>
              <Input id="code" value={code} onChange={e => setCode(e.target.value)} placeholder="e.g., MATH101" />
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
