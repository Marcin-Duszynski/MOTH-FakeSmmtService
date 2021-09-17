const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');

const apiKeyVerifier = require('./middleware/apiKeyVerifier');
const bodyParametersFormatter = require('./middleware/bodyParametersFormatter');
const vehicles = require('./fake/vehicles');
const fakeResponses = require('./fake/responses');
const path = require('./config/path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParametersFormatter.middleware);
app.use(apiKeyVerifier.middleware);
app.disable('x-powered-by');

app.post(path.serviceAvailabilityPath, (req, res) => {
  res.status(200).send(fakeResponses.serviceAvailability);
});

app.post(path.marquePath, (req, res) => {
  res.status(200).send(fakeResponses.marque);
});

app.post(path.vinCheckPath, (req, res) => {
  const responsePromise = vehicles.getRecall(req.body.vin, req.body.Marque);
  responsePromise.then((responseBody) => {
    res.status(200).send(responseBody);
  });
});

exports.app = app;
exports.handler = serverless(app);
