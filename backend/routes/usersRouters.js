const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const { isLoggedin} = require('../middleware/isLoggedin');
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

module.exports = router;