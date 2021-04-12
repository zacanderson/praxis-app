require("express");
require("mongodb");
const ObjectId = require('mongodb').ObjectID;
require("dotenv").config();

const webT = require('jsonwebtoken');

const jwt = require("../createJWT");
const Users = require("../models/Users");

function getNextDate(lastDate, occurence) {
	let date = new Date(lastDate);
	if(occurence == 'daily'){
		date.setHours(0);
		date.setDate(date.getDate() + 1);

	} else if(occurence == 'weekly'){
		date.setHours(0);
		date.setDate(date.getDate() + 7);

	}

	return date;
}

exports.setApp = function (app, client) {
  app.post("/api/checkIn", async (req, res, next) => {
    let error = "";


	const {accessToken, habitID, currDate, streak, longestStreak} = req.body;

	if(jwt.isExpired(accessToken)) {
		error = 'Access token is expired, please login back in';

	} else {
		//get access token data
		let userData = webT.decode(accessToken, { complete: true });
		let userID = userData.payload.userID;

		//check database for habit
		const habitInfo = await Users.find({ _id: ObjectId(userID), "Habits._id" :  ObjectId(habitID) }, {"Habits.$": 1} );
		if(habitInfo.length == 0) {
			error = 'No habit found with that id!';

		} else {

			const newCheckin = { Date: currDate, currStreak: streak, longestStreak: longestStreak };

			await Users.updateOne({_id: ObjectId(userID), "Habits._id" :  ObjectId(habitID)}, { $push: {"Habits.$.Checkins": newCheckin }});

		}

	}

	//refresh and return token
	let ret = jwt.refreshToken(accessToken);
    ret.error = error;

	//return response
	res.status(200).json(ret);

  });
};
