const Sequelize= require ('sequelize');
const configdb= new Sequelize("run_N_race","root","Evanar22",{dialect:'mariadb'});

module.exports=configdb;
//module.exports=Sequelize;

