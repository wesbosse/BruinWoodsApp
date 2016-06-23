var express = require('express');
var router = express.Router();

module.exports = function(passport) {

    //sends successful login state back to angular
    router.get('/success', function(req, res) {
        console.log(req)
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

    router.get('/facebook',
        passport.authenticate('facebook'));

    router.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/auth/success');
        });

    return router;

};
