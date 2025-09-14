
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { PlusCircle, MoreHorizontal, Pencil, Trash2, Loader2, BedDouble } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

// Mock data service
const getRoomsKey = (schoolId: string) => `hostelRooms_${schoolId}`;
const getStoredRooms = (schoolId: string): any[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(getRoomsKey(schoolId));
  return data ? JSON.parse(data) : [];
};
const storeRooms = (rooms: any[], schoolId: string) => {
  if (typeof window !== 'undefined') localStorage.setItem(getRoomsKey(schoolId), JSON.stringify(rooms));
};

export default function HostelPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [schoolId, setSchoolId] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<any | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      const parsedSession = JSON.parse(userSession);
      if (parsedSession.schoolId) {
        setSchoolId(parsedSession.schoolId);
        setRooms(getStoredRooms(parsedSession.schoolId));
      }
    }
    setLoading(false);
  }, []);

  const handleSaveRoom = (formData: any) => {
    let updatedRooms;
    if (currentRoom) {
      updatedRooms = rooms.map(r => r.id === currentRoom.id ? { ...currentRoom, ...formData } : r);
      toast({ title: 'Room Updated' });
    } else {
      const newRoom = { id: Date.now().toString(), ...formData, occupants: [] };
      updatedRooms = [...rooms, newRoom];
      toast({ title: 'Room Added' });
    }
    setRooms(updatedRooms);
    storeRooms(updatedRooms, schoolId);
    setIsFormOpen(false);
  };
  
  const handleDeleteRoom = (id: string) => {
      const updatedRooms = rooms.filter(r => r.id !== id);
      setRooms(updatedRooms);
      storeRooms(updatedRooms, schoolId);
      toast({ title: 'Room Deleted', variant: 'destructive' });
  }

  if (loading) {
    return <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Hostel Management</CardTitle>
                <CardDescription>Manage hostel rooms and occupant information.</CardDescription>
            </div>
            <Button onClick={() => { setCurrentRoom(null); setIsFormOpen(true); }}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Room
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Number</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Occupants</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.length > 0 ? rooms.map(room => {
                  const isFull = room.occupants.length >= room.capacity;
                  return (
                    <TableRow key={room.id}>
                        <TableCell className="font-medium">{room.number}</TableCell>
                        <TableCell>{room.type}</TableCell>
                        <TableCell>{room.occupants.length} / {room.capacity}</TableCell>
                        <TableCell>{room.occupants.join(', ') || 'N/A'}</TableCell>
                        <TableCell>
                           <Badge variant={isFull ? 'destructive' : 'default'} className={!isFull ? 'bg-green-500' : ''}>
                               {isFull ? 'Full' : 'Available'}
                           </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => { setCurrentRoom(room); setIsFormOpen(true); }}><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500" onSelect={() => handleDeleteRoom(room.id)}><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                  )
              }) : (
                <TableRow><TableCell colSpan={6} className="h-24 text-center">No rooms added yet.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <RoomFormDialog 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSaveRoom} 
        roomData={currentRoom} 
      />
    </>
  );
}

const RoomFormDialog = ({ isOpen, onClose, onSave, roomData }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void, roomData: any | null }) => {
    const [number, setNumber] = useState(roomData?.number || '');
    const [type, setType] = useState(roomData?.type || 'Single');
    const [capacity, setCapacity] = useState(roomData?.capacity || 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ number, type, capacity });
    };

    useEffect(() => {
        setNumber(roomData?.number || '');
        setType(roomData?.type || 'Single');
        setCapacity(roomData?.capacity || 1);
    }, [roomData]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader><DialogTitle>{roomData ? 'Edit Room' : 'Add New Room'}</DialogTitle></DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="number">Room Number</Label>
                            <Input id="number" value={number} onChange={e => setNumber(e.target.value)} placeholder="e.g., A-101" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type">Room Type</Label>
                            <select id="type" value={type} onChange={e => setType(e.target.value)} className="w-full h-10 border border-input rounded-md px-3">
                                <option>Single</option>
                                <option>Double</option>
                                <option>Triple</option>
                            </select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="capacity">Capacity</Label>
                            <Input id="capacity" type="number" min="1" value={capacity} onChange={e => setCapacity(parseInt(e.target.value))} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                        <Button type="submit">Save Room</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
