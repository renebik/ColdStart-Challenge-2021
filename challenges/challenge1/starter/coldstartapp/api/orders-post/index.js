const { getUser } = require('../shared/user-utils');
var azure = require('azure-storage');

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);

  // Get the pre-order from the request
  
  // TODO: add the pre-order JSON document in a queue
  var queueSvc = azure.createQueueService();
  queueSvc.createQueueIfNotExists('myqueue', function(error, results, response){
    if(!error){
      // Queue created or exists
      queueSvc.createMessage('myqueue', "Hello, World", function(error, results, response){
        if(!error){
          // Message inserted
        }
      });
    }
  });
  context.res.status(201);
};
