const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const { isLoggedin} = require('../middleware/isLoggedin');
const upload = require('../config/multerConfig');
const fs = require('fs');
const path = require('path');
require ('dotenv').config()


const {RegisterUser} = require('../controller/authController')
const {LoginUser} = require('../controller/authController')

router.post('/create', RegisterUser)

router.post('/login', LoginUser)

router.post('/logout', (req, res) => {
  try{res.clearCookie('token', {
    httpOnly: true,
    secure: false, 
    sameSite: 'lax'
  });
  res.json({ success: true, message: 'Logged out successfully' });}
  catch{
    res.json({ success: false, message: 'Something went wrong' });
  }
});

router.get('/details',isLoggedin,(req,res)=>{

  res.json({
    success: true,
    user: req.user,
    role: req.role
  })
})

router.patch('/:id', async (req, res) => {
  try {
    const { contactNumber } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {contactNumber} , { new: true });
    res.json({ success: true, message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});

router.patch('/:id/profile-picture', upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.params.id;
    const filePath = `/uploads/profiles/${req.file.filename}`; // ✅ Save to profiles folder

    const user = await userModel.findById(userId);

    // ✅ Delete old profile image if it exists and is inside 'uploads/profiles'
    if (user.profilePicture && user.profilePicture.startsWith('/uploads/profiles/')) {
      const oldImagePath = path.join(__dirname, '..', user.profilePicture);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // delete the file
      }
    }

    // ✅ Save new profile picture path to DB
    user.profilePicture = filePath;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile picture updated',
      user,
    });
  } catch (error) {
    console.error('Error updating profile picture:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports = router;