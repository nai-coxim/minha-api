const { checarToken } = require('../repository/auth');
const { verificarToken } = require('../service/auth');

const autenticarRequisicao = (req, res, next) => {
    //console.log('middlewaare auth')
    //console.log(req.headers.authorization.split(' ').length);
    if (
        !req.headers.authorization ||
        req.headers.authorization.split(' ').length !== 2
    ) {
        return res.status(401).end();
    }

    //console.log(req.headers.authorization.split(' ')[1]);

    const token = req.headers.authorization.split(' ')[1];

    //console.log(token);

    verificarToken(token, (err, payload) => {
        if (err) {
            return res.status(401).end();
        }

        //console.log('chegou aqui');
        //console.log(payload);

        checarToken(token).then(estaListado => {
            
            if (estaListado) {
                return res.status(401).end();
            }

            //console.log('chegou aquiiiii proximo éo payload');
            res.locals.payload = payload;
            //console.log(res.locals.payload);
            return next();
        });
        
    });    
};

module.exports = { autenticarRequisicao };
