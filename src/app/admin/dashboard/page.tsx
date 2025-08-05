
'use client';

import {
  Activity,
  ArrowUpRight,
  BookUser,
  GraduationCap,
  Users,
  DollarSign,
  CircleOff,
  Wallet,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { Pie, PieChart, Cell } from 'recharts';

type Student = {
  id: string;
  name: string;
  grade: number;
  status: 'Enrolled' | 'Withdrawn' | 'Graduated';
  program: string;
  avatarHint: string;
  photoURL?: string;
  admissionDate: string;
};

const mockAdmissions: Student[] = [
    { id: '1', name: 'Ravi Sharma', grade: 11, status: 'Enrolled', program: 'Science', avatarHint: 'indian student', admissionDate: '2024-07-28' },
    { id: '2', name: 'Priya Patel', grade: 10, status: 'Enrolled', program: 'Arts', avatarHint: 'girl student', admissionDate: '2024-07-27' },
    { id: '3', name: 'Arjun Singh', grade: 12, status: 'Enrolled', program: 'Technology', avatarHint: 'boy smiling', admissionDate: '2024-07-25' },
    { id: '4', name: 'Sneha Gupta', grade: 11, status: 'Enrolled', program: 'Math', avatarHint: 'female student', admissionDate: '2024-07-24' },
    { id: '5', name: 'Vikram Kumar', grade: 9, status: 'Enrolled', program: 'Science', avatarHint: 'male student', admissionDate: '2024-07-22' },
];


const teachers = [
    { name: 'Dr. Evelyn Reed', subject: 'Principal', avatarHint: 'woman teacher', photoURL: 'https://placehold.co/100x100.png'},
    { name: 'Mr. David Chen', subject: 'Head of Academics', avatarHint: 'man teacher glasses', photoURL: 'https://placehold.co/100x100.png'},
    { name: 'Ms. Sunita Patel', subject: 'Science', avatarHint: 'woman teaching', photoURL: 'https://placehold.co/100x100.png'},
    { name: 'Mr. Amit Singh', subject: 'Mathematics', avatarHint: 'man corporate', photoURL: 'https://placehold.co/100x100.png'},
];

const programData = [
  { program: 'Science', students: 45, fill: 'var(--color-science)' },
  { program: 'Arts', students: 80, fill: 'var(--color-arts)' },
  { program: 'Technology', students: 25, fill: 'var(--color-tech)' },
  { program: 'Math', students: 50, fill: 'var(--color-math)' },
];

const chartConfig = {
  students: {
    label: 'Students',
  },
  science: {
    label: 'Science',
    color: 'hsl(var(--chart-1))',
  },
  arts: {
    label: 'Arts',
    color: 'hsl(var(--chart-2))',
  },
  tech: {
    label: 'Technology',
    color: 'hsl(var(--chart-3))',
  },
  math: {
    label: 'Math',
    color: 'hsl(var(--chart-4))',
  },
};


export default function DashboardPage() {
  const [recentAdmissions, setRecentAdmissions] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
        setRecentAdmissions(mockAdmissions);
        setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Income
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹1,250,450</div>
                <p className="text-xs text-muted-foreground">
                  +15.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pending Fees
                </CardTitle>
                <CircleOff className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹89,500</div>
                <p className="text-xs text-muted-foreground">
                  from 42 students
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  This Month's Income
                </CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹210,800</div>
                <p className="text-xs text-muted-foreground">
                  Target: ₹250,000
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Students
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,150</div>
                <p className="text-xs text-muted-foreground">
                  +180 this month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Recent Student Admissions</CardTitle>
                  <CardDescription>
                    Showing the 5 most recent student admissions.
                  </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link href="/admin/students">
                    Manage Students
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center h-40">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead className="hidden xl:table-column">
                        Grade
                      </TableHead>
                      <TableHead className="hidden xl:table-column">
                        Status
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Admission Date
                      </TableHead>
                      <TableHead className="text-right">Program</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentAdmissions.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                              <AvatarImage src={student.photoURL || `https://placehold.co/100x100.png`} data-ai-hint={student.avatarHint} alt="Avatar" />
                              <AvatarFallback>{student.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{student.name}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          {student.grade}th
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {student.admissionDate}
                        </TableCell>
                        <TableCell className="text-right">{student.program}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Class Overview</CardTitle>
                <CardDescription>
                  Distribution of students across different programs.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center pb-0">
                 <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[200px]">
                    <PieChart>
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={programData}
                            dataKey="students"
                            nameKey="program"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            {programData.map((entry) => (
                                <Cell key={entry.program} fill={entry.fill} />
                            ))}
                        </Pie>
                        <ChartLegend
                            content={<ChartLegendContent nameKey="program" />}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                 </ChartContainer>
              </CardContent>
            </Card>
          </div>
            <Card>
                <CardHeader>
                    <CardTitle>Our Teachers</CardTitle>
                    <CardDescription>
                        List of faculty members at Web an d App.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {teachers.map((teacher) => (
                            <div key={teacher.name} className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={teacher.photoURL} data-ai-hint={teacher.avatarHint} alt={teacher.name} />
                                    <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{teacher.name}</p>
                                    <p className="text-sm text-muted-foreground">{teacher.subject}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}
