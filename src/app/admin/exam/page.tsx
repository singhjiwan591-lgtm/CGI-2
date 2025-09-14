
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { PlusCircle, Loader2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data services
const getStoredExams = (schoolId: string) => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(`examsData_${schoolId}`);
  return data ? JSON.parse(data) : [];
};

const storeExams = (exams: any[], schoolId: string) => {
  if (typeof window !== 'undefined') localStorage.setItem(`examsData_${schoolId}`, JSON.stringify(exams));
};

const getStoredClasses = (schoolId: string) => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(`classesData_${schoolId}`);
  return data ? JSON.parse(data) : [];
};

const getAllStudents = (schoolId: string) => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(`mockStudentsData_${schoolId}`);
    return data ? JSON.parse(data) : [];
}

export default function ExamPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [schoolId, setSchoolId] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [marks, setMarks] = useState<any>({});
  const { toast } = useToast();

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      const parsedSession = JSON.parse(userSession);
      if (parsedSession.schoolId) {
        const currentSchoolId = parsedSession.schoolId;
        setSchoolId(currentSchoolId);
        setExams(getStoredExams(currentSchoolId));
        const storedClasses = getStoredClasses(currentSchoolId);
        setClasses(storedClasses);
        setStudents(getAllStudents(currentSchoolId));
        if (storedClasses.length > 0) setSelectedClass(storedClasses[0].id);
      }
    }
    setLoading(false);
  }, []);

  const handleAddExam = () => {
    const examName = prompt("Enter new exam name (e.g., Mid-Term, Final):");
    if (examName && schoolId) {
      const newExam = { id: Date.now().toString(), name: examName };
      const updatedExams = [...exams, newExam];
      setExams(updatedExams);
      storeExams(updatedExams, schoolId);
    }
  };

  const handleMarkChange = (studentId: string, subject: string, value: string) => {
    setMarks((prev: any) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [subject]: value,
      },
    }));
  };

  const handleSaveMarks = () => {
    // In a real app, you'd save this to a database
    toast({ title: "Marks Saved", description: "Student marks have been saved successfully (simulated)." });
    console.log("Saved Marks:", marks);
  };
  
  const filteredStudents = students.filter(s => s.grade === classes.find(c => c.id === selectedClass)?.name);

  if (loading) {
    return <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exam Management</CardTitle>
        <CardDescription>Manage exam schedules and student marks.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 space-y-2">
            <label>Select Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger><SelectValue placeholder="Select Class" /></SelectTrigger>
              <SelectContent>{classes.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="flex-1 space-y-2">
            <label>Select Exam</label>
             <div className="flex gap-2">
                 <Select value={selectedExam} onValueChange={setSelectedExam}>
                  <SelectTrigger><SelectValue placeholder="Select Exam" /></SelectTrigger>
                  <SelectContent>{exams.map(e => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={handleAddExam}><PlusCircle className="h-4 w-4"/></Button>
            </div>
          </div>
        </div>
        {selectedClass && selectedExam ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>English</TableHead>
                <TableHead>Maths</TableHead>
                <TableHead>Science</TableHead>
                <TableHead>History</TableHead>
                 <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? filteredStudents.map(student => {
                  const studentMarks = marks[student.id] || {};
                  const total = Object.values(studentMarks).reduce((acc: number, mark: any) => acc + (parseInt(mark) || 0), 0);
                  return (
                    <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        {['English', 'Maths', 'Science', 'History'].map(subject => (
                        <TableCell key={subject}>
                            <Input
                            type="number"
                            placeholder="Marks"
                            value={studentMarks[subject] || ''}
                            onChange={(e) => handleMarkChange(student.id, subject, e.target.value)}
                            />
                        </TableCell>
                        ))}
                        <TableCell className="font-bold">{total}</TableCell>
                    </TableRow>
                  )
              }) : (
                  <TableRow><TableCell colSpan={6} className="h-24 text-center">No students in this class.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
            <div className="text-center py-12 text-muted-foreground">Please select a class and an exam to enter marks.</div>
        )}
      </CardContent>
      <CardFooter>
          {selectedClass && selectedExam && (
              <Button onClick={handleSaveMarks} className="ml-auto">
                  <Save className="mr-2 h-4 w-4" /> Save All Marks
              </Button>
          )}
      </CardFooter>
    </Card>
  );
}
