import React, { useState } from 'react';
import axios from 'axios';

function Login(){

	const storage = require('../tokenStorage.js');
	const bp = require('./bp.js');

	var loginName;
	var loginPassword;

   	const [message,setMessage] = useState('');

	const doLogin = async event => {
		event.preventDefault();

		var obj = { Login: loginName.value, Password: loginPassword.value };
		var js = JSON.stringify(obj);

		try{
			var config = {
				method: 'post',
				url: bp.buildPath('api/login'),
				headers: {
					'Content-Type': 'application/json'

				},
				data: js

			};

			axios(config)
			.then(function (response) {
				var res = response.data;

				if(res.error){
					setMessage('User/Password combination incorrect');

				}else{
					storage.storeToken(res);
					window.location.href = './Dashboard';
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

	return(
		<div id="loginDiv">
			<form onSubmit={doLogin}>
			<span id="inner-title">PLEASE LOG IN</span><br />
			<input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c}  /><br />
			<input type="password" id="loginPassword" placeholder="Password"  ref={(c) => loginPassword = c} /><br />
			<input type="submit" id="loginButton" class="buttons" value = "Do It" onClick={doLogin} />
			</form>
			<span id="loginResult">{message}</span>
		</div>

	);
};

export default Login;