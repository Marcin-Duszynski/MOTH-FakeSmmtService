const smmt = require('./smmtService');

smmt.app.listen(3000, () => {
  console.info('Fake SMMT Service started in local mode on port 3000.');
});

exports.app = smmt.app;
