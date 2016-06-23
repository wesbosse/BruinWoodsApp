var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var Event = mongoose.model('event');

router.route('/events')

//returns all events
.get(
    passport.authenticate(['local', 'facebook-token']),
    function(req, res) {
        Event.find(function(err, data) {
            if (err) {
                res.send(500, err);
            }
            console.log(data);
            return res.send(data);
        });
    }
)

.post(function(req, res) {
    var event = new Event();
    event.description = req.body.description;
    event.startTime = req.body.startTime;
    event.endTime = req.body.endTime;
    event.created_By = req.user.username;
    event.location = req.body.location;
    event.category = req.body.category;
    /*event.schedule = req.body.schedule;*/
    event.save(function(err, event) {
        if (err) {
            return res.send(500, err);
        }
        return res.json(event);
    });
});

router.route('/events/:id')

//returns one event
.get(function(req, res) {
    isLoggedIn,
    Event.findById(req.params.id)
    .populate('scheduleIds')
    .exec(function(error, schedules) {
        console.log(JSON.stringify(schedules, null, "\t"))
    }).then(function(err, event) {
        if (err) {
            return res.send(err);
        }
        res.send(event);
    });
})

// post.save(function(error) {
//     if (!error) {
//         Post.find({})
//             .populate('postedBy')
//             .populate('comments.postedBy')
//             .exec(function(error, posts) {
//                 console.log(JSON.stringify(posts, null, "\t"))
//             })
//     }
// });

//updates an event
.put(function(req, res) {
    Event.findById(req.params.id, function(err, event) {
        if (err) {
            return res.send(err);
        }
        event.description = req.body.description;
        event.time = req.body.time;
        event.created_By = req.user.username;
        event.location = req.body.location;
        event.category = req.body.category;
        event.save(function(err, post) {
            if (err) {
                return res.send(500, err);
            }
            return res.json(event);
        });
    });
})

//deletes an event
.delete(function(req, res) {
    Event.remove({ _id: req.params.id }, function(err, event) {
        if (err) {
            return res.send(err);
        }
        res.json("deleted");
    });
});

function isLoggedIn(req, res, next) {
    console.log('checking if somebody is logged in');

    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
    } else {
        res.send(401);
    }
}

module.exports = router;
