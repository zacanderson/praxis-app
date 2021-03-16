require('express');
require('mongodb');

const jwt = require('./createJWT');
const Users = require('./models/Users.js');

exports.setApp = function(app, client){
	

	app.post('/api/login', async (req, res, next) => {

		var error = '';
		
		const { Login, Password } = req.body;

		const results = await Users.find({ Login: Login, Password: Password });


		var id = -1;
		var firstName = '';
		var lastName = '';
		
		if(results.length > 0){
			id = results[0].UserId;
			firstName = results[0].FirstName;
			lastName = results[0].LastName;
			

		}

		try{
        	ret = jwt.createToken( firstName, lastName, id );
      	} catch(e) {
        	ret = {error:e.message};
      	}

		res.status(200).json(ret);

	});


}
