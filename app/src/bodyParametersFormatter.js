exports.middleware = (req, res, next) => {
  for (const key in req.body) {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) {
      req.body[key.toLowerCase()] = req.body[key];
    }
  }

  next();
};
