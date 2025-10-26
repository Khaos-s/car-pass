import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, GraduationCap, AlertCircle, CheckCircle, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import axios from 'axios';
import { Navigation } from "@/components/Navbar";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export function Register() {
    const navigate = useNavigate();
    const [verificationLink, setVerificationLink] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        school_ID: '',
        contact: '',
        password: '',
        confirmPassword: '',
        role: 'student',
        secretCode: '',
        department: '',
        course: ''
    });

    const validateForm = () => {
        const errors = {};

        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Please enter a valid email';
        }

        if (!formData.school_ID.trim()) {
            errors.school_ID = 'School ID is required';
        }

        if (!formData.contact.trim()) {
            errors.contact = 'Contact number is required';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (formData.role === 'admin' && !formData.secretCode.trim()) {
            errors.secretCode = 'Secret code is required for admin accounts';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setFormErrors({});

        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                email: formData.email.toLowerCase().trim(),
                password: formData.password,
                school_ID: formData.school_ID.trim(),
                contact: formData.contact.trim(),
                role: formData.role,
                secretCode: formData.secretCode.trim(),
                department: formData.department.trim(),
                course: formData.course.trim()
            });

            if (response.data.success) {
                setRegistrationSuccess(true);
                setVerificationLink(response.data.verificationLink || null);
                toast.success(response.data.message);
            }

        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            toast.error(errorMessage);

            if (error.response?.status === 409) {
                setFormErrors({ email: 'Email already registered' });
            } else if (error.response?.status === 403) {
                setFormErrors({ secretCode: 'Invalid admin secret code' });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleBack = () => navigate('/');
    const handleLogin = () => navigate('/auth/login');

    if (registrationSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-8">
                <div className="w-full max-w-md">
                    <Card className="shadow-xl border-0">
                        <CardHeader className="text-center pb-6">
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold text-green-700">Registration Successful!</CardTitle>
                            <CardDescription>
                                We've sent a verification email to <strong>{formData.email}</strong>
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="text-center space-y-4">
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <p className="text-sm text-green-800">
                                    <strong>Next Steps:</strong>
                                </p>
                                <ol className="text-sm text-green-700 mt-2 space-y-1 text-left">
                                    <li>1. Check your email inbox</li>
                                    <li>
                                        2. {verificationLink ? (
                                            <a
                                                href={verificationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline"
                                            >
                                                Click here to verify your account
                                            </a>
                                        ) : (
                                            "Click the verification link"
                                        )}
                                    </li>
                                    <li>3. Return here to sign in</li>
                                </ol>

                                {verificationLink && (
                                    <p className="text-xs text-yellow-600 mt-2">
                                        ⚠️ This direct link is only shown in development mode
                                    </p>
                                )}
                            </div>

                            <p className="text-sm text-muted-foreground">
                                Didn't receive the email? Check your spam folder or contact support.
                            </p>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <Button
                                onClick={handleLogin}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Go to Sign In
                            </Button>

                            <Button
                                variant="outline"
                                onClick={handleBack}
                                className="w-full"
                            >
                                Back to Home
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navigation />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-8">
                <div className="w-full max-w-md">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        className="mb-6 text-muted-foreground hover:text-foreground cursor-pointer"
                        disabled={loading}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Button>

                    <Card className="shadow-xl border-0">
                        <CardHeader className="text-center pb-6">
                            <CardTitle className="text-3xl font-bold text-blue-900">
                                Create Account
                            </CardTitle>
                            <CardDescription>
                                Register for PHINMA Parking Management System
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4" method="POST">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName" className="text-sm font-medium">First Name *</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                placeholder="John"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className={`pl-10 ${formErrors.firstName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                        {formErrors.firstName && (
                                            <div className="flex items-center text-red-600 text-sm">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {formErrors.firstName}
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName" className="text-sm font-medium">Last Name *</Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={`${formErrors.lastName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            required
                                            disabled={loading}
                                        />
                                        {formErrors.lastName && (
                                            <div className="flex items-center text-red-600 text-sm">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {formErrors.lastName}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="school_ID" className="text-sm font-medium">School ID *</Label>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="school_ID"
                                            name="school_ID"
                                            type="text"
                                            placeholder="04-2324-****"
                                            value={formData.school_ID}
                                            onChange={handleInputChange}
                                            className={`pl-10 ${formErrors.school_ID ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    {formErrors.school_ID && (
                                        <div className="flex items-center text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {formErrors.school_ID}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="john.doe@phinma.edu.ph"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`pl-10 ${formErrors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    {formErrors.email && (
                                        <div className="flex items-center text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {formErrors.email}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="contact" className="text-sm font-medium">Contact No. *</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="contact"
                                            name="contact"
                                            type="tel"
                                            placeholder="ex. 0909*******"
                                            value={formData.contact}
                                            onChange={handleInputChange}
                                            className={`pl-10 ${formErrors.contact ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                    {formErrors.contact && (
                                        <div className="flex items-center text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {formErrors.contact}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium">Password *</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Create a strong password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className={`pl-10 pr-10 ${formErrors.password ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            required
                                            disabled={loading}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-1 top-1 h-8 w-8 px-0"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={loading}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                    {formErrors.password && (
                                        <div className="flex items-center text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {formErrors.password}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password *</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className={`pl-10 pr-10 ${formErrors.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            required
                                            disabled={loading}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-1 top-1 h-8 w-8 px-0"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            disabled={loading}
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                    {formErrors.confirmPassword && (
                                        <div className="flex items-center text-red-600 text-sm">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {formErrors.confirmPassword}
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                                        <Input
                                            id="department"
                                            name="department"
                                            type="text"
                                            placeholder="Computer Science"
                                            value={formData.department}
                                            onChange={handleInputChange}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="course" className="text-sm font-medium">Course</Label>
                                        <Input
                                            id="course"
                                            name="course"
                                            type="text"
                                            placeholder="BSIT"
                                            value={formData.course}
                                            onChange={handleInputChange}
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Account Type *</Label>
                                    <div className="flex space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="student"
                                                name="role"
                                                value="student"
                                                checked={formData.role === 'student'}
                                                onChange={handleInputChange}
                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                disabled={loading}
                                            />
                                            <Label htmlFor="student" className="text-sm">Student</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="faculty"
                                                name="role"
                                                value="faculty"
                                                checked={formData.role === 'faculty'}
                                                onChange={handleInputChange}
                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                disabled={loading}
                                            />
                                            <Label htmlFor="faculty" className="text-sm">Faculty</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="staff"
                                                name="role"
                                                value="staff"
                                                checked={formData.role === 'staff'}
                                                onChange={handleInputChange}
                                                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                disabled={loading}
                                            />
                                            <Label htmlFor="staff" className="text-sm">Staff</Label>
                                        </div>
                                    </div>
                                </div>

                                {formData.role === 'admin' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="secretCode" className="text-sm font-medium">Admin Secret Code *</Label>
                                        <Input
                                            id="secretCode"
                                            name="secretCode"
                                            type="password"
                                            placeholder="Enter admin secret code"
                                            value={formData.secretCode}
                                            onChange={handleInputChange}
                                            className={`${formErrors.secretCode ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                            required={formData.role === 'admin'}
                                            disabled={loading}
                                        />
                                        {formErrors.secretCode && (
                                            <div className="flex items-center text-red-600 text-sm">
                                                <AlertCircle className="w-4 h-4 mr-1" />
                                                {formErrors.secretCode}
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-start space-x-2">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                                        required
                                        disabled={loading}
                                    />
                                    <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                                        I agree to the Terms of Service and Privacy Policy
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center"
                                    disabled={loading}
                                >
                                    {loading && (
                                        <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                        </svg>
                                    )}
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4">
                            <div className="relative w-full">
                                <Separator />
                                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">or</span>
                            </div>

                            <div className="text-center text-sm">
                                <span className="text-muted-foreground">Already have an account? </span>
                                <Button
                                    variant="link"
                                    className="px-0 text-blue-600 font-medium"
                                    onClick={handleLogin}
                                    disabled={loading}
                                >
                                    Sign in here
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}