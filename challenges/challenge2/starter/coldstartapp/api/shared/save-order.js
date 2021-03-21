var { Connection } = require("tedious");
var { Request } = require("tedious");
const { TYPES } = require("tedious");

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

async function saveOrder(preOrder) {
  return new Promise((resolve, reject) => {
    var orderId='';
    
    const connection = new Connection(dbconfig);

    const request = new Request(`INSERT INTO [dbo].[Orders] ([User], Date, IcecreamId, FullAddress) OUTPUT INSERTED.Id VALUES (@user, @date, @icecreamId, @fullAddress);`, (err) => {
        if (err) {
            reject(err);
        } else {
            resolve(orderId);
        }       
    });    

    request.addParameter('user', TYPES.NVarChar, preOrder.User);
    request.addParameter('date', TYPES.DateTime, preOrder.DateTime);
	request.addParameter('icecreamId', TYPES.Int, preOrder.ItemId);
	request.addParameter('fullAddress', TYPES.NVarChar, 'Dummy address');
    request.on('row', columns => {
        columns.forEach(column => {
            orderId = column.value;
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
  });
}

module.exports = { saveOrder };