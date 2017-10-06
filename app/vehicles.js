'use strict'

var vehiclesDictionary = {
    "AISXXXTEST1239607-BRUIN": {
        "status": 201,
        "status_description": "Recall Outstanding",
        "vin": "AISXXXTEST1239607",
        "vin_recall_status": "BRAKES",
        "last_update": "19022015"
    }
};

exports.getRecall = (vin, make) => vehiclesDictionary[`${vin}-${make}`];