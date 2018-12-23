var path = require("path")
var express = require("express")
var mysql = require("mysql")




var PORT = process.env.PORT || 8080;

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// importing the routes
require("./routing/api-Routes")(app);
require("./routing/html-Routes")(app);





// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
