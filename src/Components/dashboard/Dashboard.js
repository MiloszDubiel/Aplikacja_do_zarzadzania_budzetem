import React, { use } from "react";
import './dashboard-style.css'
import ForbiddenContent from "../forbidden/Forbedden";


const Dashboard = () =>{
	const userData = JSON.parse(window.localStorage.getItem("userData"))
	const isLogged = window.localStorage.getItem("isLogged")

	const content = (isLogged == null || isLogged == "0" ? <ForbiddenContent/> : <section id="content">
		<main>
			<div className="head-title">
				<div className="left">
					<h1>Dashboard</h1>
					<ul className="breadcrumb">
						<li>
							<a href="#">Dashboard</a>
						</li>
						<li><i className='bx bx-chevron-right' ></i></li>
					</ul>
				</div>
				<a href="#" className="btn-download">
					<i className='bx bxs-cloud-download' ></i>
					<span className="text">Pobierz w PDF</span>
				</a>
			</div>

			<ul className="box-info">
				<li>
					<i className='bx bxs-calendar-check' ></i>
					<span className="text">
						<h3>Stan konta</h3>
						<p>2300 zł</p>
					</span>
				</li>
				<li>
					<i className='bx bxs-group' ></i>
					<span className="text">
						<h3>Wydatki</h3>
						<p>1000 zł</p>
					</span>
				</li>
				<li>
					<i className='bx bxs-dollar-circle' ></i>
					<span className="text">
						<h3>Przychody</h3>
						<p>2000 zł</p>
					</span>
				</li>
			</ul>


			<div className="table-data">
				<div className="order">
					<div className="head">
						<h3>Histora</h3>
						<i className='bx bx-search' ></i>
						<i className='bx bx-filter' ></i>
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
					<div className="profile-card">
						<div className="image">
							<img src="images/profile.jpg" alt="" className="profile-pic"/>
						</div>
						<div className="data">
							<h2>Miłosz Dubiel</h2>
						</div>
						<div className="row">
							<div className="user-info">
								<h3>Email:</h3>
								<span>{userData.data[0].email}</span>
							</div>
							<div className="user-info">
								<h3>Data dołączenia: </h3>
								<span>{ userData == null ? "" : userData.data[0].created_at.substring(0, userData.data[0].created_at.indexOf('T')) }</span>
							</div>
			
						</div>
						<div className="buttons">
							<a href="#" className="btn">Zmień email</a>
							<a href="#" className="btn">Zmień hasło</a>
						</div>
					</div>
				</div>
		</main>
	</section>)

	

    return(<>
		{content}
    </>)
}

export default Dashboard