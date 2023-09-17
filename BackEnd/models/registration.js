const Sequelize= require('sequelize');
const configdb=require('./../config');
const event=require('./event');


const registration=configdb.define('registration', {

        registration_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true   
    },
   event_id:{
        type:Sequelize.INTEGER,
        allowNull:false,

    },
    first_name:{
        type:Sequelize.STRING,
        allowNull:false,
    },

    last_name:{
        type:Sequelize.STRING,
        allowNull:false,
    },

    age:{
        type:Sequelize.ENUM('under 13','13-17','18-29','30-39','40-49','50-59','60-69','70-79','80+'),
        allowNull:false,
    },
   
    gender:{
        type:Sequelize.ENUM('Male','Female','Other'),
        allowNull:false,
    },
   email:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    phone_number:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    distance_length:{
        type:Sequelize.ENUM('1KM','4KM','8KM'),
        allowNull:false,
    },
    address:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    postal_code:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    province:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    city:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    entry_type:{
        type:Sequelize.ENUM('General $12','CRR Member $8','Full-time student $6','child 12 & under Free'),
        allowNull:false,
    }



}, {timestamps:false});

module.exports=registration;