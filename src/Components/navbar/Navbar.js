import React from "react";
import './navbar-style.css'
import { MdOutlineDashboard, MdHistory, MdOutlineAccountCircle } from "react-icons/md";
import { GrTransaction, GrPowerShutdown } from "react-icons/gr";
import { IoStatsChartOutline, IoSettingsOutline } from "react-icons/io5";
import { CiMoneyBill } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";


const Navbar = () =>{

    const isLogged = window.localStorage.getItem("isLogged")
    const userData = JSON.parse(window.localStorage.getItem("userData"))



    const content = isLogged == null || isLogged == "0" ? "" : <>
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
        <Link to="/dashboard" className="link"><span className="icon" ><MdOutlineDashboard className="icons"/></span>Dashboard</Link>
        </li>
        <h4>
            <span>Główne funckje</span>
            <div className="menu-separator"></div>
        </h4>
        <li>
            <Link to="/transaction" className="link"><span className="icon"><GrTransaction className="icons" /></span>Transakcje</Link>
        </li>
        <li>
            <Link to="" className="link"><span className="icon"><MdHistory className="icons" /></span>Histoiria</Link>
        </li>
        <li>
            <Link to="" className="link"><span className="icon"><IoStatsChartOutline className="icons" /></span>Statystyki</Link>
        </li>
        <li>
            <Link to="" className="link"><span className="icon"><CiMoneyBill className="icons" /></span>Budżetowanie</Link>
        </li>
        <li>
            <Link to="" className="link"><span className="icon"><IoIosNotificationsOutline className="icons" /></span>Powiadomienia</Link>
        </li>
        <h4>
            <span>Konto</span>
            <div className="menu-separator"></div>
        </h4>
        <li>
            <Link to="" className="link"><span className="icon"><MdOutlineAccountCircle className="icons"/></span>Profil</Link>
        </li>
        <li>
            <Link to="" className="link"><span className="icon"><IoSettingsOutline className="icons" /></span>Ustawienia</Link>
        </li>
        <li>
            <Link to="/" onClick={()=>{
                window.localStorage.setItem("isLogged", 0)
                window.localStorage.setItem("userData", JSON.stringify({}))

            }} className="link"><span className="icon"><GrPowerShutdown className="icons" /></span>Wyloguj</Link>
        </li>
        </ul>
        <div className="user-account">
        <div className="user-profile">
            <div className="user-detail">
            <h3>{userData.data[0].name + " "+ userData.data[0].lastname}</h3>
            </div>
        </div>
        </div>
    </aside>
</>



    return(
        <>
          {content}
        </>
    )
}
export default Navbar