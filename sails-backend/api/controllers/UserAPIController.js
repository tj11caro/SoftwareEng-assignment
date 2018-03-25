/**
 * UserAPIController.js
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getSession: function (req, res) {
        if (!req.session.user) {
            console.log(" req.session.user is not Defined")
            return res.send(401, { err: "No Session Found" });
        }
        res.json(req.session.user);
    },

    getUserAccounts: function (req, res) {
        UserAPI.find({}).exec(function (err, users) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0002' });
            }
            res.json(users);
        });
    },

    getAvailableProspects: function (req, res) {
        var query = "SELECT * FROM donordata d LEFT JOIN lafapi laf ON d.PIDM_KEY = laf.DONOR_PIDM_KEY WHERE laf.DONOR_PIDM_KEY IS NULL";
        DonorData.query(query, null, function (err, result) {
            res.json(result);
        });
    },

    //              Generic     Account       Creation         Of User            
    signup: function (req, res) {
        var volPidm = req.param('vpidm');
        var volEmail = req.param('vemail');
        var volPassword = req.param('vpassword');
        if (req.session.user.userType = "admin") {
            UserAPI.create(
                {
                    pidm: volPidm,
                    email: volEmail,
                    password: volPassword,
                    userType: "volunteer"
                }, function userCreated(err, user) {
                    if (err) {
                        req.session.flash = {
                            err: err
                        }
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Client-Error~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        console.log(req.session.flash.err);
                        return res.redirect('/project/login.html');
                    }

                    var oldDateObj = new Date();
                    var newDateOdj = new Date(oldDateObj.getTime() + 86400 * 1000);//One Day
                    req.session.cookie.expires = newDateOdj;
                    req.session.authenticated = true;

                }
            );
        } else {
            res.send(401, { err: "Unauthorized Access" });
        }
    },

    logout: function (req, res) {
        req.session.user = null;
        return res.send(200);
    },

    login: function (req, res) {
        var password = req.param('password');
        if (!req.param('email') || !password) {
            var missInput = [{ name: 'usernamePasswordRequired', message: 'You need to provide the appropriate credentials' }];
            req.session.flash = {
                err: missInput
            }
            res.redirect('/project/login.html');
        }
        UserAPI.findOne({ email: req.param('email') }).exec(function (err, user) {
            //General Error Detection
            if (err) {
                return next(err);
            }
            //No user Found With Email
            if (!user) {
                var missUser = [{ name: 'noUserFound', message: 'Invalid Credentials' }];
                req.session.flash = {
                    err: missUser
                }
                console.log(req.session.flash.err);
                return res.send(401, { err: "Invalid Credentials" });
            }

            var bcrypt = require('bcrypt-nodejs');
            bcrypt.compare(password, user.ePassword, function (err, valid) {
                //General Error Detection
                if (err) {
                    return next(err);
                }
                //Password is Incorrect
                if (!valid) {
                    var missUser = [{ name: 'noUserFound', message: 'Incorrect Credentials' }];
                    req.session.flash = {
                        err: missUser
                    }
                    return res.send(401, { err: "Invalid Credentials" });
                }
                var oldDateObj = new Date();
                var newDateOdj = new Date(oldDateObj.getTime() + 86400 * 1000);//One Day
                req.session.cookie.expires = newDateOdj;
                req.session.authenticated = true;

                req.session.user = user;
                res.json(req.session.user);
            });
        });
    },

    createAdmin: function (req, res) {

        var adminEmail = req.param('email');
        var adminPassword = req.param('password');
        var adminPidm = req.param('pidm');
        if (req.param('security_code') !== "Q23rhvdb46-zrpb4yw") {
            var ip = (req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress).split(",")[0];

            sails.log.error("Incorrect Security Code Entered in Create New Admin. \n\tIP Address = " + ip);

        } else {
            UserAPI.create(
                {
                    email: adminEmail,
                    pidm: adminPidm,
                    ePassword: adminPassword,
                    userType: "admin"
                }, function userapiCreated(err, user) {
                    if (err) {
                        req.session.flash = {
                            err: err
                        }
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Client-Error~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        sails.log.error(req.session.flash.err);
                        return res.send(401, { err: "Invalid Credentials" });
                    }

                    var oldDateObj = new Date();
                    var newDateOdj = new Date(oldDateObj.getTime() + 86400 * 1000);//One Day
                    req.session.cookie.expires = newDateOdj;
                    req.session.authenticated = true;

                    sails.log(req.session);
                    req.session.user = user;
                    return res.json(user);
                }
            );
        }
    },
};

