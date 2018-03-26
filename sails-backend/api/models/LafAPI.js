/**
 * LafAPI.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    DONOR_PIDM_KEY: { type: 'integer', size: 11, required: true, primaryKey: true, },
    ASK_AMOUNT: { type: 'double', size: 11 },
    AF_ASSIGNED_USER: { type: 'integer', size: 11, required: true },
    NOTES: { type: "string", size: 1000 },
    FLAGS: { type: "string", size: 100 },
  }
};

