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

  switch (reqPath) {
    case path.marquePath:
      check(req, next, () => {
        res.status(200).send(fakeResponse.wrongApiKeyMarque)
      })
      break
    case path.serviceAvailabilityPath:
      check(req, next, () => {
        res.status(200).send(fakeResponse.wrongApiKeyServiceAvailability)
      })
      break
    case path.vinCheckPath:
      check(req, next, () => {
        var vin = req.body['VIN']
        res.status(200).send(fakeResponse.generateWrongApiKeyVinCheck(vin))
      })
      break
    default:
      next()
      break
  }
}
