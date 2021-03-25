import React from 'react';
import axios from 'axios';

function ResetPass(){
	var email;
	const storage = require('../tokenStorage.js');
	const bp = require('./bp.js');

	const doReset = async event => {
		event.preventDefault();
		
		var obj = { Email: email.value };
		var js = JSON.stringify(obj);
		try {
			var config = {
				method: 'post',
				url: bp.buildPath('api/sendreset'),
				headers: {
					'Content-Type': 'application/json'

				},
				data: js

			};

			axios(config)
			.then(function (response) {
				var res = response.data;

				if(!res.error){
					storage.storeToken(res);
					window.location.href = '/';

				}
			})
			.catch(function (error){
				console.log(error);

			});


		}catch (e) {
			alert(e.toString());
			return;
		
		}

	};

	return(
		<div id="loginDiv">
			<span id="inner-title">Reset Password</span><br />
			<input type="text" id="email" placeholder="email" ref={(c) => email = c}  /><br />
			<input type="submit" id="loginButton" class="buttons" value = "Do It" onClick={doReset} />

		</div>
	);

};

export default ResetPass;