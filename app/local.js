'use strict'

const vincheck = require('./vincheck');

vincheck.app.listen(3000, function(){
    console.log('Fake SMMT Service started in local mode on port 3000.');
});