'use strict'

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

    var vehicle = vehicles.getRecall(req.body['VIN'], req.body['Marque']);
    console.log("Response body:");
    console.log(vehicle);

    res.send(vehicle);
})

exports.app = app;