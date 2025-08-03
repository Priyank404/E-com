const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const productModel = require('../models/productModel');
const userModel = require('../models/userModel');
const {isLoggedin} = require('../middleware/isLoggedin');


router.post('/create', upload.single('image'), async (req, res, next) => {
  let {name,price,discount,bgColor,panelColor,textColor} = req.body;

  let createdProduct = await productModel.create({
    name,
    price,
    discountedPrice: discount,
    bgColor,
    panelColor,
    textColor,
    image: req.file.path
  })
  res.json({ success: true, message: 'Product created successfully!' });
})

router.post('/delete/all', async (req, res, next) => {
  const deletedProducts = await productModel.deleteMany({});
  res.json({ success: true, message: 'All products deleted successfully!' });
})

router.delete('/delete/:id', async (req, res, next) => {
  const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Product deleted successfully!' });
})

router.post('/cart/:id', isLoggedin, async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    
    if(!product || product===null){
      return res.status(400).json({success: false, message: 'Product not found!'});
    }

    const selectedProduct = {
        ...product._doc,
        imageUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/${product.image.replace(/\\/g, '/')}`
    }

    req.user.cart = [selectedProduct]; // only one product allowed in cart
    await req.user.save();
      
    res.json({ success: true, product: selectedProduct });
  } catch (error) {
    console.log(error);
  }

})

router.get('/cart', isLoggedin, async (req, res) => {
  try {

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, cart: user.cart });
  } catch (err) {
    console.error("Cart fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



module.exports = router;