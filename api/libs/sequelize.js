const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
//Traemos la URL que hicimos en la clase anterior
//Importamos la funcion setup Models
const setupModels = require('../db/models');

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// Lo mas normal es que las bases de datos te den una url de coneccion.
// Primero que nada va el protocolo de coneccion y despues las variables que vemos. Repite host pero dijo host asique ese debe ser el error
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
let options = {
  // dialect es el tipo de base de datos que uso
  dialect: 'postgres',
  logging: config.isProd ? true : false,
};

let URI = '';
if (config.isProd) {
  URI = `postgresql://postgres:IlFITQwqgCEzG2H0hlHR@containers-us-west-118.railway.app:7253/railway
  `;
  options.ssl = {
    rejectUnauthorized: false,
  };
}
if (config.env) {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

// La clase sequalize obtiene dos parametros, la URI de conexion y un objeto que contiene la informacion sobre como hacer la conexion.
const sequelize = new Sequelize(
  `postgresql://postgres:IlFITQwqgCEzG2H0hlHR@containers-us-west-118.railway.app:7253/railway
`,
  options
);

setupModels(sequelize);
//Desopues de hacer le setup le voy a pedir que haga una sincronizacion.

/*sequelize.sync(); Le vamos a decir que deje de sincronizar porque no se seguro en produccion*/
// Sync significa qeu va a tomar el model y va a crear la estructura de la tabla quee estoy haciendo

module.exports = sequelize;
