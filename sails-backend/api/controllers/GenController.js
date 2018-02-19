/**
 * GenController
 *
 * @description :: Server-side logic for managing gens
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `GenController.view()`
   */
  // show: function (req, res) {
  //   var page = req.param('page');
  //   // console.log(new Date());
  //   // console.log(req.session.authenticated);
  //   res.view('gen/pages/' + page);
  // },

  connect: function (req, res) {
    console.log("req.session.authenticated", req.session.authenticated);
    if (req.session.authenticated) {
      if (req.session.user.userType == "admin") {
        res.view("sb-admin-layout/admin/admin", { layout: 'sb-admin-layout/admin/admin-layout' });

      } else if (req.session.user.userType == "developer") {
        res.view("sb-admin-layout/admin/admin", { layout: "views/sb-admin-layout/admin/admin-layout" });

      } else if (req.session.user.userType == "volunteer") {
        res.view("sb-admin-layout/volunteer/select-prospects", { layout: 'sb-admin-layout/volunteer/volunteer-layout' });

      } else {
        res.send(500, { error: 'User Type Unknown #001' });
      }
    } else {
      res.view("gen/pages/signup");
    }
  }
};

