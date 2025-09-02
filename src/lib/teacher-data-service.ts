
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
  { id: '1', name: 'Mrs. Sharma', qualification: 'M.Sc. in Computer Science', phone: '9876543210', email: 'sharma@example.com', address: 'Jalalabad, Punjab', salary: 50000, joiningDate: '2018-07-15', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'female teacher' },
  { id: '2', name: 'Mr. Verma', qualification: 'MCA', phone: '9876543211', email: 'verma@example.com', address: 'Firozpur, Punjab', salary: 55000, joiningDate: '2020-03-01', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'male teacher' },
];

const initializeMockTeachers = () => {
  if (typeof window === 'undefined') return;

  const schoolIds = ['jalalabad', 'golu_ka_mor'];
  schoolIds.forEach(schoolId => {
    const key = getTeachersKey(schoolId);
    if (!localStorage.getItem(key)) {
        const schoolSpecificData = schoolId === 'golu_ka_mor'
            ? initialMockTeachers.map(t => ({...t, name: `GKM ${t.name}`}))
            : initialMockTeachers;
      localStorage.setItem(key, JSON.stringify(schoolSpecificData));
    }
  });
};

initializeMockTeachers();

export async function getTeachers(schoolId: string): Promise<Teacher[]> {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(getTeachersKey(schoolId));
  const teachers: Teacher[] = data ? JSON.parse(data) : [];
  return teachers.sort((a, b) => new Date(b.joiningDate).getTime() - new Date(a.joiningDate).getTime());
}

export async function addTeacher(data: Omit<Teacher, 'id' | 'joiningDate'>, schoolId: string): Promise<Teacher> {
  if (typeof window === 'undefined') throw new Error("Local storage not available");
  const teachers = await getTeachers(schoolId);
  const newTeacher: Teacher = {
    id: new Date().getTime().toString(),
    ...data,
    joiningDate: new Date().toISOString(),
    photoURL: data.photoURL || 'https://placehold.co/100x100.png',
  };
  const updatedTeachers = [newTeacher, ...teachers];
  localStorage.setItem(getTeachersKey(schoolId), JSON.stringify(updatedTeachers));
  return newTeacher;
}

export async function updateTeacher(teacherToUpdate: Teacher, schoolId: string): Promise<Teacher> {
  if (typeof window === 'undefined') throw new Error("Local storage not available");
  let teachers = await getTeachers(schoolId);
  teachers = teachers.map(teacher =>
    teacher.id === teacherToUpdate.id ? teacherToUpdate : teacher
  );
  localStorage.setItem(getTeachersKey(schoolId), JSON.stringify(teachers));
  return teacherToUpdate;
}

export async function deleteTeacher(id: string, schoolId: string): Promise<void> {
  if (typeof window === 'undefined') throw new Error("Local storage not available");
  let teachers = await getTeachers(schoolId);
  teachers = teachers.filter(teacher => teacher.id !== id);
  localStorage.setItem(getTeachersKey(schoolId), JSON.stringify(teachers));
}
