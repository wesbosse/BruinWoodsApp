var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = mongoose.model('event');
var User = mongoose.model('user');

router.use(function(req, res, next) {
    if (!req.Authenticated) {
        res.redirect('/#/login');
    } else {
        return next();
    }
});

router.route('/users')
    .get(function(req, res) {
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


router.route('/users/:eventId')
    .put(function(req, res) {

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
