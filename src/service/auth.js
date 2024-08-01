const { sign, verify } = require('jsonwebtoken');
const { randomBytes, pbkdf2Sync } = require('crypto');

const environment = process.env.ENV || 'development';
const { secret } = require('../config/config')[environment];

//console.log(secret);

const gerarCredenciais = senha => {
    //console.log('gerar credenciais acionado')
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(senha, salt, 1000, 512, 'sha512').toString('hex');

    return { salt, hash };
};

const senhaConfere = (senha, cadastrado) => {
    //console.log('senha confere do service-auth.js');
    //console.log('nome '+cadastrado.nome);
    //console.log('email '+cadastrado.email);
    //console.log('salt '+cadastrado.salt);
    //console.log('senha '+senha);
    return (
        cadastrado.hash ===
        pbkdf2Sync(senha, cadastrado.salt, 1000, 512, 'sha512').toString('hex')
    );
};

const gerarJWT = (id, email, nome) => {
    //const token = '12131231312'; return token;
    const token = sign(
        {
            id,
            email,
            nome
        },
        secret
    );
    return { token };
};

const verificarToken = (token, callback) => {
    //console.log(token);
    //console.log(secret);

    return verify(token, secret, callback);
};

module.exports = {gerarCredenciais, senhaConfere, gerarJWT, verificarToken};
//console.log(module.exports);

/*
module.exports = {senhaConfere} = (senha, cadastrado) => {
    return (
        true
        //cadastrado.hash ===
        //pbkdf2Sync(senha, cadastrado.salt, 1000, 512, 'sha512').toString('hex')
    );
};
/*
const verificarToken = (token, callback) => {
    return verify(token, secret, callback);
};
*/
//module.exports {gerarCredenciais, senhaConfere};
//module.exports = {gerarCredenciais, gerarJWT, senhaConfere, verificarToken };
