// @ts-check
const process = require("process");

const config = {
    azure_storage_connectionstring: process.env.AZURE_STORAGE_CONNECTIONSTRING,
    db_server: process.env.DB_SERVER,
    db_database: process.env.DB_DATABASE,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    personalizer_api_key: process.env.PERSONALIZER_API_KEY,
    personalizer_endpoint: process.env.PERSONALIZER_ENDPOINT 
};

module.exports = { config };
