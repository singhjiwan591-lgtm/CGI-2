
'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Loader2, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
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
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getNotices, addNotice, updateNotice, deleteNotice, Notice } from '@/backend/notice';
import { format } from 'date-fns';

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentNotice, setCurrentNotice] = useState<Notice | null>(null);
  const [schoolId, setSchoolId] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
        const parsedSession = JSON.parse(userSession);
        if (parsedSession.schoolId) {
            setSchoolId(parsedSession.schoolId);
            setLoading(true);
            const fetchedNotices = getNotices(parsedSession.schoolId);
            setNotices(fetchedNotices);
            setLoading(false);
        }
    } else {
        setLoading(false);
    }
  }, []);

  const handleOpenForm = (notice: Notice | null = null) => {
    setCurrentNotice(notice);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentNotice(null);
  };

  const handleSaveNotice = (formData: { title: string; content: string }) => {
    if (!schoolId) {
        toast({ variant: 'destructive', title: 'Error', description: 'School not identified.' });
        return;
    }
    setLoading(true);
    try {
      if (currentNotice?.id) {
        // Update existing notice
        const updated = updateNotice({ ...currentNotice, ...formData }, schoolId);
        setNotices(notices.map(n => n.id === updated.id ? updated : n));
        toast({ title: 'Success', description: 'Notice updated successfully.' });
      } else {
        // Add new notice
        const newNotice = addNotice(formData, schoolId);
        setNotices([newNotice, ...notices]);
        toast({ title: 'Success', description: 'Notice published successfully.' });
      }
      handleCloseForm();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save notice.' });
    } finally {
      setLoading(false);
    }
  };
  
  const openDeleteDialog = (notice: Notice) => {
    setCurrentNotice(notice);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!currentNotice || !schoolId) return;
    setLoading(true);
    try {
        deleteNotice(currentNotice.id, schoolId);
        setNotices(notices.filter(n => n.id !== currentNotice.id));
        toast({ title: 'Success', description: 'Notice deleted successfully.'});
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete notice.' });
    } finally {
        setLoading(false);
        setIsDeleteDialogOpen(false);
        setCurrentNotice(null);
    }
  }

  const NoticeForm = () => {
    const [title, setTitle] = useState(currentNotice?.title || '');
    const [content, setContent] = useState(currentNotice?.content || '');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!title || !content) {
        toast({ variant: 'destructive', title: 'Validation Error', description: 'Title and content are required.' });
        return;
      }
      handleSaveNotice({ title, content });
    };

    return (
      <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{currentNotice ? 'Edit Notice' : 'Add New Notice'}</DialogTitle>
              <DialogDescription>
                Fill in the details below. The notice will be visible to all students.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Holiday Announcement" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" value={content} onChange={e => setContent(e.target.value)} placeholder="Full details of the notice..." className="min-h-[150px]" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {currentNotice ? 'Save Changes' : 'Publish Notice'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  
   const DeleteConfirmationDialog = () => (
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete the notice titled "<span className="font-semibold">{currentNotice?.title}</span>".
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
                <Button variant="destructive" onClick={handleDelete} disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Yes, delete notice
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
   )

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Notice Board Management</CardTitle>
                <CardDescription>Create, edit, and delete notices for students.</CardDescription>
            </div>
            <Button onClick={() => handleOpenForm()}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Notice
            </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center p-12">
              <p>No notices have been posted yet. Click "Add Notice" to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map(notice => (
                <Card key={notice.id} className="flex items-start justify-between p-4">
                  <div>
                    <h3 className="font-semibold text-lg">{notice.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{notice.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">Posted on: {format(new Date(notice.createdAt), 'PPP')}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => handleOpenForm(notice)}>
                            <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onSelect={() => openDeleteDialog(notice)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      {isFormOpen && <NoticeForm />}
      {isDeleteDialogOpen && <DeleteConfirmationDialog />}
    </>
  );
}
