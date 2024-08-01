const Usuarios = require('../model/Usuario');
const status = require("http-status");
const { gerarCredenciais } = require('../service/auth');

const cadastrarUsuario = dadosUsuario => {
  //console.log(dadosUsuario);

  return Usuarios.findOne({
    where: {
      email: dadosUsuario.email
    }
  }).then(listado => {
    if (listado) {
      //console.log([listado].length);
      //console.log(listado.nome);
      //console.log('ja existe')
      return false;
    }

    //console.log('nao existe')
    const credenciais = gerarCredenciais(dadosUsuario.senha);
    Usuarios.create({
      nome: dadosUsuario.nome,
      email: dadosUsuario.email,
      //senha: dadosUsuario.senha,
      salt: credenciais.salt,
      hash: credenciais.hash
    });
    return true})
    /*
      .then(() => {
        //console.log('incluiu')
        return true;
      })});
    */  
};
/*
  const credenciais = gerarCredenciais(dadosUsuario.senha);
    Usuarios.create({
      nome: dadosUsuario.nome,
      email: dadosUsuario.email,
      //senha: dadosUsuario.senha,
      salt: credenciais.salt,
      hash: credenciais.hash
    })
      .then(() => {
        console.log('incluiu')
        return true;
      })

  };

  //});
  /*
      const credenciais = gerarCredenciais(dadosUsuario.senha);
  
      //console.log(credenciais);
      //console.log(credenciais.salt);
  
      Usuarios.create({
          nome: dadosUsuario.nome,
          email: dadosUsuario.email,
          //senha: dadosUsuario.senha,
          salt: credenciais.salt,
          hash: credenciais.hash
      })
      .then(() => {
        response.status(status.CREATED).send();
      })
      .catch(error => next(error));
  
};
*/

module.exports = { cadastrarUsuario };