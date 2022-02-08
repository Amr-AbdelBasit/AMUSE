import { UserResponse } from "../DTO/user/userResponse";

const jwt = require("jsonwebtoken");
require("dotenv").config();
require("./gender");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const referrenceValidator = require("mongoose-referrence-validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email!",
        isAsync: false,
      },
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    genderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "gender",
    },
    tokens: [
      {
        token: {
          type: String,
          require: true,
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

userSchema.plugin(referrenceValidator);

userSchema.pre("save", async function (this: any, next: any) {
  try {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
    next();
  } catch (e) {}
});

userSchema.methods.toJSON = function () {
  const user = this;
  const jsonObject = user.toObject();
  delete jsonObject.password;
  delete jsonObject.tokens;
  return jsonObject;
};
userSchema.methods.setUserToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_KEY, {
    expiresIn: "7d",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
userSchema.statics.checkUsercredential = async function (
  phone: string,
  password: string
) {
  const user = await UserModel.findOne({ phone });

  if (!user) {
    return { Error: "Invalid Login Attempt!" };
  }
  const checkPwd = await bcrypt.compare(password, user.password);

  if (!checkPwd) {
    return { Error: "Wrong Password !" };
  }
  const token = await user.setUserToken();

  const userResponse: UserResponse = {
    id: user._id,
    name: user.name,
    age: user.age,
    email: user.email,
    phone: user.phone,
    token: token,
    genderId: user.genderId,
  };
  return userResponse;
};
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
