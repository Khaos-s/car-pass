import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { Navigation } from "@/components/Navbar";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [mathAnswer, setMathAnswer] = useState('');
    const [mathProblem, setMathProblem] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const generateMathProblem = () => {
        const num1 = Math.floor(Math.random() * 90) + 10;
        const num2 = Math.floor(Math.random() * 9) + 1;
        const operators = ['+', '-'];
        const operator = operators[Math.floor(Math.random() * operators.length)];

        let problem = '';
        let answer = 0;

        if (operator === '+') {
            problem = `${num1} + ${num2}`;
            answer = num1 + num2;
        } else {
            problem = `${num1} - ${num2}`;
            answer = num1 - num2;
        }

        setMathProblem(problem);
        setCorrectAnswer(answer);
        setMathAnswer('');
    };

    useEffect(() => {
        generateMathProblem();
    }, []);

    const validateForm = () => {
        const errors = {};

        if (!formData.username.trim()) {
            errors.username = 'Username is required';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (!mathAnswer || parseInt(mathAnswer) !== correctAnswer) {
            errors.math = 'Please fill correct value';
            generateMathProblem();
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setFormErrors({});

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('Login successful!');
        } catch (error) {
            console.error('Login error:', error);
            alert('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleMathChange = (e) => {
        setMathAnswer(e.target.value);
        if (formErrors.math) {
            setFormErrors(prev => ({ ...prev, math: '' }));
        }
    };

    return (
        <div>
            <Navigation />
            <div className="min-h-screen flex bg-linear-to-br from-blue-50 to-blue-100 pr-20">
                {/* Left Side - PHINMA Branding */}
                <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-blue-50 to-blue-100 items-center justify-center p-12 relative">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 opacity-30 transform rotate-45"></div>
                        <div className="absolute top-40 right-20 w-48 h-48 bg-blue-300 opacity-20 transform -rotate-12"></div>
                        <div className="absolute bottom-20 left-32 w-40 h-40 bg-blue-400 opacity-25 transform rotate-12"></div>
                        <div className="absolute bottom-40 right-40 w-24 h-24 bg-blue-200 opacity-30 transform -rotate-45"></div>
                    </div>

                    <div className="w-full max-w-md text-center relative z-10">
                        {/* University Logo */}
                        <div className="mb-8 flex justify-center">
                            <div className="w-48 h-48 bg-white rounded-full shadow-lg flex items-center justify-center border-8 border-green-700">
                                <div className="text-center">
                                    <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center">
                                        <svg className="w-24 h-24 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* University Name and Address */}
                        <div className="space-y-3 text-gray-800">
                            <h1 className="text-3xl font-bold tracking-tight">PHINMA UNIVERSITY OF ILOILO</h1>
                            <p className="text-sm opacity-80">
                                Rizal St, Iloilo City Proper, Iloilo City, 5000 Iloilo, Philippines
                            </p>
                        </div>


                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-lg">
                        {/* PHINMA Education Logo */}
                        <div className="mb-8 flex justify-start">
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 rounded-full border-4 border-gray-800 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-linear-to-br from-green-700 via-blue-700 to-gray-800"></div>
                                    <div className="absolute inset-2 bg-white rounded-full"></div>
                                    <div className="relative z-10 flex">
                                        <div className="w-1 h-8 bg-gray-300"></div>
                                        <div className="ml-1 space-y-0.5">
                                            <div className="w-6 h-1 bg-yellow-400"></div>
                                            <div className="w-6 h-1 bg-green-600"></div>
                                            <div className="w-6 h-1 bg-blue-600"></div>
                                            <div className="w-6 h-1 bg-green-700"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-left">
                                    <div className="text-3xl font-bold text-gray-800">PARKEASY</div>
                                    <div className="text-[10px] text-gray-600 uppercase tracking-wide">ParkingEasy Makes Better Through Parking</div>
                                </div>
                            </div>
                        </div>

                        {/* Login Card */}
                        <Card className="bg-white rounded-lg shadow-xl border border-gray-200">
                            <CardHeader className="text-left pb-4 pt-6 px-6">
                                <CardTitle className="text-2xl font-bold text-gray-900">
                                    Sign In
                                    <div className="h-0.5 w-16 bg-blue-600 mt-1"></div>
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="px-6">
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="username" className="text-sm text-gray-700">
                                            *Username
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="username"
                                                name="username"
                                                type="text"
                                                placeholder="Enter Username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                className="w-full h-11 pr-10 border-gray-300"
                                                disabled={loading}
                                            />
                                            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        {formErrors.username && (
                                            <p className="text-red-600 text-xs">{formErrors.username}</p>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="password" className="text-sm text-gray-700">
                                            *Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                name="password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter Password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                className="w-full h-11 pr-10 border-gray-300"
                                                disabled={loading}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                onClick={() => setShowPassword(!showPassword)}
                                                disabled={loading}
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {formErrors.password && (
                                            <p className="text-red-600 text-xs">{formErrors.password}</p>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2 justify-center py-2">
                                            <div className="flex items-center justify-center w-14 h-12 border-2 border-gray-300 rounded bg-white">
                                                <span className="text-xl font-semibold text-gray-700">
                                                    {mathProblem.split(' ')[0]}
                                                </span>
                                            </div>
                                            <span className="text-xl font-semibold text-gray-700">
                                                {mathProblem.split(' ')[1]}
                                            </span>
                                            <div className="flex items-center justify-center w-14 h-12 border-2 border-gray-300 rounded bg-white">
                                                <span className="text-xl font-semibold text-gray-700">
                                                    {mathProblem.split(' ')[2]}
                                                </span>
                                            </div>
                                            <span className="text-xl font-semibold text-gray-700">=</span>
                                            <Input
                                                type="number"
                                                placeholder=""
                                                value={mathAnswer}
                                                onChange={handleMathChange}
                                                className={`w-16 h-12 text-center text-xl font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${formErrors.math
                                                    ? 'border-2 border-red-500'
                                                    : 'border-2 border-gray-300'
                                                    }`}
                                                disabled={loading}
                                            />
                                            <button
                                                type="button"
                                                onClick={generateMathProblem}
                                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                                disabled={loading}
                                            >
                                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            </button>
                                        </div>
                                        {formErrors.math && (
                                            <p className="text-red-600 text-sm text-center">{formErrors.math}</p>
                                        )}
                                    </div>

                                    <div className="flex justify-center pt-2">
                                        <Button
                                            type="button"
                                            onClick={handleSubmit}
                                            className="w-64 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                                                    </svg>
                                                    Signing In...
                                                </>
                                            ) : (
                                                <>
                                                    Sign In
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                    </svg>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="px-6 pb-6">
                                <div className="text-center w-full">
                                    <button
                                        type="button"
                                        className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                                        disabled={loading}
                                    >
                                        Forgot Password
                                    </button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}