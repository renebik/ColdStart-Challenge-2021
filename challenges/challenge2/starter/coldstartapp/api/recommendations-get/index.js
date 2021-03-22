const data = require('../shared/catalog-data');
const { v4: uuidv4 } = require('uuid');
const { config } = require('../shared/config');
const { getUser } = require('../shared/user-utils');
const personalizer = require('../shared/get-personalizer')

function getContextFeaturesList(req) {
  const loggedIn = getUser(req).userDetails == "John Doe" ? 0 : 1;
  const now = new Date();

  return [
    {
      "timeOfDay": now.getHours()
    },
    {
      "dayOfWeek": now.getDay()
    },
    {
      "loggedIn": loggedIn
    }
  ];
}

async function getActionsList() {
  const items = await data.getCatalog();

  return items.map(item => ({
      id: `${item.Id}`,
      features:[
        {name: item.Name},
        {description: item.Description}
      ]
  }));
}

module.exports = async function (context, req) {
  try {
    const client = await personalizer.getPersonalizer();

    const rankRequest = {
      eventId: uuidv4(),
      contextFeatures: getContextFeaturesList(req),
      actions: await getActionsList(),
      deferActivation: false
    }

    const response = await client.rank(rankRequest);

    const recommendations = [
      {
        Id: parseInt(response.rewardActionId),
        EventId: response.eventId
      }
    ]
    context.res.status(200).send(recommendations);
  } catch (error) {
    context.res.status(500).send(error);
  }
};
