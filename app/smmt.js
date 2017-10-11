const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const apiKeyVerifier = require('./apiKeyVerifier');
const vehicles = require('./vehicles');
const fakeResponse = require('./fakeResponse');
const path = require('./path');

const app = express();
app.use(bodyParser.json());
app.use(apiKeyVerifier.middleware);
app.disable('x-powered-by');

app.post(path.serviceAvailabilityPath, (req, res) => {
  res.status(200).send(fakeResponse.serviceAvailability);
});

app.post(path.marquePath, (req, res) => {
  res.status(200).send(fakeResponse.marque);
});

app.post(path.vinCheckPath, (req, res) => {
  res.status(200).send(vehicles.getRecall(req.body.VIN, req.body.Marque));
});

exports.app = app;
exports.handler = serverless(app);
