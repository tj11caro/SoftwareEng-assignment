/**
 * VolunteerAPIController
 *
 * @description :: Server-side logic for managing Volunteerapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getNote: function (req, res) {
        if (!req.session.user) {
            console.log(" req.session.user", req.session.user, " is not Defined");
            var err = "No Session Variable Established. Redirecting to Login";
            return res.json(err);
        }
        var donorPidm = req.param("pidm");
        LafAPI.findOne({ "DONOR_PIDM_KEY": donorPidm }).exec(function (err, result) {
            res.json({ notes: result.notes, flags: result.flags });
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
            console.log(ids);
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
        var notes = req.param("notes");

        LafAPI.update({ "DONOR_PIDM_KEY": donorPidm }, { "NOTES": notes }).exec(function (err, result) {
            res.json({ notes: result.notes, flags: result.flags });
        });
    },

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
            console.log(rawResult);
            res.json(rawResult);
        });
    }
};

