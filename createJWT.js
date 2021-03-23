const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.createToken = function(fName, lName, id) {
	try{
		const expiration = new Date();
		
		//create user and save it into JWT
		const user = { userID: id, firstName: fName, lastName: lName };
		const accessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});

		//return accesstoken
		var ret = { accessToken: accessToken };

		//or return error
	} catch (e) {
		var ret = { error: e.message };
		
	}

	return ret; 
}


exports.refreshToken = function(token) {
	var ud = jwt.decode(token, { complete: true });

	var userID = ud.payload.id; 
	var firstName = ud.payload.firstName;
	var lastName = ud.payload.lastName;

	return createToken( firstName, lastName, userID);

}

//a check to see if JWT is expired 
exports.isExpired = function(token) {
	var isError = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, 
		(err, verifiedJWT) => {
			if(err){
				return true;

			}else {
				return false;

			}

		});

	return isError;

}
