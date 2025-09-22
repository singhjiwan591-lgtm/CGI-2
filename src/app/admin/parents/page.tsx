
'use client';

import { useState, useEffect } from 'react';
import { Loader2, Search, MessageSquare, User, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { getAllStudents, Student } from '@/lib/student-data-service';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

type Parent = {
  id: string;
  name: string;
  occupation: string;
  phone: string;
  email: string;
  studentName: string;
  studentId: string;
  avatarUrl?: string;
  avatarHint: string;
};

export default function ParentsPage() {
  const [parents, setParents] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMessaging, setIsMessaging] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [messageSubject, setMessageSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [schoolId, setSchoolId] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
      const userSession = sessionStorage.getItem('user');
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        if (parsedSession.schoolId) {
          const currentSchoolId = parsedSession.schoolId;
          setSchoolId(currentSchoolId);
          setLoading(true);
          const students = getAllStudents(currentSchoolId);
          const parentsData = students.map((student: Student) => ({
            id: `parent-${student.id}`,
            name: student.parent,
            occupation: student.fatherOccupation || 'Not Specified',
            phone: student.phone,
            email: student.email,
            studentName: student.name,
            studentId: student.id,
            avatarUrl: `https://picsum.photos/seed/parent${student.id}/100/100`, 
            avatarHint: `parent of ${student.name}`,
          }));
          setParents(parentsData);
          setLoading(false);
        }
      }
    }
    loadData();
  }, []);

  const handleOpenMessageDialog = (parent: Parent) => {
    setSelectedParent(parent);
    setMessageSubject('');
    setMessageBody('');
    setIsMessageDialogOpen(true);
  };
  
  const handleSendMessage = async () => {
    if (!selectedParent || !messageSubject || !messageBody) {
      toast({ variant: 'destructive', title: 'Error', description: 'Subject and message body are required.' });
      return;
    }

    setIsMessaging(true);
    try {
      console.log('Sending message (simulation):', {
        toEmail: selectedParent.email,
        subject: messageSubject,
        message: messageBody
      });
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({ title: 'Success', description: 'Message sent successfully (simulated).' });
      setIsMessageDialogOpen(false);
      setSelectedParent(null);
    } catch(error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to send message.' });
    } finally {
      setIsMessaging(false);
    }
  }

  const filteredParents = parents.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>Parents Information</CardTitle>
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
          <CardDescription>A list of all parents/guardians of the students.</CardDescription>
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by parent or student name..."
              className="pl-8 w-full md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Parent</TableHead>
              <TableHead className="hidden md:table-cell">Occupation</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead>Student</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredParents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No parent data available. Add students to see their parents here.
                </TableCell>
              </TableRow>
            ) : filteredParents.map((parent) => (
              <TableRow key={parent.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={parent.avatarUrl} data-ai-hint={parent.avatarHint} />
                      <AvatarFallback>{parent.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{parent.name}</div>
                      <div className="text-sm text-muted-foreground hidden lg:block">{parent.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{parent.occupation}</TableCell>
                <TableCell className="hidden md:table-cell">
                    <div className='flex items-center gap-1'>
                        <Phone className='h-3 w-3'/>
                        {parent.phone}
                    </div>
                </TableCell>
                <TableCell>{parent.studentName}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => handleOpenMessageDialog(parent)}>
                    <MessageSquare className="mr-2 h-4 w-4" /> Message
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
       <CardFooter>
            <div className="text-xs text-muted-foreground">
                Showing <strong>1-{filteredParents.length}</strong> of <strong>{parents.length}</strong> parents
            </div>
        </CardFooter>
    </Card>

     {/* Message Dialog */}
    <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>Send Message to {selectedParent?.name}</DialogTitle>
                <DialogDescription>
                    Compose your message below. The parent will receive this via email to {selectedParent?.email}. (This is a simulation).
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                        id="subject" 
                        value={messageSubject}
                        onChange={(e) => setMessageSubject(e.target.value)}
                        placeholder="e.g., Update on Student Progress" 
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message-body">Message</Label>
                    <Textarea 
                        id="message-body" 
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                        placeholder="Type your message here..." 
                        className="min-h-[150px]"
                    />
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="button" onClick={handleSendMessage} disabled={isMessaging}>
                    {isMessaging && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Message
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  );
}
