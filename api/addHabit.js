
require('express');
require('mongodb');
require('dotenv').config();
const Users = require('../models/Users.js');
const ObjectId = require('mongodb').ObjectID;
const webT = require('jsonwebtoken');
const jwt = require("../createJWT");
exports.setApp = function (app, client) 
{

	app.post('/api/addHabit', async (req, res, next) => {

		var error = '';

		//get habit name
		const {habit, accessToken, userID} = req.body;	

		if(jwt.isExpired(accessToken)){
			error = 'Acess token has expired, log back in';
		}else{
				let userData = webT.decode(accessToken, { complete: true });
				let userID = userData.payload.userID;
				await Users.updateOne({ _id: ObjectId(userID) }, { $push: { Habits: habit} });
				ret = jwt.refreshToken(accessToken);
		}
		ret.error = error;
		res.status(200).json(ret);

	});
}

 