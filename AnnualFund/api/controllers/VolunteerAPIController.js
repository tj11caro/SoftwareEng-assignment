/**
 * VolunteerAPIController
 *
 * @description :: Server-side logic for managing Volunteerapis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
 
    // show: function (req, res) {
    //     var page=req.param('page');
    //     // console.log(new Date());
    //     // console.log(req.session.authenticated);
    //     res.view('sb-admin-layout/pages/admin/'+page);
    //   }

    /*
	list:function(req,res){
        Volunteer.find({}).exec(function(err,lafapi){
            if(err){
                res.send(500,{error:'Database Error'});
            }
            res.view('list',{lafapi:lafapi});
        });
    },
    create:function(req,res){
        var pidm=req.body.pidm;
        var fname=req.body.fname;
        var lname=req.body.lname;
        var email=req.body.email;
        var phone=req.body.phone;

        LafAPI.create({
            pidm:pidm,fname:fname, lname:lname, email:email, phone:phone
        }).exec(function(err){
            if(err){
                res.send(500,{error:'Database Entry Error'});
            }
            res.redirect('/LafAPI/list');
        });
    },
    */
};

