import React, { useRef } from "react"
import { Link } from "react-router-dom"
import './login-style.css'
import axios from "axios"


const Login = () => {
    
    let email = useRef(null)
    let passoword = useRef(null)
    let emailError = useRef(null)
    let passwordError = useRef(null)
    
    let infoDiv = useRef(null) 
    const handleLogin = () =>{
        let emailValue = String(email.current.value.toString()).trim().toLowerCase()
        let passwordValue = String(passoword.current.value.toString())
        
        emailError.current.textContent = ''
        passwordError.current.textContent = ''

        if(!emailValue.includes('@'))
            emailError.current.textContent = 'Niepoprawny email'
        else if(passwordValue.length <= 0){
            passwordError.current.textContent = 'Puste hasło'
        }
        else{
            axios.post('http://localhost:3001/login', {
                email: emailValue,
                password: passwordValue
            }).then(res =>{
                infoDiv.current.style.display = 'block'
                infoDiv.current.textContent = res.data.info
            })
        }
    }
    return (
        <>
        <div className="info" ref={infoDiv} onClick={()=>{
            infoDiv.current.style.display = 'none'
        }}></div>
        <div className="login_form">
            <form>
            <h3 style={{marginBottom: 10+"px"}}>Zaloguj się</h3>
            <p className="separator">
            </p>
            <div className="input_box">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Wpisz email..." required ref={email}/>
                <p className="error" id="email-error" ref={emailError}></p>
            </div>
            <div className="input_box">
                <div className="password_title">
                <label htmlFor="password">Wpisz hasło</label>
                </div>
                <input type="password" id="password" placeholder="Wpisz hasło..." required ref={passoword}/>
                <p className="error" id="email-error" ref={passwordError}></p>
            </div>
            <button type="button" onClick={handleLogin}>Zaloguj się</button>
            <p className="sign_up">Nie masz konta?  
                <Link to="register" ><b> Zarejestruj się</b></Link> 
            </p>
            </form>
        </div>
    </>
    )
}


export default Login