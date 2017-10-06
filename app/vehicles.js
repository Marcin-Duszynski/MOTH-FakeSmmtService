'use strict'

/*
Recalls list created based on test data obtained during real dev SMMT service tests.
More details in JIRA: BL-6009
*/

var vehiclesDictionary = {
    "BRUIN": {
        "AISXXXTEST1239607": {
            "status": 201,
            "status_description": "Recall Outstanding",
            "vin": "AISXXXTEST1239607",
            "vin_recall_status": "BRAKES",
            "last_update": "19022015"
        }
    }
};

function invalidMarque(vin){
    return {
        "status": 402,
        "status_description": "Bad Request - Invalid Marque",
        "vin": `${vin}`,
        "vin_recall_status": "",
        "last_update": ""
    }
};

function unknownVin(vin){
    return {
        "status": 200,
        "status_description":"No Recall Outstanding",
        "vin": `${vin}`,
        "vin_recall_status": "",
        "last_update": "19022015"
    }
};

exports.getRecall = (vin, marque) => {
    var vehiclesWithMarque = vehiclesDictionary[marque.toUpperCase()];

    if (vehiclesWithMarque === undefined) {
        return invalidMarque(vin);
    };

    var vehicle = vehiclesWithMarque[vin.toUpperCase()];
    if (vehicle === undefined) {
        return unknownVin(vin);
    };

    return vehicle;
}