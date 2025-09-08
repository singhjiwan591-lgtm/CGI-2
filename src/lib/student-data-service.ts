
'use client';

// In-memory data store for students that persists in localStorage
// In a real application, this would be a database.

export type Student = {
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
  status: 'Enrolled' | 'Withdrawn' | 'Graduated';
  program: string;
  motherName?: string;
  religion?: string;
  fatherOccupation?: string;
  admissionDate: string;
  section?: string;
  fees?: StudentFee;
  password?: string;
  course?: string;
};

export type StudentFee = {
  id: string;
  name: string;
  grade: number;
  avatarHint: string;
  photoURL?: string;
  totalFees: number;
  feesPaid: number;
  installments: Installment[];
  registrationFeePaid: boolean;
};

export type Installment = {
  id: number;
  dueDate: Date;
  amount: number;
  status: InstallmentStatus;
  paymentDate?: Date;
  linkSent?: boolean;
};

export type InstallmentStatus = 'Paid' | 'Due' | 'Overdue' | 'Link Sent';

const getSchoolDataKey = (schoolId: string) => `mockStudentsData_${schoolId}`;

const initialMockStudents: Student[] = [
  { id: '1', name: 'Ravi Kumar', roll: '1001', grade: '12', parent: 'Manoj Kumar', gender: 'Male', address: 'Mumbai, India', dob: '2006-05-15', phone: '+91 9876543210', email: 'ravi@example.com', password: 'password123', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'male student', status: 'Enrolled', program: 'Science', admissionDate: '2022-04-01', motherName: 'Anjali Kumar', religion: 'Hinduism', fatherOccupation: 'Engineer' },
  { id: '2', name: 'Priya Sharma', roll: '1002', grade: '11', parent: 'Sunil Sharma', gender: 'Female', address: 'Delhi, India', dob: '2007-02-20', phone: '+91 9876543211', email: 'priya@example.com', password: 'password123', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'female student', status: 'Graduated', program: 'Arts', admissionDate: '2021-04-10', motherName: 'Reena Sharma', religion: 'Hinduism', fatherOccupation: 'Doctor' },
  { id: '3', name: 'Amit Patel', roll: '1003', grade: '12', parent: 'Rajesh Patel', gender: 'Male', address: 'Ahmedabad, India', dob: '2006-08-10', phone: '+91 9876543212', email: 'amit@example.com', password: 'password123', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'boy student', status: 'Graduated', program: 'Technology', admissionDate: '2022-04-05', motherName: 'Jayshree Patel', religion: 'Hinduism', fatherOccupation: 'Businessman' },
  { id: '4', name: 'Sunita Devi', roll: '1004', grade: '10', parent: 'Anil Singh', gender: 'Female', address: 'Patna, India', dob: '2008-11-25', phone: '+91 9876543213', email: 'sunita@example.com', password: 'password123', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'girl smiling', status: 'Enrolled', program: 'Commerce', admissionDate: '2023-04-15', motherName: 'Babita Devi', religion: 'Hinduism', fatherOccupation: 'Farmer' },
  { id: '5', name: 'Vijay Singh', roll: '1005', grade: '11', parent: 'Kiran Singh', gender: 'Male', address: 'Jaipur, India', dob: '2007-07-07', phone: '+91 9876543214', email: 'vijay@example.com', password: 'password123', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'student glasses', status: 'Withdrawn', program: 'Science', admissionDate: '2021-05-20', motherName: 'Meena Singh', religion: 'Sikhism', fatherOccupation: 'Army Officer' },
];

function initializeStudentData() {
  if (typeof window !== 'undefined') {
    const schoolIds = ['jalalabad', 'golu_ka_mor'];
    schoolIds.forEach(schoolId => {
      const key = getSchoolDataKey(schoolId);
      if (!localStorage.getItem(key)) {
        const schoolSpecificData = schoolId === 'golu_ka_mor'
          ? initialMockStudents.map(s => ({...s, name: `GKM-${s.name}`}))
          : initialMockStudents;
        localStorage.setItem(key, JSON.stringify(schoolSpecificData));
        schoolSpecificData.forEach(student => {
            if (!student.fees) {
                generateFeeForStudent(student, schoolId);
            }
        });
      }
    });
  }
}

if (typeof window !== 'undefined') {
    initializeStudentData();
}


export function getAllStudents(schoolId: string): Student[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(getSchoolDataKey(schoolId));
  return data ? JSON.parse(data) : [];
}

export function addStudent(studentData: Omit<Student, 'id' | 'roll' | 'avatarHint' | 'status' | 'program' | 'admissionDate'> & { registrationFeePaid?: boolean }, schoolId: string): Student {
  if (typeof window === 'undefined') throw new Error("Local storage not available");

  const students = getAllStudents(schoolId);
  const newId = (Math.max(0, ...students.map(s => parseInt(s.id))) + 1).toString();
  const newRoll = (Math.max(1000, ...students.map(s => parseInt(s.roll))) + 1).toString();

  const newStudent: Student = {
    ...studentData,
    id: newId,
    roll: newRoll,
    avatarHint: studentData.gender?.toLowerCase() === 'female' ? 'female student' : 'male student',
    photoURL: studentData.photoURL || 'https://placehold.co/100x100.png',
    status: 'Enrolled',
    program: studentData.course || 'Not Assigned',
    admissionDate: new Date().toISOString(),
  };

  const updatedStudents = [newStudent, ...students];
  localStorage.setItem(getSchoolDataKey(schoolId), JSON.stringify(updatedStudents));
  generateFeeForStudent(newStudent, schoolId, studentData.registrationFeePaid);
  return newStudent;
}

