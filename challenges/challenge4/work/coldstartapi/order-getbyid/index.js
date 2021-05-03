const data = require('../shared/order-cosmos-data');

module.exports = async function (context, req) {
  try {
    // Get the status filter from the query string
    const id = req.params.Id;
 
    // Get the orders for the given state
    let order = await data.getOrderById(id);

    // Remove Cosmos DB technical fields when returning results
    //order = data.removeTechnicalAttributes(order);
    context.res.status(200).json(order);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
