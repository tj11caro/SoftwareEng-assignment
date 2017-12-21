/**
 * VolunteerAPI.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoPK:false,
  attributes: {    
    pidm  :{
      type:'string',
      primaryKey:true,
      required:true,
      size:15
    },
    fname :{
      type:'string',
      size:20
    },
    lname :{
      type:'string',
      size:25
    },    
    email :{
      type:'string',
      email:true,
      required:true,
      size:45
    },
    password:{
      type:'string',
      required:true,
      size:35
    },    
    phone:{
      type:'string',
      required:true,
      size:15
    },
  },
  connection: 'annualfunddb'
};

