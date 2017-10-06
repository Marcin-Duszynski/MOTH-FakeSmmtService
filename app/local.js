'use strict'

const vincheck = require('./vincheck');
const config = require('./config');

config.apiKey = "localApiKey";

vincheck.app.listen(3000, function(){
    console.log('Fake SMMT Service started in local mode on port 3000.');
    console.log(`Api access key: ${config.apiKey}`);
});

module.exports = vincheck;