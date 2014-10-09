(function (controllers) {

    var globalAdvertController = require("./globalAdvertController");

    controllers.init = function (app) {
        globalAdvertController.init(app);
    };

})(module.exports);