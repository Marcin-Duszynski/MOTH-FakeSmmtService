/*
Recalls list created based on test data obtained during real dev SMMT service tests.
More details in JIRA: BL-6009
*/

const vehiclesDictionary = {
  BRUIN: {
    AISXXXTEST1239607: {
      status: 201,
      status_description: 'Recall Outstanding',
      vin: 'AISXXXTEST1239607',
      vin_recall_status: 'BRAKES',
      last_update: '19022015',
    },
    AISXXXTEST1239617: {
      status: 200,
      status_description: 'No Recall Outstanding',
      vin: 'AISXXXTEST1239617',
      vin_recall_status: '',
      last_update: '19022015',
    },
  },
};

const invalidMarqueTemplate = {
  status: 402,
  status_description: 'Bad Request - Invalid Marque',
  vin: '',
  vin_recall_status: '',
  last_update: '',
};

const unknownVinTemplate = {
  status: 200,
  status_description: 'No Recall Outstanding',
  vin: '',
  vin_recall_status: '',
  last_update: '19022015',
};

exports.getRecall = (vin, marque) => {
  const vehiclesMarque = vehiclesDictionary[marque.toUpperCase()];
  let recall;

  if (vehiclesMarque === undefined) {
    recall = invalidMarqueTemplate;
  } else {
    recall = vehiclesMarque[vin.toUpperCase()];
    if (recall === undefined) {
      recall = unknownVinTemplate;
    }
  }

  recall.vin = vin;

  return recall;
};
