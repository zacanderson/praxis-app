const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Int32 = require('mongoose-int32');

const UserSchema = new Schema({
	UserId:{
		type: Int32
	},
	Email:{
		type: String,
		required: true,
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
	},
	Status: {
		type: String,
		default: "pending"
	},
	Habits: {
		type: Array
	}

}, { collection: 'Users'} );

module.exports = mongoose.model("Users", UserSchema);