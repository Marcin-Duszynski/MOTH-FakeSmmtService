'use strict'

const config = require('./config')

exports.check = (body, successCallback, failureCallback) => {
  var apiKey = body['apikey']

  if (apiKey === config.apiKey) {
    return successCallback()
  } else {
    return failureCallback()
  }
}
