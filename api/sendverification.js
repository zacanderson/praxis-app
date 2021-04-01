const sendMail = require('./Verification/Send/SendVerificationEmail.js');
const Users = require('../models/Users');

exports.setApp = function (app, client) {
	app.post('/api/sendverification', async (req, res, next) => {

		const { Email } = req.body;
		const userList = await Users.find({ Email: Email });

		let error = '';

		if(userList.length > 0) {
			if(userList[0].Status == 'verified') {
				//catch if user is already verifed
				error = 'User already verified';

			}else {
				//send reset password email
				sendMail.sendVMail(userList[0]._id, Email);

			}

		}else{
			error = 'No user found';

		}

		ret = { error: error };

		res.status(200).json(ret);

	});
}