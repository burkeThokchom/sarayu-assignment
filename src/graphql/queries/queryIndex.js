const { GraphQLQList, GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLID, GraphQLInt } = require('graphql');
const Users = require('../../models/Users');
const Events = require('../../models/Events');
const UserType = require('./UserType');
const EventType = require('./EventType');
const appConfig = require('../../../appConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const rootQuery = new GraphQLObjectType({
	name: "rootQuery",
	description: "All queries",
	fields: ()=>({
		getUserById: {
			type: UserType,
			description: "Get user info by _id",
			args: {
				_id: {
					name: "_id",
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: async function(root, args){
				const singleUser =  await Users.findOne({_id: args._id, isDeleted: false});
				if(!singleUser){
					throw new Error('Error while getting user by _id');
				}
				return singleUser;
				
			}
		},
		getUserByEmail: {
			type: UserType,
			description: "Get user info by email",
			args: {
				email: {
					name: "email",
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: async function(root, args){
				const singleUser =  await Users.findOne({email: args.email, isDeleted: false});
				if(!singleUser){
					throw new Error('Error while getting user by email');
				}
				return singleUser;
				
			}
		},
		getAllUsers: {
			type: new GraphQLList(UserType),
			description: "All Users",
			resolve: async function(root, args, req){	
				const usersDocArray = await Users.find({isDeleted: false});
				if(!usersDocArray){
					throw new Error("Error while getting users");
				}
				return usersDocArray;
			}	
		},

		//protected
		getEventById: {
			type: EventType,
			description: "Get event info by _id",
			args: {
				_id: {
					name: "_id",
					type: new GraphQLNonNull(GraphQLID)
				}
			},
			resolve: async function(root, args, req){
				if(req.isAuth){
					const singleEvent =  await Events.findOne({_id: args._id, isDeleted: false});
					if(!singleEvent){
						throw new Error('Error while getting event by _id');
					}
					return singleEvent;	
				}
				else{
					throw new Error("Please login and try again");
				}
			}
		},
		//protected
		getAllUserEvents: {
			type: new GraphQLList(EventType),
			description: "Get all logged in user events",
			resolve: async function(root, args, req){
				if(req.isAuth && req.userId){
					const userEventDocs =  await Events.find({createdBy: req.userId, isDeleted: false});
					if(!userEventDocs){
						throw new Error('Error while getting all events for user ',req.userId);
					}
					return userEventDocs;
				}
				else{
					throw new Error("You do have permission for this resource. Please login and try again")
				}
			}
		},
		//protected
		getAllEvents: {
			type: new GraphQLList(EventType),
			description: "Get all events",
			resolve: async function(root, args, req){
				if(req.isAuth){
					const eventsDoxs =  await Events.find({isDeleted: false});
					if(!eventsDoxs){
						throw new Error('Error while getting all events');
					}
					return eventsDoxs;
				}
				else{
					throw new Error("Please login and try again");
				}	
			}
		},
		login: {
			type: require('./LoginType'),
			args: {
				email: {
					name: "email",
					type: new GraphQLNonNull(GraphQLString)
				},
				password: {
					name: "password",
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: async function(root, args){
				const currentUser = await Users.findOne({email: args.email, isDeleted: false});
				if(!currentUser)throw new Error("User does not exist");

				const isAuth = await bcrypt.compare(args.password, currentUser.password);	
				if (!isAuth)throw new Error("Username and password does not match");
				
				const token = jwt.sign({userId: currentUser.id, email: currentUser.email},  appConfig.privateKey,  {expiresIn: appConfig.tokenExpiryTime});
				return {
					userId: currentUser.id,
					email: currentUser.email,
					token: token, 
					tokenExpiryTime: appConfig.tokenExpiryTime || '1hr',
					user: currentUser._doc
				};
			}
		}
	})
})
module.exports = rootQuery;