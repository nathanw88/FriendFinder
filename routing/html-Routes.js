
var path = require("path");

module.exports = function(app) {
//the route to send the home page to client
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});
// the route for sending the survey page to the client
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});
}