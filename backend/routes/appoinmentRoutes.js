const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appoinment');

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching appointments', error: error.message });
  }
});

// Create new appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    res.status(400).json({ message: 'Error creating appointment', error: error.message });
  }
});

module.exports = router;