const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		minLength: 1,
		required: true
	},
	email: {
		type: String,
		minLength: 1,
		unique: true,
		required: true
	},
	password: {
		type: String,
		minLength: 8,
		maxlength: 100,
		required: true
	},
	events: [
		{
			type: [Schema.Types.ObjectId],
			ref: "Events"
		}
	],
	isDeleted: {
		type: Boolean,
		default: false
	}

}, {timestamps: true})

const userModel = mongoose.model('Users', userSchema);
module.exports = userModel;