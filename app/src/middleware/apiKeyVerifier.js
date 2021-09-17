
const configLoader = require('../config/configLoader');
const path = require('../config/path');
const fakeResponses = require('../fake/responses');

const config = configLoader.load(process.env);

function check(req, next, failureCallback) {
  const apiKey = req.get('x-api-key');

  if (apiKey === config.apiKey) {
    next();
  } else {
    failureCallback();
  }
}

exports.middleware = (req, res, next) => {
  const reqPath = req.path.toLowerCase();

  switch (reqPath) {
    case path.marquePath:
      check(req, next, () => {
        res.status(200).send(fakeResponses.wrongApiKeyMarque);
      });
      break;
    case path.serviceAvailabilityPath:
      check(req, next, () => {
        res.status(200).send(fakeResponses.wrongApiKeyServiceAvailability);
      });
      break;
    case path.vinCheckPath:
      check(req, next, () => {
        const { vin } = req.body;
        res.status(200).send(fakeResponses.generateWrongApiKeyVinCheck(vin));
      });
      break;
    default:
      next();
      break;
  }
};
