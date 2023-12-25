const { SECRET_KEY } = process.env;

const jwt = require("jsonwebtoken");

const { User } = require("..//../schemas");

const { HttpErrors } = require("../../helpers");

const authorization = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpErrors(401, "Not authorized!"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpErrors(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpErrors(401, "Not authorized"));
  }
};

module.exports = authorization;
