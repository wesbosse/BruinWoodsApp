var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Info = mongoose.model('info');

//authorization.
router.use(function(req, res) {
	//if not logged on redirect to login
	if (!req.isAuthenticated) {
		res.redirect('/#/login');
	}
	//go to next item
	else {
		return next();
	}
});

router.route('/infos')
	//get all info
	.get(function(req, res) {
		Info.find(function(err, infos) {
			if (err) {
				return res.send(500, err);
			}
			return res.json(infos);
		});
	})

	//create new info
	.post(function(req, res) {
		var info = new Info();
		info.name = req.body.name;
		info.created_by = req.user.username;
		info.url = req.body.url;
		info.description = req.body.description;
		info.order = req.body.order;
		info.schedules.push(req.body.schedules);
	});

router.route('/infos/:id')
	//get specific info
	.get(function(req, res) {
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
	.delete(function(req, res) {
		Info.remove({ _id: req.params.id}, function(err, event) {
			if (err) {
				return res.send(err);
			}
			req.json("deleted");
		});
	})

	//edit specific info
	.put(function(req, res) {
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