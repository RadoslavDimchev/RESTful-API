module.exports = () => (req, res, next) => {
  for (const key in req.body) {
    if (typeof key === 'string') {
      req.body[key] = req.body[key].trim();
    }
  }

  next();
};