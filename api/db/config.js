const {config} = require('../config/config')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// Lo mas normal es que las bases de datos te den una url de coneccion.
// Primero que nada va el protocolo de coneccion y despues las variables que vemos.
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

module.exports = {
  // Tenemos varios ambientes, produccion y desarrollo.
  development : {
    username: 'nico',
    password: 'admin123',
    database: 'my_store',
    url: URI,
    dialect: 'postgres',
  },
  // Despues vamos a ver como usamos esto cuendo hagamos el deployment a heroku de esta base de datos.
  production : {
    username: 'nico',
    password: 'admin123',
    database: 'my_store',
    url: URI,
    dialect: 'postgres',
  }
}
