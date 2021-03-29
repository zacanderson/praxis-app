const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Int32 = require('mongoose-int32');

const HabitSchema = new Schema({
	UserId:{
		type: Int32
	},
	Habitname:{
		type: String,
		required: true,
	}

});

module.exports = mongoose.model("Habits", HabitSchema);
