
// A simple in-memory data store for students that persists in sessionStorage
// In a real application, this would be a database.

type Student = {
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
  fees?: StudentFee; // Optional fee data can be attached
};

type InstallmentStatus = 'Paid' | 'Due' | 'Overdue' | 'Link Sent';

type Installment = {
  id: number;
  dueDate: Date;
  amount: number;
  status: InstallmentStatus;
  paymentDate?: Date;
  linkSent?: boolean;
};

type StudentFee = {
  id: string; // Should match student id
  name: string; // Should match student name
  grade: number;
  avatarHint: string;
  photoURL?: string;
  totalFees: number;
  feesPaid: number;
  installments: Installment[];
  registrationFeePaid: boolean;
};

const MOCK_STUDENTS_KEY = 'mockStudentsData';

const initialMockStudents: Student[] = [
    { id: '1', name: 'Ravi Kumar', roll: '1001', grade: '12', parent: 'Manoj Kumar', gender: 'Male', address: 'Mumbai, India', dob: '2006-05-15', phone: '+91 9876543210', email: 'ravi@example.com', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'male student', status: 'Enrolled', program: 'Science', admissionDate: '2022-04-01', motherName: 'Anjali Kumar', religion: 'Hinduism', fatherOccupation: 'Engineer' },
    { id: '2', name: 'Priya Sharma', roll: '1002', grade: '11', parent: 'Sunita Sharma', gender: 'Female', address: 'Delhi, India', dob: '2007-02-20', phone: '+91 9876543211', email: 'priya@example.com', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'female student', status: 'Graduated', program: 'Arts', admissionDate: '2021-04-10', motherName: 'Reena Sharma', religion: 'Hinduism', fatherOccupation: 'Doctor' },
    { id: '3', name: 'Amit Patel', roll: '1003', grade: '12', parent: 'Rajesh Patel', gender: 'Male', address: 'Ahmedabad, India', dob: '2006-08-10', phone: '+91 9876543212', email: 'amit@example.com', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'boy student', status: 'Graduated', program: 'Technology', admissionDate: '2022-04-05', motherName: 'Jayshree Patel', religion: 'Hinduism', fatherOccupation: 'Businessman' },
    { id: '4', name: 'Sunita Devi', roll: '1004', grade: '10', parent: 'Anil Singh', gender: 'Female', address: 'Patna, India', dob: '2008-11-25', phone: '+91 9876543213', email: 'sunita@example.com', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'girl smiling', status: 'Enrolled', program: 'Commerce', admissionDate: '2023-04-15', motherName: 'Babita Devi', religion: 'Hinduism', fatherOccupation: 'Farmer' },
    { id: '5', name: 'Vijay Singh', roll: '1005', grade: '11', parent: 'Kiran Singh', gender: 'Male', address: 'Jaipur, India', dob: '2007-07-07', phone: '+91 9876543214', email: 'vijay@example.com', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'student glasses', status: 'Withdrawn', program: 'Science', admissionDate: '2021-05-20', motherName: 'Meena Singh', religion: 'Sikhism', fatherOccupation: 'Army Officer' },
];


function initializeData() {
    if (typeof window !== 'undefined') {
        const storedData = sessionStorage.getItem(MOCK_STUDENTS_KEY);
        if (!storedData) {
            sessionStorage.setItem(MOCK_STUDENTS_KEY, JSON.stringify(initialMockStudents));
        }
    }
}

initializeData();

export function getAllStudents(): Student[] {
    if (typeof window === 'undefined') {
        return initialMockStudents;
    }
    const data = sessionStorage.getItem(MOCK_STUDENTS_KEY);
    return data ? JSON.parse(data) : [];
}

export function updateAllStudents(students: Student[]) {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem(MOCK_STUDENTS_KEY, JSON.stringify(students));
    }
}


