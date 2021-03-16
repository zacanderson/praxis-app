const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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

var api = require('./api.js');
api.setApp( app, mongoose );

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
