require("express");
require("mongodb");
const mongoose = require('mongoose');
require("dotenv").config();

const webT = require('jsonwebtoken');

const jwt = require("../createJWT");
const Users = require("../models/Users");

exports.setApp = function (app, client) {
  app.post("/api/getHabits", async (req, res, next) => {
    let error = "";
	let ret = {};

    //get habit name
    const { accessToken, search } = req.body;

	//check to see if access token is valid
	if(jwt.isExpired(accessToken)){
		error = 'Acess token has expired, log back in';
	}else{
		
		//get access token data
		let userData = webT.decode(accessToken, { complete: true });
		let userID = userData.payload.userID;

		//get habits from database with search for habit name
		const result = await Users.find({ _id: userID, "Habits.HabitName": { $regex: `.*${search}.*`, $options: 'i'}}, "Habits");

		//refresh access token and add habits to response
		ret = jwt.refreshToken(accessToken);
		ret.Habits = result[0].Habits;

	}

	ret.error = error;
	
	//return response
	res.status(200).json(ret);

  });
};
