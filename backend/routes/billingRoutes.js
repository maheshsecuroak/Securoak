const express = require("express");
const router = express.Router();
const Billing = require("../models/Billing");

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
