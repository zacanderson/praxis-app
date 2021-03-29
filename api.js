require('express');
require('mongodb');

const jwt = require('./createJWT');

//load user model
const User = require("./models/user.js");
//load card model
const Habits = require("./models/Habits.js");

exports.setApp = function ( app, client )
{

    app.post('/api/addHabit', async (req, res, next) =>
    {
      // incoming: userId, color
      // outgoing: error
        
      const { userId, habit, jwtToken } = req.body;
      var error = '';
//      const newCard = {Card:card,UserId:userId};
      const newCard = new Card({ Habit: habit, UserId: userId });

      if( jwt.isExpired(jwtToken))
      {
        var r = {error:'The JWT is no longer valid'};
        res.status(200).json(r);
        return;
      } 

      try
      {
        //const db = client.db();
        //const result = db.collection('Cards').insertOne(newCard);
        newCard.save();
      }
      catch(e)
      {
        error = e.message;
        console.log(e.message);
      }
    
      var ret = { error: error };
      res.status(200).json(ret);
    });
    
}
