import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-md bg-white shadow-lg text-gray-500 hover:text-gray-700"
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>

            {/* Sidebar */}
            <nav className={`${sidebarOpen ? '' : 'hidden'} fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:block`}>
                <div className="p-4 flex flex-col space-y-2 mt-4 sidebar h-full overflow-y-auto">
                    {/* Logo Section */}
                    <div className="flex items-center justify-center p-4 border-b border-gray-200 mb-4">
                        <span className="text-xl font-bold text-gray-800">PHINMA</span>
                        <span className="text-sm text-gray-500 ml-2">Admin</span>
                    </div>

                    <Link 
                        to="/admin" 
                        className={`${isActive('/admin') ? 'active-dashboard text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'} flex items-center space-x-3 p-3 rounded-2xl font-semibold transition duration-150`}
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="9" />
                            <rect x="14" y="3" width="7" height="5" />
                            <rect x="14" y="12" width="7" height="9" />
                            <rect x="3" y="16" width="7" height="5" />
                        </svg>
                        <span className="z-20">Dashboard</span>
                    </Link>

                    <Link 
                        to="/admin/parking" 
                        className={`${isActive('/admin/parking') ? 'active-dashboard text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'} flex items-center space-x-3 p-3 rounded-2xl transition duration-150`}
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                        <span>Parking</span>
                    </Link>

                    <Link 
                        to="/admin/users" 
                        className={`${isActive('/admin/users') ? 'active-dashboard text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'} flex items-center space-x-3 p-3 rounded-2xl transition duration-150`}
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                        </svg>
                        <span>User Management</span>
                    </Link>

                    <Link 
                        to="/admin/vehicles" 
                        className={`${isActive('/admin/vehicles') ? 'active-dashboard text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'} flex items-center space-x-3 p-3 rounded-2xl transition duration-150`}
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 19H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2z" />
                            <path d="M10 6L7 2L4 6" />
                            <path d="M17 6L20 2L23 6" />
                        </svg>
                        <span>Vehicle Registry</span>
                    </Link>

                    <Link 
                        to="/admin/reports" 
                        className={`${isActive('/admin/reports') ? 'active-dashboard text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'} flex items-center space-x-3 p-3 rounded-2xl transition duration-150`}
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                        <span>Reports</span>
                    </Link>

                    <div className="mt-auto">
                        <Link 
                            to="/admin/settings" 
                            className={`${isActive('/admin/') ? 'active-dashboard text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'} flex items-center space-x-3 p-3 rounded-2xl transition duration-150`}
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H11a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V12h1a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-1.09z" />
                            </svg>
                            <span>Settings</span>
                        </Link>
                    </div>

                    {/* Settings at the bottom */}
                    <div className="mt-auto">
                        <Link 
                            to="/admin/settings" 
                            className={`${isActive('/admin/settings') ? 'active-dashboard text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'} flex items-center space-x-3 p-3 rounded-2xl transition duration-150`}
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H11a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V12h1a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-1.09z" />
                            </svg>
                            <span>Settings</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Overlay to close sidebar on mobile */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </>
    );
}