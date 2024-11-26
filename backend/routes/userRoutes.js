// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');

// // Register new user
// router.post('/register', async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully', user });
//   } catch (error) {
//     res.status(400).json({ message: 'Error registering user', error: error.message });
//   }
// });

// // Search for user
// router.post('/search', async (req, res) => {
//   try {
//     const { rrid, mobileNumber, name } = req.body;
//     const user = await User.findOne({
//       $or: [
//         { rrid: rrid },
//         { phone: mobileNumber },
//         { name: name }
//       ]
//     });
//     if (user) {
//       res.json({ found: true, id: user._id });
//     } else {
//       res.json({ found: false });
//     }
//   } catch (error) {
//     res.status(400).json({ message: 'Error searching for user', error: error.message });
//   }
// });

// // Get existing customer data
// router.get('/:id', async (req, res) => {
//     try {
//       const user = await User.findById(req.params.id);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       const treatmentHistory = await Billing.find({ rrid: user.rrid })
//         .sort({ date: -1 })
//         .select('date particulars doctor amount');
  
//       res.json({
//         customer: user,
//         treatmentHistory: treatmentHistory
//       });
//     } catch (error) {
//       console.error('Error fetching customer data:', error);
//       res.status(500).json({ message: 'Error fetching customer data', error: error.message });
//     }
//   });
  

// module.exports = router;


// Method 2

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ message: 'Error registering user', error: error.message });
  }
});

// Search for user
router.post('/search', async (req, res) => {
  try {
    const { rrid, mobileNumber, name } = req.body;
    const user = await User.findOne({
      $or: [
        { rrid: rrid },
        { phone: mobileNumber },
        { name: name }
      ]
    });
    if (user) {
      res.json({ found: true, id: user._id });
    } else {
      res.json({ found: false });
    }
  } catch (error) {
    console.error('Error searching for user:', error);
    res.status(400).json({ message: 'Error searching for user', error: error.message });
  }
});

// Get existing customer data
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const treatmentHistory = await Billing.find({ rrid: user.rrid })
      .sort({ date: -1 })
      .select('date particulars doctor amount');

    res.json({
      customer: user,
      treatmentHistory: treatmentHistory
    });
  } catch (error) {
    console.error('Error fetching customer data:', error);
    res.status(500).json({ message: 'Error fetching customer data', error: error.message });
  }
});

module.exports = router;