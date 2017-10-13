exports.middleware = (req, res, next) => {
  for (const key of Object.keys(req.body)) {
    req.body[key.toLowerCase()] = req.body[key];
  }

  next();
};
