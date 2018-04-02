/**
 * AdminAPIController
 *
 * @description :: Server-side logic for managing Adminapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
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
        console.log("AdminApi GetSomeProspects", page, range, start);

        DonorData.find({}).skip(start).limit(range).exec(function (err, result) {

            res.json(result);
        });
    },

    submitImport: function (req, res) {
        var sample = req.param('excelData');
        console.log(sample);
        DonorData.findOrCreate(sample).exec(function (err, result) {
            if (err) {
                sails.log.error(err);
            }
            sails.log(result);
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
    }

};

