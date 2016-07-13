var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var Info = mongoose.model('info');

router.route('/')
    //get all info
    .get(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
        function(req, res) {
            Info.find({}, function(err, infos) {
                if (err) {
                    return res.send(500, err);
                }
                return res.json(infos);
            });
        })

//create new info
.post(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
    function(req, res) {
        var info = new Info();
        info.name = req.body.name;
        info.created_by = req.user.username;
        info.created_date = Date.now();
        info.url = req.body.url;
        info.description = req.body.description;
        info.order = req.body.order;
        info.active = req.body.active;
        info.type = req.body.type;
        info.save(function(err, newInfo) {
                if (err) {
                    return res.status(500).json(err);
                } else {
                    return res.status(200).json(info);
                }
            })
            /*info.schedules.push(req.body.schedules);*/
    });

router.route('/active')
    .get(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
        function(req, res) {
            Info.find({ active: true }, function(err, infos) {
                if (err) {
                    return res.status(500).json("error");
                } else {
                    return res.status(200).json(infos);
                }
            });
        })
    .put(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
        function(req, res) {
            req.infos.forEach(function(item) {
                Info.find({ name: item.name }, function(err, info) {
                    info.active = item.active;
                    info.save(function(err, success) {
                        if (err) {
                            return res.status(500).json(err);
                        }
                    });
                });
            });
        });

router.route('/:id')
    //get specific info
    .get(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
        function(req, res) {
            Info.findById(req.params.id, function(err, info) {
                if (err) {
                    return res.send(500, err);
                } else {
                    return res.json(info);
                }
            });
        })
    //delete specific info
    .delete(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
        function(req, res) {
            Info.remove({ _id: req.params.id }, function(err, info) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json("deleted");
            });
        })

//edit specific info
.put(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
    function(req, res) {
        Info.findById(req.params.id, function(err, info) {
            if (err) {
                return res.send(500, err);
            }
            info.name = req.body.name;
            info.url = req.body.url;
            info.description = req.body.description;
            info.order = req.body.order;
            info.active = req.body.active;

            /*info.schedules.push(req.body.schedules);*/
            info.save(function(err, success) {
                if (err) {
                	console.log(err);
                    return res.status(500).json(err);
                }
                if (success) {
                	return res.status(200).json(success);
                }
            });
        });
    });

module.exports = router;
