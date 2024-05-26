const { compareSync } = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
  compareSync(password, hashPassword);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
