const randomBytes = require('randombytes');
const bcrypt = require('bcrypt');
const mail = require('./mailSend.js');

const Verify = require('../../../models/Verification.js');

const url = 'https://praxis-habit-tracker.herokuapp.com/'

const sendRMail = async (userID, email) => {
	console.log(email);
	let accessToken = randomBytes(32).toString('hex');
	const hash = await bcrypt.hash(accessToken, Number(process.env.SALT_ROUNDS));

	const addAccessToken = new Verify({ UserID: userID, accessToken: hash });
	addAccessToken.save();

	const link = `Link to reset password: ${url}ResetPassword?id=${userID}&at=${accessToken}`;

	mail.createEmail(email, link);
}

module.exports.sendRMail = sendRMail;