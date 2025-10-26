import React from 'react'
import { Routes, Route } from "react-router-dom";
import AdminLandingPage from '@/pages/admin/AdminLandingPage';
import { Register } from "@/auth/Signup";
import Login from "@/auth/Login";
import { Navigation } from "@/components/Navigation";
import UserManagement from '@/components/Admindashboard/UserManagement';
import VehicleRegistry from '@/components/Admindashboard/VehicleRegistry';
import Reports from '@/components/Admindashboard/Reports';
import { ParkingManagement } from '@/components/Admindashboard/ParkingManagement';

function AdminRoutes() {
    return (
        <Routes>
            {/* This file is mounted at /admin/* in App.jsx, so use relative parent path ("/") here */}
            <Route path="/" element={<Navigation />}>
                {/* index -> /admin */}
                <Route index element={<AdminLandingPage />} />
                <Route path="auth/signup" element={<Register />} />
                <Route path="auth/login" element={<Login />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="vehicles" element={<VehicleRegistry />} />
                <Route path="reports" element={<Reports />} />
                <Route path="parking" element={<ParkingManagement />} />
            </Route>
        </Routes>
    );
}

export default AdminRoutes
