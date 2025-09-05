
'use client';

import {
  Users,
  Wallet,
  Book,
  GraduationCap,
  Loader2,
  Calendar,
  Percent,
  ClipboardList,
  Users2,
  Banknote,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Megaphone
} from 'lucide-react';
import { useState, useEffect } from 'react';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { Button } from '@/components/ui/button';
import { formatNumber } from '@/lib/utils';
import Link from 'next/link';

const InfoCard = ({ icon, title, value, description, iconBgColor }: { icon: React.ReactNode, title: string, value: string, description: string, iconBgColor: string }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {React.cloneElement(icon as React.ReactElement, { className: "h-4 w-4 text-muted-foreground" })}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
);

const recentStudents = [
    { name: 'Ravi Kumar', email: 'ravi.k@example.com', course: 'ADCA', avatar: 'https://placehold.co/100x100.png', hint: 'student portrait' },
    { name: 'Priya Sharma', email: 'priya.s@example.com', course: 'Web Development', avatar: 'https://placehold.co/100x100.png', hint: 'student smiling' },
    { name: 'Amit Patel', email: 'amit.p@example.com', course: 'DCA', avatar: 'https://placehold.co/100x100.png', hint: 'student happy' },
    { name: 'Sunita Devi', email: 'sunita.d@example.com', course: 'Graphic Design', avatar: 'https://placehold.co/100x100.png', hint: 'student thinking' },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);

  // Mock data for dashboard
  const totalRevenue = 1250000;
  const totalStudents = 350;
  const newStudentsThisMonth = 22;
  const overallAttendance = 92.5;

  if (loading) {
      return (
          <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  return (
    <div className="flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <InfoCard 
                title="Total Revenue"
                value={`₹${formatNumber(totalRevenue)}`}
                description="+20.1% from last month"
                icon={<Banknote />}
                iconBgColor="bg-blue-100"
            />
            <InfoCard 
                title="Total Students"
                value={`+${totalStudents}`}
                description="All active students"
                icon={<Users />}
                iconBgColor="bg-green-100"
            />
            <InfoCard 
                title="New Enrollments"
                value={`+${newStudentsThisMonth}`}
                description="In this month"
                icon={<GraduationCap />}
                iconBgColor="bg-purple-100"
            />
            <InfoCard 
                title="Attendance"
                value={`${overallAttendance}%`}
                description="This week's average"
                icon={<Percent />}
                iconBgColor="bg-yellow-100"
            />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle>Recent Enrollments</CardTitle>
                    <CardDescription>
                        New students who joined this month.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead className="hidden sm:table-cell">Course</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentStudents.map(student => (
                            <TableRow key={student.email}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={student.avatar} data-ai-hint={student.hint} />
                                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="font-medium">{student.name}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <Badge variant="outline">{student.course}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button asChild size="sm" variant="outline">
                                        <Link href="/admin/students">View</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                        Frequently used admin tasks.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <Link href="/admin/students" className="w-full">
                       <Button className="w-full justify-start" variant="outline">
                           <Users2 className="mr-2 h-4 w-4"/> Manage Students
                       </Button>
                    </Link>
                     <Link href="/admin/fees" className="w-full">
                       <Button className="w-full justify-start" variant="outline">
                           <DollarSign className="mr-2 h-4 w-4"/> Collect Fees
                       </Button>
                    </Link>
                     <Link href="/admin/attendance" className="w-full">
                       <Button className="w-full justify-start" variant="outline">
                           <ClipboardList className="mr-2 h-4 w-4"/> Mark Attendance
                       </Button>
                    </Link>
                     <Link href="/admin/notice" className="w-full">
                       <Button className="w-full justify-start" variant="outline">
                           <Megaphone className="mr-2 h-4 w-4"/> Post a Notice
                       </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
