const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const path = require('path');
const PORT = process.env.PORT || 5000;  

const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(bodyParser.json());


const url = process.env.MONGODB_URI;
const mongoose = require('mongoose');

mongoose.connect(url)
	.then(() => console.log("MongoDB connected"))
	.catch(err => console.log(err));


const endPoints = fs.readdirSync('./api').filter(file => file.endsWith('.js'));
for(const file of endPoints){
	var api = require(`./api/${file}`);
	api.setApp( app, mongoose );

}

//set up verification stuff
const verifyEndPoints = fs.readdirSync('./api/Verification').filter(file => file.endsWith('.js'));
for(const file of verifyEndPoints){
	var api = require(`./api/Verification/${file}`);
	api.setGet( app, mongoose );

}

// Server static assets if in production
if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => 
  {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}


app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

// start Node + Express server on port 5000
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);

}); 
