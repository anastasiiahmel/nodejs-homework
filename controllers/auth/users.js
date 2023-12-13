const { controlErrors, HttpErrors } = require("../../helpers");
const { User } = require("../../schemas");
const { SECRET_KEY } = process.env;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getRegister = async (req, res) => {
  const { email, password } = req.params;
  const user = await User.findOne({ email });
  console.log(user);

  if (user) {
    throw HttpErrors(409, "Email in use!");
  }
  const hashedPassword = await bcrypt.hash((password || "").toString(), 10);
  console.log("hashedPassword :>> ", hashedPassword);
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
  console.log("user :>> ", user);
  if (!user) {
    throw HttpErrors(401, "Email or password invalid!");
  }

  const passwordComparison = await bcrypt.compare(password, user.password);
  console.log(passwordComparison);

  if (!passwordComparison) {
    throw HttpErrors(401, "Email or password invalid!");
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

module.exports = {
  getRegister: controlErrors(getRegister),
  getLogin: controlErrors(getLogin),
};
