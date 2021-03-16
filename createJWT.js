const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.createToken = function(fName, lName, id) {
	try{
		const expiration = new Date();

		const user = { userID: id, firstName: fName, lastName: lName };

		const accessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET);

		var ret = { accessToken: accessToken };

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
