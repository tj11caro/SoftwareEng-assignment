/**
 * DonorData.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  autoPK: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {

    PIDM_KEY: { type: 'integer', size: 11, required: true, primaryKey: true, },

    BU_CITY: { type: 'String', size: 225, defaultTo: "", },
    BU_EMAIL: { type: 'String', size: 225, defaultTo: "", },
    BU_NATN_DESC: { type: 'String', size: 225, defaultTo: "", },
    BU_PHONE: { type: 'String', size: 225, defaultTo: "", },
    BU_PHONE_EXT: { type: 'String', size: 225, defaultTo: "", },
    BU_STATE: { type: 'String', size: 225, defaultTo: "", },
    BU_STREET_LINE1: { type: 'String', size: 225, defaultTo: "", },
    BU_STREET_LINE2: { type: 'String', size: 225, defaultTo: "", },
    BU_STREET_LINE3: { type: 'String', size: 225, defaultTo: "", },
    BU_ZIP: { type: 'String', size: 225, defaultTo: "", },
    CASL: { type: 'String', size: 225, defaultTo: "", },
    CE_PHONE: { type: 'String', size: 225, defaultTo: "", },
    COMB: { type: 'String', size: 225, defaultTo: "", },
    CLUB_NAME: { type: 'String', size: 225, defaultTo: "", },
    DONOR_ID: { type: 'String', size: 225, defaultTo: "", unique: true },
    DONOR_FIRST_NAME: { type: 'String', size: 225, defaultTo: "", },
    DONOR_LAST_NAME: { type: 'String', size: 225, defaultTo: "", },
    DONOR_NAME_PREFIX: { type: 'String', size: 225, defaultTo: "", },
    DONOR_NAME_SUFFIX: { type: 'String', size: 225, defaultTo: "", },
    DONOR_MIDDLE_NAME: { type: 'String', size: 225, defaultTo: "", },
    DONOR_MAIDEN: { type: 'String', size: 225, defaultTo: "", },
    DONOR_PREF_CLASS: { type: 'String', size: 225, defaultTo: "", },
    HC_0: { type: 'String', size: 225, defaultTo: "", },
    HC_1: { type: 'String', size: 225, defaultTo: "", },
    HC_2: { type: 'String', size: 225, defaultTo: "", },
    MAJOR: { type: 'String', size: 225, defaultTo: "", },
    MINOR: { type: 'String', size: 225, defaultTo: "", },
    ORG: { type: 'String', size: 225, defaultTo: "", },
    POSITION: { type: 'String', size: 225, defaultTo: "", },
    PP3_0: { type: 'String', size: 225, defaultTo: "", columnName: "3PP_0" },
    PP3_1: { type: 'String', size: 225, defaultTo: "", columnName: "3PP_1" },
    PP3_2: { type: 'String', size: 225, defaultTo: "", columnName: "3PP_2" },
    PREFERRED_EMAIL_ADDRESS: { type: 'String', size: 225, defaultTo: "", },
    SC_0: { type: 'String', size: 225, defaultTo: "", },
    SC_1: { type: 'String', size: 225, defaultTo: "", },
    SC_2: { type: 'String', size: 225, defaultTo: "", },
    SPOUSE_PIDM: { type: 'String', size: 225, defaultTo: "", },
    SPOUSE_ID: { type: 'String', size: 225, defaultTo: "", },
    SPOUSE_NAME_PREFIX: { type: 'String', size: 225, defaultTo: "", },
    SPOUSE_FIRST_NAME: { type: 'String', size: 225, defaultTo: "", },
    SPOUSE_MIDDLE_NAME: { type: 'String', size: 225, defaultTo: "", },
    SPOUSE_MAIDEN: { type: 'String', size: 225, defaultTo: "", },
    SPOUSE_LAST_NAME: { type: 'String', size: 225, defaultTo: "", },
    SPOUSE_NAME_SUFFIX: { type: 'String', size: 225, defaultTo: "", },
    SPOUSE_PREF_CLAS: { type: 'String', size: 225, defaultTo: "", },
    UV_STREET_LINE1: { type: 'String', size: 225, defaultTo: "", },
    UV_STREET_LINE2: { type: 'String', size: 225, defaultTo: "", },
    UV_STREET_LINE3: { type: 'String', size: 225, defaultTo: "", },
    UV_CITY: { type: 'String', size: 225, defaultTo: "", },
    UV_STATE: { type: 'String', size: 225, defaultTo: "", },
    UV_ZIP: { type: 'String', size: 225, defaultTo: "", },
    UV_NATN_DESC: { type: 'String', size: 225, defaultTo: "", },
    UV_PHONE: { type: 'String', size: 225, defaultTo: "", },

  },
  connection: 'oraservdb'
};

