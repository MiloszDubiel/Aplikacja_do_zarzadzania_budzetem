import React from "react";
import { BrowserRouter ,Router, Route, Routes } from "react-router-dom";
import Login from "./Components/login/Login";
import Register from "./Components/register/Register";
import Navbar from "./Components/navbar/Navbar"; 
import Dashboard from "./Components/dashboard/Dashboard";

const Main = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />       
            </Routes>
            <Routes>
                <Route path="/register" element={<Register />} />       
            </Routes>
            <Routes>
                <Route path="/dashboard" element={<> <Navbar />  <Dashboard/> </>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Main