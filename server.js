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

app.get('/',function(req,res){
   res.send('OK');
});



var port      = process.env.PORT || 3000;

var server = http.createServer(app);

server.listen( port, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
    var minutes = 0.5, the_interval = minutes * 60 * 1000;

    setInterval(function() {
        var options = {
            host: 'peaceful-anchorage-8466.herokuapp.com'
        };
        http.get(options, function (http_res) {
            console.log("Sent http request to peaceful-anchorage-8466.herokuapp.com to stay awake.");
        });
    }, the_interval);
});







