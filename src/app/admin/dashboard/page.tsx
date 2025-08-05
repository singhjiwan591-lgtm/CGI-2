
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

const teachers = [
    { name: 'Dr. Evelyn Reed', subject: 'Principal', avatarHint: 'woman teacher', photoURL: 'https://placehold.co/100x100.png'},
    { name: 'Mr. David Chen', subject: 'Head of Academics', avatarHint: 'man teacher glasses', photoURL: 'https://placehold.co/100x100.png'},
    { name: 'Ms. Sunita Patel', subject: 'Science', avatarHint: 'woman teaching', photoURL: 'https://placehold.co/100x100.png'},
    { name: 'Mr. Amit Singh', subject: 'Mathematics', avatarHint: 'man corporate', photoURL: 'https://placehold.co/100x100.png'},
];

const programData = [
  { program: 'Science', students: 45, fill: 'hsl(var(--chart-1))' },
  { program: 'Arts', students: 80, fill: 'hsl(var(--chart-2))' },
  { program: 'Technology', students: 25, fill: 'hsl(var(--chart-3))' },
  { program: 'Math', students: 50, fill: 'hsl(var(--chart-4))' },
];

const chartConfig = {
  students: {
    label: 'Students',
  },
  Science: {
    label: 'Science',
    color: 'hsl(var(--chart-1))',
  },
  Arts: {
    label: 'Arts',
    color: 'hsl(var(--chart-2))',
  },
  Technology: {
    label: 'Technology',
    color: 'hsl(var(--chart-3))',
  },
  Math: {
    label: 'Math',
    color: 'hsl(var(--chart-4))',
  },
};


export default function DashboardPage() {
  const [recentAdmissions, setRecentAdmissions] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would be replaced with a real API call to fetch data from Firestore
    // For now, we'll keep it empty and rely on the students page for management
    setLoading(false);
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
                <div className="text-2xl font-bold">₹0</div>
                <p className="text-xs text-muted-foreground">
                  +0.0% from last month
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
                <div className="text-2xl font-bold">₹0</div>
                <p className="text-xs text-muted-foreground">
                  from 0 students
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
                <div className="text-2xl font-bold">₹0</div>
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
                <div className="text-2xl font-bold">+0</div>
                <p className="text-xs text-muted-foreground">
                  +0 this month
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
                    No recent student admissions.
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
                    {recentAdmissions.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                No admissions yet.
                            </TableCell>
                        </TableRow>
                    ) : recentAdmissions.map((student) => (
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
                            {programData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} name={entry.program} />
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
