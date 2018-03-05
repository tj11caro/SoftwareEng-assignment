/**
 * VolunteerAPIController
 *
 * @description :: Server-side logic for managing Volunteerapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    show: function (req, res) {
        var page = req.param('page');
        // console.log(new Date());
        // console.log(req.session.authenticated);
        res.view('sb-admin-layout/volunteer/' + page);
    },

    list: function (req, res) {
        AdminAPI.find().exec(function (err, jsonlist) {
            if (err) {
                res.send(500, { error: 'Database Error' });
            }
            console.log(jsonlist);
            return res.json({ data: jsonlist });
        });
    },
};

