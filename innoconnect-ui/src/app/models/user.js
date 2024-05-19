/**
 * @author Tom Shortridge
 *
 * The model for the user object. The model also hashes the users' password on a save action.
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  timezone: {
    type: String,
    required: true,
  },
  matching: {
    type: Boolean,
    required: true,
  },
});

// When the user is saved, the password is hashed before being committed to the database.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
