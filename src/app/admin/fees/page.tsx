
'use client';

import { useState } from 'react';
import {
  DollarSign,
  Receipt,
  MoreHorizontal,
  PlusCircle,
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
  totalFees: number;
  feesPaid: number;
};

const initialStudents: StudentFee[] = [
  { id: '24001', name: 'Olivia Martin', grade: 10, avatarHint: 'student portrait', totalFees: 5000, feesPaid: 2500 },
  { id: '24002', name: 'Jackson Lee', grade: 9, avatarHint: 'boy student', totalFees: 5000, feesPaid: 5000 },
  { id: '24003', name: 'Sofia Nguyen', grade: 11, avatarHint: 'girl smiling', totalFees: 5500, feesPaid: 1000 },
  { id: '24004', name: 'Isabella Patel', grade: 12, avatarHint: 'boy glasses', totalFees: 6000, feesPaid: 6000 },
  { id: '24005', name: 'William Kim', grade: 9, avatarHint: 'student smiling', totalFees: 5000, feesPaid: 3000 },
  { id: '24006', name: 'Ava Brown', grade: 10, avatarHint: 'girl portrait', totalFees: 5000, feesPaid: 0 },
];

export default function FeesPage() {
  const [students, setStudents] = useState(initialStudents);
  const [isCollectFeeDialogOpen, setIsCollectFeeDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentFee | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const { toast } = useToast();

  const handleCollectFeeClick = (student: StudentFee) => {
    setSelectedStudent(student);
    setPaymentAmount('');
    setIsCollectFeeDialogOpen(true);
  };

  const handleProcessPayment = () => {
    if (!selectedStudent || !paymentAmount) return;

    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({ variant: 'destructive', title: 'Invalid Amount', description: 'Please enter a valid payment amount.' });
      return;
    }

    const remainingFees = selectedStudent.totalFees - selectedStudent.feesPaid;
    if (amount > remainingFees) {
      toast({ variant: 'destructive', title: 'Overpayment Error', description: `Payment cannot exceed the remaining balance of ₹${remainingFees}.` });
      return;
    }

    setStudents(students.map(s => 
      s.id === selectedStudent.id 
        ? { ...s, feesPaid: s.feesPaid + amount } 
        : s
    ));
    
    toast({ title: 'Payment Successful', description: `₹${amount} collected from ${selectedStudent.name}.` });
    setIsCollectFeeDialogOpen(false);
    setSelectedStudent(null);
  };

  const totalCollected = students.reduce((acc, s) => acc + s.feesPaid, 0);
  const totalFees = students.reduce((acc, s) => acc + s.totalFees, 0);
  const totalRemaining = totalFees - totalCollected;

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold">Fee Management</h1>
            <p className="text-muted-foreground">Track and manage student fee payments and installments.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Invoice
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 my-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Fees Collected</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹{totalCollected.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">from {students.length} students</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pending Fees</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹{totalRemaining.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">outstanding from all students</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
                <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{((totalCollected / totalFees) * 100).toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">of total fee target collected</p>
            </CardContent>
        </Card>
      </div>

      <Card>
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
              {students.map((student) => {
                const remaining = student.totalFees - student.feesPaid;
                const paidPercentage = (student.feesPaid / student.totalFees) * 100;
                const isPaid = remaining <= 0;

                return (
                    <TableRow key={student.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint={student.avatarHint} />
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
                    className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Cancel
                    </Button>
                </DialogClose>
              <Button type="button" onClick={handleProcessPayment}>Process Payment</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
