const data = require('../shared/catalog-data');

module.exports = async function (context, req) {
  try {
    const items = await data.getCatalog();
    context.res.status(200).send(JSON.parse(items));
  } catch (error) {
    context.res.status(500).send(error);
  }
};
