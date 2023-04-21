const { Pool } = require('pg');
// Ahora no necesitamos una funcion asincrona porque la primera que hag al aconeccion hace un await interno y eespues comparte la coneccion con las diferentes peticiones
const { config } = require('../config/config');

// Ahora lo que vamos a hacer es mandar todas las variables en un URL para que sea mas seguro.
// Usamos el atributo encoreURIcomponent para encriptar
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

// Ahora le pasasmos a pool un atribuo que reconoce que es connection String y la URi que construimos.
const pool = new Pool({
  connectionString: `postgresql://postgres:IlFITQwqgCEzG2H0hlHR@containers-us-west-118.railway.app:7253/railway
`,
});

module.exports = pool;
