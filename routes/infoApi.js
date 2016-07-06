var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var Info = mongoose.model('info');

router.route('/')
	//get all info
	.get(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
		function(req, res) {
		Info.find(function(err, infos) {
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
		info.url = req.body.url;
		info.description = req.body.description;
		info.order = req.body.order;
		info.schedules.push(req.body.schedules);
	});

router.route('/:id')
	//get specific info
	.get(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
		function(req, res) {
		Info.findById(req.params.id, function(err, info) {
			if (err) {
				return res.send(500, err);
			}
			else {
				return res.json(info);
			}
		});
	})
	//delete specific info
	.delete(passport.authenticate(['jwt', 'facebook-token'], { session: false }),
		function(req, res) {
		Info.remove({ _id: req.params.id}, function(err, info) {
			if (err) {
				return res.send(err);
			}
			req.json("deleted");
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
			info.schedules.push(req.body.schedules);
		});
	});

	module.exports = router;