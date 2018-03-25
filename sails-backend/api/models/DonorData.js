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

    ASK_AMT: { type: "String", size: 12 },
    BU_CITY: { type: 'String', size: 225 },
    BU_EMAIL: { type: 'String', size: 225 },
    BU_NATN_DESC: { type: 'String', size: 225 },
    BU_PHONE: { type: 'String', size: 225 },
    BU_PHONE_EXT: { type: 'String', size: 225 },
    BU_STATE: { type: 'String', size: 225 },
    BU_STREET_LINE1: { type: 'String', size: 225 },
    BU_STREET_LINE2: { type: 'String', size: 225 },
    BU_STREET_LINE3: { type: 'String', size: 225 },
    BU_ZIP: { type: 'String', size: 225 },
    CASL: { type: 'String', size: 225 },
    CE_PHONE: { type: 'String', size: 225 },
    COMB: { type: 'String', size: 225 },
    CLUB_NAME: { type: 'String', size: 225 },
    DONOR_ID: { type: 'String', size: 225, unique: true },
    DONOR_FIRST_NAME: { type: 'String', size: 225 },
    DONOR_LAST_NAME: { type: 'String', size: 225 },
    DONOR_NAME_PREFIX: { type: 'String', size: 225 },
    DONOR_NAME_SUFFIX: { type: 'String', size: 225 },
    DONOR_MIDDLE_NAME: { type: 'String', size: 225 },
    DONOR_MAIDEN: { type: 'String', size: 225 },
    DONOR_PREF_CLASS: { type: 'String', size: 225 },
    HC_0: { type: 'String', size: 225 },
    HC_1: { type: 'String', size: 225 },
    HC_2: { type: 'String', size: 225 },
    MAJOR: { type: 'String', size: 225 },
    MINOR: { type: 'String', size: 225 },
    ORG: { type: 'String', size: 225 },
    POSITION: { type: 'String', size: 225 },
    PP3_0: { type: 'String', size: 225, columnName: "3PP_0" },
    PP3_1: { type: 'String', size: 225, columnName: "3PP_1" },
    PP3_2: { type: 'String', size: 225, columnName: "3PP_2" },
    PREFERRED_EMAIL_ADDRESS: { type: 'String', size: 225 },
    SC_0: { type: 'String', size: 225 },
    SC_1: { type: 'String', size: 225 },
    SC_2: { type: 'String', size: 225 },
    SPOUSE_PIDM: { type: 'String', size: 225 },
    SPOUSE_ID: { type: 'String', size: 225 },
    SPOUSE_NAME_PREFIX: { type: 'String', size: 225 },
    SPOUSE_FIRST_NAME: { type: 'String', size: 225 },
    SPOUSE_MIDDLE_NAME: { type: 'String', size: 225 },
    SPOUSE_MAIDEN: { type: 'String', size: 225 },
    SPOUSE_LAST_NAME: { type: 'String', size: 225 },
    SPOUSE_NAME_SUFFIX: { type: 'String', size: 225 },
    SPOUSE_PREF_CLAS: { type: 'String', size: 225 },
    UV_STREET_LINE1: { type: 'String', size: 225 },
    UV_STREET_LINE2: { type: 'String', size: 225 },
    UV_STREET_LINE3: { type: 'String', size: 225 },
    UV_CITY: { type: 'String', size: 225 },
    UV_STATE: { type: 'String', size: 225 },
    UV_ZIP: { type: 'String', size: 225 },
    UV_NATN_DESC: { type: 'String', size: 225 },
    UV_PHONE: { type: 'String', size: 225 },

  },
  connection: 'oraservdb'
};

