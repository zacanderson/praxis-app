import React from 'react';
import LoggedInName from '../components/LoggedInName';
import HabitsList from '../components/HabitsList';
import HeaderLogo from '../components/HeaderLogo';

const LoggedInPage = () => {

	return (
		<div>
			<HeaderLogo />
			<div className="container-fluid" style={{marginTop: 100}}>
				<div className="row">
					<div className="col">
						<h6 style={{ fontFamily: 'Bungee', fontSize: 25, marginLeft: "17%" }}>Habits</h6>
						<div style={{ borderTop: "2px solid black ", marginLeft: "17%", marginRight: "17%" }}></div>

					</div>
				</div>
				{/*<LoggedInName />*/}

			</div>
			<HabitsList />

		</div>

	);


}

export default LoggedInPage;