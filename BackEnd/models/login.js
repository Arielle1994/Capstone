const Sequelize = require('sequelize');
const configdb = require ('../config');

const login = configdb.define("login", {

   id: {
        type: Sequelize.INET,
        allowNull: false,
        primaryKey:true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
   
    }, {timestamps: false});

module.exports = login;