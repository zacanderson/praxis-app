const axios = require('axios');
require('dotenv').config();

let accessToken;

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
				accessToken = data.content.accessToken;
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

	//testing addHabit endpoint
	describe('POST /sendreset', () => {
		let data = {};
		beforeAll((done) => {
			axios.post('http://localhost:5000/api/addHabit', {
				accessToken: accessToken,
				habitName: "Scroll memes",
  				description: "On twitter",
  				occurence: "daily",
  				currentDate: "Sun Apr 06 2021 12:10:46 GMT-0400 (Eastern Daylight Time)",
  				timesPerOccurence: 3,
  				color: "#4c7bc7",
  				icon: 2
				
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

		//and to have accessToken returned with empty error
		it('Content', () => {
			expect(JSON.stringify(data.content)).toContain('accessToken');
			expect(JSON.stringify(data.content)).toContain('"error":""');

		});


	});


		//testing editHabit endpoint
		describe('POST /editHabit', () => {
			let data = {};
			beforeAll((done) => {
				axios.post('http://localhost:5000/api/editHabit', {
					accessToken: accessToken,
					description: "Read the maze runner",
					habitID: "60746e10e46ec5082470667d",
					newOccurence: "daily",
					timesPerOccurence: 3,
					color: "#4c7bc7",
					icon: 2,
					percent: 50,
					currDate: "Sun Apr 07 2021 12:10:46 GMT-0400 (Eastern Daylight Time)"
					
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
	
			//and to have accessToken returned with empty error
			it('Content', () => {
				expect(JSON.stringify(data.content)).toContain('accessToken');
				expect(JSON.stringify(data.content)).toContain('"error":""');
	
			});
	
	
		});

		//testing checkin endpoint
		describe('POST /checkIn', () => {
			let data = {};
			beforeAll((done) => {
				axios.post('http://localhost:5000/api/checkIn', {
					accessToken: accessToken,
					habitID: "60746e10e46ec5082470667d",
					currDate: "Sun Apr 07 2021 12:10:46 MT-0400 (Eastern Daylight Time)",
					streak: 1,
					longestStreak: 2
					
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
	
			//and to have accessToken returned with empty error
			it('Content', () => {
				expect(JSON.stringify(data.content)).toContain('accessToken');
				expect(JSON.stringify(data.content)).toContain('"error":"No habit found with that id!"');
	
			});
	
	
		});


		//testing undocheckin endpoint
		describe('POST /undoCheckin', () => {
			let data = {};
			beforeAll((done) => {
				axios.post('http://localhost:5000/api/undoCheckin', {
					accessToken: accessToken,
					habitID: "60746e10e46ec5082470667d",
					
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
	
			//and to have accessToken returned with empty error
			it('Content', () => {
				expect(JSON.stringify(data.content)).toContain('accessToken');
				expect(JSON.stringify(data.content)).toContain('"error":""');
	
			});
	
	
		});



})