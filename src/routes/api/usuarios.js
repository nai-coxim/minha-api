const Router = require('express').Router();

const { validarUsuario, validarSenha } = require('../../middleware/validacao');

const controller = require('../../controller/usuario');

//Router.use(validarUsuario);

Router.post('/', validarSenha, controller.cadastro);
Router.delete('/:id', controller.exclui);
Router.get('/', controller.listar);
Router.put('/:id', controller.edit);
//console.log(Router.post);

module.exports = Router;
