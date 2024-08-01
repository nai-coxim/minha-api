const http = require('http');
const express = require('express'); // tem q ser aqui, logo abaixo o require('http')
//const bodyParser = require('body-parser'); //importando body-parser para converter requisição html em json
const status = require("http-status");

//const routes = require('./routes/api/usuarios');
const routes = require('./routes');
const sequelize = require("./database/database");

const app = express();
/*
app.post('/api/usuarios', (req, res) => {
  console.log('req.body');
  console.log('aqui');
})
/*
app.use(
  express.urlencoded({
    extended: true
  })
)
*/
//app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.json());
//app.use(bodyParser.json());
/*
app.post('/api/usuarios', (req, res) => {
  console.log(req.body);
  console.log('aqui');
})

*/
/*
app.use((req, res, next) => {
  //allow access to current url. work for https as well
  res.setHeader('Access-Control-Allow-Origin',req.header('Origin'));
  res.removeHeader('x-powered-by');
  //allow access to current method
  res.setHeader('Access-Control-Allow-Methods',req.method);
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  next();
})
*/
app.use((req, res, next) => {
  //allow access to current url. work for https as well
  res.setHeader('Access-Control-Allow-Origin','*');
  res.removeHeader('x-powered-by');
  //allow access to current method
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
  //res.setHeader('Access-Control-Allow-Headers','Content-Type');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  //res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Content-Type', 'application/json');
  
  next();
})

app.use(routes);
//console.log("/api" + routes);

app.use((request, response, next) => {
    //console.log(request);
    response.status(status.NOT_FOUND).send();
});

app.use((error, request, response, next) => {
    response.status(status.INTERNAL_SERVER_ERROR).json({ error }); //vai retornar o erro em json
});

//conectando o banco de dados*/
sequelize.sync({ force: false }).then(() => {
    /****************************IMPORTANTE******************************
    colocar force: false apos executar a 1 vez*/

    //se o sync funcionar, vamos ter uma promisse
    const port = process.env.PORT || 3000; 

    app.set("port", port); // seta a porta no express

    //console.log(port);

    const server = http.createServer(app); //cria o servidor

    //console.log(server);

    server.listen(port); //servidor fica ouvindo as requisições

});
