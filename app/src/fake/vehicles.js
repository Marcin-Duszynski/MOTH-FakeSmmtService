/*
Recalls list created based on test data obtained during real dev SMMT service tests.
More details in JIRA: BL-6009
*/

const marquesWithRecall = {
  RENAULT: {
    status: 201,
    status_description: 'Recall outstanding',
    vin: '',
    vin_recall_status: 'BRAKES',
    last_update: '19022015',
    delay: 0,
  },
  VOLKSWAGEN: {
    status: 201,
    status_description: 'Recall outstanding',
    vin: '',
    vin_recall_status: 'BRAKES',
    last_update: '19022015',
    delay: 0,
  },
  ISUZU: {
    status: 201,
    status_description: 'Recall outstanding',
    vin: '',
    vin_recall_status: 'BRAKES',
    last_update: '19022015',
    delay: 0,
  },
  SUBARU: {
    status: 201,
    status_description: 'Recall outstanding',
    vin: '',
    vin_recall_status: 'BRAKES',
    last_update: '19022015',
    delay: 0,
  },
  BMW: {
    status: 200,
    status_description: 'No recall found',
    vin: '',
    vin_recall_status: '',
    last_update: '19022015',
    delay: 0,
  },
  AUDI: {
    status: 200,
    status_description: 'No recall found',
    vin: '',
    vin_recall_status: '',
    last_update: '19022015',
    delay: 0,
  },
  PEUGEOT: {
    status: 200,
    status_description: 'No recall found',
    vin: '',
    vin_recall_status: '',
    last_update: '19022015',
    delay: 16000,
  },
  VOLVO: {
    status: 200,
    status_description: 'No recall found',
    vin: '',
    vin_recall_status: '',
    last_update: '19022015',
    delay: 3000,
  },
  DAIHATSU: {
    status: 200,
    status_description: 'No recall found',
    vin: '',
    vin_recall_status: '',
    last_update: '19022015',
    delay: 3000,
  },
  'GREAT WALL': {
    status: 200,
    status_description: 'No recall found',
    vin: '',
    vin_recall_status: '',
    last_update: '19022015',
    delay: 0,
  },
};

const invalidMarqueTemplate = {
  status: 402,
  status_description: 'Bad Request - Invalid Marque',
  vin: '',
  vin_recall_status: '',
  last_update: '',
  delay: 0,
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

  return new Promise((resolve) => {
    setTimeout(() => { resolve(recall); }, recall.delay);
  });
};
