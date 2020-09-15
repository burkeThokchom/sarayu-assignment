const Users = require('../../models/Users');
const UserType = require('../queries/UserType') ;
const {GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLID, GraphQLList }  = require('graphql');
const bcrypt = require('bcryptjs');
const appConfig = require('../../../appConfig');

const addUser = {
	type: UserType,
	args: {
		name: {
			type: new GraphQLNonNull(GraphQLString)
		},
		email: {
			type: new GraphQLNonNull(GraphQLString)
		},
		password: {
			type: new GraphQLNonNull(GraphQLString)
		},
		events: {
			type: new GraphQLList(GraphQLID)
		}
	},
	resolve: async function(root, args){

		// to prevent dupicale email
		const existingUser = await Users.findOne({email: args.email})
		if(existingUser){
			throw new Error("User exists already");
		}
		const hash = await bcrypt.hash(args.password, appConfig.hashRounds);
		args.password = hash;
		if(!args.events){
			args.events = [];
		}
		const userModl = new Users(args);
		const newUserDoc = await userModl.save();
		if(!newUserDoc){
			throw new Error("Error while adding user")
		}
		return newUserDoc;	
	}
}
// protected route
const updateUser = {
	type: UserType,
	args: {
		_id:{
			name: "_id",
			type: new GraphQLNonNull(GraphQLString)
		},
		name:{
			name: "name",
			type: GraphQLString
		},
		email: {
			name: "email",
			type: GraphQLString
		},
		events: {
			name: "events",
			type: new GraphQLList(GraphQLID)
		}
	},
	resolve: async function(root, args, req){
		if(req.isAuth && req.userId == args._id){
			let dataToBeUpdated  = {};
			if(args.name){
				dataToBeUpdated.name = args.name;
			}
			if(args.email){
				dataToBeUpdated.email = args.email;
			}
			if(args.events){
				dataToBeUpdated.events = args.events;
			}
			
			const updatedUserInfo = await Users.findByIdAndUpdate(args._id,dataToBeUpdated, {new: true});
			if(!updatedUserInfo){
				throw new Error("Error while updating user");
			}
			return updatedUserInfo;
		}
		else{
			throw new Error("You do not access to ths resource. Please login with right credentials");
		}
	}
}
// protected
const deleteUser = {
	type: UserType,
	args: {
		_id:{
			name: "_id",
			type: new GraphQLNonNull(GraphQLID)
		}
	},
	resolve: async function(root, args, req){
		if(req.isAuth && req.userId == args._id){
			const deletedUser = await Users.findOneAndUpdate({_id: args._id}, {$set: {isDeleted: true}});
			if(!deletedUser){
				throw new Error("Error while deleting user");
			}
			return deletedUser;
		}
		else{
			throw new Error("You do not access to ths resource. Please login with right credentials")
		}
	}
}

module.exports = { addUser, updateUser, deleteUser }