// @ts-check
const process = require("process");

const config = {
  azure_storage_connectionstring: process.env.AZURE_STORAGE_CONNECTIONSTRING,
  personalizer_key: process.env.PERSONALIZER_API_KEY,
  personalizer_baseuri: process.env.PERSONALIZER_ENDPOINT,
};

const sqlConfig = {
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

module.exports = { config, sqlConfig };
