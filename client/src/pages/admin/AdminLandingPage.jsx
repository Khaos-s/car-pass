import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminLandingPage() {
    const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'vehicle-registry' | 'user-management' | 'reports'

    return (
        <div className="h-full p-4 lg:p-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1 mb-6">Manage parking registrations and view analytics</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* User Management */}
                <Link to="/admin/user-management" className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                        <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                    <p className="text-gray-600">Manage user accounts, permissions, and access control</p>
                    <div className="mt-4 flex items-center text-sm text-blue-600">
                        <span>View users</span>
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </Link>

                {/* Vehicle Registry */}
                <Link to="/admin/vehicles" className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Vehicle Registry</h3>
                        <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <circle cx="8" cy="14" r="2" />
                            <circle cx="16" cy="14" r="2" />
                            <path d="M2 10h20" />
                        </svg>
                    </div>
                    <p className="text-gray-600">Manage vehicle registrations, approvals, and parking assignments</p>
                    <div className="mt-4 flex items-center text-sm text-blue-600">
                        <span>View registry</span>
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </Link>

                {/* Reports */}
                <Link to="/admin/reports" className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
                        <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
                        </svg>
                    </div>
                    <p className="text-gray-600">Generate and view system reports and analytics</p>
                    <div className="mt-4 flex items-center text-sm text-blue-600">
                        <span>View reports</span>
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </Link>

                {/* Parking Management */}
                <Link to="/admin/parking" className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Parking Management</h3>
                        <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
                            <path d="M8 10h8M8 14h6" />
                        </svg>
                    </div>
                    <p className="text-gray-600">Monitor and manage parking slots and vehicle assignments</p>
                    <div className="mt-4 flex items-center text-sm text-blue-600">
                        <span>Manage parking</span>
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>
                </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">Total Users</p>
                        <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <path d="M20 8v.5a3 3 0 0 0-2 2.76A3 3 0 0 0 20 18v2.5" />
                            <circle cx="17.5" cy="12.5" r="3.5" />
                        </svg>
                    </div>
                    <p className="mt-4 text-2xl font-bold text-gray-900">360</p>
                    <p className="text-sm text-gray-600">Registered accounts</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">Total Vehicles</p>
                        <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <circle cx="8" cy="14" r="2" />
                            <circle cx="16" cy="14" r="2" />
                            <path d="M2 10h20" />
                        </svg>
                    </div>
                    <p className="mt-4 text-2xl font-bold text-gray-900">128</p>
                    <p className="text-sm text-gray-600">Registered vehicles</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                        <svg className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>
                    <p className="mt-4 text-2xl font-bold text-gray-900">12</p>
                    <p className="text-sm text-gray-600">Awaiting review</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-500">Available Slots</p>
                        <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M9 17l2-2 2 2 4-4" />
                        </svg>
                    </div>
                    <p className="mt-4 text-2xl font-bold text-gray-900">45</p>
                    <p className="text-sm text-gray-600">Free parking spaces</p>
                </div>
            </div>
        </div>
    );
}
