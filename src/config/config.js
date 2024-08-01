//module.exports serve para disponibilizar essas info em todo projeto
module.exports = {
    development: {
      database: {
        host: "localhost",
        //port: 3306,
        name: "jwt-auth",
        dialect: "mysql",
        user: "root",
        password: ""
      },
      secret: '1C3C7E1694F1E9DAD939399E87E5FFB5DF06B2327CA31B409CB3'
    },
    production: {
      database: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
      },
      secret: process.env.JWT_SECRET
    }
  };
  