const { SECRET_KEY } = process.env;

const { controlErrors, HttpErrors } = require("../../helpers");
const { User } = require("../../schemas");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getRegister = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);

  if (user) {
    throw HttpErrors(409, "Email in use!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const getLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpErrors(401, "Email or password invalid!");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpErrors(401, "Email or password is wrong!");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { subscription, email } = req.user;
  res.json({
    email,
    subscription,
  });
};

const getLogOut = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

module.exports = {
  getRegister: controlErrors(getRegister),
  getLogin: controlErrors(getLogin),
  getCurrent: controlErrors(getCurrent),
  getLogOut: controlErrors(getLogOut),
};
