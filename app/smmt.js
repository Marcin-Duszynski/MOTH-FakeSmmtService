'use strict'

const serverless = require('serverless-http')
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const vehicles = require('./vehicles')
const fakeResponse = require('./fakeResponse')
const apiKeyVerifier = require('./apiKeyVerifier')

app.post('/ServiceAvailability', function (req, res) {
  var response = apiKeyVerifier.check(req.body, () => {
    return fakeResponse.serviceAvailability()
  }, () => {
    return fakeResponse.wrongApiKeyServiceAvailability()
  })

  res.status(200).send(response)
})

app.post('/marque', function (req, res) {
  var response = apiKeyVerifier.check(req.body, () => {
    return fakeResponse.marque()
  }, () => {
    return fakeResponse.wrongApiKeyMarque()
  })

  res.status(200).send(response)
})

app.post('/vincheck', function (req, res) {
  var vin = req.body['VIN']
  var marque = req.body['Marque']

  var response = apiKeyVerifier.check(req.body, () => {
    return vehicles.getRecall(vin, marque)
  }, () => {
    return fakeResponse.wrongApiKeyVinCheck(vin)
  })

  res.status(200).send(response)
})

exports.app = app
exports.handler = serverless(app)
