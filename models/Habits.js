const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Int32 = require('mongoose-int32');

const HabitSchema = new Schema({
	UserId:{
		type: Int32
	},
	HabitName:{
		type: String,
		required: true,
	}

}, { collection: 'Habits'} );

module.exports = mongoose.model("Habits", HabitSchema);
