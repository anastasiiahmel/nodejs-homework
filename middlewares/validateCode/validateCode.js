const { HttpErrors } = require("../../helpers");

const validateCode = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpErrors(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = { validateCode };
