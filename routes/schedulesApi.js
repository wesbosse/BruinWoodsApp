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
        var schedule = new Schedule();
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
    .get(function(req, res) {
        Schedule.find(function(err, schedules) {
            if (err) {
                return res.send(500, err);
            }
            return res.json(schedules);
        });
    });

router.route('/schedules/:id')
    .delete(function(req, res) {
        Schedule.remove({ _id: req.params.id }, function(err, schedule) {
            if (err) {
                return res.send(err);
            }
            req.json("deleted");
        });
    })
    .put(function(req, res) {
        Info.findById(req.params.id, function(err, schedule) {
            if (err) {
                return res.send(500, err);
            }
            schedule.name = req.body.name;
            schedule.created_By = req.user.username;
            schedule.startDate = req.body.description;
            schedule.endDate = req.body.order;
            schedule.events.push(req.body.events);
        });
    })
    .get(function(req, res) {
        Schedule.findById(req.params.id, function(err, schedule) {
            if (err) {
                return res.send(500, err);
            } else {
                return res.json(schedule);
            }
        });
    });


module.exports = router;
