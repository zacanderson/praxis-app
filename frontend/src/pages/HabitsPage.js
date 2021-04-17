import React from 'react';
import LoggedInName from '../components/LoggedInName';
import HabitsList from '../components/HabitsList';
import HeaderLogo from '../components/HeaderLogo';
import BarChart from '../components/BarChart';
import SideBar from '../components/SideBar'
import Calendar from '../components/Calendar'

const HabitsPage = () => {










    return (
        <div>



            <div className="container" style={{ marginTop: 100 }}>
                <div className="row">
                    <div className="col">
                        <h6 style={{ fontFamily: 'Bungee', fontSize: 25, marginLeft: "0%" }}>Habits</h6>
                        <div style={{ borderTop: "2px solid black ", marginLeft: "0%", marginRight: "0%" }}></div>

                    </div>
                </div>
                {/*<LoggedInName />*/}

                <div className="row justify-content-center" style={{ marginBottom: 100 }}>
                    <div className="col">
                        <HabitsList />
                       

                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    <div style={{ borderTop: "2px solid black ", marginLeft: "0%", marginRight: "0%", marginTop: 100 }}></div>
                    </div>
                </div>


            </div>
        </div>

    );


}

export default HabitsPage;