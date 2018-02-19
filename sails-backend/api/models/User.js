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
    password: {
      type: 'string',
      required: true,
      size: 35
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
    if (!values.password || values.password != values.confirmation) {
      return next({ err: ["Password doesn't match password Confirmation ERR#0006"] });
    }

    require('bcrypt').hash(values.password, 10, function passwordEncrypter(err, password) {
      if (err) { return next(err); }
      values.password = password;
      values.online = true;
      next();
    });
  },

  connection: 'oraservdb'
};

