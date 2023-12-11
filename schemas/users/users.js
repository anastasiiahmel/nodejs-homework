const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { errorMongoose } = require("../../helpers/errorMongoose/errorMongoose");

const schemaReg = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const schemaForUser = new Schema(
  {
    password: {
      type: String,
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
  },
  { versionKey: false, timestamps: true }
);

schemaForUser.post("save", errorMongoose);

const User = model("user", schemaForUser);

module.exports = { User, schemaReg };
