
'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { getStudentByEmail, Student } from '@/lib/student-data-service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, User, Mail, Phone, MapPin, GraduationCap, Calendar, Banknote, TrendingUp, TrendingDown, Megaphone } from 'lucide-react';
import { format } from 'date-fns';
import { formatNumber } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { getNotices, Notice } from '@/backend/notice';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


type InfoCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string;
  bgColor: string;
  iconColor: string;
}

const InfoCard = ({ icon, title, value, bgColor, iconColor }: InfoCardProps) => (
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

export default function StudentDashboardPage() {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [schoolId, setSchoolId] = useState<string>('');

  useEffect(() => {
    // This effect runs only on the client
    const storedUser = sessionStorage.getItem('studentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email && parsedUser.schoolId) {
        const studentData = getStudentByEmail(parsedUser.email, parsedUser.schoolId);
        const noticeData = getNotices(parsedUser.schoolId);
        if (studentData) {
          setStudent(studentData);
          setNotices(noticeData);
          setSchoolId(parsedUser.schoolId);
        }
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!student) {
    return notFound();
  }
  
  const totalFees = student.fees?.totalFees ?? 0;
  const feesPaid = student.fees?.feesPaid ?? 0;
  const remainingFees = totalFees - feesPaid;

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Megaphone className="h-6 w-6 text-primary" />
                    <CardTitle>Notice Board</CardTitle>
                </div>
                <CardDescription>Important announcements from the institute.</CardDescription>
            </CardHeader>
            <CardContent>
                {notices.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No notices at the moment.</p>
                ) : (
                    <Accordion type="single" collapsible className="w-full">
                      {notices.map((notice, index) => (
                        <AccordionItem value={`item-${index}`} key={notice.id}>
                          <AccordionTrigger>
                            <div className='text-left'>
                                <p className='font-semibold'>{notice.title}</p>
                                <p className='text-xs text-muted-foreground'>
                                    {format(new Date(notice.createdAt), "do MMMM, yyyy")}
                                </p>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="whitespace-pre-wrap">
                            {notice.content}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Fee Status</CardTitle>
                <CardDescription>A summary of your fee payments.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <InfoCard icon={<Banknote />} title="Total Fees" value={`₹${formatNumber(totalFees)}`} bgColor="bg-primary/10" iconColor="text-primary" />
                <InfoCard icon={<TrendingUp />} title="Total Collected" value={`₹${formatNumber(feesPaid)}`} bgColor="bg-green-500/10" iconColor="text-green-500" />
                <InfoCard icon={<TrendingDown />} title="Remaining Due" value={`₹${formatNumber(remainingFees)}`} bgColor="bg-red-500/10" iconColor="text-red-500" />
            </CardContent>
        </Card>
    
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Your details as recorded with the institute.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div className="flex items-center gap-3"><User className="h-4 w-4 text-primary"/> <span className="font-medium">Name:</span> <span>{student.name}</span></div>
                    <div className="flex items-center gap-3"><GraduationCap className="h-4 w-4 text-primary"/> <span className="font-medium">Grade:</span> <span>{student.grade}</span></div>
                    <div className="flex items-center gap-3"><User className="h-4 w-4 text-primary"/> <span className="font-medium">Father's Name:</span> <span>{student.parent}</span></div>
                    <div className="flex items-center gap-3"><User className="h-4 w-4 text-primary"/> <span className="font-medium">Mother's Name:</span> <span>{student.motherName || 'N/A'}</span></div>
                    <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary"/> <span className="font-medium">Email:</span> <span>{student.email}</span></div>
                    <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary"/> <span className="font-medium">Phone:</span> <span>{student.phone}</span></div>
                    <div className="flex items-center gap-3"><Calendar className="h-4 w-4 text-primary"/> <span className="font-medium">Date of Birth:</span> <span>{student.dob ? format(new Date(student.dob), 'PPP') : 'N/A'}</span></div>
                    <div className="flex items-center gap-3"><Calendar className="h-4 w-4 text-primary"/> <span className="font-medium">Admission Date:</span> <span>{student.admissionDate ? format(new Date(student.admissionDate), 'PPP') : 'N/A'}</span></div>
                    <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary"/> <span className="font-medium">Address:</span> <span>{student.address}</span></div>
                     <div className="flex items-center gap-3"><User className="h-4 w-4 text-primary"/> <span className="font-medium">Current Status:</span> <Badge variant={student.status === 'Graduated' ? 'default' : 'secondary'}>{student.status}</Badge></div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
