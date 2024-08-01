const { cadastrarUsuario } = require('../repository/usuario');
const status = require("http-status");
const Usuarios = require('../model/Usuario');

const idUsuario = 0;

const cadastro = (req, res, next) => {
  const dadosUsuario = req.body;

  //console.log(cadastrarUsuario(dadosUsuario));

  return cadastrarUsuario(dadosUsuario)
    .then(usuario => {
      //console.log(usuario);
      if (!usuario) {
        return res.status(409).end();
      }
      return res.status(200).end();
    })
    .catch(error => next(error));
};

const edit = (req, res, next) => {
  const id = req.params.id;
  const nome = req.body.nome;

  Usuarios.findByPk(id)
    .then(usuarios => {
      if(usuarios) {
        //console.log('aaaa')
        //res.send(usuarios);
        
        Usuarios.update(
          {
            nome: nome
          },
          {where: {id: id }}
        ).then(() => {
          res.status(status.OK).send();
        })
        .catch(error => next(error));
      } else {
        res.status(status.NOT_FOUND).send('Erro na alteração: ID '+id+' não encontrado.');
        //return console.err("Erro na exclusão: ", err);
        //console.log('bbbbb')
      }
      //res.send(usuarios);
      //console.log('aaaa');
    })
    .catch(error => next(error));  
};

const exclui = (req, res, next) => {
  const id = req.params.id;
  //console.log('usuario: '+ id);

  Usuarios.findByPk(id)
    .then(usuarios => {
      if(usuarios) {
        //console.log('aaaa')
        //res.send(usuarios);
        
        Usuarios.destroy({where: {id: id }})
        .then(() => {
          res.status(status.OK).send();
        })
        .catch(error => next(error));
      } else {
        res.status(status.NOT_FOUND).send('Erro na exclusão: ID '+id+' não encontrado.');
        //return console.err("Erro na exclusão: ", err);
        //console.log('bbbbb')
      }
      //res.send(usuarios);
      //console.log('aaaa');
    })
    .catch(error => next(error));  

/*  
  try {
    Usuarios.destroy({where: {id: id }});
    return res.json({msg: `Exclusão de item de ID ${id} feita com sucesso!`});
  } catch (err) {
      return console.err("Erro na exclusão: ", err);
    }   
*/      
};

const listar = (request, response, next) => {
  //console.log('aaaa');
  Usuarios.findAll()
    .then(usuarios => {
      response.send(usuarios);
      //console.log('aaaa');
    })
    .catch(error => next(error));
};

module.exports = { cadastro , exclui, listar, edit};