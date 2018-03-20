/**
 * VolunteerAPIController
 *
 * @description :: Server-side logic for managing Volunteerapis
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

    buildQuery: function (req, res) {
        //Sanitation
        var query = req.param("newQuery");
        TESTTABLE1.query(query, function (err, rawResult) {
            if (err) {

            }
            res.json(rawResult);
        });
    }
};

