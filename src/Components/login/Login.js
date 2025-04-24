import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./login-style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  let email = useRef(null);
  let passoword = useRef(null);
  let emailError = useRef(null);
  let passwordError = useRef(null);
  let infoDiv = useRef(null);
  let checkbox = useRef(null);
  const naviagate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["email"]);

  useEffect(() => {
     const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
     if (token) {
       axios
         .get("http://localhost:3001/user-profile", {
           headers: {
             Authorization: token,
           },
         })
         .then((res) => {
           console.log(res)
            localStorage.setItem(
              "userData",
              JSON.stringify(res.data)
           );
           naviagate("/dashboard");
         })
         .catch(() => {
           localStorage.removeItem("token");
         });
     }
  });

  useEffect(() => {
    if (userData == null) return;

    axios
      .post("http://localhost:3001/login", {
        email: userData.email,
        password: userData.passoword,
        rememberMe: userData.rememberMe,
      })
      .then((res) => {
        if (
          res.data.info === "Niepoprawne hasło" ||
          res.data.info === "Konto nie istnieje" ||
          res.data.info === "Niepoprawne hasło"
        ) {
          infoDiv.current.style.display = "block";
          infoDiv.current.textContent = res.data.info;
        } else {
          localStorage.setItem(
            "userData",
            JSON.stringify(...res.data.data)
          );
          setTimeout(() => naviagate("/dashboard"), 500);
          infoDiv.current.style.display = "block";
          infoDiv.current.textContent = res.data.info;
          const token = res.data.token;
          localStorage.setItem("token", token);
        }
      });
  }, [userData]);

  const handleLogin = () => {
    let emailValue = String(email.current.value.toString())
      .trim()
      .toLowerCase();
    let passwordValue = String(passoword.current.value.toString());

    emailError.current.textContent = "";
    passwordError.current.textContent = "";
    if (!emailValue.includes("@"))
      emailError.current.textContent = "Niepoprawny email";
    else if (passwordValue.length <= 0) {
      passwordError.current.textContent = "Puste hasło";
    } else {
      setUserData({
        email: emailValue,
        passoword: passwordValue,
        rememberMe: checkbox.checked
      });
    }
  };

  return (
    <>
      <div
        className="info"
        ref={infoDiv}
        onClick={() => {
          infoDiv.current.style.display = "none";
        }}
      ></div>
      <div className="login_form">
        <form>
          <h3 style={{ marginBottom: 10 + "px" }}>Zaloguj się</h3>
          <p className="separator"></p>
          <div className="input_box">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Wpisz email..."
              required
              ref={email}
            />
            <p className="error" id="email-error" ref={emailError}></p>
          </div>
          <div className="input_box">
            <div className="password_title">
              <label htmlFor="password">Wpisz hasło</label>
            </div>
            <input
              type="password"
              id="password"
              placeholder="Wpisz hasło..."
              required
              ref={passoword}
            />
            <p className="error" id="email-error" ref={passwordError}></p>
          </div>
          <div className="checkbox_box">
            <input type="checkbox" id="remember-me" ref={checkbox} />
            <label htmlFor="remember-me">Zapamietaj mnie</label>
          </div>
          <button type="button" onClick={handleLogin}>
            Zaloguj się
          </button>
          <p className="sign_up">
            Nie masz konta?
            <Link to="/register">
              <b> Zarejestruj się</b>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};
export default Login;
