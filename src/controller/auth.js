const authRepository = require('../repository/auth');

const login = (req, res, next) => {

    //console.log('log no controller-auth');
    //console.log(req.body);

    const { email, senha } = req.body;

    return authRepository.login(email, senha)
        .then(tokenValido => {
            if (!tokenValido) {
                return res
                    .status(401)
                    .end();
            }
            return res.json(tokenValido);
        })
        .catch(error => next(error));
};

const logout = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    //console.log(token);
    return authRepository.logout(token)
        .then(() => res.status(200).end())
        .catch(err => next(err));
};

module.exports = { login, logout };