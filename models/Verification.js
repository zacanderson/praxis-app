const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VerifyCode = new Schema({
	UserID: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
	accessToken: {
		type: String,
		required: true,
	},
	dateCreated: {
		type: Date,
		default: Date.now(),
		expires: 600,
	}
}, { collection: 'Verify'} );

module.exports = Verify = mongoose.model("Verify", VerifyCode);