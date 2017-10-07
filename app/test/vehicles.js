'use strict'

let chai = require('chai');
let should = chai.should();

let vehicles = require('../vehicles');

describe('When checking if vehicle has a outstanding recall', () => {
    describe('and valid VIN and MARQUE is provided', () =>{
        it('and user provide upper case text and vehicle has a recall and "Recall Outstanding" message is provided.', () => {
            let vin = 'AISXXXTEST1239607';
            let marque = 'BRUIN';

            let recall = vehicles.getRecall(vin, marque);

            recall.should.have.property('status').eql(201);            
            recall.should.have.property('status_description').eql('Recall Outstanding');
            recall.should.have.property('vin').eql(vin);
        });
        
        it('and user provide upper case text and vehicle has not a recall and "No Recall Outstanding" message is provided.', () => {
            let vin = 'AISXXXTEST1239617';
            let marque = 'BRUIN';

            let recall = vehicles.getRecall(vin, marque);

            recall.should.have.property('status').eql(200);            
            recall.should.have.property('status_description').eql('No Recall Outstanding');
            recall.should.have.property('vin').eql(vin);
        });

        it('and user provide mixed case text and vehicle has a recall and "Recall Outstanding" message is provided.', () => {
            let vin = 'AISxxxTEst1239607';
            let marque = 'BRuin';

            let recall = vehicles.getRecall(vin, marque);

            recall.should.have.property('status').eql(201);            
            recall.should.have.property('status_description').eql('Recall Outstanding');
            recall.should.have.property('vin').eql(vin);
        });
        
        it('and user provide mixed case text and vehicle has not a recall and "No Recall Outstanding" message is provided.', () => {
            let vin = 'AISxxxTEst1239617';
            let marque = 'BRuin';

            let recall = vehicles.getRecall(vin, marque);

            recall.should.have.property('status').eql(200);            
            recall.should.have.property('status_description').eql('No Recall Outstanding');
            recall.should.have.property('vin').eql(vin);
        });
    });
    describe('and invalid MARQUE is provided', () => {
        it('using valid VIN service is informing that provided MARQUE is invalid.', () => {
            let vin = 'AISXXXTEST1239617';
            let marque = 'SUPERMARQUE';

            let recall = vehicles.getRecall(vin, marque);

            recall.should.have.property('status').eql(402);            
            recall.should.have.property('status_description').eql('Bad Request - Invalid Marque');
            recall.should.have.property('vin').eql(vin);
        });

        it('using invalid VIN service is informing that provided MARQUE is invalid.', () => {
            let vin = 'asd123';
            let marque = 'SUPERMARQUE';

            let recall = vehicles.getRecall(vin, marque);

            recall.should.have.property('status').eql(402);            
            recall.should.have.property('status_description').eql('Bad Request - Invalid Marque');
            recall.should.have.property('vin').eql(vin);
        });
    });
    describe('and valid MARQUE and unknown VIN is provided', () => {
        it('"No Recall Outstanding" message is provided.', () => {
            let vin = 'asd123';
            let marque = 'BRUIN';

            let recall = vehicles.getRecall(vin, marque);

            recall.should.have.property('status').eql(200);            
            recall.should.have.property('status_description').eql('No Recall Outstanding');
            recall.should.have.property('vin').eql(vin);
        })
    })
});