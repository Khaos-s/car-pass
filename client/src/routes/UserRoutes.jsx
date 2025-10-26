// src/routes/UserRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navbar";
import LandingPage from "@/pages/user/LandingPage";
import { Register } from "@/auth/Signup";
import Login from "@/auth/Login";
import { UserDashboard } from "../pages/user/UserDashboard";

function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/signup" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/dashboard/" element={<UserDashboard />} />
        </Routes>
    );
}

export default UserRoutes;