const data = require('../shared/driver-data');

module.exports = async function (context, req) {
  try {
    // Get the driverId filter from the query string
//    let driverId = req.query.driverId;
//    if (!driverId) {
//      status = 'Ready';
//    }

    // Get the orders for the given state
    let drivers = await data.getDrivers();

    context.res.status(200).json(drivers);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
