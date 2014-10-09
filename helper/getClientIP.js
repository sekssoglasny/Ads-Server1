/**
 * Created by snuffykl on 10/9/14.
 */
(function(self) {
    //Method to get client ip address
     self.getClientIP = function(req) {
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
})(module.exports);