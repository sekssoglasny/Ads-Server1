var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    var arrayLinks = ["http://www.sekssoglasny.com/1","http://www.sekssoglasny.com/2","http://www.sekssoglasny.com/3","http://www.sekssoglasny.com/4","http://www.sekssoglasny.com/5"] ;

    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    var i = Math.floor((Math.random() * 5) + 1);
    console.log(i);
    res.redirect(arrayLinks[i]);
});

module.exports = router;
