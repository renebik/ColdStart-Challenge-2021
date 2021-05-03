module.exports = async function (context, req) {
  const message = req.body;
  if (req.headers && req.headers['x-ms-client-principal-name']) {
      message.sender = req.headers['x-ms-client-principal-name'];
  }
  context.bindings.signalRMessages = [{
    "userId": recipientUserId,
    "target": "newMessage",
    "arguments": [ message ]
}];
context.done();
};