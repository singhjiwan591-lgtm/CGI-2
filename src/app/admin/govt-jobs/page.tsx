
'use client';

import { useState, useEffect } from 'react';
import { PlusCircle, Loader2, MoreHorizontal, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
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
import { getJobs, addJob, updateJob, deleteJob, Job } from '@/lib/job-data-service';
import { format } from 'date-fns';
import Image from 'next/image';

export default function GovtJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const fetchedJobs = await getJobs();
      setJobs(fetchedJobs);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleOpenForm = (job: Job | null = null) => {
    setCurrentJob(job);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setCurrentJob(null);
  };

  const handleSaveJob = async (formData: { title: string; description: string; photoURL: string }) => {
    setLoading(true);
    try {
      if (currentJob?.id) {
        const updated = await updateJob({ ...currentJob, ...formData });
        setJobs(jobs.map(j => j.id === updated.id ? updated : j));
        toast({ title: 'Success', description: 'Job posting updated successfully.' });
      } else {
        const newJob = await addJob(formData);
        setJobs([newJob, ...jobs]);
        toast({ title: 'Success', description: 'Job posted successfully.' });
      }
      handleCloseForm();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save job posting.' });
    } finally {
      setLoading(false);
    }
  };

  const openDeleteDialog = (job: Job) => {
    setCurrentJob(job);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!currentJob) return;
    setLoading(true);
    try {
      await deleteJob(currentJob.id);
      setJobs(jobs.filter(j => j.id !== currentJob.id));
      toast({ title: 'Success', description: 'Job posting deleted successfully.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete job posting.' });
    } finally {
      setLoading(false);
      setIsDeleteDialogOpen(false);
      setCurrentJob(null);
    }
  };

  const JobForm = () => {
    const [title, setTitle] = useState(currentJob?.title || '');
    const [description, setDescription] = useState(currentJob?.description || '');
    const [photoURL, setPhotoURL] = useState(currentJob?.photoURL || '');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!title || !description || !photoURL) {
        toast({ variant: 'destructive', title: 'Validation Error', description: 'All fields are required.' });
        return;
      }
      handleSaveJob({ title, description, photoURL });
    };

    return (
      <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{currentJob ? 'Edit Job Posting' : 'Add New Job Posting'}</DialogTitle>
              <DialogDescription>
                Fill in the details below. The job will be visible on the homepage.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Punjab Police Recruitment" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Full details of the job..." className="min-h-[120px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photoURL">Photo URL</Label>
                <Input id="photoURL" value={photoURL} onChange={e => setPhotoURL(e.target.value)} placeholder="https://example.com/image.png" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {currentJob ? 'Save Changes' : 'Publish Job'}
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
            This action cannot be undone. This will permanently delete the job posting titled "<span className="font-semibold">{currentJob?.title}</span>".
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Yes, delete job
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Govt. Jobs Management</CardTitle>
            <CardDescription>Create, edit, and delete job postings for the homepage.</CardDescription>
          </div>
          <Button onClick={() => handleOpenForm()}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Job Post
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center p-12">
              <p>No jobs have been posted yet. Click "Add Job Post" to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map(job => (
                <Card key={job.id} className="flex flex-col sm:flex-row items-start justify-between p-4 gap-4">
                  <div className="flex gap-4 items-start w-full">
                    {job.photoURL ? (
                       <Image src={job.photoURL} alt={job.title} width={100} height={100} className="rounded-md object-cover w-24 h-24" />
                    ) : (
                       <div className="w-24 h-24 bg-secondary rounded-md flex items-center justify-center">
                           <ImageIcon className="h-8 w-8 text-muted-foreground" />
                       </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{job.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">Posted on: {format(new Date(job.createdAt), 'PPP')}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="flex-shrink-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onSelect={() => handleOpenForm(job)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-500" onSelect={() => openDeleteDialog(job)}>
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
      {isFormOpen && <JobForm />}
      {isDeleteDialogOpen && <DeleteConfirmationDialog />}
    </>
  );
}
