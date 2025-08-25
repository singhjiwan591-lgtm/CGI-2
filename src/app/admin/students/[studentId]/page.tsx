
'use client';

import {
  Loader2,
  Calendar,
  Percent,
  ClipboardList,
  Banknote,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { useState, useEffect } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { notFound, useParams } from 'next/navigation';
import { getStudentById } from '@/lib/student-data-service';
import { format } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { formatNumber } from '@/lib/utils';
import React from 'react';
import { Label } from '@/components/ui/label';

const StudentDetailsCard = ({ student }: { student: any }) => (
  <Card>
    <CardHeader>
      <CardTitle>About Me</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={student.photoURL} data-ai-hint={student.avatarHint} />
          <AvatarFallback>{student.name.split(' ').map((n:string) => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-bold">{student.name}</h3>
          <p className="text-sm text-muted-foreground">
            Aliquam erat volutpat. Curabiene natis massa sedde lacustiquen sodale word moun taiery.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Name:</span> <span className="font-medium">{student.name}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Gender:</span> <span className="font-medium">{student.gender}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Father Name:</span> <span className="font-medium">{student.parent}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Mother Name:</span> <span className="font-medium">{student.motherName || 'Not Specified'}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Date Of Birth:</span> <span className="font-medium">{student.dob ? format(new Date(student.dob), 'PPP') : 'Not Specified'}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Religion:</span> <span className="font-medium">{student.religion || 'Not Specified'}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Father Occupation:</span> <span className="font-medium">{student.fatherOccupation || 'Not Specified'}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">E-Mail:</span> <span className="font-medium">{student.email}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Admission Date:</span> <span className="font-medium">{student.admissionDate ? format(new Date(student.admissionDate), 'PPP') : 'Not Specified'}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Class:</span> <span className="font-medium">{student.grade}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Section:</span> <span className="font-medium">{student.section || 'A'}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Roll:</span> <span className="font-medium">{student.roll}</span></div>
        <div className="flex justify-between col-span-2"><span className="text-muted-foreground">Address:</span> <span className="font-medium text-right">{student.address}</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{student.phone}</span></div>
      </div>
    </CardContent>
  </Card>
);

const FeeSummaryCard = ({ fees }: { fees: any }) => {
  if (!fees) return null;

  const { totalFees, feesPaid } = fees;
  const remainingDue = totalFees - feesPaid;
  const paidPercentage = totalFees > 0 ? (feesPaid / totalFees) * 100 : 0;
  
  const InfoBox = ({ icon, title, value, bgColorClass }: { icon: React.ReactNode, title: string, value: string, bgColorClass: string }) => (
    <div className={`p-4 rounded-lg flex items-center gap-4 ${bgColorClass}`}>
      {icon}
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fee Summary</CardTitle>
        <CardDescription>An overview of the student's fee status.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
            <InfoBox icon={<Banknote className="h-8 w-8 text-blue-600"/>} title="Total Fees" value={`₹${formatNumber(totalFees)}`} bgColorClass="bg-blue-100 dark:bg-blue-900/30" />
            <InfoBox icon={<TrendingUp className="h-8 w-8 text-green-600"/>} title="Fees Paid" value={`₹${formatNumber(feesPaid)}`} bgColorClass="bg-green-100 dark:bg-green-900/30" />
            <InfoBox icon={<TrendingDown className="h-8 w-8 text-red-600"/>} title="Remaining Due" value={`₹${formatNumber(remainingDue)}`} bgColorClass="bg-red-100 dark:bg-red-900/30" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="fee-progress">Payment Progress</Label>
            <Progress id="fee-progress" value={paidPercentage} />
            <p className="text-sm text-muted-foreground text-right">{paidPercentage.toFixed(0)}% Paid</p>
        </div>
      </CardContent>
    </Card>
  )
};


export default function StudentProfilePage() {
  const params = useParams();
  const studentId = params.studentId as string;
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
        const parsedSession = JSON.parse(userSession);
        if (parsedSession.schoolId) {
             const foundStudent = getStudentById(studentId, parsedSession.schoolId);
             if (foundStudent) {
                setStudent(foundStudent);
             }
        }
    }
    setLoading(false);
  }, [studentId]);

  if (loading) {
      return (
          <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  if (!student) {
    return notFound();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <StudentDetailsCard student={student} />
        <FeeSummaryCard fees={student.fees} />
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-md bg-purple-50 border border-purple-200">
                <ClipboardList className="h-8 w-8 text-purple-500" />
                <div className="text-right">
                    <p className="text-muted-foreground">Notification</p>
                    <p className="text-2xl font-bold">12</p>
                </div>
            </div>
             <div className="flex items-center justify-between p-4 rounded-md bg-blue-50 border border-blue-200">
                <Calendar className="h-8 w-8 text-blue-500" />
                <div className="text-right">
                    <p className="text-muted-foreground">Events</p>
                    <p className="text-2xl font-bold">6</p>
                </div>
            </div>
             <div className="flex items-center justify-between p-4 rounded-md bg-yellow-50 border border-yellow-200">
                <Percent className="h-8 w-8 text-yellow-500" />
                <div className="text-right">
                    <p className="text-muted-foreground">Attendance</p>
                    <p className="text-2xl font-bold">94%</p>
                </div>
            </div>
          </CardContent>
           <CardFooter>
            <Button variant="outline" className="w-full">All Exam Results</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
