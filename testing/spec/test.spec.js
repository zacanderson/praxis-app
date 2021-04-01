const axios = require('axios');
require('dotenv').config();

//set up testing server
describe('Server', () => {

	//gets the server set up 
	let server; 
	beforeAll((done) => {
		server = require('../server');
		done();

	});

	//close server after done testing
	afterAll(() => {
		server.close();

	});

	//Testing the login api endpoint
	describe('POST /login', () => {
		let data = {};
		beforeAll((done) => {
			axios.post('http://localhost:5000/api/login', {
				Login: process.env.TestLogin,
				Password: process.env.TestPassword
				
			}).then((response) => {
				data.status = response.status;
				data.content = response.data;
				done();

			}).catch((error) => {
				console.log(error);

			});

		});

		//we expect it to return a 200 status
		it('Status 200', () => {
			expect(data.status).toBe(200);

		});

		//and to have an accessToken with 
		it('Content', () => {
			expect(JSON.stringify(data.content)).toContain('accessToken');

		});


	});


	//testing register endpoint
	describe('POST /register', () => {
		let data = {};
		beforeAll((done) => {
			axios.post('http://localhost:5000/api/register', {
				Login: process.env.TestLogin,
				Password: process.env.TestPassword
				
			}).then((response) => {
				data.status = response.status;
				data.content = response.data;
				done();

			}).catch((error) => {
				console.log(error);

			});

		});

		//we expect it to return a 200 status
		it('Status 200', () => {
			expect(data.status).toBe(200);

		});

		//and to have an error saying that the user already exists 
		it('Content', () => {
			expect(JSON.stringify(data.content)).toContain('User already exists.');

		});


	});



	//testing passwordreset endpoint
	describe('POST /passwordreset', () => {
		let data = {};
		beforeAll((done) => {
			axios.post('http://localhost:5000/api/passwordreset', {
				accessToken: '',
				UserID: '', 
				Password: ''
				
			}).then((response) => {
				data.status = response.status;
				data.content = response.data;
				done();

			}).catch((error) => {
				console.log(error);

			});

		});

		//we expect it to return a 200 status
		it('Status 200', () => {
			expect(data.status).toBe(200);

		});

		//and to have an error with access error inside
		it('Content', () => {
			expect(JSON.stringify(data.content)).toEqual('{"error":"ObjectID parsing error"}');

		});


	});


	//testing sendverification endpoint
	describe('POST /sendverification', () => {
		let data = {};
		beforeAll((done) => {
			axios.post('http://localhost:5000/api/sendverification', {
				Email: process.env.TestEmail
				
			}).then((response) => {
				data.status = response.status;
				data.content = response.data;
				done();

			}).catch((error) => {
				console.log(error);

			});

		});

		//we expect it to return a 200 status
		it('Status 200', () => {
			expect(data.status).toBe(200);

		});

		//and to have an error with access error inside
		it('Content', () => {
			expect(JSON.stringify(data.content)).toContain('error');

		});


	});



	//testing sendreset endpoint
	describe('POST /sendreset', () => {
		let data = {};
		beforeAll((done) => {
			axios.post('http://localhost:5000/api/sendreset', {
				Email: process.env.TestEmail
				
			}).then((response) => {
				data.status = response.status;
				data.content = response.data;
				done();

			}).catch((error) => {
				console.log(error);

			});

		});

		//we expect it to return a 200 status
		it('Status 200', () => {
			expect(data.status).toBe(200);

		});

		//and to have an error with access error inside
		it('Content', () => {
			expect(JSON.stringify(data.content)).toContain('error');

		});


	});



})