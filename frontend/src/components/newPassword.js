import React from 'react';
import axios from 'axios';

function newPassword(){
	const url = require('url');

	const storage = require('../tokenStorage.js');
	const bp = require('./bp.js');
	var password;

	const resetPassword = async event => {
		event.preventDefault();
		
		const currURL = new URL(window.location.href);
		const searchParams = currURL.searchParams;

		var obj = { accessToken: searchParams.get('at'), UserID: searchParams.get('id'), Password: password.value };
		var js = JSON.stringify(obj);


		try{
			var config = {
				method: 'post',
				url: bp.buildPath('api/passwordreset'),
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


		} catch (e) {
			alert(e.toString());
			return;
		
		}
	}

	return(
		<div id="resetPass">
			<span id="inner-title">Reset Password</span><br />
			<input type="password" id="password" placeholder="password" ref={(c) => password = c}  /><br />
			<input type="submit" id="loginButton" class="buttons" value = "Do It" onClick={resetPassword} />

		</div>
	);

};

export default newPassword;