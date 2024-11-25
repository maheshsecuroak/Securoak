const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  drugName: {
    type: String,
    required: true
  },
  dosage: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  repeat: {
    type: String,
    required: true
  },
  timeOfDay: [{
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening', 'Night']
  }],
  toBeTaken: {
    type: String,
    enum: ['Before Food', 'After Food', 'With Food']
  }
});


module.exports = mongoose.model('Prescription', medicationSchema);