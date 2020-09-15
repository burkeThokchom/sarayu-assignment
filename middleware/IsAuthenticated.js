const jwt = require('jsonwebtoken');
const appConfig = require('../appConfig');

module.exports = (req, res, next)=>{
    const authorizationHeader = req.get('Authorization');
    if(!authorizationHeader) {
        req.isAuth =  false;
        req.userId = null;
        return next();
    }

    const token = authorizationHeader.split(' ')[1];
    if(!token){
        req.isAuth = false;
        req.userId = null;
        return next();
    }

    let decodedToken = null;
    try{
        decodedToken = jwt.verify(token, appConfig.privateKey);
        //console.log('Printing the decoded token', decodedToken);
    }catch(err){
        req.isAuth = false;
        req.userId = null;
        return next();
    }
    
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();

}