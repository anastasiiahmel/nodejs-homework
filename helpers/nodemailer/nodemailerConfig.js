const { META_PASS } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "khmel.anastas@meta.ua",
    pass: META_PASS,
  },
};

module.exports = nodemailerConfig;
