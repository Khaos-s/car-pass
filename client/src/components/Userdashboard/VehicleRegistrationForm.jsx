import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Car, Upload, CheckCircle } from 'lucide-react';

export const VehicleRegistrationForm = () => {
    const [formData, setFormData] = useState({
        plateNumber: '',
        vehicleType: '',
        brand: '',
        model: '',
        color: '',
    });
    const [orcrFile, setOrcrFile] = useState(null);
    const [driverIdFile, setDriverIdFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setTimeout(() => {
            setSubmitted(true);

            setTimeout(() => {
                setFormData({
                    plateNumber: '',
                    vehicleType: '',
                    brand: '',
                    model: '',
                    color: '',
                });
                setOrcrFile(null);
                setDriverIdFile(null);
                setSubmitted(false);
            }, 3000);
        }, 1000);
    };

    if (submitted) {
        return (
            <Card>
                <CardContent className="pt-6">
                    <div className="text-center py-8">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl mb-2 font-semibold">Registration Submitted!</h3>
                        <p className="text-gray-600">
                            Your vehicle registration has been submitted for admin approval.
                            You will receive a notification once it's reviewed.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Vehicle Registration
                </CardTitle>
                <CardDescription>
                    Register your vehicle for parking privileges at PHINMA University of Iloilo
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="plateNumber">Plate Number *</Label>
                            <Input
                                id="plateNumber"
                                placeholder="ABC 1234"
                                value={formData.plateNumber}
                                onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="vehicleType">Vehicle Type *</Label>
                            <Select
                                value={formData.vehicleType}
                                onValueChange={(value) => setFormData({ ...formData, vehicleType: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                                    <SelectItem value="car">Car</SelectItem>
                                    <SelectItem value="suv">SUV</SelectItem>
                                    <SelectItem value="van">Van</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="brand">Brand *</Label>
                            <Input
                                id="brand"
                                placeholder="e.g., Toyota, Honda"
                                value={formData.brand}
                                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="model">Model *</Label>
                            <Input
                                id="model"
                                placeholder="e.g., Vios, Wave 110"
                                value={formData.model}
                                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="color">Color</Label>
                            <Input
                                id="color"
                                placeholder="e.g., White, Black"
                                value={formData.color}
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <h4 className="text-sm font-medium">Required Documents</h4>

                        <div className="space-y-2">
                            <Label htmlFor="orcr">Official Receipt / Certificate of Registration (OR/CR) *</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="orcr"
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={(e) => setOrcrFile(e.target.files?.[0] || null)}
                                    required
                                />
                                {orcrFile && <CheckCircle className="h-5 w-5 text-green-500" />}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="driverId">Driver's License / Valid ID *</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="driverId"
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={(e) => setDriverIdFile(e.target.files?.[0] || null)}
                                    required
                                />
                                {driverIdFile && <CheckCircle className="h-5 w-5 text-green-500" />}
                            </div>
                        </div>
                    </div>

                    <Alert>
                        <AlertDescription>
                            Once submitted, your registration will be reviewed by the admin. You will receive a notification
                            via email once your application is approved or if additional information is needed.
                        </AlertDescription>
                    </Alert>

                    <Button type="submit" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Submit Registration
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};