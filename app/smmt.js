'use strict'

const serverless = require('serverless-http')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const apiKeyVerifier = require('./apiKeyVerifier')
app.use(apiKeyVerifier.middleware)
app.disable('x-powered-by')

const vehicles = require('./vehicles')
const fakeResponse = require('./fakeResponse')
const path = require('./path')

app.post(path.serviceAvailabilityPath, function (req, res) {
  res.status(200).send(fakeResponse.serviceAvailability)
  console.log('Response was send by serviceAvailability')
})

app.post(path.marquePath, function (req, res) {
  res.status(200).send(fakeResponse.marque)
  console.log('Response was send by marque')
})

app.post(path.vinCheckPath, function (req, res) {
  var vin = req.body['VIN']
  var marque = req.body['Marque']

  res.status(200).send(vehicles.getRecall(vin, marque))
  console.log('Response was send by vinCheck')
})

exports.app = app
exports.handler = serverless(app)
