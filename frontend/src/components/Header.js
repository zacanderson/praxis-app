import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';

function Header() {


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

  const doLogout = event => {
    event.preventDefault();

    localStorage.removeItem("user_data")
    window.location.href = '/';

  };
  return (
    <div>
      
      <div className="container-fluid my-row3 " style={styles}>
        <div className="row justify-content-between align-items-center">
         
        </div>
      </div>


    </div>




  )
}



export default Header;