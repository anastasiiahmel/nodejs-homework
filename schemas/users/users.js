const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { errorMongoose } = require("../../helpers/errorMongoose/errorMongoose");

const schemaReg = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk"] },
    })
    .required(),
  password: Joi.string().min(6).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().required(),
});

const schemaLog = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const schemaForUser = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },

  { versionKey: false, timestamps: true }
);

schemaForUser.post("save", errorMongoose);

const User = model("user", schemaForUser);

module.exports = { User, schemaReg, schemaLog, emailSchema };
