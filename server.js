var http = require("http");
var express = require("express");
var app  = express();
//var ejsEngine = require("ejs-locals");
var controllers = require("./controllers");
var http = require('http');

// Setup the View Engine
app.set("view engine", "jade");

// Opt into Services
app.use(express.urlencoded());
app.use(express.json());
app.use(express.cookieParser());

// set the public static resource folder
app.use(express.static(__dirname + "/public"));

// Map the routes
controllers.init(app);

app.get("/api/users", function (req, res) {
    res.set("Content-Type", "application/json");
    res.send({ name: "Shawn", isValid: true, group: "Admin" });
});


var port      = process.env.PORT || 3000;

var server = http.createServer(app);

server.listen( port, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});



