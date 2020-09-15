const appConfig = require('../appConfig.json');
let mongoUrl = `mongodb://${appConfig.DATABASE_HOST}:${appConfig.DATABASE_PORT}/${appConfig.DATABASE_NAME}`;


// for mongodb atlas
if(appConfig.DATABASE_USER && appConfig.DATABASE_PASS){
	mongoUrl = `mongodb+srv://${appConfig.DATABASE_USER}:${appConfig.DATABASE_PASS}@furnitureapp.uozjb.mongodb.net/${appConfig.DATABASE_NAME}?retryWrites=true&w=majority`
	//mongoUrl = `mongodb+srv://${appConfig.DATABASE_USER}:${appConfig.DATABASE_PASS}@${appConfig.DATABASE_HOST}:${appConfig.DATABASE_PORT}/${appConfig.DATABASE_NAME}`
}
module.exports = {
	dbConnectionString: mongoUrl
}