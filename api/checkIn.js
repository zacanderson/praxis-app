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
	let ret = {};

	const {accessToken, habitID, currDate} = req.body;

	if(jwt.isExpired(accessToken)) {
		error = 'Access token is expired, please login back in';

	} else {
		//get access token data
		let userData = webT.decode(accessToken, { complete: true });
		let userID = userData.payload.userID;

		//check database for habit
		const habitInfo = await Users.find({ _id: ObjectId(userID), "Habits._id": ObjectId(habitID)}, 'Habits');
		if(habitInfo.length == 0) {
			error = 'No habit found with that id!';

		} else {
			const lastCheckIn = new Date(habitInfo[0].Habits[0].LastCheckinDate);
			const currentDate = new Date(currDate);
			const nextValidCheckIn = getNextDate(lastCheckIn, habitInfo[0].Habits[0].Occurence)
			console.log(nextValidCheckIn.getDate());
			if(lastCheckIn.getDate() == currentDate.getDate()){
				error = 'You already checked in for today';

			} else if (currentDate.getDate() < nextValidCheckIn.getDate()){
				error = 'Please wait until your next check in!';

			} else if(currentDate.getDate() > nextValidCheckIn.getDate()){
				error = 'You broke your streak!';
				//set currStreak to one and set lastcheckindate to the current date

			} else {
				//increment streak counter and check to see if a new longest streak has been set
				if(habitInfo[0].Habits[0].CurrentStreak + 1 > habitInfo[0].Habits[0].LongestStreak) {
					await Users.updateOne({ 
						_id: ObjectId(userID),
						"Habits._id": ObjectId(habitID)
					}, {
						$set: {
							"Habits.$.LongestStreak": habitInfo[0].Habits[0].CurrentStreak + 1,
							"Habits.$.CurrentStreak": habitInfo[0].Habits[0].CurrentStreak + 1,
							"Habits.$.LastCheckinDate": currentDate
						}, 
					});

				//if there hasnt been a new longest streak then increment current streak by one
				}else {
					await Users.updateOne({ 
						_id: ObjectId(userID),
						"Habits._id": ObjectId(habitID)
					}, {
						$inc: {
							"Habits.$.CurrentStreak": 1,
						},
						$set: {
							"Habits.$.LastCheckinDate": currentDate
						}

					});
				}

			}

		}

	}

	
    ret.error = error;

	//return response
	res.status(200).json(ret);

  });
};
