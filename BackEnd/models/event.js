const Sequelize= require('sequelize');
const configdb=require('./../config');
const registration = require('./registration');


const event=configdb.define('event', {

    event_id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true   
    },

    event_name:{
        type:Sequelize.TEXT,
        allowNull:false,
    },

    event_date:{
        type:Sequelize.DATE,
        allowNull:false,
    },

    event_location:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    event_description:{
        type:Sequelize.TEXT,
        allowNull:true,
    },
    event_image:{
        type:Sequelize.TEXT,
        allowNull:true,
    },

    event_location_details:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
}, {timestamps:false});

module.exports=event;