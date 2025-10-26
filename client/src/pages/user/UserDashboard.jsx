import React, { useState } from 'react';
import { Badge } from '../../components/ui/badge';
import { Car, RefreshCw, ParkingSquare, Bell, ChevronRight, Menu, X, User, LogOut, Settings } from 'lucide-react';
import { VehicleRegistrationForm } from '@/components/Userdashboard/VehicleRegistrationForm';
import { VehicleRenewal } from '@/components/Userdashboard/VehicleRenewal';
import { ParkingSlotGrid } from '@/components/Userdashboard/ParkingSlotGrid';
import { NotificationCenter } from '@/components/Userdashboard/NotificationCenter';

export const UserDashboard = () => {
    const [activeSection, setActiveSection] = useState('register');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    // Mock user data - replace with actual user context
    const userData = {
        name: 'John Michael Doe',
        email: 'john.doe@phinmaed.com',
        role: 'Student',
        avatar: null, // You can add avatar URL here
        status: 'Active'
    };

    const menuItems = [
        { id: 'register', label: 'Register Vehicle', icon: Car },
        { id: 'renew', label: 'Renew Registration', icon: RefreshCw },
        { id: 'parking', label: 'Parking Slots', icon: ParkingSquare },
        { id: 'notifications', label: 'Notifications', icon: Bell }
    ];

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const getUserInitials = () => {
        return userData.name
            .split(' ')
            .map(n => n[0]) // Fixed: changed from n[1] to n[0]
            .join('')
            .toUpperCase();
    };

    const handleLogout = () => {
        // Add logout logic here
        console.log('Logging out...');
    };

    const handleProfile = () => {
        // Add profile navigation logic here
        console.log('Navigating to profile...');
        setProfileDropdownOpen(false);
    };

    const handleSettings = () => {
        // Add settings navigation logic here
        console.log('Navigating to settings...');
        setProfileDropdownOpen(false);
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'register':
                return <VehicleRegistrationForm />;
            case 'renew':
                return <VehicleRenewal />;
            case 'parking':
                return <ParkingSlotGrid />;
            case 'notifications':
                return <NotificationCenter />;
            default:
                return <VehicleRegistrationForm />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-16'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                                <Car className="h-5 w-5 text-white" />
                            </div>
                            {sidebarOpen && (
                                <div className="overflow-hidden flex-1 min-w-0">
                                    <h2 className="font-semibold text-sm truncate">Parking System</h2>
                                    <p className="text-xs text-gray-500 truncate">PHINMA UI</p>
                                </div>
                            )}
                        </div>
                        {sidebarOpen && (
                            <button
                                onClick={toggleSidebar}
                                className="shrink-0 p-1 hover:bg-gray-100 rounded-md transition-colors"
                            >
                                <X className="h-4 w-4 text-gray-500" />
                            </button>
                        )}
                    </div>

                    {/* Menu Items */}
                    <nav className="flex-1 p-2 space-y-3">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon className="h-5 w-5 shrink-0" />
                                    {sidebarOpen && (
                                        <span className="text-sm font-medium overflow-hidden whitespace-nowrap flex-1 text-left">
                                            {item.label}
                                        </span>
                                    )}
                                    {sidebarOpen && isActive && (
                                        <ChevronRight className="h-4 w-4 shrink-0" />
                                    )}
                                </button>
                            );
                        })}
                    </nav>



                    {/* Profile Section at Bottom */}
                    <div className="p-4 border-t border-gray-200">
                        {sidebarOpen ? (
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                    {getUserInitials()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {userData.name}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {userData.role}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                                    {getUserInitials().charAt(0)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div
                className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-16'
                    }`}
            >
                {/* Top Bar */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            {!sidebarOpen && (
                                <button
                                    onClick={toggleSidebar}
                                    className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                                >
                                    <Menu className="h-5 w-5 text-gray-600" />
                                </button>
                            )}
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {menuItems.find(item => item.id === activeSection)?.label}
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    PHINMA University of Iloilo - Parking Management System
                                </p>
                            </div>
                        </div>


                        {/* User Profile with Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-gray-900">
                                        {userData.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {userData.role}
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        {getUserInitials()}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                            </button>

                            {/* Profile Dropdown */}
                            {profileDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                                    {/* User Info */}
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                                {getUserInitials()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 truncate">
                                                    {userData.name}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {userData.email}
                                                </p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="text-xs text-gray-500">{userData.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dropdown Menu Items */}
                                    <div className="py-2">
                                        <button
                                            onClick={handleProfile}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <User className="h-4 w-4" />
                                            <span>My Profile</span>
                                        </button>
                                        <button
                                            onClick={handleSettings}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <Settings className="h-4 w-4" />
                                            <span>Settings</span>
                                        </button>
                                    </div>

                                    {/* Logout */}
                                    <div className="border-t border-gray-100 pt-2">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6 overflow-auto h-[calc(100vh-81px)]">
                    <div className="max-w-6xl mx-auto">
                        {/* Render the active component */}
                        {renderContent()}
                    </div>
                </div>
            </div>

            {/* Backdrop for dropdown */}
            {profileDropdownOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileDropdownOpen(false)}
                />
            )}
        </div>
    );
};