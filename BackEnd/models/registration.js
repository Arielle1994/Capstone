const Sequelize= require('sequelize');
const configdb=require('./../config');


const registration=configdb.define('registration', {

        registration_id:{
        type:Sequelize.INET,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true   
    },
    race_id:{
        type:Sequelize.INET,
        autoIncrement:false,
        allowNull:false,
        // foreignKey(race_id) REFERENCES    
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
        type:Sequelize.ENUM('standard','short','kids'),
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
    }

}, {timestamps:false});

module.exports=registration;``