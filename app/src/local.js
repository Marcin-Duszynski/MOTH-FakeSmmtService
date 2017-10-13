const smmt = require('./smmtService');
const config = require('./config');

config.apiKey = 'localApiKey';

smmt.app.listen(3000, () => {
  console.info('Fake SMMT Service started in local mode on port 3000.');
  console.info(`Api access key: ${config.apiKey}`);
});
