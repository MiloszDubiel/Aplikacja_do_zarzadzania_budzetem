import React, { useEffect, useRef, useState } from "react";
import "./transaction-style.css";
import ForbiddenContent from "../forbidden/Forbedden";
import HistoryItem from "../histroy/HistoryItem";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import useForceUpdate from "use-force-update";

const Transaction = () => {
  const userData = JSON.parse(window.localStorage.getItem("userData"));
  let emailFromCookie = document.cookie.substr(6);

  const categoryInput = useRef(null);
  const dateInput = useRef(null);
  const typeInput = useRef(null);
  const descInput = useRef(null);
  const costInput = useRef(null);
  const popUp = useRef(null);
  const popUpContainer = useRef(null);
  const sortOptions = useRef(null);

  let [isActive, setIsActive] = useState(false);
  const force = useForceUpdate();

  useEffect(() => {
    setIsActive(false);
  });

  const setCurrentDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleAddingRecord = () => {
    const category = categoryInput.current.value.trim();
    const date = dateInput.current.value.trim();
    const type = typeInput.current.value.trim();
    const description = descInput.current.value.trim();
    const cost = costInput.current.value.trim();

    if (!date.length || !description.length || !cost.length || isNaN(cost)) {
      popUp.current.classList.add("open-popup");
      popUpContainer.current.classList.add("open-popup-window");
    } else {
      axios.post("http://localhost:3001/insert-record", {
        userID: userData.id,
        category,
        date,
        type,
        description,
        cost,
      });
      descInput.current.value = "";
      costInput.current.value = "";

      setIsActive(true);
    }
  };

  const content =
    emailFromCookie === userData.email || userData.email != undefined ? (
      <>
        <div class="container-popup" ref={popUpContainer}>
          <div class="popup" id="popup" ref={popUp}>
            <img src="img/tick.png" alt="" />
            <h2>Błąd</h2>
            <p>
              Formularz dodawania wydatków i przychodów jest niepoprawny. Popraw błędne
              pola.
            </p>
            <button
              type="button"
              onClick={() => {
                popUp.current.classList.remove("open-popup");
                popUpContainer.current.classList.remove("open-popup-window");
              }}
            >
              OK
            </button>
          </div>
        </div>
        <section id="content">
          <main>
            <div className="head-title">
              <div className="left">
                <h1>Śledzenie wydatków i przychodów</h1>
                <ul className="breadcrumb">
                  <li>
                    <i className="bx bx-chevron-right"></i>
                  </li>
                </ul>
              </div>
            </div>
            <div className="transactions">
              <div className="order">
                <div className="head">
                  <h3>Histora</h3>
                  <span>Sortuj po:</span>
                  <select
                    className="btn-select"
                    ref={sortOptions}
                    onChange={() => force()}
                  >
                    <option disabled selected value>
                      {" "}
                      -- Wybierz --{" "}
                    </option>
                    <option value="category">Kategoria</option>
                    <option value="date">Data transakcji</option>
                    <option value="type">Typ</option>
                    <option value="description">Opis</option>
                    <option value="amount">Kwota</option>
                  </select>
                </div>
                <table>
                  <thead>
                    <tr>
                      <td
                        colSpan={6}
                        style={{ fontWeight: 700, textAlign: "center" }}
                      >
                        Dodaj transakcje{" "}
                      </td>
                    </tr>
                    <tr className="transaction-tr">
                      <th>
                        <select ref={categoryInput}>
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
                      </th>
                      <th>
                        <input
                          type="date"
                          ref={dateInput}
                          value={setCurrentDate()}
                        />
                      </th>
                      <th>
                        <select ref={typeInput}>
                          <option value="Przychody">Przychody</option>
                          <option value="Wydatki">Wydatki</option>
                        </select>
                      </th>
                      <th>
                        <input
                          type="text"
                          placeholder="Podaj opis..."
                          ref={descInput}
                        />
                      </th>
                      <th>
                        <input
                          type="number"
                          placeholder="Podaj kwotę..."
                          ref={costInput}
                        />
                      </th>
                      <th>
                        <button
                          className="add-record"
                          onClick={handleAddingRecord}
                        >
                          <IoMdAdd />
                        </button>
                      </th>
                    </tr>
                    <tr>
                      <th>Kategoria</th>
                      <th>Data transakcji</th>
                      <th>Typ</th>
                      <th>Opis</th>
                      <th>Kwota</th>
                      <th>Akcja</th>
                    </tr>
                  </thead>
                  <HistoryItem
                    isActive={isActive}
                    sortBy={sortOptions.current}
                  />
                </table>
              </div>
            </div>
          </main>
        </section>
      </>
    ) : (
      <ForbiddenContent />
    );

  return <>{content}</>;
};

export default Transaction;
