import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { User, Settings, Gift, ArrowRight, LogOut, ChevronDown, Award } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Mock authentication functions - replace with your actual auth logic
const logout = async () => {
    // Replace with your actual logout API call
    return { success: true, message: "Logged out successfully" };
};

// Mock user data - replace with your actual user context
const useAuth = () => {
    // Replace with your actual authentication context
    return {
        isLoggedIn: true, // Change to true to test logged-in state
        userData: {
            email: "john.doe@example.com",
            firstName: "John",
            lastName: "Doe",
            role: "student" // Change to 'admin' to test admin state
        }
    };
};

export function Navigation() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { isLoggedIn, userData } = useAuth();

    const handleLogin = () => {
        navigate('/auth/login');
    };

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
        navigate('/');
        setIsProfileDropdownOpen(false);
    };

    const handleDashboard = () => {
        if (userData?.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/dashboard/');
        }
        setIsProfileDropdownOpen(false);
    };

    const handleSettings = () => {
        navigate('/dashboard/settings');
        setIsProfileDropdownOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Close dropdown on route change
    useEffect(() => {
        setIsProfileDropdownOpen(false);
    }, [location.pathname]);

    // Get user initials for avatar
    const getUserInitials = () => {
        if (!userData?.email) return 'U';
        if (userData?.firstName && userData?.lastName) {
            return `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`.toUpperCase();
        }
        return userData.email.charAt(0).toUpperCase();
    };

    const getUserDisplayName = () => {
        if (userData?.firstName && userData?.lastName) {
            return `${userData.firstName} ${userData.lastName}`;
        } else if (userData?.firstName) {
            return userData.firstName;
        } else if (userData?.email) {
            return userData.email.split('@')[0];
        }
        return 'User';
    };

    return (
        <>
            <nav className="shadow-sm border-b border-gray-100 px-4 py-4 sticky top-0 z-40 backdrop-blur-sm bg-white/80">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo/Brand */}
                    <Link
                        to="/"
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
                    >
                        <div className="w-8 h-8 bg-linear-to-r from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">PE</span>
                        </div>
                        <span className="font-bold text-xl bg-linear-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                            ParkEasy
                        </span>
                    </Link>

                    <div className="flex items-center gap-2">
                        {/* Navigation Links */}
                        <Button
                            variant={location.pathname === '/' ? 'default' : 'ghost'}
                            asChild
                            className={`
                                    transition-all duration-200 hover:scale-105
                                    ${location.pathname === '/'
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                                    : 'hover:bg-emerald-50 hover:text-emerald-700'
                                }
                                `}>
                            <Link to="/" className="flex items-center gap-2">
                                <Award className="w-4 h-4" />
                                <span className="hidden sm:inline">Home</span>
                            </Link>
                        </Button>

                        <Button
                            variant={location.pathname === '/Guide' ? 'default' : 'ghost'}
                            asChild
                            className={`
                                            transition-all duration-200 hover:scale-105
                                            ${location.pathname === '/Guide'
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                                    : 'hover:bg-emerald-50 hover:text-emerald-700'
                                }
                                        `}>
                            <Link to="/Guide" className="flex items-center gap-2">
                                <Gift className="w-4 h-4" />
                                <span className="hidden sm:inline">Guide</span>
                            </Link>
                        </Button>
                        <Button
                            variant={location.pathname === '/rewards-catalog' ? 'default' : 'ghost'}
                            asChild
                            className={`
                                        transition-all duration-200 hover:scale-105
                                        ${location.pathname === '/Contact'
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                                    : 'hover:bg-emerald-50 hover:text-emerald-700'
                                }
                                    `}>
                            <Link to="/Contact" className="flex items-center gap-2">
                                <Gift className="w-4 h-4" />
                                <span className="hidden sm:inline">Contact</span>
                            </Link>
                        </Button>



                        {/* Profile Dropdown Menu when logged in */}
                        {isLoggedIn ? (
                            <div className="relative" ref={dropdownRef}>
                                <Button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    variant="ghost"
                                    className="flex items-center gap-2 px-3 py-2 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 border-2 border-transparent hover:border-emerald-100 rounded-lg"
                                >
                                    <div className="w-8 h-8 bg-linear-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-md ring-2 ring-white">
                                        {getUserInitials()}
                                    </div>
                                    <span className="text-sm text-gray-700 max-w-32 truncate font-medium">
                                        {getUserDisplayName()}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-all duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                                </Button>

                                {/* Dropdown Menu */}
                                {isProfileDropdownOpen && (
                                    <>
                                        {/* Backdrop */}
                                        <div className="fixed inset-0 z-40" onClick={() => setIsProfileDropdownOpen(false)} />

                                        <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
                                            {/* User Info Header */}
                                            <div className="px-4 py-4 border-b border-gray-50 bg-linear-to-r from-emerald-50 to-blue-50 rounded-t-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg ring-4 ring-white">
                                                        {getUserInitials()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-semibold text-gray-900 truncate text-lg">
                                                            {getUserDisplayName()}
                                                        </div>
                                                        <div className="text-sm text-gray-600 truncate">
                                                            {userData?.email}
                                                        </div>
                                                        {userData?.role && (
                                                            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mt-1 capitalize">
                                                                {userData.role}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-2">
                                                <button
                                                    onClick={handleDashboard}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 group"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors duration-200">
                                                        <User className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-medium">
                                                        {userData?.role === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
                                                    </span>
                                                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                </button>

                                                {userData?.role === 'student' && (
                                                    <Link
                                                        to="/rewards"
                                                        onClick={() => setIsProfileDropdownOpen(false)}
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 group"
                                                    >
                                                        <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors duration-200">
                                                            <Gift className="w-4 h-4" />
                                                        </div>
                                                        <span className="font-medium">Rewards</span>
                                                        <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                    </Link>
                                                )}

                                                <button
                                                    onClick={handleSettings}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-200 group"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors duration-200">
                                                        <Settings className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-medium">Settings</span>
                                                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                </button>
                                            </div>

                                            {/* Logout Section */}
                                            <div className="border-t border-gray-100 py-2 mt-2">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
                                                >
                                                    <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                                                        <LogOut className="w-4 h-4" />
                                                    </div>
                                                    <span className="font-medium">Sign out</span>
                                                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <>
                                <Button
                                    onClick={handleLogin}
                                    variant="outline"
                                    className={`
                                        transition-all duration-500 ease 
                                        cursor-pointer rounded-full 
                                        border-2 border-emerald-700 
                                        bg-transparent text-emerald-700 
                                        hover:bg-emerald-600 hover:text-white 
                                        hover:scale-105 hover:shadow-lg
                                        transform
                                        ${location.pathname === '/auth/login' ? 'shadow-md' : ''}
                                    `}>
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Renders child routes here */}
            <Outlet />
        </>
    );
}