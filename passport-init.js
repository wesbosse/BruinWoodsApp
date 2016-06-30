var mongoose = require('mongoose');
var User = mongoose.model('user');
var LocalStrategy = require('passport-local').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');
var bCrypt = require('bcrypt-nodejs');


module.exports = function(passport) {

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        //tell passport which id to use for user
        return done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            //return user object back 
            return done(err, user);
        });
    });

    passport.use('local', new LocalStrategy({
            passReqToCallback: true
        },
        function(req, username, password, done) {
            console.log("hello!");
            // check in mongo if a user with username exists or not
            User.findOne({ 'username': username },
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log the error and redirect back
                    if (!user) {
                        console.log('User Not Found with username ' + username);
                        return done(null, false);
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)) {
                        console.log('Invalid Password');
                        return done(null, false); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            // find a user in mongo with provided username
            User.findOne({ 'username': username }, function(err, user) {
                // In case of any error, return using the done method
                if (err) {
                    console.log('Error in SignUp: ' + err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('User already exists with username: ' + username);
                    return done(null, false);
                } else {
                    // if there is no user, create the user
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.username = username;
                    newUser.password = createHash(password);
                    newUser.role = "user";

                    // save the user
                    newUser.save(function(err) {
                        if (err) {
                            console.log('Error in Saving user: ' + err);
                            throw err;
                        }
                        console.log(newUser.username + ' Registration succesful');
                        return done(null, newUser);
                    });
                }
            });
        }));

    passport.use(new FacebookTokenStrategy({
        clientID: "1195445567162414",
        clientSecret: "df71659b48405972e15a601d75f3a50b"
    }, function(accessToken, refreshToken, profile, done) {
        User.findOne({ 'facebook.fbid': profile.id }, function(err, user) {
            console.log(profile);
            if (err) return done(err);
            if (user) {
                done(null, user);
            } else {
                user = new User();

                console.log(profile);

                user.username = profile.emails[0].value;
                user.facebook.token = accessToken;
                user.facebookprofileUrl = profile.profileUrl;
                user.facebook.email = profile.emails[0].value;
                user.facebook.fbid = profile.id;
                user.facebook.displayName = profile.displayName;
                user.firstname = profile.name.givenName;
                user.lastname = profile.name.familyName;
                user.role = 'user';

                user.save(function(err) {
                    if (err) return done(err);
                    done(null, user);
                });
            }
        });
    }));

    // passport.use('facebook', new FacebookStrategy({
    //     clientID: "",
    //     clientSecret: "",
    //     callbackURL: "http://localhost:3000/auth/facebook/callback"
    // }, function(accessToken, refreshToken, profile, done) {
    //     process.nextTick(function() {
    //         User.findOne({ 'facebook.fbid': profile.id }, function(err, user) {
    //             console.log(profile);
    //             if (err) return done(err);
    //             if (user) {
    //                 done(null, user);
    //             } else {
    //                 

    //                 
    //             }
    //         });
    //     });
    // }));


    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};
