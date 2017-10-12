/* eslint-env mocha */

const chai = require('chai');
const chaiHttp = require('chai-http');
const smmt = require('../smmt');
const config = require('../config');

chai.use(chaiHttp);
chai.should();
config.apiKey = 'localApiKey';

describe('SMMT service', () => {
  describe('/ServiceAvailability', () => {
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

    it('when incorrect api key is provided request unauthorized status is returned.', (done) => {
      chai.request(smmt.app)
        .post('/ServiceAvailability')
        .send({ apikey: 'incorrect api key' })
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

  describe('/marque', () => {
    it('when correct api key is provided supported marque list is returned.', (done) => {
      chai.request(smmt.app)
        .post('/marque')
        .send({ apikey: 'localApiKey' })
        .end((err, res) => {
          if (err) done(err);

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(203);
          res.body.should.have.property('status_description').eql('Marque List');
          res.body.should.have.property('marquelist').to.be.an('array');
          res.body.marquelist.should.have.lengthOf(10);

          done();
        });
    });

    it('when incorrect api key is provided marque list is empty', (done) => {
      chai.request(smmt.app)
        .post('/marque')
        .send({ apikey: 'incorrect api key' })
        .end((err, res) => {
          if (err) done(err);

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('status_description').eql('Unauthorized');
          res.body.should.have.property('marquelist').to.be.an('array');
          res.body.marquelist.should.have.lengthOf(0);

          done();
        });
    });
  });
});
