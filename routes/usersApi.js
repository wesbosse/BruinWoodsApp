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
    //TODO: Implement put request
    /*.put(function(req, res) {
        User.find({username : req.user.username}, function(err, user) {

        })
    });*/


router.route('/:eventId')
    .put(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
        function(req, res) {

    	/*User.find( {username: req.user.id } )
    		.then(function() {

    		});*/

        User.find({username: req.user._id}, function(err, user) {
            Event.findById(req.params.eventId, function(err, event) {
                if (err || !event) {
                    return res.send(500);
                }
                user.events.push(event);
                return res.json(user.events._id);
            });
        });
    });


module.exports = router;
