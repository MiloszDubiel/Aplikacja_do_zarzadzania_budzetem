import React from "react";
import './navbar-style.css'
import { MdOutlineDashboard, MdHistory, MdOutlineAccountCircle } from "react-icons/md";
import { GrOverview ,GrTransaction, GrPowerShutdown } from "react-icons/gr";
import { IoStatsChartOutline, IoSettingsOutline } from "react-icons/io5";
import { CiMoneyBill } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";


const Navbar = () =>{
    return(
    <>
        <aside className="sidebar">
            <div className="sidebar-header">
                <img src="images/logo.png" alt="logo" />
            </div>
            <ul className="sidebar-links">
            <h4>
                <span>Menu głowe</span>
                <div className="menu-separator"></div>
            </h4>
            <li>
                <a href="#"><span className="icon"><MdOutlineDashboard className="icons"/></span>Dashboard</a>
            </li>
            <li>
                <a href="#"><span className="icon"><GrOverview className="icons"/></span>Overview</a>
            </li>
            <h4>
                <span>Główne funckje</span>
                <div className="menu-separator"></div>
            </h4>
            <li>
                <a href="#"><span className="icon"><GrTransaction className="icons" /></span>Transakcje</a>
            </li>
            <li>
                <a href="#"><span className="icon"><MdHistory className="icons" /></span>Histoiria</a>
            </li>
            <li>
                <a href="#"><span className="icon"><IoStatsChartOutline className="icons" /></span>Statystyki</a>
            </li>
            <li>
                <a href="#"><span className="icon"><CiMoneyBill className="icons" /></span>Budżetowanie</a>
            </li>
            <li>
                <a href="#"><span className="icon"><IoIosNotificationsOutline className="icons" /></span>Powiadomienia</a>
            </li>
            <h4>
                <span>Konto</span>
                <div className="menu-separator"></div>
            </h4>
            <li>
                <a href="#"><span className="icon"><MdOutlineAccountCircle className="icons"/></span>Profil</a>
            </li>
            <li>
                <a href="#"><span className="icon"><IoSettingsOutline className="icons" /></span>Ustawienia</a>
            </li>
            <li>
                <a href="#"><span className="icon"><GrPowerShutdown className="icons" /></span>Wyloguj</a>
            </li>
            </ul>
            <div className="user-account">
            <div className="user-profile">
                <div className="user-detail">
                <h3>Eva Murphy</h3>
                </div>
            </div>
            </div>
        </aside>
    </>
    )
}
export default Navbar