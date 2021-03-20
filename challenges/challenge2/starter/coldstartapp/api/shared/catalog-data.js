//const fs = require('fs').promises;
var { Connection } = require("tedious").Connection;
var { Request } = require("tedious").Request;
const { config } = require('./config');

const dbconfig = {  
  server: config.db_server,  //update me
  authentication: {
      type: 'default',
      options: {
          userName: config.db_username, //update me
          password: config.db_password  //update me
      }
  },
  options: {
      // If you are on Microsoft Azure, you need encryption:
      encrypt: true,
      database: config.db_database  //update me
  }
};  

async function getCatalog() {
  return new Promise((resolve, reject) => {
    var result = "";    

    var connection = new Connection(dbconfig);

    var request = new Request(`SELECT * FROM [dbo].[Icecreams]`, (err) => {
        if (err) {
            reject(err);
        } else {
            if ((result == "" || result == null || result == "null")) result = "[]";  
            resolve(result);
        }       
    });    

    request.on('row', columns => {
        columns.forEach(column => {
            result += column.value;                
        });
    });

    connection.on('connect', err => {
        if (err) {
            reject(err);
        }
        else {
            connection.execSql(request);
        }
    });   

    connection.connect(); 
  })
//  console.log('using static data.');
//  var stringData = await fs.readFile('./shared/catalog.json', 'utf8');
// const data = JSON.parse(stringData);  
//  return data.icecreams;
};

module.exports = { getCatalog };
