import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';

function SideBar () {


    const styles= {
       
            backgroundColor: "#797B84",
            position:"fixed",
            top:0,
            width:75,
            zIndex:100,
            height:"100%",
            marginBottom:100

    }
    return (
        <div className="container-fluid my-row3 " style={styles}>
            <div className="row"></div>
        </div>




        
    )
}



export default SideBar;