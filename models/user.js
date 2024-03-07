const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isMember: { type: Boolean, required: true, default: false },
  isAdmin: { type: Boolean, required: true, default: false },
});

UserSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

module.exports = mongoose.model("User", UserSchema);
