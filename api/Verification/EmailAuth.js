const url = 'https://praxis-habit-tracker.herokuapp.com/'
const User = require('../../models/Users.js');
const Verify = require('../../models/Verification.js');
const mongoose = require('mongoose');

exports.setGet = function (app, client){

	app.get('/api/verification/email-auth/:userID/:accessToken', async (req, res) => {
		
		//get url params
		const { userID, accessToken } = req.params;
		const objID = mongoose.Types.ObjectId(userID);

		//get user from Users collection
		const result = await User.find({ _id: objID });

		//if user exists
		if(result.length > 0){
			//check Verification collection
			const verifyCollection = await Verify.find({ accessToken: accessToken });

			if(verifyCollection.length > 0) {
				//set email status to verified
				await User.updateOne({ _id: objID }, {$set: { Status: 'Verified' } });
				
			}
		}
	});

}