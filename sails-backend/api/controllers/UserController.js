/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var newId;
module.exports = {

    show: function (req, res) {
        // res.view("Gen/connect");
    },

    getUserAccounts: function (req, res) {

        User.find({}).exec(function (err, users) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0002' });
            }
            res.json({ users: users });
        });
    },

    user: function (req, res) {

        User.find({}).exec(function (err, users) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0002' });
            }
            res.json({ users: users });
        });
    },



    //              Generic     Account       Creation         Of User            

    create: function (req, res, next) {

        //This is the method responsible for creating a new User
        //By default the user will be a developer and sent to the volunteers page.
        var creater = function (newId) {
            req.params.pidm = "dev-" + newId;
            req.params.userType = "developer";
            User.create(
                req.params.all(), function userCreated(err, user) {
                    if (err) {
                        req.session.flash = {
                            err: err
                        }
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Client-Error~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        console.log(req.session.flash.err);
                        return res.redirect('gen/signup');
                    }


                    var oldDateObj = new Date();
                    var newDateOdj = new Date(oldDateObj.getTime() + 86400 * 1000);//One Day
                    req.session.cookie.expires = newDateOdj;
                    req.session.authenticated = true;

                    sails.log(req.session);
                    req.session.user = user;
                    res.redirect("/Gen/connect");
                }
            );
        }

        //This section is for Developers to generate proxy pidms for testing.
        if (newId == null) {
            //This is a query to find the highest identification and makeing a new ID
            User.query("SELECT MAX(pidm) FROM user", function (err, result) {
                if (err) {
                    console.log("Sorry Error Occurred");
                }
                var value = parseInt(/\d+/.exec(result[0]["MAX(pidm)"])[0]);
                newId = value + 1;
                //After the ID is generated we call the real create method
                creater(newId);
            });
        } else {
            //After the ID is generated we call the real create method
            creater(newId);
            newId = newId + 1;
        }
    },

    find: function (req, res) {
        return User.find().exec(function (err, user) {
            //General Error Detection
            if (err) { return next(err); }
        });
    },

    login: function (req, res, next) {
        console.log(req.params.all());
        if (!req.param('email') || !req.param('password')) {
            var missInput = [{ name: 'usernamePasswordRequired', message: 'You need to provide the appropriate credentials' }];
            req.session.flash = {
                err: missInput
            }
            res.redirect('gen/signup');
            return;
        }
        User.findOne({ email: req.param('email') }).exec(function (err, user) {
            //General Error Detection
            if (err) { return next(err); }
            //No user Found With Email
            if (!user) {
                var missUser = [{ name: 'noUserFound', message: 'Incorrect Credentials' }];
                req.session.flash = {
                    err: missUser
                }
                res.redirect('gen/signup');
                return;
            }
            //
            var bcrypt = require('bcrypt');
            bcrypt.compare(req.param('password'), user.password, function (err, valid) {
                //General Error Detection
                if (err) { return next(err); }
                //Password is Incorrect
                if (!valid) {
                    var missUser = [{ name: 'noUserFound', message: 'Incorrect Credentials' }];
                    req.session.flash = {
                        err: missUser
                    }
                    res.redirect('gen/signup');
                    return;
                }
                var oldDateObj = new Date();
                var newDateOdj = new Date(oldDateObj.getTime() + 86400 * 1000);//One Day
                req.session.cookie.expires = newDateOdj;
                req.session.authenticated = true;

                console.log(req.session);
                req.session.user = user;
                res.redirect('/');
            });
        });
    },

    list: function (req, res) {
        User.find({}).exec(function (err, user) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0002' });
            }
            res.view('sb-admin-layout/pages/listUser', { user: user });
        });
    },
};

