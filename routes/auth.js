var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var JwtStrategy = require('passport-jwt').Strategy;

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
    router.post('/login',
        passport.authenticate('local', {
            session: false
        }),
        function(req, res) {
            var token = jwt.encode(req.user._id, 'keyboard cat');
            res.status(200).json({ state: 'success', token: token, user: req.user.username ? req.user : null });
        });

    //sign up
    router.post('/signup',
        passport.authenticate('signup'),
        function(req, res) {
            res.json({ state: 'success', user: req.user.username ? req.user : null });
        });

    //log out
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    router.post('/facebook/token/',
        passport.authenticate('facebook-token'),
        function(req, res) {
            // do something with req.user
            res.send(req.user ? 200 : 401);
        }
    );

    return router;

};
