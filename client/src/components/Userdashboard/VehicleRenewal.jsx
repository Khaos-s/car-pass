import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

// Mock Data
const mockVehicles = [
    {
        id: '1',
        userId: 'user1',
        plateNumber: 'ABC 1234',
        vehicleType: 'car',
        brand: 'Toyota',
        model: 'Vios',
        color: 'White',
        status: 'approved',
        expiryDate: '2025-12-31',
        renewalHistory: [
            { id: 'r1', renewalDate: '2024-12-31', expiryDate: '2025-12-31' }
        ]
    },
    {
        id: '2',
        userId: 'user1',
        plateNumber: 'XYZ 5678',
        vehicleType: 'motorcycle',
        brand: 'Honda',
        model: 'Wave 110',
        color: 'Black',
        status: 'approved',
        expiryDate: '2025-11-15',
        renewalHistory: []
    }
];

export const VehicleRenewal = () => {
    const [renewingId, setRenewingId] = useState(null);
    const userVehicles = mockVehicles.filter(v => v.status === 'approved');

    const getDaysUntilExpiry = (expiryDate) => {
        const expiry = new Date(expiryDate);
        const today = new Date();
        const diffTime = expiry.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const handleRenew = (vehicleId) => {
        setRenewingId(vehicleId);

        setTimeout(() => {
            alert('Vehicle registration renewed successfully!');
            setRenewingId(null);
        }, 1500);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <RefreshCw className="h-5 w-5" />
                        Renewal Management
                    </CardTitle>
                    <CardDescription>
                        Renew your vehicle registrations before they expire
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {userVehicles.length === 0 ? (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                You don't have any approved vehicles yet. Please register a vehicle first.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <div className="space-y-4">
                            {userVehicles.map((vehicle) => {
                                const daysLeft = getDaysUntilExpiry(vehicle.expiryDate);
                                const isExpiringSoon = daysLeft <= 30 && daysLeft > 0;
                                const isExpired = daysLeft <= 0;

                                return (
                                    <Card key={vehicle.id} className="border">
                                        <CardContent className="pt-6">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold">{vehicle.plateNumber}</h4>
                                                        {isExpired && <Badge variant="destructive">Expired</Badge>}
                                                        {isExpiringSoon && <Badge variant="outline" className="border-yellow-500 text-yellow-700">Expiring Soon</Badge>}
                                                        {!isExpired && !isExpiringSoon && <Badge variant="outline" className="border-green-500 text-green-700">Active</Badge>}
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        {vehicle.brand} {vehicle.model} • {vehicle.vehicleType}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Calendar className="h-4 w-4 text-gray-400" />
                                                        <span>
                                                            Expires: {new Date(vehicle.expiryDate).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm">
                                                        {isExpired ? (
                                                            <span className="text-red-600 font-medium">Expired {Math.abs(daysLeft)} days ago</span>
                                                        ) : (
                                                            <span className={isExpiringSoon ? 'text-yellow-600 font-medium' : 'text-gray-600'}>
                                                                {daysLeft} days remaining
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>

                                                <Button
                                                    onClick={() => handleRenew(vehicle.id)}
                                                    disabled={renewingId === vehicle.id}
                                                    size="sm"
                                                >
                                                    {renewingId === vehicle.id ? (
                                                        <>Processing...</>
                                                    ) : (
                                                        <>
                                                            <RefreshCw className="h-4 w-4 mr-2" />
                                                            Renew
                                                        </>
                                                    )}
                                                </Button>
                                            </div>

                                            {vehicle.renewalHistory.length > 0 && (
                                                <div className="mt-4 pt-4 border-t">
                                                    <p className="text-sm font-medium mb-2">Renewal History:</p>
                                                    <div className="space-y-1">
                                                        {vehicle.renewalHistory.map((renewal) => (
                                                            <div key={renewal.id} className="flex items-center gap-2 text-xs text-gray-600">
                                                                <CheckCircle className="h-3 w-3 text-green-500" />
                                                                <span>
                                                                    Renewed on {new Date(renewal.renewalDate).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-sm">
                                You will receive email reminders 30 days before your registration expires.
                            </p>
                            <p className="text-sm text-gray-600">
                                Renewal extends your registration for one additional year from the current expiry date.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};