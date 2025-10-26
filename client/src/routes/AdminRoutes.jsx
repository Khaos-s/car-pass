import React from 'react'
import { Routes, Route } from "react-router-dom";


function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<LandingPage />} />
                <Route path="/auth/signup" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />

            </Route>
        </Routes>
    )
}

export default AdminRoutes
