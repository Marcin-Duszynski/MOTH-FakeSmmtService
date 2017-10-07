'use strict'

const config = require('./config');
const vehicles = require('./vehicles');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/health', function(req, res){
    res.status(200).send('Up and running.');
});

app.post('/vincheck', function(req, res){
    console.log("Request body:");
    console.log(req.body);

    var vin = req.body['VIN'];
    var marque = req.body['Marque'];
    var apiKey = req.body['apikey'];

    if (apiKey === config.apiKey){
        var vinCheckResponse = vehicles.getRecall(vin, marque);
    } else {
        var vinCheckResponse = wrongApiKeyResponse(vin);
    };

    console.log("Response body:");
    console.log(vinCheckResponse);

    res.send(vinCheckResponse);
});

function wrongApiKeyResponse(vin){
    return {
        "status": 401,
        "status_description": "Unauthorized",
        "vin": `${vin}`,
        "vin_recall_status": "",
        "last_update": ""
    }
}

exports.app = app;