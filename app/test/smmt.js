'use strict'

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let app = require('../local')

chai.use(chaiHttp)

describe('SMMT service', () => {
  describe('ServiceAvailability endpoint', () => {
    it('when correct api key is provided service status is returned.', (done) => {
      chai.request(app)
        .post('/ServiceAvailability')
        .send({'apikey': 'localApiKey'})
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('status').eql(250)
          res.body.should.have.property('status_description').eql('Service Available')

          done()
        })
    }),
    it('when incorrect api key is provided service status is returned.', (done) => {
      chai.request(app)
        .post('/ServiceAvailability')
        .send({'apikey': 'incorect api key'})
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('status').eql(401)
          res.body.should.have.property('status_description').eql('Unauthorized')

          done()
        })
    })
  })
})
