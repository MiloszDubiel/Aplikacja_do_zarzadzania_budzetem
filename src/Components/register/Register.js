import React from "react";
import { Link } from "react-router-dom";
import './register-style.css'

const Register = ()=>{
    return (
      <div className="login_form">
        <form action="#">
        <h3 style={{marginBottom: 10+"px"}}>Zarejestruj</h3>
        <p className="separator">
        </p>
        <div className="input_box">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Wpisz email..." required />
        </div>
        <div className="input_box">
            <label htmlFor="password">Hasło</label>
            <input type="password" id="password" placeholder="Wpisz hasło..." required />
        </div>
        <div className="input_box">
            <label htmlFor="repeat-passowrd">Powtórz hasło</label>
            <input type="email" id="repeat-passowrd" placeholder="Powtórz hasło..." required />
        </div>
        <button type="button">Zarejestruj się</button>
        <p className="sign_up">Masz już konto? 
          <Link to="/" ><b> Zaloguj się</b></Link> 
          </p>
      </form>
      </div>
    )
}
export default Register