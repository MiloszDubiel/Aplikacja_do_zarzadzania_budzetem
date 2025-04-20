import React, { useEffect, useState } from "react";
import "./history-style.css";
import axios from "axios";
import TransactionCell from "./TransactionCell";
import TransactionCellSorted from "./TransactionCellSorted";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

const HistoryItem = ({ isActive, sortBy }) => {
  let [historyData, setHistoryData] = useState([" "]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/history", {
        userID: JSON.parse(window.localStorage.getItem("userData")).id,
      })
      .then((res) => {
        setHistoryData(res.data);
      });
  }, [isActive]);

  const deleteRecord = (el) => {
    axios
      .post("http://localhost:3001/delete-record", {
        userID: el.user_id,
        transactionID: el.id,
      })
      .then((res) => {
        axios
          .post("http://localhost:3001/history", {
            userID: JSON.parse(window.localStorage.getItem("userData")).id,
          })
          .then((res) => {
            setHistoryData(res.data);
          });
      });
  };

  return sortBy == null ? (
    <tbody>
      <TransactionCell
        history={historyData}
        deleteRecord={(el) => deleteRecord(el)}
        formatDate={(date) => formatDate(date)}
      />
    </tbody>
  ) : (
    <tbody>
      <TransactionCellSorted
        history={historyData}
        deleteRecord={(el) => deleteRecord(el)}
        formatDate={(date) => formatDate(date)}
        sortBy={sortBy.value}
      />
    </tbody>
  );
};
export default HistoryItem;
