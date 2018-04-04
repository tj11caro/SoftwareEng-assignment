/**
 * VolunteerAPIController
 *
 * @description :: Server-side logic for managing Volunteerapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


var sanitation = function (str) {
    if (typeof str == "string") {
        str = str.split(";").join(" ");
        str = str.split("<").join(" ");
        str = str.split(">").join(" ");
    } return str;
};

module.exports = {

    buildQuery: function (req, res) {
        //Sanitation
        var array = [];
        req.param("Fname") ? array.push(req.param("Fname")) : "";
        req.param("Lname") ? array.push(req.param("Lname")) : "";
        req.param("Mname") ? array.push(req.param("Mname")) : "";
        req.param("GradYear") ? array.push(req.param("GradYear")) : "";
        req.param("City") ? array.push(req.param("City")) : "";
        req.param("Major") ? array.push(req.param("Major")) : "";
        req.param("Minor") ? array.push(req.param("Minor")) : "";
        req.param("Club") ? array.push(req.param("Club")) : "";

        DonorData.find({ tags: array }).exec(function (err, rawResult) {
            if (err) {

            }
            res.json(rawResult);
        });
    },

    getNote: function (req, res) {
        if (!req.session.user) {
            console.log(" req.session.user", req.session.user, " is not Defined");
            var err = "No Session Variable Established. Redirecting to Login";
            return res.json(err);
        }
        var donorPidm = req.param("pidm");
        LafAPI.findOne({ "DONOR_PIDM_KEY": donorPidm }).exec(function (err, result) {
            if (err) {
                console.log(err);
                res.send(500, { error: 'Database Error ERR#0003 =>' + err });
            }
            res.json({ notes: result.NOTES, flags: result.FLAGS, date: result.updatedAt, status: result.DONATION_STATUS });
        });
    },

    getAllMyNotes: function (req, res) {
        if (!req.session.user) {
            console.log(" req.session.user", req.session.user, " is not Defined");
            var err = "No Session Variable Established. Redirecting to Login";
            return res.json(err);
        }

        LafAPI.find({ "AF_ASSIGNED_USER": req.session.user.pidm }).exec(function (err, result) {
            if (err) {
                console.log(err);
                res.send(500, { error: 'Database Error ERR#0003 =>' + err });
            }
            ids = result.map(function (obj) { return obj.DONOR_PIDM_KEY });
            DonorData.find({ "PIDM_KEY": ids }).exec(function (errs, results) {
                if (errs) {
                    console.log(err, " and ", errs);
                    res.send(500, { error: 'Database Error ERR#0002 =>' + err });
                }
                var combined = results.map((msg) => {
                    var haveEqualId = (user) => user.PIDM_KEY === msg.DONOR_KEY_PIDM
                    var userWithEqualId = result.find(haveEqualId)
                    return Object.assign({}, msg, userWithEqualId)
                });
                console.log(combined);
                res.json(combined);
            });
        });
    },

    getMyProspects: function (req, res) {
        if (!req.session.user) {
            console.log(" req.session.user", req.session.user, " is not Defined");
            var err = "No Session Variable Established. Redirecting to Login";
            return res.json(err);
        }
        var page = req.param("page");
        var range = req.param("range");
        var start = range * (page - 1);
        LafAPI.find({ "AF_ASSIGNED_USER": req.session.user.pidm }).skip(start).limit(range).exec(function (err, results) {
            ids = results.map(function (obj) { return obj.DONOR_PIDM_KEY });
            DonorData.find({ "PIDM_KEY": ids }).exec(function (errs, result) {
                if (errs) {
                    console.log(err, " and ", errs);
                    res.send(500, { error: 'Database Error ERR#0002 =>' + err });
                }
                res.json(result);
            });
        });
    },

    postAssignUser: function (req, res) {
        if (!req.session.user) {
            console.log("req.session.user", req.session.user, " is not Defined");
            var err = "No Session Variable Established. Redirecting to Login";
            return res.json(err);
        }
        var donorPidm = req.param("pidm");
        donorPidm = sanitation(donorPidm);
        DonorData.findOne({ PIDM_KEY: donorPidm }).exec(function (err, result) {
            LafAPI.findOrCreate({ DONOR_PIDM_KEY: result['PIDM_KEY'] },
                {
                    DONOR_PIDM_KEY: result.PIDM_KEY,
                    ASK_AMOUNT: result.ASK_AMT,
                    AF_ASSIGNED_USER: req.session.user.pidm
                }).exec(function (err, result) {
                    if (err) {
                        sails.log.error(err);
                    }
                    sails.log(result);
                });
        });


        LafAPI.update({ "DONOR_PIDM_KEY": donorPidm },
            { "AF_ASSIGNED_USER": req.session.user.pidm }).exec(function (err, results) {
                console.log("Inside Update Lets see whats up");
                res.json({ results: results });
            });
    },

    postNote: function (req, res) {
        if (!req.session.user) {
            console.log(" req.session.user", req.session.user, " is not Defined");
            var err = "No Session Variable Established. Redirecting to Login";
            return res.json(err);
        }
        var donorPidm = req.param("pidm");
        var message = req.param("message");
        var flag = req.param("flag");
        var status = req.param("status");

        message = sanitation(message);
        status = sanitation(status);
        flag = sanitation(flag);
        donorPidm = sanitation(donorPidm);
        LafAPI.update({ "DONOR_PIDM_KEY": donorPidm },
            {
                "NOTES": message, "FLAGS": flag, "DONATION_STATUS": status
            }).exec(function (err, result) {
                res.json({
                    message: result.NOTES, flags: result.FLAGS, status: result.DONATION_STATUS
                });
            });
    },
};

