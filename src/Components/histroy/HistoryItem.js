import React, { useEffect, useState } from "react";
import './history-style.css'
import axios from "axios";
import { IoIosRemove } from "react-icons/io";


const HistoryItem = () => {

	
	let [historyData, setHistoryData] = useState([" "])

	useEffect(() => {
		axios.post('http://localhost:3001/history', {
		  data: JSON.parse(window.localStorage.getItem('userData'))
		}).then(res => {
		  setHistoryData(res.data)
		})
	}, [])






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
	  


	const tableData = typeof historyData.map != 'function' 
		?<td colSpan={6} style={{textAlign: "center"}}>
				<span>Brak transackji</span>
		</td> 
		: historyData.map(el =>{
		return (
			<tr>
				<td>
					<p>{el.name}</p>
				</td>
				<td>{formatDate(el.transaction_date)}</td>
				<td>
					{el.type == "Wydatki" ? <span className="status spend">{el.type}</span>	: <span className="status incom">{el.type}</span>	}
				</td>
				<td>{el.description}</td>
				<td>{el.amount}zł</td>
			    <td><button className="delete-record" onClick={()=> deleteRecord(el)}><IoIosRemove /></button></td>
			</tr>
		)
	})



    return(
        <tbody>
			{tableData}
		</tbody>
    )

} 
export default HistoryItem