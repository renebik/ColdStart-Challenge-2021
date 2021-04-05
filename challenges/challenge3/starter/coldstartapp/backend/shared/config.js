// @ts-check
const process = require("process");

const config = {
  azure_storage_connectionstring: process.env.AZURE_STORAGE_CONNECTIONSTRING,
  personalizer_key: process.env.PERSONALIZER_API_KEY,
  personalizer_baseuri: process.env.PERSONALIZER_ENDPOINT,
  bing_maps_key: process.env.BING_MAPS_KEY,
  bing_maps_baseuri: process.env.BING_MAPS_ENDPOINT
};

const cosmosConfig = {
  endpoint: process.env.COSMOSDB_ENDPOINT,
  key: process.env.COSMOSDB_ACCESSKEY,
  databaseId: process.env.COSMOSDB_DATABASE,
  containerId: process.env.COSMOSDB_CONTAINER,
  partitionKey: { kind: "Hash", paths: ["/user"] }
}

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

module.exports = { config, sqlConfig, cosmosConfig };
