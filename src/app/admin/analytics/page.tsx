
'use client';

import {
  Users,
  Wallet,
  ShoppingCart,
  CircleDollarSign,
  Pencil,
  Trash2,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const statCards = [
  {
    title: 'New Student',
    value: '5,100',
    icon: <Users className="h-6 w-6" />,
    progress: 35,
    color: 'bg-fuchsia-500',
    textColor: 'text-fuchsia-500',
  },
  {
    title: 'Income',
    value: '2,000',
    icon: <Wallet className="h-6 w-6" />,
    progress: 80,
    color: 'bg-blue-500',
    textColor: 'text-blue-500',
  },
  {
    title: 'Expense',
    value: '3,000',
    icon: <ShoppingCart className="h-6 w-6" />,
    progress: 60,
    color: 'bg-orange-500',
    textColor: 'text-orange-500',
  },
  {
    title: 'Other Income',
    value: '550',
    icon: <CircleDollarSign className="h-6 w-6" />,
    progress: 90,
    color: 'bg-green-500',
    textColor: 'text-green-500',
  },
];

const notices = [
    {
        title: 'Notice Regarding Mid-Term Exams',
        time: '10:30 AM',
        date: '2024-08-15',
        tag: 'Academics',
        tagColor: 'bg-blue-100 text-blue-800'
    },
    {
        title: 'Annual Sports Day Announcement',
        time: '02:00 PM',
        date: '2024-08-14',
        tag: 'Events',
        tagColor: 'bg-green-100 text-green-800'
    },
     {
        title: 'Parent-Teacher Meeting Schedule',
        time: '09:00 AM',
        date: '2024-08-12',
        tag: 'Parents',
        tagColor: 'bg-yellow-100 text-yellow-800'
    },
    {
        title: 'Library Closure for Maintenance',
        time: '04:15 PM',
        date: '2024-08-10',
        tag: 'Facilities',
        tagColor: 'bg-fuchsia-100 text-fuchsia-800'
    }
]

export default function AnalyticsPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      <h1 className="text-2xl font-bold">School UI</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title} className={`${card.color} text-white`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <Progress
                value={card.progress}
                className="mt-4 h-2 bg-white/30"
                indicatorClassName="bg-white"
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Data Student</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Gender</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Fees</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="student portrait" />
                                    <AvatarFallback>OM</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">Olivia Martin</span>
                            </div>
                        </TableCell>
                        <TableCell>Female</TableCell>
                        <TableCell>Science</TableCell>
                        <TableCell>₹350.00</TableCell>
                        <TableCell>
                           <div className="flex gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                                <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="boy student" />
                                    <AvatarFallback>JL</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">Jackson Lee</span>
                            </div>
                        </TableCell>
                        <TableCell>Male</TableCell>
                        <TableCell>Arts</TableCell>
                        <TableCell>₹350.00</TableCell>
                        <TableCell>
                           <div className="flex gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                                <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        </TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="girl smiling" />
                                    <AvatarFallback>SN</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">Sofia Nguyen</span>
                            </div>
                        </TableCell>
                        <TableCell>Female</TableCell>
                        <TableCell>Technology</TableCell>
                        <TableCell>₹350.00</TableCell>
                        <TableCell>
                           <div className="flex gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                                <Button variant="destructive" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
             </Table>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Notice Board</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {notices.map(notice => (
                    <div key={notice.title} className="flex items-start gap-4">
                        <div className="flex-1">
                            <p className="font-medium">{notice.title}</p>
                            <p className="text-sm text-muted-foreground">{notice.date} at {notice.time}</p>
                            <Badge className={`mt-1 text-xs font-semibold ${notice.tagColor}`}>{notice.tag}</Badge>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
