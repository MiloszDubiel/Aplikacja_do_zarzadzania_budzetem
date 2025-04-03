import React from "react";
import { BrowserRouter ,Router, Route, Routes } from "react-router-dom";
import Login from "./Components/login/Login";
import Register from "./Components/register/Register";

const Main = ()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />       
            </Routes>
            <Routes>
                <Route path="register" element={<Register />} />       
            </Routes>
        </BrowserRouter>
    )
}

export default Main