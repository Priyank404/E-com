const express = require('express');
const ownerModel = require('../models/ownerModel');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hey its working');
});


if (process.env.NODE_ENV !== 'development') {
  require('dotenv').config();

  router.post('/create', async (req, res) => {
  try {
    const existingOwner = await ownerModel.find();
    if (existingOwner.length > 0) {
      return res.status(400).send('Owner already exists');
    }

    const { email, fullname, username, password } = req.body;

    // ✅ Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdOwner = await ownerModel.create({
      email,
      fullname,
      username,
      password: hashedPassword  // ✅ store hashed password
    });

    res.status(201).send(createdOwner);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

}


