const chai = require('chai');
const chaiHttp = require('chai-http');
const service = require('../src/smmtService');

chai.use(chaiHttp);
chai.should();

describe('SMMT service', () => {
  describe('When incorrect endpoint is triggered', () => {
    it('then 404 http code is returned.', (done) => {
      chai.request(service.app)
        .get('/Incorrect')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/ServiceAvailability', () => {
    it('when correct api key is provided service status is returned.', (done) => {
      chai.request(service.app)
        .post('/serviceavailability')
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
      chai.request(service.app)
        .post('/serviceavailability')
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
      chai.request(service.app)
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

    it('when incorrect api key is provided marque list is empty and unauthorized status is returned.', (done) => {
      chai.request(service.app)
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

  describe('/vincheck', () => {
    describe('when correct api key, VIN and marque is provided', () => {
      it('and vehicle has a outstanding recall then information about it is returned.', (done) => {
        chai.request(service.app)
          .post('/vincheck')
          .send({
            apikey: 'localApiKey',
            vin: 'AISXXXTEST1239607',
            Marque: 'RENAULT',
          })
          .end((err, res) => {
            if (err) done(err);

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(201);
            res.body.should.have.property('status_description').eql('Recall Outstanding');
            res.body.should.have.property('vin').eql('AISXXXTEST1239607');
            res.body.should.have.property('vin_recall_status').eql('BRAKES');

            done();
          });
      });

      it('and vehicle has not a outstanding recall then information about it is provided.', (done) => {
        chai.request(service.app)
          .post('/vincheck')
          .send({
            apikey: 'localApiKey',
            vin: 'AISXXXTEST1239617',
            Marque: 'AUDI',
          })
          .end((err, res) => {
            if (err) done(err);

            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('status').eql(200);
            res.body.should.have.property('status_description').eql('No Recall Outstanding');
            res.body.should.have.property('vin').eql('AISXXXTEST1239617');
            res.body.should.have.property('vin_recall_status').eql('');

            done();
          });
      });
    });

    it('when incorrect api key is provided then unauthorized status is returned.', (done) => {
      chai.request(service.app)
        .post('/vincheck')
        .send({
          apikey: 'incorrect api key',
          vin: 'AISXXXTEST1239607',
        })
        .end((err, res) => {
          if (err) done(err);

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(401);
          res.body.should.have.property('status_description').eql('Unauthorized');
          res.body.should.have.property('vin').eql('AISXXXTEST1239607');
          res.body.should.have.property('vin_recall_status').eql('');
          res.body.should.have.property('last_update').eql('');

          done();
        });
    });

    it('when correct api key and unknown marque is provided then invalid marque status is returned.', (done) => {
      chai.request(service.app)
        .post('/vincheck')
        .send({
          apikey: 'localApiKey',
          vin: 'AISXXXTEST1239617',
          Marque: 'ARUIN',
        })
        .end((err, res) => {
          if (err) done(err);

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(402);
          res.body.should.have.property('status_description')
            .eql('Bad Request - Invalid Marque');
          res.body.should.have.property('vin').eql('AISXXXTEST1239617');
          res.body.should.have.property('vin_recall_status').eql('');
          res.body.should.have.property('last_update').eql('');

          done();
        });
    });
  });
});
