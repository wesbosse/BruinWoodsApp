var express = require('express');
var router = express.Router();

module.exports = function(passport) {

    //sends successful login state back to angular
    router.get('/success', function(req, res) {
        console.log(req);
        res.json({ state: 'success', user: req.user.username ? req.user : null });
    });

    //sends failure login state back to angular
    router.get('/failure', function(req, res) {
        res.send({ state: 'failure', user: null, message: "Invalid username or password" });
    });

    //log in
    router.post('/login', passport.authenticate('local'/*, {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }*/),function(req,res) {
        res.json({ state: 'success', user: req.user.username ? req.user : null });
    });

    //sign up
    router.post('/signup', passport.authenticate('signup'/*, {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
        successFlash: true,
        failureFlash: true
    }*/),function(req,res) {
        res.json({ state: 'success', user: req.user.username ? req.user : null });
    });

    //log out
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.post('/cameroniscool', 
        passport.authenticate(['facebook-token', 'local']),
        function(req, res) {
            res.send(req.user ? 200 : 401);
        });

    router.post('/facebook/token',
      passport.authenticate('facebook-token'),
      function (req, res) {
        // do something with req.user
        res.send(req.user? 200 : 401);
      }
    );

    return router;

};
