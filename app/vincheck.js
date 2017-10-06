'use strict'

const vehicles = require('./vehicles');
const express = require('express');
const app = express();

app.get('/health', function(req, res){
    res.status(200).send('Up and running.');
});

app.post('/vincheck', function(req, res){
    var vehicle = vehicles.getRecall('AISXXXTEST1239607', 'BRUIN');
    res.send(vehicle);
})

exports.app = app;