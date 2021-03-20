require('express');
require('mongodb');
const md5 = require('md5');

const jwt = require('../createJWT');
const User = require('../models/Users.js');


exports.setApp = function (app, client) {
	app.post('/api/register', async (req, res, next) => {
		let { Login, Password, FirstName, LastName } = req.body;

		Password = md5(Password);

		var error = '';

		const newUser = new User({ Login: Login, Password: Password, FirstName: FirstName, LastName: LastName });
		
		const results = await User.find({ Login: Login });

		if(results.length > 0) {
			error = 'User already exists.';

		}else {
			try{
				newUser.save();
	
			} catch (e) {
				error = e.message;
				console.log(e.message);
	
			}
		}

		var ret = { error: error };
		res.status(200).json(ret);
		



	});

}