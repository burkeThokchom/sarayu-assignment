const Users = require('../../models/Users'); 
const {GraphQLString, GraphQLObjectType, GraphQLList, GraphQLID }  = require('graphql');

const UserType = new GraphQLObjectType({
	name: "UserType",
	description: "User Info",
	fields: ()=>({
		_id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
		},
		email: {
			type: GraphQLString
		},
		events: {
			type: new GraphQLList(require('./EventType')),
			resolve: async function(user){
				const userWithEvents = await Users.find({isDeleted: false}).populate({path: "events", match: {isDeleted: false}});
				return userWithEvents.events
			}
		}
	})
})

module.exports = UserType;