export function addStudent(studentData: Omit<Student, 'id' | 'roll'| 'avatarHint' | 'status' | 'program' | 'admissionDate'> & { registrationFeePaid?: boolean }): Student | null {
    if (typeof window === 'undefined') return null;

    const students = getAllStudents();
    const newId = (Math.max(...students.map(s => parseInt(s.id, 10)), 0) + 1).toString();
    const roll = (Math.max(...students.map(s => parseInt(s.roll, 10)), 1000) + 1).toString();

    const newStudent: Student = {
        ...studentData,
        id: newId,
        roll,
        avatarHint: studentData.gender.toLowerCase() === 'female' ? 'female student' : 'male student',
        photoURL: studentData.photoURL || 'https://placehold.co/100x100.png',
        status: 'Enrolled',
        program: 'Not Assigned', // Default program
        admissionDate: new Date().toISOString().split('T')[0],
    };
    
    const updatedStudents = [newStudent, ...students];
    sessionStorage.setItem(MOCK_STUDENTS_KEY, JSON.stringify(updatedStudents));
    // After adding student, ensure their fee data is also generated
    generateFeeForStudent(newStudent, studentData.registrationFeePaid || false);
    return newStudent;
}

export function getStudentById(id: string): Student | undefined {
    const students = getAllStudents();
    return students.find(s => s.id === id);
}

export function updateStudentData(studentId: string, dataToUpdate: Partial<Student>) {
    if (typeof window !== 'undefined') {
        const students = getAllStudents();
        const studentIndex = students.findIndex(s => s.id === studentId);
        if (studentIndex > -1) {
            // Merge new data with existing data, ensuring fees are not lost
            const existingFees = students[studentIndex].fees;
            students[studentIndex] = { ...students[studentIndex], ...dataToUpdate };
            if (dataToUpdate.fees) {
                 students[studentIndex].fees = { ...existingFees, ...dataToUpdate.fees };
            } else {
                students[studentIndex].fees = existingFees;
            }
            sessionStorage.setItem(MOCK_STUDENTS_KEY, JSON.stringify(students));
        }
    }
}


// --- Fee related functions using the same data source ---
import { addMonths, isPast } from 'date-fns';

const generateInstallments = (totalFees: number, registrationFeePaid: boolean): Installment[] => {
    const registrationFee = 100;
    const remainingFees = totalFees - (registrationFeePaid ? registrationFee : 0);
    const installmentCount = 6;
    const installmentAmount = Math.round(remainingFees / installmentCount);
    const today = new Date();
    
    let installments = Array.from({ length: installmentCount }, (_, i) => {
        const dueDate = addMonths(new Date(today.getFullYear(), today.getMonth(), 15), i);
        let status: 'Due' | 'Overdue' = isPast(dueDate) ? 'Overdue' : 'Due';
        
        return {
            id: i + 1,
            dueDate: dueDate,
            amount: installmentAmount,
            status: status as InstallmentStatus,
            linkSent: false,
        };
    });

    if (registrationFeePaid) {
        installments.unshift({
            id: 0, // Special ID for registration fee
            dueDate: today,
            amount: registrationFee,
            status: 'Paid',
            paymentDate: today,
            linkSent: false
        });
    }

    return installments;
};

const generateFeeForStudent = (student: Student, registrationFeePaid: boolean = false): StudentFee => {
     // This is a simplified fee structure. Could be more complex in a real app.
    const totalFees = student.grade === '12' ? 60000 : student.grade === '11' ? 50000 : 45000;
    const installments = generateInstallments(totalFees, registrationFeePaid);
    const feesPaid = installments.filter(i => i.status === 'Paid').reduce((acc, i) => acc + i.amount, 0);

     const feeData: StudentFee = {
        id: student.id,
        name: student.name,
        grade: parseInt(student.grade, 10),
        avatarHint: student.avatarHint,
        photoURL: student.photoURL,
        totalFees,
        feesPaid,
        installments,
        registrationFeePaid,
    };
    // Attach the new fee data to the student record for persistence
    updateStudentData(student.id, { fees: feeData });
    return feeData;
};

export function getAllStudentsWithFees(): StudentFee[] {
    const students = getAllStudents();
    return students.map(s => {
        if (s.fees && s.fees.installments) {
            const feesPaid = s.fees.installments.filter(i => i.status === 'Paid').reduce((acc, i) => acc + i.amount, 0);
            return {...s.fees, feesPaid};
        }
        
        // This handles students who might not have fee data generated yet.
        return generateFeeForStudent(s);
    });
}
