/*
require('express');
require('mongodb');
require('dotenv').config();
const User = require('../models/Habits.js');

exports.setApp = function (app, client) {

	app.post('/api/addHabit', async (req, res, next) => {

		var error = '';

		//get habit name
		const {habit, UserID} = req.body;	

		const newHabit = {HabitName:habit, UserId:UserID}


		try
		{
			const db = client.db();
			const result = db.collection('Habits').insertOne(newHabit);

		}
		catch(e)
		{
			error = e.toString();
		}


		habitList.push(habit);
		var ret = {error:error}
		res.status(200).json(ret);

	});
}
*/
