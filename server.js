const express=  require('express');
const graphQLHttp = require('express-graphql');
const mongoose = require('mongoose');
const appConfig = require('./appConfig.json');
const schema = require('./src/schema');
const databaseConfig = require('./config/databaseConfig');
const bodyParser = require('body-parser');
const cors = require('cors');
const isAuthenticated = require('./middleware/IsAuthenticated');

mongoose.Promise= global.Promise;
mongoose.connect(databaseConfig.dbConnectionString, {
	useNewUrlParser : true,
	useUnifiedTopology: true,
}, err=>{
	if(err){
		console.log(`Error while connecting to database ${err}`);
	}
	else{
		console.log('Database connection established')
	}
})

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const app = express();
app.use(bodyParser.json());

app.use((req,res,next)=>{
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //for token

if(req.method ==='OPTIONS'){
		return res.sendStatus(200);
	}
	next(); // next means,,,, the request can now go further i.e.. go to nxt step 
})

app.use(cors());
app.use(isAuthenticated);
app.use('/graphql', graphQLHttp({
	schema: schema,
	graphiql: true
}));

app.listen(appConfig.PORT, ()=>{
	console.log(`Listening to port ${appConfig.PORT}`)
})