export function updateStudent(studentId: string, updatedData: Partial<Student>, schoolId: string): Student {
  if (typeof window === 'undefined') throw new Error("Local storage not available");
  
  const students = getAllStudents(schoolId);
  const index = students.findIndex(s => s.id === studentId);
  if (index === -1) throw new Error("Student not found");

  students[index] = { ...students[index], ...updatedData };
  localStorage.setItem(getSchoolDataKey(schoolId), JSON.stringify(students));
  return students[index];
}

export function updateStudentData(studentId: string, schoolId: string, dataToUpdate: Partial<Student>) {
    if (typeof window !== 'undefined') {
        const students = getAllStudents(schoolId);
        const studentIndex = students.findIndex(s => s.id === studentId);
        if (studentIndex > -1) {
            const existingFees = students[studentIndex].fees;
            students[studentIndex] = { ...students[studentIndex], ...dataToUpdate };
            if (dataToUpdate.fees) {
                 students[studentIndex].fees = { ...(existingFees || {}), ...dataToUpdate.fees, id: studentId, name: students[studentIndex].name, grade: parseInt(students[studentIndex].grade), photoURL: students[studentIndex].photoURL, avatarHint: students[studentIndex].avatarHint };
            } else {
                students[studentIndex].fees = existingFees;
            }
            localStorage.setItem(getSchoolDataKey(schoolId), JSON.stringify(students));
        }
    }
}


export function getStudentById(id: string, schoolId: string): Student | undefined {
  return getAllStudents(schoolId).find(s => s.id === id);
}

export function getStudentByRoll(roll: string, schoolId?: string): Student | undefined {
  const schoolIds = schoolId ? [schoolId] : ['jalalabad', 'golu_ka_mor'];
  for (const id of schoolIds) {
    const student = getAllStudents(id).find(s => s.roll === roll);
    if (student) return student;
  }
  return undefined;
}

export function getStudentByEmail(email: string, schoolId: string): Student | undefined {
  return getAllStudents(schoolId).find(s => s.email.toLowerCase() === email.toLowerCase());
}

// --- Fee related functions ---
import { addMonths, isPast } from 'date-fns';

const generateInstallments = (totalFees: number, registrationFeePaid: boolean = false): Installment[] => {
    const registrationFee = 100;
    let feesToInstall = totalFees;
    let installments: Installment[] = [];
    
    if (registrationFeePaid) {
        feesToInstall = totalFees - registrationFee;
        installments.push({
            id: 0,
            dueDate: new Date(),
            amount: registrationFee,
            status: 'Paid',
            paymentDate: new Date(),
            linkSent: false
        });
    }
    
    const installmentCount = 6;
    const perInstallmentAmount = feesToInstall > 0 ? Math.round(feesToInstall / installmentCount) : 0;
    const today = new Date();

    for (let i = 0; i < installmentCount; i++) {
        const dueDate = addMonths(new Date(today.getFullYear(), today.getMonth(), 15), i + 1);
        let status: 'Due' | 'Overdue' = isPast(dueDate) ? 'Overdue' : 'Due';
        
        installments.push({
            id: i + 1,
            dueDate: dueDate,
            amount: perInstallmentAmount,
            status: status,
            linkSent: false,
        });
    }
    return installments;
};

const generateFeeForStudent = (student: Student, schoolId: string, registrationFeePaid: boolean = false) => {
    const totalFees = student.grade === '12' ? 60000 : student.grade === '11' ? 50000 : 45000;
    const installments = generateInstallments(totalFees, registrationFeePaid);
    const feesPaid = installments.filter(i => i.status === 'Paid').reduce((acc, i) => acc + i.amount, 0);

    const feeData: StudentFee = {
        id: student.id,
        name: student.name,
        grade: parseInt(student.grade),
        avatarHint: student.avatarHint,
        photoURL: student.photoURL,
        totalFees,
        feesPaid,
        installments,
        registrationFeePaid,
    };

    updateStudentData(student.id, schoolId, { fees: feeData });
};

export function getAllStudentsWithFees(schoolId: string): StudentFee[] {
    const students = getAllStudents(schoolId);
    return students.map(s => {
        if (s.fees && s.fees.installments) {
            const feesPaid = s.fees.installments.filter(i => i.status === 'Paid').reduce((acc, i) => acc + i.amount, 0);
            s.fees.feesPaid = feesPaid;
            
            s.fees.installments.forEach(inst => {
                if (isPast(new Date(inst.dueDate)) && inst.status === 'Due') {
                    inst.status = 'Overdue';
                }
            });
            updateStudentData(s.id, schoolId, { fees: s.fees });
            return s.fees;
        }
        
        // This will now be called by initialize or addStudent
        // It's a fallback here.
        const tempFees: StudentFee = {
            id: s.id, name: s.name, grade: parseInt(s.grade), totalFees: 0, feesPaid: 0, installments: [], registrationFeePaid: false, avatarHint: s.avatarHint, photoURL: s.photoURL
        };
        return tempFees;
    }).filter(Boolean) as StudentFee[];
}
