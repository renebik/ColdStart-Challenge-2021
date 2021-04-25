const { sqlConfig } = require("./config");
const mssql = require('mssql');

async function getCatalog() {
  console.log('using database ');

  let pool = await mssql.connect(sqlConfig);
  let result = await pool.request()
    .query(`SELECT * FROM dbo.Icecreams ORDER BY [Id]`);

  return result.recordset;
}

async function getCatalogById(itemId) {
  console.log('using database ');

  let pool = await mssql.connect(sqlConfig);
  let result = await pool.request()
    .query(`SELECT * FROM dbo.Icecreams WHERE Id = ${itemId}`);

  return result.recordset;
}

module.exports = { getCatalog, getCatalogById };
