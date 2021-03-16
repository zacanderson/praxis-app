const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Int32 = require('mongoose-int32');

const UserSchema = new Schema({
	UserId:{
		type: Int32
	},
	FirstName: {
		type: String,
		required: true
	},
	LastName: {
		type: String,
		required: true
	},
	Login: {
		type: String,
		required: true
	},
	Password: {
		type: String,
		required: true
	}

}, { collection: 'Users'} );

module.exports = user = mongoose.model("Users", UserSchema);