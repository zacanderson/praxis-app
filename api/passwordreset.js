const resetPass = require('./Verification/Send/RecoverPass');
const Users = require('../models/Users');
const Verify = require('../models/Verification');

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('dotenv').config();

exports.setApp = function (app, client) {
	app.post('/api/passwordreset', async (req, res, next) => {

		//get incoming json data
		const { accessToken, UserID, Password } = req.body;
		let objID, error;
		try {
			objID = mongoose.Types.ObjectId(UserID);
			
			//get verification list by id
			const verifyList = await Verify.find({ UserID: UserID });

			//if the verify list isnt open and the tokens match then change password
			if(verifyList.length > 0 && bcrypt.compare(accessToken, verifyList[0].accessToken)) {
				//change passwords and update 
				const hash = await bcrypt.hash(Password, Number(process.env.SALT_ROUNDS));
				await Users.updateOne({ _id: objID }, {$set: { Password: hash } });
				
				//delete from Verify collection
				Verify.deleteMany({ UserID: UserID });

			} else {
				error = 'access error';

			}

		} catch (err){
			error = 'ObjectID parsing error';
			
		}
		
		const ret = { error: error }; 

		res.status(200).json(ret);

	});
}