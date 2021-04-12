import React from 'react'
import XMark from '../images/x-mark.png'

function Calendar (props) {

    var d = new Date();

    var months = [
        "January", "February", "March", "April", "May", 
        "June", "July", "August", "September", "October", 
        "November", "December"
    ];
    
    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }

    var days = [];

    const dayStyle = {
        border: "1px solid black",
        textAlign: "center",
        paddingTop: 5,
        fontSize: 12,
        cursor: "pointer"

    }

    const CalendarStyle = {
      display: "grid",
      gridTemplateColumns:"repeat(7, 1fr)",
      gridTemplateRows:"repeat(5, 1fr)",
      height:"100%"



    }
   

    for (var i = 1; i <= daysInMonth(d.getMonth(), d.getFullYear()); i++) {
        days.push(<div style={dayStyle} id={"day" + i}>
            
            {i}
<br></br>
            {i <= d.getDate() ? <img src={XMark} alt="x" style={{height:40}}/>: <></>}
          
        
        </div>)

        
    }

    



    return(

        <div style={CalendarStyle}>
            {days}
            
        </div>
      
       
    )
}

export default Calendar