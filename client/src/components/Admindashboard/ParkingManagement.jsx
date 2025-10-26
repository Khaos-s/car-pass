import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ParkingSquare, Car, AlertCircle } from 'lucide-react';

const generateMockSlots = () => {
    const slots = [];
    const zones = ['A', 'B', 'C', 'D'];
    const statuses = ['available', 'occupied', 'reserved', 'maintenance'];

    zones.forEach(zone => {
        for (let i = 1; i <= 20; i++) {
            slots.push({
                id: `${zone}-${i}`,
                zone,
                slotNumber: `${zone}-${i}`,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString(),
                vehicleInfo: statuses[Math.floor(Math.random() * statuses.length)] === 'occupied' ? {
                    plateNumber: `ABC-${Math.floor(Math.random() * 1000)}`,
                    type: ['Sedan', 'SUV', 'Van'][Math.floor(Math.random() * 3)],
                    entryTime: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString()
                } : null
            });
        }
    });

    return slots;
};

const mockParkingHistory = [
    { id: 1, slotNumber: 'A-1', vehiclePlate: 'ABC-123', entryTime: '2025-10-25T08:00:00', exitTime: '2025-10-25T17:00:00', duration: '9h', fee: '$18' },
    { id: 2, slotNumber: 'B-5', vehiclePlate: 'XYZ-789', entryTime: '2025-10-25T09:30:00', exitTime: '2025-10-25T14:30:00', duration: '5h', fee: '$10' },
    { id: 3, slotNumber: 'C-3', vehiclePlate: 'DEF-456', entryTime: '2025-10-25T10:15:00', exitTime: '2025-10-25T18:15:00', duration: '8h', fee: '$16' },
];

export const ParkingManagement = () => {
    const [slots, setSlots] = useState([]);
    const [selectedZone, setSelectedZone] = useState('A');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [showSlotDialog, setShowSlotDialog] = useState(false);
    const [maintenanceNote, setMaintenanceNote] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        setSlots(generateMockSlots());
    }, []);

    const zones = ['A', 'B', 'C', 'D'];
    const zoneSlots = slots.filter(s => s.zone === selectedZone);

    const getSlotColor = (status) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 border-green-400 hover:bg-green-200';
            case 'occupied':
                return 'bg-red-100 border-red-400';
            case 'reserved':
                return 'bg-yellow-100 border-yellow-400';
            case 'maintenance':
                return 'bg-gray-100 border-gray-400';
            default:
                return 'bg-gray-100 border-gray-400';
        }
    };

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
        setSelectedStatus(slot.status);
        setShowSlotDialog(true);
    };

    const handleStatusUpdate = () => {
        if (selectedSlot) {
            setSlots(slots.map(s =>
                s.id === selectedSlot.id
                    ? { 
                        ...s, 
                        status: selectedStatus,
                        lastUpdated: new Date().toISOString(),
                        maintenanceNote: selectedStatus === 'maintenance' ? maintenanceNote : null
                    }
                    : s
            ));
            setShowSlotDialog(false);
            setMaintenanceNote('');
        }
    };

    const getZoneStats = (zone) => {
        const zoneSlots = slots.filter(s => s.zone === zone);
        return {
            total: zoneSlots.length,
            available: zoneSlots.filter(s => s.status === 'available').length,
            occupied: zoneSlots.filter(s => s.status === 'occupied').length,
            reserved: zoneSlots.filter(s => s.status === 'reserved').length,
            maintenance: zoneSlots.filter(s => s.status === 'maintenance').length,
        };
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ParkingSquare className="h-5 w-5" />
                        Parking Management System
                    </CardTitle>
                    <CardDescription>
                        Manage and monitor all parking slots across different zones
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Zone Statistics */}
                    <div className="mb-6 grid grid-cols-4 gap-4">
                        {zones.map(zone => {
                            const stats = getZoneStats(zone);
                            return (
                                <div key={zone} className="p-4 bg-white rounded-lg border">
                                    <h3 className="text-sm font-semibold mb-2">Zone {zone}</h3>
                                    <div className="space-y-1 text-sm">
                                        <p className="text-green-600">Available: {stats.available}</p>
                                        <p className="text-red-600">Occupied: {stats.occupied}</p>
                                        <p className="text-yellow-600">Reserved: {stats.reserved}</p>
                                        <p className="text-gray-600">Maintenance: {stats.maintenance}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Parking Grid */}
                    <Tabs value={selectedZone} onValueChange={setSelectedZone}>
                        <TabsList className="grid grid-cols-4 w-full max-w-md mb-6">
                            {zones.map(zone => (
                                <TabsTrigger key={zone} value={zone}>
                                    Zone {zone}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {zones.map(zone => (
                            <TabsContent key={zone} value={zone}>
                                <div className="grid grid-cols-5 gap-3">
                                    {zoneSlots.map(slot => (
                                        <button
                                            key={slot.id}
                                            onClick={() => handleSlotClick(slot)}
                                            className={`
                                                p-4 rounded-lg border-2 transition-all
                                                ${getSlotColor(slot.status)}
                                            `}
                                        >
                                            <div className="flex flex-col items-center gap-1">
                                                <Car className="h-5 w-5" />
                                                <span className="text-xs font-medium">{slot.slotNumber}</span>
                                                {slot.status === 'maintenance' && (
                                                    <AlertCircle className="h-4 w-4 text-gray-500" />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>

                    {/* Legend */}
                    <div className="mt-6 flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded"></div>
                            <span>Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-100 border-2 border-red-400 rounded"></div>
                            <span>Occupied</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-400 rounded"></div>
                            <span>Reserved</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-gray-100 border-2 border-gray-400 rounded"></div>
                            <span>Maintenance</span>
                        </div>
                    </div>

                    {/* Slot Management Dialog */}
                    <Dialog open={showSlotDialog} onOpenChange={setShowSlotDialog}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Manage Parking Slot {selectedSlot?.slotNumber}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Current Status</Label>
                                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="available">Available</SelectItem>
                                            <SelectItem value="occupied">Occupied</SelectItem>
                                            <SelectItem value="reserved">Reserved</SelectItem>
                                            <SelectItem value="maintenance">Maintenance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {selectedStatus === 'maintenance' && (
                                    <div className="space-y-2">
                                        <Label>Maintenance Note</Label>
                                        <Input
                                            placeholder="Enter maintenance details"
                                            value={maintenanceNote}
                                            onChange={(e) => setMaintenanceNote(e.target.value)}
                                        />
                                    </div>
                                )}

                                {selectedSlot?.vehicleInfo && (
                                    <div className="space-y-2 border-t pt-4">
                                        <h4 className="font-medium">Vehicle Information</h4>
                                        <p className="text-sm">Plate Number: {selectedSlot.vehicleInfo.plateNumber}</p>
                                        <p className="text-sm">Type: {selectedSlot.vehicleInfo.type}</p>
                                        <p className="text-sm">Entry Time: {new Date(selectedSlot.vehicleInfo.entryTime).toLocaleString()}</p>
                                    </div>
                                )}

                                <div className="flex justify-end gap-2">
                                    <Button variant="outline" onClick={() => setShowSlotDialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleStatusUpdate}>
                                        Update Status
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                </CardContent>
            </Card>
        </div>
    );
};