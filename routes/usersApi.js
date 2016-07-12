var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = mongoose.model('event');
var User = mongoose.model('user');
var passport = require('passport');

router.route('/')
    .get(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
        function(req, res) {
            User.findById(req.user.id, function(err, user) {
                if (err || !user) {
                    return res.send(500, err);
                }
                return res.json(user);
            });
        });

router.route('/events')
    .get(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
        function(req, res) {
            User.findById(req.user._id)
                .populate('eventIds')
                .exec(function(err, user) {
                    if (err) {
                        return res.status(500).json(err);
                    } else {
                        return res.status(200).json(user);
                    }
                })
        })

router.route('/:eventId')
    .put(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
        function(req, res) {
            User.findById(req.user._id, function(err, user) {
                
                /*user.eventIds.forEach(function(id) {
                                    if (id === req.params.eventId) {
                                        return res.status(500).send("already exists");
                                    } else {
                                        user.eventIds.push(req.params.eventId);
                                        user.save(function(err, sucess) {
                                            if (err) {
                                                return res.status(500);
                                            } else {
                                                return res.status(200);
                                            }
                                        });            
                                    }
                                });*/
                if (err) {
                    return res.status(500);
                }
                user.eventIds.push(req.params.eventId);
                user.save(function(err, sucess) {
                    if (err) {
                        return res.status(500);
                    } else {
                        return res.status(200).json(user.eventIds);
                    }
                });

            });

        });


module.exports = router;
