const Sequelize = require("sequelize"); //criando constante com a tipagem
const sequelize = require("../database/database");

const Blacklists = sequelize.define("blacklists", {
    token: {
        allowNull: false,
        type: Sequelize.TEXT('long')
    }
});

module.exports = Blacklists;

