const chai = require('chai');
const configLoader = require('../src/configLoader');

const should = chai.should();

describe('Config provides api key used by SMMT service', () => {
  it('when ENV variable is not set then api key value is set to localApiKey.', () => {
    const env = { smmtKey: undefined };

    const config = configLoader.load(env);

    should.equal(config.apiKey, 'localApiKey');
  });

  it('when ENV variable is set then api key value is set to it.', () => {
    const env = { smmtKey: 'NewTestValue' };

    const config = configLoader.load(env);

    should.equal(config.apiKey, 'NewTestValue');
  });
});
