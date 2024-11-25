const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  rrid: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  drName: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String}
});

module.exports = mongoose.model("User", userSchema);
