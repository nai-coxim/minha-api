const Sequelize = require("sequelize");

const environment = process.env.NODE_ENV || "development"; //indicamos q se nao for informado qual environment vamos trabalhar...ele pega o development
//isso pq qdo gerar a aplicacao, agente indica qual tipo

const config = require("../config/config.js")[environment]; // aqui busca as informações do arquivo

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.password,
  { //obj js
    host: config.database.host,
    dialect: config.database.dialect
  }
);

module.exports = sequelize;
