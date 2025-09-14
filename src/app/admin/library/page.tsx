
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { PlusCircle, MoreHorizontal, Pencil, Trash2, Loader2, BookCopy, ArrowRightLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

// Mock data service
const getBooksKey = (schoolId: string) => `libraryBooks_${schoolId}`;
const getStoredBooks = (schoolId: string): any[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(getBooksKey(schoolId));
  return data ? JSON.parse(data) : [];
};
const storeBooks = (books: any[], schoolId: string) => {
  if (typeof window !== 'undefined') localStorage.setItem(getBooksKey(schoolId), JSON.stringify(books));
};


export default function LibraryPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [schoolId, setSchoolId] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<any | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      const parsedSession = JSON.parse(userSession);
      if (parsedSession.schoolId) {
        setSchoolId(parsedSession.schoolId);
        setBooks(getStoredBooks(parsedSession.schoolId));
      }
    }
    setLoading(false);
  }, []);

  const handleSaveBook = (formData: any) => {
    let updatedBooks;
    if (currentBook) {
      updatedBooks = books.map(b => b.id === currentBook.id ? { ...currentBook, ...formData } : b);
      toast({ title: 'Book Updated' });
    } else {
      const newBook = { id: Date.now().toString(), ...formData, status: 'Available', issueDate: null, returnDate: null };
      updatedBooks = [...books, newBook];
      toast({ title: 'Book Added' });
    }
    setBooks(updatedBooks);
    storeBooks(updatedBooks, schoolId);
    setIsFormOpen(false);
  };
  
  const handleDeleteBook = (id: string) => {
      const updatedBooks = books.filter(b => b.id !== id);
      setBooks(updatedBooks);
      storeBooks(updatedBooks, schoolId);
      toast({title: 'Book Deleted', variant: 'destructive'});
  }

  const handleIssueReturn = (book: any) => {
    const studentId = prompt(`Enter student ID to ${book.status === 'Available' ? 'issue' : 'return'} this book:`);
    if (studentId) {
      const updatedBooks = books.map(b => {
        if (b.id === book.id) {
          return {
            ...b,
            status: b.status === 'Available' ? 'Issued' : 'Available',
            issuedTo: b.status === 'Available' ? studentId : null,
            issueDate: b.status === 'Available' ? new Date().toISOString() : null,
          };
        }
        return b;
      });
      setBooks(updatedBooks);
      storeBooks(updatedBooks, schoolId);
      toast({ title: `Book ${book.status === 'Available' ? 'Issued' : 'Returned'}` });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Library Management</CardTitle>
                <CardDescription>Manage book inventory and issue/return status.</CardDescription>
            </div>
            <Button onClick={() => { setCurrentBook(null); setIsFormOpen(true); }}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Book
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Issued To (Student ID)</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.length > 0 ? books.map(book => (
                <TableRow key={book.id}>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                      <Badge variant={book.status === 'Available' ? 'default' : 'secondary'} className={book.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'}>
                          {book.status}
                      </Badge>
                  </TableCell>
                  <TableCell>{book.issuedTo || 'N/A'}</TableCell>
                  <TableCell>{book.issueDate ? format(new Date(book.issueDate), 'PPP') : 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleIssueReturn(book)} className="mr-2">
                        <ArrowRightLeft className="mr-2 h-4 w-4" /> Issue/Return
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => { setCurrentBook(book); setIsFormOpen(true); }}><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onSelect={() => handleDeleteBook(book.id)}><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow><TableCell colSpan={6} className="h-24 text-center">No books in library. Add one to get started.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <BookFormDialog 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSaveBook} 
        bookData={currentBook} 
      />
    </>
  );
}

const BookFormDialog = ({ isOpen, onClose, onSave, bookData }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void, bookData: any | null }) => {
    const [title, setTitle] = useState(bookData?.title || '');
    const [author, setAuthor] = useState(bookData?.author || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ title, author });
    };

    useEffect(() => {
        setTitle(bookData?.title || '');
        setAuthor(bookData?.author || '');
    }, [bookData]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader><DialogTitle>{bookData ? 'Edit Book' : 'Add New Book'}</DialogTitle></DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Book Title</Label>
                            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter book title" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="author">Author Name</Label>
                            <Input id="author" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Enter author name" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                        <Button type="submit">Save Book</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
