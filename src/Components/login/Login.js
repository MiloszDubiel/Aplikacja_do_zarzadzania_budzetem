import React from "react";
import { Link } from "react-router-dom";
import './login-style.css'

const Login = ()=>{
    return (
        <div className="login_form">
        <form action="#">
        <h3 style={{marginBottom: 10+"px"}}>Zaloguj się</h3>
        <p className="separator">
        </p>
        <div className="input_box">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Wpisz email..." required />
        </div>
        <div className="input_box">
            <div className="password_title">
            <label for="password">Wpisz hasło</label>
            <a href="#">Zapomniałeś hasła?</a>
            </div>
            <input type="password" id="password" placeholder="Wpisz hasło..." required />
        </div>
        <button type="submit">Zaloguj się</button>
        <p className="sign_up">Nie masz konta?  
            <Link to="register" ><a> Zarejestruj się</a></Link> 
        </p>
        </form>
    </div>
    )
}
export default Login