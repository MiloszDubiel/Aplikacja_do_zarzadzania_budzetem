import React from "react";
import './transaction-style.css'


const Transaction = () =>{
    const userData = JSON.parse(window.localStorage.getItem("userData"))
	const isLogged = window.localStorage.getItem("isLogged")

    const content = (isLogged == null || isLogged == "0" ? "" :
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
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<p>John Doe</p>
								</td>
								<td>01-10-2024</td>
								<td><span className="status incom">Przychody</span></td>
								<td>Wypłata</td>
								<td>2500 zł</td>
							</tr>
							<tr>
								<td>
									<p>John Doe</p>
								</td>
								<td>02-10-2024</td>
								<td><span className="status spend">Wydatki</span></td>
								<td>Karma dla kota</td>
								<td>70 zł</td>
							</tr>
						</tbody>
					</table>
				</div>
					<div className="add-transaction">
                        <div className="head">
                            <h3 >Dodaj transakcje</h3>
                        </div>
					</div>
				</div>
		</main>
	</section>) 



    return(<>
        {content}    
    </>)
}

export default Transaction