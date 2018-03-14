/**
 * TestableController
 *
 * @description :: Server-side logic for managing testables
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    postAssignUser: function (req, res) {
        var pidm = req.param("pidm");
        var user = req.param("user");
        TESTTABLE1.update({ "PIDM_KEY": pidm },
            { "AF_ASSIGNED_USER": user }).exec(function (err, results) {
                console.log("Inside Update Lets see whats up", results);
                res.json({ results: result });
            });
    },

    getUserProspects: function (req, res) {
        var userEmail = req.param("userEmail");
        if (userEmail === undefined || userEmail === "") {
            userEmail == "tj11caro@siena.edu"
        }
        TESTTABLE1.find({ "AF_ASSIGNED_USER": userEmail }).exec(function (err, result) {
            res.json({ result: result });
        });
    },

    getProspects: function (req, res) {
        TESTTABLE1.find({}).exec(function (err, result) {
            res.json({ result: result });
        });
    },

    getUserAccounts: function (req, res) {
        Testusers.find({}).exec(function (err, result) {
            res.json({ result: result });
        });
    },
};

