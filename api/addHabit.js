
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

	app.post('/api/addHabit', async (req, res, next) => {

		var error = '';
		let ret = {};
		//get habit name
		const { accessToken, habitName, description, occurence, currentDate, color, icon, timesPerOccurence } = req.body;
		
		if(jwt.isExpired(accessToken)){
			error = 'Acess token has expired, log back in';
		
		// making sure required fields are filled out
		}else if(!accessToken || !habitName || !occurence || !currentDate || !color || !icon || !timesPerOccurence) {
			error = 'Not all required fields are properly filled out';
			
		} else {
			let userData = webT.decode(accessToken, { complete: true });
			let userID = userData.payload.userID;

			// create new habit object
			const HabitID = mongo.ObjectID();
			const newHabit = new Habit(habitName, description, occurence, currentDate, HabitID, timesPerOccurence, color, icon);

			await Users.updateOne({ _id: ObjectId(userID) }, { $push: { Habits: newHabit } });
			ret = jwt.refreshToken(accessToken);
		}
		/*
		try {
			let userData = webT.decode(accessToken, { complete: true });
			let userID = userData.payload.userID;
			await Users.updateOne({ _id: ObjectId(userID) }, { $push: { Habits: { HabitName : habit, Streak : streakNum, Description : descriptionofHabit, Occurence : occurence, StartTime : startTime } } });
			ret = jwt.refreshToken(accessToken);
		} catch (e) {
			error = e.message;
			ret.error = error;

		}	
		*/
		ret.error = error;
		res.status(200).json(ret);

	});
}

 