const data = require('../shared/catalog-data');

module.exports = async function (context, myQueueItem) {

    const iceCreams = await data.getCatalog();

    context.bindings.orderDocument = JSON.stringify({
        "id": myQueueItem.Id,
        "user": myQueueItem.User,
        "date": myQueueItem.Date,
        "icecream": iceCreams.filter(function(i){
            return (i.Id === myQueueItem.IcecreamId);
        }),
        "status": "Accepted",
        "driver": {
            "driverId": null,
            "name": null,
            "imageUrl": null
        },
        "fullAddress": myQueueItem.FullAddress,
        "deliveryPosition": null,
        "lastPosition": null
    });

      context.done();
};