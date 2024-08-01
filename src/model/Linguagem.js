const Sequelize = require("sequelize"); //criando constante com a tipagem
const sequelize = require("../database/database");

const Linguagens = sequelize.define("linguagens", {
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
    criadoPor: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
        len: [2, 255]
        }
    },
    surgidoEm: {
        allowNull: true,
        type: Sequelize.INTEGER,
    },
    numeroUsuarios: {
        allowNull: true,
        type: Sequelize.INTEGER,
    },
    ultimaVersao: {
        allowNull: true,
        type: Sequelize.INTEGER,
    },
});

const Curtidas = sequelize.define("linguagens_curtidas", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_usuario: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_linguagem: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      usuarioCurte: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
    }      
});  

Linguagens.hasOne(Curtidas,{
    foreignKey: 'id_linguagem',
    sourceKey: 'id',
    }
)

//await Linguagens.sync({ alter: true });

//Curtidas.hasOne(Linguagens,{foreignKey: 'id_linguagem', allowNull: false})
//Linguagens.belongsTo(Curtidas);
//Linguagens.belongsTo(Curtidas, {foreignKey: 'id_linguagem', allowNull: true })

module.exports = {Linguagem : Linguagens, Curtidas}

//module.exports = Linguagens;
//console.log(module);
//console.log(Linguagens === sequelize.models.linguagens);
//console.log(Curtidas === sequelize.models.linguagens_curtidas);

//const tasks = await Task.findAll({ include: Linguagens });
//console.log(JSON.stringify(tasks, null, 2));