/**
 * Created by snuffykl on 10/9/14.
 */
(function (globalAdvertController) {

    var clientHelper = require('../helper/getClientIP');
    var express = require('express');
    var fs = require('fs');
    var excel = require('excel');
    var path = require('path');
    var geoip = require('geoip-lite');


    globalAdvertController.init = function (app) {

        app.get("/global", function (req, res) {

            try {

                var clientIP = clientHelper.getClientIP(req);

                //Development purposes
                if (clientIP == '127.0.0.1') {
                    clientIP =  '110.159.245.28';
                }


                if (clientIP != null) {

                    var rootFolder = process.cwd();
                    var fullName = path.join(rootFolder, '/data/ADXURLs.xlsx');

                    excel(fullName, function (err, data) {

                        if (err) {

                            console.log(ex);
                            throw ex;
                        }

                        var obj = geoip.lookup(clientIP);

                        var arrayCountry = new Array();

                        for (var i = 0; i < data.length; i++) {

                            if (data[i][0].toString() === obj.country) {
                                arrayCountry.push(data[i]);
                            }
                        }

                        if (arrayCountry.length > 0) {

                            var folderPath = rootFolder + '/data/' + obj.country + '/';

                            var counter = fs.readdirSync(folderPath)[0];

                            if (counter < arrayCountry.length) {
                                var oriPath = path.join(folderPath.toString(), counter.toString());

                                var newName = parseInt(counter) + 1;

                                fs.rename(oriPath, path.join(folderPath, newName.toString()), function () {
                                    var url = arrayCountry[newName - 1][1];

                                    var imageName = url.split('&ad=');

                                    var imagePath = 'images//data/' + obj.country + '/' + imageName[1] + '.gif';

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

                                    var imagePath = '/images/data/' + obj.country + '/' + imageName[1] + '.gif';
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
                throw ex;
            }
        });
    };

})(module.exports);