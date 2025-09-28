
'use client';

import { uploadImage } from './storage-service';

// In-memory data store for teachers, persisting in localStorage

export type Teacher = {
  id: string;
  name: string;
  qualification: string;
  phone: string;
  email: string;
  address: string;
  salary: number;
  joiningDate: string;
  photoURL?: string;
  avatarHint: string;
};

const getTeachersKey = (schoolId: string) => `teachersData_${schoolId}`;

const storeTeachers = (teachers: Teacher[], schoolId: string) => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(getTeachersKey(schoolId), JSON.stringify(teachers));
        } catch (error) {
            console.error("Failed to save teachers to localStorage. Storage might be full.", error);
            alert("Could not save teacher data. The browser storage may be full.");
        }
    }
};

export function getTeachers(schoolId: string): Teacher[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(getTeachersKey(schoolId));
  
  if (data) {
    try {
        const parsedData = JSON.parse(data);
        const teachers: Teacher[] = Array.isArray(parsedData) ? parsedData : [];
        return teachers.sort((a, b) => new Date(b.joiningDate).getTime() - new Date(a.joiningDate).getTime());
    } catch (e) {
        console.error("Failed to parse teachers data:", e);
        return [];
    }
  }
  
  return [];
}

export async function addTeacher(data: Omit<Teacher, 'id' | 'joiningDate'>, schoolId: string): Promise<Teacher> {
  const teachers = getTeachers(schoolId);
  
  let uploadedPhotoURL = data.photoURL;
  if (data.photoURL && data.photoURL.startsWith('data:image')) {
    uploadedPhotoURL = await uploadImage(data.photoURL, `teachers/${schoolId}`);
  }

  const newTeacher: Teacher = {
    id: new Date().getTime().toString(),
    ...data,
    joiningDate: new Date().toISOString(),
    photoURL: uploadedPhotoURL || 'https://picsum.photos/seed/newteacher/100/100',
  };
  const updatedTeachers = [newTeacher, ...teachers];
  storeTeachers(updatedTeachers, schoolId);
  return newTeacher;
}

export async function updateTeacher(teacherToUpdate: Teacher, schoolId: string): Promise<Teacher> {
  let teachers = getTeachers(schoolId);
  
  if (teacherToUpdate.photoURL && teacherToUpdate.photoURL.startsWith('data:image')) {
    teacherToUpdate.photoURL = await uploadImage(teacherToUpdate.photoURL, `teachers/${schoolId}`);
  }

  teachers = teachers.map(teacher =>
    teacher.id === teacherToUpdate.id ? teacherToUpdate : teacher
  );
  storeTeachers(teachers, schoolId);
  return teacherToUpdate;
}

export function deleteTeacher(id: string, schoolId: string): void {
  let teachers = getTeachers(schoolId);
  teachers = teachers.filter(teacher => teacher.id !== id);
  storeTeachers(teachers, schoolId);
}
