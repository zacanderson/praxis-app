const resetPass = require('./Verification/Send/RecoverPass');
const Users = require('../models/Users');

exports.setApp = function (app, client) {
	app.post('/api/sendreset', async (req, res, next) => {

		const { Email } = req.body;
		const userList = await Users.find({ Email: Email });

		let error = '';

		if(userList.length > 0) {
			//send reset password email
			resetPass.sendRMail(userList[0]._id, Email);

		}else{
			error = 'No user found';

		}

		ret = { error: error };

		res.status(200).json(ret);

	});
}