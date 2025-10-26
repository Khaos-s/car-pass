import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ParkingSquare, Car } from 'lucide-react';

const generateMockSlots = () => {
    const slots = [];
    const zones = ['A', 'B', 'C', 'D'];
    const statuses = ['available', 'occupied', 'reserved'];

    zones.forEach(zone => {
        for (let i = 1; i <= 20; i++) {
            slots.push({
                id: `${zone}-${i}`,
                zone,
                slotNumber: `${zone}-${i}`,
                status: statuses[Math.floor(Math.random() * statuses.length)]
            });
        }
    });

    return slots;
};

export const ParkingSlotGrid = () => {
    const [slots, setSlots] = useState([]);
    const [selectedZone, setSelectedZone] = useState('A');
    const [selectedSlot, setSelectedSlot] = useState(null);

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
                return 'bg-red-100 border-red-400 cursor-not-allowed';
            case 'reserved':
                return 'bg-yellow-100 border-yellow-400 cursor-not-allowed';
            default:
                return 'bg-gray-100 border-gray-400';
        }
    };

    const handleSlotClick = (slot) => {
        if (slot.status === 'available') {
            setSelectedSlot(slot);
        }
    };

    const handleReserve = () => {
        if (selectedSlot) {
            alert(`Slot ${selectedSlot.slotNumber} reserved successfully!`);
            setSlots(slots.map(s =>
                s.id === selectedSlot.id
                    ? { ...s, status: 'reserved' }
                    : s
            ));
            setSelectedSlot(null);
        }
    };

    const availableCount = zoneSlots.filter(s => s.status === 'available').length;
    const occupiedCount = zoneSlots.filter(s => s.status === 'occupied').length;
    const reservedCount = zoneSlots.filter(s => s.status === 'reserved').length;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ParkingSquare className="h-5 w-5" />
                        Parking Slot Availability
                    </CardTitle>
                    <CardDescription>
                        View and reserve available parking slots in real-time
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 grid grid-cols-3 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-sm text-gray-600">Available</p>
                            <p className="text-2xl font-bold mt-1">{availableCount}</p>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                            <p className="text-sm text-gray-600">Occupied</p>
                            <p className="text-2xl font-bold mt-1">{occupiedCount}</p>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                            <p className="text-sm text-gray-600">Reserved</p>
                            <p className="text-2xl font-bold mt-1">{reservedCount}</p>
                        </div>
                    </div>

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
                                            disabled={slot.status !== 'available'}
                                            className={`
                                                p-4 rounded-lg border-2 transition-all
                                                ${getSlotColor(slot.status)}
                                                ${selectedSlot?.id === slot.id ? 'ring-2 ring-blue-500' : ''}
                                            `}
                                        >
                                            <div className="flex flex-col items-center gap-1">
                                                <Car className="h-5 w-5" />
                                                <span className="text-xs font-medium">{slot.slotNumber}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>

                    {selectedSlot && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">Selected Slot: <span>{selectedSlot.slotNumber}</span></p>
                                    <p className="text-sm text-gray-600">Zone {selectedSlot.zone}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => setSelectedSlot(null)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleReserve}>
                                        Reserve Slot
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

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
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};