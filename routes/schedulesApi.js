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

router.route('/schedules')
    .post(function(req, res) {
        schedule = new Schedule();
        schedule.name = req.body.name;
        schedule.created_By = req.user.username;
        schedule.startDate = req.body.startDate;
        schedule.endDate = req.body.endDate;

        schedule.save(function(err, schedule) {
            if (err) {
                return res.send(500, err);
            }
            return res.json(schedule);
        })
    })

module.exports = router;
