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
};

const MOCK_STUDENTS_KEY = 'mockStudentsData';

const initialMockStudents: Student[] = [
    { id: '1', name: 'Ravi Kumar', roll: '1001', grade: '12', parent: 'Manoj Kumar', gender: 'Male', address: 'Mumbai, India', dob: '2006-05-15', phone: '+91 9876543210', email: 'ravi@example.com', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'male student', status: 'Enrolled', program: 'Science' },
    { id: '2', name: 'Priya Sharma', roll: '1002', grade: '11', parent: 'Sunita Sharma', gender: 'Female', address: 'Delhi, India', dob: '2007-02-20', phone: '+91 9876543211', email: 'priya@example.com', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'female student', status: 'Graduated', program: 'Arts' },
    { id: '3', name: 'Amit Patel', roll: '1003', grade: '12', parent: 'Rajesh Patel', gender: 'Male', address: 'Ahmedabad, India', dob: '2006-08-10', phone: '+91 9876543212', email: 'amit@example.com', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'boy student', status: 'Graduated', program: 'Technology' },
    { id: '4', name: 'Sunita Devi', roll: '1004', grade: '10', parent: 'Anil Singh', gender: 'Female', address: 'Patna, India', dob: '2008-11-25', phone: '+91 9876543213', email: 'sunita@example.com', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'girl smiling', status: 'Enrolled', program: 'Commerce' },
    { id: '5', name: 'Vijay Singh', roll: '1005', grade: '11', parent: 'Kiran Singh', gender: 'Male', address: 'Jaipur, India', dob: '2007-07-07', phone: '+91 9876543214', email: 'vijay@example.com', photoURL: 'https://placehold.co/100x100.png', avatarHint: 'student glasses', status: 'Withdrawn', program: 'Science' },
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


export function addStudent(studentData: Omit<Student, 'id' | 'roll'| 'avatarHint' | 'photoURL' | 'status'>): Student | null {
    if (typeof window === 'undefined') return null;

    const students = getAllStudents();
    const newId = (Math.max(...students.map(s => parseInt(s.id, 10)), 0) + 1).toString();
    const roll = (Math.max(...students.map(s => parseInt(s.roll, 10)), 1000) + 1).toString();

    const newStudent: Student = {
        ...studentData,
        id: newId,
        roll,
        avatarHint: studentData.gender.toLowerCase() === 'female' ? 'female student' : 'male student',
        photoURL: 'https://placehold.co/100x100.png',
        status: 'Enrolled', // All new students start as enrolled
    };
    
    const updatedStudents = [newStudent, ...students];
    sessionStorage.setItem(MOCK_STUDENTS_KEY, JSON.stringify(updatedStudents));
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
            students[studentIndex] = { ...students[studentIndex], ...dataToUpdate };
            updateAllStudents(students);
        }
    }
}


// --- Fee related functions using the same data source ---
import { addMonths, isPast } from 'date-fns';

const generateInstallments = (totalFees: number): Installment[] => {
    const installmentAmount = Math.round(totalFees / 6); // Round to avoid decimals
    const today = new Date();
    return Array.from({ length: 6 }, (_, i) => {
        const dueDate = addMonths(new Date(today.getFullYear(), today.getMonth(), 15), i - 1); // Start from last month for some overdue
        let status: 'Due' | 'Overdue' = isPast(dueDate) ? 'Overdue' : 'Due';
        
        return {
            id: i + 1,
            dueDate: dueDate,
            amount: installmentAmount,
            status: status,
            linkSent: false,
        };
    });
};

export function getAllStudentsWithFees(): StudentFee[] {
    const students = getAllStudents();
    return students.map(s => {
        if (s.fees) {
            const feesPaid = s.fees.installments.filter(i => i.status === 'Paid').reduce((acc, i) => acc + i.amount, 0);
            return {...s.fees, feesPaid};
        }

        // This is a simplified fee structure. Could be more complex in a real app.
        const totalFees = s.grade === '12' ? 60000 : s.grade === '11' ? 50000 : 45000;
        const installments = generateInstallments(totalFees);
        
        // Mock some payments for initial data if it's one of the original students
        if (s.id === '2') { // Priya Sharma - let's make her fully paid
             installments.forEach(i => {
                i.status = 'Paid';
                i.paymentDate = new Date();
            });
        }
        if (s.id === '3') { // Amit Patel
            installments[0].status = 'Paid';
            installments[0].paymentDate = new Date();
            installments[1].status = 'Paid';
            installments[1].paymentDate = new Date();
        }
        const feesPaid = installments.filter(i => i.status === 'Paid').reduce((acc, i) => acc + i.amount, 0);

        const feeData: StudentFee = {
            id: s.id,
            name: s.name,
            grade: parseInt(s.grade, 10),
            avatarHint: s.avatarHint,
            photoURL: s.photoURL,
            totalFees,
            feesPaid,
            installments,
        };

        // Attach the new fee data to the student record for persistence
        updateStudentData(s.id, { fees: feeData });

        return feeData;
    });
}