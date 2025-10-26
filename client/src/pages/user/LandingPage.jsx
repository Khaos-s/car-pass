import React, { useState } from 'react';
import { Calendar, MapPin, Search, Star, Shield, Zap, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Navigation } from "@/components/Navbar";
export default function LandingPage() {
    const [searchData, setSearchData] = useState({
        pickupLocation: '',
        dropoffLocation: '',
        pickupDate: '',
        returnDate: ''
    });

    const handleInputChange = (field, value) => {
        setSearchData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const features = [
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Instant Booking",
            description: "Reserve your car in under 2 minutes with our streamlined process"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Fully Insured",
            description: "Comprehensive insurance coverage for complete peace of mind"
        },
        {
            icon: <Star className="w-8 h-8" />,
            title: "Premium Fleet",
            description: "Choose from luxury sedans, SUVs, and sports cars"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "24/7 Support",
            description: "Round-the-clock customer service for all your needs"
        }
    ];

    const popularCars = [
        {
            name: "BMW 7 Series",
            type: "Luxury Sedan",
            price: "$129",
            image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400"
        },
        {
            name: "Mercedes G-Class",
            type: "Premium SUV",
            price: "$149",
            image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400"
        },
        {
            name: "Porsche 911",
            type: "Sports Car",
            price: "$199",
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-16 bg-linear-to-br from-gray-900 via-blue-900 to-purple-900">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20 animate-pulse-slow"></div>
                    <div className="absolute inset-0 bg-linear-to-rrom-gray-900/90 via-blue-900/80 to-purple-900/90"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
                        {/* Left Content */}
                        <div className="lg:w-1/2 mb-12 lg:mb-0">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-6">
                                <Star className="w-4 h-4 mr-2 fill-current" />
                                Trusted by 10,000+ customers worldwide
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Drive Your
                                <span className="block bg-linear-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                                    Dream Car
                                </span>
                                Today
                            </h1>

                            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                                Experience luxury and performance with our premium car rental service.
                                From sports cars to luxury SUVs, find the perfect vehicle for your journey.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Button
                                    size="lg"
                                    className="bg-linear-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                                >
                                    Book Your Dream Car
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300"
                                >
                                    View Our Fleet
                                </Button>
                            </div>
                        </div>

                        {/* Search Form */}
                        <div className="lg:w-1/2 lg:pl-12">
                            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
                                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                                    Find Your Perfect Car
                                </h3>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-300 flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                Pickup Location
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder="City or airport"
                                                value={searchData.pickupLocation}
                                                onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                                                className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-300 flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                Drop-off Location
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder="City or airport"
                                                value={searchData.dropoffLocation}
                                                onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                                                className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-xl"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-300 flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                Pickup Date
                                            </label>
                                            <Input
                                                type="date"
                                                value={searchData.pickupDate}
                                                onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                                                className="bg-white/10 border-white/20 text-white rounded-xl"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-300 flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                Return Date
                                            </label>
                                            <Input
                                                type="date"
                                                value={searchData.returnDate}
                                                onChange={(e) => handleInputChange('returnDate', e.target.value)}
                                                className="bg-white/10 border-white/20 text-white rounded-xl"
                                            />
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full bg-linear-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white rounded-xl py-6 text-lg font-semibold mt-4 shadow-2xl hover:shadow-3xl transition-all duration-300"
                                        size="lg"
                                    >
                                        <Search className="w-5 h-5 mr-2" />
                                        Search Available Cars
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Why Choose CarRental?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We provide the best car rental experience with premium vehicles and exceptional service.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                            >
                                <div className="w-16 h-16 bg-linear-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Cars Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Popular Choices
                        </h2>
                        <p className="text-xl text-gray-600">
                            Explore our most sought-after luxury vehicles
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {popularCars.map((car, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="h-48 bg-linear-to-r from-gray-200 to-gray-300 relative">
                                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-xl font-bold">{car.name}</h3>
                                        <p className="text-gray-200">{car.type}</p>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                        <span className="text-white font-bold">{car.price}/day</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <Button className="w-full bg-linear-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white rounded-xl">
                                        Rent Now
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}