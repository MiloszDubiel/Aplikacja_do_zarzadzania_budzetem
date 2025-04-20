import React, { useEffect, useState, useRef } from "react";
import "./dashboard-style.css";
import ForbiddenContent from "../forbidden/Forbedden";
import { TbMoneybag } from "react-icons/tb";
import { HiArrowSmallUp, HiArrowSmallDown } from "react-icons/hi2";
import axios from "axios";
import { IoSettingsOutline } from "react-icons/io5";
import { formatDate } from "../histroy/HistoryItem";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const Dashboard = () => {
  const userData = JSON.parse(window.localStorage.getItem("userData"));
  let emailFromCookie = document.cookie.substr(6);
  let [transactionsData, setTransactionsData] = useState([]);
  let [dashboardData, setDashboardData] = useState(null);
  let navigation = useNavigate();
  let amount = useRef(null);
  let [forceUpdate, setforceUpdate] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:3001/history", {
        userID: JSON.parse(window.localStorage.getItem("userData")).id,
      })
      .then((res) => {
        setTransactionsData(res.data);
      });

    axios
      .post("http://localhost:3001/dashboard-data", {
        email: userData.email,
      })
      .then((res) => {
        setDashboardData(res.data.data[0]);
      });
    console.log("DUPA");
  }, [forceUpdate]);

  const spentMoney =
    typeof transactionsData.filter != "function"
      ? 0
      : transactionsData
          .filter((element) => element.type === "Wydatki")
          .reduce((x, { amount }) => x + amount, 0);

  const incomMoney =
    typeof transactionsData.filter != "function"
      ? 0
      : transactionsData
          .filter((element) => element.type === "Przychody")
          .reduce((x, { amount }) => x + amount, 0);

  const sendAmount = () => {
    let amountOfMoney = String(amount.current.value).trim();

    if (!amountOfMoney) {
      alert("Nie podano kowty");
    } else {
      axios.post("http://localhost:3001/set-amount", {
        amount: amountOfMoney,
        email: userData.email,
      });
      setforceUpdate(!forceUpdate);
      amount.current.value = "";
    }
  };

  const history =
    typeof transactionsData.map != "function" ? (
      <tr className="table-dashboard">
        <td
          colSpan={5}
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={() => {
            navigation("/transaction");
          }}
        >
          Klikinj tutaj, aby dodać transakcje.
        </td>
      </tr>
    ) : (
      transactionsData.map((el, index) => {
        return (
          <tr style={{ animation: `fadeIn linear ${0.2 * index}s` }}>
            <td>
              <p>{el.name}</p>
            </td>
            <td>{formatDate(el.transaction_date)}</td>
            <td>
              {el.type == "Wydatki" ? (
                <span className="status spend">{el.type}</span>
              ) : (
                <span className="status incom">{el.type}</span>
              )}
            </td>
            <td>{el.description}</td>
            <td>{el.amount}zł</td>
          </tr>
        );
      })
    );

  const content =
    emailFromCookie === userData.email || userData.email != undefined ? (
      <section
        id="content"
        onMouseUp={(event) => {
          let element = document.querySelector(".popup-window");
          if (event.target != element && event.target.parentNode != element) {
            element.classList.remove("show-popup");
          }
        }}
      >
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Strona główna</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                </li>
              </ul>
            </div>
            <a
              onClick={() =>
                document.querySelector(".user-setting").classList.add("show")
              }
              className="btn-download"
            >
              <IoSettingsOutline />
            </a>
          </div>

          <ul className="box-info">
            <li style={{ animation: `fadeIn linear ${0.1}s` }}>
              <i className="bx bxs-calendar-check">
                <TbMoneybag />
              </i>
              <span className="text">
                <h3>Stan konta</h3>
                <p>{dashboardData == null ? "" : dashboardData.balance} zł</p>
              </span>
              <div style={{ display: "block", position: "relative" }}>
                <buttom
                  className="add-button"
                  onClick={() => {
                    document
                      .querySelector(".popup-window")
                      .classList.toggle("show-popup");
                  }}
                >
                  <IoMdAdd />
                </buttom>
              </div>
              <div style={{ display: "block", position: "relative" }}>
                <div className="popup-window">
                  <span style={{ textAlign: "center", fontWeight: "bold" }}>
                    Podaj kwote:{" "}
                  </span>
                  <input
                    type="number"
                    id="amount"
                    placeholder="Kwota"
                    ref={amount}
                  />
                  <button onClick={sendAmount}>
                    <IoMdAdd />
                  </button>
                </div>
              </div>
            </li>
            <li style={{ animation: `fadeIn linear ${0.3}s` }}>
              <i className="bx bxs-group">
                <HiArrowSmallUp />
              </i>
              <span className="text">
                <h3>Wydatki z tego miesiąca</h3>
                <p>{spentMoney}zł</p>
              </span>
            </li>
            <li style={{ animation: `fadeIn linear ${0.4}s` }}>
              <i className="bx bxs-dollar-circle">
                <HiArrowSmallDown />
              </i>
              <span className="text">
                <h3>Przychody z tego miesiąca</h3>
                <p>{incomMoney}zł</p>
              </span>
            </li>
          </ul>

          <div
            className="table-data"
            style={{ animation: `fadeIn linear ${0.4}s` }}
          >
            <div
              className="order"
              style={{ animation: `fadeIn linear ${0.4}s` }}
            >
              <div className="head">
                <h3>Histora wydatków i przychodów</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table className="table-dashboard">
                <thead>
                  <tr>
                    <th>Kategoria</th>
                    <th>Data transakcji</th>
                    <th>Typ</th>
                    <th>Opis</th>
                    <th>Kwota</th>
                  </tr>
                </thead>
                <tbody>{history}</tbody>
              </table>
            </div>
            <div
              className="order"
              style={{ animation: `fadeIn linear ${0.4}s` }}
            >
              <div className="head">
                <h3>Porównywania wydatków</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <div className="compare-wrapper">
                <h3>Porównaj wydatki</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label>Piewrszy okres</label>
                    <input type="month" name="period1" required />
                  </div>

                  <div className="form-group">
                    <label>Drugi okres</label>
                    <input type="month" name="period2" required />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Kategoria</label>
                    <select >
                      <option value={1}>Jedzenie</option>
                      <option value={2}>Transport</option>
                      <option value={3}>Rozrywka</option>
                      <option value={4}>Wynagrodzenie</option>
                      <option value={5}>Zakupy</option>
                      <option value={6}>Inwestycje</option>
                      <option value={7}>Subskrypcje</option>
                      <option value={8}>Edukacja</option>
                      <option value={9}>Zdrowie</option>
                      <option value={10}>Oszczędności</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Typ</label>
                    <select name="type">
                      <option value="">Wszystko</option>
                      <option value="Przychody">Przychody</option>
                      <option value="Wydatki">Wydatki</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="button-compare">
                  Porównaj
                </button>
              </div>
            </div>
            <div
              className="profile-card"
              style={{ animation: `fadeIn linear ${0.4}s` }}
            >
              <div className="head" style={{ width: 100 + "%" }}>
                <h3>Profil</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <div className="image">
                <img src="" alt="" className="profile-pic" />
              </div>
              <div className="data">
                <h2>
                  {dashboardData == null ? " " : dashboardData.name}{" "}
                  {dashboardData == null ? " " : dashboardData.lastname}
                </h2>
              </div>
              <div className="row">
                <div className="user-info">
                  <h3>Email:</h3>
                  <span>
                    {dashboardData == null ? "" : dashboardData.email}
                  </span>
                </div>
                <div className="user-info">
                  <h3>Data dołączenia: </h3>
                  <span>
                    {dashboardData == null
                      ? ""
                      : dashboardData.created_at.substring(
                          0,
                          dashboardData.created_at.indexOf("T")
                        )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </section>
    ) : (
      <ForbiddenContent />
    );

  return <>{content}</>;
};

export default Dashboard;
