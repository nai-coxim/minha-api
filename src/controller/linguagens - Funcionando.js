const {
  listarLinguagens,
  curtirLinguagem,
  detalhesLinguagem
} = require('../repository/linguagens');

const Linguagem = require('../model/Linguagem');
const status = require("http-status");

const listar = (req, res, next) => {
  const idUsuario = res.locals.payload.id;

  //console.log(idUsuario);
  Linguagem.findAll({
  })
    .then(linguagem => {
      res.send(linguagem);
    })
    .catch(error => next(error));
};

const curtir = (req, res, next) => {
  //okconsole.log('aqui')
  const idLinguagem = req.params.id;
  const idUsuario = res.locals.payload.id;

  return curtirLinguagem(idLinguagem, idUsuario)
      .then(disponivel => {
          if (!disponivel) {
              console.log('erro retorno: ' + disponivel)
              return res
                  .status(409)
                  .end();
          }
          console.log('retorno: ' + disponivel)
          return res.end();
      })
      .catch(err => next(err));
};

const detalhes = (req, res, next) => { };/*
  return detalhesLinguagem(req.params.id)
      .then(linguagem => res.json({ linguagem }))
      .catch(err => next(err));
};
*/
module.exports = { listar, curtir, detalhes };

/*
const Blacklists = require('../model/BlackList');
const Usuario = require('../model/Usuario');
const status = require("http-status");

const listar = (request, response, next) => {

  console.log('controller')  ;
  console.log(res.locals.payload.id)

    const idUsuario = res.locals.payload.id;

    console.log(idUsuario);

    let limite = parseInt(request.query.limite || 0); //se nao tiver o parametro, usa 0
    let pagina = parseInt(request.query.pagina || 0); //se nao tiver o parametro, usa 0
  
    //para paginar a busca
    if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
      response.status(status.BAD_REQUEST).send();
    }
  
    const ITENS_POR_PAGINA = 10;
  
    limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    pagina = pagina <= 0 ? 0 : pagina * limite;
  
    //console.log(response.send(request));
  /*
    Blacklists.findAll({ limit: limite, offset: pagina })
      .then(usuarios  => {
        response.send(usuarios);
      })
      .catch(error => next(error));
*
      Usuario.findAll()
      .then(spoiler => { //then - da promisse...é o q vai acontecer qdo a promisse foi resolvida
        if (spoiler) {
          response.status(status.OK).send(spoiler);
        } else {
          response.status(status.NOT_FOUND).send();
        }
      })
      .catch(error => next(error));//catch - da promisse...é o q vai acontecer qdo a promisse nao foi resolvida
  };

  module.exports = {listar};
  */