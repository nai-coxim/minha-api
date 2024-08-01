const Sequelize = require("sequelize"); //criando constante com a tipagem
const sequelize = require("../database/database");

const Usuarios = sequelize.define("usuarios", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
    nome: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
        len: [2, 255]
        }
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
        len: [2, 255]
        }
    },
    hash: {
        allowNull: true,
        //type: Sequelize.STRING(255),
        type: Sequelize.TEXT('long'),
    },
    salt: {
        allowNull: true,
        type: Sequelize.STRING(255),
    }
});

module.exports = Usuarios;
//console.log(module);
