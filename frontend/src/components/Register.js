import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';


function Register() {

	const storage = require('../tokenStorage.js');
	const bp = require('./bp.js');

	var loginName;
	var loginPassword;
	var fName;
	var lName;
	var email;

	const [message, setMessage] = useState('');

	const doRegister = async event => {
		event.preventDefault();

		var obj = { Login: loginName.value, Password: loginPassword.value, FirstName: fName.value, LastName: lName.value, Email: email.value };
		var js = JSON.stringify(obj);

		try {
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

					if (res.error) {
						setMessage('User already exists.');

					} else {
						storage.storeToken(res);
						window.location.href = './';
					}

				})
				.catch(function (error) {
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

	return (
		<div id="loginDiv">
			{/* <form onSubmit={doRegister}>
				<span id="inner-title">PLEASE REGISTER</span><br />
				<input type="text" id="firstName" placeholder="First Name" ref={(c) => fName = c} /><br />
				<input type="text" id="lastName" placeholder="Last Name" ref={(c) => lName = c} /><br />
				<input type="text" id="email" placeholder="Email" ref={(c) => email = c} /><br />
				<input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
				<input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
				<input type="submit" id="registerButton" class="buttons" value="Register" onClick={doRegister} />
				<input type="submit" id="loginPageButton" class="buttons" value="Login" onClick={login} />
			</form>
			<span id="registerResult">{message}</span> */}






			<div className="container my-container mt-5">

				<div className="row my-row justify-content-center align-items-center mx-auto" style={{ height: 160 }} >
					<div className="col-md-6 col-sm-6 my-col">
						<h4 className="text-center">Register to Get Started!</h4>
					</div>
				</div>
				
				<div className="row my-row justify-content-center align-items-center mx-auto" >
					<div className="col-md-8 col-sm-6 my-col">
						<div className="form-group">
							<input type="text" className="form-control" placeholder="First Name " ref={(c) => fName = c} />


						</div>
					</div>

				</div>
				<div className="row my-row justify-content-center align-items-center mx-auto" >
					<div className="col-md-8 col-sm-6 my-col">
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Last Name " ref={(c) => lName = c} />


						</div>
					</div>

				</div>
				<div className="row my-row justify-content-center align-items-center mx-auto" >
					<div className="col-md-8 col-sm-6 my-col">
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Email " ref={(c) => email = c} />


						</div>
					</div>

				</div>
				<div className="row my-row justify-content-center align-items-center mx-auto" >
					<div className="col-md-8 col-sm-6 my-col">
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Username " ref={(c) => loginName = c} />


						</div>
					</div>

				</div>
				<div className="row my-row justify-content-center align-items-center mx-auto">
					<div className="col-md-8 col-sm-6 my-col">
						<div className="form-group">

							<input type="password" className="form-control" placeholder="Password" ref={(c) => loginPassword = c} />

						</div>
					</div>

				</div>
				<div className="row my-row justify-content-center align-items-center mx-auto">
					<div className="col-4 col my-col">
						<Button variant="secondary" onClick={doRegister} size="lg" block>Register</Button>
					</div>


				</div>
				<div className="row my-row justify-content-center align-items-end mx-auto" style={{ height: 70 }} >
					<div className="col-md-6 col-sm-6 my-col">
						<h6 className="text-center" onClick={login}><a>Have an Account? Login Here</a></h6>
					</div>

					

				</div>
				<div className="row my-row justify-content-center align-items-start mx-auto" style={{ height: 40 }} >
					<div className="col-md-6 col-sm-6 my-col">
						<h6 className="text-center" onClick={login}><a>Need Help? Click Here</a></h6>
					</div>

				</div>





			</div>

		</div>


		

	);
};

export default Register;