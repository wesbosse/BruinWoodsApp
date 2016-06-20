var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schedule = mongoose.model('schedule');

router.use(function(req, res, next) {
    if (!req.isAuthenticated()) {
        console.log("not authenticated!");
        res.redirect('/#/login');
    }
    //if user authenticated send to next middleware or handler
    else {
        console.log("Authenticated!");
        return next();
    }
});

/*router.route('schedules')
	.post(function(req, res) {
		
	})*/

module.exports = router;