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

    /*
        getUserProspects: function (req, res) {
            var userEmail = req.param("userEmail");
            if (userEmail === undefined || userEmail === "") {
                userEmail == "tj11caro@siena.edu"
            }
            TESTTABLE1.find({ "AF_ASSIGNED_USER": userEmail }).exec(function (err, result) {
                res.json({ result: result });
            });
        },
    */
    getUserProspects: function (req, res) {
        if (!req.session.user) {
            console.log(" req.session.user", req.session.user, " is not Defined");
            var err = "No Session Variable Established. Redirecting to Login";
            return res.json(err);
        }
        DonorData.find({ "AF_ASSIGNED_USER": req.session.user.email }).exec(function (err, result) {
            res.json({ result: result });
        });
    },
    /*
        postAssignUser: function (req, res) {
            var pidm = req.param("pidm");
            var user = req.param("user");
            TESTTABLE1.update({ "PIDM_KEY": pidm },
                { "AF_ASSIGNED_USER": user }).exec(function (err, results) {
                    console.log("Inside Update Lets see whats up", results);
                    res.json({ results: result });
                });
        },
    */

    postAssignUser: function (req, res) {
        if (!req.session.user) {
            console.log(" req.session.user", req.session.user, " is not Defined");
            var err = "No Session Variable Established. Redirecting to Login";
            return res.json(err);
        }
        var donorPidm = req.param("pidm");
        LafAPI.update({ "DONOR_PIDM_KEY": donorPidm },
            { "AF_ASSIGNED_USER": req.session.user.pidm }).exec(function (err, results) {
                console.log("Inside Update Lets see whats up", results);
                res.json({ results: result });
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

