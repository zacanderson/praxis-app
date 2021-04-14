require("express");
require("mongodb");
const ObjectId = require('mongodb').ObjectID;
require("dotenv").config();

const webT = require('jsonwebtoken');

const jwt = require("../createJWT");
const Users = require("../models/Users");

exports.setApp = function (app, client) {
	app.post("/api/resetStreak", async (req, res, next) => {
	let error = "";


	const { accessToken, habitID } = req.body;

	if(jwt.isExpired(accessToken)) {
		error = 'Access token is expired, please login back in';

	} else {
		//get access token data
		let userData = webT.decode(accessToken, { complete: true });
		let userID = userData.payload.userID;

		//check database for habit
		const habitInfo = await Users.find({ _id: ObjectId(userID), "Habits._id" :  ObjectId(habitID) });
		console.log();
		if(habitInfo.length == 0) {
			error = 'No habit found with that id!';

		} else {

			const newCheckin = { Date: habitInfo[0].Habits[habitInfo[0].Habits.length - 1].Date, currStreak: 0, longestStreak: habitInfo[0].Habits[habitInfo[0].Habits.length - 1].longestStreak };
			await Users.updateOne({ _id: ObjectId(userID), "Habits._id": ObjectId(habitID)}, { $pop: {"Habits.$.Checkins": 1}})
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