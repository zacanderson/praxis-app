require('express');
require('mongodb');
require('dotenv').config();
exports.setApp = function (app, client) {
	app.post('/api/addHabit.js', async (req, res, next) => {

		var error = '';

		const {habit, UserID} = req.body;	

		const newHabit = {HabitName:habit, UserId:UserID}

		try
		{
			const db = client.db();
			const result = db.collection('Cards').insertOne(newCard);
		}
		catch(e)
		{
			error = e.toString();
		}

		habitList.push(HabitName);
		var ret = {error:error}
		res.status(200).json(ret);

	});
}
