exports.generateWrongApiKeyVinCheck = vin => ({
  status: 401,
  status_description: 'Unauthorized',
  vin: `${vin}`,
  vin_recall_status: '',
  last_update: '',
});

exports.serviceAvailability = {
  status: 250,
  status_description: 'Service Available',
};

exports.wrongApiKeyServiceAvailability = {
  status: 401,
  status_description: 'Unauthorized',
};

exports.wrongApiKeyMarque = {
  status: 401,
  status_description: 'Unauthorized',
  marquelist: [],
};

exports.marque = {
  status: 203,
  status_description: 'Marque List',
  marquelist: [
    {
      Name: 'Taylor',
    },
    {
      Name: 'Bruin',
    },
    {
      Name: 'Hartley',
    },
    {
      Name: 'Malin',
    },
    {
      Name: 'Masterson',
    },
    {
      Name: 'Tucker',
    },
    {
      Name: 'Martin',
    },
    {
      Name: 'Dorchester',
    },
    {
      Name: 'Weymouth',
    },
    {
      Name: 'Mcdonough',
    },
  ],
};
