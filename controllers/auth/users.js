const { controlErrors, HttpErrors } = require("../../helpers");
const { User } = require("../../schemas");

const bcryptjs = require("bcryptjs");

const getRegister = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpErrors(409, "Email in use !");
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

module.exports = {
  getRegister: controlErrors(getRegister),
};
