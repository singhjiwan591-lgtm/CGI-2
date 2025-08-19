
'use client';

import { useState, useEffect } from 'react';
import {
  DollarSign,
  Receipt,
  MoreHorizontal,
  PlusCircle,
  Loader2
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

type StudentFee = {
  id: string;
  name: string;
  grade: number;
  avatarHint: string;
  photoURL?: string;
  totalFees: number;
  feesPaid: number;
};

// Mock data
const mockStudents: StudentFee[] = [
    { id: '1', name: 'Ravi Kumar', grade: 12, avatarHint: 'student portrait', photoURL: 'https://placehold.co/100x100.png', totalFees: 50000, feesPaid: 25000 },
    { id: '2', name: 'Priya Sharma', grade: 11, avatarHint: 'student smiling', photoURL: 'https://placehold.co/100x100.png', totalFees: 40000, feesPaid: 40000 },
    { id: '3', name: 'Amit Patel', grade: 12, avatarHint: 'student happy', photoURL: 'https://placehold.co/100x100.png', totalFees: 60000, feesPaid: 60000 },
    { id: '4', name: 'Sunita Devi', grade: 10, avatarHint: 'student thinking', photoURL: 'https://placehold.co/100x100.png', totalFees: 45000, feesPaid: 10000 },
    { id: '5', name: 'Vijay Singh', grade: 11, avatarHint: 'student outside', photoURL: 'https://placehold.co/100x100.png', totalFees: 50000, feesPaid: 30000 },
];

export default function FeesPage() {
  const [students, setStudents] = useState<StudentFee[]>(mockStudents);
  const [loading, setLoading] = useState(false);
  const [isCollectFeeDialogOpen, setIsCollectFeeDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentFee | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const { toast } = useToast();

  const handleCollectFeeClick = (student: StudentFee) => {
    setSelectedStudent(student);
    setPaymentAmount('');
    setIsCollectFeeDialogOpen(true);
  };

  const handleProcessPayment = async () => {
    if (!selectedStudent || !paymentAmount) return;
    setLoading(true);

    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({ variant: 'destructive', title: 'Invalid Amount', description: 'Please enter a valid payment amount.' });
      setLoading(false);
      return;
    }

    const remainingFees = selectedStudent.totalFees - selectedStudent.feesPaid;
    if (amount > remainingFees) {
      toast({ variant: 'destructive', title: 'Overpayment Error', description: `Payment cannot exceed the remaining balance of ₹${remainingFees}.` });
      setLoading(false);
      return;
    }

    // Mock payment processing
    setTimeout(() => {
        setStudents(students.map(s => 
            s.id === selectedStudent.id ? { ...s, feesPaid: s.feesPaid + amount } : s
        ));
        toast({ title: 'Payment Successful', description: `₹${amount} collected from ${selectedStudent.name}.` });
        setIsCollectFeeDialogOpen(false);
        setSelectedStudent(null);
        setLoading(false);
    }, 500);
  };

  const totalCollected = students.reduce((acc, s) => acc + s.feesPaid, 0);
  const totalFees = students.reduce((acc, s) => acc + s.totalFees, 0);
  const totalRemaining = totalFees - totalCollected;

  if (loading && !isCollectFeeDialogOpen) {
      return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
            <CardTitle>Fee Management</CardTitle>
            <CardDescription>Track and manage student fee payments and installments.</CardDescription>
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
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No student data available.
                  </TableCell>
                </TableRow>
              ) : students.map((student) => {
                const remaining = student.totalFees - student.feesPaid;
                const paidPercentage = student.totalFees > 0 ? (student.feesPaid / student.totalFees) * 100 : 0;
                const isPaid = remaining <= 0;

                return (
                    <TableRow key={student.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={student.photoURL} data-ai-hint={student.avatarHint} />
                                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div>{student.name}</div>
                                <div className="text-sm text-muted-foreground md:hidden">{student.grade}th Grade</div>
                            </div>
                        </div>
                    </TableCell>
                    <TableCell className="text-right">₹{student.totalFees.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₹{student.feesPaid.toLocaleString()}</TableCell>
                    <TableCell className={`text-right font-medium ${remaining > 0 ? 'text-destructive' : 'text-green-600'}`}>
                        ₹{remaining.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                        <div className="flex flex-col items-center gap-1">
                             <Badge variant={isPaid ? 'default' : 'secondary'} className={isPaid ? 'bg-green-600' : ''}>
                                {isPaid ? 'Paid' : 'Pending'}
                            </Badge>
                            <Progress value={paidPercentage} className="h-1.5 w-20 mt-1" indicatorClassName={isPaid ? 'bg-green-600' : ''} />
                        </div>
                    </TableCell>
                    <TableCell>
                         <Button variant="outline" size="sm" onClick={() => handleCollectFeeClick(student)} disabled={isPaid}>
                           <Receipt className="mr-2 h-4 w-4" /> Collect Fee
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
                Showing <strong>1-{students.length}</strong> of <strong>{students.length}</strong> students
            </div>
        </CardFooter>
      </Card>

      <Dialog open={isCollectFeeDialogOpen} onOpenChange={setIsCollectFeeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Collect Fee from {selectedStudent?.name}</DialogTitle>
              <DialogDescription>
                Enter the amount to be paid. The remaining balance is ₹{((selectedStudent?.totalFees ?? 0) - (selectedStudent?.feesPaid ?? 0)).toLocaleString()}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount (INR)
                </Label>
                <Input 
                    id="amount" 
                    name="amount" 
                    type="number" 
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Enter amount" 
                    className="col-span-3"
                    disabled={loading}
                 />
              </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary" disabled={loading}>
                        Cancel
                    </Button>
                </DialogClose>
              <Button type="button" onClick={handleProcessPayment} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Process Payment
              </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
