const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');

// Get all prescriptions
router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find(req.body);
    res.json(prescriptions);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching prescriptions', error: error.message });
  }
});

// Create new prescription
router.post('/', async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(201).json({ message: 'Prescription created successfully', prescription });
  } catch (error) {
    res.status(400).json({ message: 'Error creating prescription', error: error.message });
  }
});

module.exports = router;