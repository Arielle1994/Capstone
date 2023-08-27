const Sequelize= require('sequelize');
const configdb=require('./../config');


const event=configdb.define('event', {

    event_id:{
        type:Sequelize.INET,
        autoIncrement:false,
        allowNull:false,
        primaryKey:true   
    },

    event_name:{
        type:Sequelize.TEXT,
        allowNull:false,
    },

    event_date:{
        type:Sequelize.TEXT,
        allowNull:false,
    },

    event_location:{
        type:Sequelize.TEXT,
        allowNull:false,
    },


}, {timestamps:false});

module.exports=event;