
require('express');
require('mongodb');
require('dotenv').config();
const mongo = require('mongodb');
const Users = require('../models/Users.js');
const Habit = require('../models/HabitClass.js');
const ObjectId = require('mongodb').ObjectID;
const webT = require('jsonwebtoken');
const jwt = require("../createJWT");
exports.setApp = function (app, client) 
{

	app.post('/api/undoCheckin', async (req, res, next) => {
		
		var error = '';
		//get habit name
		const { accessToken, habitID } = req.body;

		if(jwt.isExpired(accessToken)){
			error = 'Access token is expired, please log back in';

		} else {
			const userData = webT.decode(accessToken, { complete: true });
			const userID = userData.payload.userID;

			const results = await Users.find({ _id: ObjectId(userID), "Habits._id": ObjectId(habitID)});

			if(results.length > 0) {
				await Users.updateOne({ _id: ObjectId(userID), "Habits._id": ObjectId(habitID)}, { $pop: {"Habits.$.Checkins": 1}})

			}
		}


		let ret = jwt.refreshToken(accessToken);
		ret.error = error;
		res.status(200).json(ret);

	});
}

 