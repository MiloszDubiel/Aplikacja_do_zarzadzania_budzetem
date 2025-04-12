import React, { useEffect, useState } from "react";
import './history-style.css'
import axios from "axios";
import TransactionCell from "../transaction/TransactionCell";



const HistoryItem = ({isActive}) => {

	
	let [historyData, setHistoryData] = useState([" "])
	
	useEffect(() => {
		axios.post('http://localhost:3001/history', {
		  data: JSON.parse(window.localStorage.getItem('userData'))
		}).then(res => {
		  setHistoryData(res.data)
		})
	}, [isActive])

	const formatDate = (dateString) => {
		const date = new Date(dateString)
		const day = String(date.getDate()).padStart(2, '0')      
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = date.getFullYear();                           
	  
		return `${day}.${month}.${year}`
	};

	const deleteRecord = (el) =>{
		axios.post('http://localhost:3001/delete-record', {
			userID: el.user_id,
			transactionID: el.id
		}).then((res) =>{ 
			axios.post('http://localhost:3001/history', {
				data: JSON.parse(window.localStorage.getItem('userData'))
			}).then(res => {
				setHistoryData(res.data)
			})
		})
	}
	  

    return(
        <tbody>
			<TransactionCell el={historyData} deleteRecord={(el) => deleteRecord(el)} formatDate={(date) => formatDate(date)}/>
		</tbody>
    )

} 
export default HistoryItem