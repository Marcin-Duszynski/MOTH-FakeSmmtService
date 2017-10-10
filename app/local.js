'use strict'

const smmt = require('./smmt')
const config = require('./config')

config.apiKey = 'localApiKey'

smmt.app.listen(3000, function () {
  console.log('Fake SMMT Service started in local mode on port 3000.')
  console.log(`Api access key: ${config.apiKey}`)
})

module.exports = smmt.app
