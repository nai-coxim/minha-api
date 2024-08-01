const Linguagem = require('../model/Linguagem');
const status = require("http-status");
const Curtidas = require('../model/Curtidas');

const idLinguagem = 0;
const idUsuario = 0;
const numeroUsuarios = 0;
const curtiu = false;

const listarLinguagens = idUsuario => {
    return Linguagem.findAll()
        .then(linguagem => {
            if (linguagem) {
                linguagem;
            }
        });
};

const linguagem = () => {
    return Linguagem.findByPk(this.idLinguagem)
        .then(linguagem => {
            if (!linguagem) {
                return false
            }

            //console.log(linguagem.numeroUsuarios)
            this.numeroUsuarios = linguagem.numeroUsuarios;

            console.log('verifica se ja curtiu');
            return jaCurtiu();
        })
}

const jaCurtiuuuu = () => {
    Curtidas.findOne({
        where: {
            id_linguagem: this.idLinguagem,
            id_usuario: this.idUsuario
        }
    })
    .then(curtiu => {
        if (curtiu) {
            console.log('alterou a variavel')
            this.curtiu = true
        }
    })
}

const atualizaCurtida = () => {
    //console.log('id: '+idLinguagem)
    return Linguagem.increment(
        {numeroUsuarios: 1},
        {where: {id: this.idLinguagem}}
    ).then(atualiza => {
        if(!atualiza){
            console.log('nao atualizou')
            return false
        }
        console.log('atualizou')
        return insereCurtida();
    })      
}

const insereCurtida = () => {
    return Curtidas.create({
        id_usuario: this.idUsuario,
        id_linguagem: this.idLinguagem
    }).then(inseriu => {
        if (!inseriu) {
            return false
        }

        console.log('inseriu')
        return true; 
    })
}

const curtirLinguagem = (idLinguagem, idUsuario) => {
    //okconsole.log('aqui')
    //okconsole.log(idLinguagem + ' - ' + idUsuario)

    this.idLinguagem = idLinguagem;
    this.idUsuario = idUsuario;

    return Linguagem.findByPk(this.idLinguagem)
    .then(linguagem => {
        if (!linguagem) {
            console.log('nao achou linguagem')
            return false
        }

    })
    .then(() => {
        Curtidas.findOne({
            where: {
                id_linguagem: this.idLinguagem,
                id_usuario: this.idUsuario
            }
        })
        .then(curtiu => {
            if (curtiu) {
                console.log('alterou a variavel')
                this.curtiu = true
            }
        })
    })
};

const detalhesLinguagem = idLinguagem => {
};

module.exports = { listarLinguagens, curtirLinguagem, detalhesLinguagem };
