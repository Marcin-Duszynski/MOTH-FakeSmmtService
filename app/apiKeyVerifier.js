const config = require('./config');
const path = require('./path');
const fakeResponse = require('./fakeResponse');

function check(req, next, failureCallback) {
  const apiKey = req.body.apikey;

  if (apiKey === config.apiKey) {
    next();
  } else {
    failureCallback();
  }
}

exports.middleware = (req, res, next) => {
  const reqPath = req.path;

  switch (reqPath) {
    case path.marquePath:
      check(req, next, () => {
        res.status(200).send(fakeResponse.wrongApiKeyMarque);
      });
      break;
    case path.serviceAvailabilityPath:
      check(req, next, () => {
        res.status(200).send(fakeResponse.wrongApiKeyServiceAvailability);
      });
      break;
    case path.vinCheckPath:
      check(req, next, () => {
        const vin = req.body.VIN;
        res.status(200).send(fakeResponse.generateWrongApiKeyVinCheck(vin));
      });
      break;
    default:
      next();
      break;
  }
};
