import React from "react"
import { Link } from "react-router-dom"
import './login-style.css'

function handleSubmit(){
    const request = fetch('http://localhost:3001/').then(res => {
        res.json().then(data=>{
            console.log(data)
        })
    })
}

const Login = ()=>{
    return (
        <div className="login_form">
        <form>
        <h3 style={{marginBottom: 10+"px"}}>Zaloguj się</h3>
        <p className="separator">
        </p>
        <div className="input_box">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Wpisz email..." required />
        </div>
        <div className="input_box">
            <div className="password_title">
            <label htmlFor="password">Wpisz hasło</label>
            <a href="#">Zapomniałeś hasła?</a>
            </div>
            <input type="password" id="password" placeholder="Wpisz hasło..." required />
        </div>
        <button type="button" onClick={handleSubmit}>Zaloguj się</button>
        <p className="sign_up">Nie masz konta?  
            <Link to="register" ><b> Zarejestruj się</b></Link> 
        </p>
        </form>
    </div>
    )
}
export default Login