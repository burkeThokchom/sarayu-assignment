const Events = require('../../models/Events'); 
const {GraphQLString, GraphQLObjectType, GraphQLList, GraphQLID }  = require('graphql');

const EventType = new GraphQLObjectType({
	name: "EventType",
	description: "Event Info",
	fields: ()=>({
		_id: {
			type: GraphQLID
		},
		name: {
			type: GraphQLString
        },
        createdBy: {
            type: require('./UserType'),
			resolve: async function(event){
				const eventWitUser = await Events.findById(event._id).populate({path: "createdBy", match: {isDeleted: false}});
				return eventWitUser.createdBy;
			}
        },
		eventLink: {
			type: GraphQLString
        },
        time: {
			type: GraphQLString
		}
	})
})

module.exports = EventType;