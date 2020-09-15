const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	name: {
		type: String,
		minLength: 1,
		required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
	eventLink: {
		type: String,
		minLength: 1,
		required: true
    },
    time: {
		type: Date,
		minLength: 1,
		required: true
	},
	isDeleted: {
		type: Boolean,
		default: false
	}

}, {timestamps: true})

const eventsModel = mongoose.model('Events', eventSchema);
module.exports = eventsModel;