const chai = require('chai');
const vehicles = require('../src/fake/vehicles');

chai.should();

describe('When checking if vehicle has a outstanding recall', () => {
  describe('and valid VIN and MARQUE is provided', () => {
    it('and user provide upper case text and vehicle has a recall and "Recall Outstanding" message is provided.', () => {
      const vin = 'AISXXXTEST1239607';
      const marque = 'RENAULT';

      const recall = vehicles.getRecall(vin, marque);

      recall.should.have.property('status').eql(201);
      recall.should.have.property('status_description').eql('Recall Outstanding');
      recall.should.have.property('vin').eql(vin);
    });

    it('and user provide upper case text and vehicle has not a recall and "No Recall Outstanding" message is provided.', () => {
      const vin = 'AISXXXTEST1239617';
      const marque = 'AUDI';

      const recall = vehicles.getRecall(vin, marque);

      recall.should.have.property('status').eql(200);
      recall.should.have.property('status_description').eql('No Recall Outstanding');
      recall.should.have.property('vin').eql(vin);
    });

    it('and user provide mixed case text and vehicle has a recall and "Recall Outstanding" message is provided.', () => {
      const vin = 'AISxxxTEst1239607';
      const marque = 'RENauLT';

      const recall = vehicles.getRecall(vin, marque);

      recall.should.have.property('status').eql(201);
      recall.should.have.property('status_description').eql('Recall Outstanding');
      recall.should.have.property('vin').eql(vin);
    });

    it('and user provide mixed case text and vehicle has not a recall and "No Recall Outstanding" message is provided.', () => {
      const vin = 'AISxxxTEst1239617';
      const marque = 'AUdi';

      const recall = vehicles.getRecall(vin, marque);

      recall.should.have.property('status').eql(200);
      recall.should.have.property('status_description').eql('No Recall Outstanding');
      recall.should.have.property('vin').eql(vin);
    });
  });
  describe('and invalid MARQUE is provided', () => {
    it('using valid VIN service is informing that provided MARQUE is invalid.', () => {
      const vin = 'AISXXXTEST1239617';
      const marque = 'SUPERMARQUE';

      const recall = vehicles.getRecall(vin, marque);

      recall.should.have.property('status').eql(402);
      recall.should.have.property('status_description').eql('Bad Request - Invalid Marque');
      recall.should.have.property('vin').eql(vin);
    });

    it('using invalid VIN service is informing that provided MARQUE is invalid.', () => {
      const vin = 'asd123';
      const marque = 'SUPERMARQUE';

      const recall = vehicles.getRecall(vin, marque);

      recall.should.have.property('status').eql(402);
      recall.should.have.property('status_description').eql('Bad Request - Invalid Marque');
      recall.should.have.property('vin').eql(vin);
    });
  });
});
