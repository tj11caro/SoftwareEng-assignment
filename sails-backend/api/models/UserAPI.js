/**
 * UserAPI.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    pidm: {
      type: 'string',
      primaryKey: true,
      required: true,
      size: 15
    },
    userType: {
      type: 'string',
      required: true,
      enum: ['admin', 'volunteer', 'developer']
    },
    fname: {
      type: 'string',
      size: 20
    },
    lname: {
      type: 'string',
      size: 25
    },
    email: {
      type: 'string',
      email: true,
      required: true,
      size: 45
    },
    ePassword: {
      type: 'string',
      required: true,
      size: 70
    },
    phone: {
      type: 'string',
      // required: true,
      size: 15
    },
  },

  toJSON: function () {
    var obj = this.toObject();
    // var jstring=json(obj);
    // delete jstring.password;
    // delete obj.confirmation;
    // delete obj.encryptedPassword;
    // delete obj._csrf;
    return obj;
  },

  beforeCreate: function (values, next) {

    //This commented-out code should be used for changing passwords
    if (!values.ePassword) {
      return next({ err: ["Password doesn't match doesn't Exist ERR#0006"] });
    }

    var bcrypter = require('bcrypt-nodejs')
    var salt = bcrypter.genSaltSync(10);
    bcrypter.hash(values.ePassword, salt, null, function passwordEncrypter(err, ePassword) {
      if (err) { return next(err); }
      values.ePassword = ePassword;
      values.online = true;
      next();
    });
  },

  connection: 'oraservdb'
};