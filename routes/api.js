var express = require('express');
var router = express.Router();

/* GET events page. */
router.use(function(req, res, next){

	if(req.method === "GET"){
		//continue to the next middleware or request handler
		return next();
	}	

	if(!req.isAuthenticated()){
		res.redirect('/#login');
	}
});
router.route('/events')

	//returns all events
	.get(function(req, res){

		//temporary solution
		res.send({message: 'Return all events'})
	})

 
	.post(function(req, res){

		//temporary solution
		res.send({message: 'Create a new event'})
	});

router.route('/events/:id')	

	//returns a particular posts
	.get(function(req, res){

		res.send({message: 'EVENT return event with ID ' + req.params.id})
	})

	//update existing event 
	.put(function(req, res){

		res.send({message: 'EVENT modify event with ID ' + req.params.id})
	})

	//delete existing post
	.delete(function(req, res){

		res.send({message: 'EVENT delete event with ID' + req.params.id})
	});

module.exports = router;


