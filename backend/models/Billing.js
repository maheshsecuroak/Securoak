const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  location: { type: String, required: true },
  date: { type: Date, required: true },
  rrid: { type: String, required: true },
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  place: { type: String, required: true },
  phoneNo: { type: String, required: true },
  address: { type: String, required: true },
  treatments: [{
    specification: { type: String, required: true },
    amount: { type: Number, required: true }
  }],
  total: { type: Number, required: true }
});

module.exports = mongoose.model('Billing', billingSchema);