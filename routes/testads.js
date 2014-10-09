var express = require('express');
var router = express.Router();
var fs = require('fs');
var excel = require('excel');
var path = require('path');
var geoip = require('geoip-lite');
var lockFile = require('lockfile');

//Method to get client ip address
var getClientIP = function(req) {
    var retval = "";

    if (req["headers"] && req["headers"]["x-forwarded-for"]) {
        //
        // Proxied request
        //
        retval = req["headers"]["x-forwarded-for"];

    } else if (req["socket"] && req["socket"]["remoteAddress"]) {
        //
        // Direct request
        //
        retval = req["socket"]["remoteAddress"];

    } else if (req["socket"] && req["socket"]["socket"]
        && req["socket"]["socket"]["remoteAddress"]) {
        //
        // God only knows what happened here...
        //
        retval = req["socket"]["socket"]["remoteAddress"];
    }

    return retval;
};


/* GET users listing. */
router.get('/', function(req, res) {
    try {
        var clientIP = getClientIP(req);

        if (clientIP != null) {

            var fullName = path.join(__dirname, 'data/ADXURLs.xlsx');

            excel(fullName, function (err, data) {

                if (err) {

                    console.log(ex);
                }

                var obj = geoip.lookup(clientIP);

                var arrayCountry = new Array();

                for (var i = 0; i < data.length; i++) {

                    if (data[i][0].toString() === obj.country) {
                        arrayCountry.push(data[i]);
                    }
                }

                if (arrayCountry.length > 0) {

                    var folderPath = __dirname + '/data/' + obj.country + '/';

                    var counter = fs.readdirSync(folderPath)[0];

                    if (counter < arrayCountry.length) {
                        var oriPath = path.join(folderPath.toString(), counter.toString());

                        var newName = parseInt(counter) + 1;
                        lockFile.lock(oriPath)
                        fs.rename(oriPath, path.join(folderPath, newName.toString()), function () {
                            var url = arrayCountry[newName - 1][1];

                            var imageName = url.split('&ad=');

                            var imagePath = '/data/' + obj.country + '/' + imageName[1] + '.gif';

                            //Rendering html
                            res.set('Cache-Control', 'no-cache');
                            res.render('index', { title: url, imageUrl: imagePath });
                        });

                    }
                    else {
                        var oriPath = path.join(folderPath.toString(), counter.toString());

                        var newName = parseInt("1");
                        fs.rename(oriPath, path.join(folderPath, newName.toString()), function () {
                            var url = arrayCountry[newName - 1][1];

                            var imageName = url.split('&ad=');

                            var imagePath = '/data/' + obj.country + '/' + imageName[1] + '.gif';
                            //var fullPath = path.join(__dirname, imagePath) ;

                            //Rendering html
                            res.set('Cache-Control', 'no-cache');
                            res.render('index', { title: url, imageUrl: imagePath });
                        });


                    }

                }
                else {
                    res.send('no country available');
                }
            });
        }
        else {
            //TO DO:
        }
    }
    catch(ex)
    {
        console.log(ex);
    }
});

module.exports = router;
