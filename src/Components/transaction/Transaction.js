import React, { useDebugValue, useEffect, useRef, useState} from "react";
import './transaction-style.css'
import ForbiddenContent from "../forbidden/Forbedden";
import HistoryItem from "../histroy/HistoryItem";
import { IoMdAdd } from "react-icons/io";
import axios from "axios";
import { useNavigate } from 'react-router-dom'


const Transaction = () =>{
    const userData = JSON.parse(window.localStorage.getItem("userData"))
	const isLogged = window.localStorage.getItem("isLogged")

    
	const categoryInput = useRef(null)
	const dateInput = useRef(null)
	const typeInput = useRef(null)
	const descInput = useRef(null)
	const costInput = useRef(null)

	let [isActive, setIsActive] = useState(false)

	useEffect(()=>{
		setIsActive(false)
		setCurrentDate()

	})


	const setCurrentDate = () =>{
		const date = new Date()
		const day = String(date.getDate()).padStart(2, '0')      
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const year = date.getFullYear();                           
	  

		dateInput.current.value =  `${year}-${month}-${day}`
	}

	const handleAddingRecord = () => {
		const category = categoryInput.current.value.trim()
		const date = dateInput.current.value.trim()
		const type = typeInput.current.value.trim()
		const description = descInput.current.value.trim()
		const cost = costInput.current.value.trim()

		if(!date.length || !description.length || !cost.length || isNaN(cost))
			alert("Niepoprawne dane")
		else{
			axios.post('http://localhost:3001/insert-record', {
				userData: userData,
				category,
				date,
				type,
				description,
				cost
			})	
			setIsActive(true)
		}
			
	}
	
	const content = (isLogged == null || isLogged == "0" ?  <ForbiddenContent/> :
        <section id="content">
		<main>
			<div className="head-title">
				<div className="left">
					<h1>Transakcje</h1>
					<ul className="breadcrumb">
						<li><i className='bx bx-chevron-right' ></i></li>
					</ul>
				</div>
			</div>
			<div className="transactions">
				<div className="order">
					<div className="head">
						<h3>Histora</h3>
                        <span>Sortuj po:</span>
                        <select className="btn-select">
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
								<th>Kategoria</th>
								<th>Data transakcji</th>
								<th>Typ</th>
								<th>Opis</th>
								<th>Kwota</th>
								<th>Akcja</th>
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
									<input type="date" ref={dateInput} />
								</th>
								<th>
									<select ref={typeInput}>
										<option value="Przychody">Przychody</option>
										<option value="Wydatki">Wydatki</option>
									</select>
								</th>
								<th>
									<input type="text" ref={descInput}/>
								</th>
								<th>
									<input type="number" ref={costInput}/>
								</th>
								<th><button className="add-record" onClick={handleAddingRecord}><IoMdAdd /></button></th>
							</tr>
						</thead>
						<HistoryItem isActive={isActive}/>
					</table>
				</div>
				</div>
		</main>
	</section>) 

    return(<>
        {content}    
    </>)
}

export default Transaction