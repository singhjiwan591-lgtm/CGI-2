
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
  Users2
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const StudentDetailsCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>About Me</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://placehold.co/200x200.png" data-ai-hint="female student" />
          <AvatarFallback>JR</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-bold">Jessia Rose</h3>
          <p className="text-sm text-muted-foreground">
            Aliquam erat volutpat. Curabiene natis massa sedde lacustiquen sodale word moun taiery.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="flex justify-between"><span className="text-muted-foreground">Name:</span> <span className="font-medium">Jessia Rose</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Gender:</span> <span className="font-medium">Female</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Father Name:</span> <span className="font-medium">Fahim Rahman</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Mother Name:</span> <span className="font-medium">Jannatul Kazi</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Date Of Birth:</span> <span className="font-medium">07.08.2006</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Religion:</span> <span className="font-medium">Islam</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Father Occupation:</span> <span className="font-medium">Graphic Designer</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">E-Mail:</span> <span className="font-medium">jessiarose@gmail.com</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Admission Date:</span> <span className="font-medium">05.01.2019</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Class:</span> <span className="font-medium">2</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Section:</span> <span className="font-medium">Pink</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Roll:</span> <span className="font-medium">10005</span></div>
        <div className="flex justify-between col-span-2"><span className="text-muted-foreground">Address:</span> <span className="font-medium text-right">House #10, Road #6, Australia</span></div>
        <div className="flex justify-between"><span className="text-muted-foreground">Phone:</span> <span className="font-medium">+ 88 9856418</span></div>
      </div>
    </CardContent>
  </Card>
);

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

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);

  if (loading) {
      return (
          <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
          </div>
      )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <InfoCard icon={<GraduationCap />} title="Students" value="50000" bgColor="bg-sky-100" iconColor="text-sky-500" />
          <InfoCard icon={<Users />} title="Teachers" value="2250" bgColor="bg-blue-100" iconColor="text-blue-500" />
          <InfoCard icon={<Users2 />} title="Parents" value="5690" bgColor="bg-fuchsia-100" iconColor="text-fuchsia-500" />
          <InfoCard icon={<Wallet />} title="Earnings" value="$193000" bgColor="bg-orange-100" iconColor="text-orange-500" />
        </div>
        <StudentDetailsCard />
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
