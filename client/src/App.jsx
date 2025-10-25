import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "sonner";
// Routes
import PublicRoutes from "./routes/PublicRoutes";

function App() {

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </>
  )
}

export default App
