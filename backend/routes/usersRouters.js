const express = require('express');
const router = express.Router();
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

module.exports = router;