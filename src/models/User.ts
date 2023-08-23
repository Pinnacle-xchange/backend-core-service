import { Document, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  matchPassword(password: string): boolean;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required field"],
      trim: true,
      validate: [validator.isAlpha, "Name should only contain alphabeths"],
    },
    email: {
      type: String,
      required: [true, "Email is required field"],
      unique: true,
      trim: true,
      validate: {
        validator: function (value: string) {
          return value.match(
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          );
        },
        message: "Email is invalid",
      },
    },
    password: {
      type: String,
      validate: {
        validator: function (value: string) {
          return value.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          );
        },
        message:
          "Password must be at least 8-32 characters and include at least a lowercase, uppercase and a special character",
      },
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = model<IUser>("user", userSchema);

export default User;
