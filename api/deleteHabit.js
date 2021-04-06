require('express');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectID;
const Users = require('../models/Users');
const webT = require('jsonwebtoken');
const jwt = require('../createJWT');

exports.setApp = function (app, client) {

	app.post('/api/deleteHabit', async (req, res, next) => {

		var error = '';

		// get request data
		const { accessToken, habitID } = req.body;
		let userData = webT.decode(accessToken, { complete: true });
		let userID = userData.payload.userID;
		
		// check to see if access token is expired
		if(jwt.isExpired(accessToken)) {
			error = 'Access token has expired, please log back in.';

		}else {
			// otherwise remove the habit	
			await Users.updateOne( { _id: ObjectId(userID) }, { $pull: { Habits: { _id: ObjectId(habitID)} } });

		}

		// refresh and return token
		let ret = jwt.refreshToken(accessToken);
		ret.error = error;

		res.status(200).json(ret);

	});
}

 