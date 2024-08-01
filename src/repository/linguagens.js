const { Linguagem, Curtidas } = require('../model/Linguagem');
const status = require("http-status");
//const Curtidas = require('../model/Curtidas');

const idLinguagem = 0;
const idUsuario = 0;
const numeroUsuarios = 0;

const listarLinguagens = idUsuario => {
    return Linguagem.findAll({include: Curtidas})
        .then(linguagem => {
            //console.table(JSON.stringify(linguagem[0].linguagens_curtida.usuarioCurte))
            return linguagem
        })
};

const curtirLinguagem = (idLinguagem, idUsuario) => {
    //okconsole.log('aqui')
    //okconsole.log(idLinguagem + ' - ' + idUsuario)

    this.idLinguagem = idLinguagem;
    this.idUsuario = idUsuario;

    return Linguagem.findByPk(this.idLinguagem)
        .then(linguagem => {
            if (!linguagem) {
                return false
            }

            console.log('verifica se ja curtiu');
            return usuarioJaCurte = Curtidas.findOne({
                where: {
                    id_linguagem: this.idLinguagem,
                    id_usuario: this.idUsuario
                }
            }).then(jaCurtiu => {
                if (jaCurtiu) {
                    return false
                }

                console.log('atualiza curtida');

                return Curtidas.create({
                    id_usuario: this.idUsuario,
                    id_linguagem: this.idLinguagem
                }).then(inseriu => {
                    if (!inseriu) {
                        return false
                    }

                    Linguagem.increment(
                        { numeroUsuarios: 1 },
                        { where: { id: this.idLinguagem } }
                    )

                    console.log('inseriu')
                    return true;
                })
            })
        })
};

const detalhesLinguagem = idLinguagem => {

};

module.exports = { listarLinguagens, curtirLinguagem, detalhesLinguagem };
