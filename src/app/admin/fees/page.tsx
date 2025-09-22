
'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import {
  DollarSign,
  Receipt,
  Search,
  PlusCircle,
  Loader2,
  Banknote,
  TrendingUp,
  TrendingDown,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Send,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { formatNumber, cn } from '@/lib/utils';
import { format } from 'date-fns';
import { getAllStudentsWithFees, updateStudentData, StudentFee, Installment } from '@/lib/student-data-service';


const InfoCard = ({ icon, title, value, bgColor, iconColor }: { icon: React.ReactNode, title: string, value: string, bgColor: string, iconColor: string }) => (
  <Card className="flex items-center p-4 gap-4">
    <div className={`p-3 rounded-full ${bgColor}`}>
      {React.cloneElement(icon as React.ReactElement, { className: `h-6 w-6 ${iconColor}` })}
    </div>
    <div>
      <p className="text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </Card>
);

export default function FeesPage() {
  const [students, setStudents] = useState<StudentFee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentFee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
        const parsedSession = JSON.parse(userSession);
        if (parsedSession.schoolId) {
            setSchoolId(parsedSession.schoolId);
            setStudents(getAllStudentsWithFees(parsedSession.schoolId));
        }
    }
    setLoading(false);
  }, []);
  
  const refreshStudentData = () => {
    if (schoolId) {
        setStudents(getAllStudentsWithFees(schoolId));
    }
  }

  const handleViewDetails = (student: StudentFee) => {
    setSelectedStudent(student);
    setIsDetailsDialogOpen(true);
  };

  const handlePayInstallment = (studentId: string, installmentId: number) => {
    if (!schoolId) return;
    const studentToUpdate = students.find(s => s.id === studentId);
    if (!studentToUpdate || !studentToUpdate.installments) return;

    const updatedInstallments = studentToUpdate.installments.map(inst => {
      if (inst.id === installmentId && inst.status !== 'Paid') {
        return { ...inst, status: 'Paid' as const, paymentDate: new Date().toISOString() };
      }
      return inst;
    });

    const totalPaid = updatedInstallments
      .filter(inst => inst.status === 'Paid')
      .reduce((acc, inst) => acc + inst.amount, 0);

    const updatedStudent: StudentFee = { ...studentToUpdate, installments: updatedInstallments, feesPaid: totalPaid };
    
    updateStudentData(studentId, schoolId, { fees: updatedStudent });
    refreshStudentData(); // Refresh all data from source
    setSelectedStudent(prev => prev ? {...prev, installments: updatedInstallments, feesPaid: totalPaid} : null); // Also update dialog state immediately
    
    toast({ title: 'Success', description: 'Cash payment recorded successfully.' });
  };
  
  const handleSendPaymentLink = (studentId: string, installmentId: number) => {
    if (!schoolId) return;
    const studentToUpdate = students.find(s => s.id === studentId);
    if (!studentToUpdate || !studentToUpdate.installments) return;

    const updatedInstallments = studentToUpdate.installments.map(inst => {
      if (inst.id === installmentId) {
        return { ...inst, status: 'Link Sent' as const, linkSent: true };
      }
      return inst;
    });

    const updatedStudent: StudentFee = { ...studentToUpdate, installments: updatedInstallments };

    updateStudentData(studentId, schoolId, { fees: updatedStudent });
    refreshStudentData(); // Refresh all data from source
    setSelectedStudent(prev => prev ? {...prev, installments: updatedInstallments} : null); // Also update dialog state immediately

    toast({ title: 'Link Sent', description: `Payment link for Installment ${installmentId} sent to student.` });
  };


  const totalCollected = students.reduce((acc, s) => acc + (s.feesPaid || 0), 0);
  const totalFees = students.reduce((acc, s) => acc + (s.totalFees || 0), 0);
  const totalRemaining = totalFees - totalCollected;

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    )
  }

  return (
    <div className="space-y-6">
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <InfoCard icon={<Banknote />} title="Total Fees" value={`₹${formatNumber(totalFees)}`} bgColor="bg-blue-100 dark:bg-blue-900/30" iconColor="text-blue-500" />
          <InfoCard icon={<TrendingUp />} title="Total Collected" value={`₹${formatNumber(totalCollected)}`} bgColor="bg-green-100 dark:bg-green-900/30" iconColor="text-green-500" />
          <InfoCard icon={<TrendingDown />} title="Total Due" value={`₹${formatNumber(totalRemaining)}`} bgColor="bg-red-100 dark:bg-red-900/30" iconColor="text-red-500" />
        </div>
      <Card>
        <CardHeader>
            <CardTitle>Fee Management</CardTitle>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <CardDescription>Track and manage student fee payments and installments.</CardDescription>
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search student..." 
                        className="pl-8 w-full md:w-[250px]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="text-right">Total Fees</TableHead>
                <TableHead className="text-right">Fees Paid</TableHead>
                <TableHead className="text-right">Remaining</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No student data available.
                  </TableCell>
                </TableRow>
              ) : filteredStudents.map((student) => {
                if (!student) return null; // Safety check
                const remaining = (student.totalFees || 0) - (student.feesPaid || 0);
                const paidPercentage = student.totalFees > 0 ? ((student.feesPaid || 0) / student.totalFees) * 100 : 0;
                const isPaid = remaining <= 0;

                return (
                    <TableRow key={student.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={student.photoURL} alt={`Photo of ${student.name}`} data-ai-hint={student.avatarHint} />
                                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div>{student.name}</div>
                                <div className="text-sm text-muted-foreground md:hidden">{student.grade}th Grade</div>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="text-right">₹{(student.totalFees || 0).toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{(student.feesPaid || 0).toLocaleString()}</TableCell>
                    <TableCell className={`text-right font-medium ${remaining > 0 ? 'text-destructive' : 'text-green-600'}`}>
                        ₹{remaining.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                        <div className="flex flex-col items-center gap-1">
                             <Badge variant={isPaid ? 'default' : 'secondary'} className={isPaid ? 'bg-green-600 hover:bg-green-700' : ''}>
                                {isPaid ? 'Paid' : 'Pending'}
                            </Badge>
                            <Progress value={paidPercentage} className="h-1.5 w-20 mt-1" indicatorClassName={isPaid ? 'bg-green-600' : ''} />
                        </div>
                    </TableCell>
                    <TableCell className="text-right">
                         <Button variant="outline" size="sm" onClick={() => handleViewDetails(student)}>
                           <Eye className="mr-2 h-4 w-4" /> View Details
                        </Button>
                    </TableCell>
                    </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
            <div className="text-xs text-muted-foreground">
                Showing <strong>1-{filteredStudents.length}</strong> of <strong>{students.length}</strong> students
            </div>
        </CardFooter>
      </Card>

    <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Installment Details for {selectedStudent?.name}</DialogTitle>
              <DialogDescription>
                Manage individual installments. Total due: ₹{((selectedStudent?.totalFees ?? 0) - (selectedStudent?.feesPaid ?? 0)).toLocaleString()}
              </DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto pr-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Installment</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {selectedStudent?.installments && selectedStudent.installments.map(inst => (
                        <TableRow key={inst.id}>
                            <TableCell>Installment {inst.id === 0 ? 'Reg.' : inst.id}</TableCell>
                            <TableCell>{format(new Date(inst.dueDate), 'PPP')}</TableCell>
                            <TableCell>₹{inst.amount.toLocaleString()}</TableCell>
                            <TableCell>
                                <Badge variant={inst.status === 'Paid' ? 'default' : 'secondary'} className={cn(
                                    inst.status === 'Paid' && 'bg-green-600 hover:bg-green-700',
                                    inst.status === 'Overdue' && 'bg-red-500 hover:bg-red-600',
                                    inst.status === 'Due' && 'bg-yellow-500 hover:bg-yellow-600',
                                    inst.status === 'Link Sent' && 'bg-blue-500 hover:bg-blue-600',
                                )}>
                                     {inst.status === 'Paid' ? <CheckCircle className="mr-1 h-3 w-3" /> : <Clock className="mr-1 h-3 w-3" />}
                                     {inst.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button size="sm" variant="secondary" onClick={() => handlePayInstallment(selectedStudent.id, inst.id)} disabled={inst.status === 'Paid'}>
                                    <Receipt className="mr-2 h-4 w-4" /> Record Cash
                                </Button>
                                <Button size="sm" onClick={() => handleSendPaymentLink(selectedStudent.id, inst.id)} disabled={inst.status === 'Paid' || inst.status === 'Link Sent'}>
                                    <Send className="mr-2 h-4 w-4" /> Send Link
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </div>
            <DialogFooter className="mt-4 pt-4 border-t">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
