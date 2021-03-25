const nodemailer = require('nodemailer');
const randomBytes = require('randombytes');
const bcrypt = require('bcrypt');

const Verify = require('../../../models/Verification.js');

const url = 'https://praxis-habit-tracker.herokuapp.com/'

async function sendVMail(userID, email) {
	//create access token
	let accessToken = randomBytes(32).toString('hex');
	const hash = await bcrypt.hash(accessToken, Number(process.env.SALT_ROUNDS));
	
	//add hashed token to database
	const addAccessToken = new Verify({ UserID: userID, accessToken: hash });
	addAccessToken.save();

	const link = `${url}api/verification/email-auth/${userID}/${accessToken}`;

	//setup mail stuff
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'praxis.application@gmail.com',
			pass: process.env.EMAIL_KEY
		}

	});

	const mailSetup = {
		from: 'praxis-application@gmail.com',
		to: email,
		subject: 'Email Verification',
		text: `Link to verify email: ${link}`

	}

	//send email
	transporter.sendMail(mailSetup, function(err, info) {
		if(err) {
			console.log(err);
		} else {
			console.log(info);
		}

	});

}

exports.sendVMail = sendVMail;
