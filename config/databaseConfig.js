const appConfig = require('../appConfig.json');
let mongoUrl = `mongodb://${appConfig.DATABASE_HOST}:${appConfig.DATABASE_PORT}/${appConfig.DATABASE_NAME}`;


// for mongodb atlas
if(appConfig.DATABASE_USER && appConfig.DATABASE_PASS){
	mongoUrl = `mongodb+srv://${appConfig.DATABASE_USER}:${appConfig.DATABASE_PASS}@assignmentsdb.v78sh.mongodb.net/${appConfig.DATABASE_NAME}?retryWrites=true&w=majority`
}

console.log("Printing url ", mongoUrl);
module.exports = {
	dbConnectionString: mongoUrl
}