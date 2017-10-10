'use strict'

const config = require('./config')
const path = require('./path')
const fakeResponse = require('./fakeResponse')

function check (req, next, failureCallback) {
  var apiKey = req.body['apikey']

  if (apiKey === config.apiKey) {
    next()
  } else {
    return failureCallback()
  }
}

exports.middleware = (req, res, next) => {
  var reqMethod = req.method
  var reqPath = req.path

  console.log('Request Type:', reqMethod)
  console.log('Request Path:', reqPath)

  if (reqPath === path.marquePath) {
    check(req, next, () => {
      res.status(200).send(fakeResponse.wrongApiKeyMarque)
    })
  } else if (reqPath === path.serviceAvailabilityPath) {
    check(req, next, () => {
      res.status(200).send(fakeResponse.wrongApiKeyServiceAvailability)
    })
  } else if (reqPath === path.vinCheckPath) {
    check(req, next, () => {
      var vin = req.body['VIN']
      res.status(200).send(fakeResponse.generateWrongApiKeyVinCheck(vin))
    })
  } else {
    next()
  }
}
