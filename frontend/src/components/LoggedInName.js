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
   <div id="loggedInDiv">
   <span id="userName">Logged In As {firstName} {lastName}</span><br />
   <button type="button" id="logoutButton" class="buttons" 
     onClick={doLogout}> Log Out </button>
   </div>
  );
  
};

export default LoggedInName;
