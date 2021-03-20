const { getUser } = require('../shared/user-utils');
const { config } = require('../shared/config');
const { QueueServiceClient } = require("@azure/storage-queue");
const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);

  // Get the pre-order from the request
  const preorder = {
    Id: uuidv4(),
    ItemId: req.body.itemId,
    User: user.userDetails,
    DateTime: new Date().toJSON()
  }
  // TODO: add the pre-order JSON document in a queue
  // Retrieve the connection from an environment
  // variable called AZURE_STORAGE_CONNECTION_STRING
  const connectionString = config.azure_storage_connectionstring;
  // Create a unique name for the queue
  const queueName = "orders";

  // Instantiate a QueueServiceClient which will be used
  // to create a QueueClient and to list all the queues
  const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);

  // Get a QueueClient which will be used
  // to create and manipulate a queue
  const queueClient = queueServiceClient.getQueueClient(queueName);

  // Create the queue
  await queueClient.createIfNotExists();
  
  // Add a message to the queue
  await queueClient.sendMessage(JSON.stringify(preorder));
  context.res.status(201);
};
