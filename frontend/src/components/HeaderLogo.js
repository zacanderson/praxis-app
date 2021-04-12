import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';

function HeaderLogo() {


    function openNav() {
        document.getElementById("mySidenav").style.width = "200px";
      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      }


    const styles = {

        backgroundColor: "#797B84",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 100,
        height: 43,
        marginBottom: 100

    }



    const goDashboard = async event => {
		event.preventDefault();
		window.location.href = '/Dashboard';
    }
    
    const goHabits = async event => {
		event.preventDefault();
		window.location.href = '/Habits';
    }
    
    const goCalendar = async event => {
		event.preventDefault();
		window.location.href = '/Calendar';
    }
    
    const goStats = async event => {
		event.preventDefault();
		window.location.href = '/Stats';
	}
    return (
        <div>
            <div id="mySidenav" class="sidenav">
                <h3 className="closebtn" onClick={closeNav}>&times;</h3>
                <div style={{ borderTop: "2px solid black ", marginLeft: "0%", marginRight: "0%" }}></div>

                <div style={{height:40, textAlign:"center"}} id="navOption1" onClick={goDashboard}>
                <h5 style={{marginTop:11}}>Dashboard</h5>
                </div>
                <div style={{ borderTop: "2px solid black ", marginLeft: "0%", marginRight: "0%" }}></div>

                <div style={{height:40, textAlign:"center"}} id="navOption2">
                <h5 style={{marginTop:11}}>Habits</h5>
                </div>
                <div style={{ borderTop: "2px solid black ", marginLeft: "0%", marginRight: "0%" }}></div>

                <div style={{height:40, textAlign:"center"}} onClick={goCalendar} id="navOption3">
                <h5 style={{marginTop:11}}>Calendar</h5>
                </div>
                <div style={{ borderTop: "2px solid black ", marginLeft: "0%", marginRight: "0%" }}></div>

                <div style={{height:40, textAlign:"center"}} id="navOption4">
                <h5 style={{marginTop:11}}>Statistics</h5>
                </div>
                <div style={{ borderTop: "2px solid black ", marginLeft: "0%", marginRight: "0%" }}></div>

                
            </div>
            <div className="container-fluid my-row3 " style={styles}>
                <div className="row">
                <span style={{fontSize:30, cursor:"pointer"}} onClick={openNav}>&#9776;</span>
                </div>
            </div>


        </div>




    )
}



export default HeaderLogo;