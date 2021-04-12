import React from 'react';
import LoggedInName from '../components/LoggedInName';
import HabitsList from '../components/HabitsList';
import HeaderLogo from '../components/HeaderLogo';
import BarChart from '../components/BarChart';
import SideBar from '../components/SideBar'
import Calendar from '../components/Calendar'

const LoggedInPage = () => {




	let date = new Date();

    var months = [
        "January", "February", "March", "April", "May", 
        "June", "July", "August", "September", "October", 
        "November", "December"
	];
	
	const goCalendar = async event => {
		event.preventDefault();
		window.location.href = '/Calendar';
    }


	console.log(date)
	return (
		<div>
			
			
			
			<div className="container" style={{marginTop: 100}}>
				<div className="row">
					<div className="col">
						<h6 style={{ fontFamily: 'Bungee', fontSize: 25, marginLeft: "0%" }}>Habits</h6>
						<div style={{ borderTop: "2px solid black ", marginLeft: "0%", marginRight: "0%" }}></div>

					</div>
				</div>
				{/*<LoggedInName />*/}

				<div className="row justify-content-center" style={{marginBottom:100}}>
					<div clasName="col">
					<HabitsList />
					<div style={{ borderTop: "2px solid black ", marginLeft: "0%", marginRight: "0%", marginTop:100 }}></div>

					</div>
				</div>
				
				<div className="row justify-content-around align-items-center">
					<div clasName="col-md-6 col-lg-9" style={{border: "10px solid #BAA1A7 ", borderRadius:100, padding:30, marginLeft:0}}>
					<BarChart />
					</div>
					<div clasName="col-md-12" align="center" style={{textAlignment:"center"}}>
						<div style={{width:"70%", height:"100%"}}>
							<h6 style={{ fontFamily: 'Bungee', fontSize: 25, marginLeft: "0%" }}>Check your Stats</h6>
						</div>
						
					</div>
					
				</div>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>

				
				<div className="row justify-content-around align-items-center" style={{marginBottom:60}}>
				
					<div clasName="col-md-6 col-lg-9" style={{border: "10px solid #BAA1A7 ", borderRadius:100, padding:30, marginLeft:0, width:620, height:470,
				 textAlign:"center",fontSize: 30, fontFamily: "'Bungee', sans-serif", cursor:"pointer"}} onClick={goCalendar}>
						<div>
					<h3>{months[date.getMonth()]}</h3>
					<Calendar />
						</div>
					</div>
					<div clasName="col-md-12" align="center" style={{textAlignment:"center"}}>
						<div style={{width:"70%", height:"100%"}}>
							<h6 style={{ fontFamily: 'Bungee', fontSize: 25, marginLeft: "0%" }}>Check your Calendar</h6>
						</div>
						
					</div>
					
					
				</div>
				
			</div>
			
			

		</div>

	);


}

export default LoggedInPage;