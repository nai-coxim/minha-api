const Blacklists = require('../model/BlackList');
const Usuario = require('../model/Usuario');
//const { gerarJWT, senhaConfere } = require('../service/auth');
const {senhaConfere} = require('../service/auth');
const {gerarJWT} = require('../service/auth');

const logout = token => {
    //console.log('aquii');
    return Blacklists.findOne({ 
        where: {
            token : token
        }
    }).then(listado => {
       //console.log('aqui');
       //console.log([listado].length);

        if (![listado].length) {
            //console.log('nao entendi, logou do repositorio auth.js');
            //const listedToken = new BlackList({ token });
            //listedToken.save();
        }
        
    });
};

const checarToken = token => {
       //console.log(token);
    return Blacklists.findOne({
        where: {
            token: token 
        }
    }).then (listado => {
        if([listado].length > 0){
            //console.log('1');
            return listado;
        }
        //console.log('0');
        return null;
    }); //[listado].length > 0);
};

const login = (email, senha) => {
    //console.log('email na funcao login do repository-auth.js: '+email);
    //console.log('senha na funcao login do repository-auth.js: '+senha);
    return Usuario.findOne({ 
            where: {
                email: email
            } 
        }).then(cadastrado => {
        //console.log('antes senhaConfere da funcao login do repository-auth.js'+cadastrado.hash);
        if (cadastrado && senhaConfere(senha, cadastrado)) {
            //console.log('passou a verificacao de senhaConfere da funcao login do repository-auth.js'+cadastrado);
            return gerarJWT(
                cadastrado.id,
                cadastrado.email,
                cadastrado.nome
            );
        }
        //console.log('nao entrou');
        return false;
    });
};

module.exports = { logout, checarToken, login };
