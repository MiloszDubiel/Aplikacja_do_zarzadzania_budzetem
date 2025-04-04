import React, {use, useRef} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './register-style.css'


const Register = ()=>{
    //Tworzy referencje do obiektu null
    let email = useRef(null)
    let passowrd = useRef(null)
    let repeatPassword = useRef(null)

    //Pola błedu 
    const emailError = useRef(null)
    const passwordError = useRef(null)

    const handleRegister = () => {
        //Wartosci pul formualrza 
        const emeilValue = String(email.current.value.toString())
        const passwordValue = String(passowrd.current.value.toString())
        const repeatPasswordValue = String(repeatPassword.current.value.toString())

        //RegEx do hasła 8 znaków, min 1 cyfra, 1 liczba, 1 znak specjalny
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|;:'",.<>?]).{8,}$/

        //Reset pola błedu 
        emailError.current.textContent = ' '
        passwordError.current.textContent = ' '

        let isValid = true
        if(!emeilValue.includes('@')){
          emailError.current.textContent = 'Błędny adres email.'
          isValid = false
        }

        if(!regex.test(passwordValue) || passwordValue != repeatPasswordValue){
          passwordError.current.textContent = 'Hasła są różne lub niezgodne z standardem.'
          isValid = false
        }
        if(isValid){
          axios.post('http://localhost:3001/register', {
            email: emeilValue,
            password: passwordValue
          }) 
        }
      }


    return (
      <div className="login_form">
        <form action="#">
        <h3 style={{marginBottom: 10+"px"}}>Zarejestruj</h3>
        <p className="separator">
        </p>
        <div className="input_box">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Wpisz email..." required ref={/*Przypisuje referencje tego inputa do useRef w email*/ email}/>
            <p className="error" id="email-error" ref={emailError}></p>
        </div>
        <div className="input_box">
            <label htmlFor="password">Hasło</label>
            <input type="password" id="password" placeholder="Wpisz hasło..." required ref={passowrd}/>
        </div>
        <div className="input_box">
            <label htmlFor="repeat-passowrd">Powtórz hasło</label>
            <input type="password" id="repeat-passowrd" placeholder="Powtórz hasło..." required ref={repeatPassword} />
            <p className="error" ref={passwordError}></p>
        </div>
        <button type="button" onClick={handleRegister}>Zarejestruj się</button>
        <p className="sign_up">Masz już konto? 
          <Link to="/" ><b> Zaloguj się</b></Link> 
        </p>
      </form>
      </div>
    )
}
export default Register