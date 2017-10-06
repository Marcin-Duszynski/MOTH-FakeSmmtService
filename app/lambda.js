'use strict'

const serverlessExpress = require('aws-serverless-express');
const vincheck = require('./vincheck');
const config = require('./config');

if (config.apiKey === undefined){
    config.apiKey = "key from OS env";
};

const server = serverlessExpress.createServer(vincheck);
exports.handler = (event, context) => serverlessExpress.proxy(server, event, context);