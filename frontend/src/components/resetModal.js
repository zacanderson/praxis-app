import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Button';
import IconsArr from './Icons';
import axios from 'axios';

function resetModal () {

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
				url: bp.buildPath('api/sendverification'),
				headers: {
					'Content-Type': 'application/json'

				},
				data: js

			};

			axios(config)
			.then(function (response) {
				var res = response.data;
                alert("Verification Resent!");

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
    return (

   
<div style={{ margin: "auto", padding: 10, marginTop: "3%" }}>
		

			<div className="container my-container mt-5">

				<div className="row my-row justify-content-center align-items-center mx-auto" style={{ height: 110 }} >
					<div className="col-md-6 col-sm-6 my-col">
						<h4 className="text-center" style={{ fontFamily: 'Bungee', fontSize: 25 }}>Reset Password</h4>
					</div>
				</div>
				
				<div className="row my-row justify-content-center align-items-center mx-auto" >
					<div className="col-md-8 col-sm-6 my-col">
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Email "ref={(c) => email = c} />


						</div>
					</div>

				</div>
				
				<div className="row my-row justify-content-center align-items-center mx-auto">
					<div className="col-4 col my-col">
						<Button variant="secondary" onClick={doReset} size="lg" block>Reset</Button>
					</div>


				</div>
				





			</div>

		</div>
	 
    )
}

export default resetModal