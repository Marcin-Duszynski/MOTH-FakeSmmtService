const chai = require('chai');
const vehicles = require('../src/fake/vehicles');

chai.should();

describe('When checking if vehicle has a outstanding recall', () => {
  describe('and valid VIN and MARQUE is provided', () => {
    it('and user provide upper case text and vehicle has a recall and "Recall outstanding" message is provided.', (done) => {
      const vin = 'AISXXXTEST1239607';
      const marque = 'RENAULT';

      const recallPromise = vehicles.getRecall(vin, marque);

      recallPromise.then((recall) => {
        recall.should.have.property('status').eql(201);
        recall.should.have.property('status_description').eql('Recall outstanding');
        recall.should.have.property('vin').eql(vin);
        done();
      });
    });

    it('and user provide upper case text and vehicle has not a recall and "No recall found" message is provided.', (done) => {
      const vin = 'AISXXXTEST1239617';
      const marque = 'AUDI';

      const recallPromise = vehicles.getRecall(vin, marque);
      recallPromise.then((recall) => {
        recall.should.have.property('status').eql(200);
        recall.should.have.property('status_description').eql('No recall found');
        recall.should.have.property('vin').eql(vin);
        done();
      });
    });

    it('and delays execution accordingly to the specified make', function callback(done) {
      this.timeout(4000);

      const vin = 'AISXXXTEST1239617';
      const marque = 'VOLVO';
      const recallPromise = vehicles.getRecall(vin, marque);
      recallPromise.then((recall) => {
        recall.should.have.property('status').eql(200);
        recall.should.have.property('status_description').eql('No recall found');
        recall.should.have.property('vin').eql(vin);
        done();
      });
    });

    it('and user provide mixed case text and vehicle has a recall and "Recall outstanding" message is provided.', (done) => {
      const vin = 'AISxxxTEst1239607';
      const marque = 'RENauLT';

      const recallPromise = vehicles.getRecall(vin, marque);
      recallPromise.then((recall) => {
        recall.should.have.property('status').eql(201);
        recall.should.have.property('status_description').eql('Recall outstanding');
        recall.should.have.property('vin').eql(vin);
        done();
      });
    });

    it('and user provide mixed case text and vehicle has not a recall and "No recall found" message is provided.', (done) => {
      const vin = 'AISxxxTEst1239617';
      const marque = 'AUdi';

      const recallPromise = vehicles.getRecall(vin, marque);
      recallPromise.then((recall) => {
        recall.should.have.property('status').eql(200);
        recall.should.have.property('status_description').eql('No recall found');
        recall.should.have.property('vin').eql(vin);
        done();
      });
    });
  });

  describe('and invalid MARQUE is provided', () => {
    it('using valid VIN service is informing that provided MARQUE is invalid.', (done) => {
      const vin = 'AISXXXTEST1239617';
      const marque = 'SUPERMARQUE';

      const recallPromise = vehicles.getRecall(vin, marque);
      recallPromise.then((recall) => {
        recall.should.have.property('status').eql(402);
        recall.should.have.property('status_description').eql('Bad Request - Invalid Marque');
        recall.should.have.property('vin').eql(vin);
        done();
      });
    });

    it('using invalid VIN service is informing that provided MARQUE is invalid.', (done) => {
      const vin = 'asd123';
      const marque = 'SUPERMARQUE';

      const recallPromise = vehicles.getRecall(vin, marque);
      recallPromise.then((recall) => {
        recall.should.have.property('status').eql(402);
        recall.should.have.property('status_description').eql('Bad Request - Invalid Marque');
        recall.should.have.property('vin').eql(vin);
        done();
      });
    });
  });
});

