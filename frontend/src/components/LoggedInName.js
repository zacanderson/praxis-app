import React from 'react';

function LoggedInName()
{

    const storage = require('../tokenStorage.js');  
    const jwt = require("jsonwebtoken");
    var tok = storage.retrieveToken();
    var ud = jwt.decode(tok,{complete:true});

    var userId = ud.payload.id;
    var firstName = ud.payload.firstName;
    var lastName = ud.payload.lastName;

    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = '/';

    };    

  return(
   <div className="container">
     <div className="row justify-content-center align-items-center mx-auto">
       <div className="col-6" style={{textAlign:"center"}}>
       <h3 style={{ fontFamily: 'Bungee', fontSize: 25 }}>Welcome {firstName} {lastName}</h3>
       </div>
       
     </div>
     <br></br>
     <br></br>
    
     <br></br>
     
  
   </div>
  );
  
};

export default LoggedInName;
