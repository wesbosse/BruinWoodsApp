var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Schedule = mongoose.model('schedule');
var Event = mongoose.model('event');

router.route('/')
    /*.options(function(req, res, next) {
        res.status(200).end();
        next();
    })*/
    .post(passport.authenticate(['jwt', 'facebook-token'], { session: false}),
        function(req, res) {
            var schedule = new Schedule();
            schedule.name = req.body.name;
            schedule.created_by = req.user.username;
            schedule.startDate = req.body.startDate;
            schedule.endDate = req.body.endDate;

            schedule.save(function(err, schedule) {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(200).json(schedule);
            });
        })
    .get(passport.authenticate(['jwt', 'facebook-token'], { session: false}),
        function(req, res) {
            Schedule.find({})
                .populate('eventIds')
                .exec(function(err, schedules) {
                    if (err) {
                        return res.status(500).json(err);
                    } else {
                        return res.status(200).json(schedules);
                    }
                });

        });

router.route('/:id')
    .delete(passport.authenticate(['jwt', 'facebook-token'], { session: false}),
        function(req, res) {
            Schedule.remove({ _id: req.params.id }, function(err, schedule) {
                if (err) {
                    return res.status(500).json(err);
                }
                req.json("deleted");
            });
        })
    .put(passport.authenticate(['jwt', 'facebook-token'], { session: false}),
        function(req, res) {
            Info.findById(req.params.id, function(err, schedule) {
                if (err) {
                    return res.status(500).json(err);
                }
                schedule.name = req.body.name;
                schedule.created_By = req.user.username;
                schedule.startDate = req.body.description;
                schedule.endDate = req.body.order;
                schedule.eventIds.push(req.body.eventIds);
                return res.status(200);
            });
        })
    .get(passport.authenticate(['jwt', 'facebook-token'], { session: false}),
        function(req, res) {
            Schedule.findById(req.params.id)
                .populate('eventIds')
                .exec(function(err, schedule) {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).json(schedule);
                    }
                });
        });

module.exports = router;
