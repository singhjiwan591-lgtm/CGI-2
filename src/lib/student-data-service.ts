
'use client';

// In-memory data store for students that persists in localStorage
// In a real application, this would be a database.
import { addMonths, isPast } from 'date-fns';

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
  dueDate: string; // Stored as ISO string
  amount: number;
  status: InstallmentStatus;
  paymentDate?: string; // Stored as ISO string
  linkSent?: boolean;
};

export type InstallmentStatus = 'Paid' | 'Due' | 'Overdue' | 'Link Sent';

const getSchoolDataKey = (schoolId: string) => `mockStudentsData_${schoolId}`;

export function getAllStudents(schoolId: string): Student[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(getSchoolDataKey(schoolId));
  if (data) {
      try {
          const parsedData = JSON.parse(data);
          return Array.isArray(parsedData) ? parsedData : [];
      } catch (e) {
          console.error("Failed to parse students data:", e);
          return [];
      }
  }
  return [];
}

export function addStudent(studentData: Omit<Student, 'id' | 'roll' | 'avatarHint' | 'status' | 'program' | 'admissionDate'> & { registrationFeePaid?: boolean }, schoolId: string): Student {
  const students = getAllStudents(schoolId);
  const newId = (Math.max(0, ...students.map(s => parseInt(s.id))) + 1).toString();
  const newRoll = (Math.max(1000, ...students.map(s => parseInt(s.roll))) + 1).toString();

  const newStudent: Student = {
    ...studentData,
    id: newId,
    roll: newRoll,
    avatarHint: studentData.gender?.toLowerCase() === 'female' ? 'female student' : 'male student',
    photoURL: studentData.photoURL || `https://picsum.photos/seed/${newId}/100/100`,
    status: 'Enrolled',
    program: studentData.course || 'Not Assigned',
    admissionDate: new Date().toISOString(),
  };

  newStudent.fees = generateFeeForStudent(newStudent, studentData.registrationFeePaid);

  const updatedStudents = [newStudent, ...students];
  localStorage.setItem(getSchoolDataKey(schoolId), JSON.stringify(updatedStudents));
  return newStudent;
}

export function updateStudent(studentId: string, updatedData: Partial<Student>, schoolId: string): Student {
  const students = getAllStudents(schoolId);
  const index = students.findIndex(s => s.id === studentId);
  if (index === -1) throw new Error("Student not found");

  students[index] = { ...students[index], ...updatedData };
  localStorage.setItem(getSchoolDataKey(schoolId), JSON.stringify(students));
  return students[index];
}

export function deleteStudent(studentId: string, schoolId: string): void {
  const students = getAllStudents(schoolId);
  const updatedStudents = students.filter(s => s.id !== studentId);
  localStorage.setItem(getSchoolDataKey(schoolId), JSON.stringify(updatedStudents));
}

export function updateStudentData(studentId: string, schoolId: string, dataToUpdate: Partial<Student>) {
    const students = getAllStudents(schoolId);
    const studentIndex = students.findIndex(s => s.id === studentId);
    if (studentIndex > -1) {
        const existingStudent = students[studentIndex];
        const existingFees = existingStudent.fees;

        students[studentIndex] = { ...existingStudent, ...dataToUpdate };

        if (dataToUpdate.fees) {
             students[studentIndex].fees = { 
                 ...(existingFees || {} as StudentFee), 
                 ...dataToUpdate.fees, 
                 id: studentId, 
                 name: students[studentIndex].name, 
                 grade: parseInt(students[studentIndex].grade), 
                 photoURL: students[studentIndex].photoURL, 
                 avatarHint: students[studentIndex].avatarHint 
             };
        } else {
            students[studentIndex].fees = existingFees;
        }
        localStorage.setItem(getSchoolDataKey(schoolId), JSON.stringify(students));
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

const generateInstallments = (totalFees: number, registrationFeePaid: boolean = false): Installment[] => {
    const registrationFee = 100;
    let feesToInstall = totalFees;
    let installments: Installment[] = [];
    
    if (registrationFeePaid) {
        feesToInstall = totalFees - registrationFee;
        installments.push({
            id: 0,
            dueDate: new Date().toISOString(),
            amount: registrationFee,
            status: 'Paid',
            paymentDate: new Date().toISOString(),
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
            dueDate: dueDate.toISOString(),
            amount: perInstallmentAmount,
            status: status,
            linkSent: false,
        });
    }
    return installments;
};

const generateFeeForStudent = (student: Student, registrationFeePaid: boolean = false): StudentFee => {
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
    
    return feeData;
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
        
        const newFees = generateFeeForStudent(s);
        updateStudentData(s.id, schoolId, { fees: newFees });
        return newFees;

    }).filter((fee): fee is StudentFee => !!fee);
}
