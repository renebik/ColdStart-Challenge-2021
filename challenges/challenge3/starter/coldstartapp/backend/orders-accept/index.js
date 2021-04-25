const data = require('../shared/catalog-data');

module.exports = async function (context, myQueueItem) {

    const iceCream = await data.getCatalogById(myQueueItem.IcecreamId);

    context.bindings.orderDocument = JSON.stringify({
        "id": myQueueItem.Id,
        "user": myQueueItem.User,
        "date": myQueueItem.Date,
        "icecream": iceCream[0],
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