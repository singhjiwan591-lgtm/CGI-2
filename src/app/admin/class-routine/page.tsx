
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';

// Mock data, in a real app, this would come from a database/API
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const timeSlots = ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 01:00", "02:00 - 03:00", "03:00 - 04:00"];

const getStoredClasses = (schoolId: string) => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(`classesData_${schoolId}`);
  return data ? JSON.parse(data) : [];
};

const getStoredSubjects = (schoolId: string) => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(`subjectsData_${schoolId}`);
  return data ? JSON.parse(data) : [];
};

export default function ClassRoutinePage() {
  const [routines, setRoutines] = useState<any>({});
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [schoolId, setSchoolId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      const parsedSession = JSON.parse(userSession);
      if (parsedSession.schoolId) {
        const currentSchoolId = parsedSession.schoolId;
        setSchoolId(currentSchoolId);
        const storedClasses = getStoredClasses(currentSchoolId);
        setClasses(storedClasses);
        setSubjects(getStoredSubjects(currentSchoolId));
        if (storedClasses.length > 0) {
          setSelectedClass(storedClasses[0].id);
        }
        // Load routines from localStorage
        const storedRoutines = localStorage.getItem(`routinesData_${currentSchoolId}`);
        setRoutines(storedRoutines ? JSON.parse(storedRoutines) : {});
      }
    }
    setLoading(false);
  }, []);

  const handleSubjectChange = (day: string, time: string, subjectId: string) => {
    const newRoutines = { ...routines };
    if (!newRoutines[selectedClass]) {
      newRoutines[selectedClass] = {};
    }
    if (!newRoutines[selectedClass][day]) {
      newRoutines[selectedClass][day] = {};
    }
    newRoutines[selectedClass][day][time] = subjectId;
    setRoutines(newRoutines);
  };

  const handleSaveRoutine = () => {
    if (schoolId) {
      localStorage.setItem(`routinesData_${schoolId}`, JSON.stringify(routines));
      alert('Routine saved successfully!');
    }
  };

  const getSubjectName = (subjectId: string) => {
    return subjects.find(s => s.id === subjectId)?.name || 'Select Subject';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const currentRoutine = routines[selectedClass] || {};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Class Routine Management</CardTitle>
        <CardDescription>Create and manage weekly schedules for each class.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <label htmlFor="class-select" className="font-medium">Select Class:</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[200px]" id="class-select">
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map(cls => (
                  <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSaveRoutine}>Save Routine</Button>
        </div>

        {selectedClass ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Day</TableHead>
                  {timeSlots.map(time => <TableHead key={time}>{time}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {daysOfWeek.map(day => (
                  <TableRow key={day}>
                    <TableCell className="font-medium">{day}</TableCell>
                    {timeSlots.map(time => (
                      <TableCell key={time}>
                        <Select
                          value={currentRoutine[day]?.[time] || ''}
                          onValueChange={(value) => handleSubjectChange(day, time, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">-- None --</SelectItem>
                            {subjects.map(subject => (
                              <SelectItem key={subject.id} value={subject.id}>{subject.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>Please select a class to view or edit its routine.</p>
            <p>If no classes are available, please create them in the 'Class' section first.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
