const randomBytes = require('randombytes');
const bcrypt = require('bcrypt');
const sendMail = require('./mailSend.js');

const Verify = require('../../../models/Verification.js');

const url = 'https://praxis-habit-tracker.herokuapp.com/'

const sendVMail = async (userID, email) => {
	//create access token
	let accessToken = randomBytes(32).toString('hex');
	const hash = await bcrypt.hash(accessToken, Number(process.env.SALT_ROUNDS));
	
	//add hashed token to database
	const addAccessToken = new Verify({ UserID: userID, accessToken: hash });
	addAccessToken.save();

	const link = `Link to verify email: ${url}api/verification/email-auth/${userID}/${accessToken}`;
	
	sendMail.createEmail(email, link);

}

module.exports.sendVMail = sendVMail;
