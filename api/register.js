require('express');
require('mongodb');

const jwt = require('../createJWT');
const User = require('../models/Users.js');


exports.setApp = function (app, client) {
	app.post('/api/register', async (req, res, next) => {
		const { Login, Password, FirstName, LastName } = req.body;

		var error = '';

		const newUser = new User({ Login: Login, Password: Password, FirstName: FirstName, LastName: LastName });


		try{
			newUser.save();

		} catch (e) {
			error = e.message;
			console.log(e.message);

		}

		var ret = { error: error };
		res.status(200).json(ret);
		



	});

}