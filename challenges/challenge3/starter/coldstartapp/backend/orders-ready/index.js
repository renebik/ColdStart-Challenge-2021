const CosmosClient = require("@azure/cosmos").CosmosClient;
const { config, cosmosConfig } = require("../shared/config");
const http = require('http');

module.exports = async function (context, myQueueItem) {

  const { endpoint, key, databaseId, containerId } = cosmosConfig;
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const client = new CosmosClient({ endpoint, key });

  const database = client.database(databaseId);
  const container = database.container(containerId);

    var documents = context.bindings.acceptedOrderDocuments;
    for (var i = 0; i < documents.length; i++) {
      var document = documents[i];
      const { id, user } = document;
      const url = config.bing_maps_baseuri + 'Locations?culture=nl-NL&addressLine=' + document.fullAddress + '&o=json&key=' + config.bing_maps_key;

      http.request(url, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
          const json = JSON.parse(chunk);
          console.log(json);
          const tmp = json.resourceSets[0].resources[0].geocodePoints[0].coordinates.toString();
          console.log(tmp);
          document.deliveryPosition = tmp;
        });
        res.on('end', () => {
          document.status='Ready';
          const { resource: updatedDocument } = container
                                                  .item(id, user)
                                                  .replace(document);
        });
      }).end();     
    }
};