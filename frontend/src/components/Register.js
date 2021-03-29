import React, { useState } from 'react';
import axios from 'axios';

function Register(){

	const storage = require('../tokenStorage.js');
	const bp = require('./bp.js');

	var loginName;
	var loginPassword;
    var fName;
    var lName;
    var email;

   	const [message,setMessage] = useState('');

	const doRegister = async event => {
		event.preventDefault();

		var obj = { Login: loginName.value, Password: loginPassword.value,  FirstName: fName.value, LastName: lName.value, Email: email.value};
		var js = JSON.stringify(obj);

		try{
			var config = {
				method: 'post',
				url: bp.buildPath('api/register'),
				headers: {
					'Content-Type': 'application/json'

				},
				data: js

			};

			axios(config)
			.then(function (response) {
				var res = response.data;

				if(res.error){
					setMessage('User already exists.');

				}else{
					storage.storeToken(res);
					window.location.href = './';
				}

			})
			.catch(function (error){
				setMessage(error);

			});


		} catch (e) {
			alert(e.toString());
			return;
		
		}
	};

	
	const login = async event => {
		event.preventDefault();
		window.location.href = '/';
	}

	return(
		<div id="registerDiv">
			<form onSubmit={doRegister}>
			<span id="inner-title">PLEASE REGISTER</span><br />
            <input type="text" id="firstName" placeholder="First Name"  ref={(c) => fName = c} /><br />
			<input type="text" id="lastName" placeholder="Last Name"  ref={(c) => lName = c} /><br />
			<input type="text" id="email" placeholder="Email"  ref={(c) => email = c} /><br />
			<input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c}  /><br />
			<input type="password" id="loginPassword" placeholder="Password"  ref={(c) => loginPassword = c} /><br />
			<input type="submit" id="registerButton" class="buttons" value = "Register" onClick={doRegister} />
			<input type="submit" id="loginPageButton" class="buttons" value = "Login" onClick={login} />
			</form>
			<span id="registerResult">{message}</span>
		</div>

	);
};

export default Register;