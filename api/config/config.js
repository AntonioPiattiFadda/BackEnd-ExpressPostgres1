require('dotenv').config();
const config = {
  //Esto es lenguaje node.
  // Le digo que se fije en que entorno se esta ejecutando y si no hay ninguno que lo haga en dev.
  env: process.env.NODE_ENV || 'dev',
  // Le pregunto en que puerto se esta ejecutando y si es en ninguno sera en el 3000
  port : process.env.PORT || 3000,
  dbUser : process.env.DB_USER,
  dbPassword : process.env.DB_PASSWORD,
  dbHost : process.env.DB_HOST,
  dbName : process.env.DB_NAME,
  dbPort : process.env.DB_PORT,

}

module.exports = { config };
