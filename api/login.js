require('express');
require('mongodb');
require("dotenv").config();
const bcrypt = require('bcrypt');

const jwt = require('../createJWT');
const User = require('../models/Users.js');

exports.setApp = function (app, client) {


	app.post('/api/login', async (req, res, next) => {

		var error = '';

		//get incoming json data
		let { Login, Password } = req.body;

		//get list of users with same login
		const results = await User.find({ Login: Login });
		let id = -1;
		let firstName = '';
		let lastName = '';


		//if there is a user with the same login, check password match
		if (results.length > 0) {
			const match = await bcrypt.compare(Password, results[0].Password);

			//if a match create token
			console.log(match);
			if (match) {
				console.log(match);
				id = results[0].UserId;
				firstName = results[0].FirstName;
				lastName = results[0].LastName;

				try {
					var ret = jwt.createToken(firstName, lastName, id);
					res.status(200).json(ret);
					return;
				} catch (e) {
					error = e.message;

				}	
			}
		}

		//otherwise return an error
		var ret = { error: 'username/password is incorrect' };
		res.status(200).json(ret);

	});


}
