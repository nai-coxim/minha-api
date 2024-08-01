const Linguagem = require('../model/Linguagem');
const status = require("http-status");
const Curtidas = require('../model/Curtidas');

const idLinguagem = 0;
const idUsuario = 0;
const numeroUsuarios = 0;

const listarLinguagens = idUsuario => {
    return Linguagem.findAll()
        .then(linguagem => {
            if (linguagem) {
                linguagem;
            }
        });
    /*
        Linguagem.findAll().then();
        /* //ByPk(idUsuario)
        .then(linguagem => {
            //console.log('chegou aqui');
            return true; //linguagem;
        });
        return  false;
        */
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

const jaCurtiu = () => {
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
        return atualizaCurtida();
    })
}

const atualizaCurtida = () => {
    //console.log('id: '+idLinguagem)
    Linguagem.increment(
        {numeroUsuarios: 1},
        {where: {id: this.idLinguagem}}
    )

    console.log('insere curtida')
    return insereCurtida();
/*    
    return Linguagem.increment(
        {numeroUsuarios: 1},
        {where: {id: this.linguagem}}
    ).then(atualiza=>{
        if(!atualiza){
            return false
        }

        console.log('insere curtida')
        return insereCurtida();
    })
/*    
    return Linguagem.update(
            {
                usuarioCurte: this.numeroUsuarios + 1
            },
            { where: { id: this.idLinguagem } }
        ).then(atualiza=>{
            if(!atualiza){
                return false
            }

            //console.log('atualizou')
            return insereCurtida();
        })
        //.catch(error => next(error));
*/        
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

    return linguagem(); //idLinguagem, idUsuario);

    /*    
        return Linguagem.findByPk(idLinguagem)
            .then(linguagem => {
                if (!linguagem) {
                    return false
                }
    
                console.log('achou a linguagem')
    
                const usuarioJaCurte = Curtidas.findOne({
                    where: {
                        id_linguagem: idLinguagem,
                        id_usuario: idUsuario
                    }
                })
    
                console.log('depois')
    
                console.log(usuarioJaCurte.idLinguagem);
    
    
                return true
                /*
                            Curtidas.findOne({
                                where: {
                                    id_linguagem: idLinguagem,
                                    id_usuario: idUsuario
                                }
                            })
                                .then(usuarioJaCurte => {
                                    if (usuarioJaCurte) {
                                        console.log('ja ta curtido')
                                        return false;
                                    }
                
                                    Curtidas.create({
                                        id_usuario: idUsuario,
                                        id_linguagem: idLinguagem
                                    });
                
                                    Linguagem.update(
                                        {
                                            usuarioCurte: linguagem.usuarioCurte + 1
                                        },
                                        { where: { id: idLinguagem } }
                                    ).then(()=>{
                                        console.log('criou')
                                        return true
                                    })
                                    .catch(error => next(error));
                                });
                
            }); //.catch(()=>{false});
        /*    
            return Linguagem.findByPk(idLinguagem)
                .then(linguagem => {
                    if (linguagem){
                        console.log('existe a linguagem')
                        Curtidas.findOne({
                            where: {
                                id_linguagem: idLinguagem,
                                id_usuario: idUsuario
                            }
                        })
                        .then( usuarioJaCurte =>{
                            if(!usuarioJaCurte){
                                
                                console.log('vai criar curtida')
        
                                Curtidas.create({
                                    id_usuario: idUsuario,
                                    id_linguagem: idLinguagem
                                })
                                .then(() => {
                                    console.log('altera e rotorna update')
                                    return Linguagem.update(
                                        {
                                            usuarioCurte: linguagem.usuarioCurte + 1
                                        },
                                        { where: { id: idLinguagem } }
                                    );
                                })
                                .catch(error => next(error));
                            } else{
                                console.log('ja tem curtida - retorna false')
                                return false
                            }
        
                        }).catch(() => {console.log('aaaaaaaaaaaa')})
                    }
        
        
        /*                
        
                        //okconsole.log('achou a linguagem');
        
                        const usuarioJaCurte = Curtidas.findOne({
                            where: {
                                id_linguagem: idLinguagem,
                                id_usuario: idUsuario
                            }
                        })
        
                        console.log(usuarioJaCurte)
        
        
                        if(usuarioJaCurte.id > 0) {
                            console.log('usuario ja curte')
                            return false;
                        }
        
                        console.log([usuarioJaCurte].id);
        
                        console.log('criando')
        
                        Curtidas.create({
                            id_usuario: idUsuario,
                            id_linguagem: idLinguagem
                        });
                        console.log('criou');
        
                        return Linguagem.update(
                            {
                                usuarioCurte: linguagem.usuarioCurte + 1
                            },
                            { where: { id: idLinguagem } }
                        );
        
                    }*/
    //});
};

const detalhesLinguagem = idLinguagem => {
    /*    
        return Linguagem.aggregate([
            {
                $match: { _id: ObjectId(idLinguagem) }
            },
            {
                $project: {
                    nome: 1,
                    urlImagem: 1,
                    numeroUsuarios: { $size: '$usuarios' },
                    paradigmas: 1,
                    criadoPor: 1,
                    surgidoEm: 1,
                    ultimaVersao: 1
                }
            }
        ]);
    */
};

module.exports = { listarLinguagens, curtirLinguagem, detalhesLinguagem };
