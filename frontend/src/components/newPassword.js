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
		
<div style={{ margin: "auto", padding: 10, marginTop: "3%" }}>
		

		<div className="container my-container mt-5">

			<div className="row my-row justify-content-center align-items-center mx-auto" style={{ height: 110 }} >
				<div className="col-md-6 col-sm-6 my-col">
					<h4 className="text-center" style={{ fontFamily: 'Bungee', fontSize: 25 }}>New Password</h4>
				</div>
			</div>
			
			<div className="row my-row justify-content-center align-items-center mx-auto" >
				<div className="col-md-8 col-sm-6 my-col">
					<div className="form-group">
						<input type="password" className="form-control" placeholder="password "ref={(c) => password = c} />


					</div>
				</div>

			</div>
			
			<div className="row my-row justify-content-center align-items-center mx-auto">
				<div className="col-4 col my-col">
					<Button variant="secondary" onClick={resetPassword} size="lg" block>Reset</Button>
				</div>


			</div>
			





		</div>

	</div>
	);

};

export default newPassword;