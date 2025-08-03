// routes/payment.js
const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

router.post('/create-order', async (req, res) => {
  const { amount } = req.body; // amount in INR

  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: 'receipt_order_' + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/get-key', (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API });
});

module.exports = router;
