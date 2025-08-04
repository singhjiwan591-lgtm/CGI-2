
'use client';

import {
  Activity,
  ArrowUpRight,
  BookUser,
  GraduationCap,
  Users,
} from 'lucide-react';
import Link from 'next/link';

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
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

const chartData = [
  { month: 'January', students: 186 },
  { month: 'February', students: 205 },
  { month: 'March', students: 237 },
  { month: 'April', students: 203 },
  { month: 'May', students: 209 },
  { month: 'June', students: 214 },
];

const chartConfig = {
  students: {
    label: 'Students',
    color: 'hsl(var(--chart-1))',
  },
};

const recentAdmissions = [
    {
        name: "Olivia Martin",
        photoURL: "https://placehold.co/100x100.png",
        avatarHint: "student portrait",
        grade: "10th",
        status: "Enrolled",
        date: "2023-08-15",
        program: "Science"
    },
    {
        name: "Jackson Lee",
        photoURL: "https://placehold.co/100x100.png",
        avatarHint: "boy student",
        grade: "9th",
        status: "Enrolled",
        date: "2023-08-14",
        program: "Arts"
    },
    {
        name: "Sofia Nguyen",
        photoURL: "https://placehold.co/100x100.png",
        avatarHint: "girl smiling",
        grade: "11th",
        status: "Enrolled",
        date: "2023-08-12",
        program: "Technology"
    },
    {
        name: "Isabella Patel",
        photoURL: "https://placehold.co/100x100.png",
        avatarHint: "boy glasses",
        grade: "12th",
        status: "Enrolled",
        date: "2023-08-10",
        program: "Math"
    },
    {
        name: "William Kim",
        photoURL: "https://placehold.co/100x100.png",
        avatarHint: "student smiling",
        grade: "9th",
        status: "Enrolled",
        date: "2023-08-09",
        program: "Arts"
    }
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card className="bg-blue-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <Users className="h-4 w-4 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,150</div>
                <p className="text-xs text-white/80">
                  +5.2% from last year
                </p>
              </CardContent>
            </Card>
            <Card className="bg-orange-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Faculty Members
                </CardTitle>
                <BookUser className="h-4 w-4 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">125</div>
                <p className="text-xs text-white/80">
                  +3 new hires this semester
                </p>
              </CardContent>
            </Card>
            <Card className="bg-fuchsia-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Graduation Rate
                </CardTitle>
                <GraduationCap className="h-4 w-4 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.5%</div>
                <p className="text-xs text-white/80">
                  Class of 2023
                </p>
              </CardContent>
            </Card>
            <Card className="bg-green-500 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Recent Activity
                </CardTitle>
                <Activity className="h-4 w-4 text-white/80" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+54</div>
                <p className="text-xs text-white/80">
                  New applications this week
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
                    Showing the 10 most recent student admissions.
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
                    {recentAdmissions.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="hidden h-9 w-9 sm:flex">
                              <AvatarImage src={student.photoURL} data-ai-hint={student.avatarHint} alt="Avatar" />
                              <AvatarFallback>{student.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{student.name}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          {student.grade}
                        </TableCell>
                        <TableCell className="hidden xl:table-column">
                          <Badge className="text-xs" variant="outline">
                            {student.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {student.date}
                        </TableCell>
                        <TableCell className="text-right">{student.program}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Analytics</CardTitle>
                <CardDescription>
                  New student enrollment over the last 6 months.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                  <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="students" fill="var(--color-students)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
