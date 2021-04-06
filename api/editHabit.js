require("express");
require("mongodb");
const ObjectId = require('mongodb').ObjectID;
require("dotenv").config();

const webT = require('jsonwebtoken');

const jwt = require("../createJWT");
const Users = require("../models/Users");

exports.setApp = function (app, client) {
  app.post("/api/editHabit", async (req, res, next) => {
    let error = "";


	const {accessToken, newOccurence, habitID, description} = req.body;


	if(jwt.isExpired(accessToken)){
		error = 'Access token has expired, please log back in';

	} else {
		// get access token data
		let userData = webT.decode(accessToken, { complete: true });
		let userID = userData.payload.userID;

		// update habit occurence
		await Users.updateOne({ _id: ObjectId(userID), "Habits._id": ObjectId(habitID)}, { $set: { "Habits.$.Occurence": newOccurence, "Habits.$.Description": description } });
		


	}
	
	// refresh and return token
	let ret = jwt.refreshToken(accessToken);
    ret.error = error;

	// return response
	res.status(200).json(ret);

  });
};
