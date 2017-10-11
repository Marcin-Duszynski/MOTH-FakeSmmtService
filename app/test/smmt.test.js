/* eslint-env mocha */

const chai = require('chai');
const chaiHttp = require('chai-http');
const smmt = require('../smmt');
const config = require('../config');

config.apiKey = 'localApiKey';

chai.use(chaiHttp);
chai.should();
describe('SMMT service', () => {
  describe('ServiceAvailability endpoint', () => {
    it('when correct api key is provided service status is returned.', (done) => {
      chai.request(smmt.app)
        .post('/ServiceAvailability')
        .send({ apikey: 'localApiKey' })
        .end((err, res) => {
          if (err) done(err);

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(250);
          res.body.should.have.property('status_description').eql('Service Available');

          done();
        });
    });

    it('when incorrect api key is provided service status is returned.', (done) => {
      chai.request(smmt.app)
        .post('/ServiceAvailability')
        .send({ apikey: 'incorect api key' })
        .end((err, res) => {
          if (err) done(err);

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('status_description').eql('Unauthorized');

          done();
        });
    });
  });
});
