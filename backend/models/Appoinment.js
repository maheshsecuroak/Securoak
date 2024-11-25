const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNo: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  treatment: { type: String, required: true },
  doctor: { type: String, required: true },
  status: { type: String, default: 'Confirmed' },
  rrid: { type: String, required: true }
});

module.exports = mongoose.model('Appointment', appointmentSchema);