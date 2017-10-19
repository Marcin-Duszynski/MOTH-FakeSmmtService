/*
Recalls list created based on test data obtained during real dev SMMT service tests.
More details in JIRA: BL-6009
*/

const marquesWithRecall = {
  RENAULT: {
    status: 201,
    status_description: 'Recall Outstanding',
    vin: '',
    vin_recall_status: 'BRAKES',
    last_update: '19022015',
  },
  VOLKSWAGEN: {
    status: 201,
    status_description: 'Recall Outstanding',
    vin: '',
    vin_recall_status: 'BRAKES',
    last_update: '19022015',
  },
  BMW: {
    status: 200,
    status_description: 'No Recall Outstanding',
    vin: '',
    vin_recall_status: '',
    last_update: '19022015',
  },
  AUDI: {
    status: 200,
    status_description: 'No Recall Outstanding',
    vin: '',
    vin_recall_status: '',
    last_update: '19022015',
  },
};

const invalidMarqueTemplate = {
  status: 402,
  status_description: 'Bad Request - Invalid Marque',
  vin: '',
  vin_recall_status: '',
  last_update: '',
};

exports.getRecall = (vin, marque) => {
  const recallFromDictionary = marquesWithRecall[marque.toUpperCase()];
  let recall;

  if (recallFromDictionary === undefined) {
    recall = invalidMarqueTemplate;
  } else {
    recall = recallFromDictionary;
  }

  recall.vin = vin;

  return recall;
};
