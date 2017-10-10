'use strict'

exports.serviceAvailability = () => {
  return {
    'status': 250,
    'status_description': 'Service Available'
  }
}

exports.wrongApiKeyVinCheck = (vin) => {
  return {
    'status': 401,
    'status_description': 'Unauthorized',
    'vin': `${vin}`,
    'vin_recall_status': '',
    'last_update': ''
  }
}

exports.wrongApiKeyServiceAvailability = (vin) => {
  return {
    'status': 401,
    'status_description': 'Unauthorized'
  }
}

exports.wrongApiKeyMarque = (vin) => {
  return {
    'status': 401,
    'status_description': 'Unauthorized',
    'marquelist': []
  }
}

exports.marque = () => {
  return {
    'status': 203,
    'status_description': 'Marque List',
    'marquelist': [
      {
        'Name': 'Taylor'
      },
      {
        'Name': 'Bruin'
      },
      {
        'Name': 'Hartley'
      },
      {
        'Name': 'Malin'
      },
      {
        'Name': 'Masterson'
      },
      {
        'Name': 'Tucker'
      },
      {
        'Name': 'Martin'
      },
      {
        'Name': 'Dorchester'
      },
      {
        'Name': 'Weymouth'
      },
      {
        'Name': 'Mcdonough'
      }
    ]
  }
}
