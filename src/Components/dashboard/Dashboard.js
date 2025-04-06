import React from "react";
import './dashboard-style.css'

const Dashboard = () =>{
    return(
    <>
	<section id="content">
		<main>
			<div class="head-title">
				<div class="left">
					<h1>Dashboard</h1>
					<ul class="breadcrumb">
						<li>
							<a href="#">Dashboard</a>
						</li>
						<li><i class='bx bx-chevron-right' ></i></li>
					</ul>
				</div>
				<a href="#" class="btn-download">
					<i class='bx bxs-cloud-download' ></i>
					<span class="text">Pobierz w PDF</span>
				</a>
			</div>

			<ul class="box-info">
				<li>
					<i class='bx bxs-calendar-check' ></i>
					<span class="text">
						<h3>Stan konta</h3>
						<p>2300 zł</p>
					</span>
				</li>
				<li>
					<i class='bx bxs-group' ></i>
					<span class="text">
						<h3>Wydatki</h3>
						<p>1000 zł</p>
					</span>
				</li>
				<li>
					<i class='bx bxs-dollar-circle' ></i>
					<span class="text">
						<h3>Przychody</h3>
						<p>2000 zł</p>
					</span>
				</li>
			</ul>


			<div class="table-data">
				<div class="order">
					<div class="head">
						<h3>Histora</h3>
						<i class='bx bx-search' ></i>
						<i class='bx bx-filter' ></i>
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
								<td><span class="status incom">Przychody</span></td>
								<td>Wypłata</td>
								<td>2500 zł</td>
							</tr>
							<tr>
								<td>
									<p>John Doe</p>
								</td>
								<td>02-10-2024</td>
								<td><span class="status spend">Wydatki</span></td>
								<td>Karma dla kota</td>
								<td>70 zł</td>
							</tr>
						</tbody>
					</table>
				</div>
					<div class="profile-card">
						<div class="image">
							<img src="images/profile.jpg" alt="" class="profile-pic"/>
						</div>
						<div class="data">
							<h2>Miłosz Dubiel</h2>
						</div>
						<div class="row">
							<div class="info">
								<h3>Following</h3>
								<span>120</span>
							</div>
							<div class="info">
								<h3>Followers</h3>
								<span>5000</span>
							</div>
							<div class="info">
								<h3>Posats</h3>
								<span>209</span>
							</div>
						</div>
						<div class="buttons">
							<a href="#" class="btn">Zmień email</a>
							<a href="#" class="btn">Zmień hasło</a>
						</div>
					</div>
				</div>
		</main>
	</section>
    </>)
}

export default Dashboard