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
  return jsonObject;
};

const User = mongoose.model("user", userSchema);

export default User;
