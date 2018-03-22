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

    getAllProspects: function (req, res) {
        DonorData.find({}).exec(function (err, result) {
            res.json(result);
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

    getExport: function (req, res) {
        var sample = req.param('excelData');
        DonorData.create(sample).exec(function (err, result) {
            if (err) {
                sails.log.error(err);
            }
            sails.log(result);
        });
    }

};

