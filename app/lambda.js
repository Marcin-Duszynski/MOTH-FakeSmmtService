'use strict'

const serverlessExpress = require('aws-serverless-express');
const vincheck = require('./vincheck');

const server = serverlessExpress.createServer(vincheck);
exports.handler = (event, context) => serverlessExpress.proxy(server, event, context);