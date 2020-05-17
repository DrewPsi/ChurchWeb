var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

//Adds a port
app.set("port", process.eventNames.PORT || 3000);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Uses body-parser for http POST requests.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Uses the routes
app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
});