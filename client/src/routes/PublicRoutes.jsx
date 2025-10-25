// src/routes/PublicRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "../components/Navbar";
import LandingPage from "../pages/user/LandingPage";
import { Register } from "../auth/Signup";

function PublicRoutes() {
    return (
        <Routes>
            {/* ✅ Add "/*" here — allows nested routes */}
            <Route path="/" element={<Navigation />}>
                <Route index element={<LandingPage />} />
                <Route path="/auth/signup" element={<Register />} />

            </Route>
        </Routes>
    );
}

export default PublicRoutes;
