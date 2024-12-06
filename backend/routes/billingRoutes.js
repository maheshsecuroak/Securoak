const express = require("express");
const router = express.Router();
const Billing = require("../models/Billing");

//get existing billing record
router.get("/", async (req, res) => {
  try {
    const billings = await Billing.find();
    res.status(200).json(billings);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving billing records",
      error: error.message,
    });
  }
});

// Create new billing record
router.post("/", async (req, res) => {
  try {
    const billing = new Billing(req.body);
    await billing.save();
    res
      .status(201)
      .json({ message: "Billing record created successfully", billing });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating billing record", error: error.message });
  }
});

module.exports = router;
