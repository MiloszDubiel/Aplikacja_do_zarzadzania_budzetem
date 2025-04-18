import React, { useEffect, useState } from "react";
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
  let navigation = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:3001/history", {
        userID: JSON.parse(window.localStorage.getItem("userData")).id,
      })
      .then((res) => {
        setTransactionsData(res.data);
      });
  }, []);

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
      transactionsData.map((el) => {
        return (
          <tr>
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
            <li>
              <i className="bx bxs-calendar-check">
                <TbMoneybag />
              </i>
              <span className="text">
                <h3>Stan konta</h3>
                <p>{userData.balance} zł</p>
              </span>
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
              <div className="popup-window">
                <span style={{ textAlign: "center" }}>Podaj kwote</span>
                <input type="number" id="amount" />
                <button>
                  <IoMdAdd />
                </button>
              </div>
            </li>
            <li>
              <i className="bx bxs-group">
                <HiArrowSmallUp />
              </i>
              <span className="text">
                <h3>Wydatki z tego miesiąca</h3>
                <p>{spentMoney}zł</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-dollar-circle">
                <HiArrowSmallDown />
              </i>
              <span className="text">
                <h3>Przychody z tego miesiąca</h3>
                <p>{incomMoney}zł</p>
              </span>
            </li>
          </ul>

          <div className="table-data">
            <div className="order">
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
            <div className="order">
              <div className="head">
                <h3>Porównywania wydatków</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
            </div>
            <div className="profile-card">
              <div className="head" style={{ width: 100 + "%" }}>
                <h3>Profil</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <div className="image">
                <img src="" alt="" className="profile-pic" />
              </div>
              <div className="data">
                <h2>{userData.name + " " + userData.lastname}</h2>
              </div>
              <div className="row">
                <div className="user-info">
                  <h3>Email:</h3>
                  <span>{userData.email}</span>
                </div>
                <div className="user-info">
                  <h3>Data dołączenia: </h3>
                  <span>
                    {userData === null
                      ? ""
                      : userData.created_at.substring(
                          0,
                          userData.created_at.indexOf("T")
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
