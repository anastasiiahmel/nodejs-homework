const { HttpErrors } = require("../../helpers");

const notValidBody = (req, res, next) => {
  const body = req.body;
  if (!body) {
    next(HttpErrors(400, "missing field favorite"));
  }
  next();
};

module.exports = notValidBody;
