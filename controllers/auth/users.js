const { SECRET_KEY, BASE_URL } = process.env;

const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const Jimp = require("jimp");
const nodemailer = require("nodemailer");
const { nanoid } = require("nanoid");

const {
  controlErrors,
  HttpErrors,
  nodemailerConfig,
} = require("../../helpers");
const { User } = require("../../schemas");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const transport = nodemailer.createTransport(nodemailerConfig);

const getRegister = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();

  if (user) {
    throw HttpErrors(409, "Email in use!");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    from: "khmel.anastas@meta.ua",
    subject: "Test email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  };
  await transport.sendMail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpErrors(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
  res.status(200).json({
    message: "Email verify  success!",
  });
};

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const result = await User.findOne({ email });
  if (!result) {
    throw HttpErrors(400, "Email not found!");
  }
  if (result.verify) {
    throw HttpErrors(400, "Email already verify!");
  }
  const verifyEmail = {
    to: email,
    from: "khmel.anastas@meta.ua",
    subject: "Verify email",
    Html: `<a target = "_blank" href="${BASE_URL}/users/verify/${result.verificationToken}">Click verify email</a>`,
  };

  await transport.sendMail(verifyEmail);
  res.status(200).json({
    message: "Verify email send success!",
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

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

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

const getUpdateAvatar = async (req, res) => {
  const { _id } = req.user;
  if (!req.file) {
    throw HttpErrors(400, "File not found !");
  }
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsDir, filename);

  const avatarURL = path.join("avatars", filename);
  await fs.rename(tempUpload, resultUpload);
  await User.findByIdAndUpdate(_id, { avatarURL });

  Jimp.read(`${avatarsDir}/${filename}`, (err, fileAvatar) => {
    if (err) throw err;
    fileAvatar.cover(250, 250).write(`${avatarsDir}/${filename}`);
  });

  res.json({ avatarURL });
};

module.exports = {
  getRegister: controlErrors(getRegister),
  getLogin: controlErrors(getLogin),
  getCurrent: controlErrors(getCurrent),
  getLogOut: controlErrors(getLogOut),
  getUpdateAvatar: controlErrors(getUpdateAvatar),
  verifyEmail: controlErrors(verifyEmail),
  resendEmail: controlErrors(resendEmail),
};
