const Sequelize= require('sequelize');
const configdb=require('./../config');


const participant=configdb.define('participant', {

    participant_id:{
        type:Sequelize.INET,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true   
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
        type:Sequelize.INET,
        allowNull:false,
    },
   
    gender:{
        type:Sequelize.STRING,
        allowNull:false,
    },
   email:{
        type:Sequelize.STRING,
        allowNull:true,
    },
    phone_number:{
        type:Sequelize.STRING,
        allowNull:true,
    }
}, {timestamps:false});

module.exports=participant;
