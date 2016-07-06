 var express = require('express');
 var router = express.Router();
 var passport = require('passport');
 var mongoose = require('mongoose');
 var Event = mongoose.model('event');
 var Schedule = mongoose.model('schedule');

 router.route('/')

 //returns all events
 .get(
     passport.authenticate(['jwt', 'facebook-token'], { session: false }),
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

 .post(
     passport.authenticate(['jwt', 'facebook-token'], { session: false }),
     function(req, res) {
         var event = new Event();
         event.name = req.body.name;
         event.description = req.body.description;
         event.startTime = req.body.startTime;
         event.endTime = req.body.endTime;
         event.created_By = req.user.username;
         event.location = req.body.location;
         event.category = req.body.category;
         event.scheduleIds.push(req.body.scheduleIds);
         /*event.schedule = req.body.schedule;*/
         event.save(function(err, event) {
             if (err) {
                 return res.send(500, err);
             }
             return res.json(event);
         });
         event.scheduleIds.forEach(function(scheduleId) {
             Schedule.findById(req.body.scheduleIds, function(err, schedule) {
                 console.log(schedule);
                 console.log(event._id);
                 schedule.eventIds.push(event._id);
                 schedule.save(function(err, schedule) {
                     if (err) {
                         return res.status(500).json(err);
                     }
                 });
             });
         });



     });

 router.route('/:id')

 //returns one event
 .get(function(req, res) {
     passport.authenticate(['jwt', 'facebook-token'], { session: false }),
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
 .put(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
     function(req, res) {
         Event.findById(req.params.id, function(err, event) {
             if (err) {
                 return res.send(err);
             }
             event.description = req.body.description;
             event.startTime = req.body.startTime;
             event.endTime = req.body.endTime
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
 .delete(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
     function(req, res) {
         Event.remove({ _id: req.params.id }, function(err, event) {
             if (err) {
                 return res.send(err);
             }
             res.json("deleted");
         });
     });

 module.exports = router;
