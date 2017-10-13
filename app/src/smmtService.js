const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const apiKeyVerifier = require('./apiKeyVerifier');
const vehicles = require('./vehicles');
const fakeResponse = require('./fakeResponse');
const path = require('./path');
const bodyParametersFormatter = require('./bodyParametersFormatter');

const app = express();
app.use(bodyParser.json());
app.use(bodyParametersFormatter.middleware);
app.use(apiKeyVerifier.middleware);
app.disable('x-powered-by');

app.post(path.serviceAvailabilityPath, (req, res) => {
  res.status(200).send(fakeResponse.serviceAvailability);
});

app.post(path.marquePath, (req, res) => {
  res.status(200).send(fakeResponse.marque);
});

app.post(path.vinCheckPath, (req, res) => {
  res.status(200).send(vehicles.getRecall(req.body.vin, req.body.marque));
});

exports.app = app;
exports.handler = serverless(app);
