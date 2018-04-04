/**
 * AdminAPIController
 *
 * @description :: Server-side logic for managing Adminapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getAdminSession: function (req, res) {
        if (!req.session.user) {
            console.log(" req.session.user is not Defined")
            return res.send(401, { err: "No Session Found" });
        } else if (req.session.user.userType == "admin" || req.session.user.userType == "developer") {
            res.json(req.session.user);
        } else {
            res.send(401);
        }
    },

    getClaimedProspects: function (req, res) {
        var page = req.param("page");
        var range = req.param("range");
        var start = range * (page - 1);

        var query = "SELECT * FROM donordata d, lafapi laf WHERE d.PIDM_KEY = laf.DONOR_PIDM_KEY AND AF_ASSIGNED_USER > 0 LIMIT ? OFFSET ?";
        DonorData.query(query, [range, start], function (err, result) {
            // console.log(err);
            res.json(result);
        });
    },

    getUserAccounts: function (req, res) {
        User.find({}).exec(function (err, users) {
            if (err) {
                res.send(500, { error: 'Database Error ERR#0002' });
            }
            res.json({ users: users });
        });
    },

    getSomeProspects: function (req, res) {
        var page = req.param("page");
        var range = req.param("range");
        var start = range * (page - 1);
        DonorData.find({}).skip(start).limit(range).exec(function (err, result) {
            res.json(result);
        });
    },

    getExport: function (req, res) {
        var sample = req.param('excelData');
        DonorData.findOrCreate(sample).exec(function (err, result) {
            if (err) {
                sails.log.error(err);
            }
            sails.log(result);
        });
    },

    submitImport: function (req, res) {
        var sample = req.param('excelData');
        DonorData.findOrCreate(sample).exec(function (err, result) {
            if (err) {
                sails.log.error(err);
            }
            sails.log(result);
        });
    },

    submitUnclaim: function (req, res) {
        var donor = req.param("donor_pidm");
        var volunteer = req.param("volunteer_pidm");
        var status = req.param("status");
        console.log(donor, volunteer);
        if (status == "Already Donated") {
            LafAPI.update({ donor: donor },
                { AF_ASSIGNED_USER: "-1" }).exec(function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(500, { error: "Server Side Error ->" + err });
                    }
                    console.log(result);
                    res.json(result);
                });
        } else {
            LafAPI.destroy({ donor: donor }).exec(function (err, result) {
                if (err) {
                    console.log(err);
                    return res.send(500, { error: "Server Side Error ->" + err });
                }
                console.log(result);
                res.json(result);
            });
        }
    }
};

