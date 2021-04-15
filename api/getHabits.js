require("express");
require("mongodb");
const ObjectId = require('mongodb').ObjectId;
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
		const result = await Users.aggregate([ 
			{$unwind: '$Habits'}, 
			{$match : { 
				_id: ObjectId(userID), 
				$or: [
					{"Habits.HabitName": new RegExp(search, 'i')},
					{"Habits.Description": new RegExp(search, 'i')}
				]
			}}, 
			{$group: { _id: '$_id', Habits: {$push: '$Habits'}} },
			{$project: {
				_id: 0,
				Habits: '$Habits'
			}}
		
		]);
		//refresh access token and add habits to response
		ret = jwt.refreshToken(accessToken);
		if(result.length > 0){
			ret.Habits = result[0].Habits;

		} else {
			error = 'No habits found!';

		}
		

	}

	ret.error = error;

	//return response
	res.status(200).json(ret);

  });
};
