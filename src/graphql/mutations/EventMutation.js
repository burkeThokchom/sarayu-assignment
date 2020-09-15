const Events = require('../../models/Events');
const Users = require('../../models/Users');
const EventType = require('../queries/EventType') ;
const {GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLID }  = require('graphql');

//protected
const addEvent = {
	type: EventType,
	args: {
		name: {
			type: new GraphQLNonNull(GraphQLString)
		},
		eventLink: {
			type: new GraphQLNonNull(GraphQLString)
		},
		time: {
			type: new GraphQLNonNull(GraphQLString)
		}
	},
	resolve: async function(root, args, req){
        if(req.isAuth && req.userId){
            args.createdBy    = req.userId;
            const eventModl   = new Events(args);
            const newEventDoc = await eventModl.save();
            if(!newEventDoc){
                throw new Error("Error while adding event")
            }
            //updating event in corresponding user
            await Users.findByIdAndUpdate(req.userId, {
                $push: {
                    events: newEventDoc._id
                }
            })
            return newEventDoc;	
        } 
        else{
            throw new Error("Please login and try again");
        }
	}
}
// protected route
const updateEvent = {
	type: EventType,
	args: {
		_id:{
			name: "_id",
			type: new GraphQLNonNull(GraphQLID)
		},
		name:{
			name: "name",
			type: GraphQLString
		},
		eventLink: {
			name: "eventLink",
			type: GraphQLString
		},
		time: {
			name: "time",
			type: GraphQLString
		}
	},
	resolve: async function(root, args, req){
		if(req.isAuth && req.userId){
			let dataToBeUpdated  = {};
			if(args.name){
				dataToBeUpdated.name = args.name;
			}
			if(args.eventLink){
				dataToBeUpdated.eventLink = args.eventLink;
			}
			if(args.time){
				dataToBeUpdated.time = args.time;
			}
			
			const updatedEventInfo = await Events.findOneAndUpdate({_id: args._id, createdBy: req.userId}, dataToBeUpdated, {new: true});
			if(!updatedEventInfo){
				throw new Error("Error while updating event");
			}
			return updatedEventInfo;
		}
		else{
			throw new Error("You do not access to ths resource. Please login with right credentials");
		}
	}
}
// protected
const deleteEvent = {
	type: EventType,
	args: {
		_id:{
			name: "_id",
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	resolve: async function(root, args, req){
		if(req.isAuth && req.userId){
			const deletedEvent = await Events.findOneAndUpdate({_id: args._id, createdBy: req.userId}, {$set: {isDeleted: true}});
			if(!deletedEvent){
				throw new Error("Error while deleting event");
			}
			return deletedEvent;
		}
		else{
			throw new Error("You do not access to ths resource. Please login with right credentials")
		}
	}
}

module.exports = { addEvent, updateEvent, deleteEvent }