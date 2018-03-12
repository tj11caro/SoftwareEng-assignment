/**
 * Testusers.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  // scheme: true,
  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  attributes: {
    isAdmin: {
      type: 'boolean',
    },
    username: {
      type: 'string',
      required: true,
      size: 20
    },
    password: {
      type: 'string',
      required: true,
      size: 25
    },
    email: {
      type: 'string',
      email: true,
      primaryKey: true,
      required: true,
      size: 45
    },
  },
  connection: 'oraservdb'
};

