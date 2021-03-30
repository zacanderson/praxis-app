require('express');
require('mongodb');
require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('../createJWT');
const sendMail = require('./Verification/Send/SendVerificationEmail.js');
const User = require('../models/Users.js');


exports.setApp = function (app, client) {
	app.post('/api/register', async (req, res, next) => {
		//get incoming json data
		let { Login, Password, FirstName, LastName, Email} = req.body;

		var ret = {};
		var error = '';

		//check to see if a user already exists with the username
		

		const results = await User.find({$or: [{ Login: Login }, { Email: Email } ]});
		if(results.length > 0) {
			error = 'User already exists.';
			res.status(200).json( {error: error });
			return;
			
		}else {
			//use bcrypt to hash
			const hash = await bcrypt.hash(Password, Number(process.env.SALT_ROUNDS));
			const newUser = new User({ Login: Login, Password: hash, Email: Email, FirstName: FirstName, LastName: LastName });

			//im new to promises so this may not be correctly used but it works
			const newPromise = new Promise(function (resolve, reject) {
				try {
					//save user to database
					newUser.save(function (err, savedUser) {
						//create token and return it to client
						sendMail.sendVMail(savedUser._id, Email);
						ret = { error: '' };
						resolve(ret);
					});
	
					
					
				} catch (e) {
					error = e.message;
					console.log(e.message);
					var ret = { error: error };
					reject(ret);
				}
			});

			newPromise.then( function (ret) {
				res.status(200).json(ret);
	
			}).catch( function (ret) {
				res.status(200).json(ret);
	
			});

		}
		
	});

}