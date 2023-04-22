const { Pool } = require('pg');
const { config } = require('../config/config');

let URI = '';

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
if (config.isProd) {
  URI = `postgresql://postgres:IlFITQwqgCEzG2H0hlHR@containers-us-west-118.railway.app:7253/railway
    `;
}

const pool = new Pool({
  connectionString: `postgresql://postgres:RgjUZkeH2j66bzKqCOLv@containers-us-west-85.railway.app:7682/railway`,
});

module.exports = pool;
