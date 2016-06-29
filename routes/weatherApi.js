var express = require('express');
var router = express.Router();
var Forecast = require('forecast');


// Initialize Forecast 

var forecast = new Forecast({
    service: 'forecast.io',
    key: '221d52607c35ab577c6042049110a520',
    units: 'farenheit',
    cache: true,
    ttl: {
        minutes: 25,
        seconds: 45
    }
});

router.get('/', function(req, res) {

    forecast.get([34.2653, -117.1865], function(err, weather) {
        if (err) return console.dir(err);
        /*console.dir(weather);*/

        res.send(weather);
    });
});
module.exports = router;
