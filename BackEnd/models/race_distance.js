const Sequelize= require('sequelize');
const configdb=require('./../config');


const race_distance=configdb.define('race_distance', {

    distance_id:{
        type:Sequelize.INET,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true   
    },

    distance_km:{
        type:Sequelize.INET,
        allowNull:false,
    },

    
}, {timestamps:false});

module.exports=race_distance;