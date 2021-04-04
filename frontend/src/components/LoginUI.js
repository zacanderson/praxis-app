import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import RegisterModal from './RegisterModal';



function Login() {

	const storage = require('../tokenStorage.js');

	const bp = require('./bp.js');

	var loginName;
	var loginPassword;

	const [message, setMessage] = useState('');
	const [modalShow, setModalShow] = useState(false);

	const doLogin = async event => {
		event.preventDefault();

		var obj = { Login: loginName.value, Password: loginPassword.value };
		var js = JSON.stringify(obj);

		try {
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

					if (res.error) {
						setMessage('User/Password combination incorrect');

					} else {
						storage.storeToken(res);
						window.location.href = './Dashboard';
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

	const resetPass = async event => {
		event.preventDefault();
		window.location.href = '/SendReset';
	}
	const register = async event => {
		event.preventDefault();
		window.location.href = '/Register';
	}

	return (
		<div>
			{/* <div id="loginDiv" className="Login">
				<form onSubmit={doLogin}>
					<span id="inner-title">PLEASE LOG IN</span><br />
					<input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
					<input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
					<input type="submit" id="loginButton" className="buttons" value="Do It" onClick={doLogin} />
					<input type="submit" id="resetPassword" class="buttons" value="Reset Password" onClick={resetPass} />
					<input type="submit" id="resetPassword" class="buttons" value="Register" onClick={register} />
					<Button>Test Button</Button>
				</form>
				<span id="loginResult">{message}</span>
			</div> */}

			<div className="container my-container mt-5">

				<div className="row my-row justify-content-center align-items-center mx-auto" style={{ height: 160 }} >
					<div className="col-md-6 col-sm-6 my-col">
						<h4 className="text-center">Login to Get Started!</h4>
					</div>
				</div>
				<div className="row my-row mx-auto"></div>
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
						<Button variant="secondary" onClick={doLogin} size="lg" block>Login</Button>
					</div>


				</div>
				<div className="row my-row justify-content-center align-items-end mx-auto" style={{ height: 70 }} >
					<div className="col-md-6 col-sm-6 my-col">
						<h6 className="text-center" onClick={register}><a>New User? Register Here</a></h6>
					</div>

					{/* <RegisterModal
						show={modalShow}
						onHide={() => setModalShow(false)}
					/> */}

				</div>
				<div className="row my-row justify-content-center align-items-start mx-auto" >
					<div className="col-md-6 col-sm-6 my-col">
						<h6 className="text-center" onClick={resetPass}><a>Need Help? Click Here</a></h6>
					</div>

				</div>





			</div>

		</div>

	);
};

export default Login;