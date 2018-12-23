var mysql = require("mysql")
var express = require("express")

//setting up connection
var connection;
if (process.env.JAWSDB_URL) {
connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
var connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "root",
  database: "profile_db"
});
}

// connecting
connection.connect(function(err) {
if (err) {
  console.error("error connecting: " + err.stack);
  
}
});


// function to load the profile with a callback funcion to send the data back when finished
function loadProfiles(cb) {
 
  connection.query("SELECT * FROM profiles", function(err, res) {
    if (err) throw err;
   
    var data = JSON.stringify(res);
    data = JSON.parse(data);
 
    friends = data;
    cb(friends)
  });
}

// function to add a new profile with arr holding the name and photo path, with a callback function to send back info on affected rows when finished.
function addProfile(arr, cb){
  connection.query("INSERT INTO profiles (name, photo, scores) VALUES (?, ?, ?)", arr, function(err, res){
    if (err) throw err;

    cb(res)
  });
}
// function for grabbing one profile first agrument is id of which profile to grab, second is call back function to send the bata from profile back.
function returnMatch(primaryKey, cb) {
  connection.query("SELECT * FROM profiles WHERE ?;",[{id: primaryKey}], function(err, res) {
    if (err) throw err;
  
    var data = JSON.stringify(res);
    data = JSON.parse(data);

    friend = data;
    cb(friend)
  });
}

//exporting routes to be used by server.js
module.exports = function(app) {
  //route for showing all profiles to page
  app.get("/api/friends", function(req, res) {
    loadProfiles(function(data){
      return res.json(data)
      
    });
  });

  //route for adding new profile, and grabbing closest match to it.
  app.post("/api/friends", function(req, res){
   var newProfile = []
   var newScores = req.body.scores
   var profiles ={}
    loadProfiles(function(data){
      profiles = data

      newProfile.push(req.body.name)
    newProfile.push(req.body.photo)
    newProfile.push(req.body.scores.toString())
    var newScoreArr = req.body.scores
    addProfile(newProfile, function(response){
      var difference = 50;
      var id
      for(let i = 0; i < profiles.length; i++){
        var scoreArr = profiles[i].scores.split(",");
        var newDifference = 0
        for(let j = 0; j < scoreArr.length; j ++){
            newDifference += Math.abs(parseInt(scoreArr[j]) - parseInt(newScores[j]));
            if(j === scoreArr.length -1 && newDifference < difference) {  
              difference = newDifference;
              id = i + 1;
            
            }
          }

      }

      returnMatch(id, function(result){
        
        return res.json(result[0])
       
      })
    })
     
    
    
    })


  })
}