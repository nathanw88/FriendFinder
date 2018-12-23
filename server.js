var path = require("path")
var express = require("express")
var mysql = require("mysql")


// // we placed the connections in this source object
// var source = {
//   // localhost
//   localhost: {
//     host: "localhost",
//     port: 3307,
//     user: "root",
//     password: "root",
//     database: "profile_db"
//   },

// };

var PORT = process.env.PORT || 8080;

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// we use source.[name of connection] to hook into mysql
// var connection = mysql.createConnection(source.localhost);

require("./routing/api-routes.js")(app);
require("./routing/html-routes.js")(app);


// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });



// Import routes and give the server access to them.


// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
