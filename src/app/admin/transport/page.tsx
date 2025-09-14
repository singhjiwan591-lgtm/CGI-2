
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { PlusCircle, MoreHorizontal, Pencil, Trash2, Loader2, Bus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Mock data service
const getVehiclesKey = (schoolId: string) => `transportVehicles_${schoolId}`;
const getStoredVehicles = (schoolId: string): any[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(getVehiclesKey(schoolId));
  return data ? JSON.parse(data) : [];
};
const storeVehicles = (vehicles: any[], schoolId: string) => {
  if (typeof window !== 'undefined') localStorage.setItem(getVehiclesKey(schoolId), JSON.stringify(vehicles));
};

export default function TransportPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [schoolId, setSchoolId] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<any | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const userSession = sessionStorage.getItem('user');
    if (userSession) {
      const parsedSession = JSON.parse(userSession);
      if (parsedSession.schoolId) {
        setSchoolId(parsedSession.schoolId);
        setVehicles(getStoredVehicles(parsedSession.schoolId));
      }
    }
    setLoading(false);
  }, []);

  const handleSaveVehicle = (formData: any) => {
    let updatedVehicles;
    if (currentVehicle) {
      updatedVehicles = vehicles.map(v => v.id === currentVehicle.id ? { ...currentVehicle, ...formData } : v);
      toast({ title: 'Vehicle Updated' });
    } else {
      const newVehicle = { id: Date.now().toString(), ...formData };
      updatedVehicles = [...vehicles, newVehicle];
      toast({ title: 'Vehicle Added' });
    }
    setVehicles(updatedVehicles);
    storeVehicles(updatedVehicles, schoolId);
    setIsFormOpen(false);
  };
  
  const handleDeleteVehicle = (id: string) => {
      const updatedVehicles = vehicles.filter(v => v.id !== id);
      setVehicles(updatedVehicles);
      storeVehicles(updatedVehicles, schoolId);
      toast({ title: 'Vehicle Deleted', variant: 'destructive' });
  }

  if (loading) {
    return <div className="flex items-center justify-center h-full"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Transport Management</CardTitle>
                <CardDescription>Manage school vehicles and driver information.</CardDescription>
            </div>
            <Button onClick={() => { setCurrentVehicle(null); setIsFormOpen(true); }}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Vehicle
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle Number</TableHead>
                <TableHead>Driver Name</TableHead>
                <TableHead>Driver Contact</TableHead>
                <TableHead>Route</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.length > 0 ? vehicles.map(vehicle => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.number}</TableCell>
                  <TableCell>{vehicle.driverName}</TableCell>
                  <TableCell>{vehicle.driverContact}</TableCell>
                  <TableCell>{vehicle.route}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => { setCurrentVehicle(vehicle); setIsFormOpen(true); }}><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onSelect={() => handleDeleteVehicle(vehicle.id)}><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow><TableCell colSpan={5} className="h-24 text-center">No vehicles added yet.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <VehicleFormDialog 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        onSave={handleSaveVehicle} 
        vehicleData={currentVehicle} 
      />
    </>
  );
}

const VehicleFormDialog = ({ isOpen, onClose, onSave, vehicleData }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void, vehicleData: any | null }) => {
    const [number, setNumber] = useState(vehicleData?.number || '');
    const [driverName, setDriverName] = useState(vehicleData?.driverName || '');
    const [driverContact, setDriverContact] = useState(vehicleData?.driverContact || '');
    const [route, setRoute] = useState(vehicleData?.route || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ number, driverName, driverContact, route });
    };

    useEffect(() => {
        setNumber(vehicleData?.number || '');
        setDriverName(vehicleData?.driverName || '');
        setDriverContact(vehicleData?.driverContact || '');
        setRoute(vehicleData?.route || '');
    }, [vehicleData]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <DialogHeader><DialogTitle>{vehicleData ? 'Edit Vehicle' : 'Add New Vehicle'}</DialogTitle></DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="number">Vehicle Number</Label>
                            <Input id="number" value={number} onChange={e => setNumber(e.target.value)} placeholder="e.g., PB 05 AB 1234" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="driverName">Driver Name</Label>
                            <Input id="driverName" value={driverName} onChange={e => setDriverName(e.target.value)} placeholder="Enter driver's name" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="driverContact">Driver Contact</Label>
                            <Input id="driverContact" value={driverContact} onChange={e => setDriverContact(e.target.value)} placeholder="Enter driver's phone number" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="route">Route Information</Label>
                            <Input id="route" value={route} onChange={e => setRoute(e.target.value)} placeholder="e.g., City Center to Campus" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                        <Button type="submit">Save Vehicle</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
