const Router = require('express').Router();
const apiRouter = require('./api');

Router.use('/api', apiRouter);

//console.log(apiRouter);

module.exports = Router;
