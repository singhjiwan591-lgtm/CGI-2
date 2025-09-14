
'use client';

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

const initialMockTeachers: Teacher[] = [
  { id: '1', name: 'Mrs. Sharma', qualification: 'M.Sc. in Computer Science', phone: '9876543210', email: 'sharma@example.com', address: 'Jalalabad, Punjab', salary: 50000, joiningDate: '2018-07-15', photoURL: 'https://picsum.photos/seed/teacher1/100/100', avatarHint: 'female teacher' },
  { id: '2', name: 'Mr. Verma', qualification: 'MCA', phone: '9876543211', email: 'verma@example.com', address: 'Firozpur, Punjab', salary: 55000, joiningDate: '2020-03-01', photoURL: 'https://picsum.photos/seed/teacher2/100/100', avatarHint: 'male teacher' },
];

const initializeMockTeachers = (schoolId: string) => {
    const key = getTeachersKey(schoolId);
    const schoolSpecificData = schoolId === 'golu_ka_mor'
        ? initialMockTeachers.map(t => ({...t, name: `GKM ${t.name}`}))
        : initialMockTeachers;
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(schoolSpecificData));
    }
    return schoolSpecificData;
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
        return initializeMockTeachers(schoolId);
    }
  }
  
  return initializeMockTeachers(schoolId);
}

export function addTeacher(data: Omit<Teacher, 'id' | 'joiningDate'>, schoolId: string): Teacher {
  const teachers = getTeachers(schoolId);
  const newTeacher: Teacher = {
    id: new Date().getTime().toString(),
    ...data,
    joiningDate: new Date().toISOString(),
    photoURL: data.photoURL || 'https://picsum.photos/seed/newteacher/100/100',
  };
  const updatedTeachers = [newTeacher, ...teachers];
  localStorage.setItem(getTeachersKey(schoolId), JSON.stringify(updatedTeachers));
  return newTeacher;
}

export function updateTeacher(teacherToUpdate: Teacher, schoolId: string): Teacher {
  let teachers = getTeachers(schoolId);
  teachers = teachers.map(teacher =>
    teacher.id === teacherToUpdate.id ? teacherToUpdate : teacher
  );
  localStorage.setItem(getTeachersKey(schoolId), JSON.stringify(teachers));
  return teacherToUpdate;
}

export function deleteTeacher(id: string, schoolId: string): void {
  let teachers = getTeachers(schoolId);
  teachers = teachers.filter(teacher => teacher.id !== id);
  localStorage.setItem(getTeachersKey(schoolId), JSON.stringify(teachers));
}
