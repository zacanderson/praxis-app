const nodemailer = require('nodemailer');
require('dotenv').config();

const createEmail = async (email, text) => {
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
		subject: 'Praxis Verification',
		text: text

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

module.exports.createEmail = createEmail;