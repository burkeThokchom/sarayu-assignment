const  { addUser, updateUser, deleteUser } = require('./UserMutation');
const { addEvent, updateEvent, deleteEvent } = require('./EventMutation');

module.exports = {
	addUser,
	updateUser,
	deleteUser,
	addEvent, 
	updateEvent, 
	deleteEvent
}

