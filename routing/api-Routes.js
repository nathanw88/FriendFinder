var mysql = require("mysql")
var express = require("express")
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


connection.connect(function(err) {
if (err) {
  console.error("error connecting: " + err.stack);
  //once successfully connected, you may want to query your database for the info you'll need later!
}
});



function loadProfiles(cb) {
  // Selects all of the data from the MySQL profiles table
  connection.query("SELECT * FROM profiles", function(err, res) {
    if (err) throw err;
    //a fun trick for converting mysql's returned 'rowPacketData' obj into more usable JSON
    var data = JSON.stringify(res);
    data = JSON.parse(data);
    // loop over your data converting the string of numbers into an array (using split??)
    friends = data;
    cb(friends)
  });
}
function addProfile(arr, cb){
  connection.query("INSERT INTO profiles (name, photo, scores) VALUES (?, ?, ?)", arr, function(err, res){
    if (err) throw err;

    cb(res)
  });
}

function returnMatch(primaryKey, cb) {
  // Selects all of the data from the MySQL profiles table
  connection.query("SELECT * FROM profiles WHERE ?;",[{id: primaryKey}], function(err, res) {
    if (err) throw err;
    //a fun trick for converting mysql's returned 'rowPacketData' obj into more usable JSON
    var data = JSON.stringify(res);
    data = JSON.parse(data);
    // loop over your data converting the string of numbers into an array (using split??)
    friend = data;
    cb(friend)
  });
}

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    loadProfiles(function(data){
      return res.json(data)
      
    });
  });

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