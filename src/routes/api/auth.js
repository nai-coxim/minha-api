const Router = require('express').Router();

//console.log('rota auth');
const { autenticarRequisicao } = require('../../middleware/auth');
const controller = require('../../controller/auth');

//console.log('passou do middleware/auth');

//console.log('foi para controller.login');

Router.post('/login', controller.login);
Router.post('/logout', autenticarRequisicao, controller.logout);

module.exports = Router;